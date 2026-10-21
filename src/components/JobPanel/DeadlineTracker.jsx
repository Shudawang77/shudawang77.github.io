import React, { useState } from 'react'
import { AlarmClock, Plus, Trash2, ExternalLink, AlertTriangle, CheckCircle2, Clock, Zap } from 'lucide-react'

// 最新开放秋招的公司（2027届，9月底查询结果）
// openConfidence: 'high'=有明确来源 / 'ref'=往届规律推断
const NEW_OPENINGS = [
  // ===== 已确认开放 =====
  { id: 'n1',  company: '中国农业银行', type: '央国企', openDate: '2026-09-04', roles: '综合管理/产品营销/数字运营', openConfidence: 'high', note: '全国招18789人，截止10月8日', url: 'https://zhaopin.abchina.com/' },
  { id: 'n2',  company: '中国建设银行', type: '央国企', openDate: '2026-09-04', roles: '综合管理/产品营销/运营管理', openConfidence: 'high', note: '全国招15022人，截止10月8日', url: 'https://career.ccb.com/' },
  { id: 'n3',  company: '招商银行', type: '央国企', openDate: '2026-08-25', roles: '管理培训生/运营管理/产品岗', openConfidence: 'high', note: '招银网络科技已截止，关注总行批次', url: 'https://career.cmbchina.com/campus/' },
  { id: 'n4',  company: '拼多多', type: '互联网', openDate: '2026-09-01', roles: '产品运营/商业分析/市场营销', openConfidence: 'high', note: '正式批已开，7大职类含非技术岗', url: 'https://careers.pinduoduo.com/campus' },
  { id: 'n5',  company: '腾讯', type: '互联网', openDate: '2026-08-01', roles: '产品运营/内容策略/AI产品经理', openConfidence: 'high', note: '935+岗位，469个AI相关', url: 'https://join.qq.com/post.html' },
  { id: 'n6',  company: '字节跳动', type: '互联网', openDate: '2026-09-01', roles: '产品运营/内容运营/商业化运营', openConfidence: 'high', note: '内推+正式批均已开放', url: 'https://jobs.bytedance.com/campus' },
  { id: 'n7',  company: '阿里巴巴', type: '互联网', openDate: '2026-09-01', roles: '产品经理/运营/商业分析', openConfidence: 'high', note: 'AI相关岗超60%，淘天/高德/闲鱼均有', url: 'https://talent.alibaba.com/campus/home' },
  // ===== 往届参考/推断已开 =====
  { id: 'n8',  company: '美团', type: '互联网', openDate: '2026-09-01', roles: '产品经理/运营管培/市场营销', openConfidence: 'ref', note: '往届同期开放，建议直接去官网确认', url: 'https://campus.meituan.com/' },
  { id: 'n9',  company: '百度', type: '互联网', openDate: '2026-09-01', roles: '产品经理/内容运营/AI产品', openConfidence: 'ref', note: '往届同期开放，AI业务扩招', url: 'https://talent.baidu.com/jobs/list' },
  { id: 'n10', company: '快手', type: '互联网', openDate: '2026-09-01', roles: '内容运营/电商运营/产品经理', openConfidence: 'ref', note: '往届同期开放', url: 'https://zhaopin.kuaishou.cn/' },
  { id: 'n11', company: '小红书', type: '互联网', openDate: '2026-09-10', roles: '社区运营/内容产品/品类运营', openConfidence: 'ref', note: '往届同期开放，新传超对口', url: 'https://job.xiaohongshu.com/' },
  { id: 'n12', company: '哔哩哔哩', type: '互联网', openDate: '2026-09-05', roles: 'UP主运营/内容策划/社区产品', openConfidence: 'ref', note: '往届同期开放', url: 'https://jobs.bilibili.com/campus' },
  { id: 'n13', company: '京东', type: '互联网', openDate: '2026-09-01', roles: '品类运营/用户运营/产品经理', openConfidence: 'ref', note: '往届同期开放', url: 'https://campus.jd.com/' },
  { id: 'n14', company: '网易', type: '互联网', openDate: '2026-09-10', roles: '游戏策划/产品运营/内容运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://campus.163.com/' },
  { id: 'n15', company: '得物', type: '互联网', openDate: '2026-09-10', roles: '社区运营/内容运营/品类运营', openConfidence: 'ref', note: '往届同期开放，潮流内容新传对口', url: 'https://campus.dewu.com/' },
  { id: 'n16', company: '微博', type: '互联网', openDate: '2026-09-05', roles: '内容运营/社媒运营/商业产品', openConfidence: 'ref', note: '往届同期开放，双非友好', url: 'https://career.weibo.com/campus' },
  { id: 'n17', company: '携程', type: '互联网', openDate: '2026-09-10', roles: '旅游产品/内容运营/用户运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://campus.ctrip.com/' },
  { id: 'n18', company: '滴滴', type: '互联网', openDate: '2026-09-10', roles: '产品运营/用户增长/策略产品', openConfidence: 'ref', note: '往届同期开放', url: 'https://talent.didiglobal.com/' },
  { id: 'n19', company: '米哈游', type: '互联网', openDate: '2026-09-01', roles: '游戏社区运营/内容运营/用户运营', openConfidence: 'ref', note: 'B站确认9月已开宣讲', url: 'https://campus.mihoyo.com/' },
  { id: 'n20', company: '蔚来汽车', type: '互联网', openDate: '2026-09-10', roles: '用户运营/社区运营/品牌内容', openConfidence: 'ref', note: '往届同期开放，用户社区岗新传对口', url: 'https://nio.jobs.feishu.cn/campus/' },
  { id: 'n21', company: '理想汽车', type: '互联网', openDate: '2026-09-10', roles: '用户运营/产品经理/内容运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://careers.lixiang.com/' },
  { id: 'n22', company: '小米', type: '互联网', openDate: '2026-09-01', roles: '产品经理/新媒体运营/品牌运营', openConfidence: 'ref', note: '往届同期开放，小米汽车新增岗', url: 'https://hr.xiaomi.com/campus' },
  { id: 'n23', company: '大疆 DJI', type: '互联网', openDate: '2026-09-15', roles: '产品/市场运营/出海运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://we.dji.com/' },
  { id: 'n24', company: '科大讯飞', type: 'AI', openDate: '2026-09-15', roles: 'AI产品运营/内容运营/星火大模型', openConfidence: 'ref', note: '往届同期开放', url: 'https://campus.iflytek.com/' },
  { id: 'n25', company: '商汤科技', type: 'AI', openDate: '2026-09-15', roles: 'AI产品运营/内容运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://hr.sensetime.com/campus' },
  { id: 'n26', company: '中国移动', type: '央国企', openDate: '2026-09-15', roles: '产品运营/新媒体运营/市场营销', openConfidence: 'ref', note: '往届同期开放', url: 'https://job.10086.cn/' },
  { id: 'n27', company: '中国电信', type: '央国企', openDate: '2026-09-15', roles: '产品/市场运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://campus.chinatelecom-ec.com/' },
  { id: 'n28', company: '中国联通', type: '央国企', openDate: '2026-09-15', roles: '产品/市场运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://campus.chinaunicom.cn/' },
  { id: 'n29', company: '平安集团', type: '央国企', openDate: '2026-09-01', roles: '产品运营/金融科技/品牌运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://campus.pingan.com/' },
  { id: 'n30', company: '工商银行', type: '央国企', openDate: '2026-09-10', roles: '金融科技/运营/综合管理', openConfidence: 'ref', note: '往届同期开放', url: 'https://job.icbc.com.cn/' },
  { id: 'n31', company: '中国银行', type: '央国企', openDate: '2026-09-10', roles: '金融/新媒体/综合管理', openConfidence: 'ref', note: '往届同期开放', url: 'https://www.boc.cn/aboutboc/ab7/index.html' },
  { id: 'n32', company: '交通银行', type: '央国企', openDate: '2026-09-10', roles: '金融/运营/综合管理', openConfidence: 'ref', note: '往届同期开放', url: 'https://www.bankcomm.com/BankCommSite/zonghang/cn/zhaopinxinxi/index.shtml' },
  { id: 'n33', company: '国家电网', type: '央国企', openDate: '2026-09-01', roles: '综合管理/宣传/运营', openConfidence: 'ref', note: '往届同期开放，铁饭碗', url: 'https://zhaopin.sgcc.com.cn/' },
  { id: 'n34', company: '央视/总台CCTV', type: '央国企', openDate: '2026-09-01', roles: '新媒体运营/内容策划/编辑', openConfidence: 'ref', note: '往届截止较早（10月中），新传对口', url: 'https://job.cctv.com/' },
  { id: 'n35', company: '人民网/人民日报', type: '央国企', openDate: '2026-09-10', roles: '新媒体运营/内容编辑', openConfidence: 'ref', note: '往届同期开放，文科硕加分', url: 'https://hr.people.com.cn/GB/index.html' },
  { id: 'n36', company: '欧莱雅', type: '外企', openDate: '2026-09-15', roles: '品牌管培生/数字营销/社媒运营', openConfidence: 'ref', note: '外企快消通常9-10月启动，新传对口', url: 'https://careers.loreal.com/en_US/content/China-Campus' },
  { id: 'n37', company: '宝洁 P&G', type: '外企', openDate: '2026-09-15', roles: '品牌营销管培/市场部/电商运营', openConfidence: 'ref', note: '往届同期开放，管培生顶流', url: 'https://www.pgcareers.com/' },
  { id: 'n38', company: '联合利华', type: '外企', openDate: '2026-09-20', roles: '品牌管培/数字营销/电商运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://careers.unilever.com/' },
  { id: 'n39', company: '玛氏 Mars', type: '外企', openDate: '2026-09-15', roles: '市场营销管培/品牌管理/内容策划', openConfidence: 'ref', note: '外企品牌管培，食品/宠物赛道', url: 'https://www.mars.com/careers/find-a-job?country=CN' },
  { id: 'n40', company: 'TikTok', type: '外企', openDate: '2026-09-10', roles: '海外内容运营/产品运营/用户增长', openConfidence: 'ref', note: '往届同期开放，出海运营新传对口', url: 'https://careers.tiktok.com/' },
  { id: 'n41', company: 'Shein', type: '外企', openDate: '2026-09-10', roles: '跨境电商运营/品类运营/内容运营', openConfidence: 'ref', note: '往届同期开放，双非接受度高', url: 'https://job.sheincorp.cn/' },
  { id: 'n42', company: '奥美 Ogilvy', type: '外企', openDate: '2026-09-20', roles: '广告策划/公关/社媒运营', openConfidence: 'ref', note: '新传对口外企首选之一', url: 'https://www.ogilvy.com/careers' },
  { id: 'n43', company: '爱德曼 Edelman', type: '外企', openDate: '2026-09-20', roles: '公关/内容传播/社媒策略', openConfidence: 'ref', note: '全球最大公关公司，新传超对口', url: 'https://www.zhipin.com/web/geek/job?query=爱德曼&city=100010000' },
  { id: 'n44', company: '爱奇艺', type: '文娱传媒', openDate: '2026-09-10', roles: '内容运营/会员运营/用户运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://campus.iqiyi.com/' },
  { id: 'n45', company: '芒果TV', type: '文娱传媒', openDate: '2026-09-10', roles: '综艺内容运营/新媒体运营/宣发', openConfidence: 'ref', note: '往届同期开放，新传超对口', url: 'https://www.mgtv.com/index/invite/' },
  { id: 'n46', company: '阅文集团', type: '文娱传媒', openDate: '2026-09-15', roles: 'IP运营/内容运营/作者运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://job.yuewen.com/' },
  { id: 'n47', company: '喜马拉雅', type: '文娱传媒', openDate: '2026-09-15', roles: '内容运营/音频产品/用户运营', openConfidence: 'ref', note: '往届同期开放，节奏不卷', url: 'https://www.ximalaya.com/zhaopin/' },
  { id: 'n48', company: '瑞幸咖啡', type: '快消', openDate: '2026-09-15', roles: '品牌运营/私域运营/用户增长', openConfidence: 'ref', note: '往届同期开放，数字化强', url: 'https://www.luckincoffee.com/campus' },
  { id: 'n49', company: '泡泡玛特', type: '快消', openDate: '2026-09-15', roles: 'IP运营/内容运营/品牌营销', openConfidence: 'ref', note: '往届同期开放，文化消费赛道', url: 'https://www.popmart.com/cn/pages/campus' },
  { id: 'n50', company: '农夫山泉', type: '快消', openDate: '2026-09-15', roles: '品牌/市场/内容运营', openConfidence: 'ref', note: '往届同期开放', url: 'https://www.zhipin.com/web/geek/job?query=农夫山泉校招&city=100010000' },
  { id: 'n51', company: '伊利集团', type: '快消', openDate: '2026-09-15', roles: '品牌/市场运营/管培生', openConfidence: 'ref', note: '往届同期开放，乳业龙头', url: 'https://www.yili.com/about/hr/' },
  { id: 'n52', company: '珀莱雅', type: '快消', openDate: '2026-09-20', roles: '内容营销/品牌运营/新媒体', openConfidence: 'ref', note: '国货美妆，新媒体运营强对口', url: 'https://www.zhipin.com/web/geek/job?query=珀莱雅校招&city=100010000' },
  { id: 'n53', company: '腾讯音乐TME', type: '文娱传媒', openDate: '2026-09-01', roles: '内容运营/产品运营/用户增长', openConfidence: 'ref', note: '跟随腾讯节奏，音乐内容新传对口', url: 'https://join.tencentmusic.com/' },
  { id: 'n54', company: '贝壳找房', type: '互联网', openDate: '2026-09-10', roles: '产品运营/内容运营', openConfidence: 'ref', note: '往届同期开放，节奏好', url: 'https://campus.ke.com/' },
]

