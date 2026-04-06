import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getLocale } from "@/lib/locale.server";
import { SITE_URL, SITE_NAME, TWITTER_HANDLE } from "@/lib/seo";
import { sanityClient, isSanityConfigured, toSanityLocale } from "@/lib/sanity";
import { siteSettingsQuery, type SanitySiteSettings } from "@/lib/sanity.queries";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI-Powered Digital Health & Wellness Platform`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "MixCare Health is an AI-powered digital health and wellness platform for insurers, enterprises, and SMBs across Hong Kong, Macau, and Singapore. Self-funded outpatient, FSA, wellness marketplace and more.",
  keywords: [
    "digital health platform",
    "employee wellness",
    "flexible spending account",
    "self-funded outpatient",
    "wellness marketplace",
    "corporate benefits",
    "health insurance Hong Kong",
    "Singapore health benefits",
    "FSA wallet",
    "MixCare Health",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — AI-Powered Digital Health & Wellness Platform`,
    description:
      "Transform your employee health benefits with MixCare Health. AI-powered platform for insurers, enterprises, and SMBs across Asia-Pacific.",
    locale: "en_HK",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — AI-Powered Digital Health & Wellness Platform`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: `${SITE_NAME} — AI-Powered Digital Health & Wellness Platform`,
    description:
      "Transform your employee health benefits with MixCare Health. AI-powered platform for insurers, enterprises, and SMBs across Asia-Pacific.",
    images: ["/opengraph-image.png"],
  },
  verification: {
    // Add your Google Search Console & Bing Webmaster verification tokens here
    // google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
    // other: { "msvalidate.01": "YOUR_BING_TOKEN" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const sanityLocale = toSanityLocale(locale);
  const siteSettings: SanitySiteSettings | null = isSanityConfigured
    ? await sanityClient.fetch<SanitySiteSettings | null>(siteSettingsQuery, { locale: sanityLocale })
    : null;

  return (
    <html lang={locale} className="light">
      <body className={inter.className}>
        <Providers initialLocale={locale} siteSettings={siteSettings}>
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
