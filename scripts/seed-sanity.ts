/**
 * One-time seed script — populates Sanity with 6 multilingual articles.
 * Run with: npx tsx scripts/seed-sanity.ts
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
function lb(en: string[], zhTW: string[], zhCN: string[]) {
  return { en, zhTW, zhCN };
}

// ── Articles ─────────────────────────────────────────────────────────────────

const articles = [
  // ── 1. AI Claims ────────────────────────────────────────────────────────────
  {
    _type: "article",
    _id: "article-ai-claims-processing-70-percent",
    slug: { _type: "slug", current: "ai-claims-processing-70-percent" },
    category: "AI & Claims",
    author: "MixCare Research Team",
    publishedAt: "2025-03-01",
    readTime: "8 min read",
    title: ls(
      "How AI is Cutting Claims Processing Time by 70% in Group Insurance",
      "AI如何將團體保險理賠處理時間縮短70%",
      "AI如何将团体保险理赔处理时间缩短70%"
    ),
    description: ls(
      "Explore the machine learning models behind MixCare's claims engine and what it means for insurers and self-funded schemes.",
      "探索MixCare理賠引擎背後的機器學習模型，及其對保險公司和自付計劃的意義。",
      "探索MixCare理赔引擎背后的机器学习模型，及其对保险公司和自付计划的意义。"
    ),
    sections: [
      {
        _type: "section", _key: "s1-1",
        heading: ls("The Problem with Manual Claims", "人工理賠的問題", "人工理赔的问题"),
        body: ls(
          "In traditional group insurance, outpatient claims still rely on paper forms, manual data entry, and human reviewers. A single outpatient claim touches at least six people before it's approved — receptionist, doctor, clinic admin, insurer intake, reviewer, and payments. With thousands of claims per month, the cost and error rate compound rapidly. Across Asia-Pacific, insurers report that manual claims processing accounts for 25–40% of total administrative overhead.",
          "在傳統團體保險中，門診理賠仍依賴紙質表格、人工數據輸入和人工審核。單筆門診理賠在批准前至少需要六個人處理——接待員、醫生、診所管理員、保險公司接收、審核員和付款。每月數千筆理賠的情況下，成本和錯誤率迅速累積。整個亞太地區，保險公司報告稱人工理賠處理佔總行政管理費用的25-40%。",
          "在传统团体保险中，门诊理赔仍依赖纸质表格、人工数据输入和人工审核。单笔门诊理赔在批准前至少需要六个人处理——接待员、医生、诊所管理员、保险公司接收、审核员和付款。每月数千笔理赔的情况下，成本和错误率迅速累积。整个亚太地区，保险公司报告称人工理赔处理占总行政管理费用的25-40%。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s1-2",
        heading: ls("How AI Changes the Equation", "AI如何改變局面", "AI如何改变局面"),
        body: ls(
          "MixCare's claims engine applies three layers of AI to each claim. First, optical character recognition (OCR) extracts structured data from any document format — receipts, referral letters, lab reports — with 98.7% accuracy. Second, a classification model assigns diagnosis codes, validates treatment against plan rules, and checks for duplicate claims in under two seconds. Third, an anomaly detection model flags statistical outliers — unusual procedure combinations, out-of-range billing amounts, or patterns consistent with prior fraud incidents.",
          "MixCare的理賠引擎對每筆理賠應用三層AI。首先，光學字符識別（OCR）以98.7%的準確率從任何文件格式提取結構化數據——收據、轉介信、化驗報告。其次，分類模型在兩秒內分配診斷代碼、根據計劃規則驗證治療並檢查重複理賠。第三，異常檢測模型標記統計離群值——異常的手術組合、超出範圍的賬單金額或與之前欺詐事件一致的模式。",
          "MixCare的理赔引擎对每笔理赔应用三层AI。首先，光学字符识别（OCR）以98.7%的准确率从任何文件格式提取结构化数据——收据、转介信、化验报告。其次，分类模型在两秒内分配诊断代码、根据计划规则验证治疗并检查重复理赔。第三，异常检测模型标记统计离群值——异常的手术组合、超出范围的账单金额或与之前欺诈事件一致的模式。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s1-3",
        heading: ls("Key Results from the MixCare Platform", "MixCare平台的主要成果", "MixCare平台的主要成果"),
        body: ls(
          "Across our insurer and self-funded client base, AI-powered claims processing has delivered: average claim resolution time reduced from 5.2 days to under 18 hours; claims processing cost down 70% versus fully manual operations; fraud and error rates down 60%; and straight-through processing (zero human touch) for 84% of standard outpatient claims.",
          "在我們的保險公司和自付客戶群中，AI驅動的理賠處理已取得以下成果：平均理賠解決時間從5.2天縮短至18小時以內；理賠處理成本比全人工操作降低70%；欺詐和錯誤率降低60%；84%的標準門診理賠實現直通處理（零人工接觸）。",
          "在我们的保险公司和自付客户群中，AI驱动的理赔处理已取得以下成果：平均理赔解决时间从5.2天缩短至18小时以内；理赔处理成本比全人工操作降低70%；欺诈和错误率降低60%；84%的标准门诊理赔实现直通处理（零人工接触）。"
        ),
        bullets: lb(
          ["Average resolution: 5.2 days → <18 hours", "Processing cost: down 70%", "Fraud & error rate: down 60%", "Straight-through processing: 84% of claims"],
          ["平均解決時間：5.2天 → <18小時", "處理成本：降低70%", "欺詐和錯誤率：降低60%", "直通處理：84%的理賠"],
          ["平均解决时间：5.2天 → <18小时", "处理成本：降低70%", "欺诈和错误率：降低60%", "直通处理：84%的理赔"]
        ),
      },
      {
        _type: "section", _key: "s1-4",
        heading: ls("What This Means for Insurers and HR Teams", "對保險公司和HR團隊的意義", "对保险公司和HR团队的意义"),
        body: ls(
          "For insurers offering self-funded outpatient schemes, AI processing directly reduces the loss ratio by cutting both fraud leakage and administrative cost. For HR teams managing self-funded pools, faster claim resolution means employees receive reimbursement within the same business day — a measurable improvement in employee satisfaction.",
          "對於提供自付門診計劃的保險公司而言，AI處理通過削減欺詐損漏和行政成本直接降低損失率。對於管理自付池的HR團隊而言，更快的理賠解決意味著員工可在同一工作日內獲得報銷——員工滿意度的可量化提升。",
          "对于提供自付门诊计划的保险公司而言，AI处理通过削减欺诈损漏和行政成本直接降低损失率。对于管理自付池的HR团队而言，更快的理赔解决意味着员工可在同一工作日内获得报销——员工满意度的可量化提升。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s1-5",
        heading: ls("Implementation: Faster Than You Think", "部署：比您想像的更快", "部署：比您想象的更快"),
        body: ls(
          "MixCare's claims engine integrates with existing insurer systems via REST API. For most deployments, full integration takes 2–5 business days. For smaller self-funded schemes, our hosted model requires no integration at all.",
          "MixCare的理賠引擎通過REST API與現有保險公司系統集成。對於大多數部署，完整集成需要2–5個工作日。對於較小的自付計劃，我們的托管模型完全不需要集成。",
          "MixCare的理赔引擎通过REST API与现有保险公司系统集成。对于大多数部署，完整集成需要2–5个工作日。对于较小的自付计划，我们的托管模型完全不需要集成。"
        ),
        bullets: lb([], [], []),
      },
    ],
  },

  // ── 2. Flexible Benefits ─────────────────────────────────────────────────────
  {
    _type: "article",
    _id: "article-flexible-benefits-vs-traditional-group-plans",
    slug: { _type: "slug", current: "flexible-benefits-vs-traditional-group-plans" },
    category: "Employee Benefits",
    author: "MixCare Benefits Team",
    publishedAt: "2025-02-01",
    readTime: "6 min read",
    title: ls(
      "Why Flexible Benefits Outperform Traditional Group Plans — Every Time",
      "為何彈性福利每次都勝過傳統團體計劃",
      "为何弹性福利每次都胜过传统团体计划"
    ),
    description: ls(
      "Data from 200+ corporate clients shows employees with flexible benefit choice use 2× more of their benefit budget.",
      "來自逾200家企業客戶的數據顯示，擁有彈性福利選擇的員工使用了2倍以上的福利預算。",
      "来自逾200家企业客户的数据显示，拥有弹性福利选择的员工使用了2倍以上的福利预算。"
    ),
    sections: [
      {
        _type: "section", _key: "s2-1",
        heading: ls("Why Traditional Group Plans Are Failing", "傳統團體計劃為何失敗", "传统团体计划为何失败"),
        body: ls(
          "The traditional group medical plan — same coverage, same limits, same panel for every employee — was designed for a workforce that no longer exists. Our data shows that in traditional group plans, 58% of annual benefit spend goes unused.",
          "傳統團體醫療計劃——每位員工相同的保障、相同的限額、相同的醫療機構網絡——是為一個已不存在的勞動力設計的。我們的數據顯示，在傳統團體計劃中，58%的年度福利支出未被使用。",
          "传统团体医疗计划——每位员工相同的保障、相同的限额、相同的医疗机构网络——是为一个已不存在的劳动力设计的。我们的数据显示，在传统团体计划中，58%的年度福利支出未被使用。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s2-2",
        heading: ls("What Flexible Benefits Actually Are", "彈性福利究竟是什麼", "弹性福利究竟是什么"),
        body: ls(
          "Flexible benefits allow employees to choose their own benefit mix from a curated catalogue, within an employer-set budget. The employer sets the rules and the platform enforces them automatically.",
          "彈性福利允許員工在雇主設定的預算範圍內，從精心策劃的目錄中選擇自己的福利組合。雇主設定規則，平台自動執行。",
          "弹性福利允许员工在雇主设定的预算范围内，从精心策划的目录中选择自己的福利组合。雇主设定规则，平台自动执行。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s2-3",
        heading: ls("The Data: Flexible Benefits Win Every Metric", "數據：彈性福利在各項指標上勝出", "数据：弹性福利在各项指标上胜出"),
        body: ls(
          "Across 200+ MixCare corporate clients that switched from traditional group plans to flexible benefits:",
          "在200多家從傳統團體計劃轉換到彈性福利的MixCare企業客戶中：",
          "在200多家从传统团体计划转换到弹性福利的MixCare企业客户中："
        ),
        bullets: lb(
          ["Benefit utilisation: 42% → 88%", "Employee satisfaction with benefits: +45 percentage points", "HR admin time on benefit queries: down 65%", "Annual benefit spend efficiency: up 2.1× per employee", "Voluntary turnover in year 1 post-switch: down 18%"],
          ["福利使用率：42% → 88%", "員工對福利的滿意度：提升45個百分點", "HR處理福利查詢的行政時間：降低65%", "年度福利支出效率：每位員工提升2.1倍", "轉換後第一年自願離職率：降低18%"],
          ["福利使用率：42% → 88%", "员工对福利的满意度：提升45个百分点", "HR处理福利查询的行政时间：降低65%", "年度福利支出效率：每位员工提升2.1倍", "转换后第一年自愿离职率：降低18%"]
        ),
      },
      {
        _type: "section", _key: "s2-4",
        heading: ls("The ROI Calculation", "投資回報計算", "投资回报计算"),
        body: ls(
          "For a 200-person company spending HK$3,000 per employee per year on benefits, moving from 42% to 88% utilisation means the same spend delivers 2× the perceived value to employees.",
          "對於一家每年每位員工花費3,000港元福利的200人公司，將使用率從42%提升至88%意味著相同的支出為員工帶來2倍的感知價值。",
          "对于一家每年每位员工花费3,000港元福利的200人公司，将使用率从42%提升至88%意味着相同的支出为员工带来2倍的感知价值。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s2-5",
        heading: ls("How to Make the Switch", "如何完成轉換", "如何完成转换"),
        body: ls(
          "The transition from traditional group plans to flexible benefits is simpler than most HR teams expect. MixCare handles carrier negotiations, technology setup, and employee onboarding. Most deployments go live within 5 business days.",
          "從傳統團體計劃轉換到彈性福利比大多數HR團隊預期的要簡單。MixCare處理承運人談判、技術設置和員工入職培訓。大多數部署在5個工作日內上線。",
          "从传统团体计划转换到弹性福利比大多数HR团队预期的要简单。MixCare处理承运人谈判、技术设置和员工入职培训。大多数部署在5个工作日内上线。"
        ),
        bullets: lb([], [], []),
      },
    ],
  },

  // ── 3. SMB Guide ─────────────────────────────────────────────────────────────
  {
    _type: "article",
    _id: "article-small-business-guide-employee-benefits-hong-kong",
    slug: { _type: "slug", current: "small-business-guide-employee-benefits-hong-kong" },
    category: "SMB Guide",
    author: "MixCare SMB Team",
    publishedAt: "2025-02-01",
    readTime: "12 min read",
    title: ls(
      "The Small Business Guide to Employee Benefits in Hong Kong",
      "香港中小企員工福利全指南",
      "香港中小企员工福利全指南"
    ),
    description: ls(
      "A practical walkthrough of benefit options, pricing, regulatory requirements, and how to get started — for teams of 2 to 500.",
      "為2至500人團隊提供的福利選擇、定價、法規要求及入門實用指引。",
      "为2至500人团队提供的福利选择、定价、法规要求及入门实用指引。"
    ),
    sections: [
      {
        _type: "section", _key: "s3-1",
        heading: ls("The SMB Benefits Challenge", "中小企福利挑戰", "中小企福利挑战"),
        body: ls(
          "Small and medium businesses in Hong Kong face a structural disadvantage in talent competition. Traditional group medical insurance requires minimum headcounts, long-term contracts, and HR expertise to manage.",
          "香港的中小企業在人才競爭中面臨結構性劣勢。傳統團體醫療保險要求最低人數、長期合同以及HR專業知識來管理。",
          "香港的中小企业在人才竞争中面临结构性劣势。传统团体医疗保险要求最低人数、长期合同以及HR专业知识来管理。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s3-2",
        heading: ls("Your Options: A Plain-Language Guide", "您的選擇：通俗語言指南", "您的选择：通俗语言指南"),
        body: ls(
          "There are three main benefit structures available to Hong Kong SMBs in 2025:",
          "2025年香港中小企業可使用三種主要福利結構：",
          "2025年香港中小企业可使用三种主要福利结构："
        ),
        bullets: lb(
          ["Group Medical Insurance: Traditional route. Typical cost: HK$2,000–6,000/employee/year.", "Flexible Spending Account (FSA): Digital wallet for health and wellness. No minimum headcount.", "Wellness Marketplace: Access to 3,000+ services at negotiated rates. No insurance component."],
          ["團體醫療保險：傳統方式。典型費用：每位員工每年2,000–6,000港元。", "彈性醫療帳戶（FSA）：用於健康和保健的數字錢包。無最低人數要求。", "健康市場：以談判價格獲取3,000多項服務。無保險成分。"],
          ["团体医疗保险：传统方式。典型费用：每位员工每年2,000–6,000港元。", "弹性医疗账户（FSA）：用于健康和保健的数字钱包。无最低人数要求。", "健康市场：以谈判价格获取3,000多项服务。无保险成分。"]
        ),
      },
      {
        _type: "section", _key: "s3-3",
        heading: ls("Regulatory Requirements You Need to Know", "您需要了解的法規要求", "您需要了解的法规要求"),
        body: ls(
          "Hong Kong does not mandate employer-provided health insurance, but you must comply with the Personal Data (Privacy) Ordinance (Cap. 486) if handling employee health data. All MixCare plans are PDPO-compliant and ISO 27001 certified.",
          "香港不強制要求雇主提供健康保險，但如果處理員工健康數據，您必須遵守《個人資料（私隱）條例》（第486章）。所有MixCare計劃均符合PDPO並通過ISO 27001認證。",
          "香港不强制要求雇主提供健康保险，但如果处理员工健康数据，您必须遵守《个人资料（私隐）条例》（第486章）。所有MixCare计划均符合PDPO并通过ISO 27001认证。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s3-4",
        heading: ls("Cost Guide by Company Size", "按公司規模的費用指南", "按公司规模的费用指南"),
        body: ls("Indicative monthly benefit costs per employee:", "每位員工的月度福利費用參考：", "每位员工的月度福利费用参考："),
        bullets: lb(
          ["2–10 employees: HK$300–600/month", "11–50 employees: HK$400–900/month", "51–200 employees: HK$600–1,500/month", "200+ employees: Custom enterprise pricing"],
          ["2–10名員工：每月300–600港元", "11–50名員工：每月400–900港元", "51–200名員工：每月600–1,500港元", "200名以上員工：定制企業定價"],
          ["2–10名员工：每月300–600港元", "11–50名员工：每月400–900港元", "51–200名员工：每月600–1,500港元", "200名以上员工：定制企业定价"]
        ),
      },
      {
        _type: "section", _key: "s3-5",
        heading: ls("How to Get Started in Under an Hour", "如何在一小時內開始", "如何在一小时内开始"),
        body: ls(
          "MixCare's SMB Starter plan requires no minimum headcount and no HR team. Sign up, add employees, set budgets, and go live — in under 60 minutes.",
          "MixCare的中小企入門計劃無需最低人數要求，也無需HR團隊。註冊、添加員工、設定預算、上線——60分鐘內完成。",
          "MixCare的中小企入门计划无需最低人数要求，也无需HR团队。注册、添加员工、设定预算、上线——60分钟内完成。"
        ),
        bullets: lb([], [], []),
      },
    ],
  },

  // ── 4. Mental Health ────────────────────────────────────────────────────────
  {
    _type: "article",
    _id: "article-mental-health-benefits-asia-2025",
    slug: { _type: "slug", current: "mental-health-benefits-asia-2025" },
    category: "Wellness",
    author: "MixCare Research Team",
    publishedAt: "2025-01-01",
    readTime: "10 min read",
    title: ls(
      "Mental Health Benefits: What Employees in Asia Actually Want in 2025",
      "2025年亞洲員工真正想要的心理健康福利",
      "2025年亚洲员工真正想要的心理健康福利"
    ),
    description: ls(
      "Survey data from 5,000 employees across HK, SG, and MO reveals the wellness benefits that drive satisfaction and retention.",
      "來自港、星、澳5,000名員工的調查數據，揭示推動滿意度和留任率的健康福利。",
      "来自港、星、澳5,000名员工的调查数据，揭示推动满意度和留任率的健康福利。"
    ),
    sections: [
      {
        _type: "section", _key: "s4-1",
        heading: ls("Survey Methodology", "調查方法", "调查方法"),
        body: ls(
          "In Q4 2024, MixCare surveyed 5,000 employees across Hong Kong, Singapore, and Macau — balanced across age groups (22–55), industries, and company sizes. All responses were anonymous.",
          "2024年第四季度，MixCare對香港、新加坡和澳門的5,000名員工進行了調查——跨年齡組（22-55歲）、行業和公司規模的均衡樣本。所有回應均為匿名。",
          "2024年第四季度，MixCare对香港、新加坡和澳门的5,000名员工进行了调查——跨年龄组（22-55岁）、行业和公司规模的均衡样本。所有回应均为匿名。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s4-2",
        heading: ls("The Key Finding: Mental Health is Now #1", "關鍵發現：心理健康現已排名第一", "关键发现：心理健康现已排名第一"),
        body: ls(
          "For the first time, mental health benefits ranked as the #1 benefit priority among employees aged 22–40. 71% of respondents under 35 in financial services and tech rated mental health benefits as 'very important' or 'essential'.",
          "心理健康福利首次成為22-40歲員工中排名第一的福利優先事項。金融服務和科技行業35歲以下的受訪者中有71%認為心理健康福利\"非常重要\"或\"必不可少\"。",
          "心理健康福利首次成为22-40岁员工中排名第一的福利优先事项。金融服务和科技行业35岁以下的受访者中有71%认为心理健康福利\"非常重要\"或\"必不可少\"。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s4-3",
        heading: ls("What Employees Actually Want", "員工真正想要什麼", "员工真正想要什么"),
        body: ls(
          "When asked which mental health services they would use if offered through their employer:",
          "當被問及如果通過雇主提供，他們會使用哪些心理健康服務時：",
          "当被问及如果通过雇主提供，他们会使用哪些心理健康服务时："
        ),
        bullets: lb(
          ["Professional counselling sessions: 68%", "Mindfulness and meditation apps: 52%", "Sleep improvement programmes: 44%", "Stress management workshops: 38%", "Psychiatric consultation coverage: 31%", "Burnout coaching: 28%"],
          ["專業諮詢課程：68%", "正念和冥想應用程序：52%", "睡眠改善計劃：44%", "壓力管理研討會：38%", "精神科諮詢保障：31%", "倦怠輔導：28%"],
          ["专业咨询课程：68%", "正念和冥想应用程序：52%", "睡眠改善计划：44%", "压力管理研讨会：38%", "精神科咨询保障：31%", "倦怠辅导：28%"]
        ),
      },
      {
        _type: "section", _key: "s4-4",
        heading: ls("What Employers Are Currently Offering", "雇主目前提供的服務", "雇主目前提供的服务"),
        body: ls(
          "Only 23% of surveyed companies offer any structured mental health benefit beyond a basic EAP. Employees consistently prefer benefits they can access privately, on their own schedule, through an app or self-service portal.",
          "只有23%的受訪公司提供基本員工援助計劃以外的任何結構化心理健康福利。員工始終更喜歡能夠私下、按照自己的時間表通過應用程序或自助服務門戶獲取的福利。",
          "只有23%的受访公司提供基本员工援助计划以外的任何结构化心理健康福利。员工始终更喜欢能够私下、按照自己的时间表通过应用程序或自助服务门户获取的福利。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s4-5",
        heading: ls("The ROI of Mental Health Benefits", "心理健康福利的投資回報", "心理健康福利的投资回报"),
        body: ls(
          "Companies that added mental health benefits through MixCare saw: voluntary turnover down 22% in year 1; sick day usage down 18%; employee engagement scores up 31 points. Average cost: HK$800–1,200 per employee per year.",
          "通過MixCare添加心理健康福利的公司看到：第一年自願離職率降低22%；病假使用率降低18%；員工敬業度得分提升31分。平均成本：每位員工每年800–1,200港元。",
          "通过MixCare添加心理健康福利的公司看到：第一年自愿离职率降低22%；病假使用率降低18%；员工敬业度得分提升31分。平均成本：每位员工每年800–1,200港元。"
        ),
        bullets: lb([], [], []),
      },
    ],
  },

  // ── 5. PDPO ─────────────────────────────────────────────────────────────────
  {
    _type: "article",
    _id: "article-pdpo-2024-updates-hr-managers",
    slug: { _type: "slug", current: "pdpo-2024-updates-hr-managers" },
    category: "Compliance",
    author: "MixCare Compliance Team",
    publishedAt: "2024-12-01",
    readTime: "7 min read",
    title: ls(
      "PDPO 2024 Updates: What HR and Benefit Managers Need to Know",
      "PDPO 2024更新：HR與福利管理人員須知",
      "PDPO 2024更新：HR与福利管理人员须知"
    ),
    description: ls(
      "A plain-language summary of the 2024 amendments to Hong Kong's Personal Data Privacy Ordinance and their benefit implications.",
      "香港《個人資料（私隱）條例》2024年修訂的通俗摘要及其福利影響。",
      "香港《个人资料（私隐）条例》2024年修订的通俗摘要及其福利影响。"
    ),
    sections: [
      {
        _type: "section", _key: "s5-1",
        heading: ls("What Changed in the 2024 PDPO Amendments", "2024年PDPO修訂的變化", "2024年PDPO修订的变化"),
        body: ls(
          "Key changes affecting HR and benefits managers: mandatory breach notification within 48 hours; stricter consent requirements for cross-border data transfers; expanded individual access rights; and new fines of up to HK$1 million for serious violations.",
          "影響HR和福利管理人員的關鍵變化：強制性48小時內違規通知；跨境數據傳輸更嚴格的同意要求；擴大個人訪問權利；嚴重違規最高100萬港元的新罰款。",
          "影响HR和福利管理人员的关键变化：强制性48小时内违规通知；跨境数据传输更严格的同意要求；扩大个人访问权利；严重违规最高100万港元的新罚款。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s5-2",
        heading: ls("How This Affects Your Benefits Administration", "這對您的福利管理的影響", "这对您的福利管理的影响"),
        body: ls(
          "If your company administers health benefits, you're a data controller under PDPO. You must have a clear data retention policy, obtain explicit consent before sharing employee health data, and be able to respond to data access requests within 40 days.",
          "如果您的公司管理健康福利，您是PDPO下的數據控制者。您必須有明確的數據保留政策，在分享員工健康數據前獲得明確同意，並能在40天內回應數據訪問請求。",
          "如果您的公司管理健康福利，您是PDPO下的数据控制者。您必须有明确的数据保留政策，在分享员工健康数据前获得明确同意，并能在40天内回应数据访问请求。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s5-3",
        heading: ls("Your Action Checklist", "您的行動清單", "您的行动清单"),
        body: ls("Steps to bring your benefits administration into PDPO 2024 compliance:", "使您的福利管理符合PDPO 2024的步驟：", "使您的福利管理符合PDPO 2024的步骤："),
        bullets: lb(
          ["Audit all health data you collect and store", "Update your employee privacy notice", "Implement a 48-hour breach notification procedure", "Verify your benefits technology vendors' data residency", "Train HR on individual access rights"],
          ["審計您收集和存儲的所有健康數據", "更新您的員工隱私通知", "實施48小時違規通知程序", "驗證您的福利技術供應商的數據存儲位置", "對HR進行個人訪問權利培訓"],
          ["审计您收集和存储的所有健康数据", "更新您的员工隐私通知", "实施48小时违规通知程序", "验证您的福利技术供应商的数据存储位置", "对HR进行个人访问权利培训"]
        ),
      },
      {
        _type: "section", _key: "s5-4",
        heading: ls("MixCare's Compliance Framework", "MixCare的合規框架", "MixCare的合规框架"),
        body: ls(
          "MixCare is fully PDPO-compliant and ISO 27001 certified. We provide all clients with a data processing agreement and automatic data retention enforcement. Employee health data is never shared with third parties without explicit consent.",
          "MixCare完全符合PDPO並通過ISO 27001認證。我們為所有客戶提供數據處理協議和自動數據保留執行。未經明確同意，員工健康數據絕不會與第三方共享。",
          "MixCare完全符合PDPO并通过ISO 27001认证。我们为所有客户提供数据处理协议和自动数据保留执行。未经明确同意，员工健康数据绝不会与第三方共享。"
        ),
        bullets: lb([], [], []),
      },
    ],
  },

  // ── 6. Digital-First Outpatient ──────────────────────────────────────────────
  {
    _type: "article",
    _id: "article-digital-first-outpatient-asia-lessons",
    slug: { _type: "slug", current: "digital-first-outpatient-asia-lessons" },
    category: "Insurers",
    author: "MixCare Insurer Solutions Team",
    publishedAt: "2024-11-01",
    readTime: "15 min read",
    title: ls(
      "Building a Digital-First Outpatient Product in Asia: Lessons from the Field",
      "在亞洲打造數碼優先門診產品：實戰經驗",
      "在亚洲打造数字优先门诊产品：实战经验"
    ),
    description: ls(
      "Three insurer case studies on deploying AI-powered self-funded outpatient schemes — what worked and what didn't.",
      "三個保險公司部署AI驅動自付門診計劃的案例研究——成功與失敗的經驗。",
      "三个保险公司部署AI驱动自付门诊计划的案例研究——成功与失败的经验。"
    ),
    sections: [
      {
        _type: "section", _key: "s6-1",
        heading: ls("Why Insurers Are Launching Self-Funded Outpatient Schemes", "保險公司為何推出自付門診計劃", "保险公司为何推出自付门诊计划"),
        body: ls(
          "Self-funded outpatient schemes offer lower premiums, full claims transparency, and the ability to deploy AI processing. Three insurers shared their deployment experiences with us.",
          "自付門診計劃提供更低的保費、完全的理賠透明度以及部署AI處理的能力。三家保險公司與我們分享了他們的部署經驗。",
          "自付门诊计划提供更低的保费、完全的理赔透明度以及部署AI处理的能力。三家保险公司与我们分享了他们的部署经验。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s6-2",
        heading: ls("Case Study 1: AXA Hong Kong — Scale-First", "案例研究1：香港AXA——規模優先", "案例研究1：香港AXA——规模优先"),
        body: ls(
          "AXA Hong Kong launched its MixCare-powered self-funded scheme for corporate clients. Within 90 days, 84% of claims were processed without human review, and average resolution dropped from 5 days to 18 hours.",
          "香港AXA為企業客戶推出了其MixCare驅動的自付計劃。90天內，84%的理賠無需人工審核即可處理，平均解決時間從5天縮短至18小時。",
          "香港AXA为企业客户推出了其MixCare驱动的自付计划。90天内，84%的理赔无需人工审核即可处理，平均解决时间从5天缩短至18小时。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s6-3",
        heading: ls("Case Study 2: Panel Network as the Differentiator", "案例研究2：醫療網絡作為差異化因素", "案例研究2：医疗网络作为差异化因素"),
        body: ls(
          "A regional insurer emphasised the 2,000+ panel doctor network. Corporate clients cited panel breadth — including specialist clinics and TCM — as the primary reason for switching.",
          "一家地區性保險公司強調其2,000多個合約醫生網絡。企業客戶將醫療網絡廣度——包括專科診所和中醫——列為轉換的主要原因。",
          "一家地区性保险公司强调其2,000多个合约医生网络。企业客户将医疗网络广度——包括专科诊所和中医——列为转换的主要原因。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s6-4",
        heading: ls("Case Study 3: SME-Focused — Speed to Market", "案例研究3：中小企聚焦——快速上市", "案例研究3：中小企聚焦——快速上市"),
        body: ls(
          "A smaller insurer targeting SMEs deployed a stripped-down version focused on simplicity: a curated 500-doctor panel and a flat monthly fee. Time to market was 3 weeks.",
          "一家針對中小企業的小型保險公司部署了一個簡化版本，專注於簡單性：精心策劃的500名醫生網絡和固定月費。上市時間為3週。",
          "一家针对中小企业的小型保险公司部署了一个简化版本，专注于简单性：精心策划的500名医生网络和固定月费。上市时间为3周。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section", _key: "s6-5",
        heading: ls("What Worked — and What Didn't", "哪些有效——哪些無效", "哪些有效——哪些无效"),
        body: ls(
          "Success factors: executive sponsorship, dedicated employee communication, and fast claims resolution in the first 30 days. Challenges: legacy integration takes longer than planned, and employee education requires multiple touchpoints.",
          "成功因素：高管支持、專門的員工溝通以及前30天快速的理賠解決。挑戰：遺留系統集成比計劃花費更長時間，員工培訓需要多個接觸點。",
          "成功因素：高管支持、专门的员工沟通以及前30天快速的理赔解决。挑战：遗留系统集成比计划花费更长时间，员工培训需要多个接触点。"
        ),
        bullets: lb(
          ["✓ Executive sponsorship drives adoption", "✓ Fast first-claim resolution is the best marketing", "✓ Cashless = higher utilisation", "✗ Legacy integration takes longer than planned", "✗ Employee education cannot be a one-email exercise"],
          ["✓ 高管支持推動採用", "✓ 快速首次理賠解決是最好的市場營銷", "✓ 無現金 = 更高使用率", "✗ 遺留系統集成比計劃花費更長時間", "✗ 員工培訓不能只是一封電郵的事"],
          ["✓ 高管支持推动采用", "✓ 快速首次理赔解决是最好的市场营销", "✓ 无现金 = 更高使用率", "✗ 遗留系统集成比计划花费更长时间", "✗ 员工培训不能只是一封电邮的事"]
        ),
      },
    ],
  },
];

async function seed() {
  console.log(`Seeding ${articles.length} multilingual articles to Sanity...`);
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} / Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}\n`);

  const transaction = client.transaction();
  for (const article of articles) {
    transaction.createOrReplace(article as Parameters<typeof transaction.createOrReplace>[0]);
  }

  try {
    const result = await transaction.commit();
    console.log(`✓ Seeded ${result.results.length} articles successfully.`);
    console.log("Languages: EN + 繁體中文 + 简体中文");
    console.log("Slugs:");
    for (const article of articles) {
      console.log(`  • ${article.slug.current}`);
    }
  } catch (err) {
    console.error("✗ Seed failed:", err);
    process.exit(1);
  }
}

seed();
