import React, { useState, useEffect } from 'react'
import { RefreshCw, ExternalLink, Megaphone, Calendar, Plus, Trash2, Link2 } from 'lucide-react'
import { SEED_NEWS, AGGREGATORS } from '../../data/news'

const TYPE_COLORS = {
  'AI': '#8B7CE8',
  '互联网': '#E8927C',
  '文娱传媒': '#C77DBB',
  '快消': '#7CBF8A',
  '央国企': '#9B6B4A',
  '外企': '#7CAED0',
}

const JobNews = () => {
  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('tj_job_news_v6')
    return saved ? JSON.parse(saved) : SEED_NEWS
  })
  const [filter, setFilter] = useState('全部')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ company: '', type: '互联网', title: '', url: '' })

  useEffect(() => {
    localStorage.setItem('tj_job_news_v6', JSON.stringify(news))
  }, [news])

  const openLink = (url) => {
    if (window.electronAPI) window.electronAPI.openExternal(url)
    else window.open(url, '_blank')
  }

  const addNews = () => {
    if (!form.company.trim() || !form.title.trim()) return
    setNews([{
      id: Date.now(),
      company: form.company.trim(),
      type: form.type,
      title: form.title.trim(),
      url: form.url.trim() || '#',
      date: new Date().toISOString().slice(0, 10),
      hot: false,
      custom: true,
    }, ...news])
    setForm({ company: '', type: '互联网', title: '', url: '' })
    setShowAdd(false)
  }

  const delNews = (id) => setNews(news.filter(n => n.id !== id))
  const restore = () => { setNews(SEED_NEWS); localStorage.setItem('tj_job_news_v6', JSON.stringify(SEED_NEWS)) }

  const filtered = filter === '全部' ? news : news.filter(n => n.type === filter)

  return (
    <div className="job-news">
      {/* 聚合站快链 */}
      <div className="news-aggregators">
        <span className="agg-label"><Link2 size={13} /> 秋招信息聚合站（点击查看实时更新）：</span>
        {AGGREGATORS.map((a, i) => (
          <button key={i} className="agg-btn" onClick={() => openLink(a.url)}>{a.label}</button>
        ))}
      </div>

      <div className="news-toolbar">
        <div className="news-filters">
          {['全部', 'AI', '互联网', '文娱传媒', '快消', '央国企', '外企'].map(f => (
            <button key={f} className={`news-filter ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="news-update">
          <button onClick={() => setShowAdd(!showAdd)} className="jd-add-btn"><Plus size={14} /> 记录</button>
          <button onClick={restore} className="icon-btn ghost" title="恢复内置资讯"><RefreshCw size={14} /></button>
        </div>
      </div>

      {showAdd && (
        <div className="news-add-card">
          <div className="jd-input-row">
            <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="公司" className="jd-input" />
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="jd-input">
              {Object.keys(TYPE_COLORS).map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="资讯标题，如：XX公司2027秋招开启" className="jd-input" style={{ width: '100%', marginBottom: 8 }} />
          <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="链接（可选）" className="jd-input" style={{ width: '100%', marginBottom: 8 }} />
          <div className="jd-input-actions">
            <button onClick={() => setShowAdd(false)} className="jd-btn-cancel">取消</button>
            <button onClick={addNews} className="jd-btn-analyze">保存</button>
          </div>
        </div>
      )}

      <div className="news-list">
        {filtered.map(item => (
          <div key={item.id} className="news-item">
            <div className="news-item-left" onClick={() => item.url !== '#' && openLink(item.url)}>
              <span className="news-type-badge" style={{ background: (TYPE_COLORS[item.type] || '#999') + '22', color: TYPE_COLORS[item.type] || '#999' }}>{item.type}</span>
              {item.hot && <Megaphone size={13} className="news-hot" />}
            </div>
            <div className="news-item-body" onClick={() => item.url !== '#' && openLink(item.url)}>
              <div className="news-item-title">
                <span className="news-company">{item.company}</span>
                <span className="news-text">{item.title}</span>
              </div>
              <div className="news-item-date"><Calendar size={11} /> {item.date}</div>
            </div>
            {item.custom
              ? <button onClick={() => delNews(item.id)} className="icon-btn danger small"><Trash2 size={13} /></button>
              : item.url !== '#' && <ExternalLink size={13} className="news-external" onClick={() => openLink(item.url)} />}
          </div>
        ))}
      </div>

      <p className="news-tip">💡 秋招信息更新极快，建议每天点上方聚合站（牛客/实习僧/应届生）看最新开奖与内推。看到重要公告可点「记录」存到这里，方便追踪。</p>
    </div>
  )
}

export default JobNews
