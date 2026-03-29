"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Locale } from "@/lib/locale";
import { getTranslations, type Translations } from "@/translations";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale, basePath?: string) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  t: getTranslations("en"),
});

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (l: Locale, basePath = "/") => {
    setLocaleState(l);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: getTranslations(locale) }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
