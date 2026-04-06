"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const CONSENT_KEY = "mixcare_cookie_consent";

const STRINGS = {
  en: {
    message:
      "We use cookies to improve your experience on our platform. By continuing to use MixCare Health, you agree to our use of cookies.",
    policy: "Cookies Policy",
    accept: "Accept",
  },
  "zh-TW": {
    message:
      "我們使用 Cookie 以改善您在平台上的體驗。繼續使用 MixCare Health，即表示您同意我們使用 Cookie。",
    policy: "Cookie 政策",
    accept: "接受",
  },
  "zh-CN": {
    message:
      "我们使用 Cookie 以改善您在平台上的体验。继续使用 MixCare Health，即表示您同意我们使用 Cookie。",
    policy: "Cookie 政策",
    accept: "接受",
  },
} as const;

export default function CookieBanner() {
  const { locale } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consented = localStorage.getItem(CONSENT_KEY);
      if (!consented) setVisible(true);
    } catch {
      // localStorage not available (e.g. SSR guard)
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "true");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  const s = STRINGS[locale] ?? STRINGS["en"];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 shadow-2xl"
      style={{ backgroundColor: "#0f1e38" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-slate-300 leading-relaxed">
          {s.message}{" "}
          <Link
            href="/cookies-policy"
            className="underline text-teal-400 hover:text-teal-300 transition-colors whitespace-nowrap"
          >
            {s.policy}
          </Link>
        </p>
        <button
          onClick={handleAccept}
          className="shrink-0 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#f97316" }}
        >
          {s.accept}
        </button>
      </div>
    </div>
  );
}
