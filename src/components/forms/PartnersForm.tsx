"use client";

import { useState, useRef } from "react";
import { Input, Select, SelectItem, Textarea, Button } from "@heroui/react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

export interface PartnersFormContent {
  formTitle: string;
  formSub: string;
  fields: {
    name: string;
    email: string;
    company: string;
    type: string;
    website: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    note: string;
  };
  typeOptions: string[];
  success: {
    title: string;
    sub: string;
  };
}

interface Props {
  content: PartnersFormContent;
}

export default function PartnersForm({ content }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [form, setForm] = useState({
    name: "", email: "", company: "", type: "", website: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!captchaToken) {
      setError("Please complete the reCAPTCHA verification.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken: captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            {content.success.title}
          </h2>
          <p className="text-slate-600">{content.success.sub}</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
            {content.formTitle}
          </h2>
          <p className="text-sm text-slate-500 mb-7">{content.formSub}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={content.fields.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                isRequired
                variant="bordered"
              />
              <Input
                label={content.fields.email}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                isRequired
                variant="bordered"
              />
            </div>
            <Input
              label={content.fields.company}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              isRequired
              variant="bordered"
            />
            <Select
              label={content.fields.type}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              isRequired
              variant="bordered"
            >
              {content.typeOptions.map((opt) => (
                <SelectItem key={opt}>{opt}</SelectItem>
              ))}
            </Select>
            <Input
              label={content.fields.website}
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              variant="bordered"
            />
            <Textarea
              label={content.fields.message}
              placeholder={content.fields.messagePlaceholder}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              variant="bordered"
              minRows={3}
            />
            <div className="flex justify-center pt-1">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            )}
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={loading}
              isDisabled={!captchaToken || loading}
              className="text-white font-bold rounded-xl"
              style={{ backgroundColor: "#f97316" }}
            >
              {loading ? "Sending…" : content.fields.submit}
            </Button>
            <p className="text-xs text-center text-slate-400">
              {content.fields.note}
            </p>
          </form>
        </>
      )}
    </div>
  );
}
