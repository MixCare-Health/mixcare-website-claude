import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Briefcase } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Insurance Brokers | MixCare Health",
  description:
    "Differentiate your offering with flexible, competitive benefit packages. Partner with MixCare to retain clients and win new business.",
};

export default function BrokersPage() {
  return (
    <main>
      <AppNavbar />
      <AudiencePageTemplate
        badge="For Insurance Brokers"
        badgeIcon={Briefcase}
        headline="Win More Clients with"
        headlineHighlight="Flexible Benefit Packages"
        subheadline="Differentiate your offering with the most flexible, competitive benefit packages in Asia-Pacific. Partner with MixCare to retain existing clients and attract new ones."
        accentColor="#1e3a5f"
        bgGradient="linear-gradient(135deg, #eff6ff 0%, #f0fdfa 50%, #fff7ed 100%)"
        ctaLabel="Partner Sign-Up"
        ctaHref="/partners"
        secondaryCtaLabel="Get a Demo"
        secondaryCtaHref="/get-a-demo"
        challenges={[
          {
            title: "Commoditised product offering",
            desc: "Most brokers offer the same standard group medical plans. Without differentiation, clients choose on price alone — making retention difficult and margins thin.",
          },
          {
            title: "Client retention under pressure",
            desc: "Corporate clients increasingly demand more flexible, employee-centric benefits. Rigid traditional plans lose to digital-first competitors every renewal cycle.",
          },
          {
            title: "Complex administration",
            desc: "Managing multiple carriers, benefit types, and employee populations across clients requires significant operational overhead that eats into margins.",
          },
        ]}
        solutions={[
          {
            challenge: "Same-as-everyone-else product catalogue",
            solution: "MixCare gives you FSA, wellness marketplace, and flexible benefits — differentiated products your competitors can't easily replicate",
          },
          {
            challenge: "Clients leaving for more flexible competitors",
            solution: "Employee self-selection portals and utilisation analytics give your clients tangible proof of value every month — not just at renewal",
          },
          {
            challenge: "High admin overhead managing benefits across clients",
            solution: "One broker portal to manage all clients, all benefit types, all claims — reducing admin time by up to 60%",
          },
        ]}
        featuredSolutions={[
          {
            label: "Flexible Benefits Solution",
            href: "/platform/flexible-benefits",
            desc: "Personalised benefit packages that let employees self-select — the differentiator that wins RFPs and retains accounts.",
          },
          {
            label: "Flexible Spending Account",
            href: "/platform/flexible-spending-account",
            desc: "FSA wallets with 30+ spending categories — a compelling add-on that drives measurable employee satisfaction.",
          },
          {
            label: "Wellness Marketplace",
            href: "/platform/wellness-marketplace",
            desc: "White-label marketplace you can brand for each client — 500+ services, zero inventory or curation overhead.",
          },
        ]}
        metrics={[
          { value: "95%", label: "Client retention rate" },
          { value: "60%", label: "Admin time reduction" },
          { value: "3x", label: "New business conversion uplift" },
          { value: "88%", label: "Employee benefit utilisation" },
        ]}
        testimonialQuote="As a broker, MixCare gives me the most flexible, competitive packages to offer clients. I retained 3 large accounts this year purely because of the FSA and marketplace features — clients that were ready to go to tender."
        testimonialName="Diana Leung"
        testimonialTitle="Senior Benefits Advisor"
        testimonialCompany="Pacific Benefits Group"
      />
      <Footer />
    </main>
  );
}
