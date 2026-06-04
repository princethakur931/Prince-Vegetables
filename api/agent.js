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

const normalizeModelId = (rawModel) => {
  const value = String(rawModel || '').trim();

  if (!value) {
    return 'moonshotai/kimi-k2';
  }

  if (value === 'moonshotai/kimi-k2.6-free') {
    return 'moonshotai/kimi-k2.6:free';
  }

  return value;
};

const parseFallbackModels = (rawValue) =>
  String(rawValue || '')
    .split(',')
    .map((value) => normalizeModelId(value))
    .filter((value) => value.length > 0);

const shouldRetryWithFallback = (statusCode, message) => {
  if (statusCode === 429 || statusCode >= 500) {
    return true;
  }

  const normalizedMessage = String(message || '').toLowerCase();
  return normalizedMessage.includes('not available')
    || normalizedMessage.includes('no endpoints found')
    || normalizedMessage.includes('no provider')
    || normalizedMessage.includes('rate limit');
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

  const apiKey = process.env.OPENROUTER_API_KEY;
  const baseUrl =
    process.env.AGENT_API_BASE_URL ||
    process.env.OPENROUTER_API_BASE_URL ||
    'https://openrouter.ai/api/v1/chat/completions';
  const model = normalizeModelId(
    process.env.AGENT_MODEL || process.env.OPENROUTER_MODEL || 'moonshotai/kimi-k2'
  );
  const fallbackModels = parseFallbackModels(
    process.env.OPENROUTER_FALLBACK_MODELS || process.env.AGENT_FALLBACK_MODELS || 'moonshotai/kimi-k2,openai/gpt-4o-mini'
  );
  const modelCandidates = [model, ...fallbackModels].filter(
    (candidate, index, values) => candidate && values.indexOf(candidate) === index
  );
  const appSiteUrl = process.env.OPENROUTER_SITE_URL || process.env.APP_SITE_URL;
  const appName = process.env.OPENROUTER_APP_NAME || 'Prince Vegetables';
  const useOpenRouterHeaders = baseUrl.includes('openrouter.ai');

  if (!apiKey) {
    return res.status(500).json({
      message: 'Missing API key. Set OPENROUTER_API_KEY.'
    });
  }

  const body = readBody(req);
  const incomingMessages = Array.isArray(body.messages) ? body.messages : [];
  const systemPrompt = String(body.systemPrompt ?? '').trim();
  const websiteContext = formatWebsiteContext(body.websiteContext);
  const formattingGuidelines = [
    'Formatting rules for Prince AI Agent:',
    '1. Start with a short title/heading and use emojis (🥔🥬🍅) where appropriate.',
    '2. Use numbered lists for steps, categories, or multiple items.',
    '3. Use bullet points for concise details; keep paragraphs short (1-2 lines).',
    '4. Highlight important information using **bold**.',
    '5. Contact block format: 📞 Phone:  |  📧 Email:  |  📍 Address:',
    '6. For product/category lists use numbering and short descriptions.',
    '7. End with a helpful follow-up question when relevant.',
    'Respond in a modern, mobile-friendly, easy-to-scan style.'
  ].filter(Boolean).join('\n');
  const resolvedSystemPrompt = [
    systemPrompt || 'You are a helpful assistant for Prince Vegetables.',
    'Use the following website context as read-only knowledge. Do not claim editing/write access.',
    'Give complete answers and do not stop halfway through a response.',
    formattingGuidelines,
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
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };

    if (useOpenRouterHeaders) {
      if (appSiteUrl) {
        headers['HTTP-Referer'] = appSiteUrl;
      }
      if (appName) {
        headers['X-Title'] = appName;
      }
    }

    let lastError = null;

    for (let index = 0; index < modelCandidates.length; index += 1) {
      const candidateModel = modelCandidates[index];

      try {
        const upstreamResponse = await fetch(baseUrl, {
          method: 'POST',
          signal: AbortSignal.timeout(15000),
          headers,
          body: JSON.stringify({
            model: candidateModel,
            messages,
            stream: false,
            max_tokens: 700,
            temperature: 0.55
          })
        });

        const payload = await upstreamResponse.json().catch(() => ({}));

        if (!upstreamResponse.ok) {
          const providerMessage = payload?.error?.message || payload?.message || 'AI provider request failed';
          const canRetry = useOpenRouterHeaders
            && index < modelCandidates.length - 1
            && shouldRetryWithFallback(upstreamResponse.status, providerMessage);

          lastError = {
            status: upstreamResponse.status,
            message: providerMessage,
            error: payload?.error || payload,
            model: candidateModel
          };

          if (canRetry) {
            continue;
          }

          return res.status(upstreamResponse.status).json({
            message: `${providerMessage} (model: ${candidateModel})`,
            error: payload?.error || payload,
            model: candidateModel
          });
        }

        const reply = payload?.choices?.[0]?.message?.content;

        if (typeof reply !== 'string' || !reply.trim()) {
          lastError = {
            status: 502,
            message: 'AI response did not include assistant text',
            error: payload,
            model: candidateModel
          };
          continue;
        }

        return res.status(200).json({
          reply: reply.trim(),
          model: payload?.model || candidateModel,
          usage: payload?.usage || null
        });
      } catch (attemptError) {
        lastError = {
          status: 500,
          message: attemptError instanceof Error ? attemptError.message : 'Unknown error',
          error: attemptError instanceof Error ? attemptError.message : attemptError,
          model: candidateModel
        };
      }
    }

    return res.status(lastError?.status || 500).json({
      message: `${lastError?.message || 'Failed to reach AI provider API'} (model: ${lastError?.model || model})`,
      error: lastError?.error || null,
      model: lastError?.model || model
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to reach AI provider API',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
