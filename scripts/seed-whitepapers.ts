/**
 * Seed script — populates Sanity with 3 multilingual whitepapers.
 * Run with: npx tsx scripts/seed-whitepapers.ts
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
function lb(en: string[], zhTW: string[], zhCN: string[]) {
  return { en, zhTW, zhCN };
}
function la(en: string[], zhTW: string[], zhCN: string[]) {
  return { en, zhTW, zhCN };
}

const whitepapers = [
  // ── 1. State of Employee Benefits Asia-Pacific 2025 ──────────────────────────
  {
    _id: "whitepaper-employee-benefits-asia-pacific-2025",
    _type: "whitepaper",
    slug: { _type: "slug", current: "employee-benefits-asia-pacific-2025" },
    title: ls(
      "The State of Employee Benefits in Asia-Pacific 2025",
      "2025年亞太地區員工福利狀況",
      "2025年亚太地区员工福利状况"
    ),
    description: ls(
      "Annual survey of 500 HR leaders and 5,000 employees across HK, SG, and MO.",
      "針對香港、新加坡和澳門500名人力資源負責人和5,000名員工的年度調查。",
      "针对香港、新加坡和澳门500名人力资源负责人和5,000名员工的年度调查。"
    ),
    pages: "42 pages",
    format: "PDF Report",
    audience: ls(
      "HR Directors, Benefits Managers, C-Suite",
      "人力資源總監、福利經理、高管",
      "人力资源总监、福利经理、高管"
    ),
    gradient: "from-teal-600 to-cyan-800",
    accentColor: "#0d9488",
    topics: la(
      [
        "State of employee benefits across HK, SG & MO",
        "Top 10 benefit types employees actually value",
        "Utilisation gap: why 58% of benefits go unused",
        "Cost benchmarks by company size and sector",
        "2025 HR priorities and benefit investment plans",
      ],
      [
        "港、星、澳員工福利現況",
        "員工真正重視的十大福利類型",
        "使用率差距：為何58%的福利未被使用",
        "按公司規模和行業劃分的成本基準",
        "2025年人力資源優先事項和福利投資計劃",
      ],
      [
        "港、星、澳员工福利现况",
        "员工真正重视的十大福利类型",
        "使用率差距：为何58%的福利未被使用",
        "按公司规模和行业划分的成本基准",
        "2025年人力资源优先事项和福利投资计划",
      ]
    ),
    sections: [
      {
        _type: "section",
        _key: "wp1-s1",
        heading: ls("About This Report", "關於本報告", "关于本报告"),
        body: ls(
          "The State of Employee Benefits in Asia-Pacific 2025 is MixCare's annual survey of HR leaders and employees across Hong Kong, Macau, and Singapore. This edition surveyed 500 HR professionals (Director level and above) and 5,000 employees across companies ranging from 10 to 10,000+ employees. The survey was conducted in Q4 2024 and reflects current benefit structures, satisfaction levels, and 2025 investment intentions.",
          "2025年亞太地區員工福利狀況是MixCare對香港、澳門和新加坡人力資源負責人和員工的年度調查。本版調查了500名人力資源專業人員（總監級別及以上）和5,000名員工，涵蓋10至10,000名員工以上的公司。調查於2024年第四季度進行，反映了當前的福利結構、滿意度水平和2025年投資意向。",
          "2025年亚太地区员工福利状况是MixCare对香港、澳门和新加坡人力资源负责人和员工的年度调查。本版调查了500名人力资源专业人员（总监级别及以上）和5,000名员工，涵盖10至10,000名员工以上的公司。调查于2024年第四季度进行，反映了当前的福利结构、满意度水平和2025年投资意向。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "wp1-s2",
        heading: ls(
          "Key Finding 1: The Utilisation Gap",
          "主要發現1：使用率差距",
          "主要发现1：使用率差距"
        ),
        body: ls(
          "Despite average annual benefit spend of HK$5,800 per employee, only 42% of employees report actively using any benefit beyond basic outpatient medical coverage. The top reason: lack of awareness (48% of employees say they don't know what benefits are available). The second reason: access friction (32% say it's too complicated to use their benefits). The third: relevance mismatch (27% say the available benefits don't match their personal needs.",
          "儘管每名員工的平均年度福利支出為港幣5,800元，但只有42%的員工表示積極使用基本門診醫療保障以外的任何福利。首要原因：缺乏認知（48%的員工表示不知道有哪些福利可用）。第二個原因：訪問摩擦（32%的員工表示使用福利太複雜）。第三：相關性不匹配（27%的員工表示可用福利與其個人需求不符）。",
          "尽管每名员工的平均年度福利支出为港币5,800元，但只有42%的员工表示积极使用基本门诊医疗保障以外的任何福利。首要原因：缺乏认知（48%的员工表示不知道有哪些福利可用）。第二个原因：访问摩擦（32%的员工表示使用福利太复杂）。第三：相关性不匹配（27%的员工表示可用福利与其个人需求不符）。"
        ),
        bullets: lb(
          [
            "58% of annual benefit spend goes unused across the market",
            "Lack of awareness is the #1 barrier to utilisation",
            "Companies with flexible benefits have 2.2× higher utilisation",
            "Digital-first access (app/portal) is the #1 requested improvement",
          ],
          [
            "市場上58%的年度福利支出未被使用",
            "缺乏認知是使用率的首要障礙",
            "擁有彈性福利的公司使用率高出2.2倍",
            "數字優先訪問（應用程式/門戶）是最受歡迎的改進",
          ],
          [
            "市场上58%的年度福利支出未被使用",
            "缺乏认知是使用率的首要障碍",
            "拥有弹性福利的公司使用率高出2.2倍",
            "数字优先访问（应用程序/门户）是最受欢迎的改进",
          ]
        ),
      },
      {
        _type: "section",
        _key: "wp1-s3",
        heading: ls(
          "Key Finding 2: Mental Health Rises to #1",
          "主要發現2：心理健康躍升至第一",
          "主要发现2：心理健康跃升至第一"
        ),
        body: ls(
          "For the first time, mental health support has surpassed traditional outpatient coverage as the most-requested benefit among employees aged 22–40. 71% of respondents in financial services and technology sectors rated mental health benefits as 'very important' or 'essential'. Yet only 23% of employers currently offer any structured mental health benefit beyond a basic EAP.",
          "心理健康支持首次超越傳統門診保障，成為22-40歲員工最需要的福利。金融服務和科技行業71%的受訪者將心理健康福利評為「非常重要」或「必不可少」。然而，目前只有23%的僱主提供基本EAP以外的任何結構化心理健康福利。",
          "心理健康支持首次超越传统门诊保障，成为22-40岁员工最需要的福利。金融服务和科技行业71%的受访者将心理健康福利评为「非常重要」或「必不可少」。然而，目前只有23%的雇主提供基本EAP以外的任何结构化心理健康福利。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "wp1-s4",
        heading: ls(
          "Key Finding 3: Cost Benchmarks by Sector",
          "主要發現3：按行業劃分的成本基準",
          "主要发现3：按行业划分的成本基准"
        ),
        body: ls(
          "Average annual benefit spend per employee by sector:",
          "各行業每名員工平均年度福利支出：",
          "各行业每名员工平均年度福利支出："
        ),
        bullets: lb(
          [
            "Financial Services: HK$9,200/year (highest across all sectors)",
            "Technology: HK$7,400/year",
            "Professional Services: HK$6,800/year",
            "Retail & Hospitality: HK$3,600/year",
            "Manufacturing: HK$3,100/year",
            "SMB (under 50 employees): HK$3,800/year",
          ],
          [
            "金融服務：每年港幣9,200元（所有行業中最高）",
            "科技：每年港幣7,400元",
            "專業服務：每年港幣6,800元",
            "零售及酒店：每年港幣3,600元",
            "製造業：每年港幣3,100元",
            "中小企業（50名員工以下）：每年港幣3,800元",
          ],
          [
            "金融服务：每年港币9,200元（所有行业中最高）",
            "科技：每年港币7,400元",
            "专业服务：每年港币6,800元",
            "零售及酒店：每年港币3,600元",
            "制造业：每年港币3,100元",
            "中小企业（50名员工以下）：每年港币3,800元",
          ]
        ),
      },
      {
        _type: "section",
        _key: "wp1-s5",
        heading: ls("2025 HR Priorities", "2025年人力資源優先事項", "2025年人力资源优先事项"),
        body: ls(
          "When asked about their top benefit investment priorities for 2025, HR Directors cited: mental health benefits (64%), flexible benefits technology (58%), wellness marketplace access (44%), and AI-powered claims processing (39%). Cost optimisation — not feature expansion — is the primary driver, with 71% of HR leaders prioritising getting more utilisation from existing spend rather than increasing budgets.",
          "當被問及2025年的主要福利投資優先事項時，人力資源總監提到：心理健康福利（64%）、靈活福利技術（58%）、健康市場訪問（44%）和AI驅動的理賠處理（39%）。成本優化——而非功能擴展——是主要驅動因素，71%的人力資源負責人優先考慮從現有支出中獲得更多使用，而非增加預算。",
          "当被问及2025年的主要福利投资优先事项时，人力资源总监提到：心理健康福利（64%）、灵活福利技术（58%）、健康市场访问（44%）和AI驱动的理赔处理（39%）。成本优化——而非功能扩展——是主要驱动因素，71%的人力资源负责人优先考虑从现有支出中获得更多使用，而非增加预算。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "wp1-s6",
        heading: ls(
          "What This Means for HR Leaders",
          "這對人力資源負責人意味著什麼",
          "这对人力资源负责人意味着什么"
        ),
        body: ls(
          "The data points to a consistent conclusion: the problem in Asian employee benefits is not spend — it's delivery. Companies spending less per employee but using flexible, digital-first platforms consistently outperform on utilisation and satisfaction. The shift to flexible benefits technology is no longer an innovation — it's becoming table stakes for competitive employer branding.",
          "數據指向一個一致的結論：亞洲員工福利的問題不在於支出——而在於交付。每名員工支出較少但使用靈活、數字優先平台的公司在使用率和滿意度上一貫表現更佳。向靈活福利技術的轉變不再是一種創新——它正在成為競爭性雇主品牌的基本要求。",
          "数据指向一个一致的结论：亚洲员工福利的问题不在于支出——而在于交付。每名员工支出较少但使用灵活、数字优先平台的公司在使用率和满意度上一贯表现更佳。向灵活福利技术的转变不再是一种创新——它正在成为竞争性雇主品牌的基本要求。"
        ),
        bullets: lb([], [], []),
      },
    ],
    publishedAt: "2025-01-01",
  },

  // ── 2. AI in Health Insurance Claims Technical ───────────────────────────────
  {
    _id: "whitepaper-ai-health-insurance-claims-technical",
    _type: "whitepaper",
    slug: { _type: "slug", current: "ai-health-insurance-claims-technical" },
    title: ls(
      "AI in Health Insurance Claims: A Technical Overview",
      "健康保險理賠中的人工智能：技術概述",
      "健康保险理赔中的人工智能：技术概述"
    ),
    description: ls(
      "Deep dive into the machine learning models powering modern claims processing.",
      "深入探討驅動現代理賠處理的機器學習模型。",
      "深入探讨驱动现代理赔处理的机器学习模型。"
    ),
    pages: "28 pages",
    format: "Technical PDF",
    audience: ls(
      "Insurance CTOs, Product Managers, Actuaries",
      "保險首席技術官、產品經理、精算師",
      "保险首席技术官、产品经理、精算师"
    ),
    gradient: "from-violet-600 to-indigo-800",
    accentColor: "#7c3aed",
    topics: la(
      [
        "How ML models classify and approve claims",
        "Fraud detection: pattern recognition at scale",
        "OCR and document parsing for cashless flow",
        "Integration architecture for insurers",
        "Accuracy benchmarks vs. manual processing",
      ],
      [
        "機器學習模型如何分類和批准理賠",
        "欺詐檢測：大規模模式識別",
        "免現金流程的OCR和文件解析",
        "保險公司的整合架構",
        "與人工處理相比的準確性基準",
      ],
      [
        "机器学习模型如何分类和批准理赔",
        "欺诈检测：大规模模式识别",
        "免现金流程的OCR和文件解析",
        "保险公司的整合架构",
        "与人工处理相比的准确性基准",
      ]
    ),
    sections: [
      {
        _type: "section",
        _key: "wp2-s1",
        heading: ls(
          "Overview: The AI Claims Stack",
          "概述：AI理賠技術棧",
          "概述：AI理赔技术栈"
        ),
        body: ls(
          "Modern AI-powered claims processing involves three distinct layers: document ingestion (OCR and structured data extraction), claims classification and rules engine (ML model + policy rules), and anomaly detection (fraud and error flagging). Each layer operates independently, enabling modular integration with existing insurer systems. This whitepaper covers the technical architecture, model performance benchmarks, and integration patterns used in MixCare's production claims environment.",
          "現代AI驅動的理賠處理涉及三個不同層次：文件攝取（OCR和結構化數據提取）、理賠分類和規則引擎（機器學習模型+保單規則）以及異常檢測（欺詐和錯誤標記）。每個層次獨立運作，實現與現有保險公司系統的模塊化整合。本白皮書涵蓋MixCare生產理賠環境中使用的技術架構、模型性能基準和整合模式。",
          "现代AI驱动的理赔处理涉及三个不同层次：文件摄取（OCR和结构化数据提取）、理赔分类和规则引擎（机器学习模型+保单规则）以及异常检测（欺诈和错误标记）。每个层次独立运作，实现与现有保险公司系统的模块化整合。本白皮书涵盖MixCare生产理赔环境中使用的技术架构、模型性能基准和整合模式。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "wp2-s2",
        heading: ls(
          "Layer 1: OCR and Document Parsing",
          "第一層：OCR和文件解析",
          "第一层：OCR和文件解析"
        ),
        body: ls(
          "The first challenge in claims automation is extracting structured data from unstructured documents — receipts, referral letters, lab reports, discharge summaries. MixCare's OCR pipeline uses a fine-tuned vision transformer model trained on 500,000+ healthcare documents from the HK, SG, and MO markets. Key capabilities:",
          "理賠自動化的首要挑戰是從非結構化文件中提取結構化數據——收據、轉介信、化驗報告、出院摘要。MixCare的OCR管道使用在香港、新加坡和澳門市場的50萬多份醫療文件上訓練的微調視覺轉換器模型。主要能力：",
          "理赔自动化的首要挑战是从非结构化文件中提取结构化数据——收据、转介信、化验报告、出院摘要。MixCare的OCR管道使用在香港、新加坡和澳门市场的50万多份医疗文件上训练的微调视觉转换器模型。主要能力："
        ),
        bullets: lb(
          [
            "98.7% field extraction accuracy across GP receipts, specialist invoices, and lab reports",
            "Support for Traditional Chinese, Simplified Chinese, and English documents",
            "Automatic detection of document type (receipt, referral, lab report, etc.)",
            "Structured output: diagnosis code, procedure code, amount, date, provider ID",
            "Handles degraded documents (low-quality scans, handwritten notes)",
          ],
          [
            "全科醫生收據、專科發票和化驗報告的字段提取準確率98.7%",
            "支持繁體中文、簡體中文和英文文件",
            "自動檢測文件類型（收據、轉介信、化驗報告等）",
            "結構化輸出：診斷代碼、手術代碼、金額、日期、提供者ID",
            "處理降級文件（低質量掃描件、手寫筆記）",
          ],
          [
            "全科医生收据、专科发票和化验报告的字段提取准确率98.7%",
            "支持繁体中文、简体中文和英文文件",
            "自动检测文件类型（收据、转介信、化验报告等）",
            "结构化输出：诊断代码、手术代码、金额、日期、提供者ID",
            "处理降级文件（低质量扫描件、手写笔记）",
          ]
        ),
      },
      {
        _type: "section",
        _key: "wp2-s3",
        heading: ls(
          "Layer 2: Claims Classification Model",
          "第二層：理賠分類模型",
          "第二层：理赔分类模型"
        ),
        body: ls(
          "Once structured, each claim is processed by a gradient-boosted classification model that determines: whether the claim is covered under the policy, the correct benefit category allocation, whether pre-authorisation is required, and whether the claim meets STP (straight-through processing) criteria for auto-approval. The model is trained on MixCare's 2M+ historical claims dataset and is fine-tuned per client using their specific policy rules and coverage schedules.",
          "結構化後，每筆理賠由梯度提升分類模型處理，該模型確定：理賠是否在保單範圍內、正確的福利類別分配、是否需要預先授權，以及理賠是否符合自動批准的直通處理（STP）標準。該模型在MixCare的200萬多筆歷史理賠數據集上訓練，並使用每個客戶的特定保單規則和保障時間表進行微調。",
          "结构化后，每笔理赔由梯度提升分类模型处理，该模型确定：理赔是否在保单范围内、正确的福利类别分配、是否需要预先授权，以及理赔是否符合自动批准的直通处理（STP）标准。该模型在MixCare的200万多笔历史理赔数据集上训练，并使用每个客户的特定保单规则和保障时间表进行微调。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "wp2-s4",
        heading: ls(
          "Layer 3: Fraud and Anomaly Detection",
          "第三層：欺詐和異常檢測",
          "第三层：欺诈和异常检测"
        ),
        body: ls(
          "The anomaly detection layer runs in parallel with classification and flags statistical outliers for human review. Detection patterns include:",
          "異常檢測層與分類並行運行，並標記統計離群值供人工審查。檢測模式包括：",
          "异常检测层与分类并行运行，并标记统计离群值供人工审查。检测模式包括："
        ),
        bullets: lb(
          [
            "Duplicate claim detection (same patient, same date, same provider — within and across claims batches)",
            "Billing amount outliers (IQR-based detection by procedure type and provider)",
            "Procedure combination anomalies (medically inconsistent treatment sequences)",
            "Provider pattern analysis (unusual billing frequency or amount vs. network peers)",
            "Patient behaviour patterns (claim frequency anomalies vs. cohort baseline)",
          ],
          [
            "重複理賠檢測（同一患者、同一日期、同一提供者——在理賠批次內和跨批次）",
            "賬單金額離群值（按手術類型和提供者進行IQR基礎檢測）",
            "手術組合異常（醫學上不一致的治療序列）",
            "提供者模式分析（與網絡同行相比異常的計費頻率或金額）",
            "患者行為模式（與隊列基線相比的理賠頻率異常）",
          ],
          [
            "重复理赔检测（同一患者、同一日期、同一提供者——在理赔批次内和跨批次）",
            "账单金额离群值（按手术类型和提供者进行IQR基础检测）",
            "手术组合异常（医学上不一致的治疗序列）",
            "提供者模式分析（与网络同行相比异常的计费频率或金额）",
            "患者行为模式（与队列基线相比的理赔频率异常）",
          ]
        ),
      },
      {
        _type: "section",
        _key: "wp2-s5",
        heading: ls("Integration Architecture", "整合架構", "整合架构"),
        body: ls(
          "MixCare's claims API is a REST-based microservice deployable as a cloud-hosted SaaS or on-premises container. Integration with insurer policy administration systems typically requires: a claim submission webhook (insurer pushes new claims to MixCare API), a decision callback (MixCare returns approve/decline/escalate decision with full audit trail), and an optional panel network sync (real-time provider data feed for eligibility checks). Average integration time: 2–5 business days for standard systems; 10–20 days for legacy policy administration platforms.",
          "MixCare的理賠API是基於REST的微服務，可作為雲端託管SaaS或本地容器部署。與保險公司保單管理系統的整合通常需要：理賠提交網絡鉤子（保險公司將新理賠推送到MixCare API）、決策回調（MixCare返回帶有完整審計跟蹤的批准/拒絕/升級決策），以及可選的小組網絡同步（用於資格檢查的實時提供者數據傳輸）。平均整合時間：標準系統2-5個工作日；傳統保單管理平台10-20天。",
          "MixCare的理赔API是基于REST的微服务，可作为云端托管SaaS或本地容器部署。与保险公司保单管理系统的整合通常需要：理赔提交网络钩子（保险公司将新理赔推送到MixCare API）、决策回调（MixCare返回带有完整审计跟踪的批准/拒绝/升级决策），以及可选的小组网络同步（用于资格检查的实时提供者数据传输）。平均整合时间：标准系统2-5个工作日；传统保单管理平台10-20天。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "wp2-s6",
        heading: ls("Performance Benchmarks", "性能基準", "性能基准"),
        body: ls(
          "Production benchmarks from MixCare's insurer client base (Q4 2024):",
          "MixCare保險公司客戶群的生產基準（2024年第四季度）：",
          "MixCare保险公司客户群的生产基准（2024年第四季度）："
        ),
        bullets: lb(
          [
            "Straight-through processing rate: 84% of standard outpatient claims",
            "Average decision latency: 1.8 seconds per claim",
            "OCR extraction accuracy: 98.7%",
            "Fraud detection precision: 91% (true positive rate at 0.5 threshold)",
            "False positive rate: 4.2% (human review required but not fraud)",
            "Overall claims cost reduction vs. manual: 68–72%",
          ],
          [
            "直通處理率：84%的標準門診理賠",
            "平均決策延遲：每筆理賠1.8秒",
            "OCR提取準確率：98.7%",
            "欺詐檢測精確率：91%（0.5閾值下的真陽性率）",
            "假陽性率：4.2%（需要人工審查但非欺詐）",
            "與人工相比的整體理賠成本降低：68-72%",
          ],
          [
            "直通处理率：84%的标准门诊理赔",
            "平均决策延迟：每笔理赔1.8秒",
            "OCR提取准确率：98.7%",
            "欺诈检测精确率：91%（0.5阈值下的真阳性率）",
            "假阳性率：4.2%（需要人工审查但非欺诈）",
            "与人工相比的整体理赔成本降低：68-72%",
          ]
        ),
      },
    ],
    publishedAt: "2025-02-01",
  },

  // ── 3. Flexible Benefits Programme Guide ─────────────────────────────────────
  {
    _id: "whitepaper-flexible-benefits-programme-guide",
    _type: "whitepaper",
    slug: { _type: "slug", current: "flexible-benefits-programme-guide" },
    title: ls(
      "Building a Flexible Benefits Programme: A Step-by-Step Guide",
      "建立靈活福利計劃：循序漸進指南",
      "建立弹性福利计划：循序渐进指南"
    ),
    description: ls(
      "Practical guide for HR teams moving from traditional group plans to flexible benefits.",
      "面向從傳統團體計劃轉向靈活福利的人力資源團隊的實用指南。",
      "面向从传统团体计划转向灵活福利的人力资源团队的实用指南。"
    ),
    pages: "18 pages",
    format: "Step-by-Step Guide",
    audience: ls(
      "HR Teams, Operations Managers, Brokers",
      "人力資源團隊、營運經理、經紀商",
      "人力资源团队、营运经理、经纪商"
    ),
    gradient: "from-orange-500 to-rose-700",
    accentColor: "#ea580c",
    topics: la(
      [
        "Choosing between FSA, flex benefits, and group plans",
        "Budget structuring: top-down vs. bottom-up",
        "Vendor selection and integration checklist",
        "Employee communication playbook",
        "Measuring ROI: utilisation and satisfaction metrics",
      ],
      [
        "在FSA、彈性福利和團體計劃之間做出選擇",
        "預算結構：自上而下與自下而上",
        "供應商選擇和整合清單",
        "員工溝通手冊",
        "衡量投資回報率：使用率和滿意度指標",
      ],
      [
        "在FSA、弹性福利和团体计划之间做出选择",
        "预算结构：自上而下与自下而上",
        "供应商选择和整合清单",
        "员工沟通手册",
        "衡量投资回报率：使用率和满意度指标",
      ]
    ),
    sections: [
      {
        _type: "section",
        _key: "wp3-s1",
        heading: ls(
          "Is Flexible Benefits Right for Your Organisation?",
          "彈性福利適合您的組織嗎？",
          "弹性福利适合您的组织吗？"
        ),
        body: ls(
          "Flexible benefits work best when: your workforce has diverse demographics (multiple age groups, life stages, or locations), your current benefit utilisation is below 60%, you have HR bandwidth to manage a one-time implementation (or a platform that handles it for you), and your annual benefit budget is at least HK$2,400 per employee per year. If you're a startup with under 10 employees and a tight budget, start with an FSA wallet — it gives employees choice without the complexity of a full flex platform.",
          "彈性福利在以下情況效果最好：您的員工隊伍具有多元化人口結構（多個年齡組、生活階段或地點）、您當前的福利使用率低於60%、您有人力資源帶寬來管理一次性實施（或有平台為您處理），以及您的年度福利預算至少為每名員工每年港幣2,400元。如果您是一家員工少於10人且預算緊張的初創企業，請從FSA錢包開始——它讓員工有選擇，而不需要完整靈活平台的複雜性。",
          "弹性福利在以下情况效果最好：您的员工队伍具有多元化人口结构（多个年龄组、生活阶段或地点）、您当前的福利使用率低于60%、您有人力资源带宽来管理一次性实施（或有平台为您处理），以及您的年度福利预算至少为每名员工每年港币2,400元。如果您是一家员工少于10人且预算紧张的初创企业，请从FSA钱包开始——它让员工有选择，而不需要完整灵活平台的复杂性。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "wp3-s2",
        heading: ls(
          "Step 1: Audit Your Current Spend",
          "第一步：審計您當前的支出",
          "第一步：审计您当前的支出"
        ),
        body: ls(
          "Before designing a flexible benefits programme, understand what you currently spend and how it's being used. Run a benefit audit:",
          "在設計彈性福利計劃之前，了解您目前的支出及其使用方式。進行福利審計：",
          "在设计弹性福利计划之前，了解您目前的支出及其使用方式。进行福利审计："
        ),
        bullets: lb(
          [
            "List all current benefits and their annual cost per employee",
            "Survey employees on which benefits they actively use",
            "Identify underutilised benefits (below 30% usage) that could be replaced",
            "Calculate your total annual spend per employee",
            "Identify benefit gaps: what do your employees wish they had?",
          ],
          [
            "列出所有當前福利及其每名員工的年度成本",
            "調查員工積極使用哪些福利",
            "識別使用不足的福利（使用率低於30%）可以替換",
            "計算每名員工的總年度支出",
            "識別福利差距：您的員工希望擁有什麼？",
          ],
          [
            "列出所有当前福利及其每名员工的年度成本",
            "调查员工积极使用哪些福利",
            "识别使用不足的福利（使用率低于30%）可以替换",
            "计算每名员工的总年度支出",
            "识别福利差距：您的员工希望拥有什么？",
          ]
        ),
      },
      {
        _type: "section",
        _key: "wp3-s3",
        heading: ls(
          "Step 2: Define Your Benefit Catalogue",
          "第二步：定義您的福利目錄",
          "第二步：定义您的福利目录"
        ),
        body: ls(
          "Your catalogue is the menu of benefit categories employees can choose from. Common categories in Asia-Pacific flexible benefits programmes include: outpatient medical (GP and specialist), dental and vision, mental health and counselling, fitness and wellness, family care (childcare, eldercare), life and critical illness insurance, and financial wellness. For most companies, starting with 4–6 categories is sufficient. Avoid catalogue sprawl — too many choices leads to decision paralysis.",
          "您的目錄是員工可以從中選擇的福利類別菜單。亞太地區彈性福利計劃中的常見類別包括：門診醫療（全科醫生和專科醫生）、牙科和視力、心理健康和諮詢、健身和健康、家庭護理（兒童護理、老人護理）、人壽和危重疾病保險，以及財務健康。對於大多數公司，從4-6個類別開始就足夠了。避免目錄蔓延——太多的選擇會導致決策癱瘓。",
          "您的目录是员工可以从中选择的福利类别菜单。亚太地区弹性福利计划中的常见类别包括：门诊医疗（全科医生和专科医生）、牙科和视力、心理健康和咨询、健身和健康、家庭护理（儿童护理、老人护理）、人寿和危重疾病保险，以及财务健康。对于大多数公司，从4-6个类别开始就足够了。避免目录蔓延——太多的选择会导致决策瘫痪。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "wp3-s4",
        heading: ls("Step 3: Budget Structuring", "第三步：預算結構", "第三步：预算结构"),
        body: ls(
          "There are two approaches to flexible benefits budgeting:",
          "彈性福利預算有兩種方法：",
          "弹性福利预算有两种方法："
        ),
        bullets: lb(
          [
            "Top-down: Set a total budget per employee (e.g., HK$5,000/year) and let employees allocate freely across categories. Simplest to administer, hardest to forecast by category.",
            "Bottom-up: Set minimums per category (e.g., at least HK$1,200 to outpatient) and flexible top-up for the remainder. Ensures core coverage while giving choice on discretionary spend.",
            "Most MixCare clients use a hybrid: a mandatory core (outpatient + life) plus a flexible 'wallet' for everything else.",
          ],
          [
            "自上而下：設定每名員工的總預算（例如，每年港幣5,000元），讓員工在各類別之間自由分配。最易管理，最難按類別預測。",
            "自下而上：設定每個類別的最低限額（例如，門診至少港幣1,200元）以及剩餘部分的靈活補充。確保核心保障同時在可支配支出上給予選擇。",
            "大多數MixCare客戶使用混合方式：強制核心（門診+人壽）加上其他一切的靈活「錢包」。",
          ],
          [
            "自上而下：设定每名员工的总预算（例如，每年港币5,000元），让员工在各类别之间自由分配。最易管理，最难按类别预测。",
            "自下而上：设定每个类别的最低限额（例如，门诊至少港币1,200元）以及剩余部分的灵活补充。确保核心保障同时在可支配支出上给予选择。",
            "大多数MixCare客户使用混合方式：强制核心（门诊+人寿）加上其他一切的灵活「钱包」。",
          ]
        ),
      },
      {
        _type: "section",
        _key: "wp3-s5",
        heading: ls(
          "Step 4: Employee Communication",
          "第四步：員工溝通",
          "第四步：员工沟通"
        ),
        body: ls(
          "The #1 reason flexible benefits programmes fail is poor communication. The most effective communication sequence: (1) CEO/HR email announcing the change and the reason (benefit choice = trust in employees), (2) a short explainer video (2–3 minutes) showing how to use the platform, (3) an FAQ document covering the most common questions, (4) manager briefing so line managers can answer questions, and (5) a 'go-live day' reminder with a direct link to the platform. Plan at least 3 touchpoints before the go-live date.",
          "彈性福利計劃失敗的首要原因是溝通不暢。最有效的溝通順序：（1）CEO/HR電子郵件宣布變更及原因（福利選擇=對員工的信任），（2）展示如何使用平台的簡短解說視頻（2-3分鐘），（3）涵蓋最常見問題的FAQ文件，（4）直線經理簡報以便回答問題，以及（5）含直接鏈接到平台的「上線日」提醒。計劃在上線日期前至少3個接觸點。",
          "弹性福利计划失败的首要原因是沟通不畅。最有效的沟通顺序：（1）CEO/HR电子邮件宣布变更及原因（福利选择=对员工的信任），（2）展示如何使用平台的简短解说视频（2-3分钟），（3）涵盖最常见问题的FAQ文件，（4）直线经理简报以便回答问题，以及（5）含直接链接到平台的「上线日」提醒。计划在上线日期前至少3个接触点。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "wp3-s6",
        heading: ls("Step 5: Measuring ROI", "第五步：衡量投資回報率", "第五步：衡量投资回报率"),
        body: ls(
          "Track these metrics in the first 6 months post-launch:",
          "在推出後的前6個月追蹤這些指標：",
          "在推出后的前6个月追踪这些指标："
        ),
        bullets: lb(
          [
            "Benefit utilisation rate (target: >75% in first quarter)",
            "Category allocation spread (are employees using all categories or just one?)",
            "Employee satisfaction score with benefits (run a 3-question pulse survey)",
            "HR admin time on benefit operations (compare to pre-launch baseline)",
            "Voluntary turnover rate (compare to prior 6-month period)",
            "Benefits-related HR query volume (should decline as employees self-serve)",
          ],
          [
            "福利使用率（目標：第一季度超過75%）",
            "類別分配分佈（員工是使用所有類別還是只使用一個？）",
            "員工福利滿意度評分（進行3個問題的脈衝調查）",
            "福利運營的HR行政時間（與上線前基準比較）",
            "自願離職率（與前6個月期間比較）",
            "與福利相關的HR查詢量（隨著員工自助服務應下降）",
          ],
          [
            "福利使用率（目标：第一季度超过75%）",
            "类别分配分布（员工是使用所有类别还是只使用一个？）",
            "员工福利满意度评分（进行3个问题的脉冲调查）",
            "福利运营的HR行政时间（与上线前基准比较）",
            "自愿离职率（与前6个月期间比较）",
            "与福利相关的HR查询量（随着员工自助服务应下降）",
          ]
        ),
      },
    ],
    publishedAt: "2025-03-01",
  },
];

async function main() {
  console.log(`Seeding ${whitepapers.length} whitepapers...`);
  for (const wp of whitepapers) {
    await client.createOrReplace(wp);
    console.log(`  ✓ ${wp._id}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
