"use client";

import { useState } from "react";
import { Input, Textarea, Button } from "@heroui/react";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";

export interface ContactOffice {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export interface ContactContent {
  hero: {
    headline: string;
    headlineHighlight: string;
    sub: string;
  };
  officesTitle: string;
  formTitle: string;
  formSub: string;
  hours: string;
  fields: {
    name: string;
    email: string;
    company: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
  success: {
    title: string;
    sub: string;
  };
  offices: ContactOffice[];
}

interface Props {
  content: ContactContent;
}

export default function ContactForm({ content }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  const { hero, officesTitle, formTitle, formSub, fields, success, offices } = content;

  return (
    <main>
      {/* Hero */}
      <section
        className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -z-10 blur-3xl" style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">
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
          <p className="text-xl text-slate-600">{hero.sub}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">{officesTitle}</h2>
              <div className="space-y-8">
                {offices.map((office) => (
                  <div
                    key={office.city}
                    className="rounded-2xl p-6 border border-slate-100"
                    style={{ backgroundColor: "#f8fafc" }}
                  >
                    <h3
                      className="text-lg font-bold mb-4"
                      style={{ color: "#0d9488" }}
                    >
                      {office.city}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-slate-700">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-slate-400 flex-shrink-0" />
                        <a
                          href={`tel:${office.phone.replace(/\s/g, "")}`}
                          className="text-sm text-slate-700 hover:text-teal-600"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-slate-400 flex-shrink-0" />
                        <a
                          href={`mailto:${office.email}`}
                          className="text-sm text-slate-700 hover:text-teal-600"
                        >
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-slate-400 flex-shrink-0" />
                        <p className="text-sm text-slate-700">{office.hours}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { label: "Book a Demo", href: "/get-a-demo", color: "#f97316" },
                  { label: "Partner With Us", href: "/partners", color: "#0d9488" },
                  { label: "Start Now", href: "/start-now", color: "#1e3a5f" },
                  { label: "Trust & Security", href: "/trust", color: "#7c3aed" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-white text-center"
                    style={{ backgroundColor: link.color }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "#ccfbf1" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "#0d9488" }} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
                    {success.title}
                  </h2>
                  <p className="text-slate-600">{success.sub}</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-2">{formTitle}</h2>
                  <p className="text-sm text-slate-500 mb-6">{formSub}</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label={fields.name}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        isRequired
                        variant="bordered"
                      />
                      <Input
                        label={fields.email}
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        isRequired
                        variant="bordered"
                      />
                    </div>
                    <Input
                      label={fields.company}
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      variant="bordered"
                    />
                    <Textarea
                      label={fields.message}
                      placeholder={fields.messagePlaceholder}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      isRequired
                      variant="bordered"
                      minRows={4}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      isLoading={loading}
                      className="text-white font-bold rounded-xl"
                      style={{ backgroundColor: "#f97316" }}
                    >
                      {loading ? "..." : fields.submit}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
