import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";

const { canonical, languages } = buildAlternates("/start-now");

export const metadata: Metadata = {
  title: "Start Now — Flexible Benefits Pricing for SMBs",
  description:
    "Get started with MixCare Health today. Transparent pricing for small and medium businesses — FSA wallets, wellness marketplace, and outpatient benefits. No setup fee, no HR team required.",
  keywords: [
    "MixCare pricing", "employee benefits pricing Hong Kong", "SMB wellness platform pricing",
    "FSA plan pricing", "affordable employee benefits", "health benefits self-serve",
    "corporate wellness pricing", "MixCare start now",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Start Now — Flexible Benefits Pricing for SMBs | ${SITE_NAME}`,
    description:
      "Transparent pricing for SMBs. FSA wallets, wellness marketplace, and outpatient benefits. No setup fee.",
    url: canonical,
    images: ogImage("MixCare Health Pricing & Start Now"),
  },
  twitter: {
    title: `Start Now | ${SITE_NAME}`,
    description: "Transparent SMB pricing. FSA, wellness marketplace, outpatient benefits. No setup fee.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function StartNowLayout({ children }: { children: React.ReactNode }) {
  return children;
}
