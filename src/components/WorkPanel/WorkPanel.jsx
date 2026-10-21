import React, { useState, useEffect } from 'react'
import { Briefcase, Plus, Trash2, GripVertical, Play, Pause, CheckCircle2, Clock, Flame, TrendingUp, Lightbulb, Copy, Wand2, ExternalLink, RefreshCw } from 'lucide-react'

const WorkPanel = () => {
  return (
    <div className="panel work-panel">
      <header className="panel-header">
        <h2><Briefcase size={24} /> 工作区</h2>
        <p className="panel-subtitle">工作进度 · 待办管理 · 素材灵感</p>
      </header>
      <div className="panel-grid work-grid">
        <WorkProgress />
        <WorkTodo />
        <CountdownBoard />
        <InspirationBoard />
      </div>
    </div>
  )
}

// ========== 工作进度面板 ==========
const WorkProgress = () => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('tj_projects')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: '暑期活动页面设计', status: 'doing', progress: 70, deadline: '2026-08-05', desc: '主视觉已完成，交互细节优化中' },
      { id: 2, name: '专题组货方案', status: 'doing', progress: 45, deadline: '2026-08-10', desc: '品类结构梳理完毕' },
      { id: 3, name: '大广赛作品完善', status: 'todo', progress: 80, deadline: '2026-08-15', desc: '最终校对和提交' },
    ]
  })

  useEffect(() => {
    localStorage.setItem('tj_projects', JSON.stringify(projects))
  }, [projects])

  const statusConfig = {
    todo: { label: '待开始', color: '#94A3B8', icon: <Clock size={12} /> },
    doing: { label: '进行中', color: '#F59E0B', icon: <Play size={12} /> },
    review: { label: '审核中', color: '#6366F1', icon: <GripVertical size={12} /> },
    done: { label: '已完成', color: '#10B981', icon: <CheckCircle2 size={12} /> },
  }

  const updateProject = (id, field, value) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const addProject = () => {
    const name = prompt('项目名称：')
    if (!name) return
    setProjects([...projects, { id: Date.now(), name, status: 'todo', progress: 0, deadline: '', desc: '' }])
  }

  const deleteProject = (id) => setProjects(projects.filter(p => p.id !== id))

  return (
    <section className="card progress-board">
      <div className="card-header">
        <h3>📊 工作进度</h3>
        <button onClick={addProject} className="icon-btn primary small"><Plus size={14} /></button>
      </div>
      <div className="project-list">
        {projects.map(p => {
          const cfg = statusConfig[p.status]
          const isUrgent = p.deadline && new Date(p.deadline) - new Date() < 7 * 86400000 && p.status !== 'done'
          return (
            <div key={p.id} className={`project-item ${isUrgent ? 'urgent' : ''}`}>
              <div className="project-top">
                <span className="project-name">{p.name}</span>
                {isUrgent && <Flame size={13} className="urgent-icon" />}
              </div>
              <div className="project-meta">
                <select
                  value={p.status}
                  onChange={e => updateProject(p.id, 'status', e.target.value)}
                  className="status-badge"
                  style={{ '--badge-color': cfg.color }}
                >
                  {Object.entries(statusConfig).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" style={{ '--w': `${p.progress}%` }}>
                    <span>{p.progress}%</span>
                  </div>
                </div>
                <input
                  type="date"
                  value={p.deadline}
                  onChange={e => updateProject(p.id, 'deadline', e.target.value)}
                  className="deadline-input"
                />
              </div>
              <input
                type="text"
                value={p.desc}
                onChange={e => updateProject(p.id, 'desc', e.target.value)}
                placeholder="添加进度描述..."
                className="desc-input"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ========== 工作待办 ==========
const WorkTodo = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('tj_todos')
    return saved ? JSON.parse(saved) : [
      { id: 1, text: '完成暑期活动页面上线', done: false, priority: 'high' },
      { id: 2, text: '提交大广赛最终作品', done: false, priority: 'high' },
      { id: 3, text: '整理毕业待办材料', done: false, priority: 'medium' },
      { id: 4, text: '审核专题组货方案', done: true, priority: 'medium' },
    ]
  })
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('tj_todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input.trim(), done: false, priority: 'medium' }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id))

  const priorityIcon = { high: '🔴', medium: '🟡', low: '🟢' }

  // 排序：未完成在前
  const sorted = [...todos].sort((a, b) => a.done - b.done)
  const doneCount = todos.filter(t => t.done).length

  return (
    <section className="card todo-board">
      <div className="card-header">
        <h3>✅ 工作待办</h3>
        <span className="card-badge">{todos.length - doneCount}/{todos.length}</span>
      </div>
      <div className="todo-add">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="+ 添加待办事项..."
          className="todo-input"
        />
        <button onClick={addTodo} className="icon-btn primary"><Plus size={16} /></button>
      </div>
      <div className="todo-list">
        {sorted.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.done ? 'done' : ''} priority-${todo.priority}`}>
            <button
              className={`todo-check ${todo.done ? 'checked' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.done && <CheckCircle2 size={16} />}
            </button>
            <span className="todo-text">{todo.text}</span>
            <span className="todo-priority">{priorityIcon[todo.priority]}</span>
            <button onClick={() => deleteTodo(todo.id)} className="icon-btn danger small"><Trash2 size={12} /></button>
          </div>
        ))}
      </div>
    </section>
  )
}

// ========== 倒数日 ==========
const CountdownBoard = () => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('tj_countdowns')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: '大广赛截止', date: '2026-08-15', icon: '🎨' },
      { id: 2, name: '论文答辩', date: '2026-09-20', icon: '🎓' },
      { id: 3, name: '国庆假期', date: '2026-10-01', icon: '🎉' },
    ]
  })

  useEffect(() => {
    localStorage.setItem('tj_countdowns', JSON.stringify(events))
  }, [events])

  const addEvent = () => {
    const name = prompt('事件名称：')
    if (!name) return
    const date = prompt('日期 (YYYY-MM-DD)：')
    if (!date) return
    setEvents([...events, { id: Date.now(), name, date, icon: '📅' }])
  }

  const deleteEvent = (id) => setEvents(events.filter(e => e.id !== id))

  const calcDays = (dateStr) => {
    const diff = new Date(dateStr) - new Date()
    return Math.max(Math.ceil(diff / 86400000), 0)
  }

  return (
    <section className="card countdown-board">
      <div className="card-header">
        <h3>⏳ 倒数日</h3>
        <button onClick={addEvent} className="icon-btn primary small"><Plus size={14} /></button>
      </div>
      <div className="countdown-list">
        {events.map(event => {
          const days = calcDays(event.date)
          const isSoon = days <= 7
          return (
            <div key={event.id} className={`countdown-item ${isSoon ? 'soon' : ''}`}>
              <div className="countdown-icon">{event.icon}</div>
              <div className="countdown-info">
                <span className="countdown-name">{event.name}</span>
                <span className="countdown-date">{event.date}</span>
              </div>
              <div className="countdown-days">
                <span className="days-num">{days}</span>
                <span className="days-label">天</span>
              </div>
              <button onClick={() => deleteEvent(event.id)} className="icon-btn danger tiny"><Trash2 size={10} /></button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ========== 素材点子 ==========
const InspirationBoard = () => {
  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem('tj_ideas')
    return saved ? JSON.parse(saved) : [
      { id: 1, type: '选题', content: '"AI如何改变00后的学习方式"——暑期教育热点的创意切入角度', source: 'AI生成', time: '2小时前' },
      { id: 2, type: '文案', content: '这个夏天，和AI一起解锁无限可能！🌟 3个免费AI工具推荐...', source: 'AI生成', time: '5小时前' },
      { id: 3, type: '热点', content: '#暑期档电影票房突破100亿# 可结合影视推荐做创意内容', source: '全网热点', time: '1天前' },
    ]
  })
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    localStorage.setItem('tj_ideas', JSON.stringify(ideas))
  }, [ideas])

  const generateIdea = () => {
    setGenerating(true)
    // 模拟AI生成 - 实际可接入API
    const templates = [
      { type: '选题', content: '"2026年最值得关注的5个科技突破"——结合上半年科技圈的标志性事件', source: 'AI生成', time: '刚刚' },
      { type: '文案', content: '🔥 刚出炉的热点速递！抓住这波流量密码，让你的内容自带爆款基因～', source: 'AI生成', time: '刚刚' },
      { type: '热点', content: '#毕业季求职浪潮# 大数据分析应届生求职新趋势，可做深度解读', source: '全网热点', time: '刚刚' },
      { type: '选题', content: '"创意方法论拆解"——经典设计哲学的现代演绎', source: 'AI生成', time: '刚刚' },
    ]
    const idea = templates[Math.floor(Math.random() * templates.length)]
    setTimeout(() => {
      setIdeas([{ id: Date.now(), ...idea }, ...ideas.slice(0, 19)])
      setGenerating(false)
    }, 1500)
  }

  const deleteIdea = (id) => setIdeas(ideas.filter(i => i.id !== id))

  const copyIdea = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <section className="card inspiration-board">
      <div className="card-header">
        <h3>💡 素材点子</h3>
        <button onClick={generateIdea} className="icon-btn primary small" disabled={generating}>
          {generating ? <RefreshCw size={14} className="spinning" /> : <Wand2 size={14} />}
        </button>
      </div>
      <p className="inspiration-desc">AI 自动追踪全网热点，生成选题与文案灵感</p>
      <div className="idea-list">
        {ideas.map(idea => (
          <div key={idea.id} className={`idea-item type-${idea.type}`}>
            <div className="idea-header">
              <span className={`idea-type-badge type-${idea.type}`}>{idea.type}</span>
              <span className="idea-source">{idea.source}</span>
              <span className="idea-time">{idea.time}</span>
            </div>
            <p className="idea-content">{idea.content}</p>
            <div className="idea-actions">
              <button onClick={() => copyIdea(idea.content)} className="icon-btn ghost small" title="复制">
                <Copy size={12} />
              </button>
              <button onClick={() => deleteIdea(idea.id)} className="icon-btn danger tiny"><Trash2 size={10} /></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WorkPanel
