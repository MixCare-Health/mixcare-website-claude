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
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { audiencePageByIdQuery, type SanityAudiencePage } from "@/lib/sanity.queries";

export const revalidate = 60;

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
  const sanityLocale = toSanityLocale(locale);

  // Try Sanity first, fall back to translations
  let page: SanityAudiencePage | null = null;
  if (isSanityConfigured) {
    page = await sanityClient.fetch(audiencePageByIdQuery, { pageId: "insurers", locale: sanityLocale });
  }

  // Fallback to translations
  const t = getTranslations(locale);
  const p = t.whoWeServe.insurers;
  const tmpl = t.whoWeServe.template;

  const badge = page?.badge ?? p.badge;
  const headline = page?.headline ?? p.headline;
  const headlineHighlight = page?.headlineHighlight ?? p.headlineHighlight;
  const sub = page?.sub ?? p.sub;
  const ctaLabel = page?.ctaLabel ?? p.cta;
  const challenges = page?.challenges ?? p.challenges.map((c) => ({ icon: "", title: c.title, desc: c.desc }));
  const solutions = page
    ? page.solutions.map((s) => ({ challenge: s.desc, solution: s.title }))
    : p.solutions;
  const featuredSolutions = page?.featuredSolutions ?? p.featuredSolutions.map((s, i) => ({ label: s.label, desc: s.desc, href: featuredHrefs[i] }));
  const metrics = page?.metrics ?? p.metrics.map((m) => ({ value: m.value, label: m.label }));

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Digital Health Solutions for Insurers", "Add scalable health and wellness add-ons to your insurance policies. Reduce claims costs with AI and expand policyholder value.", "/who-we-serve/insurers"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/insurers" }, { name: "Insurers", path: "/who-we-serve/insurers" }]),
      ]} />
      <AppNavbar />
      <AudiencePageTemplate
        badge={badge}
        badgeIcon={Shield}
        headline={headline}
        headlineHighlight={headlineHighlight}
        subheadline={sub}
        accentColor={page?.accentColor ?? "#0d9488"}
        bgGradient={page?.bgGradient ?? "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"}
        ctaLabel={ctaLabel}
        ctaHref={localePath(locale, "/get-a-demo")}
        challenges={challenges}
        solutions={solutions}
        featuredSolutions={featuredSolutions.map((s, i) => ({
          label: s.label,
          desc: s.desc,
          href: s.href ? localePath(locale, s.href) : localePath(locale, featuredHrefs[i]),
        }))}
        metrics={metrics}
        testimonialQuote={page?.testimonial.quote ?? p.testimonial.quote}
        testimonialName={page?.testimonial.name ?? p.testimonial.name}
        testimonialTitle={page?.testimonial.title ?? p.testimonial.title}
        testimonialCompany={page?.testimonial.company ?? p.testimonial.company}
        challengesHeadline={tmpl.challengesHeadline}
        challengesSub={tmpl.challengesSub}
        solutionsHeadline={tmpl.solutionsHeadline}
        featuredHeadline={tmpl.featuredHeadline}
        featuredSub={tmpl.featuredSub}
        ctaHeadline={tmpl.ctaHeadline}
        ctaSub={tmpl.ctaSub}
        hideSolutions={page?.hideSolutions ?? true}
        hideTestimonial={page?.hideTestimonial ?? true}
        hideMetrics={page?.hideMetrics ?? true}
      />
      <Footer />
    </main>
  );
}
