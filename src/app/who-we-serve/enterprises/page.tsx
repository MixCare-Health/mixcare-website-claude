import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Building2 } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { audiencePageByIdQuery, type SanityAudiencePage } from "@/lib/sanity.queries";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/who-we-serve/enterprises");

export const metadata: Metadata = {
  title: "Enterprise Employee Wellness & Benefits Platform",
  description:
    "Customisable enterprise employee benefit programs with analytics, PDPO and GDPR compliance, and seamless HR system integration. Built for large organisations in Hong Kong and Singapore.",
  keywords: [
    "enterprise employee benefits", "enterprise wellness platform", "HR benefits integration",
    "enterprise health benefits Hong Kong", "employee wellbeing enterprise",
    "benefits analytics enterprise", "corporate wellness enterprise", "HRIS integration benefits",
    "MixCare enterprise",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Enterprise Employee Wellness & Benefits Platform | ${SITE_NAME}`,
    description:
      "Customisable benefits programs with analytics, compliance, and seamless HR integration at enterprise scale.",
    url: canonical,
    images: ogImage("MixCare for Enterprises"),
  },
  twitter: {
    title: `For Enterprises | ${SITE_NAME}`,
    description: "Enterprise-scale customisable benefits with analytics, compliance, and HR integration.",
    images: ["/opengraph-image.png"],
  },
};

const featuredHrefs = [
  "/platform/flexible-benefits",
  "/platform/flexible-spending-account",
  "/platform/wellness-hub",
];

export default async function EnterprisesPage() {
  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);

  // Try Sanity first, fall back to translations
  let page: SanityAudiencePage | null = null;
  if (isSanityConfigured) {
    page = await sanityClient.fetch(audiencePageByIdQuery, { pageId: "enterprises", locale: sanityLocale });
  }

  // Fallback to translations
  const t = getTranslations(locale);
  const p = t.whoWeServe.enterprises;
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
        webPageSchema("Enterprise Employee Wellness & Benefits Platform", "Customisable enterprise employee benefit programs with analytics, compliance, and seamless HR integration.", "/who-we-serve/enterprises"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/insurers" }, { name: "Enterprises", path: "/who-we-serve/enterprises" }]),
      ]} />
      <AppNavbar />
      <AudiencePageTemplate
        badge={badge}
        badgeIcon={Building2}
        headline={headline}
        headlineHighlight={headlineHighlight}
        subheadline={sub}
        accentColor={page?.accentColor ?? "#7c3aed"}
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
        hideSolutions={page?.hideSolutions ?? false}
        hideTestimonial={page?.hideTestimonial ?? false}
        hideMetrics={page?.hideMetrics ?? false}
      />
      <Footer />
    </main>
  );
}
