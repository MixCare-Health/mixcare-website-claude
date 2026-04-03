import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Shield } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

const { canonical, languages } = buildAlternates("/who-we-serve/insurers");

export const metadata: Metadata = {
  title: "Digital Health Solutions for Insurers",
  description:
    "Add scalable health and wellness add-ons to your insurance policies. Reduce claims costs with AI, expand policyholder value, and launch white-label wellness platforms with MixCare Health.",
  keywords: [
    "insurer health technology", "digital health insurer", "white-label wellness insurer",
    "insurance claims reduction AI", "policyholder wellness", "health insurance add-ons",
    "insurance wellness platform Hong Kong", "insurer digital transformation", "MixCare insurer",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Digital Health Solutions for Insurers | ${SITE_NAME}`,
    description:
      "Add scalable wellness add-ons to your policies. Reduce claims costs with AI and expand policyholder value.",
    url: canonical,
    images: ogImage("MixCare for Insurers"),
  },
  twitter: {
    title: `For Insurers | ${SITE_NAME}`,
    description: "Scale wellness add-ons, reduce claims costs with AI, white-label wellness platforms.",
    images: ["/opengraph-image.png"],
  },
};

const featuredHrefs = [
  "/platform/wellness-hub",
  "/platform/wellness-marketplace",
  "/platform/self-funded-outpatient",
];

export default async function InsurersPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.whoWeServe.insurers;
  const tmpl = t.whoWeServe.template;

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Digital Health Solutions for Insurers", "Add scalable health and wellness add-ons to your insurance policies. Reduce claims costs with AI and expand policyholder value.", "/who-we-serve/insurers"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/insurers" }, { name: "Insurers", path: "/who-we-serve/insurers" }]),
      ]} />
      <AppNavbar />
      <AudiencePageTemplate
        badge={p.badge}
        badgeIcon={Shield}
        headline={p.headline}
        headlineHighlight={p.headlineHighlight}
        subheadline={p.sub}
        accentColor="#0d9488"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
        ctaLabel={p.cta}
        ctaHref={localePath(locale, "/get-a-demo")}
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
        hideSolutions
        hideTestimonial
        hideMetrics
      />
      <Footer />
    </main>
  );
}
