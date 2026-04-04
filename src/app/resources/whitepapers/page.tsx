import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allWhitepapersQuery, type SanityWhitepaperListItem } from "@/lib/sanity.queries";
import ResourcesTabs from "@/components/resources/ResourcesTabs";
import WhitepapersBrowser from "@/components/resources/WhitepapersBrowser";

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
  const t = getTranslations(locale);
  const r = t.resources;

  const whitepapers: SanityWhitepaperListItem[] = isSanityConfigured
    ? await sanityClient.fetch<SanityWhitepaperListItem[]>(allWhitepapersQuery, {
        locale: toSanityLocale(locale),
      })
    : [];

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema(
            "Whitepapers & Guides — Free Health Benefits Resources",
            "Download free whitepapers on AI in insurance claims, Asia-Pacific employee benefits trends, and flexible benefits programmes.",
            "/resources/whitepapers"
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources/articles" },
            { name: "Whitepapers", path: "/resources/whitepapers" },
          ]),
        ]}
      />
      <AppNavbar />
      <ResourcesTabs active="whitepapers" locale={locale} />
      <WhitepapersBrowser
        whitepapers={whitepapers}
        locale={locale}
        badge={r.whitepapers.heading}
        headline={r.whitepapers.heading}
        sub={r.whitepapers.sub}
        downloadBtn={r.whitepapers.downloadBtn}
      />
      <Footer />
    </main>
  );
}
