import React, { useState, useEffect } from 'react'
import { FileText, Plus, Trash2, ExternalLink, BookOpen, RefreshCw, Sparkles, TrendingUp, ChevronRight } from 'lucide-react'

const StudyPanel = () => {
  return (
    <div className="panel study-panel">
      <header className="panel-header">
        <h2><BookOpen size={24} /> 学习区</h2>
        <p className="panel-subtitle">论文管理 · 文献资讯 · 学术加油站</p>
      </header>
      <div className="panel-grid two-col">
        <PaperManager />
        <LiteratureFeed />
      </div>
    </div>
  )
}

// ========== 论文管理器 ==========
const PaperManager = () => {
  const [papers, setPapers] = useState(() => {
    const saved = localStorage.getItem('tj_papers')
    return saved ? JSON.parse(saved) : [
      { id: 1, title: '示例：深度学习在计算机视觉中的应用', status: 'writing', progress: 65, deadline: '2026-08-15', notes: '文献综述部分完成，方法部分需要补充' },
      { id: 2, title: '示例：基于Transformer的NLP模型研究', status: 'reading', progress: 30, deadline: '2026-09-01', notes: '还在收集资料阶段' },
    ]
  })
  const [newTitle, setNewTitle] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem('tj_papers', JSON.stringify(papers))
  }, [papers])

  const addPaper = () => {
    if (!newTitle.trim()) return
    setPapers([...papers, {
      id: Date.now(),
      title: newTitle.trim(),
      status: 'reading',
      progress: 0,
      deadline: '',
      notes: '',
    }])
    setNewTitle('')
  }

  const deletePaper = (id) => setPapers(papers.filter(p => p.id !== id))

  const updatePaper = (id, field, value) => {
    setPapers(papers.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const statusLabels = { reading: '📖 阅读中', writing: '✍️ 写作中', done: '✅ 完成', submitted: '📤 已提交' }
  const statusColors = { reading: '#6366F1', writing: '#F59E0B', done: '#10B981', submitted: '#8B5CF6' }

  return (
    <section className="card paper-manager">
      <div className="card-header">
        <h3>📝 论文管理</h3>
        <span className="card-badge">{papers.length} 篇</span>
      </div>

      {/* 添加论文 */}
      <div className="paper-add">
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addPaper()}
          placeholder="+ 添加新论文标题..."
          className="paper-input"
        />
        <button onClick={addPaper} className="icon-btn primary"><Plus size={16} /></button>
      </div>

      {/* 论文列表 */}
      <div className="paper-list">
        {papers.map(paper => (
          <div key={paper.id} className={`paper-item ${editingId === paper.id ? 'editing' : ''}`}>
            <div className="paper-top">
              <div className="paper-title-row">
                <FileText size={14} className="paper-icon" />
                {editingId === paper.id ? (
                  <input
                    value={paper.title}
                    onChange={e => updatePaper(paper.id, 'title', e.target.value)}
                    onBlur={() => setEditingId(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingId(null)}
                    autoFocus
                    className="paper-title-input"
                  />
                ) : (
                  <span className="paper-title" onDoubleClick={() => setEditingId(paper.id)}>{paper.title}</span>
                )}
              </div>
              <div className="paper-actions">
                <select
                  value={paper.status}
                  onChange={e => updatePaper(paper.id, 'status', e.target.value)}
                  className="paper-status-select"
                  style={{ color: statusColors[paper.status] }}
                >
                  {Object.entries(statusLabels).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
                <button onClick={() => deletePaper(paper.id)} className="icon-btn danger"><Trash2 size={13} /></button>
              </div>
            </div>

            {/* 进度条 */}
            <div className="paper-progress">
              <div className="progress-label">
                <span>进度</span>
                <span>{paper.progress}%</span>
              </div>
              <input
                type="range"
                min="0" max="100"
                value={paper.progress}
                onChange={e => updatePaper(paper.id, 'progress', parseInt(e.target.value))}
                className="progress-slider"
                style={{ '--progress': `${paper.progress}%` }}
              />
            </div>

            {/* 截止日期 & 备注 */}
            <div className="paper-meta">
              <input
                type="date"
                value={paper.deadline}
                onChange={e => updatePaper(paper.id, 'deadline', e.target.value)}
                className="paper-date"
              />
              <input
                type="text"
                value={paper.notes}
                onChange={e => updatePaper(paper.id, 'notes', e.target.value)}
                placeholder="备注..."
                className="paper-notes"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ========== 文献资讯站 ==========
const LiteratureFeed = () => {
  const [articles, setArticles] = useState([
    { id: 1, source: 'arXiv', title: 'LLM在科学发现中的最新应用综述', date: '2026-07-28', hot: true, tags: ['AI', '综述'], url: 'https://arxiv.org/list/cs.AI/recent' },
    { id: 2, source: 'Nature', title: '机器学习加速新材料开发的突破性进展', date: '2026-07-27', hot: true, tags: ['材料', 'ML'], url: 'https://www.nature.com' },
    { id: 3, source: '知网', title: '基于深度学习的学术文本自动摘要研究', date: '2026-07-26', hot: false, tags: ['NLP', '学术'], url: 'https://www.cnki.net' },
    { id: 4, source: 'Google Scholar', title: '计算机视觉中的自监督学习范式转变', date: '2026-07-25', hot: true, tags: ['CV', '自监督'], url: 'https://scholar.google.com' },
    { id: 5, source: 'arXiv', title: '强化学习在推荐系统中的应用与挑战', date: '2026-07-24', hot: false, tags: ['RL', '推荐'], url: 'https://arxiv.org/list/cs.IR/recent' },
    { id: 6, source: 'Science', title: '大数据分析揭示气候变化对农业的影响模式', date: '2026-07-23', hot: false, tags: ['数据分析', '气候'], url: 'https://www.science.org' },
  ])

  const openArticle = (url) => {
    if (window.electronAPI) {
      window.electronAPI.openExternal(url)
    } else {
      window.open(url, '_blank')
    }
  }

  const refreshArticles = () => {
    // 模拟刷新 - 实际使用时可以接入 RSS/API
    const newArticle = {
      id: Date.now(),
      source: 'arXiv',
      title: '【新】人工智能在前沿科学研究中的交叉应用',
      date: new Date().toISOString().slice(0, 10),
      hot: true,
      tags: ['AI', '交叉学科'],
      url: 'https://arxiv.org'
    }
    setArticles([newArticle, ...articles.slice(0, 9)])
  }

  return (
    <section className="card literature-feed">
      <div className="card-header">
        <h3>📰 文献资讯站</h3>
        <button onClick={refreshArticles} className="icon-btn ghost" title="刷新">
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="feed-tabs">
        <button className="feed-tab active">🔥 热点追踪</button>
        <button className="feed-tab">📚 最新文献</button>
        <button className="feed-tab">⭐ 我的收藏</button>
      </div>

      <div className="article-list">
        {articles.map(article => (
          <div key={article.id} className="article-item" onClick={() => openArticle(article.url)}>
            <div className="article-left">
              <span className={`article-source source-${article.source.toLowerCase().replace(/\s/g, '-')}`}>
                {article.source}
              </span>
              {article.hot && <Sparkles size={12} className="hot-icon" />}
            </div>
            <div className="article-body">
              <span className="article-title">{article.title}</span>
              <div className="article-tags">
                {article.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="article-right">
              <span className="article-date">{article.date}</span>
              <ExternalLink size={12} className="external-icon" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StudyPanel
