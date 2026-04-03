"use client";

import { createContext, useContext } from "react";
import type { SanitySiteSettings } from "@/lib/sanity.queries";

const SiteSettingsContext = createContext<SanitySiteSettings | null>(null);

export function SiteSettingsProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SanitySiteSettings | null;
}) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

/** Returns the Sanity siteSettings for the current locale, or null if not configured. */
export function useSiteSettings(): SanitySiteSettings | null {
  return useContext(SiteSettingsContext);
}
