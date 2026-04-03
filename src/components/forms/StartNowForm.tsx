"use client";

import { useState } from "react";
import { Input, Button } from "@heroui/react";
import { CheckCircle2 } from "lucide-react";

export interface StartNowFormContent {
  formTitle: string;
  fields: {
    name: string;
    email: string;
    company: string;
    submit: string;
    note: string;
  };
  success: {
    title: string;
    sub: string;
  };
}

interface Props {
  content: StartNowFormContent;
}

export default function StartNowForm({ content }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 text-center max-w-lg mx-auto">
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
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-left max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-5">{content.formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label={content.fields.name}
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isRequired
          variant="bordered"
        />
        <Input
          label={content.fields.email}
          type="email"
          placeholder="jane@yourcompany.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isRequired
          variant="bordered"
        />
        <Input
          label={content.fields.company}
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
          {content.fields.submit}
        </Button>
        <p className="text-xs text-center text-slate-400 pt-1">
          {content.fields.note}
        </p>
      </form>
    </div>
  );
}
