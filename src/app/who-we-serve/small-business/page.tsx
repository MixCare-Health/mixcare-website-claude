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
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { audiencePageByIdQuery, type SanityAudiencePage } from "@/lib/sanity.queries";

export const revalidate = 60;

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
  const sanityLocale = toSanityLocale(locale);

  // Try Sanity first, fall back to translations
  let page: SanityAudiencePage | null = null;
  if (isSanityConfigured) {
    page = await sanityClient.fetch(audiencePageByIdQuery, { pageId: "small-business", locale: sanityLocale });
  }

  // Fallback to translations
  const t = getTranslations(locale);
  const p = t.whoWeServe.smallBusiness;
  const tmpl = t.whoWeServe.template;

  const badge = page?.badge ?? p.badge;
  const headline = page?.headline ?? p.headline;
  const headlineHighlight = page?.headlineHighlight ?? p.headlineHighlight;
  const sub = page?.sub ?? p.sub;
  const ctaLabel = page?.ctaLabel ?? p.cta;
  const challenges = page?.challenges ?? p.challenges.map((c) => ({ icon: "", title: c.title, desc: c.desc }));
  const solutions = page
    ? (page.solutions ?? []).map((s) => ({ challenge: s.desc, solution: s.title }))
    : p.solutions;
  const featuredSolutions = page?.featuredSolutions ?? p.featuredSolutions.map((s, i) => ({ label: s.label, desc: s.desc, href: featuredHrefs[i] }));
  const metrics = page?.metrics ?? p.metrics.map((m) => ({ value: m.value, label: m.label }));

  return (
    <main>
      <JsonLd data={[
        webPageSchema("SMB Health Benefits & Wellness — Setup in Minutes", "Affordable, high-impact employee benefits for small businesses. Setup in minutes, no HR team required.", "/who-we-serve/small-business"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/insurers" }, { name: "Small Business", path: "/who-we-serve/small-business" }]),
      ]} />
      <AppNavbar />
      <AudiencePageTemplate
        badge={badge}
        badgeIcon={Store}
        headline={headline}
        headlineHighlight={headlineHighlight}
        subheadline={sub}
        accentColor={page?.accentColor ?? "#f97316"}
        bgGradient={page?.bgGradient ?? "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"}
        ctaLabel={ctaLabel}
        ctaHref={localePath(locale, "/start-now")}
        secondaryCtaLabel={p.secondaryCta}
        secondaryCtaHref={localePath(locale, "/get-a-demo")}
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
        hideSolutions={page?.hideSolutions ?? false}
        hideTestimonial={true}
        hideMetrics={page?.hideMetrics ?? false}
      />
      <Footer />
    </main>
  );
}
