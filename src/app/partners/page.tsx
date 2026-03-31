"use client";

import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Input, Select, SelectItem, Textarea, Button } from "@heroui/react";
import { Briefcase, Users, CheckCircle2, TrendingUp, Globe, Zap } from "lucide-react";

const partnerTypes = [
  {
    icon: Briefcase,
    label: "Insurance Broker",
    color: "#1e3a5f",
    bg: "#eff6ff",
    desc: "Offer MixCare's flexible benefits and FSA to your corporate clients. Differentiate your product portfolio and improve retention.",
    benefits: [
      "White-label product under your brand",
      "Revenue share on benefit premiums",
      "Dedicated partner manager",
      "Co-marketing opportunities",
    ],
  },
  {
    icon: Users,
    label: "Medical & Wellness Provider",
    color: "#0d9488",
    bg: "#f0fdfa",
    desc: "Get listed on the MixCare Wellness Marketplace and connect with thousands of corporate employees and policyholders.",
    benefits: [
      "Instant access to 50,000+ employees",
      "Digital booking and cashless payments",
      "3-day payment settlement",
      "Provider analytics dashboard",
    ],
  },
];

const partnerBenefits = [
  { icon: TrendingUp, title: "Revenue Share", desc: "Earn competitive commissions on all benefits sold or redeemed through your partnership." },
  { icon: Globe, title: "Regional Coverage", desc: "Access MixCare's network across Hong Kong, Macau, and Singapore from day one." },
  { icon: Zap, title: "Fast Onboarding", desc: "Partner portal setup in 48 hours. Your first client or service listing live within a week." },
  { icon: CheckCircle2, title: "Full Support", desc: "Dedicated partner manager, co-marketing resources, and technical integration support." },
];

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", type: "", website: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main>
      <AppNavbar />

      {/* Hero */}
      <section
        className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl" style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
          >
            Partner Programme
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            Grow together with{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              MixCare Health
            </span>
          </h1>
          <p className="text-xl text-slate-600">
            Join our broker and provider partner network across Asia-Pacific. Access new revenue
            streams, new clients, and best-in-class digital health infrastructure.
          </p>
        </div>
      </section>

      {/* Partner types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            Two ways to partner with us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partnerTypes.map((pt) => (
              <div
                key={pt.label}
                className="rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all"
                style={{ backgroundColor: pt.bg }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: pt.color }}
                >
                  <pt.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pt.label}</h3>
                <p className="text-slate-600 mb-5 leading-relaxed">{pt.desc}</p>
                <ul className="space-y-2">
                  {pt.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={14} style={{ color: pt.color, flexShrink: 0 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner benefits */}
      <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">
            What you get as a partner
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnerBenefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 border border-slate-100 text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#ccfbf1" }}
                >
                  <b.icon size={22} style={{ color: "#0d9488" }} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-up form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10">
            {submitted ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#ccfbf1" }}
                >
                  <CheckCircle2 size={32} style={{ color: "#0d9488" }} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
                  Application received!
                </h2>
                <p className="text-slate-600">
                  Our partnerships team will review your application and be in touch within 2
                  business days.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                  Apply to become a partner
                </h2>
                <p className="text-sm text-slate-500 mb-7">
                  Tell us about yourself and we&apos;ll be in touch within 2 business days.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      isRequired
                      variant="bordered"
                    />
                    <Input
                      label="Work Email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      isRequired
                      variant="bordered"
                    />
                  </div>
                  <Input
                    label="Company / Practice Name"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    isRequired
                    variant="bordered"
                  />
                  <Select
                    label="Partner Type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    isRequired
                    variant="bordered"
                  >
                    <SelectItem key="broker">Insurance Broker</SelectItem>
                    <SelectItem key="provider">Medical / Wellness Provider</SelectItem>
                  </Select>
                  <Input
                    label="Website (optional)"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    variant="bordered"
                  />
                  <Textarea
                    label="Tell us about your business"
                    placeholder="What services do you offer? How many clients or patients do you serve?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    variant="bordered"
                    minRows={3}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={loading}
                    className="text-white font-bold rounded-xl"
                    style={{ backgroundColor: "#f97316" }}
                  >
                    {loading ? "Submitting..." : "Apply to Partner →"}
                  </Button>
                  <p className="text-xs text-center text-slate-400">
                    We review all applications personally. No automated rejections.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
