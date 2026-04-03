/**
 * Seed script — populates Sanity with 3 multilingual case studies.
 * Run with: npx tsx scripts/seed-case-studies.ts
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

const caseStudies = [
  // ── 1. AXA Hong Kong ────────────────────────────────────────────────────────
  {
    _id: "case-study-axa-hong-kong-ai-claims",
    _type: "caseStudy",
    slug: { _type: "slug", current: "axa-hong-kong-ai-claims" },
    company: ls("AXA Hong Kong", "香港AXA", "香港AXA"),
    segment: ls("Insurer", "保險公司", "保险公司"),
    headline: ls(
      "70% reduction in claims processing cost with AI-powered self-funded outpatient",
      "AI驅動的自付門診計劃降低70%理賠處理成本",
      "AI驱动的自付门诊计划降低70%理赔处理成本"
    ),
    result: ls(
      "Claims resolved in <18 hours, fraud down 60%",
      "理賠在18小時內解決，欺詐下降60%",
      "理赔在18小时内解决，欺诈下降60%"
    ),
    description: ls(
      "How AXA Hong Kong modernised their self-funded outpatient scheme with AI-powered claims processing.",
      "香港AXA如何以AI驅動的理賠處理現代化其自付門診計劃",
      "香港AXA如何以AI驱动的理赔处理现代化其自付门诊计划"
    ),
    color: "#0d9488",
    gradient: "from-teal-600 to-cyan-800",
    challenge: ls(
      "Processing thousands of monthly outpatient claims manually was slow, costly, and fraud-prone. AXA needed a scalable, digital-first solution to modernise their self-funded outpatient scheme.",
      "每月手動處理數千張門診理賠既緩慢、昂貴，又容易發生欺詐。AXA需要一個可擴展的數字優先解決方案來現代化其自付門診計劃。",
      "每月手动处理数千张门诊理赔既缓慢、昂贵，又容易发生欺诈。AXA需要一个可扩展的数字优先解决方案来现代化其自付门诊计划。"
    ),
    approach: ls(
      "MixCare integrated its AI claims engine directly with AXA's existing systems. The AI model reviews claim documents, cross-references against a 2,000+ panel doctor network, and flags anomalies in real time.",
      "MixCare將其AI理賠引擎直接與AXA的現有系統整合。AI模型審查理賠文件，與2,000多個小組醫生網絡交叉核對，並實時標記異常。",
      "MixCare将其AI理赔引擎直接与AXA的现有系统整合。AI模型审查理赔文件，与2,000多个小组医生网络交叉核对，并实时标记异常。"
    ),
    outcomes: [
      {
        _key: "outcome-axa-1",
        value: "70%",
        label: ls("Claims processing cost reduction", "理賠處理成本降低", "理赔处理成本降低"),
      },
      {
        _key: "outcome-axa-2",
        value: "<18h",
        label: ls("Average claim resolution time", "平均理賠解決時間", "平均理赔解决时间"),
      },
      {
        _key: "outcome-axa-3",
        value: "60%",
        label: ls("Reduction in fraudulent claims", "欺詐理賠減少", "欺诈理赔减少"),
      },
      {
        _key: "outcome-axa-4",
        value: "99.2%",
        label: ls("Platform uptime", "平台運行時間", "平台运行时间"),
      },
    ],
    sections: [
      {
        _type: "section",
        _key: "cs1-s1",
        heading: ls(
          "The Challenge: Manual Claims at Scale",
          "挑戰：大規模人工理賠",
          "挑战：大规模人工理赔"
        ),
        body: ls(
          "AXA Hong Kong manages thousands of outpatient claims monthly across their corporate client base. Before MixCare, each claim required manual document review, panel doctor verification, and line-by-line coverage checking. The process averaged 5.2 days per claim and required a dedicated operations team of 18 people. As the self-funded outpatient portfolio grew, it became clear the manual model couldn't scale without proportional headcount increases.",
          "香港AXA每月為其企業客戶群管理數千張門診理賠。在使用MixCare之前，每筆理賠需要人工審查文件、驗證小組醫生資格以及逐行核查保障範圍。該流程每筆理賠平均需要5.2天，並需要一支18人的專職運營團隊。隨著自付門診投資組合的增長，顯然人工模式若不按比例增加人手便無法擴展。",
          "香港AXA每月为其企业客户群管理数千张门诊理赔。在使用MixCare之前，每笔理赔需要人工审查文件、验证小组医生资格以及逐行核查保障范围。该流程每笔理赔平均需要5.2天，并需要一支18人的专职运营团队。随着自付门诊投资组合的增长，显然人工模式若不按比例增加人手便无法扩展。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "cs1-s2",
        heading: ls("Why AI-First Processing?", "為什麼選擇AI優先處理？", "为什么选择AI优先处理？"),
        body: ls(
          "AXA's product team evaluated three approaches: hiring more reviewers, outsourcing to a third-party processing house, and deploying AI-native claims technology. The first two options offered incremental improvement at linear cost. AI offered the prospect of exponential throughput with near-zero marginal cost per claim. After a 90-day pilot with MixCare, the decision was clear.",
          "AXA的產品團隊評估了三種方案：僱用更多審核員、外包給第三方處理機構，以及部署AI原生理賠技術。前兩種方案以線性成本提供漸進式改善。AI則提供了以近乎零邊際成本實現指數級吞吐量的前景。在與MixCare進行90天試點後，決定已十分明確。",
          "AXA的产品团队评估了三种方案：雇用更多审核员、外包给第三方处理机构，以及部署AI原生理赔技术。前两种方案以线性成本提供渐进式改善。AI则提供了以近乎零边际成本实现指数级吞吐量的前景。在与MixCare进行90天试点后，决定已十分明确。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "cs1-s3",
        heading: ls("The MixCare Integration", "MixCare整合", "MixCare整合"),
        body: ls(
          "MixCare's claims engine was integrated with AXA's policy administration system via REST API. The integration was completed in 4 business days. The AI model was pre-trained on MixCare's claims dataset (2M+ historical claims) and fine-tuned on AXA's panel doctor network and coverage rules. Within the first month, the model achieved 94% straight-through processing accuracy.",
          "MixCare的理賠引擎通過REST API與AXA的保單管理系統整合。整合在4個工作日內完成。AI模型在MixCare的理賠數據集（超過200萬筆歷史理賠）上進行預訓練，並根據AXA的小組醫生網絡和保障規則進行微調。在第一個月內，該模型達到94%的直通處理準確率。",
          "MixCare的理赔引擎通过REST API与AXA的保单管理系统整合。整合在4个工作日内完成。AI模型在MixCare的理赔数据集（超过200万笔历史理赔）上进行预训练，并根据AXA的小组医生网络和保障规则进行微调。在第一个月内，该模型达到94%的直通处理准确率。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "cs1-s4",
        heading: ls("Key Results", "主要成果", "主要成果"),
        body: ls(
          "After 12 months of live operation across AXA's full corporate portfolio:",
          "在AXA全企業投資組合實際運營12個月後：",
          "在AXA全企业投资组合实际运营12个月后："
        ),
        bullets: lb(
          [
            "Claims processing cost: down 70% year-on-year",
            "Average resolution time: 5.2 days → 17.4 hours",
            "Fraudulent claims detected: up 60% (previously undetected)",
            "Straight-through processing: 84% of standard claims",
            "Employee satisfaction with claims: +38 percentage points",
            "Platform uptime: 99.2% across all touchpoints",
          ],
          [
            "理賠處理成本：同比下降70%",
            "平均解決時間：5.2天→17.4小時",
            "欺詐理賠檢測：增加60%（此前未被發現）",
            "直通處理：84%的標準理賠",
            "員工對理賠的滿意度：提高38個百分點",
            "平台正常運行時間：所有接觸點99.2%",
          ],
          [
            "理赔处理成本：同比下降70%",
            "平均解决时间：5.2天→17.4小时",
            "欺诈理赔检测：增加60%（此前未被发现）",
            "直通处理：84%的标准理赔",
            "员工对理赔的满意度：提高38个百分点",
            "平台正常运行时间：所有接触点99.2%",
          ]
        ),
      },
      {
        _type: "section",
        _key: "cs1-s5",
        heading: ls("What's Next", "下一步", "下一步"),
        body: ls(
          "AXA and MixCare are now deploying the same AI claims engine for specialist and hospitalisation claims — historically more complex to automate due to pre-authorisation requirements. The target: straight-through processing for 70% of specialist claims by end of 2025.",
          "AXA和MixCare現正為專科及住院理賠部署同一AI理賠引擎——由於預先授權要求，這些理賠歷來較難自動化。目標：到2025年底實現70%專科理賠的直通處理。",
          "AXA和MixCare现正为专科及住院理赔部署同一AI理赔引擎——由于预先授权要求，这些理赔历来较难自动化。目标：到2025年底实现70%专科理赔的直通处理。"
        ),
        bullets: lb([], [], []),
      },
    ],
    publishedAt: "2025-01-15",
  },

  // ── 2. Jardine Matheson ──────────────────────────────────────────────────────
  {
    _id: "case-study-jardine-matheson-flexible-benefits",
    _type: "caseStudy",
    slug: { _type: "slug", current: "jardine-matheson-flexible-benefits" },
    company: ls("Jardine Matheson", "怡和集團", "怡和集团"),
    segment: ls("Enterprise", "大型企業", "大型企业"),
    headline: ls(
      "Benefit utilisation jumped from 40% to 92% after switching to flexible benefits",
      "切換至彈性福利後，福利使用率從40%躍升至92%",
      "切换至弹性福利后，福利使用率从40%跃升至92%"
    ),
    result: ls(
      "Employee satisfaction +45%, admin time down 70%",
      "員工滿意度+45%，管理時間減少70%",
      "员工满意度+45%，管理时间减少70%"
    ),
    description: ls(
      "How Jardine Matheson consolidated 40+ benefit vendors into one flexible platform and tripled engagement.",
      "怡和集團如何將40多個福利供應商整合到一個靈活的平台上，並使參與度提高了三倍",
      "怡和集团如何将40多个福利供应商整合到一个灵活的平台上，并使参与度提高了三倍"
    ),
    color: "#1e3a5f",
    gradient: "from-blue-700 to-indigo-900",
    challenge: ls(
      "With 12 offices and a diverse workforce, Jardine's HR team was managing over 40 benefit vendors. Employee utilisation was just 40% despite significant annual investment.",
      "擁有12個辦事處和多元化員工隊伍，怡和的人力資源團隊管理著40多個福利供應商。儘管每年投入大量資金，員工使用率僅為40%。",
      "拥有12个办事处和多元化员工队伍，怡和的人力资源团队管理着40多个福利供应商。尽管每年投入大量资金，员工使用率仅为40%。"
    ),
    approach: ls(
      "MixCare deployed its flexible benefits engine with a single employee self-selection portal, integrating all vendors under one platform with real-time utilisation dashboards.",
      "MixCare部署了其彈性福利引擎，配備單一員工自選門戶，將所有供應商整合在一個平台上，並提供實時使用儀表板。",
      "MixCare部署了其弹性福利引擎，配备单一员工自选门户，将所有供应商整合在一个平台上，并提供实时使用仪表板。"
    ),
    outcomes: [
      {
        _key: "outcome-jardine-1",
        value: "40%→92%",
        label: ls("Benefit utilisation", "福利使用率", "福利使用率"),
      },
      {
        _key: "outcome-jardine-2",
        value: "+45%",
        label: ls("Employee satisfaction", "員工滿意度", "员工满意度"),
      },
      {
        _key: "outcome-jardine-3",
        value: "70%",
        label: ls("HR admin time reduction", "人力資源管理時間減少", "人力资源管理时间减少"),
      },
      {
        _key: "outcome-jardine-4",
        value: "12",
        label: ls("Offices on one platform", "辦事處整合在一個平台上", "办事处整合在一个平台上"),
      },
    ],
    sections: [
      {
        _type: "section",
        _key: "cs2-s1",
        heading: ls("The Problem: Benefit Sprawl", "問題：福利蔓延", "问题：福利蔓延"),
        body: ls(
          "Jardine Matheson operates across 12 offices in Hong Kong, Singapore, and Macau with a workforce spanning five generations and dozens of nationalities. Over the years, HR had accumulated over 40 separate benefit vendors — medical, dental, vision, fitness, mental health, life insurance, and more — each with its own contract, invoice, and reporting format. Despite spending HK$8,200 per employee per year, utilisation surveys showed only 40% of employees were actively using any benefit beyond basic medical.",
          "怡和集團在香港、新加坡和澳門的12個辦事處運營，員工涵蓋五個世代和數十個國籍。多年來，人力資源部門積累了40多個獨立的福利供應商——醫療、牙科、視力、健身、心理健康、人壽保險等——每個都有自己的合同、發票和報告格式。儘管每名員工每年花費港幣8,200元，使用率調查顯示只有40%的員工積極使用基本醫療以外的任何福利。",
          "怡和集团在香港、新加坡和澳门的12个办事处运营，员工涵盖五个世代和数十个国籍。多年来，人力资源部门积累了40多个独立的福利供应商——医疗、牙科、视力、健身、心理健康、人寿保险等——每个都有自己的合同、发票和报告格式。尽管每名员工每年花费港币8,200元，使用率调查显示只有40%的员工积极使用基本医疗以外的任何福利。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "cs2-s2",
        heading: ls("Root Cause Analysis", "根本原因分析", "根本原因分析"),
        body: ls(
          "MixCare's benefits audit revealed three root causes of low utilisation: benefit discovery (employees didn't know what was available), access friction (each benefit required a separate login, card, or form), and relevance mismatch (a 29-year-old in Singapore had the same plan as a 52-year-old in Hong Kong). The solution required a unified platform with personalisation — not just a better vendor list.",
          "MixCare的福利審計揭示了低使用率的三個根本原因：福利發現（員工不知道有什麼可用的）、訪問摩擦（每項福利需要單獨的登錄、卡或表格），以及相關性不匹配（新加坡29歲員工與香港52歲員工使用相同的計劃）。解決方案需要一個具有個性化功能的統一平台——而不僅僅是更好的供應商列表。",
          "MixCare的福利审计揭示了低使用率的三个根本原因：福利发现（员工不知道有什么可用的）、访问摩擦（每项福利需要单独的登录、卡或表格），以及相关性不匹配（新加坡29岁员工与香港52岁员工使用相同的计划）。解决方案需要一个具有个性化功能的统一平台——而不仅仅是更好的供应商列表。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "cs2-s3",
        heading: ls(
          "Flexible Benefits Implementation",
          "彈性福利實施",
          "弹性福利实施"
        ),
        body: ls(
          "MixCare deployed its flexible benefits engine in two phases. Phase 1 (weeks 1–3): vendor integration — all 40+ existing vendors connected via API or data feed. Phase 2 (weeks 4–6): employee onboarding — each employee received a personalised benefit wallet with their annual allowance and a curated catalogue to choose from. The HR team managed the entire setup through MixCare's admin portal with no coding required.",
          "MixCare分兩個階段部署了其彈性福利引擎。第一階段（第1-3週）：供應商整合——所有40多個現有供應商通過API或數據傳輸連接。第二階段（第4-6週）：員工入職——每位員工獲得個性化福利錢包，包含年度津貼和精選目錄供選擇。人力資源團隊通過MixCare的管理門戶管理整個設置，無需編碼。",
          "MixCare分两个阶段部署了其弹性福利引擎。第一阶段（第1-3周）：供应商整合——所有40多个现有供应商通过API或数据传输连接。第二阶段（第4-6周）：员工入职——每位员工获得个性化福利钱包，包含年度津贴和精选目录供选择。人力资源团队通过MixCare的管理门户管理整个设置，无需编码。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "cs2-s4",
        heading: ls("Results After Two Quarters", "兩個季度後的成果", "两个季度后的成果"),
        body: ls(
          "Six months after full deployment:",
          "全面部署六個月後：",
          "全面部署六个月后："
        ),
        bullets: lb(
          [
            "Overall benefit utilisation: 40% → 92%",
            "Employee satisfaction with benefits: +45 percentage points",
            "HR admin time on benefit operations: down 70%",
            "Vendor invoice processing: consolidated from 40+ to 1 monthly payment",
            "Benefit-related HR queries: down 58%",
            "All 12 offices on a unified platform with single sign-on",
          ],
          [
            "整體福利使用率：40% → 92%",
            "員工對福利的滿意度：提高45個百分點",
            "福利運營HR行政時間：減少70%",
            "供應商發票處理：從40多張合併為每月1次付款",
            "與福利相關的HR查詢：減少58%",
            "所有12個辦事處使用單一登錄的統一平台",
          ],
          [
            "整体福利使用率：40% → 92%",
            "员工对福利的满意度：提高45个百分点",
            "福利运营HR行政时间：减少70%",
            "供应商发票处理：从40多张合并为每月1次付款",
            "与福利相关的HR查询：减少58%",
            "所有12个办事处使用单一登录的统一平台",
          ]
        ),
      },
      {
        _type: "section",
        _key: "cs2-s5",
        heading: ls("The Business Case", "業務案例", "业务案例"),
        body: ls(
          "Jardine's CFO requested an ROI analysis after the first year. The result: the same HK$8,200 per employee benefit budget now delivered 2.3× the perceived value to employees (measured by benefit satisfaction surveys). Admin cost savings (HR time, vendor management) offset 40% of the platform fee. And voluntary turnover in the 12 months post-deployment was 14% lower than the prior year — attributable in part to improved benefit satisfaction.",
          "怡和的財務總監在第一年後要求進行投資回報率分析。結果：同樣的每名員工港幣8,200元福利預算現在為員工提供了2.3倍的感知價值（通過福利滿意度調查衡量）。行政成本節省（HR時間、供應商管理）抵消了平台費用的40%。部署後12個月的自願離職率比前一年低14%——部分歸因於福利滿意度的提升。",
          "怡和的财务总监在第一年后要求进行投资回报率分析。结果：同样的每名员工港币8,200元福利预算现在为员工提供了2.3倍的感知价值（通过福利满意度调查衡量）。行政成本节省（HR时间、供应商管理）抵消了平台费用的40%。部署后12个月的自愿离职率比前一年低14%——部分归因于福利满意度的提升。"
        ),
        bullets: lb([], [], []),
      },
    ],
    publishedAt: "2025-02-10",
  },

  // ── 3. TechBridge HK ─────────────────────────────────────────────────────────
  {
    _id: "case-study-techbridge-hk-smb-benefits",
    _type: "caseStudy",
    slug: { _type: "slug", current: "techbridge-hk-smb-benefits" },
    company: ls("TechBridge HK", "TechBridge HK", "TechBridge HK"),
    segment: ls("SMB (25 employees)", "中小企業（25名員工）", "中小企业（25名员工）"),
    headline: ls(
      "How a 25-person startup attracted senior talent with enterprise-grade benefits",
      "一家25人初創公司如何以企業級福利吸引資深人才",
      "一家25人初创公司如何以企业级福利吸引资深人才"
    ),
    result: ls(
      "2 senior hires retained vs. larger competitors, setup in 1 day",
      "相比大型競爭對手留住了2名資深招聘人員，當天完成設置",
      "相比大型竞争对手留住了2名资深招聘人员，当天完成设置"
    ),
    description: ls(
      "How a 25-person startup deployed enterprise-grade benefits in 60 minutes and started winning talent from larger competitors.",
      "一家25人初創公司如何在60分鐘內部署企業級福利，並開始從大型競爭對手處贏得人才",
      "一家25人初创公司如何在60分钟内部署企业级福利，并开始从大型竞争对手处赢得人才"
    ),
    color: "#f97316",
    gradient: "from-orange-500 to-rose-700",
    challenge: ls(
      "TechBridge was losing senior engineering candidates to larger competitors with better benefit packages. As a 25-person startup, traditional group insurance was cost-prohibitive.",
      "TechBridge因為大型競爭對手提供更好的福利套餐而失去資深工程候選人。作為一家25人的初創公司，傳統團體保險費用過高。",
      "TechBridge因为大型竞争对手提供更好的福利套餐而失去资深工程候选人。作为一家25人的初创公司，传统团体保险费用过高。"
    ),
    approach: ls(
      "MixCare's SMB Starter plan gave TechBridge enterprise-grade flexible benefits, including FSA wallets and wellness marketplace access, deployed and running in under one day.",
      "MixCare的中小企業入門計劃為TechBridge提供了企業級靈活福利，包括FSA錢包和健康市場訪問，在一天內部署並運行。",
      "MixCare的中小企业入门计划为TechBridge提供了企业级灵活福利，包括FSA钱包和健康市场访问，在一天内部署并运行。"
    ),
    outcomes: [
      {
        _key: "outcome-tb-1",
        value: "<60min",
        label: ls("Setup time", "設置時間", "设置时间"),
      },
      {
        _key: "outcome-tb-2",
        value: "2",
        label: ls(
          "Senior hires retained vs. competitors",
          "相比競爭對手留住的資深人才",
          "相比竞争对手留住的资深人才"
        ),
      },
      {
        _key: "outcome-tb-3",
        value: "30%",
        label: ls(
          "Lower cost vs. group plans",
          "低於團體計劃的成本",
          "低于团体计划的成本"
        ),
      },
      {
        _key: "outcome-tb-4",
        value: "100%",
        label: ls(
          "Employee adoption in first month",
          "第一個月員工採用率",
          "第一个月员工采用率"
        ),
      },
    ],
    sections: [
      {
        _type: "section",
        _key: "cs3-s1",
        heading: ls(
          "Competing for Talent as a 25-Person Startup",
          "作為25人初創企業參與人才競爭",
          "作为25人初创企业参与人才竞争"
        ),
        body: ls(
          "TechBridge HK is a fintech startup founded in 2022. By early 2024, the team had grown to 25 engineers and product managers. The founders were proud of their culture and equity package — but were losing final-round candidates to banks and larger tech companies that offered comprehensive health benefits. Two senior engineer candidates turned down offers specifically citing benefits as the reason. TechBridge needed a solution that was enterprise-grade but startup-affordable.",
          "TechBridge HK是一家成立於2022年的金融科技初創企業。到2024年初，團隊已發展到25名工程師和產品經理。創辦人為他們的文化和股權套餐感到自豪——但在最終一輪中卻輸給了提供全面健康福利的銀行和大型科技公司。兩名資深工程師候選人拒絕了邀約，明確表示福利是原因。TechBridge需要一個企業級但適合初創企業預算的解決方案。",
          "TechBridge HK是一家成立于2022年的金融科技初创企业。到2024年初，团队已发展到25名工程师和产品经理。创始人为他们的文化和股权套餐感到自豪——但在最终一轮中却输给了提供全面健康福利的银行和大型科技公司。两名资深工程师候选人拒绝了邀约，明确表示福利是原因。TechBridge需要一个企业级但适合初创企业预算的解决方案。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "cs3-s2",
        heading: ls(
          "Why Traditional Group Insurance Didn't Work",
          "為什麼傳統團體保險行不通",
          "为什么传统团体保险行不通"
        ),
        body: ls(
          "TechBridge's operations manager explored traditional group medical insurance with three brokers. The feedback was consistent: minimum 10-employee headcount (met), annual contracts (problematic for a growing startup), and premiums of HK$4,200–6,800 per employee per year with fixed, inflexible coverage. For a startup team spanning ages 24–41 with diverse health priorities, a one-size plan felt like a waste. And the broker process alone took three weeks.",
          "TechBridge的運營經理與三家經紀公司探討了傳統團體醫療保險。反饋一致：最低10名員工要求（已達到）、年度合同（對成長中的初創企業來說是個問題），以及每名員工每年港幣4,200-6,800元的保費，保障固定且不靈活。對於一個年齡在24-41歲之間、健康優先事項各異的初創團隊來說，一刀切的計劃感覺是種浪費。光是經紀流程就花了三週時間。",
          "TechBridge的运营经理与三家经纪公司探讨了传统团体医疗保险。反馈一致：最低10名员工要求（已达到）、年度合同（对成长中的初创企业来说是个问题），以及每名员工每年港币4,200-6,800元的保费，保障固定且不灵活。对于一个年龄在24-41岁之间、健康优先事项各异的初创团队来说，一刀切的计划感觉是种浪费。光是经纪流程就花了三周时间。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "cs3-s3",
        heading: ls(
          "MixCare SMB Starter: Setup in 60 Minutes",
          "MixCare中小企業入門計劃：60分鐘完成設置",
          "MixCare中小企业入门计划：60分钟完成设置"
        ),
        body: ls(
          "TechBridge signed up for MixCare's SMB Starter plan on a Tuesday afternoon. By that evening, all 25 employees had received an email with their benefit wallet and app download link. The setup process: company registration (10 minutes), employee roster upload (15 minutes), benefit budget configuration (20 minutes), and employee communications (15 minutes). Total time: under 60 minutes. No broker, no underwriting, no contract.",
          "TechBridge在一個星期二下午簽約了MixCare的中小企業入門計劃。到當天晚上，所有25名員工都收到了包含福利錢包和應用程式下載鏈接的電子郵件。設置流程：公司注冊（10分鐘）、員工名單上傳（15分鐘）、福利預算配置（20分鐘）和員工溝通（15分鐘）。總時間：不足60分鐘。無需經紀、無需核保、無需合同。",
          "TechBridge在一个星期二下午签约了MixCare的中小企业入门计划。到当天晚上，所有25名员工都收到了包含福利钱包和应用程序下载链接的电子邮件。设置流程：公司注册（10分钟）、员工名单上传（15分钟）、福利预算配置（20分钟）和员工沟通（15分钟）。总时间：不足60分钟。无需经纪、无需核保、无需合同。"
        ),
        bullets: lb([], [], []),
      },
      {
        _type: "section",
        _key: "cs3-s4",
        heading: ls("What Employees Got", "員工獲得了什麼", "员工获得了什么"),
        body: ls(
          "Each employee received an annual benefit wallet of HK$4,800 — below the cost of a traditional group plan — but covering a much broader range of choices:",
          "每位員工獲得了港幣4,800元的年度福利錢包——低於傳統團體計劃的成本——但涵蓋了更廣泛的選擇：",
          "每位员工获得了港币4,800元的年度福利钱包——低于传统团体计划的成本——但涵盖了更广泛的选择："
        ),
        bullets: lb(
          [
            "GP and specialist consultations (cashless via panel)",
            "Dental and vision care",
            "Mental health counselling and therapy apps",
            "Gym memberships and fitness classes",
            "Traditional Chinese Medicine and physiotherapy",
            "Health screening packages",
          ],
          [
            "全科及專科門診（通過小組醫生免現金就診）",
            "牙科和視力護理",
            "心理健康諮詢和治療應用程式",
            "健身房會員資格和健身課程",
            "中醫和物理治療",
            "健康檢查套餐",
          ],
          [
            "全科及专科门诊（通过小组医生免现金就诊）",
            "牙科和视力护理",
            "心理健康咨询和治疗应用程序",
            "健身房会员资格和健身课程",
            "中医和物理治疗",
            "健康检查套餐",
          ]
        ),
      },
      {
        _type: "section",
        _key: "cs3-s5",
        heading: ls("Business Impact", "業務影響", "业务影响"),
        body: ls(
          "Within 30 days of launch, 100% of employees had activated their benefit wallet and made at least one claim or booking. The next two senior engineer candidates who received offers accepted — both later told HR that benefits were a positive factor. Total benefit cost: HK$4,800 per employee per year — 30% below the comparable group plan quotes TechBridge had received.",
          "推出後30天內，100%的員工激活了其福利錢包並至少提交了一次理賠或預約。接下來兩位收到邀約的資深工程師候選人都接受了——兩人後來都告訴人力資源部門，福利是一個積極因素。福利總成本：每名員工每年港幣4,800元——比TechBridge收到的可比團體計劃報價低30%。",
          "推出后30天内，100%的员工激活了其福利钱包并至少提交了一次理赔或预约。接下来两位收到邀约的资深工程师候选人都接受了——两人后来都告诉人力资源部门，福利是一个积极因素。福利总成本：每名员工每年港币4,800元——比TechBridge收到的可比团体计划报价低30%。"
        ),
        bullets: lb([], [], []),
      },
    ],
    publishedAt: "2025-03-05",
  },
];

async function main() {
  console.log(`Seeding ${caseStudies.length} case studies...`);
  for (const cs of caseStudies) {
    await client.createOrReplace(cs);
    console.log(`  ✓ ${cs._id}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
