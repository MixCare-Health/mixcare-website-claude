import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, ArrowLeft, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ogImage } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import Link from "next/link";
import { notFound } from "next/navigation";

// ── Static content ────────────────────────────────────────────────────────────
const whitepapers = [
  {
    slug: "employee-benefits-asia-pacific-2025",
    index: 0,
    gradient: "from-teal-600 to-cyan-800",
    accentColor: "#0d9488",
    format: "PDF Report",
    audience: "HR Directors, Benefits Managers, C-Suite",
    topics: [
      "State of employee benefits across HK, SG & MO",
      "Top 10 benefit types employees actually value",
      "Utilisation gap: why 58% of benefits go unused",
      "Cost benchmarks by company size and sector",
      "2025 HR priorities and benefit investment plans",
    ],
    sections: [
      {
        heading: "About This Report",
        body: "The State of Employee Benefits in Asia-Pacific 2025 is MixCare's annual survey of HR leaders and employees across Hong Kong, Macau, and Singapore. This edition surveyed 500 HR professionals (Director level and above) and 5,000 employees across companies ranging from 10 to 10,000+ employees. The survey was conducted in Q4 2024 and reflects current benefit structures, satisfaction levels, and 2025 investment intentions.",
      },
      {
        heading: "Key Finding 1: The Utilisation Gap",
        body: "Despite average annual benefit spend of HK$5,800 per employee, only 42% of employees report actively using any benefit beyond basic outpatient medical coverage. The top reason: lack of awareness (48% of employees say they don't know what benefits are available). The second reason: access friction (32% say it's too complicated to use their benefits). The third: relevance mismatch (27% say the available benefits don't match their personal needs.",
        bullets: [
          "58% of annual benefit spend goes unused across the market",
          "Lack of awareness is the #1 barrier to utilisation",
          "Companies with flexible benefits have 2.2× higher utilisation",
          "Digital-first access (app/portal) is the #1 requested improvement",
        ],
      },
      {
        heading: "Key Finding 2: Mental Health Rises to #1",
        body: "For the first time, mental health support has surpassed traditional outpatient coverage as the most-requested benefit among employees aged 22–40. 71% of respondents in financial services and technology sectors rated mental health benefits as 'very important' or 'essential'. Yet only 23% of employers currently offer any structured mental health benefit beyond a basic EAP.",
      },
      {
        heading: "Key Finding 3: Cost Benchmarks by Sector",
        body: "Average annual benefit spend per employee by sector:",
        bullets: [
          "Financial Services: HK$9,200/year (highest across all sectors)",
          "Technology: HK$7,400/year",
          "Professional Services: HK$6,800/year",
          "Retail & Hospitality: HK$3,600/year",
          "Manufacturing: HK$3,100/year",
          "SMB (under 50 employees): HK$3,800/year",
        ],
      },
      {
        heading: "2025 HR Priorities",
        body: "When asked about their top benefit investment priorities for 2025, HR Directors cited: mental health benefits (64%), flexible benefits technology (58%), wellness marketplace access (44%), and AI-powered claims processing (39%). Cost optimisation — not feature expansion — is the primary driver, with 71% of HR leaders prioritising getting more utilisation from existing spend rather than increasing budgets.",
      },
      {
        heading: "What This Means for HR Leaders",
        body: "The data points to a consistent conclusion: the problem in Asian employee benefits is not spend — it's delivery. Companies spending less per employee but using flexible, digital-first platforms consistently outperform on utilisation and satisfaction. The shift to flexible benefits technology is no longer an innovation — it's becoming table stakes for competitive employer branding.",
      },
    ],
  },
  {
    slug: "ai-health-insurance-claims-technical",
    index: 1,
    gradient: "from-violet-600 to-indigo-800",
    accentColor: "#7c3aed",
    format: "Technical PDF",
    audience: "Insurance CTOs, Product Managers, Actuaries",
    topics: [
      "How ML models classify and approve claims",
      "Fraud detection: pattern recognition at scale",
      "OCR and document parsing for cashless flow",
      "Integration architecture for insurers",
      "Accuracy benchmarks vs. manual processing",
    ],
    sections: [
      {
        heading: "Overview: The AI Claims Stack",
        body: "Modern AI-powered claims processing involves three distinct layers: document ingestion (OCR and structured data extraction), claims classification and rules engine (ML model + policy rules), and anomaly detection (fraud and error flagging). Each layer operates independently, enabling modular integration with existing insurer systems. This whitepaper covers the technical architecture, model performance benchmarks, and integration patterns used in MixCare's production claims environment.",
      },
      {
        heading: "Layer 1: OCR and Document Parsing",
        body: "The first challenge in claims automation is extracting structured data from unstructured documents — receipts, referral letters, lab reports, discharge summaries. MixCare's OCR pipeline uses a fine-tuned vision transformer model trained on 500,000+ healthcare documents from the HK, SG, and MO markets. Key capabilities:",
        bullets: [
          "98.7% field extraction accuracy across GP receipts, specialist invoices, and lab reports",
          "Support for Traditional Chinese, Simplified Chinese, and English documents",
          "Automatic detection of document type (receipt, referral, lab report, etc.)",
          "Structured output: diagnosis code, procedure code, amount, date, provider ID",
          "Handles degraded documents (low-quality scans, handwritten notes)",
        ],
      },
      {
        heading: "Layer 2: Claims Classification Model",
        body: "Once structured, each claim is processed by a gradient-boosted classification model that determines: whether the claim is covered under the policy, the correct benefit category allocation, whether pre-authorisation is required, and whether the claim meets STP (straight-through processing) criteria for auto-approval. The model is trained on MixCare's 2M+ historical claims dataset and is fine-tuned per client using their specific policy rules and coverage schedules.",
      },
      {
        heading: "Layer 3: Fraud and Anomaly Detection",
        body: "The anomaly detection layer runs in parallel with classification and flags statistical outliers for human review. Detection patterns include:",
        bullets: [
          "Duplicate claim detection (same patient, same date, same provider — within and across claims batches)",
          "Billing amount outliers (IQR-based detection by procedure type and provider)",
          "Procedure combination anomalies (medically inconsistent treatment sequences)",
          "Provider pattern analysis (unusual billing frequency or amount vs. network peers)",
          "Patient behaviour patterns (claim frequency anomalies vs. cohort baseline)",
        ],
      },
      {
        heading: "Integration Architecture",
        body: "MixCare's claims API is a REST-based microservice deployable as a cloud-hosted SaaS or on-premises container. Integration with insurer policy administration systems typically requires: a claim submission webhook (insurer pushes new claims to MixCare API), a decision callback (MixCare returns approve/decline/escalate decision with full audit trail), and an optional panel network sync (real-time provider data feed for eligibility checks). Average integration time: 2–5 business days for standard systems; 10–20 days for legacy policy administration platforms.",
      },
      {
        heading: "Performance Benchmarks",
        body: "Production benchmarks from MixCare's insurer client base (Q4 2024):",
        bullets: [
          "Straight-through processing rate: 84% of standard outpatient claims",
          "Average decision latency: 1.8 seconds per claim",
          "OCR extraction accuracy: 98.7%",
          "Fraud detection precision: 91% (true positive rate at 0.5 threshold)",
          "False positive rate: 4.2% (human review required but not fraud)",
          "Overall claims cost reduction vs. manual: 68–72%",
        ],
      },
    ],
  },
  {
    slug: "flexible-benefits-programme-guide",
    index: 2,
    gradient: "from-orange-500 to-rose-700",
    accentColor: "#ea580c",
    format: "Step-by-Step Guide",
    audience: "HR Teams, Operations Managers, Brokers",
    topics: [
      "Choosing between FSA, flex benefits, and group plans",
      "Budget structuring: top-down vs. bottom-up",
      "Vendor selection and integration checklist",
      "Employee communication playbook",
      "Measuring ROI: utilisation and satisfaction metrics",
    ],
    sections: [
      {
        heading: "Is Flexible Benefits Right for Your Organisation?",
        body: "Flexible benefits work best when: your workforce has diverse demographics (multiple age groups, life stages, or locations), your current benefit utilisation is below 60%, you have HR bandwidth to manage a one-time implementation (or a platform that handles it for you), and your annual benefit budget is at least HK$2,400 per employee per year. If you're a startup with under 10 employees and a tight budget, start with an FSA wallet — it gives employees choice without the complexity of a full flex platform.",
      },
      {
        heading: "Step 1: Audit Your Current Spend",
        body: "Before designing a flexible benefits programme, understand what you currently spend and how it's being used. Run a benefit audit:",
        bullets: [
          "List all current benefits and their annual cost per employee",
          "Survey employees on which benefits they actively use",
          "Identify underutilised benefits (below 30% usage) that could be replaced",
          "Calculate your total annual spend per employee",
          "Identify benefit gaps: what do your employees wish they had?",
        ],
      },
      {
        heading: "Step 2: Define Your Benefit Catalogue",
        body: "Your catalogue is the menu of benefit categories employees can choose from. Common categories in Asia-Pacific flexible benefits programmes include: outpatient medical (GP and specialist), dental and vision, mental health and counselling, fitness and wellness, family care (childcare, eldercare), life and critical illness insurance, and financial wellness. For most companies, starting with 4–6 categories is sufficient. Avoid catalogue sprawl — too many choices leads to decision paralysis.",
      },
      {
        heading: "Step 3: Budget Structuring",
        body: "There are two approaches to flexible benefits budgeting:",
        bullets: [
          "Top-down: Set a total budget per employee (e.g., HK$5,000/year) and let employees allocate freely across categories. Simplest to administer, hardest to forecast by category.",
          "Bottom-up: Set minimums per category (e.g., at least HK$1,200 to outpatient) and flexible top-up for the remainder. Ensures core coverage while giving choice on discretionary spend.",
          "Most MixCare clients use a hybrid: a mandatory core (outpatient + life) plus a flexible 'wallet' for everything else.",
        ],
      },
      {
        heading: "Step 4: Employee Communication",
        body: "The #1 reason flexible benefits programmes fail is poor communication. The most effective communication sequence: (1) CEO/HR email announcing the change and the reason (benefit choice = trust in employees), (2) a short explainer video (2–3 minutes) showing how to use the platform, (3) an FAQ document covering the most common questions, (4) manager briefing so line managers can answer questions, and (5) a 'go-live day' reminder with a direct link to the platform. Plan at least 3 touchpoints before the go-live date.",
      },
      {
        heading: "Step 5: Measuring ROI",
        body: "Track these metrics in the first 6 months post-launch:",
        bullets: [
          "Benefit utilisation rate (target: >75% in first quarter)",
          "Category allocation spread (are employees using all categories or just one?)",
          "Employee satisfaction score with benefits (run a 3-question pulse survey)",
          "HR admin time on benefit operations (compare to pre-launch baseline)",
          "Voluntary turnover rate (compare to prior 6-month period)",
          "Benefits-related HR query volume (should decline as employees self-serve)",
        ],
      },
    ],
  },
];

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return whitepapers.map((wp) => ({ slug: wp.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const wp = whitepapers.find((w) => w.slug === slug);
  if (!wp) return {};
  const locale = await getLocale();
  const t = getTranslations(locale);
  const item = t.resources.whitepapers.items[wp.index];
  return {
    title: `${item.title} | ${SITE_NAME}`,
    description: item.desc,
    alternates: { canonical: `${SITE_URL}/en/resources/whitepapers/${slug}` },
    openGraph: {
      title: item.title,
      description: item.desc,
      url: `${SITE_URL}/en/resources/whitepapers/${slug}`,
      type: "article",
      images: ogImage(item.title),
    },
    twitter: { card: "summary_large_image", title: item.title, description: item.desc },
  };
}

export default async function WhitepaperPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const wp = whitepapers.find((w) => w.slug === slug);
  if (!wp) notFound();

  const locale = await getLocale();
  const t = getTranslations(locale);
  const item = t.resources.whitepapers.items[wp.index];
  const related = t.resources.whitepapers.items.filter((_, i) => i !== wp.index);
  const relatedSlugs = whitepapers.filter((w) => w.slug !== slug);

  return (
    <main>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Whitepapers", path: "/resources/whitepapers" },
          { name: item.title, path: `/resources/whitepapers/${slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Book",
          name: item.title,
          description: item.desc,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          bookFormat: "EBook",
          inLanguage: "en",
        },
      ]} />
      <AppNavbar />

      {/* Header */}
      <div className={`pt-24 pb-16 relative overflow-hidden bg-gradient-to-br ${wp.gradient}`}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href={localePath(locale, "/resources/whitepapers")}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" /> {t.resources.whitepapers.heading}
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">{item.pages}</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">{wp.format}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {item.title}
          </h1>
          <p className="text-white/80 text-lg mb-8">{item.desc}</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: "#f97316" }}
          >
            <Download size={15} aria-hidden="true" />
            {t.resources.whitepapers.downloadBtn}
          </a>
        </div>
      </div>

      {/* Body + sidebar */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main content */}
            <article className="lg:col-span-2" itemScope itemType="https://schema.org/Book">

              {/* What's inside */}
              <div className="rounded-2xl p-6 mb-10 border border-slate-100" style={{ backgroundColor: "#f8fafc" }}>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">What&apos;s inside</p>
                <ul className="space-y-3" role="list">
                  {wp.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: wp.accentColor }} aria-hidden="true" />
                      <span className="text-sm text-slate-700 font-medium">{topic}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span><span className="font-semibold text-slate-700">Audience:</span> {wp.audience}</span>
                </div>
              </div>

              {/* Full content preview sections */}
              <div className="space-y-8">
                {wp.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-xl font-extrabold text-slate-900 mb-3">{section.heading}</h2>
                    <p className="text-slate-600 leading-relaxed mb-3">{section.body}</p>
                    {section.bullets && (
                      <ul className="space-y-2 mt-3" role="list">
                        {section.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: wp.accentColor }} aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Download CTA */}
              <div className="mt-12 pt-8 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-4">Download the full report for complete data, methodology, and recommendations.</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow hover:shadow-md transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: wp.accentColor }}
                  >
                    <Download size={15} aria-hidden="true" />
                    {t.resources.whitepapers.downloadBtn}
                  </a>
                  <p className="text-xs text-slate-400">No sign-up required · Instant download</p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Demo CTA */}
              <div
                className="rounded-2xl p-6 text-white"
                style={{ background: `linear-gradient(135deg, ${wp.accentColor} 0%, #1e3a5f 100%)` }}
              >
                <p className="font-extrabold text-lg mb-2">See MixCare in action</p>
                <p className="text-sm text-white/80 mb-5">Get a personalised demo and see how this applies to your organisation.</p>
                <Link
                  href={localePath(locale, "/get-a-demo")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#f97316", color: "#fff" }}
                >
                  {t.resources.cta.ctaLabel} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Related whitepapers */}
              <div className="rounded-2xl border border-slate-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={16} style={{ color: "#0d9488" }} aria-hidden="true" />
                  <h3 className="font-bold text-slate-900 text-sm">More Guides</h3>
                </div>
                <div className="space-y-4">
                  {related.map((rp, i) => {
                    const rs = relatedSlugs[i];
                    return (
                      <Link
                        key={rp.title}
                        href={localePath(locale, `/resources/whitepapers/${rs?.slug ?? "#"}`)}
                        className="group block"
                      >
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1 bg-slate-100 text-slate-600">
                          {rp.pages}
                        </span>
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                          {rp.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{rp.desc}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Back link */}
              <Link
                href={localePath(locale, "/resources/whitepapers")}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
              >
                <ArrowLeft size={14} aria-hidden="true" /> All Whitepapers
              </Link>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
