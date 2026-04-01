import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Store } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

const { canonical, languages } = buildAlternates("/who-we-serve/small-business");

export const metadata: Metadata = {
  title: "SMB Health Benefits & Wellness — Setup in Minutes",
  description:
    "Affordable, high-impact employee benefits for small businesses. Setup in minutes, no HR team required. FSA wallets, wellness marketplace, and outpatient benefits for SMBs in Hong Kong and Singapore.",
  keywords: [
    "SMB employee benefits", "small business health benefits Hong Kong",
    "affordable employee wellness", "SMB wellness platform", "small business FSA",
    "employee benefits setup minutes", "startup health benefits", "MixCare SMB",
    "small business benefits Singapore",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `SMB Health Benefits & Wellness | ${SITE_NAME}`,
    description:
      "Affordable, high-impact employee benefits for small businesses. Setup in minutes, no HR team required.",
    url: canonical,
    images: ogImage("MixCare for Small Businesses"),
  },
  twitter: {
    title: `For Small Businesses | ${SITE_NAME}`,
    description: "Affordable employee benefits for SMBs. Setup in minutes, no HR team needed.",
    images: ["/opengraph-image.png"],
  },
};

const featuredHrefs = [
  "/platform/flexible-spending-account",
  "/platform/wellness-marketplace",
  "/platform/flexible-benefits",
];

export default async function SmallBusinessPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.whoWeServe.smallBusiness;
  const tmpl = t.whoWeServe.template;

  return (
    <main>
      <JsonLd data={[
        webPageSchema("SMB Health Benefits & Wellness — Setup in Minutes", "Affordable, high-impact employee benefits for small businesses. Setup in minutes, no HR team required.", "/who-we-serve/small-business"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/insurers" }, { name: "Small Business", path: "/who-we-serve/small-business" }]),
      ]} />
      <AppNavbar />
      <AudiencePageTemplate
        badge={p.badge}
        badgeIcon={Store}
        headline={p.headline}
        headlineHighlight={p.headlineHighlight}
        subheadline={p.sub}
        accentColor="#f97316"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
        ctaLabel={p.cta}
        ctaHref={localePath(locale, "/start-now")}
        secondaryCtaLabel={p.secondaryCta}
        secondaryCtaHref={localePath(locale, "/get-a-demo")}
        challenges={p.challenges}
        solutions={p.solutions}
        featuredSolutions={p.featuredSolutions.map((s, i) => ({
          label: s.label,
          desc: s.desc,
          href: localePath(locale, featuredHrefs[i]),
        }))}
        metrics={p.metrics}
        testimonialQuote={p.testimonial.quote}
        testimonialName={p.testimonial.name}
        testimonialTitle={p.testimonial.title}
        testimonialCompany={p.testimonial.company}
        challengesHeadline={tmpl.challengesHeadline}
        challengesSub={tmpl.challengesSub}
        solutionsHeadline={tmpl.solutionsHeadline}
        featuredHeadline={tmpl.featuredHeadline}
        featuredSub={tmpl.featuredSub}
        ctaHeadline={tmpl.ctaHeadline}
        ctaSub={tmpl.ctaSub}
      />
      <Footer />
    </main>
  );
}
