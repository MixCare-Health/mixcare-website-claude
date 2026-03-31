import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomCTA from "@/components/shared/BottomCTA";
import {
  ShieldCheck, Lock, Eye, Server, Key, Bell, FileCheck, Globe
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust & Compliance | MixCare Health",
  description:
    "Enterprise-grade security, PDPO and GDPR compliance, ISO 27001 certified. Learn how MixCare protects your data.",
};

const certifications = [
  { label: "ISO 27001", desc: "Certified information security management.", detail: "Comprehensive framework for managing information security risks." },
  { label: "GDPR Compliant", desc: "Full EU General Data Protection Regulation compliance.", detail: "Data minimisation, purpose limitation, and subject rights fully implemented." },
  { label: "PDPO (HK)", desc: "Personal Data Privacy Ordinance — Hong Kong.", detail: "Aligned with all 6 Data Protection Principles under Cap. 486." },
  { label: "MAS TRM", desc: "Monetary Authority of Singapore Technology Risk Management.", detail: "Compliant with MAS TRM guidelines for financial institutions." },
  { label: "HKMA Aligned", desc: "Hong Kong Monetary Authority guidelines.", detail: "Meets HKMA's cybersecurity and data governance expectations." },
];

const securityPillars = [
  { icon: Lock, title: "End-to-End Encryption", desc: "All data encrypted at rest (AES-256) and in transit (TLS 1.3). Encryption keys managed in hardware security modules (HSMs)." },
  { icon: Eye, title: "Zero-Trust Architecture", desc: "Every access request is authenticated and authorised — no implicit trust, ever. Multi-factor authentication enforced for all admin accounts." },
  { icon: Server, title: "Regional Data Residency", desc: "Your data stays in your region. HK data on HK servers, SG data on SG servers. No cross-border transfers without explicit consent." },
  { icon: Key, title: "Access Controls", desc: "Role-based access control (RBAC) with principle of least privilege. All privileged access is logged, monitored, and subject to quarterly review." },
  { icon: Bell, title: "24/7 Security Monitoring", desc: "Our security operations centre monitors systems around the clock. Automated threat detection with <15 minute incident response SLA." },
  { icon: FileCheck, title: "Penetration Testing", desc: "Annual penetration tests by independent third parties. Vulnerability disclosure programme open to the security research community." },
  { icon: Globe, title: "99.9% Uptime SLA", desc: "Multi-region redundancy with automatic failover. Our infrastructure is designed to survive any single point of failure." },
  { icon: ShieldCheck, title: "Audit Trails", desc: "Every claim, transaction, access event, and configuration change is immutably logged and available for your compliance team." },
];

const partnerLogos = ["AXA", "Manulife", "Cigna", "HSBC Life", "FWD", "Bupa", "Sun Life", "AIA"];

export default function TrustPage() {
  return (
    <main>
      <AppNavbar />

      {/* Hero */}
      <section
        className="pt-28 pb-20 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #f5f3ff 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl" style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
          >
            <ShieldCheck size={14} />
            Trust & Security
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Your trust is{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              non-negotiable
            </span>
          </h1>
          <p className="text-xl text-slate-600">
            Healthcare and financial data demand the highest standards. MixCare is built with
            security, privacy, and compliance at its core — verified by independent auditors and
            aligned with every major regulatory framework in Asia-Pacific.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            Certifications & compliance
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
            All certifications are independently audited. We share audit reports with enterprise
            clients and regulated institutions on request.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert) => (
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
                    <ShieldCheck size={20} className="text-white" />
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
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            Security architecture
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-xl mx-auto">
            Eight layers of protection, independently verified, continuously monitored.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {securityPillars.map((pillar) => (
              <div key={pillar.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#ccfbf1" }}
                >
                  <pillar.icon size={20} style={{ color: "#0d9488" }} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data privacy */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-8">
            Data privacy principles
          </h2>
          <div className="space-y-4">
            {[
              { principle: "Data Minimisation", desc: "We only collect data that is strictly necessary for the services you've subscribed to. No secondary use without explicit consent." },
              { principle: "Purpose Limitation", desc: "Your data is used only for the purpose for which it was collected. Claims data for claims. Analytics data for analytics. Never mixed." },
              { principle: "Storage Limitation", desc: "Data is retained only for as long as legally required or contractually agreed. Automated deletion schedules enforced across all environments." },
              { principle: "Data Subject Rights", desc: "Employees and policyholders have full rights to access, correct, port, and delete their personal data. Requests processed within 30 days." },
              { principle: "Cross-Border Transfers", desc: "No data crosses regional boundaries without legal basis, your explicit agreement, and appropriate transfer mechanisms in place." },
            ].map((item) => (
              <div key={item.principle} className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 hover:shadow-sm transition-all">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "#0d9488" }}
                >
                  <Lock size={14} className="text-white" />
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
            Trusted by regulated institutions across Asia-Pacific
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {partnerLogos.map((logo) => (
              <div
                key={logo}
                className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-400"
              >
                {logo}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Enterprise clients can request our full security documentation and questionnaire at{" "}
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
        headline="Questions about security or compliance?"
        sub="Our security and compliance team is available for regulated institutions, enterprise buyers, and due diligence reviews."
        ctaLabel="Contact Security Team"
        ctaHref="mailto:security@mixcarehealth.com"
        secondaryLabel="Get a Demo"
        secondaryHref="/get-a-demo"
      />

      <Footer />
    </main>
  );
}
