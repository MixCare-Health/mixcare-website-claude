import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getLocale } from "@/lib/locale.server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MixCare Health — AI-Powered Digital Health & Wellness Platform",
  description:
    "MixCare Health is an AI-powered digital health and wellness platform for insurers, enterprises, and small businesses across Hong Kong, Macau, and Singapore. Self-funded outpatient, FSA, wellness marketplace and more.",
  openGraph: {
    title: "MixCare Health — AI-Powered Digital Health & Wellness Platform",
    description:
      "Transform your health benefits with MixCare Health. AI-powered platform for insurers, enterprises, and SMBs across Asia-Pacific.",
    type: "website",
    locale: "en_HK",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="light">
      <body className={inter.className}>
        <Providers initialLocale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
