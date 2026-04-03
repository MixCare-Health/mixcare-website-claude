"use client";

import { useState } from "react";
import { Input, Select, SelectItem, Textarea, Button } from "@heroui/react";
import { CheckCircle2, Clock, Users, ShieldCheck, TrendingUp } from "lucide-react";

export interface GetADemoContent {
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    sub: string;
  };
  bullets: string[];
  whatHappens: string;
  afterSubmit: string[];
  formTitle: string;
  formSub: string;
  fields: {
    name: string;
    email: string;
    company: string;
    size: string;
    role: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    privacy: string;
    privacyLink: string;
    noSpam: string;
  };
  success: {
    title: string;
    sub: string;
    explore: string;
    platform: string;
    or: string;
    caseStudies: string;
  };
  sizes: string[];
  roles: string[];
}

interface Props {
  content: GetADemoContent;
}

const bulletIcons = [Clock, Users, TrendingUp, ShieldCheck];

export default function GetADemoForm({ content }: Props) {
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

  const { hero, bullets, whatHappens, afterSubmit, formTitle, formSub, fields, success, sizes, roles } = content;

  return (
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
              {hero.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
              {hero.headline}{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {hero.headlineHighlight}
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">{hero.sub}</p>

            <div className="space-y-4 mb-10">
              {bullets.map((text, i) => {
                const Icon = bulletIcons[i % bulletIcons.length];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#ccfbf1" }}
                    >
                      <Icon size={16} style={{ color: "#0d9488" }} />
                    </div>
                    <p className="text-slate-700 text-sm pt-1">{text}</p>
                  </div>
                );
              })}
            </div>

            {/* Social proof */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100">
              <p className="text-sm font-semibold text-slate-500 mb-3">{whatHappens}</p>
              <div className="space-y-2">
                {afterSubmit.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={14} style={{ color: "#0d9488" }} />
                    <span>{step}</span>
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
                <h2 className="text-2xl font-extrabold text-slate-900 mb-3">{success.title}</h2>
                <p className="text-slate-600 mb-6">{success.sub}</p>
                <p className="text-sm text-slate-500">
                  {success.explore}{" "}
                  <a href="/platform/self-funded-outpatient" className="text-teal-600 font-semibold hover:underline">
                    {success.platform}
                  </a>{" "}
                  {success.or}{" "}
                  <a href="/resources" className="text-teal-600 font-semibold hover:underline">
                    {success.caseStudies}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">{formTitle}</h2>
                <p className="text-sm text-slate-500 mb-7">{formSub}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label={fields.name}
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      isRequired
                      variant="bordered"
                      classNames={{ inputWrapper: "border-slate-200" }}
                    />
                    <Input
                      label={fields.email}
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
                    label={fields.company}
                    placeholder="Acme Corporation"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    isRequired
                    variant="bordered"
                    classNames={{ inputWrapper: "border-slate-200" }}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label={fields.size}
                      placeholder="Select size"
                      value={form.size}
                      onChange={(e) => setForm({ ...form, size: e.target.value })}
                      isRequired
                      variant="bordered"
                      classNames={{ trigger: "border-slate-200" }}
                    >
                      {sizes.map((s, i) => (
                        <SelectItem key={i.toString()}>{s}</SelectItem>
                      ))}
                    </Select>

                    <Select
                      label={fields.role}
                      placeholder="Select role"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      isRequired
                      variant="bordered"
                      classNames={{ trigger: "border-slate-200" }}
                    >
                      {roles.map((r, i) => (
                        <SelectItem key={i.toString()}>{r}</SelectItem>
                      ))}
                    </Select>
                  </div>

                  <Textarea
                    label={fields.message}
                    placeholder={fields.messagePlaceholder}
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
                    {loading ? fields.submitting : fields.submit}
                  </Button>

                  <p className="text-xs text-center text-slate-400">
                    {fields.privacy}{" "}
                    <a href="/privacy" className="underline hover:text-slate-600">
                      {fields.privacyLink}
                    </a>
                    . {fields.noSpam}
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
