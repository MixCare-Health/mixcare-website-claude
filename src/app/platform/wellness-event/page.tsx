import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import BottomCTA from "@/components/shared/BottomCTA";
import { CalendarDays, BookOpen, Monitor, BarChart2 } from "lucide-react";
import PainPointsCarousel from "@/components/platform/PainPointsCarousel";
import type { Metadata } from "next";
import { getLocale } from "@/lib/locale.server";
import { getTranslations } from "@/translations";
import { localePath } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Wellness Events | MixCare Health",
  description:
    "Book curated corporate wellness events — yoga, mindfulness, health talks, and more — all managed through MixCare.",
};

const benefitIcons = [CalendarDays, BookOpen, Monitor, BarChart2];

export default async function WellnessEventPage() {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const p = t.wellnessEvent;

  const benefits = p.benefits.items.map((item, i) => ({
    icon: benefitIcons[i],
    title: item.title,
    desc: item.desc,
  }));

  return (
    <main>
      <AppNavbar />

      <PageHero
        badge={p.hero.badge}
        headline={p.hero.headline}
        headlineHighlight={p.hero.headlineHighlight}
        subheadline={p.hero.sub}
        ctaLabel={p.hero.cta}
        ctaHref={localePath(locale, "/get-a-demo")}
        iconColor="#0891b2"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)"
      />

      <PainPointsCarousel
        headline={p.painPoints.headline}
        sub={p.painPoints.sub}
        items={p.painPoints.items}
      />

      <BenefitsGrid
        headline={p.benefits.headline}
        benefits={benefits}
        accentColor="#0891b2"
        columns={4}
      />

      <BottomCTA
        headline={p.cta.headline}
        sub={p.cta.sub}
        ctaLabel={p.cta.label}
        ctaHref={localePath(locale, "/get-a-demo")}
      />

      <Footer />
    </main>
  );
}
