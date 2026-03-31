import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Shield } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "For Insurers | MixCare Health",
  description:
    "Add scalable health and wellness add-ons to your policies. Reduce claims costs with AI and expand your value proposition with MixCare Health.",
};

const featuredHrefs = [
  "/platform/self-funded-outpatient",
  "/platform/wellness-hub",
  "/platform/wellness-marketplace",
];

export default async function InsurersPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.whoWeServe.insurers;
  const tmpl = t.whoWeServe.template;

  return (
    <main>
      <AppNavbar />
      <AudiencePageTemplate
        badge={p.badge}
        badgeIcon={Shield}
        headline={p.headline}
        headlineHighlight={p.headlineHighlight}
        subheadline={p.sub}
        accentColor="#0d9488"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 50%, #f0f4ff 100%)"
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
