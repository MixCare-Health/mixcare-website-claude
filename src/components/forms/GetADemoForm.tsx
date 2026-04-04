"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select, SelectItem, Textarea, Button } from "@heroui/react";
import type { Selection } from "@heroui/react";
import { Clock, Users, TrendingUp, ShieldCheck, ChevronDown } from "lucide-react";
import { localePath } from "@/lib/locale";
import type { Locale } from "@/lib/locale";

export interface PlatformSolutionOption {
  value: string;
  label: string;
}

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
    country: string;
    solutions: string;
    renewalDate: string;
    hasBroker: string;
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
  countries: string[];
  brokerOptions: string[];
  platformSolutions: PlatformSolutionOption[];
}

interface Props {
  content: GetADemoContent;
  locale: Locale;
}

const bulletIcons = [Clock, Users, TrendingUp, ShieldCheck];

// Solutions that trigger the renewal date + broker fields
const RENEWAL_TRIGGERS = new Set(["self-funded-outpatient", "fsa"]);

export default function GetADemoForm({ content, locale }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    size: "",
    role: "",
    country: "Hong Kong",
    renewalDate: "",
    hasBroker: "",
    message: "",
  });
  const [selectedSolutions, setSelectedSolutions] = useState<Set<string>>(new Set());

  // Show renewal + broker fields when outpatient or FSA is selected
  const showRenewalFields = Array.from(selectedSolutions).some((v) => RENEWAL_TRIGGERS.has(v));

  const handleSolutionsChange = (keys: Selection) => {
    if (keys === "all") {
      setSelectedSolutions(new Set(content.platformSolutions.map((s) => s.value)));
    } else {
      setSelectedSolutions(new Set(Array.from(keys as Set<string>)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push(localePath(locale, "/get-a-demo/success"));
  };

  const { hero, bullets, formTitle, formSub, fields, sizes, roles, countries, brokerOptions, platformSolutions } = content;

  return (
    <section
      className="pt-28 pb-20 min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #0d9488, transparent)" }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: copy ──────────────────────────────────────────────────── */}
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

          {/* ── Right: form ─────────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-10">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">{formTitle}</h2>
            <p className="text-sm text-slate-500 mb-7">{formSub}</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Row 1: Name + Email */}
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

              {/* Row 2: Company */}
              <Input
                label={fields.company}
                placeholder="Acme Corporation"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                isRequired
                variant="bordered"
                classNames={{ inputWrapper: "border-slate-200" }}
              />

              {/* Row 3: Size + Role */}
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

              {/* Row 4: Country */}
              <Select
                label={fields.country}
                placeholder="Select country"
                defaultSelectedKeys={["0"]}
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                isRequired
                variant="bordered"
                classNames={{ trigger: "border-slate-200" }}
              >
                {countries.map((c, i) => (
                  <SelectItem key={i.toString()}>{c}</SelectItem>
                ))}
              </Select>

              {/* Row 5: Platform solutions (multi-select) */}
              <Select
                label={fields.solutions}
                placeholder="Select all that apply"
                selectionMode="multiple"
                selectedKeys={selectedSolutions}
                onSelectionChange={handleSolutionsChange}
                variant="bordered"
                classNames={{ trigger: "border-slate-200" }}
                selectorIcon={<ChevronDown size={16} />}
                renderValue={(items) => (
                  <span className="text-sm text-slate-700">
                    {items.length === 0
                      ? ""
                      : items.length === 1
                      ? items[0].textValue
                      : `${items.length} solutions selected`}
                  </span>
                )}
              >
                {platformSolutions.map((s) => (
                  <SelectItem key={s.value}>{s.label}</SelectItem>
                ))}
              </Select>

              {/* Conditional: renewal date + broker (shown when outpatient or FSA selected) */}
              {showRenewalFields && (
                <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-4 space-y-4">
                  {/* Renewal date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      {fields.renewalDate}
                    </label>
                    <input
                      type="date"
                      value={form.renewalDate}
                      onChange={(e) => setForm({ ...form, renewalDate: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                    />
                  </div>

                  {/* Broker question */}
                  <Select
                    label={fields.hasBroker}
                    placeholder="Select an option"
                    value={form.hasBroker}
                    onChange={(e) => setForm({ ...form, hasBroker: e.target.value })}
                    variant="bordered"
                    classNames={{ trigger: "border-slate-200 bg-white" }}
                  >
                    {brokerOptions.map((opt, i) => (
                      <SelectItem key={i.toString()}>{opt}</SelectItem>
                    ))}
                  </Select>
                </div>
              )}

              {/* Message */}
              <Textarea
                label={fields.message}
                placeholder={fields.messagePlaceholder}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                variant="bordered"
                minRows={3}
                classNames={{ inputWrapper: "border-slate-200" }}
              />

              {/* Submit */}
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

              {/* Privacy — no spam line removed */}
              <p className="text-xs text-center text-slate-400">
                {fields.privacy}{" "}
                <a href="/privacy" className="underline hover:text-slate-600">
                  {fields.privacyLink}
                </a>
                .
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
