import nodemailer from 'nodemailer';
import {
  APPOINTMENT_NEED_OPTIONS,
  APPOINTMENT_STAGE_OPTIONS,
  APPOINTMENT_TIME_OPTIONS,
} from '../shared/appointment-options.js';

const SERVICE_LABELS = {
  enterprise: '企业 AI 落地',
  individual: '个体 AI 成长',
};

const STAGE_OPTIONS = new Set(APPOINTMENT_STAGE_OPTIONS);
const TIME_OPTIONS = new Set(APPOINTMENT_TIME_OPTIONS);

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character]);
}

function cleanHeader(value) {
  return cleanText(value, 200).replace(/[\r\n]+/g, ' ');
}

function sanitizeTemplateValue(value) {
  return String(value).replace(/[&<>]/g, (character) => ({
    '&': '＆',
    '<': '＜',
    '>': '＞',
  })[character]);
}

function splitRecipients(value) {
  return value
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);
}

function extractMailbox(value) {
  const angleAddress = value.match(/<([^<>]+)>/);
  return cleanText(angleAddress?.[1] || value, 320);
}

export function parseAppointmentPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, message: '提交内容不正确，请检查后重试。' };
  }

  const website = cleanText(payload.website, 200);
  if (website) {
    return { ok: true, ignored: true };
  }

  const serviceType = cleanText(payload.serviceType, 24);
  const need = cleanText(payload.need, 160);
  const name = cleanText(payload.name, 80);
  const organization = cleanText(payload.organization, 120);
  const contact = cleanText(payload.contact, 100);
  const time = cleanText(payload.time, 40);
  const stage = cleanText(payload.stage, 40);
  const needOptions = APPOINTMENT_NEED_OPTIONS[serviceType] || [];

  if (
    !SERVICE_LABELS[serviceType]
    || !needOptions.includes(need)
    || !name
    || !contact
    || !TIME_OPTIONS.has(time)
    || !STAGE_OPTIONS.has(stage)
  ) {
    return { ok: false, message: '请完整填写必填项后再提交。' };
  }

  return {
    ok: true,
    value: { serviceType, need, name, organization, contact, time, stage },
  };
}

function getMailConfig() {
  const to = cleanText(process.env.APPOINTMENT_TO, 320);
  const cc = cleanText(process.env.APPOINTMENT_CC, 320);
  const from = cleanText(process.env.APPOINTMENT_FROM, 320);
  const replyTo = cleanText(process.env.APPOINTMENT_REPLY_TO, 320) || extractMailbox(from);

  if (!to || !from) {
    throw new Error('邮件服务尚未配置。');
  }

  return { to, cc, from, replyTo };
}

export function getTencentSesApiConfig() {
  const secretId = cleanText(process.env.TENCENTCLOUD_SECRET_ID, 512);
  const secretKey = cleanText(process.env.TENCENTCLOUD_SECRET_KEY, 512);
  const sessionToken = cleanText(process.env.TENCENTCLOUD_SESSION_TOKEN, 2000);
  const region = cleanText(process.env.TENCENT_SES_REGION || 'ap-guangzhou', 64);
  const rawTemplateId = cleanText(process.env.TENCENT_SES_TEMPLATE_ID, 32);
  const templateId = /^\d+$/.test(rawTemplateId) ? Number.parseInt(rawTemplateId, 10) : Number.NaN;

  if (!secretId || !secretKey) {
    throw new Error('腾讯云邮件推送缺少 SecretId 或 SecretKey。');
  }

  if (!Number.isSafeInteger(templateId) || templateId <= 0) {
    throw new Error('腾讯云邮件推送缺少有效的模板 ID。');
  }

  if (!new Set(['ap-guangzhou', 'ap-hongkong']).has(region)) {
    throw new Error('腾讯云邮件推送地域只支持 ap-guangzhou 或 ap-hongkong。');
  }

  return {
    region,
    templateId,
    clientConfig: {
      credential: {
        secretId,
        secretKey,
        ...(sessionToken ? { token: sessionToken } : {}),
      },
      region,
      profile: {
        signMethod: 'TC3-HMAC-SHA256',
        httpProfile: {
          reqMethod: 'POST',
          reqTimeout: 15,
        },
      },
    },
  };
}

function getTencentSesConfig(mailConfig) {
  return { ...mailConfig, ...getTencentSesApiConfig() };
}

