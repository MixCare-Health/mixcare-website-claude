import type { Metadata } from "next";
import { buildAlternates, ogImage, SITE_NAME } from "@/lib/seo";

const { canonical, languages } = buildAlternates("/contact-us");

export const metadata: Metadata = {
  title: "Contact Us — Hong Kong & Singapore Offices",
  description:
    "Get in touch with MixCare Health. We have offices in Hong Kong (Central) and Singapore. Reach us for sales enquiries, partnerships, or support.",
  keywords: [
    "contact MixCare Health", "MixCare Hong Kong office", "MixCare Singapore office",
    "health benefits enquiry", "MixCare sales contact", "digital health support",
  ],
  alternates: { canonical, languages },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: "Get in touch with MixCare Health — offices in Hong Kong and Singapore.",
    url: canonical,
    images: ogImage("Contact MixCare Health"),
  },
  twitter: {
    title: `Contact Us | ${SITE_NAME}`,
    description: "MixCare Health — offices in Hong Kong and Singapore. Get in touch.",
    images: ["/opengraph-image.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
