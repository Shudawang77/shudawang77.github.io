import React, { useState } from 'react'
import { ExternalLink, Star, Search, ChevronDown, ChevronRight } from 'lucide-react'
import { COMPANY_DATA } from '../../data/companies'

const TIER_COLORS = { 1: '#E8927C', 2: '#F5C04C', 3: '#A0C4A0' }
const TIER_LABELS = { 1: 'T1', 2: 'T2', 3: 'T3' }

const CompanyLinks = () => {
  const [search, setSearch] = useState('')
  const [collapsed, setCollapsed] = useState({})
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('tj_job_favorites')
    return saved ? JSON.parse(saved) : []
  })

  const openLink = (url) => {
    if (window.electronAPI) window.electronAPI.openExternal(url)
    else window.open(url, '_blank')
  }

  const toggleFav = (name) => {
    const next = favorites.includes(name)
      ? favorites.filter(n => n !== name)
      : [...favorites, name]
    setFavorites(next)
    localStorage.setItem('tj_job_favorites', JSON.stringify(next))
  }

  const toggleCollapse = (key) =>
    setCollapsed(p => ({ ...p, [key]: !p[key] }))

  const filterCompanies = (companies) => {
    if (!search) return companies
    const q = search.toLowerCase()
    return companies.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.note.toLowerCase().includes(q)
    )
  }

  const allCompanies = Object.values(COMPANY_DATA).flatMap(cat => cat.companies)

  return (
    <div className="company-links">
      {/* 搜索 */}
      <div className="job-search-bar">
        <Search size={15} className="job-search-icon" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜索公司名 / 行业关键词，如：字节 / 通信 / 咨询..."
          className="job-search-input"
        />
      </div>

      {/* 梯队说明 */}
      {!search && (
        <div className="tier-legend">
          <span className="tier-legend-item"><span className="tier-dot t1" />T1 第一梯队 &nbsp;</span>
          <span className="tier-legend-item"><span className="tier-dot t2" />T2 第二梯队 &nbsp;</span>
          <span className="tier-legend-item"><span className="tier-dot t3" />T3 第三梯队</span>
          <span className="tier-legend-tip">点击公司卡片直接投递 · ⭐ 收藏/标记</span>
        </div>
      )}

      {/* 收藏区 */}
      {favorites.length > 0 && !search && (
        <div className="company-category fav-category">
          <h3 className="category-title">
            <Star size={15} fill="#F5C04C" color="#F5C04C" /> 我的关注
            <span className="category-count">{favorites.length}</span>
          </h3>
          <div className="company-grid">
            {allCompanies
              .filter(c => favorites.includes(c.name))
              .map((c, i) => (
                <CompanyCard key={i} company={c} isFav onOpen={openLink} onFav={toggleFav} />
              ))}
          </div>
        </div>
      )}

      {/* 分类公司（按梯队分组） */}
      {Object.entries(COMPANY_DATA).map(([key, cat]) => {
        const filtered = filterCompanies(cat.companies)
        if (filtered.length === 0) return null

        if (search) {
          // 搜索模式：不分梯队，直接列出
          return (
            <div key={key} className="company-category">
              <h3 className="category-title" style={{ borderLeftColor: cat.color }}>
                {cat.label} <span className="category-count">{filtered.length}</span>
              </h3>
              <div className="company-grid">
                {filtered.map((c, i) => (
                  <CompanyCard key={i} company={c} isFav={favorites.includes(c.name)} onOpen={openLink} onFav={toggleFav} />
                ))}
              </div>
            </div>
          )
        }

        // 正常模式：按梯队分组
        const byTier = { 1: [], 2: [], 3: [] }
        filtered.forEach(c => { if (byTier[c.tier]) byTier[c.tier].push(c) })
        const isCollapsed = collapsed[key]

        return (
          <div key={key} className="company-category">
            <h3
              className="category-title category-title-toggle"
              style={{ borderLeftColor: cat.color }}
              onClick={() => toggleCollapse(key)}
            >
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
              {cat.label}
              <span className="category-count">{filtered.length}</span>
            </h3>

            {!isCollapsed && (
              <div className="tier-groups">
                {[1, 2, 3].map(t => {
                  const group = byTier[t]
                  if (group.length === 0) return null
                  return (
                    <div key={t} className="tier-group">
                      <div className="tier-group-header">
                        <span className="tier-badge" style={{ background: TIER_COLORS[t] }}>
                          {TIER_LABELS[t]}
                        </span>
                        <span className="tier-group-label">{cat.tiers?.[t]}</span>
                      </div>
                      <div className="company-grid">
                        {group.map((c, i) => (
                          <CompanyCard
                            key={i}
                            company={c}
                            isFav={favorites.includes(c.name)}
                            onOpen={openLink}
                            onFav={toggleFav}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const CompanyCard = ({ company, isFav, onOpen, onFav }) => (
  <div className="company-card">
    <div className="company-card-main" onClick={() => onOpen(company.url)}>
      <div className="company-info">
        <span className="company-name">{company.name}</span>
        <span className="company-note">{company.note}</span>
      </div>
      <ExternalLink size={13} className="company-link-icon" />
    </div>
    <button
      className={`company-fav ${isFav ? 'active' : ''}`}
      onClick={() => onFav(company.name)}
      title={isFav ? '取消关注' : '关注'}
    >
      <Star size={13} fill={isFav ? '#F5C04C' : 'none'} color={isFav ? '#F5C04C' : 'currentColor'} />
    </button>
  </div>
)

export default CompanyLinks
