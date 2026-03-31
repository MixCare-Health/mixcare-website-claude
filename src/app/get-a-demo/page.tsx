"use client";

import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Input, Select, SelectItem, Textarea, Button } from "@heroui/react";
import { CheckCircle2, Clock, Users, ShieldCheck, TrendingUp } from "lucide-react";

const companySizes = [
  { key: "2-10", label: "2–10 employees" },
  { key: "11-50", label: "11–50 employees" },
  { key: "51-200", label: "51–200 employees" },
  { key: "201-500", label: "201–500 employees" },
  { key: "500+", label: "500+ employees" },
];

const roles = [
  { key: "insurer", label: "Insurer / Reinsurer" },
  { key: "broker", label: "Insurance Broker" },
  { key: "enterprise-hr", label: "Enterprise — HR / Benefits" },
  { key: "enterprise-exec", label: "Enterprise — C-Suite / Executive" },
  { key: "smb", label: "Small Business Owner" },
  { key: "provider", label: "Medical / Wellness Provider" },
  { key: "other", label: "Other" },
];

export default function GetADemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", size: "", role: "", message: "",
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
      {/* Minimal header for demo page */}
      <AppNavbar />

      <section className="pt-28 pb-20 min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl" style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
                style={{ backgroundColor: "#ccfbf1", color: "#0f766e" }}
              >
                Book Your Demo
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
                See MixCare in{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  action
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Book a personalised demo with a MixCare specialist. We&apos;ll show you exactly how
                our platform works for your organisation — no generic slides, just real answers.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: Clock, text: "30-minute focused demo tailored to your use case" },
                  { icon: Users, text: "Live walkthrough of the features most relevant to you" },
                  { icon: TrendingUp, text: "ROI estimate based on your company size and industry" },
                  { icon: ShieldCheck, text: "Compliance and security Q&A for regulated industries" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#ccfbf1" }}
                    >
                      <item.icon size={16} style={{ color: "#0d9488" }} />
                    </div>
                    <p className="text-slate-700 text-sm pt-1">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 mb-3">
                  What happens after you submit:
                </p>
                <div className="space-y-2">
                  {[
                    "A MixCare specialist will contact you within 1 business day",
                    "We&apos;ll schedule a time that suits your calendar",
                    "You&apos;ll receive a pre-demo questionnaire to customise the session",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={14} style={{ color: "#0d9488" }} />
                      <span dangerouslySetInnerHTML={{ __html: step }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mt-6">
                {["PDPO (HK)", "GDPR Compliant", "ISO 27001"].map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 rounded-lg text-xs font-semibold border"
                    style={{ borderColor: "#0d948830", color: "#0d9488", backgroundColor: "#f0fdfa" }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-10">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: "#ccfbf1" }}
                  >
                    <CheckCircle2 size={40} style={{ color: "#0d9488" }} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
                    Request received!
                  </h2>
                  <p className="text-slate-600 mb-6">
                    A MixCare specialist will be in touch within 1 business day to schedule your
                    personalised demo.
                  </p>
                  <p className="text-sm text-slate-500">
                    In the meantime, explore our{" "}
                    <a href="/platform/self-funded-outpatient" className="text-teal-600 font-semibold hover:underline">
                      platform solutions
                    </a>{" "}
                    or read our{" "}
                    <a href="/resources" className="text-teal-600 font-semibold hover:underline">
                      case studies
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                    Request your demo
                  </h2>
                  <p className="text-sm text-slate-500 mb-7">
                    All fields required. We&apos;ll never share your data.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        isRequired
                        variant="bordered"
                        classNames={{ inputWrapper: "border-slate-200" }}
                      />
                      <Input
                        label="Work Email"
                        type="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        isRequired
                        variant="bordered"
                        classNames={{ inputWrapper: "border-slate-200" }}
                      />
                    </div>

                    <Input
                      label="Company Name"
                      placeholder="Acme Corporation"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      isRequired
                      variant="bordered"
                      classNames={{ inputWrapper: "border-slate-200" }}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        label="Company Size"
                        placeholder="Select size"
                        value={form.size}
                        onChange={(e) => setForm({ ...form, size: e.target.value })}
                        isRequired
                        variant="bordered"
                        classNames={{ trigger: "border-slate-200" }}
                      >
                        {companySizes.map((s) => (
                          <SelectItem key={s.key}>{s.label}</SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="Your Role"
                        placeholder="Select role"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        isRequired
                        variant="bordered"
                        classNames={{ trigger: "border-slate-200" }}
                      >
                        {roles.map((r) => (
                          <SelectItem key={r.key}>{r.label}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    <Textarea
                      label="What would you like to see? (optional)"
                      placeholder="Tell us your main challenges or what you'd like to explore in the demo..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      variant="bordered"
                      minRows={3}
                      classNames={{ inputWrapper: "border-slate-200" }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      isLoading={loading}
                      className="text-white font-bold text-base rounded-xl"
                      style={{ backgroundColor: "#f97316" }}
                    >
                      {loading ? "Sending..." : "Request My Demo →"}
                    </Button>

                    <p className="text-xs text-center text-slate-400">
                      By submitting, you agree to our{" "}
                      <a href="/privacy" className="underline hover:text-slate-600">
                        Privacy Policy
                      </a>
                      . No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
