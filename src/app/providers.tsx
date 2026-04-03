"use client";

import { HeroUIProvider } from "@heroui/react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import NextTopLoader from "nextjs-toploader";
import type { Locale } from "@/lib/locale";
import type { SanitySiteSettings } from "@/lib/sanity.queries";

export function Providers({
  children,
  initialLocale,
  siteSettings,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
  siteSettings: SanitySiteSettings | null;
}) {
  return (
    <HeroUIProvider>
      <NextTopLoader color="#0d9488" showSpinner={false} height={3} />
      <LanguageProvider initialLocale={initialLocale}>
        <SiteSettingsProvider value={siteSettings}>
          {children}
        </SiteSettingsProvider>
      </LanguageProvider>
    </HeroUIProvider>
  );
}
