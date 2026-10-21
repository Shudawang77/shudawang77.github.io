// Claude API 客户端 — 用于 JD 拆解等 AI 能力
// API key 存在浏览器本地 localStorage，不上传任何服务器

const STORE_KEY = 'tj_claude_config'

export function getApiConfig() {
  const saved = localStorage.getItem(STORE_KEY)
  return saved ? JSON.parse(saved) : { apiKey: '', model: 'claude-sonnet-4-5-20250929' }
}

export function saveApiConfig(config) {
  localStorage.setItem(STORE_KEY, JSON.stringify(config))
}

export function hasApiKey() {
  return !!getApiConfig().apiKey
}

/**
 * 调用 Claude API 生成文本
 * @param {string} prompt 用户提示
 * @param {object} opts { system, maxTokens }
 * @returns {Promise<string>} 模型返回的文本
 */
export async function callClaude(prompt, opts = {}) {
  const { apiKey, model } = getApiConfig()
  if (!apiKey) throw new Error('未配置 API Key')

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      // 允许在浏览器/Electron 渲染进程中直接调用
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: model || 'claude-sonnet-4-5-20250929',
      max_tokens: opts.maxTokens || 1500,
      system: opts.system || undefined,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    let detail = ''
    try {
      const err = await res.json()
      detail = err?.error?.message || JSON.stringify(err)
    } catch {
      detail = `HTTP ${res.status}`
    }
    throw new Error(detail)
  }

  const data = await res.json()
  return data?.content?.[0]?.text || ''
}

/**
 * 从模型返回文本中提取 JSON（模型有时会包裹 ```json 代码块）
 */
export function extractJson(text) {
  if (!text) return null
  // 优先匹配 ```json ... ``` 或 ``` ... ```
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const raw = fenced ? fenced[1] : text
  try {
    return JSON.parse(raw.trim())
  } catch {
    // 尝试截取第一个 { 到最后一个 }
    const start = raw.indexOf('{')
    const end = raw.lastIndexOf('}')
    if (start !== -1 && end !== -1) {
      try { return JSON.parse(raw.slice(start, end + 1)) } catch { return null }
    }
    return null
  }
}
