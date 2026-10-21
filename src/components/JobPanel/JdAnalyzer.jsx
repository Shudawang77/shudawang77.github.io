import React, { useState, useEffect } from 'react'
import { Wand2, Trash2, Plus, FileSearch, Target, CheckCircle2, AlertTriangle, Lightbulb, Settings as SettingsIcon, Sparkles } from 'lucide-react'
import { hasApiKey, callClaude, extractJson } from '../../lib/apiClient'
import Settings from './Settings'

// JD 拆解器 — 粘贴岗位JD，AI拆解核心要求 + 投递建议
const JdAnalyzer = () => {
  const [jds, setJds] = useState(() => {
    const saved = localStorage.getItem('tj_job_jds')
    return saved ? JSON.parse(saved) : [SAMPLE_JD]
  })
  const [showInput, setShowInput] = useState(false)
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [jdText, setJdText] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [error, setError] = useState('')
  const [apiReady, setApiReady] = useState(hasApiKey())

  useEffect(() => {
    localStorage.setItem('tj_job_jds', JSON.stringify(jds))
  }, [jds])

  const analyze = async () => {
    if (!company.trim() || !role.trim() || !jdText.trim()) return
    setAnalyzing(true)
    setError('')

    if (hasApiKey()) {
      // 真实 AI 拆解
      try {
        const result = await aiAnalyze(company.trim(), role.trim(), jdText.trim())
        setJds([result, ...jds])
        setCompany(''); setRole(''); setJdText('')
        setShowInput(false)
      } catch (e) {
        setError('AI 拆解失败：' + e.message + '（已使用本地规则版兜底）')
        setJds([mockAnalyze(company.trim(), role.trim(), jdText.trim()), ...jds])
        setCompany(''); setRole(''); setJdText('')
        setShowInput(false)
      }
    } else {
      // 无 API key，用本地规则版
      await new Promise(r => setTimeout(r, 900))
      setJds([mockAnalyze(company.trim(), role.trim(), jdText.trim()), ...jds])
      setCompany(''); setRole(''); setJdText('')
      setShowInput(false)
    }
    setAnalyzing(false)
  }

  const deleteJd = (id) => setJds(jds.filter(j => j.id !== id))

  return (
    <div className="jd-analyzer">
      {showSettings && <Settings onClose={() => { setShowSettings(false); setApiReady(hasApiKey()) }} />}
      <div className="jd-toolbar">
        <p className="jd-desc">
          📋 粘贴岗位 JD，AI 拆解核心要求与投递建议
          {apiReady
            ? <span className="jd-ai-badge on"><Sparkles size={11} /> 真实AI已启用</span>
            : <span className="jd-ai-badge off">规则版（未配置API）</span>}
        </p>
        <div className="jd-toolbar-btns">
          <button className="icon-btn ghost" onClick={() => setShowSettings(true)} title="AI 设置">
            <SettingsIcon size={16} />
          </button>
          <button className="jd-add-btn" onClick={() => setShowInput(!showInput)}>
            <Plus size={15} /> 新增 JD 拆解
          </button>
        </div>
      </div>
      {error && <div className="jd-warning" style={{ marginBottom: 12 }}><AlertTriangle size={13} /> {error}</div>}

      {showInput && (
        <div className="jd-input-card">
          <div className="jd-input-row">
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="公司名，如：字节跳动" className="jd-input" />
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="岗位名，如：后端开发工程师" className="jd-input" />
          </div>
          <textarea
            value={jdText}
            onChange={e => setJdText(e.target.value)}
            placeholder="在此粘贴完整的岗位 JD（岗位职责 + 任职要求）..."
            className="jd-textarea"
            rows={6}
          />
          <div className="jd-input-actions">
            <button onClick={() => setShowInput(false)} className="jd-btn-cancel">取消</button>
            <button onClick={analyze} className="jd-btn-analyze" disabled={analyzing}>
              {analyzing ? <><Wand2 size={14} className="spinning" /> AI 拆解中...</> : <><Wand2 size={14} /> 开始拆解</>}
            </button>
          </div>
        </div>
      )}

      <div className="jd-list">
        {jds.map(jd => (
          <JdCard key={jd.id} jd={jd} onDelete={deleteJd} />
        ))}
      </div>
    </div>
  )
}

