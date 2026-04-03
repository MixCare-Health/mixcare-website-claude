/**
 * Seed script — populates Sanity with 5 multilingual audience pages.
 * Run with: npx tsx scripts/seed-audience-pages.ts
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function ls(en: string, zhTW: string, zhCN: string) {
  return { en, zhTW, zhCN };
}

// ── Helper: build a localised array of {title, desc, icon} ───────────────────
function lSolutions(
  en: Array<{ challenge: string; solution: string }>,
  zhTW: Array<{ challenge: string; solution: string }>,
  zhCN: Array<{ challenge: string; solution: string }>
) {
  const mapFn = (items: Array<{ challenge: string; solution: string }>) =>
    items.map((item, i) => ({
      _key: `sol-${i}`,
      title: item.solution,
      desc: item.challenge,
      icon: "",
    }));
  return { en: mapFn(en), zhTW: mapFn(zhTW), zhCN: mapFn(zhCN) };
}

function lFeatured(
  en: Array<{ label: string; desc: string; tag?: string }>,
  zhTW: Array<{ label: string; desc: string; tag?: string }>,
  zhCN: Array<{ label: string; desc: string; tag?: string }>
) {
  const mapFn = (items: Array<{ label: string; desc: string; tag?: string }>) =>
    items.map((item, i) => ({ _key: `feat-${i}`, label: item.label, desc: item.desc, tag: item.tag ?? "" }));
  return { en: mapFn(en), zhTW: mapFn(zhTW), zhCN: mapFn(zhCN) };
}

function lMetrics(
  en: Array<{ value: string; label: string }>,
  zhTW: Array<{ value: string; label: string }>,
  zhCN: Array<{ value: string; label: string }>
) {
  const mapFn = (items: Array<{ value: string; label: string }>) =>
    items.map((item, i) => ({ _key: `metric-${i}`, value: item.value, label: item.label }));
  return { en: mapFn(en), zhTW: mapFn(zhTW), zhCN: mapFn(zhCN) };
}

function lChallenges(
  en: Array<{ title: string; desc: string }>,
  zhTW: Array<{ title: string; desc: string }>,
  zhCN: Array<{ title: string; desc: string }>
) {
  const mapFn = (items: Array<{ title: string; desc: string }>) =>
    items.map((item, i) => ({ _key: `challenge-${i}`, title: item.title, desc: item.desc }));
  return { en: mapFn(en), zhTW: mapFn(zhTW), zhCN: mapFn(zhCN) };
}

// ── Audience Pages ────────────────────────────────────────────────────────────

const audiencePages = [
  // ── 1. Insurers ──────────────────────────────────────────────────────────────
  {
    _id: "audience-page-insurers",
    _type: "audiencePage",
    pageId: "insurers",
    badge: ls("For Insurers", "保險公司專屬", "保险公司专属"),
    headline: ls(
      "Supercharge Your Policies with AI-Powered Wellness",
      "以AI驅動的健康服務賦能您的保單",
      "以 AI 驱动的健康服务赋能您的保单"
    ),
    sub: ls(
      "Add scalable health and wellness add-ons to group and individual policies. Reduce claims costs, minimise fraud, and deliver a digital-first experience that policyholders love.",
      "為團體及個人保單添加可擴展的醫療與健康附加服務。降低理賠風險、增加保單持有人互動率及滿意度，並在數字化轉型中保持競爭力",
      "为团体及个人保单添加可扩展的健康与健康附加服务。降低理赔成本、减少欺诈，并提供保单持有人喜爱的数字优先体验。"
    ),
    cta: ls("Get a Demo", "預約示範", "预约演示"),
    challenges: lChallenges(
      [
        { title: "Rising claims costs", desc: "Traditional outpatient schemes lack the controls needed to manage escalating medical claims. Manual processing leaves fraud undetected and costs unpredictable." },
        { title: "Low policyholder engagement", desc: "Policyholders rarely interact with their insurer outside of claims. Without meaningful wellness touchpoints, retention suffers and policy renewal rates decline." },
        { title: "Digital transformation gaps", desc: "Modernising legacy claims infrastructure is expensive and slow. In the meantime, digital-first competitors are winning market share with better policyholder experiences." },
        { title: "Lack of broker sales tools", desc: "Insurance brokers lack digital tools to effectively present, compare, and sell health benefit plans — slowing distribution and reducing competitiveness in a market that demands speed and transparency." },
      ],
      [
        { title: "理賠及醫療費用大幅上升", desc: "傳統門診方案缺乏管控不斷上升的醫療費用，成本難以預測" },
        { title: "保單持有人參與度低", desc: "保單持有人很少在理賠以外與保險公司互動。缺乏有意義的健康接觸點" },
        { title: "數字化轉型", desc: "在保單上增加一些增值服務成本昂貴又緩慢但亦十分重要" },
        { title: "缺乏保險經紀銷售工具", desc: "保險經紀缺乏數碼工具來有效展示、比較及銷售健康福利計劃——拖慢分銷速度，在講求效率與透明度的市場中降低競爭力。" },
      ],
      [
        { title: "理赔成本攀升", desc: "传统门诊方案缺乏管控不断上升的医疗理赔所需的工具。人工处理让欺诈行为难以被发现，成本难以预测。" },
        { title: "保单持有人参与度低", desc: "保单持有人很少在理赔以外与保险公司互动。缺乏有意义的健康接触点，客户留存率下降，保单续期率随之降低。" },
        { title: "数字化转型差距", desc: "改造传统理赔基础设施既昂贵又缓慢。与此同时，数字优先的竞争对手正凭借更优质的保单持有人体验抢占市场份额。" },
        { title: "缺乏保险经纪销售工具", desc: "保险经纪缺乏数字工具来有效展示、比较及销售健康福利计划——拖慢分销速度，在讲求效率与透明度的市场中降低竞争力。" },
      ]
    ),
    solutions: lSolutions(
      [
        { challenge: "Manual claims processing leads to fraud and slow payouts", solution: "MixCare's AI engine processes claims in <24h with >95% fraud detection accuracy — no manual review team required" },
        { challenge: "Policyholders see no value between renewal cycles", solution: "The Wellness Hub and Marketplace drive year-round engagement — policyholders use their benefits monthly, not just when sick" },
        { challenge: "Building digital capabilities in-house is cost-prohibitive", solution: "MixCare deploys as a white-label add-on to your existing policies — no infrastructure investment, live in weeks" },
      ],
      [
        { challenge: "人工理賠處理導致欺詐及賠付延遲", solution: "MixCare 的 AI 引擎在 24 小時內以逾 95% 準確率處理理賠並識別欺詐——無需人工審核團隊" },
        { challenge: "保單持有人在續保周期之間未能感受到價值", solution: "健康中心與市場驅動全年參與——保單持有人每月使用福利，而非僅在生病時" },
        { challenge: "內部自建數字能力成本過高", solution: "MixCare 以白標附加服務形式部署至您的現有保單——無需基礎設施投資，數週內即可上線" },
      ],
      [
        { challenge: "人工理赔处理导致欺诈及赔付延迟", solution: "MixCare 的 AI 引擎在 24 小时内以逾 95% 准确率处理理赔并识别欺诈——无需人工审核团队" },
        { challenge: "保单持有人在续保周期之间未能感受到价值", solution: "健康中心与市场驱动全年参与——保单持有人每月使用福利，而非仅在生病时" },
        { challenge: "内部自建数字能力成本过高", solution: "MixCare 以白标附加服务形式部署至您的现有保单——无需基础设施投资，数周内即可上线" },
      ]
    ),
    featuredSolutions: lFeatured(
      [
        { label: "Health Wellness Membership", desc: "Give policyholders access to exclusive privileges and curated perks through the MixCare platform — from premium wellness deals to partner rewards that enhance everyday wellbeing." },
        { label: "Wellness Marketplace", desc: "Members can redeem rewards or purchase wellness services and products at member-only prices — covering fitness, mental health, nutrition, and 3,000+ curated categories." },
        { label: "MixCare Medical Pass", desc: "Members enjoy discounted outpatient consultation fees at MixCare's 2,000+ panel clinics across Hong Kong, Macau, and Singapore — with savings of up to 70% off standard rates.*" },
      ],
      [
        { label: "健康服務會藉", desc: "透過 MixCare 平台，讓保單持有人享有專屬優惠及精選禮遇——涵蓋頂級健康折扣及合作夥伴回饋，全面提升日常健康生活。" },
        { label: "Wellness Marketplace", desc: "會員可換領獎賞或以會員優惠價購買健康服務及產品——涵蓋健身、心理健康、營養等逾3,000項精選類別。" },
        { label: "MixCare 醫療卡", desc: "會員可在MixCare遍佈香港、澳門及新加坡的逾2,000間特約診所享有優惠門診診金，低至3折*。" },
      ],
      [
        { label: "健康服务会籍", desc: "通过 MixCare 平台，让保单持有人享有专属优惠及精选礼遇——涵盖顶级健康折扣及合作伙伴回馈，全面提升日常健康生活。" },
        { label: "Wellness Marketplace", desc: "会员可兑换奖励或以会员优惠价购买健康服务及产品——涵盖健身、心理健康、营养等逾3,000项精选类别。" },
        { label: "MixCare 医疗会籍", desc: "会员可在MixCare遍布香港、澳门及新加坡的逾2,000间指定诊所享有优惠门诊诊金，低至3折*。" },
      ]
    ),
    metrics: lMetrics(
      [
        { value: "70%", label: "Claims processing cost reduction" },
        { value: "95%+", label: "Fraud detection accuracy" },
        { value: "<24h", label: "Average claims resolution" },
        { value: "3x", label: "Policyholder engagement uplift" },
      ],
      [
        { value: "70%", label: "理賠處理成本降低" },
        { value: "95%+", label: "欺詐識別準確率" },
        { value: "<24小時", label: "平均理賠解決時間" },
        { value: "3倍", label: "保單持有人參與度提升" },
      ],
      [
        { value: "70%", label: "理赔处理成本降低" },
        { value: "95%+", label: "欺诈识别准确率" },
        { value: "<24小时", label: "平均理赔解决时间" },
        { value: "3倍", label: "保单持有人参与度提升" },
      ]
    ),
    testimonial: {
      quote: ls(
        "MixCare transformed how we deliver health benefits to our policyholders. The AI claims processing cut our resolution time by 70% and fraud incidents dropped significantly within the first quarter.",
        "MixCare 改變了我們向保單持有人提供健康福利的方式。AI 理賠處理將我們的解決時間縮短了 70%，首個季度的欺詐事件也大幅下降。",
        "MixCare 改变了我们向保单持有人提供健康福利的方式。AI 理赔处理将我们的解决时间缩短了 70%，首个季度的欺诈事件也大幅下降。"
      ),
      name: "Jennifer Wong",
      title: ls("VP, Group Benefits", "團體福利副總裁", "团体福利副总裁"),
      company: ls("AXA Hong Kong", "AXA 香港", "AXA 香港"),
    },
    hideSolutions: true,
    hideTestimonial: true,
    hideMetrics: true,
  },

  // ── 2. Brokers ───────────────────────────────────────────────────────────────
  {
    _id: "audience-page-brokers",
    _type: "audiencePage",
    pageId: "brokers",
    badge: ls("For Insurance Brokers", "保險經紀專屬", "保险经纪专属"),
    headline: ls(
      "Win More Clients with Flexible Benefit Packages",
      "以靈活的福利方案贏得更多客戶",
      "以灵活的福利方案赢得更多客户"
    ),
    sub: ls(
      "Differentiate your offering with the most flexible, competitive benefit packages in Asia-Pacific. Partner with MixCare to retain existing clients and attract new ones.",
      "靈活彈性的福利方案脫穎而出。與 MixCare 合作，留住現有客戶並吸引新客戶。",
      "以亚太地区最灵活、最具竞争力的福利方案脱颖而出。与 MixCare 合作，留住现有客户并吸引新客户。"
    ),
    cta: ls("Partner Sign-Up", "成為合作夥伴", "成为合作伙伴"),
    challenges: lChallenges(
      [
        { title: "Clients face rising outpatient costs with no control", desc: "Traditional group outpatient plans offer no visibility into claims, no fraud controls, and no cost flexibility. Self-funded models give your clients transparency and predictable budgets — and MixCare makes it easy to offer." },
        { title: "Employees under-use their benefit budget", desc: "Rigid, paper-based benefits don't fit modern employee lifestyles. FSA wallets and a curated wellness marketplace dramatically increase utilisation — giving your clients visible ROI on every dollar spent." },
        { title: "No digital edge to win or retain accounts", desc: "Presenting the same PDF brochure every renewal cycle isn't enough. Clients want a modern platform — flexible benefits, self-selection portals, and real-time analytics that demonstrate ongoing value." },
      ],
      [
        { title: "客戶面臨門診費用攀升，卻無從管控", desc: "傳統團體門診計劃對理賠情況毫無透明度——無法預測成本、更遑論優化。客戶往往在年度審計時才發現超支" },
        { title: "員工未能充分使用福利預算", desc: "死板、紙本化的福利不符合現代員工的生活方式。員工忽視福利，企業的投入形同浪費——這正是每個客戶在續保時都在問的問題" },
        { title: "缺乏數碼優勢，難以贏取或留住客戶", desc: "每個續保周期都拿著同一份 PDF 小冊子，已無法打動客戶。缺乏數碼工具，客戶會流失到提供更現代化平台的競爭對手" },
      ],
      [
        { title: "客户面临门诊费用攀升，却无从管控", desc: "传统团体门诊计划对理赔情况毫无透明度——无法预测成本、更遑论优化。客户往往在年度审计时才发现超支。" },
        { title: "员工未能充分使用福利预算", desc: "死板、纸本化的福利不符合现代员工的生活方式。员工忽视福利，企业的投入形同浪费——这正是每个客户在续保时都在问的问题。" },
        { title: "缺乏数字优势，难以赢取或留住客户", desc: "每个续保周期都拿着同一份 PDF 宣传册，已无法打动客户。缺乏数字工具，客户会流失到提供更现代化平台的竞争对手。" },
      ]
    ),
    solutions: lSolutions(
      [
        { challenge: "Same-as-everyone-else product catalogue", solution: "MixCare gives you FSA, wellness marketplace, and flexible benefits — differentiated products your competitors can't easily replicate" },
        { challenge: "Clients leaving for more flexible competitors", solution: "Employee self-selection portals and utilisation analytics give your clients tangible proof of value every month — not just at renewal" },
        { challenge: "High admin overhead managing benefits across clients", solution: "One broker portal to manage all clients, all benefit types, all claims — reducing admin time by up to 60%" },
      ],
      [
        { challenge: "產品目錄與競爭對手無異", solution: "MixCare 為您提供 FSA、健康市場及靈活福利——競爭對手難以輕易複製的差異化產品" },
        { challenge: "客戶流失至更靈活的競爭對手", solution: "員工自選門戶及使用率分析每月為您的客戶提供切實的價值證明——而非僅在續保時" },
        { challenge: "跨客戶管理福利的高額行政開銷", solution: "一個經紀門戶管理所有客戶、所有福利類型、所有理賠——行政時間最多減少 60%" },
      ],
      [
        { challenge: "产品目录与竞争对手无异", solution: "MixCare 为您提供 FSA、健康市场及灵活福利——竞争对手难以轻易复制的差异化产品" },
        { challenge: "客户流失至更灵活的竞争对手", solution: "员工自选门户及使用率分析每月为您的客户提供切实的价值证明——而非仅在续保时" },
        { challenge: "跨客户管理福利的高额行政开销", solution: "一个经纪门户管理所有客户、所有福利类型、所有理赔——行政时间最多减少 60%" },
      ]
    ),
    featuredSolutions: lFeatured(
      [
        { label: "Self-Funded Outpatient Plan", desc: "Give clients AI-powered outpatient claims processing, a 2,000+ panel doctor network, and stop-loss controls — at a fraction of traditional group insurance costs." },
        { label: "Flexible Spending Account", desc: "FSA wallets with 30+ spending categories — a compelling add-on that drives measurable employee satisfaction and benefit utilisation." },
        { label: "Wellness Marketplace", desc: "White-label marketplace you can brand for each client — 3,000+ services, zero inventory or curation overhead." },
        { label: "Flexible Benefits Solution", desc: "Personalised benefit packages that let employees self-select from a curated catalogue — the differentiator that wins RFPs and retains accounts.", tag: "Coming Soon" },
      ],
      [
        { label: "自付門診計劃", desc: "為客戶提供 AI 驅動的門診理賠處理、逾 2,000 家網絡診所，以及止損控制——成本僅為傳統團體保險的一小部分。" },
        { label: "靈活支出帳戶", desc: "涵蓋 30 多個消費類別的 FSA 錢包——可量化員工滿意度與福利使用率的有力增值服務。" },
        { label: "健康市場", desc: "可為每位客戶定製品牌的白標市場——逾 3,000 項服務，零庫存及策劃開銷。" },
        { label: "靈活福利方案", desc: "允許員工從精選目錄自選福利的個性化方案——贏得招標、留住客戶的致勝差異化優勢。", tag: "即將推出" },
      ],
      [
        { label: "自付门诊计划", desc: "为客户提供 AI 驱动的门诊理赔处理、逾 2,000 家网络诊所，以及止损控制——成本仅为传统团体保险的一小部分。" },
        { label: "灵活支出账户", desc: "涵盖 30 多个消费类别的 FSA 钱包——可量化员工满意度与福利使用率的有力增值服务。" },
        { label: "健康市场", desc: "可为每位客户定制品牌的白标市场——逾 3,000 项服务，零库存及策划开销。" },
        { label: "灵活福利方案", desc: "允许员工从精选目录自选福利的个性化方案——赢得招标、留住客户的致胜差异化优势。", tag: "即将推出" },
      ]
    ),
    metrics: lMetrics(
      [
        { value: "95%", label: "Client retention rate" },
        { value: "60%", label: "Admin time reduction" },
        { value: "3x", label: "New business conversion uplift" },
        { value: "88%", label: "Employee benefit utilisation" },
      ],
      [
        { value: "95%", label: "客戶留存率" },
        { value: "60%", label: "行政時間減少" },
        { value: "3倍", label: "新業務轉化提升" },
        { value: "88%", label: "員工福利使用率" },
      ],
      [
        { value: "95%", label: "客户留存率" },
        { value: "60%", label: "行政时间减少" },
        { value: "3倍", label: "新业务转化提升" },
        { value: "88%", label: "员工福利使用率" },
      ]
    ),
    testimonial: {
      quote: ls(
        "As a broker, MixCare gives me the most flexible, competitive packages to offer clients. I retained 3 large accounts this year purely because of the FSA and marketplace features — clients that were ready to go to tender.",
        "作為經紀，MixCare 為我提供了最靈活、最具競爭力的方案。今年我僅憑 FSA 和市場功能就留住了 3 個大客戶——這些客戶原本已準備重新招標。",
        "作为经纪，MixCare 为我提供了最灵活、最具竞争力的方案。今年我仅凭 FSA 和市场功能就留住了 3 个大客户——这些客户原本已准备重新招标。"
      ),
      name: "Diana Leung",
      title: ls("Senior Benefits Advisor", "高級福利顧問", "高级福利顾问"),
      company: ls("Pacific Benefits Group", "Pacific Benefits Group", "Pacific Benefits Group"),
    },
    hideSolutions: false,
    hideTestimonial: false,
    hideMetrics: false,
  },

  // ── 3. Enterprises ───────────────────────────────────────────────────────────
  {
    _id: "audience-page-enterprises",
    _type: "audiencePage",
    pageId: "enterprises",
    badge: ls("For Large Enterprises", "大型企業專屬", "大型企业专属"),
    headline: ls(
      "Enterprise Benefits, Individually Personalised",
      "企業級福利，為每位員工個性化",
      "企业级福利，为每位员工个性化"
    ),
    sub: ls(
      "Customisable employee benefit programs with analytics, compliance, and seamless HR integration. Designed for 500+ employee organisations across Asia-Pacific.",
      "具備分析、合規及無縫 HR 整合的可定制員工福利計劃。專為亞太地區 500 人以上企業設計。",
      "具备分析、合规及无缝 HR 整合的可定制员工福利计划。专为亚太地区 500 人以上企业设计。"
    ),
    cta: ls("Get a Demo", "預約示範", "预约演示"),
    challenges: lChallenges(
      [
        { title: "One-size-fits-all doesn't work", desc: "With hundreds or thousands of employees across different generations, roles, and life stages, rigid benefit plans satisfy no one — and cost the company more than they deliver." },
        { title: "Low benefit utilisation and satisfaction", desc: "Traditional benefits are opaque and inconvenient. Low utilisation means poor return on investment and little impact on employee engagement or retention." },
        { title: "HR administration complexity", desc: "Managing benefits for large populations — enrolments, changes, claims, reporting — requires significant HR headcount and still produces errors and delays." },
      ],
      [
        { title: "一刀切的方案行不通", desc: "面對不同世代、職位和生活階段的數百乃至數千名員工，僵化的福利方案無法令任何人滿意——且企業付出的成本遠超所獲得的回報。" },
        { title: "福利使用率低且滿意度不足", desc: "傳統福利不透明且不便利。使用率低意味著投資回報差，對員工敬業度和留存率幾乎沒有影響。" },
        { title: "HR 行政管理複雜", desc: "管理大規模人群的福利——入職、變更、理賠、報告——需要大量 HR 人手，且仍會產生錯誤和延誤。" },
      ],
      [
        { title: "一刀切的方案行不通", desc: "面对不同世代、职位和生活阶段的数百乃至数千名员工，僵化的福利方案无法令任何人满意——且企业付出的成本远超所获得的回报。" },
        { title: "福利使用率低且满意度不足", desc: "传统福利不透明且不便利。使用率低意味着投资回报差，对员工敬业度和留存率几乎没有影响。" },
        { title: "HR 行政管理复杂", desc: "管理大规模人群的福利——入职、变更、理赔、报告——需要大量 HR 人手，且仍会产生错误和延误。" },
      ]
    ),
    solutions: lSolutions(
      [
        { challenge: "Rigid group plans that don't meet individual needs", solution: "MixCare's flexible benefits engine lets each employee personalise their own plan within your defined budget and rules" },
        { challenge: "Low engagement and poor ROI on benefit spend", solution: "The Wellness Hub and Marketplace drive monthly touchpoints — average utilisation jumps from 42% to 88% within two quarters" },
        { challenge: "HR team overwhelmed by benefits administration", solution: "Automated enrolment, AI claims processing, and real-time analytics reduce HR benefits admin time by 70%" },
      ],
      [
        { challenge: "不符合個人需求的固定團體方案", solution: "MixCare 的靈活福利引擎讓每位員工在您設定的預算和規則內個性化自己的方案" },
        { challenge: "福利支出參與度低且回報差", solution: "健康中心與市場每月創造接觸點——兩個季度內平均使用率從 42% 躍升至 88%" },
        { challenge: "HR 團隊被福利行政管理工作淹沒", solution: "自動化入職、AI 理賠處理及實時分析將 HR 福利行政時間減少 70%" },
      ],
      [
        { challenge: "不符合个人需求的固定团体方案", solution: "MixCare 的灵活福利引擎让每位员工在您设定的预算和规则内个性化自己的方案" },
        { challenge: "福利支出参与度低且回报差", solution: "健康中心与市场每月创造接触点——两个季度内平均使用率从 42% 跃升至 88%" },
        { challenge: "HR 团队被福利行政管理工作淹没", solution: "自动化入职、AI 理赔处理及实时分析将 HR 福利行政时间减少 70%" },
      ]
    ),
    featuredSolutions: lFeatured(
      [
        { label: "Flexible Benefits Solution", desc: "Employee self-selection portal with top-up/top-down budget structures — scales to any number of employees." },
        { label: "Flexible Spending Account", desc: "Multi-wallet FSA management with 30+ spending categories and real-time utilisation tracking." },
        { label: "Wellness Hub", desc: "Integrate with your existing HRIS, payroll, and insurance systems through pre-built connectors or open API." },
      ],
      [
        { label: "靈活福利方案", desc: "具備自上而下/自下而上預算結構的員工自選門戶——可擴展至任意員工規模。" },
        { label: "靈活支出帳戶", desc: "涵蓋 30 多個消費類別及實時使用率追蹤的多錢包 FSA 管理。" },
        { label: "健康中心", desc: "通過預建連接器或開放 API 與您現有的 HRIS、薪資及保險系統整合。" },
      ],
      [
        { label: "灵活福利方案", desc: "具备自上而下/自下而上预算结构的员工自选门户——可扩展至任意员工规模。" },
        { label: "灵活支出账户", desc: "涵盖 30 多个消费类别及实时使用率追踪的多钱包 FSA 管理。" },
        { label: "健康中心", desc: "通过预建连接器或开放 API 与您现有的 HRIS、薪资及保险系统整合。" },
      ]
    ),
    metrics: lMetrics(
      [
        { value: "88%", label: "Avg. benefit utilisation" },
        { value: "70%", label: "HR admin time reduction" },
        { value: "35%", label: "Improvement in retention" },
        { value: "2x", label: "Employee satisfaction uplift" },
      ],
      [
        { value: "88%", label: "平均福利使用率" },
        { value: "70%", label: "HR 行政時間減少" },
        { value: "35%", label: "員工留存率提升" },
        { value: "2倍", label: "員工滿意度提升" },
      ],
      [
        { value: "88%", label: "平均福利使用率" },
        { value: "70%", label: "HR 行政时间减少" },
        { value: "35%", label: "员工留存率提升" },
        { value: "2倍", label: "员工满意度提升" },
      ]
    ),
    testimonial: {
      quote: ls(
        "MixCare transformed our benefits from a cost centre into a retention tool. Employees across all 12 of our offices now have personalised benefit plans and our annual satisfaction scores hit an all-time high.",
        "MixCare 將我們的福利從成本中心轉變為留才工具。我們全部 12 間辦事處的員工現在都擁有個性化福利方案，年度滿意度調查達到歷史新高。",
        "MixCare 将我们的福利从成本中心转变为留才工具。我们全部 12 间办事处的员工现在都拥有个性化福利方案，年度满意度调查达到历史新高。"
      ),
      name: "Marcus Chen",
      title: ls("Head of HR", "人力資源總監", "人力资源总监"),
      company: ls("Jardine Matheson", "怡和集團", "怡和集团"),
    },
    hideSolutions: false,
    hideTestimonial: false,
    hideMetrics: false,
  },

  // ── 4. Small Business ────────────────────────────────────────────────────────
  {
    _id: "audience-page-small-business",
    _type: "audiencePage",
    pageId: "small-business",
    badge: ls("For Small Businesses", "中小企業專屬", "中小企业专属"),
    headline: ls(
      "Enterprise-Grade Benefits, SMB-Friendly Pricing",
      "企業級福利，中小企友好定價",
      "企业级福利，中小企友好定价"
    ),
    sub: ls(
      "Attract and retain top talent with benefits that rival large corporations — affordable, simple to set up, and running in less than a day. No HR team needed.",
      "以媲美大企業的福利吸引並留住頂尖人才——價格實惠、設置簡單，不足一天即可運行。無需 HR 團隊。",
      "以媲美大企业的福利吸引并留住顶尖人才——价格实惠、设置简单，不足一天即可运行。无需 HR 团队。"
    ),
    cta: ls("Start Now — Free Setup", "立即開始——免費設置", "立即开始——免费设置"),
    challenges: lChallenges(
      [
        { title: "Can't compete with large company benefits", desc: "Top candidates compare offers across companies of all sizes. Without compelling benefits, small businesses lose talent to larger competitors — even when the role and culture are a better fit." },
        { title: "Traditional benefits are too expensive or complex", desc: "Group medical insurance requires minimum headcounts, long commitments, and HR expertise to manage. Most small businesses don't have the resources to set it up properly." },
        { title: "No visibility on what employees actually value", desc: "Without data on benefit utilisation, small business owners are spending money on benefits employees don't use — while missing the things they actually want." },
      ],
      [
        { title: "無法與大企業的福利競爭", desc: "頂尖候選人會比較各種規模企業的待遇。缺乏吸引力的福利，中小企業會在人才爭奪中輸給大企業——即使職位和文化更合適。" },
        { title: "傳統福利過於昂貴或複雜", desc: "團體醫療保險需要最低人數要求、長期承諾及 HR 專業知識。大多數中小企業沒有資源妥善設置。" },
        { title: "不清楚員工真正重視什麼", desc: "缺乏福利使用率數據，中小企業主正在為員工不使用的福利花錢——同時錯過了員工真正想要的東西。" },
      ],
      [
        { title: "无法与大企业的福利竞争", desc: "顶尖候选人会比较各种规模企业的待遇。缺乏吸引力的福利，中小企业会在人才争夺中输给大企业——即使职位和文化更合适。" },
        { title: "传统福利过于昂贵或复杂", desc: "团体医疗保险需要最低人数要求、长期承诺及 HR 专业知识。大多数中小企业没有资源妥善设置。" },
        { title: "不清楚员工真正重视什么", desc: "缺乏福利使用率数据，中小企业主正在为员工不使用的福利花钱——同时错过了员工真正想要的东西。" },
      ]
    ),
    solutions: lSolutions(
      [
        { challenge: "Can't afford or access enterprise-grade benefits", solution: "MixCare's SMB plan starts from HK$180/employee/month — full access to FSA, wellness marketplace, and panel doctors with no minimum headcount" },
        { challenge: "Setup is too complex without an HR team", solution: "Self-service onboarding takes under 60 minutes — just add your employees, set a budget, and you're live with benefits your team will actually use" },
        { challenge: "No idea which benefits employees actually use", solution: "Real-time utilisation dashboard shows exactly what employees spend on — adjust your benefit mix monthly based on actual data" },
      ],
      [
        { challenge: "負擔不起或無法獲得企業級福利", solution: "MixCare 的中小企方案從每名員工每月港幣 180 元起——完整獲得 FSA、健康市場及特約醫生服務，無最低人數要求" },
        { challenge: "沒有 HR 團隊時設置過於複雜", solution: "自助入職只需 60 分鐘以內——只需添加員工、設置預算，即可讓團隊開始使用福利" },
        { challenge: "不清楚員工實際使用哪些福利", solution: "實時使用率儀表板精確顯示員工的消費方向——每月根據實際數據調整福利組合" },
      ],
      [
        { challenge: "负担不起或无法获得企业级福利", solution: "MixCare 的中小企方案从每名员工每月港币 180 元起——完整获得 FSA、健康市场及特约医生服务，无最低人数要求" },
        { challenge: "没有 HR 团队时设置过于复杂", solution: "自助入职只需 60 分钟以内——只需添加员工、设置预算，即可让团队开始使用福利" },
        { challenge: "不清楚员工实际使用哪些福利", solution: "实时使用率仪表板精确显示员工的消费方向——每月根据实际数据调整福利组合" },
      ]
    ),
    featuredSolutions: lFeatured(
      [
        { label: "Flexible Spending Account", desc: "Simple wellness wallets for healthcare, fitness, and mental health — employees love the flexibility." },
        { label: "Wellness Marketplace", desc: "Give employees access to 500+ wellness services — yoga, gym, nutrition, mental health and more." },
        { label: "Flexible Benefits Solution", desc: "Let employees choose what matters to them — punch above your weight class in the talent market." },
      ],
      [
        { label: "靈活支出帳戶", desc: "醫療、健身及心理健康的簡易健康錢包——員工喜愛其靈活性。" },
        { label: "健康市場", desc: "為員工提供 500 多種健康服務——瑜伽、健身房、營養、心理健康等。" },
        { label: "靈活福利方案", desc: "讓員工選擇對自己重要的事——在人才市場上超越同級競爭對手。" },
      ],
      [
        { label: "灵活支出账户", desc: "医疗、健身及心理健康的简易健康钱包——员工喜爱其灵活性。" },
        { label: "健康市场", desc: "为员工提供 500 多种健康服务——瑜伽、健身房、营养、心理健康等。" },
        { label: "灵活福利方案", desc: "让员工选择对自己重要的事——在人才市场上超越同级竞争对手。" },
      ]
    ),
    metrics: lMetrics(
      [
        { value: "HK$180", label: "Starting price per employee/month" },
        { value: "<60min", label: "Setup time" },
        { value: "0", label: "Minimum headcount" },
        { value: "88%", label: "Avg. employee utilisation" },
      ],
      [
        { value: "HK$180", label: "每名員工每月起步價" },
        { value: "<60分鐘", label: "設置時間" },
        { value: "0", label: "最低人數要求" },
        { value: "88%", label: "平均員工使用率" },
      ],
      [
        { value: "HK$180", label: "每名员工每月起步价" },
        { value: "<60分钟", label: "设置时间" },
        { value: "0", label: "最低人数要求" },
        { value: "88%", label: "平均员工使用率" },
      ]
    ),
    testimonial: {
      quote: ls(
        "We're a 25-person startup. Setting up MixCare took one afternoon and now we offer benefits that rival large corporations. It's helped us attract senior talent we couldn't compete for before.",
        "我們是一家 25 人的初創企業。設置 MixCare 只花了一個下午，現在我們提供的福利可媲美大企業。這幫助我們吸引到以前無法競爭的資深人才。",
        "我们是一家 25 人的初创企业。设置 MixCare 只花了一个下午，现在我们提供的福利可媲美大企业。这帮助我们吸引到以前无法竞争的资深人才。"
      ),
      name: "Ryan Lau",
      title: ls("CEO & Co-Founder", "行政總裁及聯合創辦人", "首席执行官及联合创始人"),
      company: ls("TechBridge HK", "TechBridge HK", "TechBridge HK"),
    },
    hideSolutions: false,
    hideTestimonial: false,
    hideMetrics: false,
  },

  // ── 5. Providers ─────────────────────────────────────────────────────────────
  {
    _id: "audience-page-providers",
    _type: "audiencePage",
    pageId: "providers",
    badge: ls("For Medical & Wellness Providers", "醫療或健康服務供應商專屬", "医疗或健康服务供应商专属"),
    headline: ls(
      "Grow Your Practice with Corporate Clients",
      "以企業客戶發展您的業務",
      "以企业客户发展您的业务"
    ),
    sub: ls(
      "Connect with thousands of corporate employees and policyholders across Asia-Pacific. Digital booking, cashless payments, and outcome tracking — all in one platform.",
      "與遍佈亞太地區的數千名企業員工及保單持有人建立聯繫。數字預約、免現金付款及結果追蹤——盡在一個平台。",
      "与遍布亚太地区的数千名企业员工及保单持有人建立联系。数字预约、免现金付款及结果追踪——尽在一个平台。"
    ),
    cta: ls("Become a Partner", "成為合作夥伴", "成为合作伙伴"),
    challenges: lChallenges(
      [
        { title: "Inconsistent corporate client acquisition", desc: "Reaching corporate clients typically requires lengthy sales cycles, broker relationships, and individual contract negotiations — making growth slow and unpredictable." },
        { title: "Manual booking and payment processes", desc: "Phone bookings, paper receipts, and manual billing create overhead and errors. Reimbursement claims take weeks and create friction for both provider and client." },
        { title: "No visibility on outcomes and performance", desc: "Without data on client engagement, session outcomes, and repeat bookings, it's hard to demonstrate value, optimise services, or grow corporate accounts." },
      ],
      [
        { title: "企業客戶獲取不穩定", desc: "接觸企業客戶通常需要漫長的銷售周期、中介關係及個別合同談判——使增長緩慢且難以預測。" },
        { title: "手動預約和付款流程", desc: "電話預約、紙質收據和人工賬單帶來額外工作量和錯誤。報銷理賠需要數週時間，對供應商和客戶均造成摩擦。" },
        { title: "缺乏結果和績效的可見度", desc: "缺乏客戶參與度、服務結果和重複預約的數據，難以展示價值、優化服務或拓展企業客戶。" },
      ],
      [
        { title: "企业客户获取不稳定", desc: "接触企业客户通常需要漫长的销售周期、中介关系及个别合同谈判——使增长缓慢且难以预测。" },
        { title: "手动预约和付款流程", desc: "电话预约、纸质收据和人工账单带来额外工作量和错误。报销理赔需要数周时间，对供应商和客户均造成摩擦。" },
        { title: "缺乏结果和绩效的可见度", desc: "缺乏客户参与度、服务结果和重复预约的数据，难以展示价值、优化服务或拓展企业客户。" },
      ]
    ),
    solutions: lSolutions(
      [
        { challenge: "Slow, expensive B2B sales to reach corporate clients", solution: "Get listed on MixCare's marketplace and reach 200+ corporate clients and their employees instantly — no sales team required" },
        { challenge: "Manual booking and cash payment management", solution: "Digital booking via the MixCare app, cashless FSA payments, and automated invoicing — receive payments within 3 business days" },
        { challenge: "No data to demonstrate impact to corporate clients", solution: "Provider analytics dashboard shows booking trends, client retention, and outcomes — data you can use to grow accounts and renew contracts" },
      ],
      [
        { challenge: "接觸企業客戶的 B2B 銷售緩慢且昂貴", solution: "在 MixCare 市場上架即可即時觸達 200 多家企業客戶及其員工——無需銷售團隊" },
        { challenge: "手動預約和現金付款管理", solution: "通過 MixCare 應用數字預約、免現金 FSA 付款及自動開票——3 個工作日內收款" },
        { challenge: "缺乏向企業客戶展示影響力的數據", solution: "供應商分析儀表板顯示預約趨勢、客戶留存及結果——幫助您拓展客戶並續簽合同的數據" },
      ],
      [
        { challenge: "接触企业客户的 B2B 销售缓慢且昂贵", solution: "在 MixCare 市场上架即可即时触达 200 多家企业客户及其员工——无需销售团队" },
        { challenge: "手动预约和现金付款管理", solution: "通过 MixCare 应用数字预约、免现金 FSA 付款及自动开票——3 个工作日内收款" },
        { challenge: "缺乏向企业客户展示影响力的数据", solution: "供应商分析仪表板显示预约趋势、客户留存及结果——帮助您拓展客户并续签合同的数据" },
      ]
    ),
    featuredSolutions: lFeatured(
      [
        { label: "Wellness Marketplace", desc: "Get listed among 500+ verified wellness services accessible to thousands of corporate employees." },
        { label: "Wellness Hub", desc: "Integrate your services into a connected ecosystem of health and wellness — insurers, employers, and employees in one network." },
      ],
      [
        { label: "健康市場", desc: "在 500 多種經認證的健康服務中上架，讓數千名企業員工能夠預約您的服務。" },
        { label: "健康中心", desc: "將您的服務整合至健康互聯生態系統——保險公司、雇主和員工共處一個網絡。" },
      ],
      [
        { label: "健康市场", desc: "在 500 多种经认证的健康服务中上架，让数千名企业员工能够预约您的服务。" },
        { label: "健康中心", desc: "将您的服务整合至健康互联生态系统——保险公司、雇主和员工共处一个网络。" },
      ]
    ),
    metrics: lMetrics(
      [
        { value: "200+", label: "Corporate clients on platform" },
        { value: "50,000+", label: "Employees with marketplace access" },
        { value: "3 days", label: "Payment settlement time" },
        { value: "40%", label: "Avg. revenue uplift for providers" },
      ],
      [
        { value: "200+", label: "平台企業客戶數" },
        { value: "50,000+", label: "可使用市場的員工數" },
        { value: "3天", label: "付款結算時間" },
        { value: "40%", label: "供應商平均收入增長" },
      ],
      [
        { value: "200+", label: "平台企业客户数" },
        { value: "50,000+", label: "可使用市场的员工数" },
        { value: "3天", label: "付款结算时间" },
        { value: "40%", label: "供应商平均收入增长" },
      ]
    ),
    testimonial: {
      quote: ls(
        "The Wellness Hub connected us directly to 8 corporate clients within the first month. Digital booking, cashless payments, and outcome tracking — everything we needed to scale our corporate business without adding sales headcount.",
        "健康中心在第一個月內直接為我們帶來了 8 家企業客戶。數字預約、免現金付款及結果追蹤——一切我們擴展企業業務所需的功能，無需增加銷售人員。",
        "健康中心在第一个月内直接为我们带来了 8 家企业客户。数字预约、免现金付款及结果追踪——一切我们扩展企业业务所需的功能，无需增加销售人员。"
      ),
      name: "Dr. Emily Fok",
      title: ls("Clinical Director", "臨床總監", "临床总监"),
      company: ls("Mindful Wellness Centre", "Mindful Wellness Centre", "Mindful Wellness Centre"),
    },
    hideSolutions: false,
    hideTestimonial: false,
    hideMetrics: false,
  },
];

async function main() {
  console.log(`Seeding ${audiencePages.length} audience pages...`);
  for (const page of audiencePages) {
    await client.createOrReplace(page);
    console.log(`  ✓ ${page._id}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
