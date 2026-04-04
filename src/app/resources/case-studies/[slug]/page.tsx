import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ArrowLeft, ArrowRight, TrendingUp, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ogImage } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { localePath } from "@/lib/locale";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import {
  allCaseStudySlugsQuery,
  allCaseStudiesQuery,
  caseStudyBySlugQuery,
  type SanityCaseStudy,
  type SanityCaseStudyListItem,
} from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  if (!isSanityConfigured) return [];
  const results = await sanityClient.fetch<Array<{ slug: string }>>(allCaseStudySlugsQuery);
  return results.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await sanityClient.fetch<SanityCaseStudy | null>(
    caseStudyBySlugQuery,
    { slug, locale: "en" }
  );
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.headline} | ${SITE_NAME}`,
    description: `${caseStudy.company} case study: ${caseStudy.result}`,
    alternates: { canonical: `${SITE_URL}/en/resources/case-studies/${slug}` },
    openGraph: {
      title: caseStudy.headline,
      description: caseStudy.result,
      url: `${SITE_URL}/en/resources/case-studies/${slug}`,
      type: "article",
      images: ogImage(caseStudy.headline),
    },
    twitter: { card: "summary_large_image", title: caseStudy.headline, description: caseStudy.result },
  };
}

export default async function CaseStudyPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  if (!isSanityConfigured) notFound();

  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);

  const [caseStudy, allCaseStudies] = await Promise.all([
    sanityClient.fetch<SanityCaseStudy | null>(caseStudyBySlugQuery, { slug, locale: sanityLocale }),
    sanityClient.fetch<SanityCaseStudyListItem[]>(allCaseStudiesQuery, { locale: sanityLocale }),
  ]);

  if (!caseStudy) notFound();

  const related = allCaseStudies.filter((c) => c.slug !== slug).slice(0, 2);

  return (
    <main>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Case Studies", path: "/resources/case-studies" },
          { name: caseStudy.company, path: `/resources/case-studies/${slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: caseStudy.headline,
          description: caseStudy.result,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        },
      ]} />
      <AppNavbar />

      {/* Header */}
      <div
        className="pt-24 pb-16 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${caseStudy.color} 0%, #1e3a5f 100%)` }}
      >
        {caseStudy.featuredImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(caseStudy.featuredImage).width(1400).height(500).fit("crop").url()}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href={localePath(locale, "/resources/case-studies")}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Case Studies
          </Link>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            {caseStudy.segment}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {caseStudy.headline}
          </h1>
          <p className="text-white/80 text-lg font-medium">{caseStudy.company}</p>
        </div>
      </div>

      {/* Result callout bar */}
      <div className="py-4 border-b border-slate-100" style={{ backgroundColor: caseStudy.color + "12" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <TrendingUp size={18} style={{ color: caseStudy.color }} aria-hidden="true" />
          <p className="text-sm font-bold" style={{ color: caseStudy.color }}>{caseStudy.result}</p>
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
                  <p className="text-sm text-slate-600 leading-relaxed">{caseStudy.challenge}</p>
                </div>
                <div className="rounded-2xl p-5 border border-slate-100" style={{ backgroundColor: "#f8fafc" }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">The Approach</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{caseStudy.approach}</p>
                </div>
              </div>

              {/* Outcomes highlight */}
              <div className="rounded-2xl p-6 mb-10" style={{ backgroundColor: caseStudy.color + "0d", borderLeft: `4px solid ${caseStudy.color}` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: caseStudy.color }}>Key Outcomes</p>
                <ul className="space-y-2" role="list">
                  {caseStudy.outcomes.map((o) => (
                    <li key={o.value} className="flex items-start gap-3 text-sm font-semibold text-slate-800">
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: caseStudy.color }} aria-hidden="true" />
                      {o.value} {o.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full story sections */}
              <div className="space-y-8">
                {caseStudy.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-xl font-extrabold text-slate-900 mb-3">{section.heading}</h2>
                    <p className="text-slate-600 leading-relaxed mb-3">{section.body}</p>
                    {section.bullets && (
                      <ul className="space-y-2 mt-3" role="list">
                        {section.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: caseStudy.color }} aria-hidden="true" />
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
                  style={{ backgroundColor: caseStudy.color }}
                >
                  {caseStudy.company.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{caseStudy.company}</p>
                  <p className="text-sm text-slate-500">{caseStudy.segment} · MixCare Client</p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA card */}
              <div
                className="rounded-2xl p-6 text-white"
                style={{ background: `linear-gradient(135deg, ${caseStudy.color} 0%, #1e3a5f 100%)` }}
              >
                <p className="font-extrabold text-lg mb-2">Get a similar result</p>
                <p className="text-sm text-white/80 mb-5">Talk to a MixCare specialist and get a personalised demo for your organisation.</p>
                <Link
                  href={localePath(locale, "/get-a-demo")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#f97316", color: "#fff" }}
                >
                  Get a Demo <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Related case studies */}
              <div className="rounded-2xl border border-slate-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={16} style={{ color: "#0d9488" }} aria-hidden="true" />
                  <h3 className="font-bold text-slate-900 text-sm">More Case Studies</h3>
                </div>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={localePath(locale, `/resources/case-studies/${r.slug}`)}
                      className="group block"
                    >
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1"
                        style={{ backgroundColor: r.color + "18", color: r.color }}
                      >
                        {r.segment}
                      </span>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                        {r.headline}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{r.company}</p>
                    </Link>
                  ))}
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
