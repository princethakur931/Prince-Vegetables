const applyCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const readBody = (req) => {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body;
};

export default async function handler(req, res) {
  applyCorsHeaders(res);
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const expectedPassword = process.env.ADMIN_PANEL_PASSWORD;

  if (!expectedPassword) {
    return res.status(500).json({ message: 'Missing ADMIN_PANEL_PASSWORD environment variable' });
  }

  const body = readBody(req);
  const password = String(body.password ?? '');

  if (password && password === expectedPassword) {
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ message: 'Invalid password' });
}
