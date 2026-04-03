import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ArrowLeft, ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ogImage } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import Link from "next/link";
import { notFound } from "next/navigation";

// ── Static content ────────────────────────────────────────────────────────────
const caseStudies = [
  {
    slug: "axa-hong-kong-ai-claims",
    index: 0,
    challenge: "Processing thousands of monthly outpatient claims manually was slow, costly, and fraud-prone. AXA needed a scalable, digital-first solution to modernise their self-funded outpatient scheme.",
    approach: "MixCare integrated its AI claims engine directly with AXA's existing systems. The AI model reviews claim documents, cross-references against a 2,000+ panel doctor network, and flags anomalies in real time.",
    outcomes: [
      "70% reduction in claims processing cost",
      "Average claim resolved in under 18 hours",
      "60% reduction in fraudulent claims",
      "99.2% uptime across all claim touch-points",
    ],
    sections: [
      {
        heading: "The Challenge: Manual Claims at Scale",
        body: "AXA Hong Kong manages thousands of outpatient claims monthly across their corporate client base. Before MixCare, each claim required manual document review, panel doctor verification, and line-by-line coverage checking. The process averaged 5.2 days per claim and required a dedicated operations team of 18 people. As the self-funded outpatient portfolio grew, it became clear the manual model couldn't scale without proportional headcount increases.",
      },
      {
        heading: "Why AI-First Processing?",
        body: "AXA's product team evaluated three approaches: hiring more reviewers, outsourcing to a third-party processing house, and deploying AI-native claims technology. The first two options offered incremental improvement at linear cost. AI offered the prospect of exponential throughput with near-zero marginal cost per claim. After a 90-day pilot with MixCare, the decision was clear.",
      },
      {
        heading: "The MixCare Integration",
        body: "MixCare's claims engine was integrated with AXA's policy administration system via REST API. The integration was completed in 4 business days. The AI model was pre-trained on MixCare's claims dataset (2M+ historical claims) and fine-tuned on AXA's panel doctor network and coverage rules. Within the first month, the model achieved 94% straight-through processing accuracy — meaning 94% of claims were approved or declined without any human review.",
      },
      {
        heading: "Key Results",
        body: "After 12 months of live operation across AXA's full corporate portfolio:",
        bullets: [
          "Claims processing cost: down 70% year-on-year",
          "Average resolution time: 5.2 days → 17.4 hours",
          "Fraudulent claims detected: up 60% (previously undetected)",
          "Straight-through processing: 84% of standard claims",
          "Employee satisfaction with claims: +38 percentage points",
          "Platform uptime: 99.2% across all touchpoints",
        ],
      },
      {
        heading: "What's Next",
        body: "AXA and MixCare are now deploying the same AI claims engine for specialist and hospitalisation claims — historically more complex to automate due to pre-authorisation requirements. The target: straight-through processing for 70% of specialist claims by end of 2025.",
      },
    ],
  },
  {
    slug: "jardine-matheson-flexible-benefits",
    index: 1,
    challenge: "With 12 offices and a diverse workforce, Jardine's HR team was managing over 40 benefit vendors. Employee utilisation was just 40% despite significant annual investment.",
    approach: "MixCare deployed its flexible benefits engine with a single employee self-selection portal, integrating all vendors under one platform with real-time utilisation dashboards.",
    outcomes: [
      "Utilisation jumped from 40% to 92% within 2 quarters",
      "Employee satisfaction score up 45%",
      "HR admin time reduced by 70%",
      "All 12 offices on one unified platform",
    ],
    sections: [
      {
        heading: "The Problem: Benefit Sprawl",
        body: "Jardine Matheson operates across 12 offices in Hong Kong, Singapore, and Macau with a workforce spanning five generations and dozens of nationalities. Over the years, HR had accumulated over 40 separate benefit vendors — medical, dental, vision, fitness, mental health, life insurance, and more — each with its own contract, invoice, and reporting format. Despite spending HK$8,200 per employee per year, utilisation surveys showed only 40% of employees were actively using any benefit beyond basic medical.",
      },
      {
        heading: "Root Cause Analysis",
        body: "MixCare's benefits audit revealed three root causes of low utilisation: benefit discovery (employees didn't know what was available), access friction (each benefit required a separate login, card, or form), and relevance mismatch (a 29-year-old in Singapore had the same plan as a 52-year-old in Hong Kong). The solution required a unified platform with personalisation — not just a better vendor list.",
      },
      {
        heading: "Flexible Benefits Implementation",
        body: "MixCare deployed its flexible benefits engine in two phases. Phase 1 (weeks 1–3): vendor integration — all 40+ existing vendors connected via API or data feed. Phase 2 (weeks 4–6): employee onboarding — each employee received a personalised benefit wallet with their annual allowance and a curated catalogue to choose from. The HR team managed the entire setup through MixCare's admin portal with no coding required.",
      },
      {
        heading: "Results After Two Quarters",
        body: "Six months after full deployment:",
        bullets: [
          "Overall benefit utilisation: 40% → 92%",
          "Employee satisfaction with benefits: +45 percentage points",
          "HR admin time on benefit operations: down 70%",
          "Vendor invoice processing: consolidated from 40+ to 1 monthly payment",
          "Benefit-related HR queries: down 58%",
          "All 12 offices on a unified platform with single sign-on",
        ],
      },
      {
        heading: "The Business Case",
        body: "Jardine's CFO requested an ROI analysis after the first year. The result: the same HK$8,200 per employee benefit budget now delivered 2.3× the perceived value to employees (measured by benefit satisfaction surveys). Admin cost savings (HR time, vendor management) offset 40% of the platform fee. And voluntary turnover in the 12 months post-deployment was 14% lower than the prior year — attributable in part to improved benefit satisfaction.",
      },
    ],
  },
  {
    slug: "techbridge-hk-smb-benefits",
    index: 2,
    challenge: "TechBridge was losing senior engineering candidates to larger competitors with better benefit packages. As a 25-person startup, traditional group insurance was cost-prohibitive.",
    approach: "MixCare's SMB Starter plan gave TechBridge enterprise-grade flexible benefits, including FSA wallets and wellness marketplace access, deployed and running in under one day.",
    outcomes: [
      "Setup completed in under 60 minutes",
      "2 senior hires retained vs. larger competitors",
      "Benefits cost 30% below comparable group plans",
      "100% employee adoption within first month",
    ],
    sections: [
      {
        heading: "Competing for Talent as a 25-Person Startup",
        body: "TechBridge HK is a fintech startup founded in 2022. By early 2024, the team had grown to 25 engineers and product managers. The founders were proud of their culture and equity package — but were losing final-round candidates to banks and larger tech companies that offered comprehensive health benefits. Two senior engineer candidates turned down offers specifically citing benefits as the reason. TechBridge needed a solution that was enterprise-grade but startup-affordable.",
      },
      {
        heading: "Why Traditional Group Insurance Didn't Work",
        body: "TechBridge's operations manager explored traditional group medical insurance with three brokers. The feedback was consistent: minimum 10-employee headcount (met), annual contracts (problematic for a growing startup), and premiums of HK$4,200–6,800 per employee per year with fixed, inflexible coverage. For a startup team spanning ages 24–41 with diverse health priorities, a one-size plan felt like a waste. And the broker process alone took three weeks.",
      },
      {
        heading: "MixCare SMB Starter: Setup in 60 Minutes",
        body: "TechBridge signed up for MixCare's SMB Starter plan on a Tuesday afternoon. By that evening, all 25 employees had received an email with their benefit wallet and app download link. The setup process: company registration (10 minutes), employee roster upload (15 minutes), benefit budget configuration (20 minutes), and employee communications (15 minutes). Total time: under 60 minutes. No broker, no underwriting, no contract.",
      },
      {
        heading: "What Employees Got",
        body: "Each employee received an annual benefit wallet of HK$4,800 — below the cost of a traditional group plan — but covering a much broader range of choices:",
        bullets: [
          "GP and specialist consultations (cashless via panel)",
          "Dental and vision care",
          "Mental health counselling and therapy apps",
          "Gym memberships and fitness classes",
          "Traditional Chinese Medicine and physiotherapy",
          "Health screening packages",
        ],
      },
      {
        heading: "Business Impact",
        body: "Within 30 days of launch, 100% of employees had activated their benefit wallet and made at least one claim or booking. The next two senior engineer candidates who received offers accepted — both later told HR that benefits were a positive factor. Total benefit cost: HK$4,800 per employee per year — 30% below the comparable group plan quotes TechBridge had received.",
      },
    ],
  },
];

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  const locale = await getLocale();
  const t = getTranslations(locale);
  const item = t.resources.caseStudies.items[cs.index];
  return {
    title: `${item.headline} | ${SITE_NAME}`,
    description: `${item.company} case study: ${item.result}`,
    alternates: { canonical: `${SITE_URL}/en/resources/case-studies/${slug}` },
    openGraph: {
      title: item.headline,
      description: item.result,
      url: `${SITE_URL}/en/resources/case-studies/${slug}`,
      type: "article",
      images: ogImage(item.headline),
    },
    twitter: { card: "summary_large_image", title: item.headline, description: item.result },
  };
}

