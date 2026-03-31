"use client";

import { HeroUIProvider } from "@heroui/react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import NextTopLoader from "nextjs-toploader";
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
      <NextTopLoader color="#0d9488" showSpinner={false} height={3} />
      <LanguageProvider initialLocale={initialLocale}>
        {children}
      </LanguageProvider>
    </HeroUIProvider>
  );
}
