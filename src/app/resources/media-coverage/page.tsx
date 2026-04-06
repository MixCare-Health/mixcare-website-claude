import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allPressItemsQuery, type SanityPressItemListItem } from "@/lib/sanity.queries";
import { urlFor } from "@/sanity/lib/image";
import ResourcesTabs from "@/components/resources/ResourcesTabs";
import Link from "next/link";
import { ArrowRight, ExternalLink, Newspaper } from "lucide-react";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/resources/media-coverage");

export const metadata: Metadata = {
  title: "媒體報道 — Media Coverage | MixCare Health",
  description:
    "MixCare Health in the news — press coverage, press releases, interviews, and industry awards across Hong Kong, Macau, and Singapore.",
  keywords: [
    "MixCare press coverage", "MixCare news", "health tech news Hong Kong",
    "MixCare media", "digital health media coverage", "MixCare press release",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `媒體報道 | ${SITE_NAME}`,
    description: "MixCare Health in the news — press coverage, interviews, and awards.",
    url: canonical,
    images: ogImage("MixCare Media Coverage"),
  },
};

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
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function MediaCoveragePage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const ui = t.resources.ui;

  const pressItems: SanityPressItemListItem[] = isSanityConfigured
    ? await sanityClient.fetch<SanityPressItemListItem[]>(allPressItemsQuery, {
        locale: toSanityLocale(locale),
      })
    : [];

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema(
            "媒體報道 — Media Coverage",
            "MixCare Health in the news — press coverage, press releases, interviews, and awards.",
            "/resources/media-coverage"
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: "Media Coverage", path: "/resources/media-coverage" },
          ]),
        ]}
      />
      <AppNavbar />
      <ResourcesTabs active="media-coverage" locale={locale} />

      {/* Page header */}
      <div
        className="pt-16 pb-14 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-bold mb-4">
            <Newspaper size={15} aria-hidden="true" />
            {t.resources.tabs.mediaCoverage}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">{t.resources.tabs.mediaCoverage}</h1>
          <p className="text-teal-100 text-lg max-w-xl mx-auto">
            {t.resources.ui.mediaCoverageSub}
          </p>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {pressItems.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <Newspaper size={40} className="mx-auto mb-4 opacity-30" />
              <p className="font-semibold">{ui.noMediaCoverage}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pressItems.map((item) => (
                <PressCard key={item.slug} item={item} locale={locale} readMore={ui.readMore} viewOriginal={ui.viewOriginal} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

// ── Card component ────────────────────────────────────────────────────────────

function PressCard({
  item,
  locale,
  readMore,
  viewOriginal,
}: {
  item: SanityPressItemListItem;
  locale: string;
  readMore: string;
  viewOriginal: string;
}) {
  const col = getCategoryColor(item.category);
  const hasContent = !item.externalUrl;
  const href = hasContent
    ? localePath(locale as "en" | "zh-TW" | "zh-CN", `/resources/media-coverage/${item.slug}`)
    : item.externalUrl!;

  return (
    <a
      href={href}
      target={hasContent ? undefined : "_blank"}
      rel={hasContent ? undefined : "noopener noreferrer"}
      className="group block bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-0.5 overflow-hidden flex flex-col"
    >
      {/* Cover image */}
      {item.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(item.coverImage).width(480).height(240).fit("crop").url()}
          alt={item.title ?? item.outlet}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div
          className="w-full h-40 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
        >
          <Newspaper size={32} className="text-white/40" />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Outlet + date */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            {item.outlet}
          </span>
          <span className="text-xs text-slate-400">{formatDate(item.publishedAt)}</span>
        </div>

        {/* Category badge */}
        <span
          className="self-start text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: col.bg, color: col.text }}
        >
          {item.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug text-sm">
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2 flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#0d9488" }}>
          {hasContent ? (
            <>{readMore} <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" /></>
          ) : (
            <>{viewOriginal} <ExternalLink size={12} /></>
          )}
        </div>
      </div>
    </a>
  );
}
