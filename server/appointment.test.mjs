import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildTencentSesRequest,
  parseAppointmentPayload,
  sendAppointmentEmail,
} from './appointment-mailer.mjs';
import {
  APPOINTMENT_RATE_LIMIT_WINDOW_MS,
  createAppointmentRateLimiter,
  getAppointmentClientIp,
} from './appointment-server.mjs';

const validPayload = {
  serviceType: 'enterprise',
  need: '判断哪个业务流程最值得先做',
  name: '测试用户',
  organization: '测试团队',
  contact: 'test-contact',
  time: '工作日上午',
  stage: '尚未开始，想先判断方向',
  website: '',
};

test('accepts a complete appointment payload', () => {
  const result = parseAppointmentPayload(validPayload);
  assert.equal(result.ok, true);
  assert.equal(result.value.serviceType, 'enterprise');
  assert.equal(result.value.name, '测试用户');
});

test('rejects incomplete submissions', () => {
  const result = parseAppointmentPayload({ ...validPayload, contact: '' });
  assert.equal(result.ok, false);
});

test('rejects appointment values outside the fixed options', () => {
  assert.equal(parseAppointmentPayload({ ...validPayload, need: '任意输入' }).ok, false);
  assert.equal(parseAppointmentPayload({ ...validPayload, stage: '任意输入' }).ok, false);
});

test('silently ignores honeypot submissions', () => {
  const result = parseAppointmentPayload({ ...validPayload, website: 'https://spam.invalid' });
  assert.equal(result.ok, true);
  assert.equal(result.ignored, true);
});

test('builds a Tencent SES template request for the appointment', () => {
  const request = buildTencentSesRequest(validPayload, {
    from: '米地咨询 <admin@midimily.com>',
    to: 'primary@example.com',
    cc: 'copy@example.com',
    replyTo: 'admin@midimily.com',
    templateId: 123456,
  });

  assert.equal(request.FromEmailAddress, '米地咨询 <admin@midimily.com>');
  assert.deepEqual(request.Destination, ['primary@example.com']);
  assert.deepEqual(request.Cc, ['copy@example.com']);
  assert.equal(request.ReplyToAddresses, 'admin@midimily.com');
  assert.equal(request.Template.TemplateID, 123456);
  assert.deepEqual(JSON.parse(request.Template.TemplateData), {
    service: '企业 AI 落地',
    need: '判断哪个业务流程最值得先做',
    name: '测试用户',
    organization: '测试团队',
    contact: 'test-contact',
    time: '工作日上午',
    stage: '尚未开始，想先判断方向',
  });
  assert.equal(request.Unsubscribe, '0');
  assert.equal(request.TriggerType, 1);
});

test('uses the Tencent SES client when the provider is selected', { concurrency: false }, async () => {
  const envKeys = [
    'EMAIL_MODE',
    'APPOINTMENT_TO',
    'APPOINTMENT_CC',
    'APPOINTMENT_FROM',
    'APPOINTMENT_REPLY_TO',
    'TENCENTCLOUD_SECRET_ID',
    'TENCENTCLOUD_SECRET_KEY',
    'TENCENT_SES_REGION',
    'TENCENT_SES_TEMPLATE_ID',
  ];
  const previousEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
  let capturedClientConfig;
  let capturedRequest;

  Object.assign(process.env, {
    EMAIL_MODE: 'tencent-ses',
    APPOINTMENT_TO: 'primary@example.com',
    APPOINTMENT_CC: 'copy@example.com',
    APPOINTMENT_FROM: '米地咨询 <admin@midimily.com>',
    APPOINTMENT_REPLY_TO: 'admin@midimily.com',
    TENCENTCLOUD_SECRET_ID: 'test-secret-id',
    TENCENTCLOUD_SECRET_KEY: 'test-secret-key',
    TENCENT_SES_REGION: 'ap-guangzhou',
    TENCENT_SES_TEMPLATE_ID: '123456',
  });

  try {
    const result = await sendAppointmentEmail(validPayload, {
      createTencentSesClient(clientConfig) {
        capturedClientConfig = clientConfig;
        return {
          async SendEmail(request) {
            capturedRequest = request;
            return { RequestId: 'request-id', MessageId: 'message-id' };
          },
        };
      },
    });

    assert.equal(capturedClientConfig.region, 'ap-guangzhou');
    assert.equal(capturedClientConfig.credential.secretId, 'test-secret-id');
    assert.equal(capturedRequest.Template.TemplateID, 123456);
    assert.deepEqual(result, {
      provider: 'tencent-ses',
      requestId: 'request-id',
      messageId: 'message-id',
    });
  } finally {
    for (const key of envKeys) {
      if (previousEnv[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = previousEnv[key];
      }
    }
  }
});

test('allows only one successful appointment per IP in 60 minutes', () => {
  let currentTime = Date.UTC(2026, 7, 16, 9, 0, 0);
  const limiter = createAppointmentRateLimiter({
    now: () => currentTime,
  });

  const first = limiter.reserve('203.0.113.10');
  assert.equal(first.allowed, true);

  const repeated = limiter.reserve('203.0.113.10');
  assert.equal(repeated.allowed, false);
  assert.equal(repeated.retryAfter, 3600);

  const anotherIp = limiter.reserve('203.0.113.11');
  assert.equal(anotherIp.allowed, true);

  currentTime += APPOINTMENT_RATE_LIMIT_WINDOW_MS;
  const afterWindow = limiter.reserve('203.0.113.10');
  assert.equal(afterWindow.allowed, true);
});

test('releases the IP reservation when sending fails', () => {
  const limiter = createAppointmentRateLimiter();
  const first = limiter.reserve('203.0.113.12');
  assert.equal(first.allowed, true);

  limiter.release('203.0.113.12', first.token);
  const retry = limiter.reserve('203.0.113.12');
  assert.equal(retry.allowed, true);
});

test('uses the real client IP supplied by the trusted local proxy', () => {
  const request = {
    socket: { remoteAddress: '127.0.0.1' },
    headers: {
      'x-real-ip': '203.0.113.13',
      'x-forwarded-for': '198.51.100.9, 127.0.0.1',
    },
  };

  assert.equal(getAppointmentClientIp(request, { trustProxy: true }), '203.0.113.13');
  assert.equal(getAppointmentClientIp(request, { trustProxy: false }), '127.0.0.1');
});
