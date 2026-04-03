import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import Link from "next/link";

const { canonical, languages } = buildAlternates("/resources/case-studies");

export const metadata: Metadata = {
  title: "Client Case Studies — Real Results with MixCare Health",
  description:
    "See how insurers, enterprises, and SMBs across Hong Kong and Singapore achieved measurable results with MixCare's AI-powered health benefits platform.",
  keywords: [
    "health benefits case studies", "MixCare case studies", "AI claims results",
    "flexible benefits ROI", "employee benefits Hong Kong results",
    "digital health success stories", "insurer case study Asia",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Client Case Studies | ${SITE_NAME}`,
    description: "Real results from insurers, enterprises, and SMBs using MixCare's AI-powered health benefits platform.",
    url: canonical,
    type: "website",
    images: ogImage("MixCare Case Studies"),
  },
  twitter: {
    card: "summary_large_image",
    title: `Case Studies | ${SITE_NAME}`,
    description: "Real results from AI-powered health benefits across Hong Kong, Macau, and Singapore.",
    images: ["/opengraph-image.png"],
  },
};

const caseStudySlugs = [
  "axa-hong-kong-ai-claims",
  "jardine-matheson-flexible-benefits",
  "techbridge-hk-smb-benefits",
];

// Extended case study content
const caseStudyDetails = [
  {
    challenge: "Processing thousands of monthly outpatient claims manually was slow, costly, and fraud-prone. AXA needed a scalable, digital-first solution to modernise their self-funded outpatient scheme.",
    approach: "MixCare integrated its AI claims engine directly with AXA's existing systems. The AI model reviews claim documents, cross-references against a 2,000+ panel doctor network, and flags anomalies in real time.",
    outcomes: [
      "70% reduction in claims processing cost",
      "Average claim resolved in under 18 hours",
      "60% reduction in fraudulent claims",
      "99.2% uptime across all claim touch-points",
    ],
  },
  {
    challenge: "With 12 offices and a diverse workforce, Jardine's HR team was managing over 40 benefit vendors. Employee utilisation was just 40% despite significant annual investment.",
    approach: "MixCare deployed its flexible benefits engine with a single employee self-selection portal, integrating all vendors under one platform with real-time utilisation dashboards.",
    outcomes: [
      "Utilisation jumped from 40% to 92% within 2 quarters",
      "Employee satisfaction score up 45%",
      "HR admin time reduced by 70%",
      "All 12 offices on one unified platform",
    ],
  },
  {
    challenge: "TechBridge was losing senior engineering candidates to larger competitors with better benefit packages. As a 25-person startup, traditional group insurance was cost-prohibitive.",
    approach: "MixCare's SMB Starter plan gave TechBridge enterprise-grade flexible benefits, including FSA wallets and wellness marketplace access, deployed and running in under one day.",
    outcomes: [
      "Setup completed in under 60 minutes",
      "2 senior hires retained vs. larger competitors",
      "Benefits cost 30% below comparable group plans",
      "100% employee adoption within first month",
    ],
  },
];

export default async function CaseStudiesPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const r = t.resources;

  return (
    <main>
      <JsonLd data={[
        webPageSchema(
          "Client Case Studies — Real Results with MixCare Health",
          "See how insurers, enterprises, and SMBs achieved measurable results with MixCare's AI-powered health benefits platform.",
          "/resources/case-studies"
        ),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Case Studies", path: "/resources/case-studies" },
        ]),
      ]} />
      <AppNavbar />

      {/* Page header */}
      <div className="pt-24 pb-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={localePath(locale, "/resources")}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-700 transition-colors mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Resources
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#dbeafe" }}>
              <FileText size={20} style={{ color: "#1d4ed8" }} aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">{r.caseStudies.heading}</h1>
          </div>
          <p className="text-slate-500 max-w-2xl">{r.hero.sub}</p>
        </div>
      </div>

      {/* Case studies */}
      <div className="py-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {r.caseStudies.items.map((cs, i) => {
            const detail = caseStudyDetails[i];
            return (
              <article
                key={cs.company}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow"
                itemScope
                itemType="https://schema.org/Article"
              >
                {/* Accent top bar */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${cs.color}, ${cs.color}55)` }} aria-hidden="true" />

                <div className="p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{ backgroundColor: cs.color + "18", color: cs.color }}
                    >
                      {cs.segment}
                    </span>
                    <span className="text-slate-400 text-sm font-semibold">{cs.company}</span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 mb-6 leading-snug" itemProp="headline">
                    {cs.headline}
                  </h2>

                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Challenge */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">The Challenge</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{detail?.challenge}</p>
                    </div>
                    {/* Approach */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">The Approach</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{detail?.approach}</p>
                    </div>
                    {/* Outcomes */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Key Outcomes</h3>
                      <ul className="space-y-2" role="list">
                        {detail?.outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2 text-sm">
                            <TrendingUp size={14} className="flex-shrink-0 mt-0.5" style={{ color: cs.color }} aria-hidden="true" />
                            <span className="font-semibold text-slate-800">{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Result callout */}
                  <div
                    className="mt-6 rounded-2xl px-6 py-4 flex items-center gap-3"
                    style={{ backgroundColor: cs.color + "10", borderLeft: `4px solid ${cs.color}` }}
                  >
                    <TrendingUp size={18} style={{ color: cs.color }} aria-hidden="true" />
                    <p className="text-sm font-bold" style={{ color: cs.color }}>{cs.result}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href={localePath(locale, `/resources/case-studies/${caseStudySlugs[i]}`)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow hover:shadow-md"
                      style={{ backgroundColor: cs.color }}
                    >
                      Read full case study <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Back link */}
          <div className="pt-4 text-center">
            <Link
              href={localePath(locale, "/resources")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
            >
              <ArrowLeft size={14} aria-hidden="true" /> Back to Resources
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
