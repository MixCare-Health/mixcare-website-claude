import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { localePath } from "@/lib/locale";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allCaseStudiesQuery, type SanityCaseStudyListItem } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export const revalidate = 60;

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

export default async function CaseStudiesPage() {
  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);

  const caseStudies: SanityCaseStudyListItem[] = isSanityConfigured
    ? await sanityClient.fetch<SanityCaseStudyListItem[]>(allCaseStudiesQuery, { locale: sanityLocale })
    : [];

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
            <h1 className="text-3xl font-extrabold text-slate-900">Case Studies</h1>
          </div>
          <p className="text-slate-500 max-w-2xl">Real results from AI-powered health benefits across Hong Kong, Macau, and Singapore.</p>
        </div>
      </div>

      {/* Case studies */}
      <div className="py-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {caseStudies.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow"
              itemScope
              itemType="https://schema.org/Article"
            >
              {/* Accent top bar or featured image */}
              {post.featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(post.featuredImage).width(1200).height(320).fit("crop").url()}
                  alt={post.company}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${post.color}, ${post.color}55)` }} aria-hidden="true" />
              )}

              <div className="p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{ backgroundColor: post.color + "18", color: post.color }}
                  >
                    {post.segment}
                  </span>
                  <span className="text-slate-400 text-sm font-semibold">{post.company}</span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 mb-6 leading-snug" itemProp="headline">
                  {post.headline}
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Description */}
                  <div className="md:col-span-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Overview</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{post.description}</p>
                  </div>
                  {/* Result */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Key Result</h3>
                    <div className="flex items-start gap-2 text-sm">
                      <TrendingUp size={14} className="flex-shrink-0 mt-0.5" style={{ color: post.color }} aria-hidden="true" />
                      <span className="font-semibold text-slate-800">{post.result}</span>
                    </div>
                  </div>
                </div>

                {/* Result callout */}
                <div
                  className="mt-6 rounded-2xl px-6 py-4 flex items-center gap-3"
                  style={{ backgroundColor: post.color + "10", borderLeft: `4px solid ${post.color}` }}
                >
                  <TrendingUp size={18} style={{ color: post.color }} aria-hidden="true" />
                  <p className="text-sm font-bold" style={{ color: post.color }}>{post.result}</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={localePath(locale, `/resources/case-studies/${post.slug}`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow hover:shadow-md"
                    style={{ backgroundColor: post.color }}
                  >
                    Read full case study <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}

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
