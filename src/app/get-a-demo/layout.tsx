import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";

const { canonical, languages } = buildAlternates("/get-a-demo");

export const metadata: Metadata = {
  title: "Get a Demo — See MixCare in Action",
  description:
    "Book a personalised demo of MixCare Health's digital health and wellness platform. We'll walk you through self-funded outpatient, FSA wallets, wellness marketplace, and more.",
  keywords: [
    "MixCare demo", "book health benefits demo", "employee benefits demo",
    "FSA platform demo", "wellness platform demo", "digital health platform demo",
    "corporate benefits demo", "MixCare get a demo",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Get a Demo — See MixCare in Action | ${SITE_NAME}`,
    description:
      "Book a personalised demo of MixCare Health. Self-funded outpatient, FSA wallets, wellness marketplace, and more.",
    url: canonical,
    images: ogImage("Get a MixCare Health Demo"),
  },
  twitter: {
    title: `Get a Demo | ${SITE_NAME}`,
    description: "Book a personalised demo of MixCare's digital health and wellness platform.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function GetADemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
