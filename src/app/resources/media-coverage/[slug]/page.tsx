import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Newspaper, Calendar, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, ogImage } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import {
  allPressSlugsQuery,
  allPressItemsQuery,
  pressItemBySlugQuery,
  type SanityPressItem,
  type SanityPressItemListItem,
} from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

// Category colour map
const categoryColors: Record<string, { bg: string; text: string }> = {
  "Press Coverage":  { bg: "#dbeafe", text: "#1d4ed8" },
  "Press Release":   { bg: "#ccfbf1", text: "#0f766e" },
  "Interview":       { bg: "#f3e8ff", text: "#7e22ce" },
  "Award":           { bg: "#fef3c7", text: "#92400e" },
  "Industry Report": { bg: "#dcfce7", text: "#15803d" },
};

function getCategoryColor(cat: string) {
  return categoryColors[cat] ?? { bg: "#f1f5f9", text: "#475569" };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// ── Static params & metadata ──────────────────────────────────────────────────
type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  if (!isSanityConfigured) return [];
  const slugs: { slug: string }[] = await sanityClient.fetch(allPressSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isSanityConfigured) return {};
  const item: SanityPressItem | null = await sanityClient.fetch(pressItemBySlugQuery, { slug, locale: "en" });
  if (!item) return {};
  return {
    title: `${item.title} | ${SITE_NAME}`,
    description: item.description,
    alternates: { canonical: `${SITE_URL}/en/resources/media-coverage/${slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
      url: `${SITE_URL}/en/resources/media-coverage/${slug}`,
      type: "article",
      images: item.coverImage
        ? [{ url: urlFor(item.coverImage).width(1200).height(630).url() }]
        : ogImage(item.title),
    },
    twitter: { card: "summary_large_image", title: item.title, description: item.description },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function PressItemPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  if (!isSanityConfigured) notFound();

  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);

  const [item, allItems]: [SanityPressItem | null, SanityPressItemListItem[]] = await Promise.all([
    sanityClient.fetch(pressItemBySlugQuery, { slug, locale: sanityLocale }),
    sanityClient.fetch(allPressItemsQuery, { locale: sanityLocale }),
  ]);

  if (!item) notFound();

  const t = getTranslations(locale);
  const ui = t.resources.ui;
  const col = getCategoryColor(item.category);

  // Related = 3 other items
  const related = allItems.filter((p) => p.slug !== slug).slice(0, 3);

  // If item has an external URL and NO sections, redirect to the external link
  // (handled by rendering a prominent link instead)
  const isHosted = item.sections && item.sections.length > 0;

  return (
    <main>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Media Coverage", path: "/resources/media-coverage" },
          { name: item.title, path: `/resources/media-coverage/${slug}` },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: item.title,
          description: item.description,
          datePublished: item.publishedAt,
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          ...(item.externalUrl ? { url: item.externalUrl } : {}),
        },
      ]} />
      <AppNavbar />

      {/* Header */}
      <div
        className="pt-24 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
      >
        {item.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(item.coverImage).width(1400).height(500).fit("crop").url()}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
        )}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href={localePath(locale, "/resources/media-coverage")}
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} aria-hidden="true" /> {ui.backToMedia}
          </Link>

          {/* Category + outlet */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: col.bg, color: col.text }}
            >
              {item.category}
            </span>
            <span className="text-white/60 text-sm font-semibold">
              {ui.source}: {item.outlet}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-2">
              <Calendar size={14} aria-hidden="true" />
              <time>{formatDate(item.publishedAt)}</time>
            </span>
            {item.externalUrl && (
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
              >
                <ExternalLink size={14} aria-hidden="true" />
                {ui.viewOriginal}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body + sidebar */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Main content */}
            <article className="lg:col-span-2" itemScope itemType="https://schema.org/NewsArticle">

              {/* Description callout */}
              {item.description && (
                <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium border-l-4 pl-5" style={{ borderColor: "#0d9488" }}>
                  {item.description}
                </p>
              )}

              {/* External-only: prominent link card */}
              {!isHosted && item.externalUrl && (
                <div
                  className="rounded-2xl p-7 mb-8 border border-slate-100"
                  style={{ backgroundColor: "#f0fdfa" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#ccfbf1" }}
                    >
                      <Newspaper size={20} style={{ color: "#0d9488" }} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 mb-1">{item.outlet}</p>
                      <p className="text-sm text-slate-600 mb-4">
                        This article was published by <strong>{item.outlet}</strong> on {formatDate(item.publishedAt)}.
                      </p>
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                        style={{ backgroundColor: "#0d9488" }}
                      >
                        {ui.viewOriginal} <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Hosted content sections */}
              {isHosted && (
                <div className="space-y-8">
                  {item.sections.map((section, i) => (
                    <section key={i}>
                      <h2 className="text-xl font-extrabold text-slate-900 mb-3">{section.heading}</h2>
                      <p className="text-slate-600 leading-relaxed mb-3">{section.body}</p>
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="space-y-2 mt-3" role="list">
                          {section.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3 text-sm text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#0d9488" }} aria-hidden="true" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              )}

              {/* Outlet footer */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center gap-4">
                {item.outletLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlFor(item.outletLogo).height(48).url()}
                    alt={item.outlet}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ backgroundColor: "#0d9488" }}>
                    {item.outlet[0]}
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-900">{item.outlet}</p>
                  <p className="text-sm text-slate-500">{formatDate(item.publishedAt)}</p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA card */}
              <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}>
                <p className="font-extrabold text-lg mb-2">See MixCare in action</p>
                <p className="text-sm text-white/80 mb-5">Get a personalised demo for your team — no commitment required.</p>
                <Link
                  href={"https://meetings-na2.hubspot.com/alex-wong9/mixcare-exploration-meeting-"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: "#f97316", color: "#fff" }}
                >
                  {t.resources.cta.ctaLabel} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Related coverage */}
              {related.length > 0 && (
                <div className="rounded-2xl border border-slate-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Newspaper size={16} style={{ color: "#0d9488" }} aria-hidden="true" />
                    <h3 className="font-bold text-slate-900 text-sm">{ui.relatedCoverage}</h3>
                  </div>
                  <div className="space-y-4">
                    {related.map((rp) => {
                      const rcol = getCategoryColor(rp.category);
                      const isHostedItem = !rp.externalUrl;
                      return (
                        <a
                          key={rp.slug}
                          href={
                            isHostedItem
                              ? localePath(locale, `/resources/media-coverage/${rp.slug}`)
                              : rp.externalUrl!
                          }
                          target={isHostedItem ? undefined : "_blank"}
                          rel={isHostedItem ? undefined : "noopener noreferrer"}
                          className="group block"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold"
                              style={{ backgroundColor: rcol.bg, color: rcol.text }}
                            >
                              {rp.category}
                            </span>
                            <span className="text-[10px] text-slate-400">{rp.outlet}</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                            {rp.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">{formatDateShort(rp.publishedAt)}</p>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Back link */}
              <Link
                href={localePath(locale, "/resources/media-coverage")}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-700 transition-colors"
              >
                <ArrowLeft size={14} aria-hidden="true" /> {ui.backToMedia}
              </Link>
            </aside>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
