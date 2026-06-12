import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const readRequestBody = async (request) => {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')

  if (!rawBody) {
    return {}
  }

  try {
    return JSON.parse(rawBody)
  } catch {
    return {}
  }
}

const formatWebsiteContext = (value) => {
  if (!value || typeof value !== 'object') {
    return ''
  }

  try {
    return JSON.stringify(value)
  } catch {
    return ''
  }
}

const normalizeModelId = (rawModel) => {
  const value = String(rawModel || '').trim()

  if (!value) {
    return 'moonshotai/kimi-k2'
  }

  if (value === 'moonshotai/kimi-k2.6-free') {
    return 'moonshotai/kimi-k2.6:free'
  }

  return value
}

const parseFallbackModels = (rawValue) =>
  String(rawValue || '')
    .split(',')
    .map((value) => normalizeModelId(value))
    .filter((value) => value.length > 0)

const shouldRetryWithFallback = (statusCode, message) => {
  if (statusCode === 429 || statusCode >= 500) {
    return true
  }

  const normalizedMessage = String(message || '').toLowerCase()
  return normalizedMessage.includes('not available')
    || normalizedMessage.includes('no endpoints found')
    || normalizedMessage.includes('no provider')
    || normalizedMessage.includes('rate limit')
}

const createAgentProxyPlugin = (env) => {
  const apiKey = env.OPENROUTER_API_KEY
  const apiBaseUrl =
    env.AGENT_API_BASE_URL ||
    env.OPENROUTER_API_BASE_URL ||
    'https://openrouter.ai/api/v1/chat/completions'
  const model = normalizeModelId(
    env.AGENT_MODEL || env.OPENROUTER_MODEL || 'moonshotai/kimi-k2'
  )
  const fallbackModels = parseFallbackModels(
    env.OPENROUTER_FALLBACK_MODELS || env.AGENT_FALLBACK_MODELS || 'moonshotai/kimi-k2,openai/gpt-4o-mini'
  )
  const modelCandidates = [model, ...fallbackModels].filter(
    (candidate, index, values) => candidate && values.indexOf(candidate) === index
  )
  const appSiteUrl = env.OPENROUTER_SITE_URL || env.APP_SITE_URL
  const appName = env.OPENROUTER_APP_NAME || 'Prince Vegetables'
  const useOpenRouterHeaders = apiBaseUrl.includes('openrouter.ai')

  return {
    name: 'agent-proxy',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (request.url !== '/api/agent') {
          return next()
        }

        response.setHeader('Access-Control-Allow-Origin', '*')
        response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        response.setHeader('Cache-Control', 'no-store')

        if (request.method === 'OPTIONS') {
          response.statusCode = 204
          response.end()
          return
        }

        if (request.method !== 'POST') {
          response.statusCode = 405
          response.setHeader('Allow', 'POST')
          response.end(JSON.stringify({ message: 'Method not allowed' }))
          return
        }

        if (!apiKey) {
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({
            message: 'Missing API key. Set OPENROUTER_API_KEY.'
          }))
          return
        }

        const body = await readRequestBody(request)
        const incomingMessages = Array.isArray(body.messages) ? body.messages : []
        const systemPrompt = String(body.systemPrompt ?? '').trim()
        const websiteContext = formatWebsiteContext(body.websiteContext)
        const resolvedSystemPrompt = [
          systemPrompt || 'You are a helpful assistant for Prince Vegetables.',
          'Use the following website context as read-only knowledge. Do not claim editing/write access.',
          websiteContext
        ]
          .filter((part) => part && part.trim())
          .join('\n\n')

        const messages = [
          {
            role: 'system',
            content: resolvedSystemPrompt
          },
          ...incomingMessages
            .filter((message) => message && typeof message === 'object')
            .map((message) => ({
              role: message.role === 'assistant' ? 'assistant' : 'user',
              content: typeof message.content === 'string' ? message.content.trim() : ''
            }))
            .filter((message) => message.content.length > 0)
        ]

        try {
          const headers = {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }

          if (useOpenRouterHeaders) {
            if (appSiteUrl) {
              headers['HTTP-Referer'] = appSiteUrl
            }
            if (appName) {
              headers['X-Title'] = appName
            }
          }

          response.setHeader('Content-Type', 'application/json')

          let lastError = null

          for (let index = 0; index < modelCandidates.length; index += 1) {
            const candidateModel = modelCandidates[index]

            try {
              const upstreamResponse = await fetch(apiBaseUrl, {
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
              })

              const payload = await upstreamResponse.json().catch(() => ({}))

              if (!upstreamResponse.ok) {
                const providerMessage = payload?.error?.message || payload?.message || 'AI provider request failed'
                const canRetry = useOpenRouterHeaders
                  && index < modelCandidates.length - 1
                  && shouldRetryWithFallback(upstreamResponse.status, providerMessage)

                lastError = {
                  status: upstreamResponse.status,
                  message: providerMessage,
                  error: payload?.error || payload,
                  model: candidateModel
                }

                if (canRetry) {
                  continue
                }

                response.statusCode = upstreamResponse.status
                response.end(JSON.stringify({
                  message: `${providerMessage} (model: ${candidateModel})`,
                  error: payload?.error || payload,
                  model: candidateModel
                }))
                return
              }

              const reply = payload?.choices?.[0]?.message?.content

              if (typeof reply !== 'string' || !reply.trim()) {
                lastError = {
                  status: 502,
                  message: 'AI response did not include assistant text',
                  error: payload,
                  model: candidateModel
                }
                continue
              }

              response.statusCode = 200
              response.end(JSON.stringify({
                reply: reply.trim(),
                model: payload?.model || candidateModel,
                usage: payload?.usage || null
              }))
              return
            } catch (attemptError) {
              lastError = {
                status: 500,
                message: attemptError instanceof Error ? attemptError.message : 'Unknown error',
                error: attemptError instanceof Error ? attemptError.message : attemptError,
                model: candidateModel
              }
            }
          }

          response.statusCode = lastError?.status || 500
          response.end(JSON.stringify({
            message: `${lastError?.message || 'Failed to reach AI provider API'} (model: ${lastError?.model || model})`,
            error: lastError?.error || null,
            model: lastError?.model || model
          }))
        } catch (error) {
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({
            message: 'Failed to reach AI provider API',
            error: error instanceof Error ? error.message : 'Unknown error'
          }))
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), createAgentProxyPlugin(env)],
    define: {
      __DEV_ADMIN_PASSWORD__: JSON.stringify(mode === 'development' ? env.ADMIN_PANEL_PASSWORD : null)
    }
  }
})
