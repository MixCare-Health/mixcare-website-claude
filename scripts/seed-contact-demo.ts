/**
 * Seed Contact Page + Get a Demo Page to Sanity
 * Run: npx tsx scripts/seed-contact-demo.ts
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
  console.log("Seeding contact page...");

  // ── Contact Page Singleton ────────────────────────────────────────────────
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    hero: {
      headline: {
        en: "Get in",
        zhTW: "聯繫",
        zhCN: "联系",
      },
      headlineHighlight: {
        en: "touch",
        zhTW: "我們",
        zhCN: "我们",
      },
      sub: {
        en: "Have a question, feedback, or need support? We're here to help — reach out through any channel below.",
        zhTW: "有任何問題、意見或需要支援？我們隨時為您提供協助——請透過以下任何渠道聯繫我們。",
        zhCN: "有任何问题、意见或需要支援？我们随时为您提供协助——请通过以下任何渠道联系我们。",
      },
    },
    officesTitle: {
      en: "Our offices",
      zhTW: "我們的辦公室",
      zhCN: "我们的办公室",
    },
    formTitle: {
      en: "Send us a message",
      zhTW: "向我們發送訊息",
      zhCN: "向我们发送消息",
    },
    formSub: {
      en: "We respond to all enquiries within 1 business day.",
      zhTW: "我們在1個工作天內回覆所有查詢。",
      zhCN: "我们在1个工作天内回复所有查询。",
    },
    hours: {
      en: "Office hours",
      zhTW: "辦公時間",
      zhCN: "办公时间",
    },
    fields: {
      name: {
        en: "Your Name",
        zhTW: "您的姓名",
        zhCN: "您的姓名",
      },
      email: {
        en: "Email",
        zhTW: "電郵",
        zhCN: "邮箱",
      },
      company: {
        en: "Company (optional)",
        zhTW: "公司（選填）",
        zhCN: "公司（选填）",
      },
      message: {
        en: "Message",
        zhTW: "訊息",
        zhCN: "消息",
      },
      messagePlaceholder: {
        en: "How can we help you?",
        zhTW: "我們能如何協助您？",
        zhCN: "我们能如何协助您？",
      },
      submit: {
        en: "Send Message →",
        zhTW: "發送訊息 →",
        zhCN: "发送消息 →",
      },
    },
    success: {
      title: {
        en: "Message sent!",
        zhTW: "訊息已發送！",
        zhCN: "消息已发送！",
      },
      sub: {
        en: "We'll get back to you within 1 business day.",
        zhTW: "我們將在1個工作天內回覆您。",
        zhCN: "我们将在1个工作天内回复您。",
      },
    },
    offices: [
      {
        _key: "office-hk",
        city: "Hong Kong",
        address: "23/F, Two International Finance Centre, 8 Finance Street, Central, Hong Kong",
        phone: "+852 3700 8888",
        email: "hk@mixcarehealth.com",
        hours: {
          en: "Mon–Fri, 9:00am–6:00pm HKT",
          zhTW: "週一至週五，上午9:00–下午6:00 HKT",
          zhCN: "周一至周五，上午9:00–下午6:00 HKT",
        },
      },
      {
        _key: "office-sg",
        city: "Singapore",
        address: "1 Raffles Place, #20-01, One Raffles Place, Singapore 048616",
        phone: "+65 6800 8888",
        email: "sg@mixcarehealth.com",
        hours: {
          en: "Mon–Fri, 9:00am–6:00pm SGT",
          zhTW: "週一至週五，上午9:00–下午6:00 SGT",
          zhCN: "周一至周五，上午9:00–下午6:00 SGT",
        },
      },
    ],
  });

  console.log("Seeding get-a-demo page...");

  // ── Get a Demo Page Singleton ─────────────────────────────────────────────
  await client.createOrReplace({
    _id: "getDemoPage",
    _type: "getDemoPage",
    hero: {
      badge: {
        en: "Book Your Demo",
        zhTW: "預約示範",
        zhCN: "预约演示",
      },
      headline: {
        en: "See MixCare in",
        zhTW: "親眼見證MixCare",
        zhCN: "亲眼见证MixCare",
      },
      headlineHighlight: {
        en: "action",
        zhTW: "的實力",
        zhCN: "的实力",
      },
      sub: {
        en: "Book a personalised demo with a MixCare specialist. We'll show you exactly how our platform works for your organisation — no generic slides, just real answers.",
        zhTW: "與MixCare專家預約個人化示範。我們將向您展示平台如何為您的機構運作——沒有千篇一律的簡報，只有真實答案。",
        zhCN: "与MixCare专家预约个性化演示。我们将向您展示平台如何为您的机构运作——没有千篇一律的幻灯片，只有真实答案。",
      },
    },
    bullets: {
      en: [
        "30-minute focused demo tailored to your use case",
        "Live walkthrough of the features most relevant to you",
        "ROI estimate based on your company size and industry",
        "Compliance and security Q&A for regulated industries",
      ],
      zhTW: [
        "30分鐘專注示範，針對您的使用場景",
        "實時演示與您最相關的功能",
        "根據您的公司規模及行業估算投資回報",
        "為受監管行業提供合規及安全問答",
      ],
      zhCN: [
        "30分钟专注演示，针对您的使用场景",
        "实时演示与您最相关的功能",
        "根据您的公司规模及行业估算投资回报",
        "为受监管行业提供合规及安全问答",
      ],
    },
    whatHappens: {
      en: "What happens after you submit:",
      zhTW: "提交後會發生什麼：",
      zhCN: "提交后会发生什么：",
    },
    afterSubmit: {
      en: [
        "A MixCare specialist will contact you within 1 business day",
        "We'll schedule a time that suits your calendar",
        "You'll receive a pre-demo questionnaire to customise the session",
      ],
      zhTW: [
        "MixCare專家將在1個工作天內與您聯繫",
        "我們將安排適合您日程的時間",
        "您將收到示範前問卷，以定制會議內容",
      ],
      zhCN: [
        "MixCare专家将在1个工作天内与您联系",
        "我们将安排适合您日程的时间",
        "您将收到演示前问卷，以定制会议内容",
      ],
    },
    formTitle: {
      en: "Request your demo",
      zhTW: "申請您的示範",
      zhCN: "申请您的演示",
    },
    formSub: {
      en: "All fields required. We'll never share your data.",
      zhTW: "所有欄位為必填項。我們永不分享您的數據。",
      zhCN: "所有栏位为必填项。我们永不分享您的数据。",
    },
    fields: {
      name: {
        en: "Full Name",
        zhTW: "全名",
        zhCN: "全名",
      },
      email: {
        en: "Work Email",
        zhTW: "工作電郵",
        zhCN: "工作邮箱",
      },
      company: {
        en: "Company Name",
        zhTW: "公司名稱",
        zhCN: "公司名称",
      },
      size: {
        en: "Company Size",
        zhTW: "公司規模",
        zhCN: "公司规模",
      },
      role: {
        en: "Your Role",
        zhTW: "您的職位",
        zhCN: "您的职位",
      },
      message: {
        en: "What would you like to see? (optional)",
        zhTW: "您希望了解什麼？（選填）",
        zhCN: "您希望了解什么？（选填）",
      },
      messagePlaceholder: {
        en: "Tell us your main challenges or what you'd like to explore in the demo...",
        zhTW: "告訴我們您的主要挑戰或希望在示範中探索的內容...",
        zhCN: "告诉我们您的主要挑战或希望在演示中探索的内容...",
      },
      submit: {
        en: "Request My Demo →",
        zhTW: "申請示範 →",
        zhCN: "申请演示 →",
      },
      submitting: {
        en: "Sending...",
        zhTW: "提交中...",
        zhCN: "提交中...",
      },
      privacy: {
        en: "By submitting, you agree to our",
        zhTW: "提交即表示您同意我們的",
        zhCN: "提交即表示您同意我们的",
      },
      privacyLink: {
        en: "Privacy Policy",
        zhTW: "私隱政策",
        zhCN: "隐私政策",
      },
      noSpam: {
        en: "No spam, ever.",
        zhTW: "絕不發送垃圾郵件。",
        zhCN: "绝不发送垃圾邮件。",
      },
    },
    success: {
      title: {
        en: "Request received!",
        zhTW: "申請已收到！",
        zhCN: "申请已收到！",
      },
      sub: {
        en: "A MixCare specialist will be in touch within 1 business day to schedule your personalised demo.",
        zhTW: "MixCare專家將在1個工作天內聯繫您，安排個人化示範。",
        zhCN: "MixCare专家将在1个工作天内联系您，安排个性化演示。",
      },
      explore: {
        en: "In the meantime, explore our",
        zhTW: "同時，歡迎探索我們的",
        zhCN: "同时，欢迎探索我们的",
      },
      platform: {
        en: "platform solutions",
        zhTW: "平台解決方案",
        zhCN: "平台解决方案",
      },
      or: {
        en: "or read our",
        zhTW: "或閱讀我們的",
        zhCN: "或阅读我们的",
      },
      caseStudies: {
        en: "case studies",
        zhTW: "案例研究",
        zhCN: "案例研究",
      },
    },
    sizes: {
      en: [
        "2–10 employees",
        "11–50 employees",
        "51–200 employees",
        "201–500 employees",
        "500+ employees",
      ],
      zhTW: [
        "2–10名員工",
        "11–50名員工",
        "51–200名員工",
        "201–500名員工",
        "500名員工以上",
      ],
      zhCN: [
        "2–10名员工",
        "11–50名员工",
        "51–200名员工",
        "201–500名员工",
        "500名员工以上",
      ],
    },
    roles: {
      en: [
        "Insurer / Reinsurer",
        "Insurance Broker",
        "Enterprise — HR / Benefits",
        "Enterprise — C-Suite / Executive",
        "Small Business Owner",
        "Medical / Wellness Provider",
        "Other",
      ],
      zhTW: [
        "保險公司 / 再保險公司",
        "保險經紀",
        "大型企業——人力資源 / 福利",
        "大型企業——行政總裁 / 高管",
        "小型企業主",
        "醫療 / 健康服務供應商",
        "其他",
      ],
      zhCN: [
        "保险公司 / 再保险公司",
        "保险经纪",
        "大型企业——人力资源 / 福利",
        "大型企业——行政总裁 / 高管",
        "小型企业主",
        "医疗 / 健康服务供应商",
        "其他",
      ],
    },
  });

  console.log("Done! Contact page and Get a Demo page seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
