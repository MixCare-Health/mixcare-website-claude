import { SITE_URL, SITE_NAME } from "@/lib/seo";

/* ── Types ──────────────────────────────────────────────────────────── */
type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders a <script type="application/ld+json"> tag safely. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── Pre-built schemas ───────────────────────────────────────────────── */

/** Organization schema — used on the home page */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: "/logos/mixcare-logo.257ebb39.png",
    width: 200,
    height: 60,
  },
  description:
    "MixCare Health is an AI-powered digital health and wellness platform for insurers, enterprises, and SMBs across Hong Kong, Macau, and Singapore.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "hk@mixcarehealth.com",
      contactType: "customer service",
      areaServed: "HK",
      availableLanguage: ["English", "Chinese"],
    },
    {
      "@type": "ContactPoint",
      email: "sg@mixcarehealth.com",
      contactType: "customer service",
      areaServed: "SG",
      availableLanguage: "English",
    },
  ],
  sameAs: [],
  areaServed: ["HK", "MO", "SG"],
};

/** WebSite schema with SearchAction — used on the home page */
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["en", "zh-HK", "zh-Hans"],
};

/**
 * Build a WebPage schema for any page.
 * @param name       Page title
 * @param description Page description
 * @param path       Page path, e.g. "/platform/fsa"
 */
export function webPageSchema(name: string, description: string, path: string) {
  const cleanPath = path === "/" ? "" : path;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/en${cleanPath}/#webpage`,
    url: `${SITE_URL}/en${cleanPath}`,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

/**
 * Build a BreadcrumbList schema.
 * @param items  Array of { name, path } breadcrumb items (first = Home)
 */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/en${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/**
 * Build an FAQPage schema.
 * @param faqs  Array of { question, answer }
 */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
