import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Building2 } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "For Large Enterprises | MixCare Health",
  description:
    "Customisable employee benefit programs with analytics, compliance, and seamless HR integration at enterprise scale.",
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
      <AppNavbar />
      <AudiencePageTemplate
        badge={p.badge}
        badgeIcon={Building2}
        headline={p.headline}
        headlineHighlight={p.headlineHighlight}
        subheadline={p.sub}
        accentColor="#7c3aed"
        bgGradient="linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #f0fdfa 100%)"
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
