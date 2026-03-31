import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Briefcase } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "For Insurance Brokers | MixCare Health",
  description:
    "Differentiate your offering with flexible, competitive benefit packages. Partner with MixCare to retain clients and win new business.",
};

const featuredHrefs = [
  "/platform/flexible-benefits",
  "/platform/flexible-spending-account",
  "/platform/wellness-marketplace",
];

export default async function BrokersPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.whoWeServe.brokers;
  const tmpl = t.whoWeServe.template;

  return (
    <main>
      <AppNavbar />
      <AudiencePageTemplate
        badge={p.badge}
        badgeIcon={Briefcase}
        headline={p.headline}
        headlineHighlight={p.headlineHighlight}
        subheadline={p.sub}
        accentColor="#1e3a5f"
        bgGradient="linear-gradient(135deg, #eff6ff 0%, #f0fdfa 50%, #fff7ed 100%)"
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
