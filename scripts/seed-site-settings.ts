/**
 * Seed script — populates Sanity with the siteSettings singleton.
 * Run with: npx tsx scripts/seed-site-settings.ts
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

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",

  // ── Site-level metadata ───────────────────────────────────────────────────
  siteName: "MixCare Health",
  tagline: ls(
    "AI-Powered Digital Health & Wellness Platform serving insurers, enterprises, and small businesses across Hong Kong, Macau, and Singapore.",
    "人工智能驅動的健康及醫療平台，服務香港、澳門及新加坡的保險公司、企業及小型企業。",
    "人工智能驱动的健康及医疗平台，服务香港、澳门及新加坡的保险公司、企业及小型企业。"
  ),

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: {
    labels: {
      platform: ls("Platform", "解決方案", "解决方案"),
      whoWeServe: ls("Who We Serve", "服務對象", "服务对象"),
      resources: ls("Resources", "資源庫", "资源库"),
      about: ls("About", "關於我們", "关于我们"),
      trust: ls("Trust", "信任保障", "信任保障"),
      startNow: ls("Start Now", "立即開始", "立即开始"),
      getDemo: ls("Get a Demo", "預約示範", "预约演示"),
    },
    platformLinks: [
      {
        _key: "nav-platform-1",
        label: ls("Self-Funded Outpatient", "自付門診計劃", "自付门诊计划"),
        desc: ls(
          "AI-powered claims & panel doctor network",
          "人工智能索償及指定醫生網絡",
          "人工智能理赔及指定医生网络"
        ),
        href: "/platform/self-funded-outpatient",
      },
      {
        _key: "nav-platform-2",
        label: ls("Flexible Spending Account", "彈性醫療帳戶", "弹性医疗账户"),
        desc: ls(
          "Create & manage FSA wallets for any need",
          "建立及管理任何需求的FSA錢包",
          "创建和管理任何需求的FSA钱包"
        ),
        href: "/platform/flexible-spending-account",
      },
      {
        _key: "nav-platform-3",
        label: ls("Wellness Marketplace", "Wellness Marketplace", "Wellness Marketplace"),
        desc: ls(
          "3,000+ curated services employees actually want",
          "逾3,000項員工真正喜愛的精選服務",
          "逾3,000项员工真正喜爱的精选服务"
        ),
        href: "/platform/wellness-marketplace",
      },
      {
        _key: "nav-platform-4",
        label: ls("Wellness Events", "健康活動", "健康活动"),
        desc: ls(
          "Curated corporate health & wellness events",
          "精選企業健康及醫療活動",
          "精选企业健康及医疗活动"
        ),
        href: "/platform/wellness-events",
        comingSoon: true,
      },
      {
        _key: "nav-platform-5",
        label: ls("Flexible Benefits Solution", "彈性福利方案", "弹性福利方案"),
        desc: ls(
          "Personalised packages for every individual",
          "為每位員工提供個人化套餐",
          "为每位员工提供个性化套餐"
        ),
        href: "/platform/flexible-benefits",
      },
      {
        _key: "nav-platform-6",
        label: ls("Wellness Hub", "Wellness Hub", "健康中心"),
        desc: ls(
          "One connected ecosystem for all wellness",
          "所有健康服務的一個互聯生態系統",
          "所有健康服务的一个互联生态系统"
        ),
        href: "/platform/wellness-hub",
      },
    ],
    audienceLinks: [
      {
        _key: "nav-audience-1",
        label: ls("Insurers", "保險公司", "保险公司"),
        desc: ls(
          "Scalable wellness add-ons for policies",
          "保單的可擴展健康附加服務",
          "保单的可扩展健康附加服务"
        ),
        href: "/who-we-serve/insurers",
      },
      {
        _key: "nav-audience-2",
        label: ls("Insurance Brokers", "保險經紀", "保险经纪"),
        desc: ls(
          "Competitive packages to retain clients",
          "留住客戶的競爭套餐",
          "留住客户的竞争套餐"
        ),
        href: "/who-we-serve/brokers",
      },
      {
        _key: "nav-audience-3",
        label: ls("Large Enterprises", "大型企業", "大型企业"),
        desc: ls(
          "Customisable programs for 500+ employees",
          "500名員工以上的可定制計劃",
          "500名员工以上的可定制方案"
        ),
        href: "/who-we-serve/enterprises",
      },
      {
        _key: "nav-audience-4",
        label: ls("Small Businesses", "中小企業", "中小企业"),
        desc: ls(
          "Affordable benefits to attract top talent",
          "吸引頂尖人才的實惠福利",
          "吸引顶尖人才的实惠福利"
        ),
        href: "/who-we-serve/small-business",
      },
      {
        _key: "nav-audience-5",
        label: ls("Wellness Providers", "醫療或健康服務供應商", "医疗或健康服务供应商"),
        desc: ls(
          "Digital tools to grow your client base",
          "發展客戶群的數碼工具",
          "发展客户群的数字工具"
        ),
        href: "/who-we-serve/providers",
      },
    ],
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    platformLinks: [
      { _key: "footer-platform-1", label: ls("Self-Funded Outpatient", "自付門診計劃", "自付门诊计划"), href: "/platform/self-funded-outpatient" },
      { _key: "footer-platform-2", label: ls("Flexible Spending Account", "彈性醫療帳戶", "弹性医疗账户"), href: "/platform/flexible-spending-account" },
      { _key: "footer-platform-3", label: ls("Wellness Marketplace", "Wellness Marketplace", "Wellness Marketplace"), href: "/platform/wellness-marketplace" },
      { _key: "footer-platform-4", label: ls("Flexible Benefits", "彈性福利方案", "弹性福利方案"), href: "/platform/flexible-benefits" },
      { _key: "footer-platform-5", label: ls("Wellness Hub", "健康中心", "Wellness Hub"), href: "/platform/wellness-hub" },
    ],
    whoWeServeLinks: [
      { _key: "footer-wws-1", label: ls("Insurers", "保險公司", "保险公司"), href: "/who-we-serve/insurers" },
      { _key: "footer-wws-2", label: ls("Insurance Brokers", "保險經紀", "保险经纪"), href: "/who-we-serve/brokers" },
      { _key: "footer-wws-3", label: ls("Large Enterprises", "大型企業", "大型企业"), href: "/who-we-serve/enterprises" },
      { _key: "footer-wws-4", label: ls("Small Businesses", "中小企業", "中小企业"), href: "/who-we-serve/small-business" },
      { _key: "footer-wws-5", label: ls("Wellness Providers", "醫療或健康服務供應商", "医疗或健康服务供应商"), href: "/who-we-serve/providers" },
    ],
    resourceLinks: [
      { _key: "footer-res-1", label: ls("Blog", "博客", "博客"), href: "/resources#blog" },
      { _key: "footer-res-2", label: ls("Case Studies", "案例研究", "案例研究"), href: "/resources#case-studies" },
      { _key: "footer-res-3", label: ls("Whitepapers", "白皮書", "白皮书"), href: "/resources#whitepapers" },
      { _key: "footer-res-4", label: ls("FAQ", "常見問題", "常见问题"), href: "/resources#faq" },
      { _key: "footer-res-5", label: ls("Trust & Security", "信任與安全", "信任与安全"), href: "/trust" },
    ],
    companyLinks: [
      { _key: "footer-co-1", label: ls("About Us", "關於我們", "关于我们"), href: "/about" },
      { _key: "footer-co-2", label: ls("Careers", "職業機會", "职业机会"), href: "/about#careers" },
      { _key: "footer-co-3", label: ls("Press", "媒體", "媒体"), href: "/about#press" },
      { _key: "footer-co-4", label: ls("Partner With Us", "與我們合作", "与我们合作"), href: "/partners" },
      { _key: "footer-co-5", label: ls("Contact", "聯繫我們", "联系我们"), href: "/contact" },
    ],
    legalLinks: {
      privacy: ls("Privacy Policy", "私隱政策", "隐私政策"),
      terms: ls("Terms of Service", "服務條款", "服务条款"),
      cookie: ls("Cookie Policy", "Cookie政策", "Cookie政策"),
      sitemap: ls("Sitemap", "網站地圖", "网站地图"),
    },
    certifiedCompliant: ls("Certified & Compliant", "認證及合規", "认证及合规"),
  },

  // ── Regions ───────────────────────────────────────────────────────────────
  regions: [
    { _key: "region-hk", label: "Hong Kong", code: "HK" },
    { _key: "region-sg", label: "Singapore", code: "SG" },
    { _key: "region-mo", label: "Macau", code: "MO" },
  ],
};

async function main() {
  console.log("Seeding siteSettings...");
  await client.createOrReplace(siteSettings);
  console.log("  ✓ siteSettings");
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