const JdCard = ({ jd, onDelete }) => (
  <div className="jd-card">
    <div className="jd-card-header">
      <div className="jd-card-title">
        <FileSearch size={16} className="jd-icon" />
        <div>
          <span className="jd-company">{jd.company} {jd.byAI && <Sparkles size={12} style={{ color: '#E8927C', verticalAlign: 'middle' }} />}</span>
          <span className="jd-role">{jd.role}</span>
        </div>
      </div>
      <div className="jd-match-badge" data-level={jd.matchLevel}>
        匹配度 {jd.match}%
      </div>
      <button onClick={() => onDelete(jd.id)} className="icon-btn danger small"><Trash2 size={13} /></button>
    </div>

    <div className="jd-section">
      <h4><Target size={13} /> 核心能力要求</h4>
      <div className="jd-tags">
        {jd.coreSkills.map((s, i) => <span key={i} className="jd-skill-tag">{s}</span>)}
      </div>
    </div>

    <div className="jd-section">
      <h4><CheckCircle2 size={13} /> AI 拆解要点</h4>
      <ul className="jd-points">
        {jd.breakdown.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>

    <div className="jd-section jd-advice">
      <h4><Lightbulb size={13} /> 投递建议</h4>
      <p>{jd.advice}</p>
    </div>

    {jd.warning && (
      <div className="jd-warning">
        <AlertTriangle size={13} /> {jd.warning}
      </div>
    )}
  </div>
)

// 真实 AI 拆解（调用 Claude API）
async function aiAnalyze(company, role, jdText) {
  const system = `你是资深的秋招求职顾问，尤其熟悉产品经理、产品运营、内容/用户运营岗位。用户是新闻传播学专业的2027届应届生。请分析岗位JD并严格以JSON格式输出，不要输出任何JSON以外的内容。`
  const prompt = `请分析以下岗位JD，输出JSON，字段如下：
{
  "match": 数字0-100（对新传背景+产品/运营求职者的匹配度）,
  "coreSkills": [核心能力标签，4-6个短词],
  "breakdown": [AI拆解要点，4条，每条一句话，具体可执行],
  "advice": "投递建议，2-3句，结合新传背景",
  "warning": "风险提示（无风险则为null）"
}

公司：${company}
岗位：${role}
JD内容：
${jdText}`

  const text = await callClaude(prompt, { system, maxTokens: 1200 })
  const parsed = extractJson(text)
  if (!parsed) throw new Error('返回格式无法解析')

  const match = Math.max(0, Math.min(100, Number(parsed.match) || 70))
  return {
    id: Date.now(),
    company, role,
    match,
    matchLevel: match >= 80 ? 'high' : match >= 65 ? 'mid' : 'low',
    coreSkills: Array.isArray(parsed.coreSkills) ? parsed.coreSkills.slice(0, 6) : ['产品/运营基础'],
    breakdown: Array.isArray(parsed.breakdown) ? parsed.breakdown : [String(parsed.breakdown || '')],
    advice: parsed.advice || '',
    warning: parsed.warning && parsed.warning !== 'null' ? parsed.warning : null,
    byAI: true,
  }
}

// 模拟 AI 拆解逻辑（无 API key 时的规则版兜底）
function mockAnalyze(company, role, text) {
  const lower = text.toLowerCase()
  const skillPool = [
    // 产品/运营方向（新传主投）
    { kw: ['产品经理', '需求', 'prd', '产品设计'], tag: '产品设计/PRD' },
    { kw: ['用户增长', '拉新', '留存', '增长'], tag: '用户增长' },
    { kw: ['内容运营', '内容', '选题', '编辑'], tag: '内容运营' },
    { kw: ['活动运营', '活动策划'], tag: '活动运营' },
    { kw: ['用户运营', '社群', '社区运营'], tag: '用户/社群运营' },
    { kw: ['新媒体', '公众号', '短视频', '小红书', '抖音'], tag: '新媒体运营' },
    { kw: ['数据分析', 'sql', '数据驱动', 'excel'], tag: '数据分析' },
    { kw: ['竞品', '市场调研', '用户调研'], tag: '竞品/用户调研' },
    { kw: ['文案', '策划', 'copywriting'], tag: '文案策划' },
    { kw: ['品牌', 'branding', '营销'], tag: '品牌营销' },
    { kw: ['项目管理', '推进', '跨部门'], tag: '项目推进' },
    { kw: ['axure', '原型', 'figma', '墨刀'], tag: '原型工具' },
    { kw: ['沟通', '协作', '协调'], tag: '沟通协作' },
    { kw: ['英语', 'english', '英文'], tag: '英语能力' },
    // 技术方向（少量兼容）
    { kw: ['java', 'python', '开发', '后端', '前端'], tag: '技术开发' },
  ]
  const coreSkills = skillPool.filter(s => s.kw.some(k => lower.includes(k))).map(s => s.tag)
  if (coreSkills.length === 0) coreSkills.push('产品/运营基础', '学习能力', '沟通协作')

  const match = Math.floor(60 + Math.random() * 35)
  const matchLevel = match >= 80 ? 'high' : match >= 65 ? 'mid' : 'low'

  return {
    id: Date.now(),
    company, role,
    match, matchLevel,
    coreSkills: coreSkills.slice(0, 6),
    breakdown: [
      `岗位核心考察：${coreSkills.slice(0, 3).join('、')}等能力`,
      '简历用 STAR 法则量化成果：如"运营活动带来XX万曝光/新增XX用户"',
      lower.includes('实习') ? '明确要求实习经历，务必在简历前置展示对口实习' : '应届生友好，可用课程项目、自媒体账号、校园活动补充',
      '针对该岗位定制简历，关键词与 JD 对齐，产品/运营岗尤其看重数据结果',
    ],
    advice: match >= 80
      ? '匹配度高，建议优先冲刺！可走提前批，简历突出核心技能栈，准备该方向的深度项目讲解。'
      : match >= 65
      ? '匹配度中等，值得投递。补齐 JD 中缺失的关键技能，面试前针对性刷相关题目。'
      : '匹配度偏低，可作为练手投递。建议先补齐核心技能，或考虑更匹配的岗位方向。',
    warning: match < 65 ? '部分核心要求未匹配，投递前建议评估性价比' : null,
  }
}

const SAMPLE_JD = {
  id: 1,
  company: '小红书',
  role: '社区内容运营',
  match: 82,
  matchLevel: 'high',
  coreSkills: ['内容运营', '新媒体运营', '用户/社群运营', '数据分析', '文案策划'],
  breakdown: [
    '岗位核心考察：内容策划能力、对社区生态和用户的理解',
    '简历用数据说话：如"运营账号涨粉XX万""策划内容曝光XX万"',
    '突出自媒体运营、爆款内容案例，新传专业对内容敏感是加分项',
    '面试常考：如何做一场活动、如何提升某指标、你关注的爆款拆解',
  ],
  advice: '匹配度高，非常对口！建议冲刺。准备1-2个亲手运营的账号/项目案例，面试时能讲清楚"目标-动作-数据结果-复盘"。',
  warning: null,
}

export default JdAnalyzer
