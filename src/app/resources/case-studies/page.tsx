import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { allCaseStudiesQuery, type SanityCaseStudyListItem } from "@/lib/sanity.queries";
import ResourcesTabs from "@/components/resources/ResourcesTabs";
import CaseStudiesBrowser from "@/components/resources/CaseStudiesBrowser";

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
  const t = getTranslations(locale);
  const r = t.resources;

  const caseStudies: SanityCaseStudyListItem[] = isSanityConfigured
    ? await sanityClient.fetch<SanityCaseStudyListItem[]>(allCaseStudiesQuery, {
        locale: toSanityLocale(locale),
      })
    : [];

  return (
    <main>
      <JsonLd
        data={[
          webPageSchema(
            "Client Case Studies — Real Results with MixCare Health",
            "See how insurers, enterprises, and SMBs achieved measurable results with MixCare's AI-powered health benefits platform.",
            "/resources/case-studies"
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources/articles" },
            { name: "Case Studies", path: "/resources/case-studies" },
          ]),
        ]}
      />
      <AppNavbar />
      <ResourcesTabs active="case-studies" locale={locale} />
      <CaseStudiesBrowser
        caseStudies={caseStudies}
        locale={locale}
        badge={r.caseStudies.heading}
        headline={r.caseStudies.heading}
        sub={r.caseStudies.sub}
        readMore={r.caseStudies.readMore}
      />
      <Footer />
    </main>
  );
}
