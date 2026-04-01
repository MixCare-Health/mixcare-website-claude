import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";

const { canonical, languages } = buildAlternates("/partners");

export const metadata: Metadata = {
  title: "Partner with MixCare — Brokers & Wellness Providers",
  description:
    "Become a MixCare partner. Brokers: deliver modern digital health benefits to your clients. Wellness providers: join our 3,000+ service network and reach corporate employees across Asia-Pacific.",
  keywords: [
    "MixCare partner", "health benefits partner", "broker partner programme",
    "wellness provider partner", "corporate wellness network", "insurance broker partnership",
    "health benefits distribution partner", "join MixCare network",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Partner with MixCare | ${SITE_NAME}`,
    description:
      "Brokers: deliver digital health benefits. Providers: join our 3,000+ service network across Asia-Pacific.",
    url: canonical,
    images: ogImage("Partner with MixCare Health"),
  },
  twitter: {
    title: `Partners | ${SITE_NAME}`,
    description: "Join MixCare as a broker or wellness provider. Reach corporate employees across Asia-Pacific.",
    images: ["/opengraph-image.png"],
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
