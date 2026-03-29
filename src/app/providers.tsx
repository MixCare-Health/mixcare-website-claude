"use client";

import { HeroUIProvider } from "@heroui/react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/locale";

export function Providers({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  return (
    <HeroUIProvider>
      <LanguageProvider initialLocale={initialLocale}>
        {children}
      </LanguageProvider>
    </HeroUIProvider>
  );
}
