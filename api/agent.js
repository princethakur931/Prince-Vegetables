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

const normalizeMessageContent = (content) => {
  if (typeof content !== 'string') {
    return '';
  }

  return content.trim();
};

const formatWebsiteContext = (value) => {
  if (!value || typeof value !== 'object') {
    return '';
  }

  try {
    return JSON.stringify(value);
  } catch {
    return '';
  }
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

  const apiKey = process.env.LONGCAT_API_KEY;
  const baseUrl = process.env.LONGCAT_API_BASE_URL || 'https://api.longcat.chat/openai/v1/chat/completions';
  const model = process.env.LONGCAT_MODEL || 'LongCat-Flash-Chat';

  if (!apiKey) {
    return res.status(500).json({ message: 'Missing LONGCAT_API_KEY environment variable' });
  }

  const body = readBody(req);
  const incomingMessages = Array.isArray(body.messages) ? body.messages : [];
  const systemPrompt = String(body.systemPrompt ?? '').trim();
  const websiteContext = formatWebsiteContext(body.websiteContext);
  const resolvedSystemPrompt = [
    systemPrompt || 'You are a helpful assistant for Prince Vegetables.',
    'Use the following website context as read-only knowledge. Do not claim editing/write access.',
    websiteContext
  ]
    .filter((part) => part && part.trim())
    .join('\n\n');

  const messages = [
    {
      role: 'system',
      content: resolvedSystemPrompt
    },
    ...incomingMessages
      .filter((message) => message && typeof message === 'object')
      .map((message) => ({
        role: message.role === 'assistant' ? 'assistant' : 'user',
        content: normalizeMessageContent(message.content)
      }))
      .filter((message) => message.content.length > 0)
  ];

  try {
    const upstreamResponse = await fetch(baseUrl, {
      method: 'POST',
      signal: AbortSignal.timeout(15000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        max_tokens: 260,
        temperature: 0.55
      })
    });

    const payload = await upstreamResponse.json().catch(() => ({}));

    if (!upstreamResponse.ok) {
      return res.status(upstreamResponse.status).json({
        message: payload?.error?.message || payload?.message || 'LongCat API request failed',
        error: payload?.error || payload
      });
    }

    const reply = payload?.choices?.[0]?.message?.content;

    if (typeof reply !== 'string' || !reply.trim()) {
      return res.status(502).json({ message: 'LongCat response did not include assistant text' });
    }

    return res.status(200).json({
      reply: reply.trim(),
      model: payload?.model || model,
      usage: payload?.usage || null
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to reach LongCat API',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
