import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import PageTestimonial from "@/components/shared/PageTestimonial";
import BottomCTA from "@/components/shared/BottomCTA";
import { Wallet, Settings, BarChart3, Heart, Dumbbell, Brain, Eye, Pill, Apple } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flexible Spending Account (FSA) | MixCare Health",
  description:
    "Create and manage FSA wallets for healthcare, wellness, and lifestyle expenses. Fully customisable for any company size.",
};

const benefits = [
  {
    icon: Wallet,
    title: "FSA Wallet Creation",
    desc: "Create and manage wallets for healthcare, wellness, or lifestyle expenses for employees or policyholders. Multiple wallet types, multiple funding rules — all in one admin portal.",
  },
  {
    icon: Heart,
    title: "Diverse Spending Categories",
    desc: "Support mental health, fitness programs, medical checkups, nutrition, dental, vision, and more. 30+ categories that cover everything employees actually care about.",
  },
  {
    icon: Settings,
    title: "Customizable Configurations",
    desc: "Align with any employer requirement, suiting companies of all sizes from SMB to enterprise. Set rollover rules, contribution limits, eligible categories, and approval workflows.",
  },
];

const categories = [
  { icon: Heart, label: "Medical Checkups", color: "#0d9488" },
  { icon: Brain, label: "Mental Health", color: "#7c3aed" },
  { icon: Dumbbell, label: "Fitness & Gym", color: "#f97316" },
  { icon: Apple, label: "Nutrition", color: "#16a34a" },
  { icon: Eye, label: "Dental & Vision", color: "#0891b2" },
  { icon: Pill, label: "Pharmacy", color: "#dc2626" },
  { icon: Wallet, label: "Wellness Retreats", color: "#d97706" },
  { icon: BarChart3, label: "Health Screenings", color: "#1e3a5f" },
];

export default function FSAPage() {
  return (
    <main>
      <AppNavbar />

      <PageHero
        badge="Flexible Spending Account"
        headline="Next-Generation"
        headlineHighlight="Flexible Spending Accounts"
        subheadline="Create FSA wallets for healthcare, wellness, and lifestyle expenses. Fully configurable for any company size, any industry, any benefit philosophy."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        iconColor="#1e3a5f"
        bgGradient="linear-gradient(135deg, #eff6ff 0%, #f0fdfa 50%, #fff7ed 100%)"
      />

      <BenefitsGrid
        headline="Everything you need in an FSA platform"
        benefits={benefits}
        accentColor="#1e3a5f"
      />

      {/* Spending categories */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              30+ spending categories
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Cover what matters most to your employees — from traditional medical to modern
              wellness, mental health, and lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="bg-white rounded-2xl p-6 text-center border border-slate-100 hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: cat.color + "15" }}
                >
                  <cat.icon size={24} style={{ color: cat.color }} />
                </div>
                <p className="text-sm font-semibold text-slate-800">{cat.label}</p>
              </div>
            ))}
            <div
              className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-200 hover:shadow-md transition-all flex flex-col items-center justify-center"
            >
              <p className="text-2xl font-extrabold text-slate-400">+22</p>
              <p className="text-sm text-slate-400 mt-1">More categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin vs Employee view */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            Powerful for admins. Simple for employees.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="rounded-2xl p-8 border border-slate-100"
              style={{ backgroundColor: "#f0fdfa" }}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-5" style={{ color: "#0d9488" }}>
                Admin View
              </h3>
              <ul className="space-y-3">
                {[
                  "Create and configure multiple wallet types",
                  "Set funding amounts, rollover rules, and expiry",
                  "Define eligible spending categories per wallet",
                  "Approve or auto-approve transactions",
                  "Real-time utilisation and budget dashboards",
                  "Bulk employee import and management",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#0d9488" }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl p-8 border border-slate-100"
              style={{ backgroundColor: "#eff6ff" }}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-5" style={{ color: "#1e3a5f" }}>
                Employee View
              </h3>
              <ul className="space-y-3">
                {[
                  "View all benefit wallets in one mobile app",
                  "Browse eligible services and providers",
                  "Pay with FSA wallet — no out-of-pocket",
                  "Submit claims with photo receipts",
                  "Track spending and remaining balance",
                  "Receive notifications for new top-ups",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#1e3a5f" }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-2xl p-8 border"
            style={{ borderColor: "#1e3a5f30", backgroundColor: "#eff6ff" }}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Connected to the full MixCare ecosystem
            </h3>
            <p className="text-slate-600 mb-5">
              FSA wallets integrate seamlessly with the Wellness Marketplace, Wellness Hub,
              and outpatient network — employees spend in one place, you manage in one portal.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Wellness Marketplace", "Wellness Hub", "Panel Doctor Network", "HR Systems"].map(
                (item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{ backgroundColor: "#1e3a5f15", color: "#1e3a5f" }}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <PageTestimonial
        quote="The FSA platform is exactly what we needed — flexible enough for our complex benefit structure but simple enough that employees actually use it. Utilisation jumped from 45% to 91%."
        name="Marcus Chen"
        title="Head of HR"
        company="Jardine Matheson"
        accentColor="#1e3a5f"
      />

      <BottomCTA
        headline="Ready to launch your FSA program?"
        sub="Talk to our team about configuring the right FSA structure for your organisation — from a simple wellness wallet to a full multi-tier benefit program."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        secondaryLabel="Start Now — Free Setup"
        secondaryHref="/start-now"
      />

      <Footer />
    </main>
  );
}
