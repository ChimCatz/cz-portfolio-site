// The Get in Touch form posts here. Three routes:
//
//   POST /cap/challenge   a Cap proof-of-work challenge for the widget
//   POST /cap/redeem      the widget's solutions in, a single-use token out
//   POST /send            the form: checks, then one plain-text email via Resend
//
// Nothing is stored except Cap's replay keys and tokens in KV, which expire on
// their own. Messages are passed to Resend and not kept here.

import { generateChallenge, validateChallenge } from 'capjs-core';

const SCOPE = 'contact';
const TOKEN_TTL_MS = 20 * 60 * 1000;
const MAX_BODY_BYTES = 16 * 1024;
const LIMITS = { name: 100, email: 254, message: 5000 };
// One @, no spaces or angle brackets, a dot in the domain. Resend does the rest.
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
    if (!origin || !allowed.includes(origin)) return reply({ error: 'origin' }, 403);

    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return reply({ error: 'method' }, 405, cors);

    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const { pathname } = new URL(request.url);

    try {
      if (pathname === '/cap/challenge') return await challenge(env, ip, cors);
      if (pathname === '/cap/redeem') return await redeem(request, env, ip, cors);
      if (pathname === '/send') return await send(request, env, ip, cors);
    } catch {
      return reply({ ok: false, error: 'server' }, 500, cors);
    }
    return reply({ error: 'not_found' }, 404, cors);
  },
};

async function challenge(env, ip, cors) {
  if (!(await env.CAP_LIMIT.limit({ key: ip })).success) return reply({ error: 'rate_limited' }, 429, cors);
  return reply(await generateChallenge(env.CAP_SECRET, { scope: SCOPE }), 200, cors);
}

async function redeem(request, env, ip, cors) {
  if (!(await env.CAP_LIMIT.limit({ key: ip })).success) {
    return reply({ success: false, error: 'rate_limited' }, 429, cors);
  }
  const body = await readJson(request);
  if (!body) return reply({ success: false, error: 'bad_request' }, 400, cors);

  const result = await validateChallenge(
    env.CAP_SECRET,
    { token: body.token, solutions: body.solutions },
    {
      scope: SCOPE,
      tokenTtlMs: TOKEN_TTL_MS,
      // Each solved challenge can be redeemed once.
      consumeNonce: async (signature, ttlMs) => {
        const key = `nonce:${signature}`;
        if (await env.CAP_KV.get(key)) return false;
        await env.CAP_KV.put(key, '1', { expirationTtl: seconds(ttlMs) });
        return true;
      },
    },
  );
  if (!result.success) return reply({ success: false, error: result.reason }, 400, cors);

  await env.CAP_KV.put(`token:${result.tokenKey}`, '1', { expirationTtl: seconds(TOKEN_TTL_MS) });
  return reply({ success: true, token: result.token, expires: result.expires }, 200, cors);
}

async function send(request, env, ip, cors) {
  if (!(await env.SEND_LIMIT.limit({ key: ip })).success) return reply({ ok: false, error: 'rate_limited' }, 429, cors);

  const body = await readJson(request);
  if (!body) return reply({ ok: false, error: 'bad_request' }, 400, cors);

  // Filled in by bots only: the field is hidden from people. Pretend it worked.
  if (body.website) return reply({ ok: true }, 200, cors);

  // The Cap token is single use: it's deleted before the email goes out.
  const tokenKey = await capTokenKey(body.capToken);
  if (!tokenKey || !(await env.CAP_KV.get(`token:${tokenKey}`))) {
    return reply({ ok: false, error: 'verification' }, 400, cors);
  }
  await env.CAP_KV.delete(`token:${tokenKey}`);

  const name = text(body.name).replace(/\s+/g, ' ');
  const email = text(body.email);
  const message = text(body.message);
  if (!name || name.length > LIMITS.name) return reply({ ok: false, error: 'name' }, 400, cors);
  if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) return reply({ ok: false, error: 'email' }, 400, cors);
  if (!message || message.length > LIMITS.message) return reply({ ok: false, error: 'message' }, 400, cors);

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Portfolio contact form <onboarding@resend.dev>',
      to: [env.TO_EMAIL],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n---\nFrom: ${name} <${email}>\nSent with the Get in Touch form on the portfolio site.`,
    }),
  });
  if (!sent.ok) return reply({ ok: false, error: 'send_failed' }, 502, cors);
  return reply({ ok: true }, 200, cors);
}

// ---------- Helpers ----------

function reply(data, status, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

async function readJson(request) {
  if (!(request.headers.get('Content-Type') ?? '').includes('application/json')) return null;
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return null;
  try {
    const data = JSON.parse(raw);
    return data && typeof data === 'object' && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

// KV expiry is in seconds, 60 at least.
function seconds(ms) {
  return Math.max(60, Math.ceil(ms / 1000));
}

// capjs-core hands out `id:secret` and keeps `id:sha256(secret)` as the key.
async function capTokenKey(token) {
  if (typeof token !== 'string' || token.length > 200) return null;
  const [id, secret, extra] = token.split(':');
  if (!id || !secret || extra !== undefined) return null;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret));
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${id}:${hex}`;
}
