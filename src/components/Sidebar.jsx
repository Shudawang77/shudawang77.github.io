import React, { useState, useEffect } from 'react'
import { BookOpen, Briefcase, Clock, ChevronLeft, ChevronRight, Rocket } from 'lucide-react'

const Sidebar = ({ activePanel, onNavigate, quote }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (d) => {
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')} ${weekDays[d.getDay()]}`
  }

  const formatTime = (d) => {
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`
  }

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <span className="logo-emoji">🐭</span>
        </div>
        {!collapsed && <h1 className="logo-text">鼠鼠工作站</h1>}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* 时钟 */}
      <div className="sidebar-clock">
        <Clock size={collapsed ? 16 : 18} className="clock-icon" />
        {!collapsed && (
          <>
            <div className="clock-time">{formatTime(time)}</div>
            <div className="clock-date">{formatDate(time)}</div>
          </>
        )}
      </div>

      {/* 导航 */}
      <nav className="sidebar-nav">
        <button
          className={`nav-btn ${activePanel === 'study' ? 'active study' : ''}`}
          onClick={() => onNavigate('study')}
        >
          <BookOpen size={collapsed ? 20 : 18} />
          {!collapsed && <span>📚 学习区</span>}
        </button>
        <button
          className={`nav-btn ${activePanel === 'work' ? 'active work' : ''}`}
          onClick={() => onNavigate('work')}
        >
          <Briefcase size={collapsed ? 20 : 18} />
          {!collapsed && <span>💼 工作区</span>}
        </button>
        <button
          className={`nav-btn ${activePanel === 'job' ? 'active job' : ''}`}
          onClick={() => onNavigate('job')}
        >
          <Rocket size={collapsed ? 20 : 18} />
          {!collapsed && <span>🚀 秋招区</span>}
        </button>
      </nav>

      {/* 分隔线 */}
      {!collapsed && <div className="sidebar-divider" />}

      {/* 鼠鼠语录 */}
      {!collapsed && (
        <div className="sidebar-quote">
          <p className="quote-text">{quote.text}</p>
          <p className="quote-emoji">{quote.emoji}</p>
        </div>
      )}

      {/* 快捷链接 */}
      {!collapsed && <QuickLinks />}

      {/* 底部版本 */}
      {!collapsed && <div className="sidebar-version">v1.0 · 🧀</div>}

      {/* 页脚 logo */}
      {!collapsed && (
        <div className="sidebar-footer">
          <span className="footer-emoji">🐭</span>
          <span className="footer-text">鼠鼠工作站</span>
        </div>
      )}
    </aside>
  )
}

const QuickLinks = () => {
  const links = [
    { label: '📧 Gmail', url: 'https://mail.google.com' },
    { label: '📅 Google Calendar', url: 'https://calendar.google.com' },
    { label: '📝 微信读书', url: 'https://weread.qq.com' },
    { label: '🎓 知网', url: 'https://www.cnki.net' },
    { label: '💻 GitHub', url: 'https://github.com' },
    { label: '🔍 Google Scholar', url: 'https://scholar.google.com' },
  ]

  const openLink = (url) => {
    if (window.electronAPI) {
      window.electronAPI.openExternal(url)
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <div className="quick-links">
      <h3 className="quick-links-title">🔗 常用链接</h3>
      <div className="quick-links-grid">
        {links.map((link, i) => (
          <button key={i} className="quick-link-btn" onClick={() => openLink(link.url)} title={link.url}>
            {link.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
