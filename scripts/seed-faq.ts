/**
 * Seed script — populates Sanity with 8 multilingual FAQ items.
 * Run with: npx tsx scripts/seed-faq.ts
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

const faqs = [
  {
    _id: "faq-item-1",
    _type: "faqItem",
    question: ls(
      "What markets does MixCare operate in?",
      "MixCare在哪些市場運營？",
      "MixCare在哪些市场运营？"
    ),
    answer: ls(
      "MixCare Health operates across Hong Kong, Macau, and Singapore. Our panel doctor network covers all three markets and our platform is fully compliant with local regulatory requirements in each jurisdiction.",
      "MixCare Health在香港、澳門和新加坡運營。我們的網絡醫生覆蓋三個市場，平台完全符合各司法管轄區的本地監管要求。",
      "MixCare Health在香港、澳门和新加坡运营。我们的网络医生覆盖三个市场，平台完全符合各司法管辖区的本地监管要求。"
    ),
    order: 1,
  },
  {
    _id: "faq-item-2",
    _type: "faqItem",
    question: ls(
      "How long does implementation take?",
      "實施需要多長時間？",
      "实施需要多长时间？"
    ),
    answer: ls(
      "For small businesses, setup can be completed in under 60 minutes via our self-service portal. Enterprise deployments typically take 2–5 business days including HRIS integration and custom configuration.",
      "中小企業可在60分鐘內通過我們的自助服務門戶完成設置。企業部署通常需要2至5個工作日，包括HRIS整合和自定義配置。",
      "中小企业可在60分钟内通过我们的自助服务门户完成设置。企业部署通常需要2至5个工作日，包括HRIS整合和自定义配置。"
    ),
    order: 2,
  },
  {
    _id: "faq-item-3",
    _type: "faqItem",
    question: ls(
      "What is the minimum company size?",
      "最低公司規模要求是什麼？",
      "最低公司规模要求是什么？"
    ),
    answer: ls(
      "There is no minimum headcount requirement. Our Starter plan serves companies with as few as 2 employees. Pricing scales by the number of enrolled employees.",
      "沒有最低員工人數要求。我們的初級計劃適合最少2名員工的公司。定價按已登記員工人數計算。",
      "没有最低员工人数要求。我们的初级计划适合最少2名员工的公司。定价按已登记员工人数计算。"
    ),
    order: 3,
  },
  {
    _id: "faq-item-4",
    _type: "faqItem",
    question: ls(
      "Can MixCare integrate with our existing HR system?",
      "MixCare能否與我們現有的HR系統整合？",
      "MixCare能否与我们现有的HR系统整合？"
    ),
    answer: ls(
      "Yes. We have pre-built integrations with Workday, SAP SuccessFactors, Oracle HCM, BambooHR, and others. Custom integrations are available via our REST API.",
      "可以。我們已與Workday、SAP SuccessFactors、Oracle HCM、BambooHR等預先建立整合。也可通過我們的REST API進行自定義整合。",
      "可以。我们已与Workday、SAP SuccessFactors、Oracle HCM、BambooHR等预先建立整合。也可通过我们的REST API进行自定义整合。"
    ),
    order: 4,
  },
  {
    _id: "faq-item-5",
    _type: "faqItem",
    question: ls(
      "How does the panel doctor network work?",
      "網絡醫生系統如何運作？",
      "网络医生系统如何运作？"
    ),
    answer: ls(
      "Employees use the MixCare app to locate and book a panel doctor. Consultations are cashless — employees present their digital card and the doctor bills directly to MixCare. No out-of-pocket payment, no reimbursement forms.",
      "員工使用MixCare應用程式查找並預約網絡醫生。就診採用無現金方式——員工出示電子卡，醫生直接向MixCare收費。無需自付費用，無需填寫報銷表格。",
      "员工使用MixCare应用程序查找并预约网络医生。就诊采用无现金方式——员工出示电子卡，医生直接向MixCare收费。无需自付费用，无需填写报销表格。"
    ),
    order: 5,
  },
  {
    _id: "faq-item-6",
    _type: "faqItem",
    question: ls(
      "Is MixCare compliant with PDPO and GDPR?",
      "MixCare是否符合PDPO和GDPR規定？",
      "MixCare是否符合PDPO和GDPR规定？"
    ),
    answer: ls(
      "Yes. MixCare is fully compliant with Hong Kong's PDPO (Cap. 486), Singapore's PDPA, and the EU's GDPR. We are also ISO 27001 certified. Full documentation is available on request.",
      "是的。MixCare完全符合香港PDPO（第486章）、新加坡PDPA及歐盟GDPR的規定。我們也已獲得ISO 27001認證。完整文件可按要求提供。",
      "是的。MixCare完全符合香港PDPO（第486章）、新加坡PDPA及欧盟GDPR的规定。我们也已获得ISO 27001认证。完整文件可按要求提供。"
    ),
    order: 6,
  },
  {
    _id: "faq-item-7",
    _type: "faqItem",
    question: ls(
      "Can we white-label the marketplace?",
      "我們可以對市場進行白標嗎？",
      "我们可以对市场进行白标吗？"
    ),
    answer: ls(
      "Yes. Insurers and brokers can deploy a fully branded wellness marketplace under their own domain and brand identity. Setup takes 2–3 business days.",
      "可以。保險公司和經紀可在自己的域名和品牌標識下部署完全品牌化的健康市場。設置需要2至3個工作日。",
      "可以。保险公司和经纪可在自己的域名和品牌标识下部署完全品牌化的健康市场。设置需要2至3个工作日。"
    ),
    order: 7,
  },
  {
    _id: "faq-item-8",
    _type: "faqItem",
    question: ls(
      "What happens to unused FSA balances at year end?",
      "年末未使用的FSA餘額如何處理？",
      "年末未使用的FSA余额如何处理？"
    ),
    answer: ls(
      "This is fully configurable. You can choose to allow rollover, forfeit unused balances back to the company, or return them to the employee. The platform enforces whichever rule you set automatically.",
      "這完全可配置。您可以選擇允許結轉、將未使用餘額退回公司，或退還給員工。平台會自動執行您設置的規則。",
      "这完全可配置。您可以选择允许结转、将未使用余额退回公司，或退还给员工。平台会自动执行您设置的规则。"
    ),
    order: 8,
  },
];

async function main() {
  console.log(`Seeding ${faqs.length} FAQ items...`);
  for (const faq of faqs) {
    await client.createOrReplace(faq);
    console.log(`  ✓ ${faq._id}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
