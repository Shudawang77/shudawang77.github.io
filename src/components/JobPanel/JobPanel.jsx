import React, { useState } from 'react'
import { Rocket, Building2, Newspaper, FileSearch, ClipboardList, BookMarked, PenTool, Sparkles, AlarmClock } from 'lucide-react'
import CompanyLinks from './CompanyLinks'
import JobNews from './JobNews'
import AiGuide from './AiGuide'
import JdAnalyzer from './JdAnalyzer'
import Assessment from './Assessment'
import ApplyTracker from './ApplyTracker'
import InterviewPrep from './InterviewPrep'
import DeadlineTracker from './DeadlineTracker'

const TABS = [
  { key: 'companies', label: '招聘官网', icon: Building2 },
  { key: 'deadline', label: '截止日期', icon: AlarmClock },
  { key: 'news', label: '秋招资讯', icon: Newspaper },
  { key: 'aiguide', label: 'AI求职攻略', icon: Sparkles },
  { key: 'jd', label: 'JD拆解', icon: FileSearch },
  { key: 'assess', label: '测评刷题', icon: PenTool },
  { key: 'tracker', label: '投递进度', icon: ClipboardList },
  { key: 'prep', label: '面试准备', icon: BookMarked },
]

const JobPanel = () => {
  const [tab, setTab] = useState('companies')

  return (
    <div className="panel job-panel">
      <header className="panel-header">
        <h2><Rocket size={24} /> 27届秋招作战室</h2>
        <p className="panel-subtitle">互联网 · 央国企 · 外企 — 官网直达 · 资讯追踪 · JD拆解 · 进度复盘 · 面试准备</p>
      </header>

      {/* 子标签 */}
      <div className="job-tabs">
        {TABS.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              className={`job-tab ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              <Icon size={15} />
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>

      {/* 内容 */}
      <div className="job-content">
        {tab === 'companies' && <CompanyLinks />}
        {tab === 'deadline' && <DeadlineTracker />}
        {tab === 'news' && <JobNews />}
        {tab === 'aiguide' && <AiGuide />}
        {tab === 'jd' && <JdAnalyzer />}
        {tab === 'assess' && <Assessment />}
        {tab === 'tracker' && <ApplyTracker />}
        {tab === 'prep' && <InterviewPrep />}
      </div>
    </div>
  )
}

export default JobPanel
