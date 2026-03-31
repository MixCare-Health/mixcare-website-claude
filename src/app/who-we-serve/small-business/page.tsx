import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Store } from "lucide-react";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "For Small Businesses | MixCare Health",
  description:
    "Affordable, high-impact employee benefits for small businesses. Setup in minutes, no HR team required.",
};

const featuredHrefs = [
  "/platform/flexible-spending-account",
  "/platform/wellness-marketplace",
  "/platform/flexible-benefits",
];

export default async function SmallBusinessPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.whoWeServe.smallBusiness;
  const tmpl = t.whoWeServe.template;

  return (
    <main>
      <AppNavbar />
      <AudiencePageTemplate
        badge={p.badge}
        badgeIcon={Store}
        headline={p.headline}
        headlineHighlight={p.headlineHighlight}
        subheadline={p.sub}
        accentColor="#f97316"
        bgGradient="linear-gradient(135deg, #fff7ed 0%, #f0fdfa 50%, #eff6ff 100%)"
        ctaLabel={p.cta}
        ctaHref={localePath(locale, "/start-now")}
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
