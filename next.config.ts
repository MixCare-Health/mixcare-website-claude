import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "m.mixcarehealth.com",
      },
    ],
  },

  async redirects() {
    // Helper: redirect both /slug and /slug/ to the same destination
    const r = (source: string, destination: string, permanent = true) => [
      { source, destination, permanent },
      { source: source + "/", destination, permanent },
    ];

    return [
      // ── Specific page redirects ──────────────────────────────────────────
      ...r("/terms-conditions",   "/en/terms-and-conditions"),
      ...r("/privacy-policy",     "/en/privacy-policy"),
      ...r("/press",              "/en/resources/media-coverage"),
      ...r("/mixcare-health-pnc-aso-demo",
          "https://meetings-na2.hubspot.com/alex-wong9/mixcare-exploration-meeting-"),

      // ── Legacy product / feature pages → new site equivalents ───────────
      ...r("/self-funded-outpatient-plan",         "/en/platform/self-funded-outpatient"),
      ...r("/flexible-spending-account-fsa",       "/en/platform/flexible-spending-account"),
      ...r("/for-brokers",                          "/en/who-we-serve/brokers"),
      ...r("/for-insurers-wellness-marketplace-flexible-spending-account-customer-engagement",
          "/en/who-we-serve/insurers"),
      ...r("/book-a-meeting",
          "https://meetings-na2.hubspot.com/alex-wong9/mixcare-exploration-meeting-"),

      // ── Blog / resource hub ──────────────────────────────────────────────
      ...r("/blog/resources-hub",            "/en/resources"),
      ...r("/blog/resources-hub/case-study", "/en/resources/case-studies"),

      // ── Case studies → resources ─────────────────────────────────────────
      ...r("/case-study-saas-employee-benefits-zh",                                                          "/en/resources/case-studies"),
      ...r("/v2-case-study-launchloop-transforming-employee-benefits-with-mixcares-self-funded-outpatient-service", "/en/resources/case-studies"),
      ...r("/case-study-startup-flexible-benefits",                                                          "/en/resources/case-studies"),
      ...r("/sip-sear-transforming-restaurant-group-benefits",                                               "/en/resources/case-studies"),
      ...r("/launchloop-empowering-a-tech-startup-with-saas-solutions",                                      "/en/resources/case-studies"),
      ...r("/chung-kee-engineering-building-success-in-construction",                                        "/en/resources/case-studies"),
      ...r("/blossom-thread-elevating-boutique-fashion-retail",                                              "/en/resources/case-studies"),
      ...r("/jetway-logistics-streamlining-transportation-and-logistics",                                     "/en/resources/case-studies"),
      ...r("/brightsteps-learning-enhancing-private-education-programs",                                      "/en/resources/case-studies"),

      // Chinese-encoded case study slugs
      ...r("/餐飲集團-sip-sear：革新餐飲業員工福利",                 "/en/resources/case-studies"),
      ...r("/科技初創公司-launchloop：以saas解決方案賦能科技初創",   "/en/resources/case-studies"),
      ...r("/建築公司-鍾記工程：建築行業的成功之道",                 "/en/resources/case-studies"),
      ...r("/零售品牌-blossom-thread：提升精品時裝零售",             "/en/resources/case-studies"),
      ...r("/物流公司-jetway-logistics：優化運輸物流",               "/en/resources/case-studies"),
      ...r("/教育中心-brightsteps-learning：增強私立教育項目",       "/en/resources/case-studies"),

      // ── Marketing / landing pages → homepage ─────────────────────────────
      ...r("/get-wellness-event-proposal-mixcare-health",         "/"),
      ...r("/download-2025-yearly-wellbeing-calendar",            "/"),
      ...r("/get-demo-wa-group-mixcare-health",                   "/"),
      ...r("/medical-pass",                                        "/"),
      ...r("/mercer-health-forum-2025-contact-sheet",             "/"),
      ...r("/newsletter-sign-up-mixcare-health",                  "/"),
      ...r("/itc-asia-2025-mixcare-survey",                       "/"),
      ...r("/future-of-eb-mixcare-report",                        "/"),
      ...r("/25227-2",                                             "/"),
      ...r("/employee-wellness-calendar-2025-mixcare-health",     "/"),
      ...r("/pricing",                                             "/en/start-now"),
      ...r("/newsletter15-en",                                     "/"),
      ...r("/newsletter15-zh",                                     "/"),
      ...r("/hkihrm-2025",                                         "/"),
      ...r("/home-中文-香港",                                       "/zh-hk"),

      // ── Old e-commerce / account pages → homepage ────────────────────────
      ...r("/shop",        "/"),
      ...r("/cart",        "/"),
      ...r("/checkout",    "/"),
      ...r("/my-account",  "/"),
    ].flat();
  },
};

export default nextConfig;
