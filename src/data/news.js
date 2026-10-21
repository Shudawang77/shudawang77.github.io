// 秋招资讯聚合站 — 实时更新的信息源（点击直达，这里才是每天更新的真实开奖）
export const AGGREGATORS = [
  { label: '牛客网秋招', url: 'https://www.nowcoder.com/school/schedule' },
  { label: '实习僧校招', url: 'https://www.shixiseng.com/' },
  { label: '应届生求职网', url: 'https://www.yingjiesheng.com/' },
  { label: '刺猬求职', url: 'https://www.ciweishixi.com/' },
  { label: 'BOSS直聘校招', url: 'https://www.zhipin.com/web/campus/' },
  { label: 'offershow', url: 'https://www.offershow.cn/' },
  { label: '柠檬求职', url: 'https://www.lemonteam.cn/' },
  { label: '梦马求职', url: 'https://www.mengma.com/' },
]

// 内置秋招岗位清单（面向产品/运营，手动整理，非实时；实时开奖看上方聚合站）
export const SEED_NEWS = [
  // ===== AI 公司 — 第一梯队大模型 =====
  { id: 101, company: '字节·豆包/Seed', type: 'AI', title: '产品运营 / AI内容运营 / 创作者运营 — 豆包', date: '2026-09-15', hot: true, url: 'https://jobs.bytedance.com/campus' },
  { id: 102, company: '字节·扣子Coze', type: 'AI', title: 'AI Agent产品运营 / 开发者生态运营 — 扣子', date: '2026-09-15', hot: true, url: 'https://jobs.bytedance.com/campus' },
  { id: 103, company: '月之暗面 Kimi', type: 'AI', title: '产品运营 / 用户增长 / 内容运营 — Kimi AI助手', date: '2026-09-14', hot: true, url: 'https://www.moonshot.cn/' },
  { id: 104, company: '深度求索 DeepSeek', type: 'AI', title: '产品 / 运营（少而精，强烈关注内推）', date: '2026-09-14', hot: true, url: 'https://www.deepseek.com/' },
  { id: 105, company: '智谱 AI', type: 'AI', title: 'AI产品经理 / 运营 / 开发者生态运营 — GLM', date: '2026-09-13', hot: true, url: 'https://zhipu.ai/' },
  { id: 106, company: 'MiniMax', type: 'AI', title: '产品运营 / 社区运营 / 用户增长 — 海螺AI / 星野', date: '2026-09-13', hot: true, url: 'https://www.minimaxi.com/' },
  { id: 107, company: '阶跃星辰 StepFun', type: 'AI', title: 'AI产品运营 / 内容运营 — Step多模态', date: '2026-09-12', hot: true, url: 'https://www.stepfun.com/' },
  { id: 108, company: '百川智能', type: 'AI', title: 'AI应用产品运营 / 医疗AI方向', date: '2026-09-12', hot: false, url: 'https://www.baichuan-ai.com/' },
  { id: 109, company: '昆仑万维·天工', type: 'AI', title: 'AI内容产品运营 / 创意内容运营 — 天工AI', date: '2026-09-11', hot: false, url: 'https://www.kunlun.com/' },
  // ===== AI 公司 — 第二梯队应用/工具 =====
  { id: 110, company: '秘塔 AI 搜索', type: 'AI', title: '增长运营 / 内容运营 / 用户运营 — 秘塔搜索', date: '2026-09-11', hot: true, url: 'https://metaso.cn/' },
  { id: 111, company: '生数科技 Vidu', type: 'AI', title: 'AI视频产品运营 / 社区运营 / 创作者运营', date: '2026-09-10', hot: true, url: 'https://www.shengshu-ai.com/' },
  { id: 112, company: 'Liblib 哩布哩布', type: 'AI', title: 'AI绘画社区运营 / 内容运营 / 创作者运营', date: '2026-09-10', hot: false, url: 'https://www.liblib.art/' },
  { id: 113, company: '爱诗科技 PixVerse', type: 'AI', title: 'AI视频产品运营 / 出海社区运营', date: '2026-09-09', hot: false, url: 'https://aishi.tech/' },
  // ===== AI 公司 — 第三梯队大厂AI线 =====
  { id: 114, company: '阿里·通义/夸克', type: 'AI', title: 'AI产品运营 / 内容运营 / 用户增长 — 通义千问', date: '2026-09-09', hot: true, url: 'https://talent.alibaba.com/campus/home' },
  { id: 115, company: '腾讯·混元/元宝', type: 'AI', title: 'AI内容运营 / 社区运营 — 元宝App', date: '2026-09-08', hot: true, url: 'https://join.qq.com/' },
  { id: 116, company: '百度·文心一言', type: 'AI', title: 'AI产品运营 / 内容生态运营 — 文心/百度AI', date: '2026-09-08', hot: false, url: 'https://talent.baidu.com/jobs/list' },
  { id: 117, company: '科大讯飞·星火', type: 'AI', title: 'AI产品运营 / 内容运营 — 讯飞星火', date: '2026-09-07', hot: false, url: 'https://campus.iflytek.com/' },

  // ===== 互联网大厂 =====
  { id: 1, company: '字节跳动', type: '互联网', title: '产品经理 / 产品运营 / 内容运营 / 用户增长 — 抖音·飞书·头条', date: '2026-09-15', hot: true, url: 'https://jobs.bytedance.com/campus' },
  { id: 2, company: '腾讯', type: '互联网', title: '产品策划 / 内容运营 / 用户运营 — 微信·QQ·视频号', date: '2026-09-15', hot: true, url: 'https://join.qq.com/' },
  { id: 3, company: '阿里巴巴', type: '互联网', title: '产品运营 / 用户增长 / 类目运营 — 淘天·高德·闲鱼', date: '2026-09-14', hot: true, url: 'https://talent.alibaba.com/campus/home' },
  { id: 4, company: '美团', type: '互联网', title: '产品运营 / 商业分析 / 品类运营 — 外卖·到店·单车', date: '2026-09-14', hot: true, url: 'https://campus.meituan.com/' },
  { id: 5, company: '小红书', type: '互联网', title: '社区运营 / 内容产品 / 商业化运营 / 品类运营', date: '2026-09-13', hot: true, url: 'https://job.xiaohongshu.com/' },
  { id: 6, company: '快手', type: '互联网', title: '内容运营 / 商业化运营 / 电商运营 / 产品经理', date: '2026-09-13', hot: true, url: 'https://zhaopin.kuaishou.cn/' },
  { id: 7, company: '拼多多', type: '互联网', title: '运营管培生 / 商家运营 / 类目运营 / 产品经理', date: '2026-09-12', hot: true, url: 'https://careers.pinduoduo.com/campus' },
  { id: 8, company: '百度', type: '互联网', title: '产品经理 / 内容生态运营 / AI产品运营', date: '2026-09-12', hot: false, url: 'https://talent.baidu.com/jobs/list' },
  { id: 9, company: '京东', type: '互联网', title: '品类运营 / 用户运营 / 产品经理 — 零售·物流·健康', date: '2026-09-11', hot: false, url: 'https://campus.jd.com/' },
  { id: 10, company: '网易', type: '互联网', title: '游戏策划 / 产品运营 / 内容运营 — 游戏·云音乐·有道', date: '2026-09-11', hot: false, url: 'https://campus.163.com/' },
  { id: 11, company: '哔哩哔哩', type: '文娱传媒', title: 'UP主运营 / 内容策划 / 商业化运营 / 社区产品', date: '2026-09-10', hot: true, url: 'https://jobs.bilibili.com/campus' },
  { id: 12, company: '得物', type: '互联网', title: '社区运营 / 内容运营 / 品类运营 / 产品经理', date: '2026-09-10', hot: true, url: 'https://campus.dewu.com/' },
  { id: 13, company: '滴滴', type: '互联网', title: '产品运营 / 用户增长 / 策略产品经理', date: '2026-09-09', hot: false, url: 'https://talent.didiglobal.com/' },
  { id: 14, company: '微博', type: '互联网', title: '内容运营 / 社媒运营 / 商业产品运营', date: '2026-09-09', hot: false, url: 'https://weibo.jobs.weibo.com/' },
  { id: 15, company: '知乎', type: '互联网', title: '社区运营 / 内容产品 / 用户运营', date: '2026-09-08', hot: false, url: 'https://job.zhihu.com/' },

  // ===== 中厂 / 独角兽 =====
  { id: 16, company: '米哈游', type: '互联网', title: '游戏社区运营 / 内容运营 / 用户运营', date: '2026-09-07', hot: true, url: 'https://campus.mihoyo.com/' },
  { id: 17, company: '蔚来汽车', type: '互联网', title: '用户运营 / 社区运营 / 品牌内容 — NIO Life', date: '2026-09-07', hot: true, url: 'https://www.nio.com/careers' },
  { id: 18, company: '理想汽车', type: '互联网', title: '用户运营 / 产品经理 / 内容运营', date: '2026-09-06', hot: false, url: 'https://li.jobs.feishu.cn/' },
  { id: 19, company: '小米', type: '互联网', title: '产品经理 / 新媒体运营 / 品牌运营 — 手机·汽车·生态链', date: '2026-09-06', hot: true, url: 'https://hr.xiaomi.com/campus' },
  { id: 20, company: '喜马拉雅', type: '文娱传媒', title: '内容运营 / 音频产品 / 用户运营', date: '2026-09-05', hot: false, url: 'https://www.ximalaya.com/zhaopin/' },
  { id: 21, company: 'BOSS直聘', type: '互联网', title: '产品运营 / 用户增长 / 商业化运营', date: '2026-09-05', hot: false, url: 'https://www.zhipin.com/' },

  // ===== 文娱 / 传媒 =====
  { id: 31, company: '爱奇艺', type: '文娱传媒', title: '内容运营 / 会员运营 / 用户运营 / 宣发', date: '2026-09-04', hot: false, url: 'https://campus.iqiyi.com/' },
  { id: 32, company: '腾讯视频', type: '文娱传媒', title: '内容运营 / 会员运营 / 内容产品', date: '2026-09-04', hot: false, url: 'https://join.qq.com/' },
  { id: 33, company: '芒果TV', type: '文娱传媒', title: '综艺内容运营 / 新媒体运营 / 宣发策划', date: '2026-09-03', hot: true, url: 'https://www.mgtv.com/' },
  { id: 34, company: '阅文集团', type: '文娱传媒', title: 'IP运营 / 内容运营 / 作者运营', date: '2026-09-03', hot: false, url: 'https://job.yuewen.com/' },
  { id: 35, company: '36氪', type: '文娱传媒', title: '内容编辑 / 新媒体运营 / 商业内容', date: '2026-09-02', hot: false, url: 'https://36kr.com/' },
  { id: 36, company: '澎湃新闻', type: '文娱传媒', title: '新媒体运营 / 内容编辑 / 记者', date: '2026-09-02', hot: false, url: 'https://www.thepaper.cn/' },
  { id: 37, company: '猫眼娱乐', type: '文娱传媒', title: '内容运营 / 用户运营 / 票务产品', date: '2026-09-01', hot: false, url: 'https://www.maoyan.com/' },

  // ===== 快消 / 新消费 =====
  { id: 42, company: '宝洁 P&G', type: '快消', title: '品牌营销管培生 / 市场部 / 电商运营', date: '2026-08-30', hot: true, url: 'https://www.pgcareers.com/' },
  { id: 43, company: '欧莱雅', type: '快消', title: '数字营销 / 品牌管培生 / 电商运营', date: '2026-08-30', hot: true, url: 'https://www.loreal.com/zh-cn/china/' },
  { id: 44, company: '联合利华', type: '快消', title: '品牌管培生 / 数字营销 / 电商运营', date: '2026-08-29', hot: false, url: 'https://careers.unilever.com/' },
  { id: 45, company: '瑞幸咖啡', type: '快消', title: '品牌运营 / 私域运营 / 用户增长', date: '2026-08-28', hot: true, url: 'https://www.luckincoffee.com/' },
  { id: 46, company: '泡泡玛特', type: '快消', title: 'IP运营 / 内容运营 / 品牌营销', date: '2026-08-28', hot: false, url: 'https://www.popmart.com/' },
  { id: 47, company: '喜茶', type: '快消', title: '品牌运营 / 新媒体运营 / 私域运营', date: '2026-08-27', hot: false, url: 'https://www.heytea.com/' },

  // ===== 央国企 =====
  { id: 53, company: '招商银行', type: '央国企', title: '金融产品运营 / 用户运营 / FinTech', date: '2026-08-25', hot: true, url: 'https://career.cmbchina.com/' },
  { id: 54, company: '中国移动', type: '央国企', title: '产品运营 / 新媒体运营 / 市场营销', date: '2026-08-25', hot: false, url: 'https://job.10086.cn/' },
  { id: 55, company: '中国平安', type: '央国企', title: '产品运营 / 用户运营 / 品牌营销', date: '2026-08-24', hot: false, url: 'https://campus.pingan.com/' },

  // ===== 外企 =====
  { id: 60, company: 'TikTok', type: '外企', title: '海外内容运营 / 产品运营 / 用户增长', date: '2026-09-10', hot: true, url: 'https://careers.tiktok.com/' },
  { id: 61, company: 'Shein', type: '外企', title: '跨境电商运营 / 品类运营 / 内容运营', date: '2026-09-08', hot: true, url: 'https://job.sheincorp.cn/' },
  { id: 62, company: '奥美 Ogilvy', type: '外企', title: '广告策划 / 公关 / 社媒运营', date: '2026-09-05', hot: false, url: 'https://www.ogilvy.com/careers' },
  { id: 63, company: '迪士尼', type: '外企', title: 'IP运营 / 内容运营 / 市场营销', date: '2026-09-01', hot: false, url: 'https://jobs.disneycareers.com/' },
  { id: 64, company: '埃森哲', type: '外企', title: '数字营销咨询 / 商业分析 / 咨询顾问', date: '2026-08-28', hot: false, url: 'https://www.accenture.cn/cn-zh/careers' },
]
