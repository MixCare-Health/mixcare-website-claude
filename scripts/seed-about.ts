/**
 * Seed About Page + Team Members to Sanity
 * Run: npx tsx scripts/seed-about.ts
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
  console.log("Seeding about page...");

  // ── About Page Singleton ──────────────────────────────────────────────────
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    hero: {
      badge: {
        en: "Our Story",
        zhTW: "我們的故事",
        zhCN: "我们的故事",
      },
      headline: {
        en: "Transforming health benefits",
        zhTW: "轉型亞太地區的",
        zhCN: "转型亚太地区的",
      },
      headlineHighlight: {
        en: "across Asia-Pacific",
        zhTW: "健康福利",
        zhCN: "健康福利",
      },
      sub: {
        en: "MixCare Health was founded with a single conviction: the way health benefits are delivered in Asia is broken — and AI can fix it.",
        zhTW: "MixCare Health 的創立源於一個堅定信念：亞洲健康福利的交付方式已經破碎——而 AI 能夠修復它。",
        zhCN: "MixCare Health 的创立源于一个坚定信念：亚洲健康福利的交付方式已经破碎——而 AI 能够修复它。",
      },
    },
    story: {
      headline: {
        en: "Our founding story",
        zhTW: "我們的創業故事",
        zhCN: "我们的创业故事",
      },
      p1: {
        en: "In 2019, our founders spent months watching the same story play out: employees across Hong Kong and Singapore had health benefit packages that looked impressive on paper but were a frustrating experience in practice. Complex reimbursement forms, three-week claim windows, and rigid plan structures that reflected actuarial models rather than how people actually live.",
        zhTW: "2019 年，我們的創辦人花了數月時間觀察同樣的故事反覆上演：香港和新加坡的員工擁有看起來令人印象深刻的健康福利套餐，但實際體驗卻令人沮喪。複雜的報銷表格、三週的理賠窗口，以及反映精算模型而非人們實際生活的僵化方案結構。",
        zhCN: "2019 年，我们的创始人花了数月时间观察同样的故事反复上演：香港和新加坡的员工拥有看起来令人印象深刻的健康福利套餐，但实际体验却令人沮丧。复杂的报销表格、三周的理赔窗口，以及反映精算模型而非人们实际生活的僵化方案结构。",
      },
      p2: {
        en: "Meanwhile, the technology to fix this existed. AI could process claims in minutes, not weeks. Marketplace platforms could connect employees to exactly the wellness services they needed. Flexible spending accounts could let individuals decide what mattered most to them — not a committee.",
        zhTW: "與此同時，解決這一問題的技術已經存在。AI 可以在幾分鐘而非數週內處理理賠。市場平台可以將員工與他們所需的健康服務精準連接。靈活支出帳戶可以讓個人決定什麼對他們最重要——而非由委員會決定。",
        zhCN: "与此同时，解决这一问题的技术已经存在。AI 可以在几分钟而非数周内处理理赔。市场平台可以将员工与他们所需的健康服务精准连接。灵活支出账户可以让个人决定什么对他们最重要——而非由委员会决定。",
      },
      p3: {
        en: "MixCare Health was built to bridge that gap. We've served over 200 corporate clients across Hong Kong, Macau, and Singapore — from 5-person startups to multinationals with 10,000 employees — and we're just getting started.",
        zhTW: "MixCare Health 正是為了填補這一差距而生。我們已服務香港、澳門和新加坡逾 200 家企業客戶——從 5 人初創企業到擁有 10,000 名員工的跨國公司——而我們才剛剛起步。",
        zhCN: "MixCare Health 正是为了填补这一差距而生。我们已服务香港、澳门和新加坡逾 200 家企业客户——从 5 人初创企业到拥有 10,000 名员工的跨国公司——而我们才刚刚起步。",
      },
    },
    stats: [
      { _key: "stat-founded", value: "2019", label: { en: "Founded in Hong Kong", zhTW: "創立於香港", zhCN: "创立于香港" } },
      { _key: "stat-clients", value: "200+", label: { en: "Corporate clients", zhTW: "企業客戶", zhCN: "企业客户" } },
      { _key: "stat-markets", value: "3", label: { en: "Markets: HK, SG, MO", zhTW: "市場：港、星、澳", zhCN: "市场：港、星、澳" } },
      { _key: "stat-employees", value: "50K+", label: { en: "Employees benefiting", zhTW: "受惠員工", zhCN: "受益员工" } },
    ],
    values: {
      headline: {
        en: "What we believe",
        zhTW: "我們的核心信念",
        zhCN: "我们的核心信念",
      },
      items: [
        {
          _key: "val-human",
          title: { en: "Human-First", zhTW: "以人為本", zhCN: "以人为本" },
          desc: { en: "Every product decision starts with a simple question: does this make life better for the people using it?", zhTW: "每一個產品決策都始於一個簡單的問題：這是否讓使用它的人生活更美好？", zhCN: "每一个产品决策都始于一个简单的问题：这是否让使用它的人生活更美好？" },
        },
        {
          _key: "val-innovation",
          title: { en: "Boldly Innovative", zhTW: "大膽創新", zhCN: "大胆创新" },
          desc: { en: "We use AI and modern technology to solve old, stubborn problems in healthcare — with urgency and imagination.", zhTW: "我們使用 AI 和現代技術，以緊迫感和想象力解決醫療保健領域頑固的老問題。", zhCN: "我们使用 AI 和现代技术，以紧迫感和想象力解决医疗保健领域顽固的老问题。" },
        },
        {
          _key: "val-trust",
          title: { en: "Uncompromisingly Trusted", zhTW: "值得信賴", zhCN: "值得信赖" },
          desc: { en: "Healthcare and financial data demand the highest standards. We hold ourselves to them without exception.", zhTW: "醫療和財務數據要求最高標準。我們毫無例外地恪守這些標準。", zhCN: "医疗和财务数据要求最高标准。我们毫无例外地恪守这些标准。" },
        },
        {
          _key: "val-asia",
          title: { en: "Asia-Pacific Focused", zhTW: "專注亞太", zhCN: "专注亚太" },
          desc: { en: "We're built for this region — its languages, regulations, healthcare systems, and cultural context.", zhTW: "我們為這個地區而生——其語言、法規、醫療體系和文化背景。", zhCN: "我们为这个地区而生——其语言、法规、医疗体系和文化背景。" },
        },
        {
          _key: "val-partners",
          title: { en: "Partner Obsessed", zhTW: "合作夥伴至上", zhCN: "合作伙伴至上" },
          desc: { en: "Our success is measured by our partners' success. We win when our clients, brokers, and providers win.", zhTW: "我們的成功以合作夥伴的成功來衡量。當我們的客戶、經紀和供應商成功時，我們才算成功。", zhCN: "我们的成功以合作伙伴的成功来衡量。当我们的客户、经纪和供应商成功时，我们才算成功。" },
        },
        {
          _key: "val-outcomes",
          title: { en: "Outcome Driven", zhTW: "結果導向", zhCN: "结果导向" },
          desc: { en: "We measure everything — claims processed, costs saved, benefits used. Data shapes every decision.", zhTW: "我們衡量一切——處理的理賠、節省的成本、使用的福利。數據指導每一個決策。", zhCN: "我们衡量一切——处理的理赔、节省的成本、使用的福利。数据指导每一个决策。" },
        },
      ],
    },
    team: {
      headline: {
        en: "Our leadership team",
        zhTW: "我們的領導團隊",
        zhCN: "我们的领导团队",
      },
      sub: {
        en: "Built by operators who have lived on both sides of the healthcare benefits equation — as providers, payers, and employers.",
        zhTW: "由曾在醫療福利方程式兩端——作為供應商、付款方和雇主——工作的運營者組建。",
        zhCN: "由曾在医疗福利方程式两端——作为供应商、付款方和雇主——工作的运营者组建。",
      },
    },
    careers: {
      headline: {
        en: "Join our team",
        zhTW: "加入我們的團隊",
        zhCN: "加入我们的团队",
      },
      sub: {
        en: "We're growing fast and looking for people who want to transform healthcare in Asia-Pacific. Remote-friendly, equity-based compensation, and a team that genuinely cares about the work.",
        zhTW: "我們正在快速增長，正在尋找希望轉型亞太地區醫療保健的人才。支持遠程辦公、以股權為基礎的薪酬，以及一個真正關心工作的團隊。",
        zhCN: "我们正在快速增长，正在寻找希望转型亚太地区医疗保健的人才。支持远程办公、以股权为基础的薪酬，以及一个真正关心工作的团队。",
      },
      cta: {
        en: "See Open Roles →",
        zhTW: "查看開放職位 →",
        zhCN: "查看开放职位 →",
      },
    },
    press: {
      headline: {
        en: "In the press",
        zhTW: "媒體報道",
        zhCN: "媒体报道",
      },
      mediaEnquiry: {
        en: "Media enquiries: press@mixcarehealth.com →",
        zhTW: "媒體查詢：press@mixcarehealth.com →",
        zhCN: "媒体垂询：press@mixcarehealth.com →",
      },
      items: [
        {
          _key: "press-scmp",
          outlet: { en: "South China Morning Post", zhTW: "南華早報", zhCN: "南华早报" },
          date: { en: "Jan 2025", zhTW: "2025年1月", zhCN: "2025年1月" },
          headline: { en: "MixCare Health raises Series B to expand AI-powered wellness platform across Asia", zhTW: "MixCare Health 完成 B 輪融資，擴大 AI 驅動的健康平台在亞洲的佈局", zhCN: "MixCare Health 完成 B 轮融资，扩大 AI 驱动的健康平台在亚洲的布局" },
        },
        {
          _key: "press-bt",
          outlet: { en: "The Business Times (SG)", zhTW: "商業時報（新加坡）", zhCN: "商业时报（新加坡）" },
          date: { en: "Nov 2024", zhTW: "2024年11月", zhCN: "2024年11月" },
          headline: { en: "How AI is transforming employee health benefits in Southeast Asia", zhTW: "AI 如何在東南亞轉型員工健康福利", zhCN: "AI 如何在东南亚转型员工健康福利" },
        },
        {
          _key: "press-forbes",
          outlet: { en: "Forbes Asia", zhTW: "福布斯亞洲", zhCN: "福布斯亚洲" },
          date: { en: "Sep 2024", zhTW: "2024年9月", zhCN: "2024年9月" },
          headline: { en: "MixCare Health named among 2024 Asia-Pacific HealthTech companies to watch", zhTW: "MixCare Health 入選 2024 年亞太地區值得關注的健康科技公司", zhCN: "MixCare Health 入选 2024 年亚太地区值得关注的健康科技公司" },
        },
      ],
    },
    cta: {
      headline: {
        en: "Want to transform health benefits with us?",
        zhTW: "想與我們共同轉型健康福利嗎？",
        zhCN: "想与我们共同转型健康福利吗？",
      },
      sub: {
        en: "Whether as a client, partner, or team member — we'd love to connect.",
        zhTW: "無論作為客戶、合作夥伴還是團隊成員——我們都期待與您建立聯繫。",
        zhCN: "无论作为客户、合作伙伴还是团队成员——我们都期待与您建立联系。",
      },
      ctaLabel: {
        en: "Get a Demo",
        zhTW: "預約示範",
        zhCN: "预约演示",
      },
      secondaryLabel: {
        en: "View Open Roles",
        zhTW: "查看開放職位",
        zhCN: "查看开放职位",
      },
    },
  });
  console.log("✓ aboutPage seeded");

  // ── Team Members ──────────────────────────────────────────────────────────
  const teamMembers = [
    {
      _id: "team-michael-yuen",
      name: "Dr. Michael Yuen",
      order: 1,
      role: { en: "CEO & Co-Founder", zhTW: "行政總裁及聯合創辦人", zhCN: "首席执行官及联合创始人" },
      bio: {
        en: "Former Head of Digital Health at AXA Asia. 15 years in insurtech and healthcare innovation across HK and SG.",
        zhTW: "前 AXA 亞洲數字健康主管。15 年在港、星從事保險科技與醫療保健創新經驗。",
        zhCN: "前 AXA 亚洲数字健康主管。15 年在港、星从事保险科技与医疗保健创新经验。",
      },
    },
    {
      _id: "team-sarah-zhang",
      name: "Sarah Zhang",
      order: 2,
      role: { en: "CTO & Co-Founder", zhTW: "技術總監及聯合創辦人", zhCN: "首席技术官及联合创始人" },
      bio: {
        en: "Ex-Google and Ant Financial. Built AI claims processing systems handling over HK$10B annually.",
        zhTW: "前 Google 及螞蟻金服員工。曾構建每年處理逾港幣 100 億的 AI 理賠處理系統。",
        zhCN: "前 Google 及蚂蚁金服员工。曾构建每年处理逾港币 100 亿的 AI 理赔处理系统。",
      },
    },
    {
      _id: "team-james-lam",
      name: "James Lam",
      order: 3,
      role: { en: "Chief Revenue Officer", zhTW: "首席收入官", zhCN: "首席营收官" },
      bio: {
        en: "20 years building distribution across Asia-Pacific for Manulife, Prudential, and MetLife.",
        zhTW: "在宏利、保誠及大都會人壽亞太地區建立分銷渠道逾 20 年。",
        zhCN: "在宏利、保诚及大都会人寿亚太地区建立分销渠道逾 20 年。",
      },
    },
    {
      _id: "team-emily-fong",
      name: "Dr. Emily Fong",
      order: 4,
      role: { en: "Chief Medical Officer", zhTW: "首席醫療官", zhCN: "首席医疗官" },
      bio: {
        en: "Practising physician and health economist. PhD from Johns Hopkins. Advisor to Hong Kong's DHSC.",
        zhTW: "執業醫師及健康經濟學家。約翰斯·霍普金斯大學博士。香港衛生署顧問。",
        zhCN: "执业医师及健康经济学家。约翰斯·霍普金斯大学博士。香港卫生署顾问。",
      },
    },
    {
      _id: "team-kevin-ho",
      name: "Kevin Ho",
      order: 5,
      role: { en: "Chief Compliance Officer", zhTW: "首席合規官", zhCN: "首席合规官" },
      bio: {
        en: "Former regulator at the HKMA. Expert in PDPO, MAS TRM, and healthcare data privacy frameworks.",
        zhTW: "前香港金融管理局監管人員。精通《個人資料（私隱）條例》及醫療數據私隱框架。",
        zhCN: "前香港金融管理局监管人员。精通《个人资料（私隐）条例》及医疗数据隐私框架。",
      },
    },
    {
      _id: "team-linda-chan",
      name: "Linda Chan",
      order: 6,
      role: { en: "Chief People Officer", zhTW: "首席人才官", zhCN: "首席人才官" },
      bio: {
        en: "Built people-first cultures at Cathay Pacific and HSBC. Passionate about flexible, inclusive workplaces.",
        zhTW: "曾在國泰航空及匯豐銀行建立以人為本的企業文化。熱衷於靈活包容的工作環境。",
        zhCN: "曾在国泰航空及汇丰银行建立以人为本的企业文化。热衷于灵活包容的工作环境。",
      },
    },
  ];

  for (const member of teamMembers) {
    await client.createOrReplace({ ...member, _type: "teamMember" });
    console.log(`✓ teamMember: ${member.name}`);
  }

  console.log("\n✅ About page seed complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
