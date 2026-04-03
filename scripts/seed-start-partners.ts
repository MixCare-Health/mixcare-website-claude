/**
 * Seed Start Now Page + Partners Page to Sanity
 * Run: npx tsx scripts/seed-start-partners.ts
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
  // ── Start Now Page Singleton ───────────────────────────────────────────────
  console.log("Seeding startNowPage...");
  await client.createOrReplace({
    _id: "startNowPage",
    _type: "startNowPage",

    badge: {
      en:   "Free Setup · No Credit Card Required",
      zhTW: "免費設置 · 無需信用卡",
      zhCN: "免费设置 · 无需信用卡",
    },
    headline: {
      en:   "Start attracting better talent",
      zhTW: "立即開始吸引更優秀的人才",
      zhCN: "立即开始吸引更优秀的人才",
    },
    headlineHighlight: {
      en:   "today",
      zhTW: "今天",
      zhCN: "今天",
    },
    sub: {
      en:   "Launch employee benefits in under 60 minutes. No HR team needed. No minimum headcount.",
      zhTW: "在60分鐘內推出員工福利。無需人力資源團隊。無最低人數要求。",
      zhCN: "在60分钟内推出员工福利。无需人力资源团队。无最低人数要求。",
    },

    formTitle: {
      en:   "Create your free account",
      zhTW: "創建您的免費帳戶",
      zhCN: "创建您的免费账户",
    },
    fields: {
      name:    { en: "Your Name",                          zhTW: "您的姓名",           zhCN: "您的姓名" },
      email:   { en: "Work Email",                         zhTW: "工作電郵",           zhCN: "工作邮箱" },
      company: { en: "Company Name",                       zhTW: "公司名稱",           zhCN: "公司名称" },
      submit:  { en: "Start Now — Free →",                 zhTW: "立即開始——免費 →",   zhCN: "立即开始——免费 →" },
      note:    { en: "Free setup · No credit card · Cancel anytime", zhTW: "免費設置 · 無需信用卡 · 隨時取消", zhCN: "免费设置 · 无需信用卡 · 随时取消" },
    },

    success: {
      title: { en: "You're on the list!",  zhTW: "您已加入名單！", zhCN: "您已加入名单！" },
      sub:   {
        en:   "We'll reach out within 1 business day to complete your setup.",
        zhTW: "我們將在1個工作天內聯繫您完成設置。",
        zhCN: "我们将在1个工作天内联系您完成设置。",
      },
    },

    stepsTitle: {
      en:   "From signup to live in 3 simple steps",
      zhTW: "從報名到上線僅需3個簡單步驟",
      zhCN: "从注册到上线仅需3个简单步骤",
    },
    steps: [
      {
        _key: "step-1",
        title: { en: "Add your employees",      zhTW: "添加您的員工",   zhCN: "添加您的员工" },
        desc:  { en: "Import via CSV or add manually. Takes 5 minutes for most teams.", zhTW: "透過CSV匯入或手動添加。大多數團隊只需5分鐘。", zhCN: "通过CSV导入或手动添加。大多数团队只需5分钟。" },
        time:  { en: "Day 1", zhTW: "第1天", zhCN: "第1天" },
      },
      {
        _key: "step-2",
        title: { en: "Set your benefit budget",  zhTW: "設置福利預算",   zhCN: "设置福利预算" },
        desc:  { en: "Choose a plan, set monthly FSA budgets, and pick your wellness categories.", zhTW: "選擇計劃、設置每月FSA預算並選取健康類別。", zhCN: "选择方案、设置每月FSA预算并选取健康类别。" },
        time:  { en: "Day 1", zhTW: "第1天", zhCN: "第1天" },
      },
      {
        _key: "step-3",
        title: { en: "Go live",                  zhTW: "正式上線",       zhCN: "正式上线" },
        desc:  { en: "Employees get an invite link and can start using their benefits immediately.", zhTW: "員工收到邀請連結，即可立即開始使用福利。", zhCN: "员工收到邀请链接，即可立即开始使用福利。" },
        time:  { en: "Day 1", zhTW: "第1天", zhCN: "第1天" },
      },
    ],

    pricingTitle: {
      en:   "Simple, transparent pricing",
      zhTW: "簡單透明的定價",
      zhCN: "简单透明的定价",
    },
    pricingSub: {
      en:   "No setup fees. No hidden costs. Cancel anytime.",
      zhTW: "無設置費。無隱藏費用。隨時取消。",
      zhCN: "无设置费。无隐藏费用。随时取消。",
    },
    plans: [
      {
        _key:    "plan-starter",
        name:    { en: "Starter",   zhTW: "入門",   zhCN: "入门" },
        price:   { en: "HK$180",    zhTW: "HK$180", zhCN: "HK$180" },
        per:     { en: "per employee / month",      zhTW: "每位員工 / 每月",       zhCN: "每位员工 / 每月" },
        desc:    { en: "Perfect for teams of 2–50", zhTW: "適合2–50人團隊",        zhCN: "适合2–50人团队" },
        cta:     { en: "Start Free", zhTW: "免費開始", zhCN: "免费开始" },
        popular: false,
      },
      {
        _key:    "plan-growth",
        name:    { en: "Growth",    zhTW: "成長",   zhCN: "成长" },
        price:   { en: "HK$380",    zhTW: "HK$380", zhCN: "HK$380" },
        per:     { en: "per employee / month",       zhTW: "每位員工 / 每月",        zhCN: "每位员工 / 每月" },
        desc:    { en: "Best for teams of 50–200",   zhTW: "最適合50–200人團隊",     zhCN: "最适合50–200人团队" },
        cta:     { en: "Start Free", zhTW: "免費開始", zhCN: "免费开始" },
        popular: true,
      },
      {
        _key:    "plan-enterprise",
        name:    { en: "Enterprise",  zhTW: "企業",       zhCN: "企业" },
        price:   { en: "Custom",      zhTW: "按需定價",   zhCN: "按需定价" },
        per:     { en: "tailored to your needs",            zhTW: "根據您的需求定制",           zhCN: "根据您的需求定制" },
        desc:    { en: "For 200+ employee organisations",   zhTW: "適合200名員工以上的機構",     zhCN: "适合200名员工以上的机构" },
        cta:     { en: "Get a Demo", zhTW: "預約示範", zhCN: "预约演示" },
        popular: false,
      },
    ],
    popularLabel: {
      en:   "Most Popular",
      zhTW: "最受歡迎",
      zhCN: "最受欢迎",
    },

    testimonialsTitle: {
      en:   "Small businesses love MixCare",
      zhTW: "中小企業喜愛MixCare",
      zhCN: "中小企业喜爱MixCare",
    },
  });
  console.log("✓ startNowPage seeded");

  // ── Partners Page Singleton ────────────────────────────────────────────────
  console.log("Seeding partnersPage...");
  await client.createOrReplace({
    _id: "partnersPage",
    _type: "partnersPage",

    badge: {
      en:   "Partner Programme",
      zhTW: "合作夥伴計劃",
      zhCN: "合作伙伴计划",
    },
    headline: {
      en:   "Grow together with",
      zhTW: "與",
      zhCN: "与",
    },
    headlineHighlight: {
      en:   "MixCare Health",
      zhTW: "MixCare Health共同成長",
      zhCN: "MixCare Health共同成长",
    },
    sub: {
      en:   "Join our broker and provider partner network across Asia-Pacific. Access new revenue streams, new clients, and best-in-class digital health infrastructure.",
      zhTW: "加入我們在亞太區的經紀及供應商合作夥伴網絡。獲取新收入來源、新客戶及一流的數碼健康基礎設施。",
      zhCN: "加入我们在亚太区的经纪及供应商合作伙伴网络。获取新收入来源、新客户及一流的数字健康基础设施。",
    },

    typesTitle: {
      en:   "Two ways to partner with us",
      zhTW: "兩種與我們合作的方式",
      zhCN: "两种与我们合作的方式",
    },
    types: [
      {
        _key: "type-broker",
        label:    { en: "Insurance Broker",           zhTW: "保險經紀",         zhCN: "保险经纪" },
        desc:     {
          en:   "Offer MixCare's flexible benefits and FSA to your corporate clients. Differentiate your product portfolio and improve retention.",
          zhTW: "向您的企業客戶提供MixCare的靈活福利和FSA。差異化您的產品組合並提高留存率。",
          zhCN: "向您的企业客户提供MixCare的灵活福利和FSA。差异化您的产品组合并提高留存率。",
        },
        benefits: {
          en:   ["White-label product under your brand", "Revenue share on benefit premiums", "Dedicated partner manager", "Co-marketing opportunities"],
          zhTW: ["以您品牌推出白標產品", "福利保費收益分成", "專屬合作夥伴經理", "聯合市場推廣機會"],
          zhCN: ["以您品牌推出白标产品", "福利保费收益分成", "专属合作伙伴经理", "联合市场推广机会"],
        },
      },
      {
        _key: "type-provider",
        label:    { en: "Medical & Wellness Provider", zhTW: "醫療/健康服務供應商", zhCN: "医疗 / 健康服务供应商" },
        desc:     {
          en:   "Get listed on the MixCare Wellness Marketplace and connect with thousands of corporate employees and policyholders.",
          zhTW: "在MixCare健康市場上市，與數千名企業員工及保單持有人建立聯繫。",
          zhCN: "在MixCare健康市场上市，与数千名企业员工及保单持有人建立联系。",
        },
        benefits: {
          en:   ["Instant access to 50,000+ employees", "Digital booking and cashless payments", "3-day payment settlement", "Provider analytics dashboard"],
          zhTW: ["即時接觸50,000名以上員工", "數碼預約及免現金付款", "3天付款結算", "供應商分析儀表板"],
          zhCN: ["即时接触50,000名以上员工", "数字预约及免现金付款", "3天付款结算", "供应商分析仪表板"],
        },
      },
    ],

    benefitsTitle: {
      en:   "What you get as a partner",
      zhTW: "成為合作夥伴的好處",
      zhCN: "成为合作伙伴的好处",
    },
    benefits: [
      {
        _key: "benefit-revenue",
        icon:  "TrendingUp",
        title: { en: "Revenue Share",      zhTW: "收益分成",     zhCN: "收益分成" },
        desc:  { en: "Earn competitive commissions on all benefits sold or redeemed through your partnership.", zhTW: "通過您的合作夥伴關係銷售或兌換的所有福利均可獲得具競爭力的佣金。", zhCN: "通过您的合作伙伴关系销售或兑换的所有福利均可获得具竞争力的佣金。" },
      },
      {
        _key: "benefit-regional",
        icon:  "Globe",
        title: { en: "Regional Coverage",  zhTW: "區域覆蓋",     zhCN: "区域覆盖" },
        desc:  { en: "Access MixCare's network across Hong Kong, Macau, and Singapore from day one.", zhTW: "從第一天起即可使用MixCare在香港、澳門及新加坡的網絡。", zhCN: "从第一天起即可使用MixCare在香港、澳门及新加坡的网络。" },
      },
      {
        _key: "benefit-onboarding",
        icon:  "Zap",
        title: { en: "Fast Onboarding",    zhTW: "快速入職",     zhCN: "快速入职" },
        desc:  { en: "Partner portal setup in 48 hours. Your first client or service listing live within a week.", zhTW: "48小時內完成合作夥伴門戶設置。第一個客戶或服務列表在一週內上線。", zhCN: "48小时内完成合作伙伴门户设置。第一个客户或服务列表在一周内上线。" },
      },
      {
        _key: "benefit-support",
        icon:  "CheckCircle2",
        title: { en: "Full Support",       zhTW: "全面支持",     zhCN: "全面支持" },
        desc:  { en: "Dedicated partner manager, co-marketing resources, and technical integration support.", zhTW: "專屬合作夥伴經理、聯合市場推廣資源及技術整合支持。", zhCN: "专属合作伙伴经理、联合市场推广资源及技术整合支持。" },
      },
    ],

    formTitle: {
      en:   "Apply to become a partner",
      zhTW: "申請成為合作夥伴",
      zhCN: "申请成为合作伙伴",
    },
    formSub: {
      en:   "Tell us about yourself and we'll be in touch within 2 business days.",
      zhTW: "告訴我們您的情況，我們將在2個工作天內與您聯繫。",
      zhCN: "告诉我们您的情况，我们将在2个工作天内与您联系。",
    },
    fields: {
      name:               { en: "Full Name",                 zhTW: "全名",             zhCN: "全名" },
      email:              { en: "Work Email",                zhTW: "工作電郵",          zhCN: "工作邮箱" },
      company:            { en: "Company / Practice Name",   zhTW: "公司 / 診所名稱",   zhCN: "公司 / 诊所名称" },
      type:               { en: "Partner Type",              zhTW: "合作夥伴類型",       zhCN: "合作伙伴类型" },
      website:            { en: "Website (optional)",        zhTW: "網站（選填）",       zhCN: "网站（选填）" },
      message:            { en: "Tell us about your business", zhTW: "介紹您的業務",     zhCN: "介绍您的业务" },
      messagePlaceholder: { en: "What services do you offer? How many clients or patients do you serve?", zhTW: "您提供什麼服務？您服務多少客戶或患者？", zhCN: "您提供什么服务？您服务多少客户或患者？" },
      submit:             { en: "Apply to Partner →",        zhTW: "申請合作 →",        zhCN: "申请合作 →" },
      note:               { en: "We review all applications personally. No automated rejections.", zhTW: "我們親自審閱所有申請。不會自動拒絕。", zhCN: "我们亲自审阅所有申请。不会自动拒绝。" },
    },
    typeOptions: {
      en:   ["Insurance Broker", "Medical / Wellness Provider"],
      zhTW: ["保險經紀",          "醫療/健康服務供應商"],
      zhCN: ["保险经纪",          "医疗 / 健康服务供应商"],
    },

    success: {
      title: { en: "Application received!",  zhTW: "申請已收到！",   zhCN: "申请已收到！" },
      sub:   {
        en:   "Our partnerships team will review your application and be in touch within 2 business days.",
        zhTW: "我們的合作夥伴團隊將審閱您的申請，並在2個工作天內與您聯繫。",
        zhCN: "我们的合作伙伴团队将审阅您的申请，并在2个工作天内与您联系。",
      },
    },
  });
  console.log("✓ partnersPage seeded");

  console.log("\n✅ Start Now + Partners seed complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
