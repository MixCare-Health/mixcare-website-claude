/**
 * Seed Home Page singleton to Sanity
 * Run: npx tsx scripts/seed-home.ts
 */
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "usfkxchk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  console.log("Seeding home page...");

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",

    // ── Hero ───────────────────────────────────────────────────────────────
    hero: {
      badge: {
        en: "Health & Wellness Platform",
        zhTW: "健康及醫療平台",
        zhCN: "健康及医疗平台",
      },
      headline1: {
        en: "AI-Powered",
        zhTW: "人工智能驅動",
        zhCN: "人工智能驱动",
      },
      headline2: {
        en: "Health\n& Wellness",
        zhTW: "健康及醫療平台",
        zhCN: "健康及医疗平台",
      },
      headline3: {
        en: "Solution",
        zhTW: "",
        zhCN: "",
      },
      sub: {
        en: "Empowering insurers, brokers, and employers with smarter benefits, flexible spending, and wellness solutions — all in one platform.",
        zhTW: "賦能保險公司、經紀及僱主，提供更智慧的福利、彈性醫療帳戶及醫療方案——盡在一個平台。",
        zhCN: "赋能保险公司、经纪及雇主，提供更智慧的福利、弹性医疗账户及医疗方案——尽在一个平台。",
      },
      ctaPrimary: {
        en: "Get a Demo",
        zhTW: "預約示範",
        zhCN: "预约演示",
      },
      ctaSecondary: {
        en: "Get Started",
        zhTW: "立即開始",
        zhCN: "立即开始",
      },
      dashboardTitle: {
        en: "Benefits Dashboard",
        zhTW: "福利 Dashboard",
        zhCN: "福利仪表板",
      },
      dashboardCompany: {
        en: "Acme Corp — Q1 2025",
        zhTW: "ABC Corp — 2025年第一季度",
        zhCN: "Acme Corp — 2025年第一季度",
      },
      dashboardLive: {
        en: "Live",
        zhTW: "直播",
        zhCN: "直播",
      },
      statLabels: {
        en: ["Wellness Services", "Markets", "Adjudication"],
        zhTW: ["健康服務", "服務市場", "核保"],
        zhCN: ["健康服务", "服务市场", "核保"],
      },
      statValues: {
        en: ["3,000+", "HK / MO / SG", "AI-Powered"],
        zhTW: ["3,000+", "港 / 澳 / 新加坡", "人工智能"],
        zhCN: ["3,000+", "港 / 澳 / 新", "人工智能"],
      },
      claimLabels: {
        en: ["Outpatient Claims", "Wellness Usage", "FSA Utilisation"],
        zhTW: ["門診索償", "健康使用率", "FSA使用率"],
        zhCN: ["门诊理赔", "健康使用率", "FSA使用率"],
      },
      recentClaims: {
        en: "Recent Claims",
        zhTW: "最近索償",
        zhCN: "最近理赔",
      },
      approved: {
        en: "Approved",
        zhTW: "已批准",
        zhCN: "已批准",
      },
      processing: {
        en: "Processing",
        zhTW: "處理中",
        zhCN: "处理中",
      },
      costSaved: {
        en: "30% Cost Saved",
        zhTW: "節省30%成本",
        zhCN: "节省30%成本",
      },
      costSavedSub: {
        en: "vs. traditional plans",
        zhTW: "對比傳統計劃",
        zhCN: "对比传统方案",
      },
      compliance: {
        en: "PDPO Compliant",
        zhTW: "符合PDPO規定",
        zhCN: "符合PDPO规定",
      },
      services: {
        en: "3,000+ Services",
        zhTW: "逾3,000項服務",
        zhCN: "逾3,000项服务",
      },
      servicesSub: {
        en: "Wellness marketplace",
        zhTW: "Wellness Marketplace",
        zhCN: "Wellness Marketplace",
      },
    },

    // ── Logo Bar ──────────────────────────────────────────────────────────
    logoBar: {
      label: {
        en: "Trusted by Leading Organisations",
        zhTW: "深受領先機構信賴",
        zhCN: "深受领先机构信赖",
      },
    },

    // ── Core Platform ─────────────────────────────────────────────────────
    corePlatform: {
      badge: {
        en: "Platform Overview",
        zhTW: "平台概覽",
        zhCN: "平台概览",
      },
      headline: {
        en: "Everything your workforce needs,",
        zhTW: "您的員工所需一切，",
        zhCN: "您的员工所需一切，",
      },
      headlineHighlight: {
        en: "in one platform",
        zhTW: "盡在一個平台",
        zhCN: "尽在一个平台",
      },
      sub: {
        en: "Three interconnected pillars that work together to deliver comprehensive health and wellness benefits at any scale.",
        zhTW: "三大互聯支柱協同運作，為任何規模的企業提供全面的健康及醫療福利。",
        zhCN: "三大互联支柱协同运作，为任何规模的企业提供全面的健康及医疗福利。",
      },
      learnMore: {
        en: "Learn More",
        zhTW: "了解更多",
        zhCN: "了解更多",
      },
      pillars: [
        { _key: "cp-pillar-1",
          title: {
            en: "Self-Funded Outpatient Plan",
            zhTW: "自付門診計劃",
            zhCN: "自付门诊计划",
          },
          desc: {
            en: "AI-powered claims processing with a 2,000+ panel doctor network for cashless consultations across HK, Macau, and Singapore.",
            zhTW: "人工智能索償處理，配合逾2,000名指定醫生網絡，在香港、澳門及新加坡提供免找換診症體驗。",
            zhCN: "人工智能理赔处理，配合逾2,000名指定医生网络，在香港、澳门及新加坡提供免现金就诊体验。",
          },
          stats: {
            en: "2,000+ Panel Doctors",
            zhTW: "逾2,000名指定醫生",
            zhCN: "逾2,000名指定医生",
          },
        },
        { _key: "cp-pillar-2",
          title: {
            en: "Flexible Spending Account",
            zhTW: "彈性醫療帳戶",
            zhCN: "弹性医疗账户",
          },
          desc: {
            en: "Create and manage FSA wallets covering healthcare, wellness, and lifestyle — fully customisable to any company size or policy type.",
            zhTW: "建立及管理涵蓋醫療、健康及生活方式的FSA錢包——可針對任何公司規模或保單類型全面定製。",
            zhCN: "创建和管理涵盖医疗、健康及生活方式的FSA钱包——可针对任何公司规模或保单类型全面定制。",
          },
          stats: {
            en: "30+ Spending Categories",
            zhTW: "逾30個消費類別",
            zhCN: "逾30个消费类别",
          },
        },
        { _key: "cp-pillar-3",
          title: {
            en: "Wellness Marketplace",
            zhTW: "Wellness Marketplace",
            zhCN: "Wellness Marketplace",
          },
          desc: {
            en: "A white-label marketplace where employees redeem wellness services — yoga, mental health, nutrition, gym memberships and more.",
            zhTW: "員工可透過白標市集兌換健康服務——瑜伽、心理健康、營養、健身會籍等應有盡有。",
            zhCN: "员工可通过白标市集兑换健康服务——瑜伽、心理健康、营养、健身会员等应有尽有。",
          },
          stats: {
            en: "500+ Wellness Services",
            zhTW: "逾500項健康服務",
            zhCN: "逾500项健康服务",
          },
        },
      ],
      counters: [
        { _key: "counter-1", value: "2,000+", label: { en: "Panel Doctors", zhTW: "指定醫生", zhCN: "指定医生" } },
        { _key: "counter-2", value: "500+",   label: { en: "Wellness Services", zhTW: "健康服務", zhCN: "健康服务" } },
        { _key: "counter-3", value: "200+",   label: { en: "Corporate Clients", zhTW: "企業客戶", zhCN: "企业客户" } },
        { _key: "counter-4", value: "98%",    label: { en: "Claims Satisfaction", zhTW: "索償滿意率", zhCN: "理赔满意率" } },
      ],
    },

    // ── Platform Features ─────────────────────────────────────────────────
    platformFeatures: {
      badge: {
        en: "Platform Overview",
        zhTW: "平台概覽",
        zhCN: "平台概览",
      },
      headline: {
        en: "Six Solutions. One Ecosystem.",
        zhTW: "六大解決方案。一個生態系統。",
        zhCN: "六大解决方案。一个生态系统。",
      },
      sub: {
        en: "Mix and match capabilities to build the health & wellness solution for your organisation",
        zhTW: "靈活組合各項功能，為貴機構打造最理想的健康及醫療方案",
        zhCN: "灵活组合各项功能，为贵机构打造最理想的健康及医疗方案",
      },
      soon: {
        en: "Soon",
        zhTW: "即將推出",
        zhCN: "即将推出",
      },
      comingSoon: {
        en: "Coming Soon",
        zhTW: "即將推出",
        zhCN: "即将推出",
      },
      available: {
        en: "Available now",
        zhTW: "現已推出",
        zhCN: "现已推出",
      },
      learnMore: {
        en: "Learn more",
        zhTW: "了解更多",
        zhCN: "了解更多",
      },
      explore: {
        en: "Explore",
        zhTW: "探索",
        zhCN: "探索",
      },
      features: [
        { _key: "feat-1",
          headline: {
            en: "AI-Powered Claims. Cashless Doctor Visits.",
            zhTW: "人工智能索償。免找數門診診症",
            zhCN: "人工智能理赔。免现金就诊。",
          },
          desc: {
            en: "Flexible plan design tailored to employer needs and budget, backed by AI-powered adjudication for fast, accurate processing.",
            zhTW: "靈活的計劃設計，配合人工智能核保系統，為僱主提供快速、可靠的門診福利計劃",
            zhCN: "灵活的方案设计，配合人工智能核保系统，为雇主提供快速、可靠的门诊福利方案。",
          },
          bullets: {
            en: [
              "Flexible plan design tailored to employer needs and budget",
              "Cashless doctor visits across a curated panel network in Hong Kong, Macau & Singapore with exclusive rates",
              "AI-powered adjudication system for fast, accurate Pay & Claim processing",
              "Real-time claims tracking and transparent reimbursement status",
            ],
            zhTW: [
              "按僱主需求及預算量身定制門診福利計劃",
              "在香港、澳門及新加坡設立的指定醫生網絡中提供免找數門診診症",
              "人工智能核保系統，確保快速準確的賠付及索償處理",
              "實時索償追蹤及透明的報銷進度",
            ],
            zhCN: [
              "灵活的方案设计，按雇主需求及预算量身定制",
              "在香港、澳门及新加坡设立的指定医生网络中提供免现金就诊",
              "人工智能核保系统，确保快速准确的赔付及理赔处理",
              "实时理赔追踪及透明的报销进度",
            ],
          },
        },
        { _key: "feat-2",
          headline: {
            en: "One Wallet. Every Health Need.",
            zhTW: "一個 FSA 錢包。滿足一切醫療或健康服務需求",
            zhCN: "一个 FSA 钱包。满足一切医疗或健康服务需求。",
          },
          desc: {
            en: "One unified wallet to spend seamlessly on medical and wellness services, with employer-defined contributions and full employee flexibility.",
            zhTW: "一個統一 FSA 錢包支付醫療或健康服務，僱主設定預算，員工可按自身需要使用",
            zhCN: "一个统一 FSA 钱包，可无缝支付医疗或健康服务，雇主设置预算，员工可按自身需要使用。",
          },
          bullets: {
            en: [
              "One unified wallet to spend seamlessly on medical and wellness services",
              "Employer-defined contribution with employee spending flexibility",
              "Instant balance visibility and transaction history in-app",
              "Compatible with panel clinics, wellness marketplace, and approved providers",
            ],
            zhTW: [
              "一個統一 FSA 錢包，可無縫支付醫療或健康服務",
              "僱主設定預算及員工可按自身需要使用",
              "應用程式內即時顯示餘額及交易記錄",
              "兼容門診服務、健康市場及提交報銷非 MixCare 的健康服務",
            ],
            zhCN: [
              "一个统一 FSA 钱包，可无缝支付医疗或健康服务",
              "雇主设定预算及员工可按自身需要使用",
              "应用程序内即时显示余额及交易记录",
              "兼容门診服务、健康市场及提交报销非 MixCare 的健康服务",
            ],
          },
        },
        { _key: "feat-3",
          headline: {
            en: "3,000+ Services. Up to 30% Off.",
            zhTW: "逾3,000項服務。最高享3折優惠",
            zhCN: "超過3,000项服务。最高享七折优惠。",
          },
          desc: {
            en: "Vetted wellness products and services across Hong Kong, Macau & Singapore — mental health, fitness, nutrition, beauty, and preventive care.",
            zhTW: "香港、澳門及新加坡的優質健康產品及服務包括，體檢、疫苗接種、心理健康、健身、營養及預防保健",
            zhCN: "香港、澳门及新加坡的优质健康产品及服务包括，体检、疫苗接种、心理健康、健身、营养及预防保健。",
          },
          bullets: {
            en: [
              "3,000+ vetted wellness products and services across Hong Kong, Macau & Singapore",
              "Up to 30% off exclusive member pricing",
              "No pay & claim needed — direct checkout experience",
              "Categories spanning mental health, fitness, nutrition, beauty & preventive care",
            ],
            zhTW: [
              "香港、澳門及新加坡逾3,000項優質健康產品及服務，請參閱我們的供應商名單",
              "尊享高達30%折扣的會員優惠價格",
              "無需提交索償——員工可直接使用 FSA 支付",
              "涵蓋20多個類別，包括身體檢查、疫苗接種、心理健康、健身、營養及預防保健等類別",
            ],
            zhCN: [
              "香港、澳门及新加坡逾3,000项优质健康产品及服务，請参阅我们的供应商目录",
              "尊享高达30%折扣的会员优惠价格",
              "无需提交理赔——员工可直接使用 FSA 支付",
              "涵盖20多个类别，包括体检、疫苗接种、心理健康、健身、营养及预防保健等类别",
            ],
          },
        },
        { _key: "feat-4",
          headline: {
            en: "Curated Wellness Events. Measurable Engagement",
            zhTW: "提升員工身心健康與參與感的全方位活動解決方案",
            zhCN: "提升员工身心健康与参与感的全方位活动解决方案",
          },
          desc: {
            en: "Provides tailored health activities for enterprises to comprehensively enhance employee health and engagement.",
            zhTW: "提供專屬企業的健康活動，包括線上/線下健康工作坊、按摩活動、心理輔導及財務健康計劃，全面提升員工健康與參與度",
            zhCN: "提供专属企业的健康活动，包括线上/线下健康工作坊、按摩活动、心理辅导及财务健康计划，全方位提升员工健康与参与度",
          },
          bullets: {
            en: [
              "Designs a year-round wellness activity calendar for enterprises, covering physical, mental, and financial health topics",
              "Supports both online and in-person activities, adaptable to hybrid or remote work models",
              "Offers a digital platform for employees to register, participate, and provide feedback",
              "Provides detailed post-event reports, including participation, attendance rates, and employee satisfaction, helping enterprises evaluate impact and optimize future activities",
            ],
            zhTW: [
              "可為企業設計一整年的健康活動日曆，涵蓋身體、心理及財務健康主題",
              "支援線上與到場活動，靈活適配混合或遠程工作模式",
              "提供電子化平台供員工報名、參與及提供反饋",
              "完成活動後，提供完整參與度、出席率及員工滿意度報告，幫助企業評估影響並優化未來活動",
            ],
            zhCN: [
              "可为企业设计一整年的健康活动日历，涵盖身体、心理及财务健康主题",
              "支持线上与到场活动，灵活适配混合或远程工作模式",
              "提供电子化平台供员工报名、参与及提供反馈",
              "活动结束后，提供完整的参与度、出席率及员工满意度报告，帮助企业评估影响并优化未来活动",
            ],
          },
        },
        { _key: "feat-5",
          headline: {
            en: "Flexible Benefits: Empowering Tomorrow's Workforce",
            zhTW: "彈性福利：未來的福利方案",
            zhCN: "弹性福利：未来的福利方案",
          },
          desc: {
            en: "Empower employees to select benefits that truly matter to their personal needs and lifestyles",
            zhTW: "讓員工選擇真正符合自身需求和生活方式的福利",
            zhCN: "让员工选择真正符合自身需求和生活方式的福利",
          },
          bullets: {
            en: [
              "Fully configurable benefits packages tailored to different employee groups and life stages",
              "Mix-and-match options across insurance(Partnered with an insurance brokerage firm), medical service, dental, vision, wellness, and lifestyle categories",
              "Digital benefits portal for easy self-service enrollment and plan changes",
              "Real-time budget tracking with employer-level cost visibility and control",
            ],
            zhTW: [
              "雇主可自由按預算自由配置的福利方案，員工可依不同需求和人生階段選擇自己的福利組合",
              "涵蓋保險(經保險經紀公司合作處理)、醫療、牙科、視力健康、身心健康及生活方式的多重選擇任意搭配",
              "簡單易用的平台方便員工選擇及更改計畫",
              "即時預算追踪，讓雇主全面掌握成本及控制管理",
            ],
            zhCN: [
              "雇主可自由按预算下自由配置的福利方案，员工可根据不同需求和人生阶段选择自己的福利组合",
              "涵盖保险(经保险经纪公司合作处理)、医疗、牙科、视力健康、身心健康及生活方式的多元选择任意搭配",
              "简单易用的平台方便员工选择及更改计划",
              "实时预算追踪，让雇主全面掌握成本及控制管理",
            ],
          },
        },
        { _key: "feat-6",
          headline: {
            en: "One Hub. Every Wellness Journey.",
            zhTW: "MixCare 健康生態圈。完整的健康旅程",
            zhCN: "MixCare 健康生态圈。完整的健康旅程",
          },
          desc: {
            en: "Centralized digital hub for health and wellness solutions, tools, and personalized wellness journeys — all within one connected ecosystem",
            zhTW: "一站式平台，連接各式各樣的健康解決方案、工具——所有功能都整合在 MixCare 健康生態圈中",
            zhCN: "一站式平台，连接各式各样的健康解决方案、工具——所有功能都整合在 MixCare 健康生态圈中",
          },
          bullets: {
            en: [
              "Access our vetted partner network for a wide range of health and wellness services",
              "Single sign-on to all health resources in one digital hub",
              "Across telemedicine, employee engagement, physical, mental & financial wellness",
              "Integrated with wearables and health apps for a 360° view of employee wellbeing with actionable insights",
            ],
            zhTW: [
              "連接經過審核的合作健康解決方案夥伴網絡",
              "員工只需單一登入(Single Sign-On) 存取所有健康資源",
              "涵蓋遠距醫療、員工敬業度、身心健康和財務健康",
              "可連接與戴式裝置和健康應用程式，提供360°員工健康狀況，提供完整員工健康福利報告",
            ],
            zhCN: [
              "连接经过审核的合作健康解决方案伙伴网络",
              "员工只需单一登入(Single Sign-On) 存取所有健康资源",
              "涵盖远距医疗、员工敬业度、身心健康和财务健康",
              "可连接与戴式装置和健康应用程式，提供360°员工健康状况，提供完整员工健康福利报告",
            ],
          },
        },
      ],
    },

    // ── Audience ──────────────────────────────────────────────────────────
    audience: {
      badge: {
        en: "Who We Serve",
        zhTW: "服務對象",
        zhCN: "服务对象",
      },
      headline: {
        en: "Built for every stakeholder in the health and employee benefits ecosystem",
        zhTW: "專為健康及員工福利生態系統中每位持份者而設",
        zhCN: "专为健康及员工福利生态系统中每位持份者而设",
      },
      sub: {
        en: "Whether you're an insurer, insurance broker, enterprise, SME, or wellness provider — MixCare has a solution tailored for you.",
        zhTW: "無論您是保險公司、保險經紀、企業、中小企還是醫療或健康服務供應商——MixCare均有為您度身設計的解決方案",
        zhCN: "无论您是保险公司、保险经纪、企业、中小企还是医疗或健康服务供应商——MixCare均有为您量身设计的解决方案。",
      },
      howWeHelp: {
        en: "How MixCare helps",
        zhTW: "如何幫助？",
        zhCN: "如何帮助？",
      },
      learnMore: {
        en: "Learn more",
        zhTW: "了解更多",
        zhCN: "了解更多",
      },
      audiences: [
        { _key: "aud-1",
          label: { en: "Insurance Company", zhTW: "保險公司", zhCN: "保险公司" },
          tagline: {
            en: "Sourcing and Managing Health Service Providers for Insurance Companies",
            zhTW: "為保險公司搜羅及管理健康服務供應商",
            zhCN: "为保险公司搜罗及管理医疗或健康服务供应商",
          },
          cta: { en: "Appointment Demo", zhTW: "預約示範", zhCN: "预约示范" },
          ctaHref: "/get-a-demo",
          bullets: {
            en: [
              "Launch a health service platform under its own brand to enhance brand image and customer loyalty",
              "Use health services as an expandable add-on to insurance policies to increase policy value and differentiation",
              "Loyalty Points Management: Seamlessly redeem insurance reward points for health services",
              "Obtain real-time data analysis to monitor usage, cost trends, and customer behavior",
              "Flexible pricing models, allowing for usage-based or bulk purchase options suitable for insurance companies of different sizes",
            ],
            zhTW: [
              "以自有品牌推出健康服務平台，增強品牌形象及客戶忠誠度",
              "將健康服務作為保單的可擴展附加服務，提升保單價值及差異化",
              "Loytalty point 管理，將保險獎勵積分無縫兌換為健康服務",
              "獲取實時數據分析，監察使用情況、成本趨勢及客戶行為",
              "收費模式靈活，可按使用量或一次式大量購買，適合不同規模的保險公司",
            ],
            zhCN: [
              "以自有品牌推出医疗或健康服务平台，增强品牌形象及客户忠诚度",
              "将医疗或健康服务作为保单的可扩展附加服务，提升保单价值及差异化",
              "Loytalty point 管理，将保险奖励积分无缝兑换为健康服务",
              "获取实时数据分析，监察使用情况、成本趋势及客户行为",
              "收费模式灵活，可按使用量或一次式大量购买，适合不同规模的保险公司",
            ],
          },
        },
        { _key: "aud-2",
          label: { en: "Insurance Broker", zhTW: "保險經紀", zhCN: "保险经纪" },
          tagline: {
            en: "Win more clients. Retain them for longer.",
            zhTW: "贏得更多客戶。長期留住他們",
            zhCN: "赢得更多客户。长期留住他们。",
          },
          cta: { en: "Partner Sign-Up", zhTW: "成為合作夥伴", zhCN: "成为合作伙伴" },
          ctaHref: "/partners",
          bullets: {
            en: [
              "We partner with innovative brokers and consultants to deliver the cost-effective, high-quality solutions your clients have been waiting for.",
              "Deliver more value to corporate clients with a modern, flexible benefits platform",
              "Configure and present tailored benefit proposals across medical, wellness, and lifestyle categories",
              "Single dashboard to manage multiple client accounts, renewals, and utilisation reports",
              "White-label options available to reinforce your brand with every client touchpoint",
            ],
            zhTW: [
              "我們與經紀商和顧問合作，向您客戶提供具成本效益且高品質的員工福利解決方案。",
              "透過靈活彈性的福利平台，填補傳統團體保險產品的缺口，為企業客戶提供更多價值",
              "利用自付門診計劃，彈性福利及健康市場配置醫療或健康量身訂製的福利方案",
              "使用單一平台管理多個客戶帳戶及使用報告",
              "提供白標選項，讓您的品牌更加突出",
            ],
            zhCN: [
              "我们与经纪商和顾问合作，提供您客户期待已久的具成本效益且高品质的解决方案。",
              "透过现代化且灵活的福利平台，为企业客户提供更多价值",
              "配置并展示针对医疗、健康和生活方式类别量身订制的福利方案",
              "使用单一仪表板管理多个客户帐户、续约与使用报告",
              "提供白标选项，让您的品牌在每个客户接触点中更加突出",
            ],
          },
        },
        { _key: "aud-3",
          label: { en: "Enterprise", zhTW: "大型企業", zhCN: "大型企业" },
          tagline: {
            en: "Benefits that attract, engage, and retain talent.",
            zhTW: "吸引、留住及激勵人才的福利。",
            zhCN: "吸引、留住及激励人才的福利。",
          },
          cta: { en: "Get a Demo", zhTW: "預約示範", zhCN: "预约演示" },
          ctaHref: "/get-a-demo",
          bullets: {
            en: [
              "Design flexible, scalable employee benefits programmes that attract and retain top talent",
              "Offer staff a personalised benefits wallet with freedom to spend on what matters to them",
              "Drive measurable improvements in workforce health, engagement, and productivity",
              "Centralised HR dashboard for enrolment management, cost control, and benefits reporting",
              "Support multi-country workforces across Hong Kong, Macau & Singapore from one platform",
            ],
            zhTW: [
              "設計靈活、可擴展的員工福利計劃，吸引及留住頂尖人才",
              "為員工提供個人化福利錢包，可自由消費所需項目",
              "推動員工健康、參與度及生產力的可量化改善",
              "集中人力資源儀表板，管理報名、成本控制及福利報告",
              "從單一平台支援香港、澳門及新加坡的跨國工作人員",
            ],
            zhCN: [
              "设计灵活、可扩展的员工福利方案，吸引及留住顶尖人才",
              "为员工提供个性化福利钱包，可自由消费所需项目",
              "推动员工健康、参与度及生产力的可量化改善",
              "集中人力资源仪表板，管理报名、成本控制及福利报告",
              "从单一平台支援香港、澳门及新加坡的跨国工作人员",
            ],
          },
        },
        { _key: "aud-4",
          label: { en: "SME", zhTW: "中小企業", zhCN: "中小企业" },
          tagline: {
            en: "Enterprise-grade benefits. SME-friendly pricing.",
            zhTW: "企業級福利。中小企友好定價。",
            zhCN: "企业级福利。中小企友好定价。",
          },
          cta: { en: "Start Now", zhTW: "立即開始", zhCN: "立即开始" },
          ctaHref: "/start-now",
          bullets: {
            en: [
              "Access enterprise-grade benefits solutions designed and priced for smaller teams",
              "Simple, fast setup with minimal administrative burden on HR or finance teams",
              "Offer competitive employee benefits that rival larger organisations — without the complexity",
              "Flexible contribution models that scale as your headcount grows",
              "Keep employees healthy, engaged, and loyal with wellness perks and outpatient coverage",
            ],
            zhTW: [
              "獲取專為小型團隊設計及定價的企業級福利解決方案",
              "簡單快速設置，對人力資源或財務團隊的行政負擔最小",
              "提供可與大型企業媲美的具競爭力員工福利——無需繁複流程",
              "靈活的供款模式，隨您的員工人數增長而擴展",
              "透過健康福利及門診保障，保持員工健康、投入及忠誠度",
            ],
            zhCN: [
              "获取专为小型团队设计及定价的企业级福利解决方案",
              "简单快速设置，对人力资源或财务团队的行政负担最小",
              "提供可与大型企业媲美的具竞争力员工福利——无需繁琐流程",
              "灵活的供款模式，随您的员工人数增长而扩展",
              "通过健康福利及门诊保障，保持员工健康、投入及忠诚度",
            ],
          },
        },
        { _key: "aud-5",
          label: {
            en: "Medical & Wellness Service Provider",
            zhTW: "醫療或健康服務供應商",
            zhCN: "医疗或健康服务供应商",
          },
          tagline: {
            en: "Reach more corporate clients. Grow your practice.",
            zhTW: "接觸更多企業客戶。發展您的業務。",
            zhCN: "接触更多企业客户。发展您的业务。",
          },
          cta: { en: "Become a Partner", zhTW: "成為合作夥伴", zhCN: "成为合作伙伴" },
          ctaHref: "/partners",
          bullets: {
            en: [
              "Join a growing network of 3,000+ vetted providers across Hong Kong, Macau & Singapore",
              "Reach corporate clients and their employees through a trusted, high-intent platform",
              "Seamless cashless and direct billing integration to reduce administrative friction",
              "Participate in curated wellness events and corporate health programmes",
              "Access platform analytics to understand demand trends and optimise your service offerings",
            ],
            zhTW: [
              "加入香港、澳門及新加坡逾3,000名優質供應商的成長網絡",
              "透過可信任的高意向平台接觸企業客戶及其員工",
              "無縫免找換及直接帳單整合，減少行政摩擦",
              "參與精選健康活動及企業健康計劃",
              "獲取平台分析數據，了解需求趨勢並優化您的服務",
            ],
            zhCN: [
              "加入香港、澳门及新加坡逾3,000名优质供应商的成长网络",
              "通过可信任的高意向平台接触企业客户及其员工",
              "无缝免现金及直接账单整合，减少行政摩擦",
              "参与精选健康活动及企业健康方案",
              "获取平台分析数据，了解需求趋势并优化您的服务",
            ],
          },
        },
      ],
    },

    // ── How It Works ──────────────────────────────────────────────────────
    howItWorks: {
      badge: {
        en: "How It Works",
        zhTW: "運作方式",
        zhCN: "运作方式",
      },
      headline: {
        en: "Up and running in days, not months",
        zhTW: "數天內啟動，而非數月",
        zhCN: "数天内启动，而非数月",
      },
      sub: {
        en: "A simple four-step process from configuration to insights — with dedicated support at every stage.",
        zhTW: "從設置到洞察的簡單四步流程——每個階段均有專屬支援。",
        zhCN: "从设置到洞察的简单四步流程——每个阶段均有专属支援。",
      },
      stepLabel: {
        en: "Step",
        zhTW: "步驟",
        zhCN: "步骤",
      },
      cta: {
        en: "See How It Works →",
        zhTW: "了解運作方式 →",
        zhCN: "了解运作方式 →",
      },
      footnote: {
        en: "Setup takes less than 5 business days",
        zhTW: "設置需時少於5個工作天",
        zhCN: "设置需时少于5个工作天",
      },
      steps: [
        { _key: "step-1",
          title: {
            en: "Configure Your Benefits Plan",
            zhTW: "設置您的福利計劃",
            zhCN: "设置您的福利方案",
          },
          desc: {
            en: "Set up your outpatient coverage, FSA wallets, and wellness marketplace in our intuitive admin portal. Fully customisable to your company's needs.",
            zhTW: "在我們直觀的管理入口設置門診保障、FSA錢包及Wellness Marketplace。完全可按公司需求定制。",
            zhCN: "在我们直观的管理门户设置门诊保障、FSA钱包及Wellness Marketplace。完全可按公司需求定制。",
          },
        },
        { _key: "step-2",
          title: {
            en: "Employees Access via App or Portal",
            zhTW: "員工透過應用程式或入口存取",
            zhCN: "员工通过应用程序或门户访问",
          },
          desc: {
            en: "Your team gets instant access to their benefits through our mobile app or web portal — book doctors, redeem wellness services, and manage their FSA.",
            zhTW: "您的團隊可透過我們的手機應用程式或網頁入口即時使用其福利——預約醫生、兌換健康服務及管理FSA。",
            zhCN: "您的团队可通过我们的手机应用程序或网页门户即时使用其福利——预约医生、兑换健康服务及管理FSA。",
          },
        },
        { _key: "step-3",
          title: {
            en: "AI Processes Claims & Transactions",
            zhTW: "人工智能處理索償及交易",
            zhCN: "人工智能处理理赔及交易",
          },
          desc: {
            en: "Our AI engine handles claims processing, fraud detection, and FSA transactions in real time — with 98% accuracy and sub-24h resolution.",
            zhTW: "我們的人工智能引擎實時處理索償、欺詐偵測及FSA交易——準確率達98%，24小時內完成。",
            zhCN: "我们的人工智能引擎实时处理理赔、欺诈检测及FSA交易——准确率达98%，24小时内完成。",
          },
        },
        { _key: "step-4",
          title: {
            en: "Real-Time Analytics & Insights",
            zhTW: "實時分析及洞察",
            zhCN: "实时分析及洞察",
          },
          desc: {
            en: "Track benefit utilisation, claim trends, and employee wellness scores on your live dashboard. Make data-driven decisions to optimise your program.",
            zhTW: "在您的實時儀表板追蹤福利使用情況、索償趨勢及員工健康評分。以數據為本作出決策，優化您的計劃。",
            zhCN: "在您的实时仪表板追踪福利使用情况、理赔趋势及员工健康评分。以数据为本作出决策，优化您的方案。",
          },
        },
      ],
    },

    // ── Testimonials ──────────────────────────────────────────────────────
    testimonials: {
      badge: {
        en: "Client Stories",
        zhTW: "客戶案例",
        zhCN: "客户案例",
      },
      headline: {
        en: "Trusted by the best across Asia-Pacific",
        zhTW: "深受亞太區最佳企業信賴",
        zhCN: "深受亚太区最佳企业信赖",
      },
      sub: {
        en: "From insurers and enterprises to SMBs and providers — here's what our clients say about working with MixCare Health.",
        zhTW: "從保險公司和大型企業到中小企和供應商——以下是我們客戶對與MixCare Health合作的評價。",
        zhCN: "从保险公司和大型企业到中小企和供应商——以下是我们客户对与MixCare Health合作的评价。",
      },
      audienceLabels: {
        insurer: { en: "Insurer", zhTW: "保險公司", zhCN: "保险公司" },
        enterprise: { en: "Enterprise", zhTW: "大型企業", zhCN: "大型企业" },
        broker: { en: "Broker", zhTW: "保險經紀", zhCN: "保险经纪" },
        smallBusiness: { en: "Small Business", zhTW: "中小企業", zhCN: "中小企业" },
        provider: { en: "Provider", zhTW: "服務供應商", zhCN: "服务供应商" },
      },
      stats: [
        { _key: "tstat-1", value: "98%",  label: { en: "Claims satisfaction rate",    zhTW: "索償滿意率",     zhCN: "理赔满意率" } },
        { _key: "tstat-2", value: "<24h", label: { en: "Average claims resolution",   zhTW: "平均索償解決時間", zhCN: "平均理赔解决时间" } },
        { _key: "tstat-3", value: "70%",  label: { en: "Admin time saved",            zhTW: "節省行政時間",    zhCN: "节省行政时间" } },
        { _key: "tstat-4", value: "4.9★", label: { en: "Average client rating",       zhTW: "平均客戶評分",    zhCN: "平均客户评分" } },
      ],
    },

    // ── Compliance ────────────────────────────────────────────────────────
    compliance: {
      badge: {
        en: "Trust & Compliance",
        zhTW: "信任與合規",
        zhCN: "信任与合规",
      },
      headline: {
        en: "Enterprise-grade security. Fully compliant.",
        zhTW: "企業級安全。全面合規。",
        zhCN: "企业级安全。全面合规。",
      },
      sub: {
        en: "Healthcare and financial data demand the highest standards. MixCare is built with security and regulatory compliance at its core — not as an afterthought.",
        zhTW: "醫療或財務數據要求最高標準。MixCare以安全性及監管合規為核心而構建——並非事後補充。",
        zhCN: "医疗或财务数据要求最高标准。MixCare以安全性及监管合规为核心而构建——并非事后补充。",
      },
      certFootnote: {
        en: "All certifications independently audited annually. Last audit: Q4 2024.",
        zhTW: "所有認證每年獨立審計。最新審計：2024年第四季度。",
        zhCN: "所有认证每年独立审计。最新审计：2024年第四季度。",
      },
      pillars: [
        { _key: "comp-pillar-1",
          title: {
            en: "Enterprise-Grade Security",
            zhTW: "企業級安全",
            zhCN: "企业级安全",
          },
          desc: {
            en: "End-to-end encryption, zero-trust architecture, and 99.9% uptime SLA.",
            zhTW: "端對端加密、零信任架構及99.9%正常運作時間SLA。",
            zhCN: "端对端加密、零信任架构及99.9%正常运作时间SLA。",
          },
        },
        { _key: "comp-pillar-2",
          title: {
            en: "Data Privacy by Design",
            zhTW: "數據私隱設計",
            zhCN: "数据隐私设计",
          },
          desc: {
            en: "Your data never leaves your designated region. Full PDPO and GDPR compliance.",
            zhTW: "您的數據永不離開指定地區。全面符合PDPO及GDPR規定。",
            zhCN: "您的数据永不离开指定地区。全面符合PDPO及GDPR规定。",
          },
        },
        { _key: "comp-pillar-3",
          title: {
            en: "Transparent Audit Trails",
            zhTW: "透明審計跟蹤",
            zhCN: "透明审计跟踪",
          },
          desc: {
            en: "Every claim, transaction, and access event is logged and auditable in real time.",
            zhTW: "每項索償、交易及存取事件均實時記錄及可審計。",
            zhCN: "每项理赔、交易及访问事件均实时记录及可审计。",
          },
        },
        { _key: "comp-pillar-4",
          title: {
            en: "Regional Data Residency",
            zhTW: "區域數據駐留",
            zhCN: "区域数据驻留",
          },
          desc: {
            en: "Data hosted in HK, SG, and MO — compliant with local regulatory requirements.",
            zhTW: "數據託管於香港、新加坡及澳門——符合當地監管要求。",
            zhCN: "数据托管于香港、新加坡及澳门——符合当地监管要求。",
          },
        },
      ],
    },

    // ── CTA ───────────────────────────────────────────────────────────────
    cta: {
      badge: {
        en: "Ready to Get Started?",
        zhTW: "準備開始？",
        zhCN: "准备开始？",
      },
      headline: {
        en: "Ready to transform your health benefits?",
        zhTW: "準備好轉型您的健康福利了嗎？",
        zhCN: "准备好转型您的健康福利了吗？",
      },
      sub: {
        en: "Join 200+ companies across Asia-Pacific who trust MixCare Health to deliver smarter, more engaging benefits for their people.",
        zhTW: "加入亞太區200多家信任MixCare Health為其員工提供更智慧、更具吸引力福利的企業。",
        zhCN: "加入亚太区200多家信任MixCare Health为其员工提供更智慧、更具吸引力福利的企业。",
      },
      ctaPrimary: {
        en: "Get a Demo",
        zhTW: "預約示範",
        zhCN: "预约演示",
      },
      ctaSecondary: {
        en: "Start Now — Free Setup",
        zhTW: "立即開始——免費設置",
        zhCN: "立即开始——免费设置",
      },
    },
  });

  console.log("Home page seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
