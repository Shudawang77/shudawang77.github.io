import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import StudyPanel from './components/StudyPanel/StudyPanel'
import WorkPanel from './components/WorkPanel/WorkPanel'
import JobPanel from './components/JobPanel/JobPanel'

// 鼠鼠语录
const QUOTES = [
  { text: '今天的事今天做，别学Tom明天再追Jerry！', emoji: '🐭' },
  { text: '小老鼠Jerry都能搞定，这点工作算什么？', emoji: '🐭' },
  { text: '像Tom一样执着，像Jerry一样机智！', emoji: '🧀' },
  { text: '累了就休息一下，Tom也需要打个盹~', emoji: '😸' },
  { text: '用Jerry的速度处理任务，用Tom的耐心面对困难！', emoji: '⚡' },
  { text: '别像Tom那样追着自己的尾巴跑，做个计划吧！', emoji: '🎯' },
  { text: '每天进步一点点，Jerry就是这么赢的！', emoji: '🏆' },
  { text: '奶酪在前方，加油向前冲！', emoji: '🧀' },
  { text: '聪明如Jerry，勤奋如Tom！', emoji: '💪' },
]

const App = () => {
  const [activePanel, setActivePanel] = useState('study')
  // activePanel: 'study' | 'work'
  const [quote, setQuote] = useState(QUOTES[0])

  useEffect(() => {
    // 每小时换一句鼠鼠语录
    const idx = new Date().getHours() % QUOTES.length
    setQuote(QUOTES[idx])
  }, [])

  return (
    <div className="app">
      <Sidebar activePanel={activePanel} onNavigate={setActivePanel} quote={quote} />
      <main className="main-content">
        {activePanel === 'study' && <StudyPanel />}
        {activePanel === 'work' && <WorkPanel />}
        {activePanel === 'job' && <JobPanel />}
      </main>
    </div>
  )
}

export default App
