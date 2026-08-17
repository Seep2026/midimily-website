import http from 'node:http';
import { isIP } from 'node:net';
import { parseAppointmentPayload, sendAppointmentEmail } from './appointment-mailer.mjs';

const PORT = Number.parseInt(process.env.APPOINTMENT_PORT || '8787', 10);
const HOST = process.env.APPOINTMENT_HOST || '127.0.0.1';
export const APPOINTMENT_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function allowedOrigins() {
  return new Set((process.env.APPOINTMENT_ALLOWED_ORIGINS || 'https://midimily.com,http://127.0.0.1:5173,http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean));
}

function writeJson(response, statusCode, body, origin, extraHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders,
  };

  if (origin && allowedOrigins().has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers.Vary = 'Origin';
  }

  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(body));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 64 * 1024) {
        reject(new Error('请求内容过大。'));
        request.destroy();
      }
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        reject(new Error('提交内容不正确，请检查后重试。'));
      }
    });
    request.on('error', reject);
  });
}

function normalizeIp(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const candidate = value.trim().replace(/^::ffff:/, '');
  return isIP(candidate) ? candidate : '';
}

function isLoopbackIp(value) {
  return value === '127.0.0.1' || value === '::1';
}

function shouldTrustProxy(request, override) {
  if (typeof override === 'boolean') {
    return override;
  }

  if (process.env.APPOINTMENT_TRUST_PROXY === 'true') {
    return true;
  }

  if (process.env.APPOINTMENT_TRUST_PROXY === 'false') {
    return false;
  }

  return isLoopbackIp(normalizeIp(request.socket.remoteAddress));
}

export function getAppointmentClientIp(request, options = {}) {
  const remoteIp = normalizeIp(request.socket.remoteAddress) || 'unknown';

  if (!shouldTrustProxy(request, options.trustProxy)) {
    return remoteIp;
  }

  const realIp = normalizeIp(request.headers['x-real-ip']);
  if (realIp) {
    return realIp;
  }

  const forwardedHeader = request.headers['x-forwarded-for'];
  const forwardedIp = normalizeIp(typeof forwardedHeader === 'string' ? forwardedHeader.split(',')[0] : '');
  return forwardedIp || remoteIp;
}

function removeExpiredReservations(store, now) {
  if (store.size < 1024) {
    return;
  }

  for (const [key, reservation] of store) {
    if (now - reservation.timestamp >= APPOINTMENT_RATE_LIMIT_WINDOW_MS) {
      store.delete(key);
    }
  }
}

function reserveAppointment(store, clientIp, now) {
  const existing = store.get(clientIp);
  const elapsed = existing ? now - existing.timestamp : Number.POSITIVE_INFINITY;

  if (existing && elapsed < APPOINTMENT_RATE_LIMIT_WINDOW_MS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((APPOINTMENT_RATE_LIMIT_WINDOW_MS - elapsed) / 1000)),
    };
  }

  removeExpiredReservations(store, now);
  const token = { timestamp: now };
  store.set(clientIp, token);
  return { allowed: true, token };
}

function releaseAppointment(store, clientIp, token) {
  if (store.get(clientIp) === token) {
    store.delete(clientIp);
  }
}

export function createAppointmentRateLimiter(options = {}) {
  const store = options.store || new Map();
  const now = options.now || Date.now;

  return {
    reserve(clientIp) {
      return reserveAppointment(store, clientIp, now());
    },
    release(clientIp, token) {
      releaseAppointment(store, clientIp, token);
    },
  };
}

export function createAppointmentServer(options = {}) {
  const sendEmail = options.sendEmail || sendAppointmentEmail;
  const rateLimiter = options.rateLimiter || createAppointmentRateLimiter({
    store: options.rateLimitStore,
    now: options.now,
  });

  return http.createServer(async (request, response) => {
    const origin = request.headers.origin;

    if (request.method === 'OPTIONS') {
      if (origin && allowedOrigins().has(origin)) {
        response.writeHead(204, {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
          Vary: 'Origin',
        });
        response.end();
        return;
      }

      writeJson(response, 403, { message: '来源不被允许。' }, origin);
      return;
    }

    if (request.method === 'GET' && request.url === '/health') {
      writeJson(response, 200, { ok: true }, origin);
      return;
    }

    if (request.method !== 'POST' || request.url !== '/api/appointments') {
      writeJson(response, 404, { message: '未找到请求接口。' }, origin);
      return;
    }

    if (origin && !allowedOrigins().has(origin)) {
      writeJson(response, 403, { message: '来源不被允许。' }, origin);
      return;
    }

    if (!String(request.headers['content-type'] || '').includes('application/json')) {
      writeJson(response, 415, { message: '请使用正确的提交方式。' }, origin);
      return;
    }

    try {
      const parsed = parseAppointmentPayload(await readJson(request));
      if (!parsed.ok) {
        writeJson(response, 400, { message: parsed.message }, origin);
        return;
      }

      if (parsed.ignored) {
        writeJson(response, 200, { ok: true }, origin);
        return;
      }

      const clientIp = getAppointmentClientIp(request, { trustProxy: options.trustProxy });
      const reservation = rateLimiter.reserve(clientIp);

      if (!reservation.allowed) {
        writeJson(
          response,
          429,
          { message: '同一网络地址 60 分钟内只能提交一次预约，请稍后再试。' },
          origin,
          { 'Retry-After': String(reservation.retryAfter) },
        );
        return;
      }

      try {
        await sendEmail(parsed.value);
      } catch (error) {
        rateLimiter.release(clientIp, reservation.token);
        throw error;
      }

      writeJson(response, 200, { ok: true }, origin);
    } catch (error) {
      console.error('Appointment request failed:', error instanceof Error ? error.message : error);
      writeJson(response, 500, { message: '提交暂时没有成功，请稍后再试。' }, origin);
    }
  });
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const server = createAppointmentServer();
  server.listen(PORT, HOST, () => {
    console.info(`Appointment API listening on http://${HOST}:${PORT}`);
  });
}