function makeMailContent(appointment) {
  const rows = [
    ['咨询方向', SERVICE_LABELS[appointment.serviceType]],
    ['当前需求', appointment.need],
    ['称呼', appointment.name],
    ['公司或身份', appointment.organization || '未填写'],
    ['联系方式', appointment.contact],
    ['方便联系的时段', appointment.time],
    ['当前阶段', appointment.stage],
  ];

  const text = rows.map(([label, value]) => `${label}：${value}`).join('\n');
  const html = `
    <div style="font-family:Arial,'PingFang SC','Microsoft YaHei',sans-serif;color:#2e415f;line-height:1.7">
      <h2 style="font-size:20px;margin:0 0 16px">Midimily 新预约</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows.map(([label, value]) => `<tr><th style="border-bottom:1px solid #d7e3f0;padding:10px 14px 10px 0;text-align:left;vertical-align:top;width:140px">${escapeHtml(label)}</th><td style="border-bottom:1px solid #d7e3f0;padding:10px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('')}
      </table>
    </div>
  `;

  return { text, html };
}

function makeMailSubject(appointment) {
  return cleanHeader(`[Midimily 预约] ${SERVICE_LABELS[appointment.serviceType]} · ${appointment.name}`);
}

function makeTencentTemplateData(appointment) {
  return Object.fromEntries([
    ['service', SERVICE_LABELS[appointment.serviceType]],
    ['need', appointment.need],
    ['name', appointment.name],
    ['organization', appointment.organization || '未填写'],
    ['contact', appointment.contact],
    ['time', appointment.time],
    ['stage', appointment.stage],
  ].map(([key, value]) => [key, sanitizeTemplateValue(value)]));
}

export function buildTencentSesRequest(appointment, config) {
  const destination = splitRecipients(config.to);
  const cc = splitRecipients(config.cc || '');

  if (!destination.length) {
    throw new Error('腾讯云邮件推送缺少收件人。');
  }

  return {
    FromEmailAddress: config.from,
    Destination: destination,
    ...(cc.length ? { Cc: cc } : {}),
    ...(config.replyTo ? { ReplyToAddresses: config.replyTo } : {}),
    Subject: makeMailSubject(appointment),
    Template: {
      TemplateID: config.templateId,
      TemplateData: JSON.stringify(makeTencentTemplateData(appointment)),
    },
    Unsubscribe: '0',
    TriggerType: 1,
  };
}

export async function createTencentSesClient(clientConfig) {
  const sdkModule = await import('tencentcloud-sdk-nodejs-ses');
  const sdk = sdkModule.default || sdkModule;
  const TencentSesClient = sdk.ses.v20201002.Client;
  return new TencentSesClient(clientConfig);
}

export async function sendAppointmentEmail(appointment, dependencies = {}) {
  const content = makeMailContent(appointment);
  const subject = makeMailSubject(appointment);
  const mode = cleanText(process.env.EMAIL_MODE || 'smtp', 32).toLowerCase();

  if (mode === 'console') {
    console.info(subject, content.text);
    return { provider: 'console' };
  }

  const config = getMailConfig();

  if (mode === 'tencent-ses') {
    const sesConfig = getTencentSesConfig(config);
    const clientFactory = dependencies.createTencentSesClient || createTencentSesClient;
    const client = await clientFactory(sesConfig.clientConfig);
    const response = await client.SendEmail(buildTencentSesRequest(appointment, sesConfig));

    console.info(`Tencent SES accepted appointment email: requestId=${response.RequestId || 'unknown'} messageId=${response.MessageId || 'unknown'}`);
    return {
      provider: 'tencent-ses',
      requestId: response.RequestId,
      messageId: response.MessageId,
    };
  }

  if (mode !== 'smtp') {
    throw new Error(`不支持的邮件发送模式：${mode}`);
  }

  const smtpUrl = cleanText(process.env.SMTP_URL, 1000);
  if (!smtpUrl) {
    throw new Error('邮件服务尚未配置。');
  }

  const transport = nodemailer.createTransport(smtpUrl);
  await transport.sendMail({
    from: config.from,
    to: config.to,
    cc: config.cc || undefined,
    replyTo: config.replyTo || undefined,
    subject,
    text: content.text,
    html: content.html,
  });

  return { provider: 'smtp' };
}
