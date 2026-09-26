import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../netlify/functions/ork-api.mjs';
process.env.ORK_API_KEY = 'f'.repeat(64);
const cap = []; const fetchImpl = async (u, o) => { cap.push({ u: String(u), o }); return Response.json({ Result: [] }); };

test('GET search is forwarded with key headers', async () => {
  const r = await handler(new Request('https://fm.test/ork-api?call=SearchService/Player&type=All&search=Dragoth&limit=25'), { fetchImpl });
  assert.equal(r.status, 200);
  const c = cap.at(-1); assert.match(c.u, /call=SearchService%2FPlayer/); assert.match(c.u, /search=Dragoth/);
  assert.equal(c.o.headers['X-Ork-Key'], 'f'.repeat(64)); assert.match(c.o.headers['X-ORK-Client'], /^FieldMarshal\//);
  assert.ok(!c.u.includes('f'.repeat(64)));
});
test('POST sign-in keeps the password in the body, not the URL', async () => {
  const body = 'call=Authorization%2FAuthorize&request%5BUserName%5D=u&request%5BPassword%5D=secret';
  await handler(new Request('https://fm.test/ork-api', { method: 'POST', body, headers: { origin: 'https://fm.test' } }), { fetchImpl });
  const c = cap.at(-1); assert.equal(c.o.method, 'POST'); assert.ok(!c.u.includes('secret')); assert.match(c.o.body, /Password%5D=secret/);
});
test('sign-in by GET is refused', async () => {
  const r = await handler(new Request('https://fm.test/ork-api?call=Authorization/Authorize&request[Password]=x'), { fetchImpl });
  assert.equal(r.status, 400);
});
test('calls outside the allowlist are refused', async () => {
  const r = await handler(new Request('https://fm.test/ork-api?call=Player/SetBan'), { fetchImpl });
  assert.equal(r.status, 400);
});
test('other sites cannot use the relay', async () => {
  const r = await handler(new Request('https://fm.test/ork-api?call=SearchService/Player', { headers: { origin: 'https://evil.example' } }), { fetchImpl });
  assert.equal(r.status, 403);
});
test('Cloudflare block reported', async () => {
  const r = await handler(new Request('https://fm.test/ork-api?call=SearchService/Player'), { fetchImpl: async () => new Response('<title>Just a moment...</title>', { status: 403 }) });
  assert.equal(r.status, 503);
});