// 预置截止日期数据（查到的真实/往届参考数据，2027届秋招）
// confidence: 'high'=真实来源 / 'mid'=有间接证据 / 'ref'=往届参考
const PRESET_DEADLINES = [
  // ===== 10月8日（确认截止） =====
  { id: 1,  company: '中国农业银行', type: '央国企', deadline: '2026-10-08', confidence: 'high', note: '网申截止10月8日，全国招18789人', url: 'https://zhaopin.abchina.com/' },
  { id: 2,  company: '中国建设银行', type: '央国企', deadline: '2026-10-08', confidence: 'high', note: '网申截止10月8日，全国招15022人', url: 'https://career.ccb.com/' },
  // ===== 10月15日前 =====
  { id: 3,  company: '央视/总台CCTV', type: '央国企', deadline: '2026-10-15', confidence: 'ref', note: '往届参考，央视截止较早', url: 'https://job.cctv.com/' },
  { id: 4,  company: '国家电网', type: '央国企', deadline: '2026-10-15', confidence: 'ref', note: '往届参考，截止较早', url: 'https://zhaopin.sgcc.com.cn/' },
  { id: 5,  company: '中国烟草', type: '央国企', deadline: '2026-10-15', confidence: 'ref', note: '往届参考，截止较早', url: 'http://zzld.tobacco.gov.cn/' },
  // ===== 10月底截止（互联网大厂） =====
  { id: 6,  company: '腾讯', type: '互联网', deadline: '2026-10-31', confidence: 'mid', note: '秋招已启动935+岗位，10月底为往届参考', url: 'https://join.qq.com/post.html' },
  { id: 7,  company: '字节跳动', type: '互联网', deadline: '2026-10-31', confidence: 'mid', note: '8月内推已开，正式批10月底截止（往届参考）', url: 'https://jobs.bytedance.com/campus' },
  { id: 8,  company: '阿里巴巴', type: '互联网', deadline: '2026-10-31', confidence: 'mid', note: '秋招已启动，10月底截止（往届参考）', url: 'https://talent.alibaba.com/campus/home' },
  { id: 9,  company: '美团', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://campus.meituan.com/' },
  { id: 10, company: '快手', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://zhaopin.kuaishou.cn/' },
  { id: 11, company: '小红书', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://job.xiaohongshu.com/' },
  { id: 12, company: '哔哩哔哩', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://jobs.bilibili.com/campus' },
  { id: 13, company: '百度', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://talent.baidu.com/jobs/list' },
  { id: 14, company: '京东', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://campus.jd.com/' },
  { id: 15, company: '滴滴', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://talent.didiglobal.com/' },
  { id: 16, company: '得物', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://campus.dewu.com/' },
  { id: 17, company: '微博', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考，双非友好', url: 'https://career.weibo.com/campus' },
  { id: 18, company: '携程', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://campus.ctrip.com/' },
  { id: 19, company: '科大讯飞', type: 'AI', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://campus.iflytek.com/' },
  { id: 20, company: '商汤科技', type: 'AI', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://hr.sensetime.com/campus' },
  { id: 21, company: '米哈游', type: '互联网', deadline: '2026-10-31', confidence: 'mid', note: 'B站确认9月已开宣讲，10月底推算', url: 'https://campus.mihoyo.com/' },
  { id: 22, company: '蔚来汽车', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://nio.jobs.feishu.cn/campus/' },
  { id: 23, company: '理想汽车', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://careers.lixiang.com/' },
  { id: 24, company: '小米', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://hr.xiaomi.com/campus' },
  { id: 25, company: '大疆', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://we.dji.com/' },
  { id: 26, company: '贝壳找房', type: '互联网', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://campus.ke.com/' },
  { id: 27, company: '中国移动', type: '央国企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://job.10086.cn/' },
  { id: 28, company: '中国电信', type: '央国企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://campus.chinatelecom-ec.com/' },
  { id: 29, company: '中国联通', type: '央国企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://campus.chinaunicom.cn/' },
  { id: 30, company: '平安集团', type: '央国企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://campus.pingan.com/' },
  { id: 31, company: '招商银行', type: '央国企', deadline: '2026-10-31', confidence: 'ref', note: '招银网络科技已截止，关注总行批次', url: 'https://career.cmbchina.com/campus/' },
  { id: 32, company: '工商银行', type: '央国企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://job.icbc.com.cn/' },
  { id: 33, company: '中国银行', type: '央国企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.boc.cn/aboutboc/ab7/index.html' },
  { id: 34, company: '交通银行', type: '央国企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.bankcomm.com/BankCommSite/zonghang/cn/zhaopinxinxi/index.shtml' },
  { id: 35, company: '邮储银行', type: '央国企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.zhipin.com/web/geek/job?query=邮储银行校招&city=100010000' },
  { id: 36, company: '南方电网', type: '央国企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://job.csg.cn/' },
  { id: 37, company: '欧莱雅', type: '外企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://careers.loreal.com/en_US/content/China-Campus' },
  { id: 38, company: '宝洁 P&G', type: '外企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.pgcareers.com/' },
  { id: 39, company: '联合利华', type: '外企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://careers.unilever.com/' },
  { id: 40, company: '玛氏 Mars', type: '外企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.mars.com/careers/find-a-job?country=CN' },
  { id: 41, company: '雀巢', type: '外企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.nestle.com.cn/jobs/campus' },
  { id: 42, company: 'TikTok', type: '外企', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://careers.tiktok.com/' },
  { id: 43, company: '爱奇艺', type: '文娱传媒', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://campus.iqiyi.com/' },
  { id: 44, company: '阅文集团', type: '文娱传媒', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://job.yuewen.com/' },
  { id: 45, company: '喜马拉雅', type: '文娱传媒', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.ximalaya.com/zhaopin/' },
  { id: 46, company: '芒果TV', type: '文娱传媒', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.mgtv.com/index/invite/' },
  { id: 47, company: '瑞幸咖啡', type: '快消', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.luckincoffee.com/campus' },
  { id: 48, company: '泡泡玛特', type: '快消', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.popmart.com/cn/pages/campus' },
  { id: 49, company: '伊利集团', type: '快消', deadline: '2026-10-31', confidence: 'ref', note: '往届参考', url: 'https://www.yili.com/about/hr/' },
  // ===== 11月中截止 =====
  { id: 50, company: '网易', type: '互联网', deadline: '2026-11-15', confidence: 'ref', note: '往届参考，网易截止略晚', url: 'https://campus.163.com/' },
  { id: 51, company: '埃森哲', type: '外企', deadline: '2026-11-15', confidence: 'ref', note: '往届参考，四大咨询截止较晚', url: 'https://www.accenture.com/cn-zh/careers/local/student' },
  { id: 52, company: '德勤', type: '外企', deadline: '2026-11-15', confidence: 'ref', note: '往届参考', url: 'https://www2.deloitte.com/cn/zh/careers/students.html' },
  { id: 53, company: '普华永道PwC', type: '外企', deadline: '2026-11-15', confidence: 'ref', note: '往届参考', url: 'https://www.pwccn.com/zh/careers/campus-recruitment.html' },
  { id: 54, company: '毕马威KPMG', type: '外企', deadline: '2026-11-15', confidence: 'ref', note: '往届参考', url: 'https://home.kpmg/cn/zh/home/careers.html' },
  { id: 55, company: '安永EY', type: '外企', deadline: '2026-11-15', confidence: 'ref', note: '往届参考', url: 'https://www.ey.com/zh_cn/careers' },
  // ===== 11月底截止（AI初创/部分互联网） =====
  { id: 56, company: '拼多多', type: '互联网', deadline: '2026-11-30', confidence: 'mid', note: '校招已开，拼多多截止通常较晚', url: 'https://careers.pinduoduo.com/campus' },
  { id: 57, company: '月之暗面 Kimi', type: 'AI', deadline: '2026-11-30', confidence: 'ref', note: 'AI初创往届参考', url: 'https://www.zhipin.com/web/geek/job?query=月之暗面&city=100010000' },
  { id: 58, company: '智谱 AI', type: 'AI', deadline: '2026-11-30', confidence: 'ref', note: 'AI初创往届参考', url: 'https://www.zhipin.com/web/geek/job?query=智谱AI&city=100010000' },
  { id: 59, company: 'MiniMax', type: 'AI', deadline: '2026-11-30', confidence: 'ref', note: 'AI初创往届参考', url: 'https://www.zhipin.com/web/geek/job?query=minimax&city=100010000' },
  { id: 60, company: '字节 TikTok', type: '外企', deadline: '2026-11-30', confidence: 'ref', note: '国际团队独立，截止较晚', url: 'https://careers.tiktok.com/' },
  { id: 61, company: 'Shein', type: '外企', deadline: '2026-11-30', confidence: 'ref', note: '往届参考，截止较晚', url: 'https://job.sheincorp.cn/' },
  { id: 62, company: '奥美 Ogilvy', type: '外企', deadline: '2026-11-30', confidence: 'ref', note: '往届参考', url: 'https://www.ogilvy.com/careers' },
]

const TYPE_COLORS = {
  'AI': '#8B7CE8',
  '互联网': '#E8927C',
  '央国企': '#9B6B4A',
  '外企': '#7CAED0',
  '快消': '#7CBF8A',
  '文娱传媒': '#C77DBB',
}

const CONFIDENCE_LABELS = {
  high: { label: '官方确认', color: '#7CBF8A' },
  mid: { label: '有佐证', color: '#F5C04C' },
  ref: { label: '往届参考', color: '#B8A088' },
}

function daysLeft(deadline) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(deadline)
  d.setHours(0, 0, 0, 0)
  return Math.ceil((d - today) / (1000 * 60 * 60 * 24))
}

function urgencyClass(days) {
  if (days < 0) return 'deadline-past'
  if (days <= 3) return 'deadline-urgent'
  if (days <= 7) return 'deadline-soon'
  if (days <= 14) return 'deadline-near'
  return 'deadline-ok'
}

function urgencyLabel(days) {
  if (days < 0) return `已过期 ${Math.abs(days)} 天`
  if (days === 0) return '今天截止！'
  if (days === 1) return '明天截止！'
  return `还剩 ${days} 天`
}

const STORAGE_KEY = 'tj_deadlines_v1'

const DeadlineTracker = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : PRESET_DEADLINES
  })
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ company: '', type: '互联网', deadline: '', note: '', url: '' })
  const [filter, setFilter] = useState('全部')
  const [showPast, setShowPast] = useState(false)

  const save = (next) => {
    setItems(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const addItem = () => {
    if (!form.company.trim() || !form.deadline) return
    save([{
      id: Date.now(),
      company: form.company.trim(),
      type: form.type,
      deadline: form.deadline,
      confidence: 'high',
      note: form.note.trim(),
      url: form.url.trim() || '#',
    }, ...items])
    setForm({ company: '', type: '互联网', deadline: '', note: '', url: '' })
    setShowAdd(false)
  }

  const deleteItem = (id) => save(items.filter(i => i.id !== id))

  const openLink = (url) => {
    if (url && url !== '#') {
      if (window.electronAPI) window.electronAPI.openExternal(url)
      else window.open(url, '_blank')
    }
  }

  const types = ['全部', ...Object.keys(TYPE_COLORS)]
  const [activeTab, setActiveTab] = useState('new') // 'new' | 'deadline'

  const filtered = items
    .filter(i => filter === '全部' || i.type === filter)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))

  const active = filtered.filter(i => daysLeft(i.deadline) >= 0)
  const past = filtered.filter(i => daysLeft(i.deadline) < 0)

  const filteredNew = filter === '全部'
    ? NEW_OPENINGS
    : NEW_OPENINGS.filter(i => i.type === filter)

  // 紧急：7天内的
  const urgentCount = active.filter(i => daysLeft(i.deadline) <= 7).length

  return (
    <div className="deadline-tracker">
      {/* 顶部摘要 */}
      {urgentCount > 0 && (
        <div className="deadline-alert-banner">
          <AlertTriangle size={15} />
          <span>有 <strong>{urgentCount}</strong> 家公司截止日期在 7 天内，请优先处理！</span>
        </div>
      )}

      {/* 主 tab 切换 */}
      <div className="deadline-main-tabs">
        <button
          className={`deadline-main-tab ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          <Zap size={13} /> 最新开放 <span className="deadline-main-tab-count">{filteredNew.length}</span>
        </button>
        <button
          className={`deadline-main-tab ${activeTab === 'deadline' ? 'active' : ''}`}
          onClick={() => setActiveTab('deadline')}
        >
          <AlarmClock size={13} /> 截止日期 {urgentCount > 0 && <span className="deadline-main-tab-alert">{urgentCount}紧急</span>}
        </button>
      </div>

      <div className="deadline-toolbar">
        <div className="deadline-filters">
          {types.map(t => (
            <button
              key={t}
              className={`news-filter ${filter === t ? 'active' : ''}`}
              onClick={() => setFilter(t)}
            >{t}</button>
          ))}
        </div>
        {activeTab === 'deadline' && (
          <button className="jd-add-btn" onClick={() => setShowAdd(!showAdd)}>
            <Plus size={14} /> 新增
          </button>
        )}
      </div>

      {showAdd && (
        <div className="deadline-add-card">
          <div className="jd-input-row">
            <input
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
              placeholder="公司名"
              className="jd-input"
            />
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="jd-input">
              {Object.keys(TYPE_COLORS).map(t => <option key={t}>{t}</option>)}
            </select>
            <input
              type="date"
              value={form.deadline}
              onChange={e => setForm({ ...form, deadline: e.target.value })}
              className="jd-input"
            />
          </div>
          <input
            value={form.url}
            onChange={e => setForm({ ...form, url: e.target.value })}
            placeholder="官网链接（可选）"
            className="jd-input"
            style={{ width: '100%', marginBottom: 8 }}
          />
          <input
            value={form.note}
            onChange={e => setForm({ ...form, note: e.target.value })}
            placeholder="备注（如：运营/产品岗，第二批）"
            className="jd-input"
            style={{ width: '100%', marginBottom: 8 }}
          />
          <div className="jd-input-actions">
            <button onClick={() => setShowAdd(false)} className="jd-btn-cancel">取消</button>
            <button onClick={addItem} className="jd-btn-analyze">添加</button>
          </div>
        </div>
      )}

      {/* 最新开放板块 */}
      {activeTab === 'new' && (
        <>
          <div className="new-openings-grid">
            {filteredNew.length === 0 && <p className="deadline-empty">暂无该类别数据</p>}
            {filteredNew.map(item => (
              <div key={item.id} className="new-opening-card" onClick={() => openLink(item.url)}>
                <div className="new-opening-top">
                  <span
                    className="deadline-type-badge"
                    style={{ background: (TYPE_COLORS[item.type] || '#999') + '22', color: TYPE_COLORS[item.type] || '#999' }}
                  >{item.type}</span>
                  <span className={`new-opening-conf ${item.openConfidence}`}>
                    {item.openConfidence === 'high' ? '已确认' : '往届参考'}
                  </span>
                </div>
                <div className="new-opening-company">{item.company}</div>
                <div className="new-opening-roles">{item.roles}</div>
                <div className="new-opening-meta">
                  <span className="new-opening-date">开放：{item.openDate}</span>
                  <ExternalLink size={11} className="new-opening-link-icon" />
                </div>
                <div className="new-opening-note">{item.note}</div>
              </div>
            ))}
          </div>
          <p className="news-tip">💡 "已确认"为2026年9月查到的真实来源；"往届参考"为根据历年规律推断，点击直接去官网核实是否已开放。</p>
        </>
      )}

      {/* 截止日期板块 */}
      {activeTab === 'deadline' && (
        <>
          {/* 有效截止日期列表 */}
          <div className="deadline-list">
            {active.length === 0 && <p className="deadline-empty">暂无有效截止日期</p>}
            {active.map(item => {
          const days = daysLeft(item.deadline)
          const uc = urgencyClass(days)
          const conf = CONFIDENCE_LABELS[item.confidence]
          return (
            <div key={item.id} className={`deadline-item ${uc}`}>
              <div className="deadline-item-left">
                <span
                  className="deadline-type-badge"
                  style={{ background: (TYPE_COLORS[item.type] || '#999') + '22', color: TYPE_COLORS[item.type] || '#999' }}
                >{item.type}</span>
                <span className="deadline-company">{item.company}</span>
                {item.note && <span className="deadline-note">{item.note}</span>}
              </div>
              <div className="deadline-item-right">
                <span className="deadline-date">{item.deadline}</span>
                <span className={`deadline-days ${uc}`}>{urgencyLabel(days)}</span>
                <span className="deadline-confidence" style={{ color: conf.color }}>
                  {conf.label}
                </span>
                {item.url && item.url !== '#' && (
                  <button className="icon-btn ghost tiny" onClick={() => openLink(item.url)} title="打开官网">
                    <ExternalLink size={12} />
                  </button>
                )}
                <button className="icon-btn danger tiny" onClick={() => deleteItem(item.id)} title="删除">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* 已截止折叠区 */}
      {past.length > 0 && (
        <div className="deadline-past-section">
          <button className="deadline-past-toggle" onClick={() => setShowPast(!showPast)}>
            <CheckCircle2 size={14} /> 已截止 {past.length} 家 {showPast ? '▲' : '▼'}
          </button>
          {showPast && (
            <div className="deadline-list past">
              {past.map(item => (
                <div key={item.id} className="deadline-item deadline-past">
                  <div className="deadline-item-left">
                    <span className="deadline-company">{item.company}</span>
                    <span className="deadline-note">{item.note}</span>
                  </div>
                  <div className="deadline-item-right">
                    <span className="deadline-date">{item.deadline}</span>
                    <span className="deadline-days deadline-past">{urgencyLabel(daysLeft(item.deadline))}</span>
                    <button className="icon-btn danger tiny" onClick={() => deleteItem(item.id)}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <p className="news-tip" style={{ marginTop: 12 }}>
        💡 截止日期标注"往届参考"的以各公司今年公告为准，建议定期去官网核实。"官方确认"为2027届真实截止日期。
      </p>
        </>
      )}
    </div>
  )
}

export default DeadlineTracker
