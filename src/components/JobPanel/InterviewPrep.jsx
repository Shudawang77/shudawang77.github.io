import React, { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle2, BookMarked, ExternalLink } from 'lucide-react'

// 面试准备区 — 分类知识清单 + 常见题库 + 资源链接
const PREP_RESOURCES = [
  { label: '牛客网面经', url: 'https://www.nowcoder.com/discuss/experience', tag: '面经' },
  { label: '产品经理面经', url: 'https://www.nowcoder.com/discuss/tag/640', tag: '产品' },
  { label: '运营面经', url: 'https://www.nowcoder.com/discuss/tag/641', tag: '运营' },
  { label: '人人都是产品经理', url: 'https://www.woshipm.com/', tag: '产品' },
  { label: '运营派', url: 'https://www.yunyingpai.com/', tag: '运营' },
  { label: '实习僧', url: 'https://www.shixiseng.com/', tag: '招聘' },
  { label: '应届生求职网', url: 'https://www.yingjiesheng.com/', tag: '校招' },
  { label: '刺猬实习/求职', url: 'https://www.ciweishixi.com/', tag: '招聘' },
]

const DEFAULT_CHECKLIST = {
  '产品能力': [
    { id: 1, text: '产品分析: 挑1-2个常用App做体验报告', done: false },
    { id: 2, text: '需求分析: 用户/场景/痛点拆解', done: false },
    { id: 3, text: '产品设计题: 如何设计XX功能', done: false },
    { id: 4, text: '竞品分析方法论', done: false },
    { id: 5, text: '原型工具: Axure/Figma/墨刀基础', done: false },
  ],
  '运营能力': [
    { id: 6, text: '运营框架: 拉新/留存/促活/转化(AARRR)', done: false },
    { id: 7, text: '活动策划: 完整方案+复盘', done: false },
    { id: 8, text: '内容运营: 选题/爆款逻辑/账号运营', done: false },
    { id: 9, text: '用户/社群运营案例', done: false },
    { id: 10, text: '数据分析: 核心指标+Excel/SQL基础', done: false },
  ],
  '简历 & 案例': [
    { id: 11, text: '每段经历用 STAR 法则量化(曝光/增长/转化)', done: false },
    { id: 12, text: '自媒体/校园项目/实习作品集整理', done: false },
    { id: 13, text: '准备2-3个高光案例深度讲解', done: false },
  ],
  '行为面 & HR面': [
    { id: 14, text: '自我介绍(1分钟版+3分钟版)', done: false },
    { id: 15, text: '为什么做产品/运营 + 职业规划', done: false },
    { id: 16, text: '为什么选我们/对行业的理解', done: false },
    { id: 17, text: '优缺点 / 团队冲突 / 抗压案例', done: false },
    { id: 18, text: '反问面试官的问题清单', done: false },
  ],
}

const InterviewPrep = () => {
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('tj_job_checklist')
    return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST
  })
  const [newItems, setNewItems] = useState({})

  useEffect(() => {
    localStorage.setItem('tj_job_checklist', JSON.stringify(checklist))
  }, [checklist])

  const openLink = (url) => {
    if (window.electronAPI) window.electronAPI.openExternal(url)
    else window.open(url, '_blank')
  }

  const toggle = (cat, id) => {
    setChecklist({
      ...checklist,
      [cat]: checklist[cat].map(i => i.id === id ? { ...i, done: !i.done } : i),
    })
  }

  const addItem = (cat) => {
    const text = (newItems[cat] || '').trim()
    if (!text) return
    setChecklist({
      ...checklist,
      [cat]: [...checklist[cat], { id: Date.now(), text, done: false }],
    })
    setNewItems({ ...newItems, [cat]: '' })
  }

  const delItem = (cat, id) => {
    setChecklist({ ...checklist, [cat]: checklist[cat].filter(i => i.id !== id) })
  }

  // 总进度
  const allItems = Object.values(checklist).flat()
  const doneCount = allItems.filter(i => i.done).length
  const percent = allItems.length ? Math.round((doneCount / allItems.length) * 100) : 0

  return (
    <div className="interview-prep">
      {/* 总进度 */}
      <div className="prep-overview">
        <div className="prep-overview-text">
          <BookMarked size={16} />
          <span>面试准备总进度</span>
        </div>
        <div className="prep-overview-bar">
          <div className="prep-overview-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="prep-overview-percent">{doneCount}/{allItems.length} · {percent}%</span>
      </div>

      {/* 资源快链 */}
      <div className="prep-resources">
        <h4>🔗 备考资源</h4>
        <div className="prep-res-grid">
          {PREP_RESOURCES.map((r, i) => (
            <button key={i} className="prep-res-btn" onClick={() => openLink(r.url)}>
              <span className="prep-res-tag">{r.tag}</span>
              {r.label}
              <ExternalLink size={11} />
            </button>
          ))}
        </div>
      </div>

      {/* 分类清单 */}
      <div className="prep-checklist">
        {Object.entries(checklist).map(([cat, items]) => {
          const catDone = items.filter(i => i.done).length
          return (
            <div key={cat} className="prep-category">
              <h4 className="prep-cat-title">
                {cat} <span className="prep-cat-count">{catDone}/{items.length}</span>
              </h4>
              <div className="prep-items">
                {items.map(item => (
                  <div key={item.id} className={`prep-item ${item.done ? 'done' : ''}`}>
                    <button className={`todo-check ${item.done ? 'checked' : ''}`} onClick={() => toggle(cat, item.id)}>
                      {item.done && <CheckCircle2 size={15} />}
                    </button>
                    <span className="prep-item-text">{item.text}</span>
                    <button onClick={() => delItem(cat, item.id)} className="icon-btn danger tiny"><Trash2 size={11} /></button>
                  </div>
                ))}
              </div>
              <div className="prep-add">
                <input
                  value={newItems[cat] || ''}
                  onChange={e => setNewItems({ ...newItems, [cat]: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && addItem(cat)}
                  placeholder="+ 添加准备项..."
                  className="prep-add-input"
                />
                <button onClick={() => addItem(cat)} className="icon-btn primary small"><Plus size={14} /></button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default InterviewPrep
