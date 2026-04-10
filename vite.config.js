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

const createAgentProxyPlugin = (env) => {
  const apiKey = env.LONGCAT_API_KEY
  const apiBaseUrl = env.LONGCAT_API_BASE_URL || 'https://api.longcat.chat/openai/v1/chat/completions'
  const model = env.LONGCAT_MODEL || 'LongCat-Flash-Chat'

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
          response.end(JSON.stringify({ message: 'Missing LONGCAT_API_KEY environment variable' }))
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
          const upstreamResponse = await fetch(apiBaseUrl, {
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
          })

          const payload = await upstreamResponse.json().catch(() => ({}))

          response.setHeader('Content-Type', 'application/json')

          if (!upstreamResponse.ok) {
            response.statusCode = upstreamResponse.status
            response.end(JSON.stringify({
              message: payload?.error?.message || payload?.message || 'LongCat API request failed',
              error: payload?.error || payload
            }))
            return
          }

          const reply = payload?.choices?.[0]?.message?.content

          if (typeof reply !== 'string' || !reply.trim()) {
            response.statusCode = 502
            response.end(JSON.stringify({ message: 'LongCat response did not include assistant text' }))
            return
          }

          response.statusCode = 200
          response.end(JSON.stringify({
            reply: reply.trim(),
            model: payload?.model || model,
            usage: payload?.usage || null
          }))
        } catch (error) {
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({
            message: 'Failed to reach LongCat API',
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
