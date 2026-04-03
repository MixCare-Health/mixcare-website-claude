import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Briefcase } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

const { canonical, languages } = buildAlternates("/who-we-serve/brokers");

export const metadata: Metadata = {
  title: "Health Benefits Technology for Insurance Brokers",
  description:
    "Differentiate your broker offering with flexible, competitive benefit packages. Partner with MixCare to retain clients, win new business, and deliver modern digital health benefits.",
  keywords: [
    "insurance broker benefits technology", "broker health platform", "flexible benefits broker",
    "MixCare broker partner", "health benefits distribution", "broker wellness solutions",
    "digital benefits Hong Kong broker", "employee benefits broker Singapore", "MixCare broker",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Health Benefits Technology for Insurance Brokers | ${SITE_NAME}`,
    description:
      "Flexible, competitive benefit packages. Partner with MixCare to retain clients and win new business.",
    url: canonical,
    images: ogImage("MixCare for Insurance Brokers"),
  },
  twitter: {
    title: `For Brokers | ${SITE_NAME}`,
    description: "Differentiate your offering with flexible digital health benefits. Retain clients and win new business.",
    images: ["/opengraph-image.png"],
  },
};

const featuredHrefs = [
  "/platform/self-funded-outpatient",
  "/platform/flexible-spending-account",
  "/platform/wellness-marketplace",
  "/platform/flexible-benefits",
];

export default async function BrokersPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.whoWeServe.brokers;
  const tmpl = t.whoWeServe.template;

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Health Benefits Technology for Insurance Brokers", "Differentiate your broker offering with flexible, competitive benefit packages. Partner with MixCare to retain clients and win new business.", "/who-we-serve/brokers"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/insurers" }, { name: "Brokers", path: "/who-we-serve/brokers" }]),
      ]} />
      <AppNavbar />
      <AudiencePageTemplate
        badge={p.badge}
        badgeIcon={Briefcase}
        headline={p.headline}
        headlineHighlight={p.headlineHighlight}
        subheadline={p.sub}
        accentColor="#1e3a5f"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
        ctaLabel={p.cta}
        ctaHref={localePath(locale, "/partners")}
        secondaryCtaLabel={p.secondaryCta}
        secondaryCtaHref={localePath(locale, "/get-a-demo")}
        challenges={p.challenges}
        solutions={p.solutions}
        featuredSolutions={p.featuredSolutions.map((s, i) => ({
          label: s.label,
          desc: s.desc,
          href: localePath(locale, featuredHrefs[i]),
          tag: s.tag,
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
        featuredLayout="mockup"
        featuredHeadlineOverride="How We Solve?"
        featuredSubOverride="All-in-One Employee Benefit Solution for Brokers"
        partnerLogos={[
          { name: "Mercer", src: "/logos/mixcare-health-client-mercer.png" },
          { name: "Pacific Prime", src: "/logos/mixcare-health-client-pp.png" },
          { name: "Nova", src: "/logos/mixcare-health-client-nova.png" },
        ]}
      />
      <Footer />
    </main>
  );
}
