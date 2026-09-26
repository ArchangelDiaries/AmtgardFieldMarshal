// /ork-api  ->  ORK web service (orkservice/Json) with Field Marshal's ORK API key.
// Replaces the old _redirects relay, which Cloudflare now blocks. Follows the ORK team's
// "Amtgard ORK — API Access" document. Netlify environment variables (scope: Functions):
//   ORK_API_KEY   the 64-character key from the ORK administrators (secret; never commit it)
//   ORK_CLIENT    optional product token, default "FieldMarshal/1.1" (plain text, NOT the key)
//   ORK_CONTACT   optional contact email for the User-Agent
//
// Only the calls Field Marshal uses are forwarded, and only for pages on this site, so the key
// can't be borrowed as an open relay. Anything secret (password, Token) travels in a POST body.

const ORK_JSON = 'https://ork.amtgard.com/orkservice/Json/index.php';
const CLIENT = process.env.ORK_CLIENT || 'FieldMarshal/1.1';
const SITE = process.env.URL || 'https://srfieldmarshal.netlify.app';
const UA = `${CLIENT} (+${SITE}${process.env.ORK_CONTACT ? `; ${process.env.ORK_CONTACT}` : ''})`;

export const ALLOWED = new Set([
  'SearchService/Player',
  'Report/GetActivePlayers',
  'Player/AwardsForPlayer',
  'Authorization/Authorize',
  'Authorization/DestroySession',
  'Player/AddAwardRecommendation',
]);
const SECRET_CALLS = new Set(['Authorization/Authorize', 'Authorization/DestroySession', 'Player/AddAwardRecommendation']);

const json = (body, status) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export default async (req, { fetchImpl = fetch } = {}) => {
  const url = new URL(req.url);
  const origin = req.headers.get('origin');
  if (origin && origin !== url.origin && origin !== SITE) return json({ error: 'Not allowed from this site.' }, 403);
  if (!process.env.ORK_API_KEY) return json({ error: 'ORK_API_KEY is not set on this site.' }, 503);

  let call, target = new URL(ORK_JSON), body;
  if (req.method === 'POST') {
    const form = new URLSearchParams(await req.text());
    call = form.get('call');
    body = form.toString();
  } else if (req.method === 'GET') {
    call = url.searchParams.get('call');
    url.searchParams.forEach((v, k) => target.searchParams.set(k, v));
  } else return json({ error: 'Method not allowed.' }, 405);

  if (!ALLOWED.has(call)) return json({ error: `Call not allowed: ${call || '(none)'}` }, 400);
  if (SECRET_CALLS.has(call) && req.method !== 'POST') return json({ error: 'Send sign-in calls as POST.' }, 400);

  const headers = { 'X-Ork-Key': process.env.ORK_API_KEY, 'X-ORK-Client': CLIENT, 'User-Agent': UA, Accept: 'application/json' };
  if (body) headers['Content-Type'] = 'application/x-www-form-urlencoded';
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 10000);
  try {
    const r = await fetchImpl(target.toString(), { method: req.method, headers, body, signal: ctl.signal });
    const text = await r.text();
    if (r.status === 403 || /<title>\s*Just a moment/i.test(text)) return json({ error: 'The ORK turned the request away. Check ORK_API_KEY.', code: 'ork_blocked' }, 503);
    return new Response(text, { status: r.status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
  } catch (e) {
    return json({ error: 'Couldn’t reach the ORK.' }, 504);
  } finally { clearTimeout(t); }
};

export const config = { path: '/ork-api' };
