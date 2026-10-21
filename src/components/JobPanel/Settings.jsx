import React, { useState } from 'react'
import { Key, Check, X, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { getApiConfig, saveApiConfig } from '../../lib/apiClient'

const MODELS = [
  { id: 'claude-sonnet-4-5-20250929', label: 'Claude Sonnet 4.5（推荐，均衡）' },
  { id: 'claude-opus-4-1-20250805', label: 'Claude Opus 4.1（最强，较贵）' },
  { id: 'claude-3-5-haiku-20241022', label: 'Claude Haiku 3.5（最快最便宜）' },
]

const Settings = ({ onClose }) => {
  const cfg = getApiConfig()
  const [apiKey, setApiKey] = useState(cfg.apiKey || '')
  const [model, setModel] = useState(cfg.model || MODELS[0].id)
  const [show, setShow] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = () => {
    saveApiConfig({ apiKey: apiKey.trim(), model })
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose && onClose() }, 800)
  }

  const openLink = (url) => {
    if (window.electronAPI) window.electronAPI.openExternal(url)
    else window.open(url, '_blank')
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h3><Key size={18} /> AI 设置</h3>
          <button className="icon-btn ghost" onClick={onClose}><X size={18} /></button>
        </div>

        <p className="settings-desc">
          配置 Claude API Key 后，JD 拆解将使用真实 AI 分析。Key 仅保存在本机，不会上传。
        </p>

        <label className="settings-label">API Key</label>
        <div className="settings-key-row">
          <input
            type={show ? 'text' : 'password'}
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
            className="settings-input"
          />
          <button className="icon-btn ghost" onClick={() => setShow(!show)}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <label className="settings-label">模型</label>
        <select value={model} onChange={e => setModel(e.target.value)} className="settings-input">
          {MODELS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>

        <button className="settings-link" onClick={() => openLink('https://console.anthropic.com/settings/keys')}>
          还没有 Key？前往 Anthropic 控制台获取 <ExternalLink size={12} />
        </button>

        <div className="settings-actions">
          <button onClick={onClose} className="jd-btn-cancel">取消</button>
          <button onClick={save} className="jd-btn-analyze">
            {saved ? <><Check size={14} /> 已保存</> : '保存'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
