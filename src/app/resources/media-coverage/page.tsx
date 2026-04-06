import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allPressItemsQuery, type SanityPressItemListItem } from "@/lib/sanity.queries";
import ResourcesTabs from "@/components/resources/ResourcesTabs";
import MediaCoverageBrowser from "@/components/resources/MediaCoverageBrowser";
import { Newspaper } from "lucide-react";

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
          <MediaCoverageBrowser
            pressItems={pressItems}
            locale={locale}
            readMore={ui.readMore}
            viewOriginal={ui.viewOriginal}
            noMediaCoverage={ui.noMediaCoverage}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
