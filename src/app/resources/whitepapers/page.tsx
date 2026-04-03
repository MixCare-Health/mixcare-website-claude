import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, ArrowLeft, CheckCircle2, FileText } from "lucide-react";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { localePath } from "@/lib/locale";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allWhitepapersQuery, type SanityWhitepaperListItem } from "@/lib/sanity.queries";
import Link from "next/link";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/resources/whitepapers");

export const metadata: Metadata = {
  title: "Whitepapers & Guides — Free Health Benefits Resources | MixCare Health",
  description:
    "Download free whitepapers and guides on AI in insurance claims, Asia-Pacific employee benefits trends, and building flexible benefits programmes.",
  keywords: [
    "health benefits whitepaper", "AI insurance claims report", "employee benefits Asia 2025",
    "flexible benefits guide", "HR benefits download", "MixCare whitepaper",
    "digital health report Hong Kong", "insurance technology whitepaper",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Whitepapers & Guides | ${SITE_NAME}`,
    description: "Free whitepapers on AI in insurance, Asia-Pacific benefits trends, and flexible benefits programmes.",
    url: canonical,
    type: "website",
    images: ogImage("MixCare Whitepapers"),
  },
  twitter: {
    card: "summary_large_image",
    title: `Whitepapers & Guides | ${SITE_NAME}`,
    description: "Free guides on AI in health insurance and employee benefits across Asia-Pacific.",
    images: ["/opengraph-image.png"],
  },
};

export default async function WhitepapersPage() {
  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);

  const whitepapers: SanityWhitepaperListItem[] = isSanityConfigured
    ? await sanityClient.fetch<SanityWhitepaperListItem[]>(allWhitepapersQuery, { locale: sanityLocale })
    : [];

  return (
    <main>
      <JsonLd data={[
        webPageSchema(
          "Whitepapers & Guides — Free Health Benefits Resources",
          "Download free whitepapers on AI in insurance claims, Asia-Pacific employee benefits trends, and flexible benefits programmes.",
          "/resources/whitepapers"
        ),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Whitepapers", path: "/resources/whitepapers" },
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
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f3e8ff" }}>
              <Download size={20} style={{ color: "#7e22ce" }} aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">Whitepapers &amp; Guides</h1>
          </div>
          <p className="text-slate-500 max-w-2xl">Free whitepapers and guides on AI in insurance claims, Asia-Pacific employee benefits trends, and building flexible benefits programmes.</p>
        </div>
      </div>

      {/* Whitepapers */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {whitepapers.map((wp) => (
            <article
              key={wp.slug}
              className="rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow"
              itemScope
              itemType="https://schema.org/Book"
            >
              <div className="grid lg:grid-cols-3">
                {/* Visual cover */}
                <div className={`bg-gradient-to-br ${wp.gradient} p-10 flex flex-col justify-between`}>
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                      <FileText size={24} className="text-white" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-extrabold text-white leading-snug mb-3" itemProp="name">
                      {wp.title}
                    </h2>
                    <p className="text-white/70 text-sm">{wp.description}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">{wp.pages}</span>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">{wp.format}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-2 p-8 lg:p-10 bg-white flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Audience</p>
                    <p className="text-sm text-slate-600 mb-6">{wp.audience}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-6">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-teal-500" aria-hidden="true" />
                        <span className="font-semibold text-slate-700">{wp.format}</span>
                      </span>
                    </div>
                  </div>

                  {/* Download CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-slate-100">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow hover:shadow-md transition-all hover:-translate-y-0.5"
                      style={{ backgroundColor: "#0d9488" }}
                    >
                      <Download size={15} aria-hidden="true" />
                      Download Free
                    </a>
                    <Link
                      href={localePath(locale, `/resources/whitepapers/${wp.slug}`)}
                      className="text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
                    >
                      Read preview →
                    </Link>
                  </div>
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
