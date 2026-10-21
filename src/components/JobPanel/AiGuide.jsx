import React, { useState } from 'react'
import { Sparkles, TrendingUp, Target, FileText, MessageSquare, ChevronDown, ChevronRight } from 'lucide-react'

// AI 公司求职攻略 — 针对新传背景投产品/运营
const AiGuide = () => {
  const [open, setOpen] = useState('why')

  const toggle = (k) => setOpen(open === k ? '' : k)

  return (
    <div className="ai-guide">
      <div className="ai-guide-hero">
        <Sparkles size={20} />
        <div>
          <h3>AI 方向求职攻略</h3>
          <p>新传背景冲 AI 公司的产品/运营，其实很有优势——AI 公司最缺"懂用户、懂内容、能把技术讲人话"的人</p>
        </div>
      </div>

      <Section id="why" title="① 为什么新传适合去 AI 公司" icon={TrendingUp} open={open} toggle={toggle}>
        <ul className="guide-list">
          <li><b>AI 产品缺"翻译官"</b>：工程师做出模型，但怎么让普通用户用起来、怎么讲清价值，需要懂传播、懂内容的人。这正是新传强项。</li>
          <li><b>内容/社区运营需求爆发</b>：豆包、Kimi、海螺、Liblib 这类 C 端 AI 产品，靠内容运营、创作者运营、案例运营拉增长，对口度极高。</li>
          <li><b>AI 提示词/内容策略岗兴起</b>：Prompt 运营、AI 内容策划、AIGC 内容生产，本质是"内容+审美+表达"，新传天然契合。</li>
          <li><b>行业早期、天花板高</b>：AI 是未来 5-10 年最确定的增量赛道，早进入能吃到红利、成长快、简历增值。</li>
        </ul>
      </Section>

      <Section id="tier" title="② 怎么选公司（发展前景判断）" icon={Target} open={open} toggle={toggle}>
        <div className="guide-tier">
          <div className="tier-row"><span className="tier-tag t1">第一梯队</span><span>字节豆包、DeepSeek、Kimi、智谱、通义、MiniMax — 融资/用户/技术领先，平台大、简历硬，优先冲</span></div>
          <div className="tier-row"><span className="tier-tag t2">潜力股</span><span>阶跃星辰、百川、秘塔、生数Vidu、Liblib — 细分赛道领先，岗位灵活、成长快、更容易进</span></div>
          <div className="tier-row"><span className="tier-tag t3">稳健选择</span><span>科大讯飞、商汤、百度文心 — 老牌上市/大厂，稳定，AI 岗位成体系</span></div>
        </div>
        <p className="guide-note">📌 判断前景看四点：<b>融资额与投资方</b>（红杉/腾讯/阿里加持更稳）、<b>产品有没有真实用户增长</b>（看App下载榜/DAU）、<b>商业化路径是否清晰</b>、<b>创始团队背景</b>。别只看名气，看数据。</p>
      </Section>

      <Section id="how" title="③ 怎么投递（渠道与节奏）" icon={FileText} open={open} toggle={toggle}>
        <ul className="guide-list">
          <li><b>官网/公众号优先</b>：AI 创业公司多在官网、公众号、BOSS直聘发岗，不一定上牛客，要主动去官网蹲。</li>
          <li><b>内推 &gt; 海投</b>：AI 公司小、看重匹配，找学长学姐/脉脉/领英内推，通过率高很多。</li>
          <li><b>提前批要抓住</b>：7-9月提前批人少坑多，是最好机会；正式批10-11月竞争激烈。</li>
          <li><b>关注即刻/小红书/X</b>：很多 AI 公司 HR、员工在这些平台发招聘和内推码，信息比招聘网站快。</li>
          <li><b>作品即敲门砖</b>：自己用过这些 AI 产品、写过测评、做过 Prompt 案例，投递时附上，直接加分。</li>
        </ul>
      </Section>

      <Section id="prep" title="④ 怎么准备（简历+面试重点）" icon={MessageSquare} open={open} toggle={toggle}>
        <div className="guide-prep">
          <h5>简历怎么写</h5>
          <ul className="guide-list">
            <li>突出<b>AI 产品使用经验</b>：列出你深度用过的 AI 工具，最好有自己的实践产出（如用 AI 做过内容、涨过粉）。</li>
            <li>量化内容/运营成果：<b>"运营账号涨粉X万""策划内容曝光X万""AI辅助产出X篇"</b>。</li>
            <li>体现对 AI 的理解：不用会写代码，但要能讲清 AI 产品的价值和用户场景。</li>
          </ul>
          <h5>面试常问</h5>
          <ul className="guide-list">
            <li>你最近在用哪些 AI 产品？觉得哪个做得好/不好，为什么？（<b>必考，务必准备</b>）</li>
            <li>如果让你运营一款 AI 助手，你会怎么做冷启动和用户增长？</li>
            <li>如何向不懂技术的用户介绍我们的产品价值？</li>
            <li>你怎么看 AI 对内容行业的影响？（新传相关，容易发挥）</li>
          </ul>
          <h5>面试前必做</h5>
          <ul className="guide-list">
            <li>把目标公司的 AI 产品<b>亲自深度用一遍</b>，记下优点和吐槽点。</li>
            <li>准备 1-2 个"如果我来运营会怎么做"的具体想法。</li>
            <li>关注公司近期动态（新模型、新功能、融资），面试时能聊。</li>
          </ul>
        </div>
      </Section>

      <Section id="skill" title="⑤ 现在开始补什么能力" icon={Sparkles} open={open} toggle={toggle}>
        <ul className="guide-list">
          <li><b>把主流 AI 产品用透</b>：豆包、Kimi、DeepSeek、通义、海螺、即梦/可灵等，每个都用出心得。</li>
          <li><b>学 Prompt 工程基础</b>：能写高质量提示词，是 AI 运营的硬通货。</li>
          <li><b>做一个 AI 相关的个人项目</b>：如用 AI 运营一个账号、做一份 AI 产品测评、整理一个 Prompt 库，作为作品集。</li>
          <li><b>补产品/运营基础</b>：AARRR、用户增长、内容运营方法论（见"面试准备"标签的清单）。</li>
          <li><b>持续关注行业</b>：看「量子位」「机器之心」「Founder Park」等公众号，面试时有谈资。</li>
        </ul>
      </Section>
    </div>
  )
}

const Section = ({ id, title, icon: Icon, open, toggle, children }) => (
  <div className={`guide-section ${open === id ? 'open' : ''}`}>
    <button className="guide-section-head" onClick={() => toggle(id)}>
      <Icon size={16} className="guide-sec-icon" />
      <span>{title}</span>
      {open === id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </button>
    {open === id && <div className="guide-section-body">{children}</div>}
  </div>
)

export default AiGuide
