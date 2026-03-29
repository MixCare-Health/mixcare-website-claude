"use client";

import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Input, Textarea, Button } from "@heroui/react";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";

const offices = [
  {
    city: "Hong Kong",
    address: "23/F, Two International Finance Centre, 8 Finance Street, Central, Hong Kong",
    phone: "+852 3700 8888",
    email: "hk@mixcarehealth.com",
    hours: "Mon–Fri, 9:00am–6:00pm HKT",
  },
  {
    city: "Singapore",
    address: "1 Raffles Place, #20-01, One Raffles Place, Singapore 048616",
    phone: "+65 6800 8888",
    email: "sg@mixcarehealth.com",
    hours: "Mon–Fri, 9:00am–6:00pm SGT",
  },
];

export default function ContactPage() {
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

  return (
    <main>
      <AppNavbar />

      {/* Hero */}
      <section
        className="pt-28 pb-16"
        style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #eff6ff 50%, #fff7ed 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-5">
            Get in{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              touch
            </span>
          </h1>
          <p className="text-xl text-slate-600">
            Have a question, feedback, or need support? We&apos;re here to help — reach out
            through any channel below.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Our offices</h2>
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
                    Message sent!
                  </h2>
                  <p className="text-slate-600">
                    We&apos;ll get back to you within 1 business day.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                    Send us a message
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">
                    We respond to all enquiries within 1 business day.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Your Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        isRequired
                        variant="bordered"
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        isRequired
                        variant="bordered"
                      />
                    </div>
                    <Input
                      label="Company (optional)"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      variant="bordered"
                    />
                    <Textarea
                      label="Message"
                      placeholder="How can we help you?"
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
                      {loading ? "Sending..." : "Send Message →"}
                    </Button>
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
