import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomCTA from "@/components/shared/BottomCTA";
import {
  ShieldCheck, Lock, Eye, Server, Key, Bell, FileCheck, Globe
} from "lucide-react";
import type { Metadata, Viewport } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { trustPageQuery, type SanityTrustPage } from "@/lib/sanity.queries";
import { localePath } from "@/lib/locale";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/trust");

export const metadata: Metadata = {
  title: "Security & Compliance — Trust Centre",
  description:
    "Enterprise-grade security with ISO 27001 certification, PDPO and GDPR compliance. Learn how MixCare protects your employee health data across Hong Kong and Singapore.",
  keywords: [
    "health data security", "PDPO compliance Hong Kong", "GDPR health platform",
    "ISO 27001 health tech", "employee data privacy", "health benefits compliance",
    "secure health platform", "MixCare trust centre", "data protection health",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Security & Compliance — Trust Centre | ${SITE_NAME}`,
    description:
      "ISO 27001 certified. PDPO and GDPR compliant. Enterprise-grade security for your employee health data.",
    url: canonical,
    images: ogImage("MixCare Trust Centre — Security & Compliance"),
  },
  twitter: {
    title: `Trust Centre | ${SITE_NAME}`,
    description: "ISO 27001 certified, PDPO & GDPR compliant. Enterprise-grade health data security.",
    images: ["/opengraph-image.png"],
  },
};

// Map Sanity icon name strings → Lucide components
const iconMap: Record<string, React.ElementType> = {
  Lock, Eye, Server, Key, Bell, FileCheck, Globe, ShieldCheck,
};

// Static fallback data (English)
const fallbackCertifications = [
  { label: "ISO 27001", desc: "Certified information security management.", detail: "Comprehensive framework for managing information security risks." },
  { label: "GDPR Compliant", desc: "Full EU General Data Protection Regulation compliance.", detail: "Data minimisation, purpose limitation, and subject rights fully implemented." },
  { label: "PDPO (HK)", desc: "Personal Data Privacy Ordinance — Hong Kong.", detail: "Aligned with all 6 Data Protection Principles under Cap. 486." },
  { label: "MAS TRM", desc: "Monetary Authority of Singapore Technology Risk Management.", detail: "Compliant with MAS TRM guidelines for financial institutions." },
  { label: "HKMA Aligned", desc: "Hong Kong Monetary Authority guidelines.", detail: "Meets HKMA's cybersecurity and data governance expectations." },
];

const fallbackPillars = [
  { icon: "Lock", title: "End-to-End Encryption", desc: "All data encrypted at rest (AES-256) and in transit (TLS 1.3). Encryption keys managed in hardware security modules (HSMs)." },
  { icon: "Eye", title: "Zero-Trust Architecture", desc: "Every access request is authenticated and authorised — no implicit trust, ever. Multi-factor authentication enforced for all admin accounts." },
  { icon: "Server", title: "Regional Data Residency", desc: "Your data stays in your region. HK data on HK servers, SG data on SG servers. No cross-border transfers without explicit consent." },
  { icon: "Key", title: "Access Controls", desc: "Role-based access control (RBAC) with principle of least privilege. All privileged access is logged, monitored, and subject to quarterly review." },
  { icon: "Bell", title: "24/7 Security Monitoring", desc: "Our security operations centre monitors systems around the clock. Automated threat detection with <15 minute incident response SLA." },
  { icon: "FileCheck", title: "Penetration Testing", desc: "Annual penetration tests by independent third parties. Vulnerability disclosure programme open to the security research community." },
  { icon: "Globe", title: "99.9% Uptime SLA", desc: "Multi-region redundancy with automatic failover. Our infrastructure is designed to survive any single point of failure." },
  { icon: "ShieldCheck", title: "Audit Trails", desc: "Every claim, transaction, access event, and configuration change is immutably logged and available for your compliance team." },
];

const fallbackPrivacy = [
  { principle: "Data Minimisation", desc: "We only collect data that is strictly necessary for the services you've subscribed to. No secondary use without explicit consent." },
  { principle: "Purpose Limitation", desc: "Your data is used only for the purpose for which it was collected. Claims data for claims. Analytics data for analytics. Never mixed." },
  { principle: "Storage Limitation", desc: "Data is retained only for as long as legally required or contractually agreed. Automated deletion schedules enforced across all environments." },
  { principle: "Data Subject Rights", desc: "Employees and policyholders have full rights to access, correct, port, and delete their personal data. Requests processed within 30 days." },
  { principle: "Cross-Border Transfers", desc: "No data crosses regional boundaries without legal basis, your explicit agreement, and appropriate transfer mechanisms in place." },
];

const fallbackLogos = ["AXA", "Manulife", "Cigna", "HSBC Life", "FWD", "Bupa", "Sun Life", "AIA"];

export default async function TrustPage() {
  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);

  const sp: SanityTrustPage | null = isSanityConfigured
    ? await sanityClient.fetch(trustPageQuery, { locale: sanityLocale })
    : null;

  // Resolved content
  const hero = {
    badge:             sp?.hero?.badge             ?? "Trust & Security",
    headline:          sp?.hero?.headline          ?? "Your trust is",
    headlineHighlight: sp?.hero?.headlineHighlight ?? "non-negotiable",
    sub:               sp?.hero?.sub               ?? "Healthcare and financial data demand the highest standards. MixCare is built with security, privacy, and compliance at its core — verified by independent auditors and aligned with every major regulatory framework in Asia-Pacific.",
  };
  const certsHeading  = sp?.certifications?.heading ?? "Certifications & compliance";
  const certsSub      = sp?.certifications?.sub     ?? "All certifications are independently audited. We share audit reports with enterprise clients and regulated institutions on request.";
  const certItems     = sp?.certifications?.items   ?? fallbackCertifications;
  const secHeading    = sp?.security?.heading       ?? "Security architecture";
  const secSub        = sp?.security?.sub           ?? "Eight layers of protection, independently verified, continuously monitored.";
  const pillars       = sp?.security?.pillars       ?? fallbackPillars;
  const privHeading   = sp?.privacy?.heading        ?? "Data privacy principles";
  const principles    = sp?.privacy?.principles     ?? fallbackPrivacy;
  const partnerLabel  = sp?.partnerBar?.label       ?? "Trusted by regulated institutions across Asia-Pacific";
  const contactNote   = sp?.partnerBar?.contactNote ?? "Enterprise clients can request our full security documentation and questionnaire at security@mixcarehealth.com";
  const logos         = sp?.partnerBar?.logos       ?? fallbackLogos;
  const cta = {
    headline:       sp?.cta?.headline       ?? "Questions about security or compliance?",
    sub:            sp?.cta?.sub            ?? "Our security and compliance team is available for regulated institutions, enterprise buyers, and due diligence reviews.",
    ctaLabel:       sp?.cta?.ctaLabel       ?? "Contact Security Team",
    secondaryLabel: sp?.cta?.secondaryLabel ?? "Get a Demo",
  };

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Security & Compliance — Trust Centre", "Enterprise-grade security with ISO 27001 certification, PDPO and GDPR compliance. Learn how MixCare protects your employee health data.", "/trust"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Trust Centre", path: "/trust" }]),
      ]} />
      <AppNavbar />

      {/* Hero */}
      <section
        className="pt-28 pb-20 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl" style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
          >
            <ShieldCheck size={14} aria-hidden="true" />
            {hero.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            {hero.headline}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {hero.headlineHighlight}
            </span>
          </h1>
          <p className="text-xl text-slate-600">{hero.sub}</p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">{certsHeading}</h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">{certsSub}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certItems.map((cert) => (
              <div
                key={cert.label}
                className="rounded-2xl p-7 border border-slate-100 hover:shadow-md transition-all"
                style={{ backgroundColor: "#f0fdfa" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#0d9488" }}
                  >
                    <ShieldCheck size={20} className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{cert.label}</h3>
                    <p className="text-xs text-slate-500">{cert.desc}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{cert.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security architecture */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">{secHeading}</h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">{secSub}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar) => {
              const Icon = iconMap[pillar.icon] ?? ShieldCheck;
              return (
                <div key={pillar.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#ccfbf1" }}
                  >
                    <Icon size={20} style={{ color: "#0d9488" }} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data privacy */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-8">{privHeading}</h2>
          <div className="space-y-4">
            {principles.map((item) => (
              <div key={item.principle} className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 hover:shadow-sm transition-all">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "#0d9488" }}
                >
                  <Lock size={14} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.principle}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner logos */}
      <section className="py-14" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
            {partnerLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {logos.map((logo) => (
              <div
                key={logo}
                className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-400"
              >
                {logo}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500">
            {contactNote.replace("security@mixcarehealth.com", "").trim()}{" "}
            <a
              href="mailto:security@mixcarehealth.com"
              className="font-semibold hover:underline"
              style={{ color: "#0d9488" }}
            >
              security@mixcarehealth.com
            </a>
          </p>
        </div>
      </section>

      <BottomCTA
        headline={cta.headline}
        sub={cta.sub}
        ctaLabel={cta.ctaLabel}
        ctaHref="mailto:security@mixcarehealth.com"
        secondaryLabel={cta.secondaryLabel}
        secondaryHref={"https://meetings-na2.hubspot.com/alex-wong9/mixcare-exploration-meeting-"}
      />

      <Footer />
    </main>
  );
}
