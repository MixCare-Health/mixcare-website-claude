import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Users } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";
import { JsonLd, webPageSchema, breadcrumbSchema } from "@/components/seo/JsonLd";

const { canonical, languages } = buildAlternates("/who-we-serve/providers");

export const metadata: Metadata = {
  title: "Join MixCare's Provider Network — Reach Corporate Clients",
  description:
    "Connect with thousands of corporate employees across Asia-Pacific. Digital tools for online bookings, cashless payments, and client management. Join MixCare's 3,000+ provider network.",
  keywords: [
    "wellness provider network", "medical provider platform", "join MixCare provider",
    "corporate wellness provider Hong Kong", "clinic FSA payments", "provider wellness marketplace",
    "digital booking health provider", "corporate client wellness", "MixCare provider",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Join MixCare's Provider Network | ${SITE_NAME}`,
    description:
      "Reach thousands of corporate employees. Digital tools for bookings, cashless payments, and client management.",
    url: canonical,
    images: ogImage("MixCare Provider Network"),
  },
  twitter: {
    title: `For Providers | ${SITE_NAME}`,
    description: "Reach corporate employees across Asia-Pacific with digital bookings and cashless payments.",
    images: ["/opengraph-image.png"],
  },
};

const featuredHrefs = [
  "/platform/wellness-marketplace",
  "/platform/wellness-hub",
];

export default async function ProvidersPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.whoWeServe.providers;
  const tmpl = t.whoWeServe.template;

  return (
    <main>
      <JsonLd data={[
        webPageSchema("Join MixCare's Provider Network — Reach Corporate Clients", "Connect with thousands of corporate employees across Asia-Pacific. Digital tools for bookings, cashless payments, and client management.", "/who-we-serve/providers"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/insurers" }, { name: "Providers", path: "/who-we-serve/providers" }]),
      ]} />
      <AppNavbar />
      <AudiencePageTemplate
        badge={p.badge}
        badgeIcon={Users}
        headline={p.headline}
        headlineHighlight={p.headlineHighlight}
        subheadline={p.sub}
        accentColor="#0891b2"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
        ctaLabel={p.cta}
        ctaHref={localePath(locale, "/partners")}
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
