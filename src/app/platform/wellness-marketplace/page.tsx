import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/shared/PageHero";
import BenefitsGrid from "@/components/shared/BenefitsGrid";
import PageTestimonial from "@/components/shared/PageTestimonial";
import BottomCTA from "@/components/shared/BottomCTA";
import Link from "next/link";
import { ShoppingBag, RefreshCw, Layers, Star, Dumbbell, Brain, Apple, Leaf, Stethoscope, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellness Marketplace | MixCare Health",
  description:
    "A curated marketplace for employee wellness — 500+ services redeemable with FSA wallets. White-label options for insurers, brokers, and enterprises.",
};

const benefits = [
  {
    icon: RefreshCw,
    title: "Service Redemption",
    desc: "Employees or policyholders redeem and purchase wellness services using FSA wallets or pre-funded accounts seamlessly. No receipts, no reimbursements — just instant access.",
  },
  {
    icon: Layers,
    title: "Wide Service Array",
    desc: "Yoga classes, nutrition counseling, gym memberships, wellness retreats, mental health support, and beyond. 500+ services from verified providers across Asia-Pacific.",
  },
  {
    icon: ShoppingBag,
    title: "Custom-Branded Marketplace",
    desc: "Deliver a white-label marketplace aligned with your insurer, broker, or enterprise branding and objectives. Your logo, your colours, your domain — powered by MixCare.",
  },
];

const categories = [
  { icon: Dumbbell, label: "Fitness & Gym", count: "80+ services", color: "#f97316" },
  { icon: Brain, label: "Mental Health", count: "60+ services", color: "#7c3aed" },
  { icon: Apple, label: "Nutrition", count: "45+ services", color: "#16a34a" },
  { icon: Leaf, label: "Wellness Retreats", count: "30+ services", color: "#0d9488" },
  { icon: Stethoscope, label: "Medical Screenings", count: "50+ services", color: "#0891b2" },
  { icon: Users, label: "Group Classes", count: "70+ services", color: "#d97706" },
];

export default function WellnessMarketplacePage() {
  return (
    <main>
      <AppNavbar />

      <PageHero
        badge="Wellness Marketplace"
        headline="A Curated Marketplace for"
        headlineHighlight="Employee Wellness"
        subheadline="500+ wellness services, seamlessly redeemable with FSA wallets or pre-funded accounts. White-label options available for insurers, brokers, and enterprises."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        iconColor="#f97316"
        bgGradient="linear-gradient(135deg, #fff7ed 0%, #f0fdfa 50%, #eff6ff 100%)"
      />

      <BenefitsGrid
        headline="Why the MixCare Marketplace is different"
        benefits={benefits}
        accentColor="#f97316"
      />

      {/* Service categories */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              500+ services across 6 categories
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              From daily fitness to intensive wellness retreats — there&apos;s something for every
              employee, every lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: cat.color }}
                >
                  <cat.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{cat.label}</h3>
                <p className="text-sm font-semibold" style={{ color: cat.color }}>
                  {cat.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* White-label feature */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#f97316" }}>
                White-Label Option
              </p>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-5">
                Your brand. Our marketplace.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Deploy a fully branded wellness marketplace under your own identity. Your
                clients see your logo, your domain, your design — backed by MixCare&apos;s
                500+ curated services and seamless payment infrastructure.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Custom domain (wellness.yourcompany.com)",
                  "Brand colours, logo, and typography",
                  "Curated service selection per client",
                  "Integrated FSA payment rails",
                  "Dedicated provider management portal",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#f97316" }}
                    >
                      <Star size={10} className="text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-3xl p-10"
              style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)" }}
            >
              {/* Mockup marketplace UI */}
              <div className="bg-white rounded-2xl shadow-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-md" style={{ backgroundColor: "#f97316" }} />
                  <p className="font-bold text-slate-800 text-sm">AXA Wellness Hub</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["Yoga Classes", "Mental Health", "Nutrition", "Gym Access"].map((s) => (
                    <div
                      key={s}
                      className="rounded-xl p-3 text-center"
                      style={{ backgroundColor: "#fff7ed" }}
                    >
                      <p className="text-xs font-semibold text-slate-700">{s}</p>
                      <p className="text-xs text-slate-400 mt-0.5">FSA eligible</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="py-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 border text-center"
            style={{ borderColor: "#f9731630", backgroundColor: "#fff7ed" }}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Are you a wellness provider?
            </h3>
            <p className="text-slate-600 mb-5">
              Partner with MixCare to reach thousands of corporate employees across Asia-Pacific.
              Get listed in the marketplace, access digital booking, and receive cashless payments.
            </p>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
              style={{ backgroundColor: "#f97316" }}
            >
              Become a Partner →
            </Link>
          </div>
        </div>
      </section>

      <PageTestimonial
        quote="Our employees now actually use their wellness benefits. After launching MixCare's marketplace, benefit utilisation jumped from 38% to 87% in two quarters."
        name="Sarah Lam"
        title="Compensation & Benefits Manager"
        company="CK Hutchison Holdings"
        accentColor="#f97316"
      />

      <BottomCTA
        headline="Build your wellness marketplace today"
        sub="Talk to our team about deploying a white-label or standard wellness marketplace for your organisation or clients."
        ctaLabel="Get a Demo"
        ctaHref="/get-a-demo"
        secondaryLabel="Become a Provider"
        secondaryHref="/partners"
      />

      <Footer />
    </main>
  );
}
