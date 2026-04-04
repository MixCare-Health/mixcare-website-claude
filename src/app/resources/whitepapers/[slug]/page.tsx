import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, ArrowLeft, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ogImage } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { localePath } from "@/lib/locale";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import {
  allWhitepaperSlugsQuery,
  allWhitepapersQuery,
  whitepaperBySlugQuery,
  type SanityWhitepaper,
  type SanityWhitepaperListItem,
} from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  if (!isSanityConfigured) return [];
  const results = await sanityClient.fetch<Array<{ slug: string }>>(allWhitepaperSlugsQuery);
  return results.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const whitepaper = await sanityClient.fetch<SanityWhitepaper | null>(
    whitepaperBySlugQuery,
    { slug, locale: "en" }
  );
  if (!whitepaper) return {};
  return {
    title: `${whitepaper.title} | ${SITE_NAME}`,
    description: whitepaper.description,
    alternates: { canonical: `${SITE_URL}/en/resources/whitepapers/${slug}` },
    openGraph: {
      title: whitepaper.title,
      description: whitepaper.description,
      url: `${SITE_URL}/en/resources/whitepapers/${slug}`,
      type: "article",
      images: ogImage(whitepaper.title),
    },
    twitter: { card: "summary_large_image", title: whitepaper.title, description: whitepaper.description },
  };
}

export default async function WhitepaperPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  if (!isSanityConfigured) notFound();

  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);

  const [whitepaper, allWhitepapers] = await Promise.all([
    sanityClient.fetch<SanityWhitepaper | null>(whitepaperBySlugQuery, { slug, locale: sanityLocale }),
    sanityClient.fetch<SanityWhitepaperListItem[]>(allWhitepapersQuery, { locale: sanityLocale }),
  ]);

  if (!whitepaper) notFound();

  const related = allWhitepapers.filter((w) => w.slug !== slug).slice(0, 2);

  return (
    <main>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Whitepapers", path: "/resources/whitepapers" },
          { name: whitepaper.title, path: `/resources/whitepapers/${slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Book",
          name: whitepaper.title,
          description: whitepaper.description,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          bookFormat: "EBook",
          inLanguage: "en",
        },
      ]} />
      <AppNavbar />

      {/* Header */}
      <div className={`pt-24 pb-16 relative overflow-hidden bg-gradient-to-br ${whitepaper.gradient}`}>
        {whitepaper.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(whitepaper.coverImage).width(1400).height(500).fit("crop").url()}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href={localePath(locale, "/resources/whitepapers")}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Whitepapers
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">{whitepaper.pages}</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">{whitepaper.format}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {whitepaper.title}
          </h1>
          <p className="text-white/80 text-lg mb-8">{whitepaper.description}</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: "#f97316" }}
          >
            <Download size={15} aria-hidden="true" />
            Download Free
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
                  {whitepaper.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: whitepaper.accentColor }} aria-hidden="true" />
                      <span className="text-sm text-slate-700 font-medium">{topic}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span><span className="font-semibold text-slate-700">Audience:</span> {whitepaper.audience}</span>
                </div>
              </div>

              {/* Full content preview sections */}
              <div className="space-y-8">
                {whitepaper.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-xl font-extrabold text-slate-900 mb-3">{section.heading}</h2>
                    <p className="text-slate-600 leading-relaxed mb-3">{section.body}</p>
                    {section.bullets && (
                      <ul className="space-y-2 mt-3" role="list">
                        {section.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: whitepaper.accentColor }} aria-hidden="true" />
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
                    style={{ backgroundColor: whitepaper.accentColor }}
                  >
                    <Download size={15} aria-hidden="true" />
                    Download Free
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
                style={{ background: `linear-gradient(135deg, ${whitepaper.accentColor} 0%, #1e3a5f 100%)` }}
              >
                <p className="font-extrabold text-lg mb-2">See MixCare in action</p>
                <p className="text-sm text-white/80 mb-5">Get a personalised demo and see how this applies to your organisation.</p>
                <Link
                  href={localePath(locale, "/get-a-demo")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#f97316", color: "#fff" }}
                >
                  Get a Demo <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Related whitepapers */}
              <div className="rounded-2xl border border-slate-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={16} style={{ color: "#0d9488" }} aria-hidden="true" />
                  <h3 className="font-bold text-slate-900 text-sm">More Guides</h3>
                </div>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={localePath(locale, `/resources/whitepapers/${r.slug}`)}
                      className="group block"
                    >
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-1 bg-slate-100 text-slate-600">
                        {r.pages}
                      </span>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                        {r.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{r.description}</p>
                    </Link>
                  ))}
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