export default async function CaseStudyPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const locale = await getLocale();
  const t = getTranslations(locale);
  const item = t.resources.caseStudies.items[cs.index];
  const related = t.resources.caseStudies.items.filter((_, i) => i !== cs.index);
  const relatedSlugs = caseStudies.filter((c) => c.slug !== slug);

  return (
    <main>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Case Studies", path: "/resources/case-studies" },
          { name: item.company, path: `/resources/case-studies/${slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: item.headline,
          description: item.result,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        },
      ]} />
      <AppNavbar />

      {/* Header */}
      <div
        className="pt-24 pb-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${item.color} 0%, #1e3a5f 100%)` }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href={localePath(locale, "/resources/case-studies")}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" /> {t.resources.caseStudies.heading}
          </Link>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            {item.segment}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {item.headline}
          </h1>
          <p className="text-white/80 text-lg font-medium">{item.company}</p>
        </div>
      </div>

      {/* Result callout bar */}
      <div className="py-4 border-b border-slate-100" style={{ backgroundColor: item.color + "12" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <TrendingUp size={18} style={{ color: item.color }} aria-hidden="true" />
          <p className="text-sm font-bold" style={{ color: item.color }}>{item.result}</p>
        </div>
      </div>

      {/* Body + sidebar */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main content */}
            <article className="lg:col-span-2" itemScope itemType="https://schema.org/Article">

              {/* Challenge / Approach summary */}
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                <div className="rounded-2xl p-5 border border-slate-100" style={{ backgroundColor: "#f8fafc" }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">The Challenge</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{cs.challenge}</p>
                </div>
                <div className="rounded-2xl p-5 border border-slate-100" style={{ backgroundColor: "#f8fafc" }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">The Approach</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{cs.approach}</p>
                </div>
              </div>

              {/* Outcomes highlight */}
              <div className="rounded-2xl p-6 mb-10" style={{ backgroundColor: item.color + "0d", borderLeft: `4px solid ${item.color}` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: item.color }}>Key Outcomes</p>
                <ul className="space-y-2" role="list">
                  {cs.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-sm font-semibold text-slate-800">
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: item.color }} aria-hidden="true" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full story sections */}
              <div className="space-y-8">
                {cs.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-xl font-extrabold text-slate-900 mb-3">{section.heading}</h2>
                    <p className="text-slate-600 leading-relaxed mb-3">{section.body}</p>
                    {section.bullets && (
                      <ul className="space-y-2 mt-3" role="list">
                        {section.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: item.color }} aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Company tag */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  {item.company.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{item.company}</p>
                  <p className="text-sm text-slate-500">{item.segment} · MixCare Client</p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA card */}
              <div
                className="rounded-2xl p-6 text-white"
                style={{ background: `linear-gradient(135deg, ${item.color} 0%, #1e3a5f 100%)` }}
              >
                <p className="font-extrabold text-lg mb-2">Get a similar result</p>
                <p className="text-sm text-white/80 mb-5">Talk to a MixCare specialist and get a personalised demo for your organisation.</p>
                <Link
                  href={localePath(locale, "/get-a-demo")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#f97316", color: "#fff" }}
                >
                  {t.resources.cta.ctaLabel} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Related case studies */}
              <div className="rounded-2xl border border-slate-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={16} style={{ color: "#0d9488" }} aria-hidden="true" />
                  <h3 className="font-bold text-slate-900 text-sm">More Case Studies</h3>
                </div>
                <div className="space-y-4">
                  {related.map((rp, i) => {
                    const rs = relatedSlugs[i];
                    return (
                      <Link
                        key={rp.company}
                        href={localePath(locale, `/resources/case-studies/${rs?.slug ?? "#"}`)}
                        className="group block"
                      >
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1"
                          style={{ backgroundColor: rp.color + "18", color: rp.color }}
                        >
                          {rp.segment}
                        </span>
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                          {rp.headline}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{rp.company}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Back link */}
              <Link
                href={localePath(locale, "/resources/case-studies")}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
              >
                <ArrowLeft size={14} aria-hidden="true" /> All Case Studies
              </Link>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
