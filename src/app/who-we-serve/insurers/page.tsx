import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudiencePageTemplate from "@/components/shared/AudiencePageTemplate";
import { Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Insurers | MixCare Health",
  description:
    "Add scalable health and wellness add-ons to your policies. Reduce claims costs with AI and expand your value proposition with MixCare Health.",
};

export default function InsurersPage() {
  return (
    <main>
      <AppNavbar />
      <AudiencePageTemplate
        badge="For Insurers"
        badgeIcon={Shield}
        headline="Supercharge Your Policies with"
        headlineHighlight="AI-Powered Wellness"
        subheadline="Add scalable health and wellness add-ons to group and individual policies. Reduce claims costs, minimise fraud, and deliver a digital-first experience that policyholders love."
        accentColor="#0d9488"
        bgGradient="linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 50%, #f0f4ff 100%)"
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        challenges={[
          {
            title: "Rising claims costs",
            desc: "Traditional outpatient schemes lack the controls needed to manage escalating medical claims. Manual processing leaves fraud undetected and costs unpredictable.",
          },
          {
            title: "Low policyholder engagement",
            desc: "Policyholders rarely interact with their insurer outside of claims. Without meaningful wellness touchpoints, retention suffers and policy renewal rates decline.",
          },
          {
            title: "Digital transformation gaps",
            desc: "Modernising legacy claims infrastructure is expensive and slow. In the meantime, digital-first competitors are winning market share with better policyholder experiences.",
          },
        ]}
        solutions={[
          {
            challenge: "Manual claims processing leads to fraud and slow payouts",
            solution: "MixCare's AI engine processes claims in <24h with >95% fraud detection accuracy — no manual review team required",
          },
          {
            challenge: "Policyholders see no value between renewal cycles",
            solution: "The Wellness Hub and Marketplace drive year-round engagement — policyholders use their benefits monthly, not just when sick",
          },
          {
            challenge: "Building digital capabilities in-house is cost-prohibitive",
            solution: "MixCare deploys as a white-label add-on to your existing policies — no infrastructure investment, live in weeks",
          },
        ]}
        featuredSolutions={[
          {
            label: "Self-Funded Outpatient",
            href: "/platform/self-funded-outpatient",
            desc: "AI-powered claims processing, cashless panel doctor network, and stop-loss controls for outpatient schemes.",
          },
          {
            label: "Wellness Hub",
            href: "/platform/wellness-hub",
            desc: "A connected ecosystem that drives policyholder engagement year-round — integrated seamlessly with your policy.",
          },
          {
            label: "Wellness Marketplace",
            href: "/platform/wellness-marketplace",
            desc: "White-label wellness marketplace to add value to group and individual policies without building from scratch.",
          },
        ]}
        metrics={[
          { value: "70%", label: "Claims processing cost reduction" },
          { value: "95%+", label: "Fraud detection accuracy" },
          { value: "<24h", label: "Average claims resolution" },
          { value: "3x", label: "Policyholder engagement uplift" },
        ]}
        testimonialQuote="MixCare transformed how we deliver health benefits to our policyholders. The AI claims processing cut our resolution time by 70% and fraud incidents dropped significantly within the first quarter."
        testimonialName="Jennifer Wong"
        testimonialTitle="VP, Group Benefits"
        testimonialCompany="AXA Hong Kong"
      />
      <Footer />
    </main>
  );
}
