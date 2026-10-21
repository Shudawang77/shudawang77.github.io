import React, { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw, Lightbulb, Wand2, ChevronRight, Trophy } from 'lucide-react'
import { QUESTION_BANK } from '../../data/questions'
import { hasApiKey, callClaude, extractJson } from '../../lib/apiClient'

const Assessment = () => {
  const [cat, setCat] = useState('verbal')
  const [bank, setBank] = useState(QUESTION_BANK)
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState({ right: 0, total: 0 })
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState('')

  const questions = bank[cat].questions
  const current = questions[idx]

  const switchCat = (c) => {
    setCat(c); setIdx(0); setSelected(null); setShowAnswer(false)
  }

  const choose = (i) => {
    if (showAnswer) return
    setSelected(i)
    setShowAnswer(true)
    setScore(s => ({ right: s.right + (i === current.answer ? 1 : 0), total: s.total + 1 }))
  }

  const next = () => {
    setSelected(null); setShowAnswer(false)
    setIdx(i => (i + 1) % questions.length)
  }

  const resetScore = () => setScore({ right: 0, total: 0 })

  // AI 生成更多同类题
  const generateMore = async () => {
    if (!hasApiKey()) {
      setGenError('需先在「JD拆解」页配置 API Key 才能用 AI 出题')
      setTimeout(() => setGenError(''), 3000)
      return
    }
    setGenerating(true); setGenError('')
    try {
      const catInfo = bank[cat]
      const prompt = `请为秋招在线测评生成3道"${catInfo.label}"类型的题目（${catInfo.desc}），面向新闻传播专业、投递产品/运营岗的应届生。严格输出JSON数组，格式：
[{"q":"题干","options":["A选项","B选项","C选项","D选项"],"answer":正确选项索引(0-3),"explain":"答案解析"}]
只输出JSON，不要其他内容。`
      const text = await callClaude(prompt, { maxTokens: 2000 })
      const parsed = extractJson(text)
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('返回格式无法解析')
      const cleaned = parsed
        .filter(q => q.q && Array.isArray(q.options) && typeof q.answer === 'number')
        .map(q => ({ ...q, answer: Math.max(0, Math.min(3, q.answer)) }))
      setBank(prev => ({
        ...prev,
        [cat]: { ...prev[cat], questions: [...prev[cat].questions, ...cleaned] },
      }))
      setGenError(`✅ 已生成 ${cleaned.length} 道新题，已加入题库末尾`)
      setTimeout(() => setGenError(''), 3000)
    } catch (e) {
      setGenError('生成失败：' + e.message)
      setTimeout(() => setGenError(''), 4000)
    }
    setGenerating(false)
  }

  const accuracy = score.total ? Math.round((score.right / score.total) * 100) : 0

  return (
    <div className="assessment">
      {/* 分类标签 */}
      <div className="assess-cats">
        {Object.entries(bank).map(([key, c]) => (
          <button
            key={key}
            className={`assess-cat ${cat === key ? 'active' : ''}`}
            onClick={() => switchCat(key)}
          >
            {c.label}
            <span className="assess-cat-count">{c.questions.length}</span>
          </button>
        ))}
      </div>

      {/* 得分条 */}
      <div className="assess-scorebar">
        <div className="assess-desc">{bank[cat].desc}</div>
        <div className="assess-score">
          <Trophy size={14} />
          <span>正确率 {accuracy}%（{score.right}/{score.total}）</span>
          <button className="icon-btn ghost small" onClick={resetScore} title="重置计分"><RotateCcw size={13} /></button>
        </div>
      </div>

      {/* 题目卡 */}
      <div className="assess-card">
        <div className="assess-q-head">
          <span className="assess-q-num">第 {idx + 1} / {questions.length} 题</span>
          <span className="assess-q-cat">{bank[cat].label}</span>
        </div>
        <p className="assess-q-text">{current.q}</p>

        <div className="assess-options">
          {current.options.map((opt, i) => {
            let cls = 'assess-option'
            if (showAnswer) {
              if (i === current.answer) cls += ' correct'
              else if (i === selected) cls += ' wrong'
            } else if (i === selected) cls += ' selected'
            return (
              <button key={i} className={cls} onClick={() => choose(i)} disabled={showAnswer}>
                <span className="assess-opt-letter">{String.fromCharCode(65 + i)}</span>
                <span className="assess-opt-text">{opt}</span>
                {showAnswer && i === current.answer && <CheckCircle2 size={16} className="assess-opt-icon correct" />}
                {showAnswer && i === selected && i !== current.answer && <XCircle size={16} className="assess-opt-icon wrong" />}
              </button>
            )
          })}
        </div>

        {showAnswer && (
          <div className="assess-explain">
            <div className="assess-explain-head">
              <Lightbulb size={14} /> 答案解析
              <span className={`assess-result ${selected === current.answer ? 'right' : 'wrong'}`}>
                {selected === current.answer ? '回答正确 🎉' : `回答错误，正确答案：${String.fromCharCode(65 + current.answer)}`}
              </span>
            </div>
            <p>{current.explain}</p>
          </div>
        )}

        <div className="assess-actions">
          <button className="jd-add-btn" onClick={generateMore} disabled={generating}>
            {generating ? <><Wand2 size={14} className="spinning" /> AI 出题中...</> : <><Wand2 size={14} /> AI 生成更多同类题</>}
          </button>
          {showAnswer && (
            <button className="jd-btn-analyze" onClick={next}>下一题 <ChevronRight size={15} /></button>
          )}
        </div>
        {genError && <div className="assess-gen-msg">{genError}</div>}
      </div>

      <p className="news-tip">💡 这些是各大厂在线测评的高频题型。点「AI 生成更多」可无限刷题（需配置 API Key）。真实测评还会有性格测评，答题保持真实一致即可。</p>
    </div>
  )
}

export default Assessment
