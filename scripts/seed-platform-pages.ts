/**
 * Seed script — populates Sanity with 6 multilingual platform pages.
 * Run with: npx tsx scripts/seed-platform-pages.ts
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

// ── Localised content helpers ────────────────────────────────────────────────

function ls(en: string, zhTW: string, zhCN: string) {
  return { en, zhTW, zhCN };
}

// ── Helper: build a localised array of benefit items with _key ────────────────

function lBenefitItems(
  items: Array<{ icon?: string; title: { en: string; zhTW: string; zhCN: string }; desc: { en: string; zhTW: string; zhCN: string } }>
) {
  return items.map((item, i) => ({
    _key: `benefit-${i}`,
    icon: item.icon ?? "",
    title: item.title,
    desc: item.desc,
  }));
}

function lSteps(
  items: Array<{
    step: string;
    title: { en: string; zhTW: string; zhCN: string };
    desc: { en: string; zhTW: string; zhCN: string };
    bullets?: { en: string[]; zhTW: string[]; zhCN: string[] };
  }>
) {
  return items.map((item, i) => ({
    _key: `step-${i}`,
    step: item.step,
    title: item.title,
    desc: item.desc,
    ...(item.bullets ? { bullets: item.bullets } : {}),
  }));
}

function lStats(
  items: Array<{
    value: string;
    label: { en: string; zhTW: string; zhCN: string };
    sub: { en: string; zhTW: string; zhCN: string };
  }>
) {
  return items.map((item, i) => ({
    _key: `stat-${i}`,
    value: item.value,
    label: item.label,
    sub: item.sub,
  }));
}

function lPainPoints(
  items: Array<{
    icon?: string;
    title: { en: string; zhTW: string; zhCN: string };
    desc: { en: string; zhTW: string; zhCN: string };
  }>
) {
  return items.map((item, i) => ({
    _key: `pain-${i}`,
    icon: item.icon ?? "",
    title: item.title,
    desc: item.desc,
  }));
}

// ── Platform Pages ────────────────────────────────────────────────────────────

const platformPages = [
  // ── 1. Self-Funded Outpatient ────────────────────────────────────────────────
  {
    _id: "platform-page-self-funded-outpatient",
    _type: "platformPage",
    pageId: "self-funded-outpatient",
    slug: { _type: "slug", current: "self-funded-outpatient" },
    metaTitle: ls(
      "Self-Funded Outpatient Plan | MixCare Health",
      "自付門診計劃 | MixCare Health",
      "自付门诊计划 | MixCare Health"
    ),
    metaDescription: ls(
      "AI-powered outpatient claims processing with a 2,000+ panel doctor network across Hong Kong, Macau, and Singapore.",
      "AI驅動的門診理賠處理，擁有逾2,000名特約醫生，覆蓋香港、澳門及新加坡。",
      "AI驱动的门诊理赔处理，拥有逾2,000名特约医生，覆盖香港、澳门及新加坡。"
    ),
    hero: {
      badge: ls("Self-Funded Outpatient Plan", "自付門診計劃", "自付门诊计划"),
      headline: ls("Take Control of ", "全面掌控", "全面掌控"),
      headlineHighlight: ls("Outpatient Healthcare Costs", "門診醫療成本", "门诊医疗成本"),
      sub: ls(
        "AI-powered claims processing, cashless panel doctor access, and customisable stop-loss plans — giving you full visibility and control over outpatient spending.",
        "AI驅動的理賠處理、免現金特約醫生服務及可定制止損計劃——讓您全面掌握門診支出。",
        "AI驱动的理赔处理、免现金特约医生服务及可定制止损计划——让您全面掌握门诊支出。"
      ),
      ctaLabel: ls("Get a Demo", "預約示範", "预约演示"),
      iconColor: "#0d9488",
      bgGradient: "linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #f0f9ff 100%)",
    },
    benefits: {
      heading: ls(
        "Six Capabilities. Infinite Configurations.",
        "六大功能，無限配置。",
        "六大功能，无限配置。"
      ),
      sub: ls("", "", ""),
      items: lBenefitItems([
        {
          title: ls("Customisable Benefit Plans", "可定制福利計劃", "可定制福利计划"),
          desc: ls(
            "Help employers control medical outpatient spending with tailored plan configurations. Define coverage limits, co-pay structures, and eligible categories to match your exact needs.",
            "協助僱主實施止損機制，透過量身定制的計劃配置更好地控制醫療支出。自定義保障上限、共同付款結構及合資格類別，完全符合您的需求。",
            "协助雇主实施止损机制，通过量身定制的计划配置更好地控制医疗支出。自定义保障上限、共同付款结构及合资格类别，完全符合您的需求。"
          ),
        },
        {
          title: ls("Panel Doctor Network", "特約醫生網絡", "特约医生网络"),
          desc: ls(
            "2,000+ panel doctors across Hong Kong, Macau, and Singapore offering cashless consultation experiences. Employees simply show their digital card and receive care — no upfront payment, no reimbursement hassle.",
            "逾2,000名特約醫生遍佈香港、澳門及新加坡，提供免現金應診體驗。員工只需出示數碼卡即可接受診治——無需預付費用，無需申請報銷。",
            "逾2,000名特约医生遍布香港、澳门及新加坡，提供免现金就诊体验。员工只需出示数码卡即可接受诊治——无需预付费用，无需申请报销。"
          ),
        },
        {
          title: ls("AI-Powered Claims Processing", "AI驅動理賠處理", "AI驱动理赔处理"),
          desc: ls(
            "Streamline claims with advanced AI — ensuring accurate, speedy payouts while minimising fraud risk. Our engine processes 98% of claims within 24 hours with automated anomaly detection.",
            "利用先進AI簡化理賠流程——確保準確、迅速的賠付，同時降低欺詐風險。我們的系統在24小時內處理98%的理賠，並配備自動異常偵測。",
            "利用先进AI简化理赔流程——确保准确、迅速的赔付，同时降低欺诈风险。我们的系统在24小时内处理98%的理赔，并配备自动异常检测。"
          ),
        },
        {
          title: ls("International Reimbursement Payout", "國際報銷付款", "国际报销付款"),
          desc: ls(
            "Settle cross-border reimbursements in real time. Powered by Airwallex, MixCare enables multi-currency payouts to employees and providers across Hong Kong, Macau, Singapore, and beyond",
            "即時完成跨境報銷結算。透過Airwallex強大的技術支援，MixCare可向香港、澳門、新加坡及其他地區的員工和醫療服務供應商進行多幣種即時付款，徹底取代人工銀行轉帳，將處理時間從數天縮短至數分鐘。",
            "实时完成跨境报销结算。借助Airwallex强大的技术支持，MixCare可向香港、澳门、新加坡及其他地区的员工和医疗服务提供方进行多币种实时付款，彻底取代人工银行转账，将处理时间从数天缩短至数分钟。"
          ),
        },
        {
          title: ls("Real-Time Usage Dashboard", "即時使用情況儀表板", "实时使用情况仪表板"),
          desc: ls(
            "Gain instant visibility into outpatient spending, claims trends, and panel utilisation through a live dashboard — no waiting for month-end reports. Drill down by department, employee tier, or doctor to spot cost drivers and anomalies in seconds.",
            "透過即時儀表板全面掌握門診支出、理賠趨勢及特約醫生使用情況——無需等待月末報告。按部門、員工級別或醫生進行深入分析，數秒內識別成本驅動因素及異常情況。",
            "通过实时仪表板全面掌握门诊支出、理赔趋势及特约医生使用情况——无需等待月末报告。按部门、员工级别或医生进行深入分析，数秒内识别成本驱动因素及异常情况。"
          ),
        },
        {
          title: ls("AI Wellness Trend & Recommendation", "AI健康趨勢與建議", "AI健康趋势与建议"),
          desc: ls(
            "MixCare's AI continuously analyses claims and usage patterns to surface population health trends and personalised wellness recommendations — helping employers proactively improve workforce health and reduce long-term medical costs.",
            "MixCare的AI持續分析理賠及使用模式，呈現群體健康趨勢及個性化健康建議——協助僱主主動改善員工健康狀況，降低長期醫療成本。",
            "MixCare的AI持续分析理赔及使用模式，呈现群体健康趋势及个性化健康建议——帮助雇主主动改善员工健康状况，降低长期医疗成本。"
          ),
        },
      ]),
    },
    howItWorks: {
      heading: ls("How the platform works", "平台運作方式", "平台运作方式"),
      sub: ls(
        "From plan configuration to real-time analytics — MixCare handles the full outpatient benefits lifecycle.",
        "從計劃配置到實時分析——MixCare全面管理門診福利生命週期。",
        "从计划配置到实时分析——MixCare全面管理门诊福利生命周期。"
      ),
      steps: lSteps([
        {
          step: "01",
          title: ls("Budget Configuration", "止損配置", "止损配置"),
          desc: ls(
            "Once a limit is reached, claims automatically route to your reinsurer or insurer layer — giving you predictable cost control.",
            "設定個人及總體止損閾值。一旦達到上限，理賠自動轉至您的再保險公司或保險層——實現可預測的成本控制。",
            "设定个人及总体止损阈值。一旦达到上限，理赔自动转至您的再保险公司或保险层——实现可预测的成本控制。"
          ),
        },
        {
          step: "02",
          title: ls("Cashless Doctor Experience", "免現金就診體驗", "免现金就诊体验"),
          desc: ls(
            "Employees locate and book panel doctors via the MixCare app. Consultations are cashless — the doctor submits directly to our system, eliminating manual reimbursement entirely.",
            "員工透過MixCare應用程式查找及預約特約醫生。就診免現金——醫生直接向我們的系統提交，完全取消人工報銷流程。",
            "员工通过MixCare应用程序查找及预约特约医生。就诊免现金——医生直接向我们的系统提交，完全取消人工报销流程。"
          ),
        },
        {
          step: "03",
          title: ls("AI Fraud Detection", "AI詐騙偵測", "AI欺诈检测"),
          desc: ls(
            "Our AI model analyses every claim against a library of fraud patterns, duplicate indicators, and anomalous billing codes. Suspicious claims are flagged for review before payout.",
            "我們的AI模型對每項理賠進行詐騙模式、重複指標及異常帳單代碼分析。可疑理賠在賠付前標記審核。",
            "我们的AI模型对每项理赔进行欺诈模式、重复指标及异常账单代码分析。可疑理赔在赔付前标记审核。"
          ),
        },
        {
          step: "04",
          title: ls("Real-Time Claims Dashboard", "實時理賠儀表板", "实时理赔仪表板"),
          desc: ls(
            "Track all claims in real time — approvals, pending reviews, rejections, and trends. Export reports for finance, HR, or your insurer with one click.",
            "實時追蹤所有理賠——批准、待審、拒絕及趨勢。一鍵匯出財務、人力資源或保險公司報告。",
            "实时追踪所有理赔——批准、待审、拒绝及趋势。一键导出财务、人力资源或保险公司报告。"
          ),
        },
      ]),
    },
    stats: lStats([
      {
        value: "40%+",
        label: ls("HR Admin Time Saved", "行政時間節省", "行政时间节省"),
        sub: ls("", "", ""),
      },
      {
        value: "30%",
        label: ls("Average cost reduction", "平均節省醫療成本", "平均节省医疗成本"),
        sub: ls("", "", ""),
      },
      {
        value: "93%+",
        label: ls("Employee satisfaction rate", "員工滿意度", "员工满意度"),
        sub: ls("", "", ""),
      },
    ]),
    testimonial: {
      quote: ls(
        "MixCare's AI claims engine transformed our outpatient scheme. Fraud incidents dropped by 60% and our average resolution time went from 5 days to less than 18 hours.",
        "MixCare的AI理賠引擎徹底改變了我們的門診計劃。欺詐事件減少了60%，平均處理時間從5天縮短至不足18小時。",
        "MixCare的AI理赔引擎彻底改变了我们的门诊计划。欺诈事件减少了60%，平均处理时间从5天缩短至不足18小时。"
      ),
      name: "Jennifer Wong",
      title: "VP, Group Benefits",
      company: "AXA Hong Kong",
    },
    cta: {
      heading: ls(
        "See it in action — Get a Demo",
        "親眼見證——預約示範",
        "亲眼见证——预约演示"
      ),
      sub: ls(
        "Discover how MixCare's self-funded outpatient platform can reduce your medical costs and delight your employees.",
        "了解MixCare自付門診平台如何降低您的醫療成本並令員工滿意。",
        "了解MixCare自付门诊平台如何降低您的医疗成本并令员工满意。"
      ),
      ctaLabel: ls("Get a Demo", "預約示範", "预约演示"),
      secondaryLabel: ls("", "", ""),
    },
    painPoints: lPainPoints([
      {
        title: ls(
          "High Medical Cost Inflation Over 10% Per Year",
          "醫療費用通脹每年超過10%",
          "医疗费用通胀每年超过10%"
        ),
        desc: ls(
          "Healthcare costs are rising faster than most benefit budgets can absorb. Employers face uncapped cost escalation risks, making outpatient schemes increasingly unsustainable year on year.",
          "醫療費用持續上漲，速度遠超大多數福利預算的承受能力。僱主面臨無上限的成本上升風險，令門診計劃逐年變得難以為繼。",
          "医疗费用持续上涨，速度远超大多数福利预算的承受能力。雇主面临无上限的成本上升风险，令门诊计划逐年变得难以为继。"
        ),
      },
      {
        title: ls(
          "Lack of Flexibility in Benefit Policy Customisation",
          "保單定制靈活性不足",
          "保单定制灵活性不足"
        ),
        desc: ls(
          "Traditional outpatient plans are rigid — fixed panel lists, reimbursement rules, and one-size-fits-all coverage that fails diverse workforces. Employers can't tailor benefits by employee tier, geography, or lifestyle need, making it difficult to improve employee satisfaction with their benefits.",
          "傳統門診計劃僵化固定——固定診所名單、報銷規則，以及無法滿足多元員工需求的。僱主無法按員工級別、地區或生活方式訂製福利，導致員工對福利的滿意度難以提升。",
          "传统门诊计划僵化固定——固定诊所名单、报销规则，以及无法满足多元员工需求的统一保障。雇主无法按员工级别、地区或生活方式定制福利，导致员工对福利的满意度难以提升。"
        ),
      },
      {
        title: ls(
          "Lack of Real-Time Data Usage and Insight",
          "缺乏實時數據使用與洞察",
          "缺乏实时数据使用与洞察"
        ),
        desc: ls(
          "Most traditional outpatient plans require reports to be requested from providers, which can take weeks or even months to generate. By the time cost anomalies or fraud patterns are visible, the damage is already done.",
          "大多數傳統門診計劃的報告都需向供應商申請，需要數週甚至數月後才能生成。當成本異常或欺詐模式顯現時，損失已無法挽回。",
          "大多数传统门诊计划的报告都需向供应商申请，需要数周甚至数月后才能生成。当成本异常或欺诈模式显现时，损失已无法挽回。"
        ),
      },
      {
        title: ls(
          "Cross-Border Workforce Healthcare Challenges",
          "跨境員工醫療保障挑戰",
          "跨境员工医疗保障挑战"
        ),
        desc: ls(
          "Organisations operating internationally must navigate different healthcare systems, regulatory frameworks, and service providers — maintaining multiple separate schemes that create high administrative complexity and no consolidated view of total benefit spend.",
          "在國際跨境營運的企業，需應對不同的醫療體系、監管框架及服務提供商，須維護多個獨立計劃，導致行政複雜性高且無法統一查看整體福利支出。",
          "在国际跨境运营的企业，需应对不同的医疗体系、监管框架及服务提供商，须维护多个独立计划，导致行政复杂性高且无法统一查看整体福利支出。"
        ),
      },
    ]),
  },

  // ── 2. Flexible Spending Account ─────────────────────────────────────────────
  {
    _id: "platform-page-flexible-spending-account",
    _type: "platformPage",
    pageId: "flexible-spending-account",
    slug: { _type: "slug", current: "flexible-spending-account" },
    metaTitle: ls(
      "Flexible Spending Account (FSA) | MixCare Health",
      "靈活消費帳戶（FSA）| MixCare Health",
      "灵活消费账户（FSA）| MixCare Health"
    ),
    metaDescription: ls(
      "Create and manage FSA wallets for healthcare, wellness, and lifestyle expenses. Fully customisable for any company size.",
      "為醫療、健康及生活費用創建和管理FSA錢包。完全可定制，適合任何規模的公司。",
      "为医疗、健康及生活费用创建和管理FSA钱包。完全可定制，适合任何规模的公司。"
    ),
    hero: {
      badge: ls("Flexible Spending Account", "靈活彈性", "灵活消费账户"),
      headline: ls("Next-Generation", "新一代", "新一代"),
      headlineHighlight: ls("Flexible Spending Accounts", "彈性支出帳戶", "灵活消费账户"),
      sub: ls(
        "Create FSA wallets for healthcare, wellness, and lifestyle expenses. Fully configurable for any company size, any industry, any benefit philosophy.",
        "為醫療、健康及生活費用創建FSA錢包。適合任何規模、任何行業、任何福利理念的公司。",
        "为医疗、健康及生活费用创建FSA钱包。适合任何规模、任何行业、任何福利理念的公司。"
      ),
      ctaLabel: ls("Get a Demo", "預約示範", "预约演示"),
      iconColor: "#0d9488",
      bgGradient: "linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #fff7ed 100%)",
    },
    benefits: {
      heading: ls(
        "Everything you need in an FSA platform",
        "FSA平台所需的一切",
        "FSA平台所需的一切"
      ),
      sub: ls("", "", ""),
      items: lBenefitItems([
        {
          title: ls("FSA Wallet Creation", "FSA錢包創建", "FSA钱包创建"),
          desc: ls(
            "Create and manage wallets for healthcare, wellness, or lifestyle expenses for employees or policyholders. Multiple wallet types, multiple funding rules — all in one admin portal.",
            "為員工或保單持有人創建和管理醫療、健康或生活費用錢包。多種錢包類型、多種資助規則——盡在一個管理入口。",
            "为员工或保单持有人创建和管理医疗、健康或生活费用钱包。多种钱包类型、多种资助规则——尽在一个管理入口。"
          ),
        },
        {
          title: ls("Diverse Spending Categories", "多元消費類別", "多元消费类别"),
          desc: ls(
            "Support mental health, fitness programs, medical checkups, nutrition, dental, vision, and more. 30+ categories that cover everything employees actually care about.",
            "支持心理健康、健身計劃、體檢、營養、牙科、視力等。30多個類別，涵蓋員工真正關心的一切。",
            "支持心理健康、健身计划、体检、营养、牙科、视力等。30多个类别，涵盖员工真正关心的一切。"
          ),
        },
        {
          title: ls("Customizable Configurations", "可定制配置", "可定制配置"),
          desc: ls(
            "Align with any employer requirement, suiting companies of all sizes from SMB to enterprise. Set rollover rules, contribution limits, eligible categories, and approval workflows.",
            "符合任何僱主要求，適合從中小企到大型企業的各種規模。設定滾存規則、預算上限、合資格類別及審批流程。",
            "符合任何雇主要求，适合从中小企到大型企业的各种规模。设定滚存规则、供款上限、合资格类别及审批流程。"
          ),
        },
      ]),
    },
    howItWorks: {
      heading: ls("Live in under 5 days", "5天內上線", "5天内上线"),
      sub: ls(
        "Add FSA to your existing benefit plan with zero disruption. No legacy system replacement required.",
        "將FSA添加到現有福利計劃——零停機，無需更換舊系統。",
        "将FSA添加到现有福利计划——零停机，无需更换旧系统。"
      ),
      steps: lSteps([
        {
          step: "01",
          title: ls("Configure Your FSA Structure", "配置您的FSA架構", "配置您的FSA架构"),
          desc: ls(
            "Define wallet types, funding amounts, eligible spending categories, rollover rules, and approval workflows with your MixCare onboarding manager.",
            "與MixCare入職經理一起定義錢包類型、資助金額、合資格消費類別、滾存規則及審批流程。",
            "与MixCare入职经理一起定义钱包类型、资助金额、合资格消费类别、滚存规则及审批流程。"
          ),
        },
        {
          step: "02",
          title: ls("Import Your Employees", "匯入員工名單", "导入员工名单"),
          desc: ls(
            "Bulk upload via CSV or connect your existing HRIS. Every employee gets instant access to their digital benefit wallet.",
            "透過CSV批量上傳或連接現有HRIS。每位員工即可獲得數位福利錢包。",
            "通过CSV批量上传或连接现有HRIS。每位员工即可获得数字福利钱包。"
          ),
        },
        {
          step: "03",
          title: ls("Fund the Wallets", "為錢包注資", "为钱包注资"),
          desc: ls(
            "Allocate budgets by department, employee grade, or individually. One-time or recurring funding with full finance reconciliation built in.",
            "按部門、職級或個人分配預算。支持一次性或定期注資，並內置財務對帳功能。",
            "按部门、职级或个人分配预算。支持一次性或定期注资，并内置财务对账功能。"
          ),
        },
        {
          step: "04",
          title: ls("Go Live & Track", "上線及追蹤", "上线及追踪"),
          desc: ls(
            "Employees start spending immediately. Monitor utilisation in real time from your admin dashboard — no waiting for end-of-month reports.",
            "員工即可開始消費。從管理員儀表板實時監察使用率——無需等待月末報告。",
            "员工即可开始消费。从管理员仪表板实时监察使用率——无需等待月末报告。"
          ),
        },
      ]),
    },
    stats: lStats([
      {
        value: "91%",
        label: ls("Employee utilisation rate", "員工使用率", "员工使用率"),
        sub: ls("vs. industry average of 45%", "行業平均只有45%", "行业平均只有45%"),
      },
      {
        value: "30%+",
        label: ls("Cost reduction", "成本節省", "成本节省"),
        sub: ls("vs. traditional group insurance premiums", "相比傳統團體保險保費", "相比传统团体保险保费"),
      },
      {
        value: "50+",
        label: ls("Spending categories", "消費類別", "消费类别"),
        sub: ls("from medical to lifestyle & wellness", "從醫療到生活方式及健康", "从医疗到生活方式及健康"),
      },
      {
        value: "<2 min",
        label: ls("Claim submission", "申請提交時間", "申请提交时间"),
        sub: ls("via mobile app with photo receipts", "透過手機應用上傳照片收據", "通过手机应用上传照片收据"),
      },
    ]),
    testimonial: {
      quote: ls(
        "The FSA platform is exactly what we needed — flexible enough for our complex benefit structure but simple enough that employees actually use it. Utilisation jumped from 45% to 91%.",
        "FSA平台正是我們所需的——足夠靈活應對我們複雜的福利架構，又足夠簡單讓員工真正使用。使用率從45%躍升至91%。",
        "FSA平台正是我们所需的——足够灵活应对我们复杂的福利架构，又足够简单让员工真正使用。使用率从45%跃升至91%。"
      ),
      name: "Marcus Chen",
      title: "Head of HR",
      company: "Jardine Matheson",
    },
    cta: {
      heading: ls(
        "Ready to launch your FSA program?",
        "準備好啟動您的FSA計劃了嗎？",
        "准备好启动您的FSA计划了吗？"
      ),
      sub: ls(
        "Talk to our team about configuring the right FSA structure for your organisation — from a simple wellness wallet to a full multi-tier benefit program.",
        "與我們的團隊討論為您的機構配置合適的FSA架構——從簡單的健康錢包到完整的多層福利計劃。",
        "与我们的团队讨论为您的机构配置合适的FSA架构——从简单的健康钱包到完整的多层福利计划。"
      ),
      ctaLabel: ls("Get a Demo", "預約示範", "预约演示"),
      secondaryLabel: ls("Start Now — Free Setup", "立即開始——免費設置", "立即开始——免费设置"),
    },
    painPoints: [],
  },

  // ── 3. Wellness Marketplace ──────────────────────────────────────────────────
  {
    _id: "platform-page-wellness-marketplace",
    _type: "platformPage",
    pageId: "wellness-marketplace",
    slug: { _type: "slug", current: "wellness-marketplace" },
    metaTitle: ls(
      "Wellness Marketplace | MixCare Health",
      "Wellness Marketplace | MixCare Health",
      "Wellness Marketplace | MixCare Health"
    ),
    metaDescription: ls(
      "A curated marketplace for employee wellness — 3,000+ services redeemable with FSA wallets. White-label options for insurers, brokers, and enterprises.",
      "精選員工Wellness Marketplace——3,000多項服務可使用FSA錢包兌換。提供保險公司、經紀及企業白標方案。",
      "精选员工Wellness Marketplace——3,000多项服务可使用FSA钱包兑换。提供保险公司、经纪及企业白标方案。"
    ),
    hero: {
      badge: ls("Wellness Marketplace", "Wellness Marketplace", "Wellness Marketplace"),
      headline: ls("A Curated Marketplace for", "精選員工", "精选员工"),
      headlineHighlight: ls("Employee Wellness", "Wellness Marketplace", "Wellness Marketplace"),
      sub: ls(
        "3,000+ wellness services, seamlessly redeemable with FSA wallets or pre-funded accounts. White-label options available for insurers, brokers, and enterprises.",
        "3,000多項健康服務，可無縫使用FSA錢包或預付帳戶兌換。提供保險公司、經紀及企業白標方案。",
        "3,000多项健康服务，可无缝使用FSA钱包或预付账户兑换。提供保险公司、经纪及企业白标方案。"
      ),
      ctaLabel: ls("Get a Demo", "預約示範", "预约演示"),
      iconColor: "#0d9488",
      bgGradient: "linear-gradient(135deg, #f0fdfa 0%, #f5f3ff 50%, #fff7ed 100%)",
    },
    benefits: {
      heading: ls(
        "Why the MixCare Marketplace is different",
        "與眾不同之處",
        "与众不同之处"
      ),
      sub: ls("", "", ""),
      items: lBenefitItems([
        {
          title: ls("Instant Service Redemption", "即時服務兌換", "即时服务兑换"),
          desc: ls(
            "Employees redeem 3,000+ wellness services with FSA wallets or pre-funded accounts — no receipts, no reimbursements, no waiting. One tap, instant access.",
            "員工可使用FSA錢包或預付帳戶兌換3,000多項健康服務——無需收據、無需報銷、無需等待。一鍵即時享用。",
            "员工可使用FSA钱包或预付账户兑换3,000多项健康服务——无需收据、无需报销、无需等待。一键即时享用。"
          ),
        },
        {
          title: ls("3,000+ Verified Services", "3,000多項認證服務", "3,000多项认证服务"),
          desc: ls(
            "Yoga classes, nutrition counselling, gym memberships, wellness retreats, mental health support, and beyond. 3,000+ services from verified providers across Asia-Pacific.",
            "瑜伽課程、營養諮詢、健身會籍、健康度假、心理健康支援等。亞太區3,000多項來自認證供應商的服務。",
            "瑜伽课程、营养咨询、健身会籍、健康度假、心理健康支援等。亚太区3,000多项来自认证供应商的服务。"
          ),
        },
        {
          title: ls("Custom-Branded Marketplace", "定制品牌市集", "定制品牌市集"),
          desc: ls(
            "Deliver a white-label marketplace aligned with your insurer, broker, or enterprise branding. Your logo, your colours, your domain — powered by MixCare.",
            "提供符合您的保險公司、經紀或企業品牌及目標的白標市集。您的標誌、您的顏色、您的域名——由MixCare驅動。",
            "提供符合您的保险公司、经纪或企业品牌及目标的白标市集。您的标志、您的颜色、您的域名——由MixCare驱动。"
          ),
        },
        {
          title: ls("Exclusive Corporate Pricing", "專屬企業優惠價格", "专属企业优惠价格"),
          desc: ls(
            "Employees unlock corporate-negotiated rates unavailable to the general public — delivering real savings on every wellness purchase, not just access.",
            "員工享有一般公眾無法獲得的企業協議優惠價格——每次健康消費都能真正節省開支，而不只是提供存取權限。",
            "员工享有一般公众无法获得的企业协议优惠价格——每次健康消费都能真正节省开支，而不只是提供存取权限。"
          ),
        },
        {
          title: ls("Fully Customisable Categories", "完全可定制的類別", "完全可定制的类别"),
          desc: ls(
            "Tailor the service catalogue to match your company's benefit philosophy. Enable or restrict categories by employee tier, department, or geography — total flexibility.",
            "靈活調整服務目錄以配合企業福利理念。按員工層級、部門或地區啟用或限制類別——完全靈活。",
            "灵活调整服务目录以配合企业福利理念。按员工层级、部门或地区启用或限制类别——完全灵活。"
          ),
        },
        {
          title: ls("Real-Time Analytics & Insights", "實時分析及洞察", "实时分析及洞察"),
          desc: ls(
            "Track service redemption trends, category popularity, and utilisation rates across your workforce. Optimise your wellness programme with live data, not month-end spreadsheets.",
            "追蹤服務兌換趨勢、類別熱門程度及員工使用率。以實時數據優化健康計劃，無需等待月末報告。",
            "追踪服务兑换趋势、类别热门程度及员工使用率。以实时数据优化健康计划，无需等待月末报告。"
          ),
        },
      ]),
    },
    howItWorks: {
      heading: ls("", "", ""),
      sub: ls("", "", ""),
      steps: [],
    },
    stats: [],
    testimonial: {
      quote: ls("", "", ""),
      name: "",
      title: "",
      company: "",
    },
    cta: {
      heading: ls(
        "Build your wellness marketplace today",
        "立即建立您的Wellness Marketplace",
        "立即建立您的Wellness Marketplace"
      ),
      sub: ls(
        "Talk to our team about deploying a white-label or standard wellness marketplace for your organisation or clients.",
        "與我們的團隊討論為您的機構或客戶部署白標或標準Wellness Marketplace。",
        "与我们的团队讨论为您的机构或客户部署白标或标准Wellness Marketplace。"
      ),
      ctaLabel: ls("Get a Demo", "預約示範", "预约演示"),
      secondaryLabel: ls("Become a Provider", "成為供應商", "成为供应商"),
    },
    painPoints: [],
  },

  // ── 4. Wellness Events ───────────────────────────────────────────────────────
  {
    _id: "platform-page-wellness-event",
    _type: "platformPage",
    pageId: "wellness-event",
    slug: { _type: "slug", current: "wellness-event" },
    metaTitle: ls(
      "Wellness Events | MixCare Health",
      "健康活動 | MixCare Health",
      "健康活动 | MixCare Health"
    ),
    metaDescription: ls(
      "Book curated corporate wellness events — yoga, mindfulness, health talks, and more — all managed through MixCare.",
      "預訂精選企業健康活動——瑜伽、正念、健康講座等——全部通過MixCare管理。",
      "预订精选企业健康活动——瑜伽、正念、健康讲座等——全部通过MixCare管理。"
    ),
    hero: {
      badge: ls("Wellness Events", "健康活動", "健康活动"),
      headline: ls("Engage Your Team with", "精選健康活動", "精选健康活动"),
      headlineHighlight: ls("Curated Wellness Events", "提升團隊參與度", "提升团队参与度"),
      sub: ls(
        "Book corporate wellness workshops, health talks, and team activities — all managed through MixCare's event platform. Drive engagement and build a healthier workplace culture.",
        "透過MixCare安排企業健康工作坊、健康講座及團隊活動。提高員工參與度，建立更健康的職場文化",
        "通过MixCare的活动平台，预订企业健康工作坊、健康讲座及团队活动。提高员工参与度，建立更健康的职场文化。"
      ),
      ctaLabel: ls("Get a Quote", "索取報價", "索取报价"),
      iconColor: "#f97316",
      bgGradient: "linear-gradient(135deg, #fff7ed 0%, #fef2f2 50%, #fff1f2 100%)",
    },
    benefits: {
      heading: ls(
        "Four Capabilities. Healthier Teams.",
        "四大功能，打造更健康的團隊。",
        "四大功能，打造更健康的团队。"
      ),
      sub: ls("", "", ""),
      items: lBenefitItems([
        {
          title: ls("50+ Curated Event Types", "50多種精選活動類型", "50多种精选活动类型"),
          desc: ls(
            "Access a catalogue of vetted wellness events — yoga, mindfulness, nutrition workshops, mental health seminars, first aid, and more. New events added monthly to keep content fresh.",
            "訪問種類繁多的精選健康活動——瑜伽、正念、營養工作坊、心理健康研討會、急救等。每月新增活動，持續更新內容。",
            "访问种类繁多的精选健康活动——瑜伽、正念、营养工作坊、心理健康研讨会、急救等。每月新增活动，持续更新内容。"
          ),
        },
        {
          title: ls("Seamless Booking", "無縫預訂體驗", "无缝预订体验"),
          desc: ls(
            "HR teams browse, book, and manage events in a few clicks. Automated invitations, RSVPs, and reminders keep employees engaged without manual follow-up.",
            "人力資源團隊只需數次點擊即可瀏覽、預訂和管理活動。自動化邀請函、報名確認及提醒，讓員工保持參與，無需手動跟進。",
            "人力资源团队只需数次点击即可浏览、预订和管理活动。自动化邀请函、报名确认及提醒，让员工保持参与，无需手动跟进。"
          ),
        },
        {
          title: ls("Live & Virtual Options", "線下及線上選項", "线下及线上选项"),
          desc: ls(
            "On-site events at your office or virtual sessions for remote and hybrid teams. Every employee can participate regardless of location.",
            "在辦公室舉辦現場活動，或為遠程及混合辦公團隊提供虛擬課程。無論身處何地，每位員工均可參與。",
            "在办公室举办现场活动，或为远程及混合办公团队提供虚拟课程。无论身处何地，每位员工均可参与。"
          ),
        },
        {
          title: ls("Attendance & Impact Reporting", "出席率及效果報告", "出席率及效果报告"),
          desc: ls(
            "Track participation rates, employee satisfaction scores, and wellness ROI with post-event reports automatically generated after every event.",
            "追蹤出席率、員工滿意度評分及健康投資回報，每次活動後自動生成報告。",
            "追踪出席率、员工满意度评分及健康投资回报，每次活动后自动生成报告。"
          ),
        },
      ]),
    },
    howItWorks: {
      heading: ls("How We Solve It", "我們如何解決？", "我们如何解决？"),
      sub: ls(
        "MixCare handles the complexity so your HR team can focus on people, not logistics.",
        "MixCare處理所有複雜事務，讓您的人力資源團隊專注於員工，而非繁瑣行政。",
        "MixCare处理所有复杂事务，让您的人力资源团队专注于员工，而非繁琐行政。"
      ),
      steps: lSteps([
        {
          step: "01",
          title: ls("Curated Event Catalogue", "精選活動目錄", "精选活动目录"),
          desc: ls(
            "Access 50+ vetted wellness events across fitness, mental health, nutrition, and preventive care — updated monthly. No sourcing, no vetting — just pick what fits your team.",
            "訪問涵蓋健身、心理健康、營養及預防護理的50多種精選健康活動，每月更新。無需採購或評審——直接選擇最適合您團隊的活動。",
            "访问涵盖健身、心理健康、营养及预防护理的50多种精选健康活动，每月更新。无需采购或评审——直接选择最适合您团队的活动。"
          ),
        },
        {
          step: "02",
          title: ls("End-to-End Event Management", "全程活動管理", "全程活动管理"),
          desc: ls(
            "MixCare coordinates vendors, schedules, invitations, RSVPs, and post-event reporting on your behalf. HR teams spend minutes, not days, organising a wellness event.",
            "MixCare代您協調供應商、時間表、邀請函、報名確認及活動後報告。人力資源團隊只需數分鐘，無需花費數天籌辦健康活動。",
            "MixCare代您协调供应商、时间表、邀请函、报名确认及活动后报告。人力资源团队只需数分钟，无需花费数天筹办健康活动。"
          ),
        },
        {
          step: "03",
          title: ls("Data-Driven Impact Reports", "數據驅動成效報告", "数据驱动成效报告"),
          desc: ls(
            "Every event generates an automated report with attendance rates, satisfaction scores, and wellness ROI — giving you the data to justify spend and continuously improve.",
            "每場活動結束後自動生成報告，涵蓋出席率、滿意度評分及健康投資回報——為您提供數據支持，以合理化開支並持續改善。",
            "每场活动结束后自动生成报告，涵盖出席率、满意度评分及健康投资回报——为您提供数据支持，以合理化开支并持续改善。"
          ),
        },
      ]),
    },
    stats: [],
    testimonial: {
      quote: ls("", "", ""),
      name: "",
      title: "",
      company: "",
    },
    cta: {
      heading: ls(
        "Ready to Elevate Employee Wellness?",
        "準備好提升員工健康水平了嗎？",
        "准备好提升员工健康水平了吗？"
      ),
      sub: ls(
        "Get a quote to see how MixCare Wellness Events drives engagement and measurable health outcomes.",
        "索取報價，了解MixCare健康活動如何提高參與度並實現可衡量的健康成效。",
        "索取报价，了解MixCare健康活动如何提高参与度并实现可衡量的健康成效。"
      ),
      ctaLabel: ls("Get a Quote", "索取報價", "索取报价"),
      secondaryLabel: ls("", "", ""),
    },
    painPoints: lPainPoints([
      {
        title: ls("HR Logistics Overload", "人力資源部門行政負擔過重", "人力资源部门行政负担过重"),
        desc: ls(
          "Coordinating vendors, schedules, RSVPs, and venues drains HR bandwidth — leaving less time for strategic people initiatives.",
          "協調供應商、時間表、報名及場地讓人力資源部門疲於奔命，難以專注於更具戰略性的人才計劃。",
          "协调供应商、时间表、报名及场地让人力资源部门疲于奔命，难以专注于更具战略性的人才计划。"
        ),
      },
      {
        title: ls("One-Size-Fits-All Offerings", "活動選擇千篇一律", "活动选择千篇一律"),
        desc: ls(
          "A single yoga class doesn't serve everyone. Teams need diverse options across fitness, mental health, nutrition, and preventive care.",
          "單一瑜伽課程無法滿足所有人的需求。團隊需要涵蓋健身、心理健康、營養及預防護理的多元選擇。",
          "单一瑜伽课程无法满足所有人的需求。团队需要涵盖健身、心理健康、营养及预防护理的多元选择。"
        ),
      },
      {
        title: ls("No Measurable Impact", "缺乏可衡量的成效", "缺乏可衡量的成效"),
        desc: ls(
          "Without data, it's impossible to justify wellness event spending or improve programme quality over time.",
          "沒有數據支持，就無法證明健康活動支出的價值，也無法持續改善計劃質量。",
          "没有数据支持，就无法证明健康活动支出的价值，也无法持续改善计划质量。"
        ),
      },
    ]),
  },

  // ── 5. Flexible Benefits ─────────────────────────────────────────────────────
  {
    _id: "platform-page-flexible-benefits",
    _type: "platformPage",
    pageId: "flexible-benefits",
    slug: { _type: "slug", current: "flexible-benefits" },
    metaTitle: ls(
      "Flexible Benefits Solution | MixCare Health",
      "彈性福利方案 | MixCare Health",
      "弹性福利方案 | MixCare Health"
    ),
    metaDescription: ls(
      "Personalised benefit packages that adapt to every individual. Scalable top-up and top-down structures for SMBs and enterprises.",
      "適應每個人的個性化福利套餐。適合中小企及企業的可擴展增額及減額結構。",
      "适应每个人的个性化福利套餐。适合中小企及企业的可扩展增额及减额结构。"
    ),
    hero: {
      badge: ls("Flexible Benefits Solution", "彈性福利方案", "弹性福利方案"),
      headline: ls("Benefits That Adapt to", "適應", "适应"),
      headlineHighlight: ls("Every Individual", "每個人的福利", "每个人的福利"),
      sub: ls(
        "Personalised benefit packages based on health, wellness, and financial priorities. One platform for startups and Fortune 500s alike.",
        "基於健康、健康及財務優先事項的個性化福利套餐。一個平台，適合初創企業及財富500強。",
        "基于健康、健康及财务优先事项的个性化福利套餐。一个平台，适合初创企业及财富500强。"
      ),
      ctaLabel: ls("Get a Demo", "預約示範", "预约演示"),
      iconColor: "#7c3aed",
      bgGradient: "linear-gradient(135deg, #faf5ff 0%, #eff6ff 50%, #f0fdfa 100%)",
    },
    benefits: {
      heading: ls(
        "The future of employee benefits",
        "員工福利的未來",
        "员工福利的未来"
      ),
      sub: ls("", "", ""),
      items: lBenefitItems([
        {
          title: ls("Personalised Packages", "個性化套餐", "个性化套餐"),
          desc: ls(
            "Employees or members select benefit packages based on their individual health, wellness, and financial priorities. No one-size-fits-all — every person builds their own ideal benefit set.",
            "員工或會員根據個人健康、健康及財務優先事項選擇福利套餐。非一刀切——每個人都建立自己理想的福利組合。",
            "员工或会员根据个人健康、健康及财务优先事项选择福利套餐。非一刀切——每个人都建立自己理想的福利组合。"
          ),
        },
        {
          title: ls("Scalable Structures", "可擴展結構", "可扩展结构"),
          desc: ls(
            "Top-up or top-down benefit structures deliver scalable options for small businesses through to large enterprises. Start simple, grow complex — the platform adapts as you do.",
            "增額或減額福利結構為從小型企業到大型企業提供可擴展選項。從簡單開始，隨需增長——平台隨您調整。",
            "增额或减额福利结构为从小型企业到大型企业提供可扩展选项。从简单开始，随需增长——平台随您调整。"
          ),
        },
        {
          title: ls("Data-Driven Administration", "數據驅動管理", "数据驱动管理"),
          desc: ls(
            "Simplify benefit management with analytics-driven platforms designed for flexibility and easy administrative oversight. Make informed decisions with real-time utilisation data.",
            "以分析驅動平台簡化福利管理，專為靈活性及易於行政監管而設計。透過實時使用數據做出明智決策。",
            "以分析驱动平台简化福利管理，专为灵活性及易于行政监管而设计。透过实时使用数据做出明智决策。"
          ),
        },
      ]),
    },
    howItWorks: {
      heading: ls("How configuration works", "配置如何運作", "配置如何运作"),
      sub: ls("", "", ""),
      steps: lSteps([
        {
          step: "01",
          title: ls("Admin sets the budget", "管理員設定預算", "管理员设定预算"),
          desc: ls(
            "Define a total benefit budget per employee (or tier). Choose top-up (company pays base, employees add) or top-down (full budget, employees allocate).",
            "為每位員工（或層級）定義總福利預算。選擇增額（公司支付基礎，員工追加）或減額（完整預算，員工分配）。",
            "为每位员工（或层级）定义总福利预算。选择增额（公司支付基础，员工追加）或减额（完整预算，员工分配）。"
          ),
        },
        {
          step: "02",
          title: ls("Employees personalise", "員工個性化", "员工个性化"),
          desc: ls(
            "Each employee logs in and selects their benefit categories. Some want more mental health, others fitness, others dental. The platform accommodates all preferences.",
            "每位員工登錄並選擇福利類別。有人想要更多心理健康，有人想要健身，有人想要牙科。平台滿足所有偏好。",
            "每位员工登录并选择福利类别。有人想要更多心理健康，有人想要健身，有人想要牙科。平台满足所有偏好。"
          ),
        },
        {
          step: "03",
          title: ls("Live analytics dashboard", "實時分析儀表板", "实时分析仪表板"),
          desc: ls(
            "Track utilisation by benefit type, demographic, and cost centre. Identify under-used categories, rebalance budgets, and report to finance — all in real time.",
            "按福利類型、人口統計及成本中心追蹤使用情況。識別使用不足的類別、重新平衡預算並向財務報告——全部實時進行。",
            "按福利类型、人口统计及成本中心追踪使用情况。识别使用不足的类别、重新平衡预算并向财务报告——全部实时进行。"
          ),
        },
      ]),
    },
    stats: lStats([
      {
        value: "88%",
        label: ls("Avg. benefit utilisation", "平均福利使用率", "平均福利使用率"),
        sub: ls("", "", ""),
      },
      {
        value: "2x",
        label: ls("Employee satisfaction uplift", "員工滿意度提升", "员工满意度提升"),
        sub: ls("", "", ""),
      },
      {
        value: "95%",
        label: ls("Admin time reduction", "行政時間節省", "行政时间节省"),
        sub: ls("", "", ""),
      },
      {
        value: "2→500+",
        label: ls("Scales from SMB to enterprise", "從中小企到企業均適用", "从中小企到企业均适用"),
        sub: ls("", "", ""),
      },
    ]),
    testimonial: {
      quote: ls(
        "Flexible benefits changed everything. Our employees feel genuinely valued because they choose what matters to them. Retention improved 35% in the first year.",
        "彈性福利改變了一切。我們的員工感到真正被重視，因為他們可以選擇對自己重要的東西。第一年留任率提高了35%。",
        "弹性福利改变了一切。我们的员工感到真正被重视，因为他们可以选择对自己重要的东西。第一年留任率提高了35%。"
      ),
      name: "David Kwong",
      title: "CHRO",
      company: "HKEX Listed Financial Group",
    },
    cta: {
      heading: ls(
        "Ready to personalise your benefits?",
        "準備好個性化您的福利了嗎？",
        "准备好个性化您的福利了吗？"
      ),
      sub: ls(
        "Discover how MixCare's flexible benefits platform can increase utilisation, improve employee satisfaction, and simplify administration.",
        "了解MixCare彈性福利平台如何提高使用率、改善員工滿意度並簡化管理。",
        "了解MixCare弹性福利平台如何提高使用率、改善员工满意度并简化管理。"
      ),
      ctaLabel: ls("Get a Demo", "預約示範", "预约演示"),
      secondaryLabel: ls("Start Now — Free Setup", "立即開始——免費設置", "立即开始——免费设置"),
    },
    painPoints: [],
  },

  // ── 6. Wellness Hub ──────────────────────────────────────────────────────────
  {
    _id: "platform-page-wellness-hub",
    _type: "platformPage",
    pageId: "wellness-hub",
    slug: { _type: "slug", current: "wellness-hub" },
    metaTitle: ls(
      "Wellness Hub | MixCare Health",
      "健康中心 | MixCare Health",
      "健康中心 | MixCare Health"
    ),
    metaDescription: ls(
      "One hub connecting every wellness solution. Integrate with insurance policies, HR systems, and wellness programs without friction.",
      "連接每個健康方案的單一中心。與保險保單、人力資源系統及健康計劃無縫整合。",
      "连接每个健康方案的单一中心。与保险保单、人力资源系统及健康计划无缝整合。"
    ),
    hero: {
      badge: ls("Wellness Hub", "健康中心", "健康中心"),
      headline: ls("One Hub. Every Wellness Solution.", "一個中心。所有健康方案。", "一个中心。所有健康方案。"),
      headlineHighlight: ls("Fully Integrated.", "完全整合。", "完全整合。"),
      sub: ls(
        "Connect health, medical, and wellness in a single digital platform. Integrate with insurance policies, HR systems, and wellness programs without friction.",
        "在單一數字平台連接健康、醫療或健康。與保險保單、人力資源系統及健康計劃無縫整合。",
        "在单一数字平台连接健康、医疗或健康。与保险保单、人力资源系统及健康计划无缝整合。"
      ),
      ctaLabel: ls("Get a Demo", "預約示範", "预约演示"),
      iconColor: "#0d9488",
      bgGradient: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #f5f3ff 100%)",
    },
    benefits: {
      heading: ls(
        "The hub that connects everything",
        "連接一切的中心",
        "连接一切的中心"
      ),
      sub: ls("", "", ""),
      items: lBenefitItems([
        {
          title: ls("Connected Ecosystem", "連接生態系統", "连接生态系统"),
          desc: ls(
            "Bring together a diverse ecosystem of health, medical, and wellness solutions in one centralised platform. Employees access everything — GP visits, FSA, marketplace, mental health — from a single login.",
            "在一個集中平台匯聚多樣化的健康、醫療或健康方案生態系統。員工從單一登錄存取一切——全科醫生、FSA、市集、心理健康。",
            "在一个集中平台汇聚多样化的健康、医疗或健康方案生态系统。员工从单一登录存取一切——全科医生、FSA、市集、心理健康。"
          ),
        },
        {
          title: ls("Seamless Integration", "無縫整合", "无缝整合"),
          desc: ls(
            "Integrate with insurance policies, wellness programs, or employee benefits portals without friction. Pre-built connectors for major HR platforms, plus a full REST API for custom integrations.",
            "與保險保單、健康計劃或員工福利入口無縫整合。主要人力資源平台的預建連接器，加上完整REST API用於自定義整合。",
            "与保险保单、健康计划或员工福利入口无缝整合。主要人力资源平台的预建连接器，加上完整REST API用于自定义整合。"
          ),
        },
        {
          title: ls("Industry Customisation", "行業定制", "行业定制"),
          desc: ls(
            "Customise offerings for brokers, enterprises, wellness providers, and small businesses with tailored experiences. Every stakeholder gets the view and features most relevant to them.",
            "為經紀、企業、健康供應商及小型企業定制產品，提供量身定制的體驗。每個持份者獲得最相關的視圖和功能。",
            "为经纪、企业、健康供应商及小型企业定制产品，提供量身定制的体验。每个持份者获得最相关的视图和功能。"
          ),
        },
      ]),
    },
    howItWorks: {
      heading: ls("", "", ""),
      sub: ls("", "", ""),
      steps: [],
    },
    stats: [],
    testimonial: {
      quote: ls(
        "Wellness Hub is the backbone of our entire benefit stack. Everything is connected — our insurance policies, FSA wallets, and 200 wellness providers — in one place our employees actually use.",
        "健康中心是我們整個福利架構的支柱。一切都連接在一起——我們的保險保單、FSA錢包及200個健康供應商——在員工真正使用的一個地方。",
        "健康中心是我们整个福利架构的支柱。一切都连接在一起——我们的保险保单、FSA钱包及200个健康供应商——在员工真正使用的一个地方。"
      ),
      name: "Kevin Tam",
      title: "Group Head of Benefits",
      company: "HSBC Life Hong Kong",
    },
    cta: {
      heading: ls(
        "Connect your entire wellness ecosystem",
        "連接您的整個健康生態系統",
        "连接您的整个健康生态系统"
      ),
      sub: ls(
        "See how Wellness Hub can unify your health, insurance, and wellness infrastructure in a single platform.",
        "了解健康中心如何在單一平台統一您的健康、保險及健康基礎設施。",
        "了解健康中心如何在单一平台统一您的健康、保险及健康基础设施。"
      ),
      ctaLabel: ls("Get a Demo", "預約示範", "预约演示"),
      secondaryLabel: ls("", "", ""),
    },
    painPoints: [],
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Seeding ${platformPages.length} platform pages...`);
  for (const page of platformPages) {
    await client.createOrReplace(page);
    console.log(`  ✓ ${page._id}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
