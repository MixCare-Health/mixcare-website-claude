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
  const t = getTranslations(locale);
  const p = t.whoWeServe.enterprises;
  const tmpl = t.whoWeServe.template;

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Enterprise Employee Wellness & Benefits Platform", "Customisable enterprise employee benefit programs with analytics, compliance, and seamless HR integration.", "/who-we-serve/enterprises"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/insurers" }, { name: "Enterprises", path: "/who-we-serve/enterprises" }]),
      ]} />
      <AppNavbar />
      <AudiencePageTemplate
        badge={p.badge}
        badgeIcon={Building2}
        headline={p.headline}
        headlineHighlight={p.headlineHighlight}
        subheadline={p.sub}
        accentColor="#7c3aed"
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
      />
      <Footer />
    </main>
  );
}
