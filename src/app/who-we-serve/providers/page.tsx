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
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { audiencePageByIdQuery, type SanityAudiencePage } from "@/lib/sanity.queries";

export const revalidate = 60;

const { canonical, languages } = buildAlternates("/who-we-serve/providers");

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.whoWeServe.providers;
  const title = `${p.headline} ${p.headlineHighlight} | MixCare Health`;
  const description = p.sub;
  return {
    title,
    description,
    keywords: [
      "wellness provider network", "medical provider platform", "join MixCare provider",
      "corporate wellness provider Hong Kong", "clinic FSA payments", "provider wellness marketplace",
      "digital booking health provider", "corporate client wellness", "MixCare provider",
    ],
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImage("MixCare Provider Network"),
    },
    twitter: {
      title,
      description,
      images: ["/opengraph-image.png"],
    },
  };
}

const featuredHrefs = [
  "/platform/wellness-marketplace",
  "/platform/wellness-hub",
];

export default async function ProvidersPage() {
  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);

  // Try Sanity first, fall back to translations
  let page: SanityAudiencePage | null = null;
  if (isSanityConfigured) {
    page = await sanityClient.fetch(audiencePageByIdQuery, { pageId: "providers", locale: sanityLocale });
  }

  // Fallback to translations
  const t = getTranslations(locale);
  const p = t.whoWeServe.providers;
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
        webPageSchema("Join MixCare's Provider Network — Reach Corporate Clients", "Connect with thousands of corporate employees across Asia-Pacific. Digital tools for bookings, cashless payments, and client management.", "/who-we-serve/providers"),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/insurers" }, { name: "Providers", path: "/who-we-serve/providers" }]),
      ]} />
      <AppNavbar />
      <AudiencePageTemplate
        badge={badge}
        badgeIcon={Users}
        headline={headline}
        headlineHighlight={headlineHighlight}
        subheadline={sub}
        accentColor={page?.accentColor ?? "#0891b2"}
        bgGradient={page?.bgGradient ?? "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"}
        ctaLabel={ctaLabel}
        ctaHref={localePath(locale, "/partners")}
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
