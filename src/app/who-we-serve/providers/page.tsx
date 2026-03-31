import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Users } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "For Medical & Wellness Providers | MixCare Health",
  description:
    "Connect with thousands of corporate employees across Asia-Pacific. Digital tools for bookings, payments, and client management.",
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
      <AppNavbar />
      <AudiencePageTemplate
        badge={p.badge}
        badgeIcon={Users}
        headline={p.headline}
        headlineHighlight={p.headlineHighlight}
        subheadline={p.sub}
        accentColor="#0891b2"
        bgGradient="linear-gradient(135deg, #ecfeff 0%, #f0fdfa 50%, #eff6ff 100%)"
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
