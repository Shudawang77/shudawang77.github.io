import React, { useState, useEffect } from 'react'
import { Plus, Trash2, TrendingUp, NotebookPen, Clock } from 'lucide-react'

function daysSince(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr)
  d.setHours(0, 0, 0, 0)
  return Math.floor((today - d) / (1000 * 60 * 60 * 24))
}

// 投递状态流转
const STAGES = [
  { key: 'applied', label: '已投递', color: '#B8A088' },
  { key: 'written', label: '笔试', color: '#7CAED0' },
  { key: 'interview1', label: '一面', color: '#F5C04C' },
  { key: 'interview2', label: '二面', color: '#F0A860' },
  { key: 'interview3', label: '三面/HR', color: '#E8927C' },
  { key: 'offer', label: 'Offer', color: '#7CBF8A' },
  { key: 'rejected', label: '已挂', color: '#D08080' },
]

const SEED = []

const ApplyTracker = () => {
  const [apps, setApps] = useState(() => {
    const saved = localStorage.getItem('tj_job_apps_v2')
    return saved ? JSON.parse(saved) : SEED
  })
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ company: '', role: '', type: '互联网' })

  useEffect(() => {
    localStorage.setItem('tj_job_apps_v2', JSON.stringify(apps))
  }, [apps])

  const addApp = () => {
    if (!form.company.trim() || !form.role.trim()) return
    setApps([{
      id: Date.now(),
      company: form.company.trim(),
      role: form.role.trim(),
      type: form.type,
      stage: 'applied',
      date: new Date().toISOString().slice(0, 10),
      note: '',
    }, ...apps])
    setForm({ company: '', role: '', type: '互联网' })
    setShowAdd(false)
  }

  const updateApp = (id, field, val) => setApps(apps.map(a => a.id === id ? { ...a, [field]: val } : a))
  const deleteApp = (id) => setApps(apps.filter(a => a.id !== id))

  // 统计
  const stats = {
    total: apps.length,
    interviewing: apps.filter(a => ['interview1', 'interview2', 'interview3'].includes(a.stage)).length,
    offer: apps.filter(a => a.stage === 'offer').length,
    rejected: apps.filter(a => a.stage === 'rejected').length,
  }

  return (
    <div className="apply-tracker">
      {/* 统计卡 */}
      <div className="tracker-stats">
        <div className="stat-card"><span className="stat-num">{stats.total}</span><span className="stat-label">总投递</span></div>
        <div className="stat-card interviewing"><span className="stat-num">{stats.interviewing}</span><span className="stat-label">面试中</span></div>
        <div className="stat-card offer"><span className="stat-num">{stats.offer}</span><span className="stat-label">Offer</span></div>
        <div className="stat-card rejected"><span className="stat-num">{stats.rejected}</span><span className="stat-label">已挂</span></div>
      </div>

      <div className="tracker-header">
        <h3><TrendingUp size={16} /> 投递进度</h3>
        <button className="jd-add-btn" onClick={() => setShowAdd(!showAdd)}><Plus size={15} /> 新增投递</button>
      </div>

      {showAdd && (
        <div className="tracker-add-row">
          <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="公司" className="jd-input" />
          <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="岗位" className="jd-input" />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="jd-input">
            <option>AI</option><option>互联网</option><option>文娱传媒</option><option>快消</option><option>央国企</option><option>外企</option>
          </select>
          <button onClick={addApp} className="jd-btn-analyze">添加</button>
        </div>
      )}

      <div className="tracker-list">
        {apps.map(app => {
          const stage = STAGES.find(s => s.key === app.stage) || STAGES[0]
          return (
            <div key={app.id} className="tracker-item">
              <div className="tracker-item-top">
                <div className="tracker-company-info">
                  <span className="tracker-company">{app.company}</span>
                  <span className="tracker-role">{app.role}</span>
                  <span className="tracker-type-tag">{app.type}</span>
                  {app.stage === 'applied' && daysSince(app.date) >= 14 && (
                    <span className="tracker-stale-tip" title={`投递已 ${daysSince(app.date)} 天无进展`}>
                      <Clock size={11} /> {daysSince(app.date)}天无进展
                    </span>
                  )}
                </div>
                <select
                  value={app.stage}
                  onChange={e => updateApp(app.id, 'stage', e.target.value)}
                  className="tracker-stage-select"
                  style={{ color: stage.color, borderColor: stage.color }}
                >
                  {STAGES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
                <button onClick={() => deleteApp(app.id)} className="icon-btn danger small"><Trash2 size={13} /></button>
              </div>
              {/* 进度条 */}
              <div className="tracker-progress">
                {STAGES.slice(0, 6).map((s, i) => {
                  const curIdx = STAGES.findIndex(x => x.key === app.stage)
                  const isRejected = app.stage === 'rejected'
                  const done = !isRejected && i <= curIdx
                  return (
                    <div key={s.key} className={`tracker-step ${done ? 'done' : ''}`} title={s.label}>
                      <div className="step-dot" style={done ? { background: s.color } : {}} />
                      {i < 5 && <div className={`step-line ${done && i < curIdx ? 'done' : ''}`} />}
                    </div>
                  )
                })}
              </div>
              <input
                value={app.note}
                onChange={e => updateApp(app.id, 'note', e.target.value)}
                placeholder="记录进展、面试反馈、复盘..."
                className="tracker-note"
              />
            </div>
          )
        })}
      </div>

      <ReviewSection />
    </div>
  )
}

// 总结复盘区
const ReviewSection = () => {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('tj_job_reviews_v2')
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    localStorage.setItem('tj_job_reviews_v2', JSON.stringify(reviews))
  }, [reviews])

  const add = () => {
    if (!input.trim()) return
    setReviews([{ id: Date.now(), title: title.trim() || '复盘笔记', content: input.trim(), date: new Date().toISOString().slice(0, 10) }, ...reviews])
    setInput(''); setTitle('')
  }

  const del = (id) => setReviews(reviews.filter(r => r.id !== id))

  return (
    <div className="review-section">
      <h3><NotebookPen size={16} /> 总结复盘</h3>
      <div className="review-add">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="标题，如：腾讯二面复盘" className="jd-input review-title-input" />
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="记录面试问题、答得好/不好的地方、下次改进点..." className="jd-textarea" rows={3} />
        <button onClick={add} className="jd-btn-analyze">保存复盘</button>
      </div>
      <div className="review-list">
        {reviews.map(r => (
          <div key={r.id} className="review-item">
            <div className="review-item-head">
              <span className="review-title">{r.title}</span>
              <span className="review-date">{r.date}</span>
              <button onClick={() => del(r.id)} className="icon-btn danger tiny"><Trash2 size={11} /></button>
            </div>
            <p className="review-content">{r.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApplyTracker
