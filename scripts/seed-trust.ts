/**
 * Seed Trust Page to Sanity
 * Run: npx tsx scripts/seed-trust.ts
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

function ls(en: string, zhTW: string, zhCN: string) {
  return { en, zhTW, zhCN };
}
function lt(en: string, zhTW: string, zhCN: string) {
  return { en, zhTW, zhCN };
}

async function main() {
  console.log("Seeding trust page...");

  await client.createOrReplace({
    _id: "trustPage",
    _type: "trustPage",

    hero: {
      badge: ls("Trust & Security", "信任與安全", "信任与安全"),
      headline: ls("Your trust is", "您的信任是", "您的信任是"),
      headlineHighlight: ls("non-negotiable", "不可妥協的", "不可妥协的"),
      sub: lt(
        "Healthcare and financial data demand the highest standards. MixCare is built with security, privacy, and compliance at its core — verified by independent auditors and aligned with every major regulatory framework in Asia-Pacific.",
        "醫療和財務數據要求最高標準。MixCare 以安全、私隱和合規為核心而構建——由獨立審計機構驗證，並符合亞太地區每一主要監管框架。",
        "医疗和财务数据要求最高标准。MixCare 以安全、隐私和合规为核心而构建——由独立审计机构验证，并符合亚太地区每一主要监管框架。"
      ),
    },

    certifications: {
      heading: ls("Certifications & compliance", "認證與合規", "认证与合规"),
      sub: lt(
        "All certifications are independently audited. We share audit reports with enterprise clients and regulated institutions on request.",
        "所有認證均由獨立機構審計。我們應要求與企業客戶及受監管機構共享審計報告。",
        "所有认证均由独立机构审计。我们应要求与企业客户及受监管机构共享审计报告。"
      ),
      items: [
        {
          _key: "cert-iso",
          label: ls("ISO 27001", "ISO 27001", "ISO 27001"),
          desc: ls("Certified information security management.", "認證信息安全管理。", "认证信息安全管理。"),
          detail: lt(
            "Comprehensive framework for managing information security risks.",
            "管理信息安全風險的綜合框架。",
            "管理信息安全风险的综合框架。"
          ),
        },
        {
          _key: "cert-gdpr",
          label: ls("GDPR Compliant", "GDPR 合規", "GDPR 合规"),
          desc: ls("Full EU General Data Protection Regulation compliance.", "完全符合歐盟《通用數據保護條例》。", "完全符合欧盟《通用数据保护条例》。"),
          detail: lt(
            "Data minimisation, purpose limitation, and subject rights fully implemented.",
            "數據最小化、目的限制及數據主體權利均已完全實施。",
            "数据最小化、目的限制及数据主体权利均已完全实施。"
          ),
        },
        {
          _key: "cert-pdpo",
          label: ls("PDPO (HK)", "《個人資料（私隱）條例》（香港）", "《个人资料（私隐）条例》（香港）"),
          desc: ls("Personal Data Privacy Ordinance — Hong Kong.", "香港《個人資料（私隱）條例》。", "香港《个人资料（私隐）条例》。"),
          detail: lt(
            "Aligned with all 6 Data Protection Principles under Cap. 486.",
            "符合《第486章》下全部6項數據保護原則。",
            "符合《第486章》下全部6项数据保护原则。"
          ),
        },
        {
          _key: "cert-mas",
          label: ls("MAS TRM", "MAS TRM", "MAS TRM"),
          desc: ls("Monetary Authority of Singapore Technology Risk Management.", "新加坡金融管理局技術風險管理。", "新加坡金融管理局技术风险管理。"),
          detail: lt(
            "Compliant with MAS TRM guidelines for financial institutions.",
            "符合新加坡金融管理局針對金融機構的TRM指引。",
            "符合新加坡金融管理局针对金融机构的TRM指引。"
          ),
        },
        {
          _key: "cert-hkma",
          label: ls("HKMA Aligned", "符合香港金融管理局標準", "符合香港金融管理局标准"),
          desc: ls("Hong Kong Monetary Authority guidelines.", "香港金融管理局指引。", "香港金融管理局指引。"),
          detail: lt(
            "Meets HKMA's cybersecurity and data governance expectations.",
            "符合香港金融管理局的網絡安全及數據管理要求。",
            "符合香港金融管理局的网络安全及数据管理要求。"
          ),
        },
      ],
    },

    security: {
      heading: ls("Security architecture", "安全架構", "安全架构"),
      sub: lt(
        "Eight layers of protection, independently verified, continuously monitored.",
        "八層保護，獨立驗證，持續監控。",
        "八层保护，独立验证，持续监控。"
      ),
      pillars: [
        {
          _key: "sec-encryption",
          icon: "Lock",
          title: ls("End-to-End Encryption", "端對端加密", "端对端加密"),
          desc: lt(
            "All data encrypted at rest (AES-256) and in transit (TLS 1.3). Encryption keys managed in hardware security modules (HSMs).",
            "所有數據在靜止（AES-256）和傳輸（TLS 1.3）時均加密。加密密鑰由硬件安全模塊（HSM）管理。",
            "所有数据在静止（AES-256）和传输（TLS 1.3）时均加密。加密密钥由硬件安全模块（HSM）管理。"
          ),
        },
        {
          _key: "sec-zerotrust",
          icon: "Eye",
          title: ls("Zero-Trust Architecture", "零信任架構", "零信任架构"),
          desc: lt(
            "Every access request is authenticated and authorised — no implicit trust, ever. Multi-factor authentication enforced for all admin accounts.",
            "每一次訪問請求均需驗證和授權——永不存在隱性信任。所有管理員帳戶強制執行多因素驗證。",
            "每一次访问请求均需验证和授权——永不存在隐性信任。所有管理员帐户强制执行多因素验证。"
          ),
        },
        {
          _key: "sec-residency",
          icon: "Server",
          title: ls("Regional Data Residency", "區域數據駐留", "区域数据驻留"),
          desc: lt(
            "Your data stays in your region. HK data on HK servers, SG data on SG servers. No cross-border transfers without explicit consent.",
            "您的數據留在您的地區。香港數據存於香港服務器，新加坡數據存於新加坡服務器。未經明確同意，不進行跨境轉移。",
            "您的数据留在您的地区。香港数据存于香港服务器，新加坡数据存于新加坡服务器。未经明确同意，不进行跨境转移。"
          ),
        },
        {
          _key: "sec-access",
          icon: "Key",
          title: ls("Access Controls", "訪問控制", "访问控制"),
          desc: lt(
            "Role-based access control (RBAC) with principle of least privilege. All privileged access is logged, monitored, and subject to quarterly review.",
            "基於角色的訪問控制（RBAC），遵循最小權限原則。所有特權訪問均記錄、監控，並接受季度審查。",
            "基于角色的访问控制（RBAC），遵循最小权限原则。所有特权访问均记录、监控，并接受季度审查。"
          ),
        },
        {
          _key: "sec-monitoring",
          icon: "Bell",
          title: ls("24/7 Security Monitoring", "24/7 安全監控", "24/7 安全监控"),
          desc: lt(
            "Our security operations centre monitors systems around the clock. Automated threat detection with <15 minute incident response SLA.",
            "我們的安全運營中心全天候監控系統。自動威脅檢測，事件響應SLA低於15分鐘。",
            "我们的安全运营中心全天候监控系统。自动威胁检测，事件响应SLA低于15分钟。"
          ),
        },
        {
          _key: "sec-pentest",
          icon: "FileCheck",
          title: ls("Penetration Testing", "滲透測試", "渗透测试"),
          desc: lt(
            "Annual penetration tests by independent third parties. Vulnerability disclosure programme open to the security research community.",
            "由獨立第三方每年進行滲透測試。向安全研究社區開放漏洞披露計劃。",
            "由独立第三方每年进行渗透测试。向安全研究社区开放漏洞披露计划。"
          ),
        },
        {
          _key: "sec-uptime",
          icon: "Globe",
          title: ls("99.9% Uptime SLA", "99.9% 正常運行時間SLA", "99.9% 正常运行时间SLA"),
          desc: lt(
            "Multi-region redundancy with automatic failover. Our infrastructure is designed to survive any single point of failure.",
            "多區域冗余，自動故障轉移。我們的基礎設施設計為能夠承受任何單點故障。",
            "多区域冗余，自动故障转移。我们的基础设施设计为能够承受任何单点故障。"
          ),
        },
        {
          _key: "sec-audit",
          icon: "ShieldCheck",
          title: ls("Audit Trails", "審計追蹤", "审计追踪"),
          desc: lt(
            "Every claim, transaction, access event, and configuration change is immutably logged and available for your compliance team.",
            "每一筆理賠、交易、訪問事件和配置變更均不可篡改地記錄，並供您的合規團隊查閱。",
            "每一笔理赔、交易、访问事件和配置变更均不可篡改地记录，并供您的合规团队查阅。"
          ),
        },
      ],
    },

    privacy: {
      heading: ls("Data privacy principles", "數據私隱原則", "数据隐私原则"),
      principles: [
        {
          _key: "priv-minimisation",
          principle: ls("Data Minimisation", "數據最小化", "数据最小化"),
          desc: lt(
            "We only collect data that is strictly necessary for the services you've subscribed to. No secondary use without explicit consent.",
            "我們僅收集您所訂閱服務嚴格必要的數據。未經明確同意，不作二次使用。",
            "我们仅收集您所订阅服务严格必要的数据。未经明确同意，不作二次使用。"
          ),
        },
        {
          _key: "priv-purpose",
          principle: ls("Purpose Limitation", "目的限制", "目的限制"),
          desc: lt(
            "Your data is used only for the purpose for which it was collected. Claims data for claims. Analytics data for analytics. Never mixed.",
            "您的數據僅用於收集目的。理賠數據用於理賠，分析數據用於分析，從不混用。",
            "您的数据仅用于收集目的。理赔数据用于理赔，分析数据用于分析，从不混用。"
          ),
        },
        {
          _key: "priv-storage",
          principle: ls("Storage Limitation", "存儲限制", "存储限制"),
          desc: lt(
            "Data is retained only for as long as legally required or contractually agreed. Automated deletion schedules enforced across all environments.",
            "數據僅在法律要求或合同約定的期限內保留。所有環境均執行自動刪除計劃。",
            "数据仅在法律要求或合同约定的期限内保留。所有环境均执行自动删除计划。"
          ),
        },
        {
          _key: "priv-rights",
          principle: ls("Data Subject Rights", "數據主體權利", "数据主体权利"),
          desc: lt(
            "Employees and policyholders have full rights to access, correct, port, and delete their personal data. Requests processed within 30 days.",
            "員工和保單持有人對其個人數據享有完整的訪問、更正、轉移和刪除權利。請求在30天內處理。",
            "员工和保单持有人对其个人数据享有完整的访问、更正、转移和删除权利。请求在30天内处理。"
          ),
        },
        {
          _key: "priv-crossborder",
          principle: ls("Cross-Border Transfers", "跨境轉移", "跨境转移"),
          desc: lt(
            "No data crosses regional boundaries without legal basis, your explicit agreement, and appropriate transfer mechanisms in place.",
            "未有法律依據、您的明確同意及適當的轉移機制，數據不得跨越地區界限。",
            "未有法律依据、您的明确同意及适当的转移机制，数据不得跨越地区界限。"
          ),
        },
      ],
    },

    partnerBar: {
      label: ls(
        "Trusted by regulated institutions across Asia-Pacific",
        "受亞太地區受監管機構信賴",
        "受亚太地区受监管机构信赖"
      ),
      contactNote: lt(
        "Enterprise clients can request our full security documentation and questionnaire at security@mixcarehealth.com",
        "企業客戶可發送電郵至 security@mixcarehealth.com 索取完整安全文件及問卷",
        "企业客户可发送邮件至 security@mixcarehealth.com 索取完整安全文件及问卷"
      ),
      logos: ["AXA", "Manulife", "Cigna", "HSBC Life", "FWD", "Bupa", "Sun Life", "AIA"],
    },

    cta: {
      headline: ls(
        "Questions about security or compliance?",
        "有關安全或合規的問題？",
        "有关安全或合规的问题？"
      ),
      sub: lt(
        "Our security and compliance team is available for regulated institutions, enterprise buyers, and due diligence reviews.",
        "我們的安全及合規團隊為受監管機構、企業採購方及盡職調查審查提供服務。",
        "我们的安全及合规团队为受监管机构、企业采购方及尽职调查审查提供服务。"
      ),
      ctaLabel: ls("Contact Security Team", "聯繫安全團隊", "联系安全团队"),
      secondaryLabel: ls("Get a Demo", "預約示範", "预约演示"),
    },
  });

  console.log("✓ trustPage seeded");
  console.log("\n✅ Trust page seed complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
