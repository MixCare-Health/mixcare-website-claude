import type { Metadata } from "next";
import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import LogoBar from "@/components/home/LogoBar";
import PlatformFeaturesSection from "@/components/home/PlatformFeaturesSection";
import AudienceSection from "@/components/home/AudienceSection";
import ComplianceSection from "@/components/home/ComplianceSection";
import CTASection from "@/components/home/CTASection";
import { JsonLd, organizationSchema, webSiteSchema, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { getLocale } from "@/lib/locale.server";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { homePageQuery } from "@/lib/sanity.queries";
import type { SanityHomePage } from "@/lib/sanity.queries";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/");

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} — AI-Powered Digital Health & Wellness Platform`,
  },
  description:
    "MixCare Health is an AI-powered digital health and wellness platform for insurers, enterprises, and SMBs across Hong Kong, Macau, and Singapore. Self-funded outpatient, FSA wallets, wellness marketplace and more.",
  keywords: [
    "digital health platform", "employee wellness platform Hong Kong", "FSA wallet",
    "self-funded outpatient Hong Kong", "wellness marketplace", "corporate benefits Asia",
    "health insurance technology", "employee benefits Singapore", "MixCare Health",
    "AI health benefits", "wellness hub", "flexible benefits Hong Kong",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `${SITE_NAME} — AI-Powered Digital Health & Wellness Platform`,
    description:
      "Transform employee health benefits with MixCare. Self-funded outpatient, FSA wallets, wellness marketplace, and more — for insurers, enterprises, and SMBs across Asia-Pacific.",
    url: canonical,
    images: ogImage(`${SITE_NAME} — AI-Powered Digital Health & Wellness Platform`),
  },
  twitter: {
    title: `${SITE_NAME} — AI-Powered Digital Health & Wellness Platform`,
    description:
      "Transform employee health benefits — FSA wallets, wellness marketplace, self-funded outpatient. For insurers, enterprises & SMBs.",
    images: ["/opengraph-image.png"],
  },
};

export default async function Home() {
  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);
  const sp: SanityHomePage | null = isSanityConfigured
    ? await sanityClient.fetch(homePageQuery, { locale: sanityLocale })
    : null;

  return (
    <main className="min-h-screen">
      <JsonLd data={[organizationSchema, webSiteSchema, webPageSchema(
        `${SITE_NAME} — AI-Powered Digital Health & Wellness Platform`,
        "AI-powered digital health and wellness platform for insurers, enterprises, and SMBs across Hong Kong, Macau, and Singapore.",
        "/"
      ), breadcrumbSchema([{ name: "Home", path: "/" }])]} />
      <AppNavbar />
      <HeroSection data={sp?.hero} />
      <LogoBar data={sp?.logoBar} />
      <PlatformFeaturesSection data={sp?.platformFeatures} />
      <AudienceSection data={sp?.audience} />
      <ComplianceSection data={sp?.compliance} />
      <CTASection data={sp?.cta} />
      <Footer />
    </main>
  );
}
