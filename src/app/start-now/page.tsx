"use client";

import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Input, Button } from "@heroui/react";
import Link from "next/link";
import { CheckCircle2, Zap, Users, BarChart3, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "HK$180",
    per: "per employee / month",
    desc: "Perfect for teams of 2–50",
    features: [
      "FSA wellness wallet",
      "Wellness Marketplace access",
      "Up to 3 wallet categories",
      "Basic utilisation reports",
      "Email support",
    ],
    cta: "Start Free",
    highlight: false,
    color: "#0d9488",
  },
  {
    name: "Growth",
    price: "HK$380",
    per: "per employee / month",
    desc: "Best for teams of 50–200",
    features: [
      "Everything in Starter",
      "Self-funded outpatient",
      "Panel doctor network access",
      "Flexible benefits engine",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Start Free",
    highlight: true,
    color: "#f97316",
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "tailored to your needs",
    desc: "For 200+ employee organisations",
    features: [
      "Everything in Growth",
      "White-label marketplace",
      "HRIS integrations",
      "Dedicated account manager",
      "SLA guarantees",
      "Custom compliance support",
    ],
    cta: "Get a Demo",
    ctaHref: "/get-a-demo",
    highlight: false,
    color: "#1e3a5f",
  },
];

const testimonials = [
  {
    quote: "Setup took one afternoon. Now we look like a company 10x our size to candidates.",
    name: "Ryan L.",
    company: "TechBridge HK",
    employees: "25 employees",
  },
  {
    quote: "Our team actually uses their benefits now. FSA wallets were a game-changer.",
    name: "Amy C.",
    company: "Creative Studio SG",
    employees: "18 employees",
  },
  {
    quote: "We retained two key hires who had offers from larger companies. Worth every cent.",
    name: "James T.",
    company: "FinTech Startup HK",
    employees: "40 employees",
  },
];

export default function StartNowPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  return (
    <main>
      <AppNavbar />

      {/* Hero */}
      <section
        className="pt-28 pb-16 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl" style={{ background: "radial-gradient(circle, #f97316, transparent)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#fed7aa", color: "#c2410c" }}
          >
            <Zap size={14} />
            Free Setup · No Credit Card Required
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            Start attracting better talent{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #0d9488 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              today
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Launch employee benefits in under 60 minutes. No HR team needed. No minimum headcount.
          </p>

          {/* Quick signup */}
          {!submitted ? (
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-left max-w-lg mx-auto">
              <h2 className="text-xl font-bold text-slate-900 mb-5">Create your free account</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  label="Your Name"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isRequired
                  variant="bordered"
                />
                <Input
                  label="Work Email"
                  type="email"
                  placeholder="jane@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isRequired
                  variant="bordered"
                />
                <Input
                  label="Company Name"
                  placeholder="Your Company Ltd"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  isRequired
                  variant="bordered"
                />
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  className="text-white font-bold text-base rounded-xl mt-2"
                  style={{ backgroundColor: "#f97316" }}
                >
                  Start Now — Free →
                </Button>
                <p className="text-xs text-center text-slate-400 pt-1">
                  Free setup · No credit card · Cancel anytime
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 text-center max-w-lg mx-auto">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#ccfbf1" }}
              >
                <CheckCircle2 size={32} style={{ color: "#0d9488" }} />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3">You&apos;re on the list!</h2>
              <p className="text-slate-600">
                We&apos;ll reach out within 1 business day to complete your setup. It takes less than
                an hour to go live.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Setup timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">
            From signup to live in 3 simple steps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                icon: Users,
                title: "Add your employees",
                desc: "Import via CSV or add manually. Takes 5 minutes for most teams.",
                time: "Day 1",
                color: "#0d9488",
              },
              {
                step: "2",
                icon: BarChart3,
                title: "Set your benefit budget",
                desc: "Choose a plan, set monthly FSA budgets, and pick your wellness categories.",
                time: "Day 1",
                color: "#f97316",
              },
              {
                step: "3",
                icon: Zap,
                title: "Go live",
                desc: "Employees get an invite link and can start using their benefits immediately.",
                time: "Day 1",
                color: "#1e3a5f",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: s.color }}
                >
                  <s.icon size={24} className="text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {s.time}
                </span>
                <h3 className="font-bold text-slate-900 mt-1 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-3">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-600 text-center mb-10">
            No setup fees. No hidden costs. Cancel anytime.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border ${
                  plan.highlight
                    ? "shadow-xl scale-105"
                    : "border-slate-100 bg-white"
                }`}
                style={
                  plan.highlight
                    ? { background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)", border: "none" }
                    : {}
                }
              >
                {plan.highlight && (
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-200 mb-3">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-4 ${plan.highlight ? "text-teal-200" : "text-slate-500"}`}>
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className={`text-xs ${plan.highlight ? "text-teal-200" : "text-slate-500"}`}>
                      {plan.per}
                    </span>
                  )}
                </div>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2
                        size={14}
                        style={{ color: plan.highlight ? "#2dd4bf" : plan.color, flexShrink: 0 }}
                      />
                      <span className={plan.highlight ? "text-teal-100" : "text-slate-700"}>{f}</span>
                    </li>
                  ))}
                </ul>
                {plan.ctaHref ? (
                  <Link
                    href={plan.ctaHref}
                    className="block w-full text-center py-3 rounded-xl font-bold text-sm"
                    style={{ backgroundColor: "#f97316", color: "#fff" }}
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <Button
                    fullWidth
                    className="font-bold"
                    style={
                      plan.highlight
                        ? { backgroundColor: "#f97316", color: "#fff" }
                        : { backgroundColor: plan.color, color: "#fff" }
                    }
                  >
                    {plan.cta}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMB testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
            Small businesses love MixCare
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="#f97316" color="#f97316" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm font-bold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">
                  {t.company} · {t.employees}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
