import { defineField, defineType } from "sanity";
import {
  localeStringField,
  localeTextField,
  localeStringsField,
} from "./locale-helpers";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeStringField("headline1", "Headline Line 1"),
        localeStringField("headline2", "Headline Line 2 (gradient)"),
        localeStringField("headline3", "Headline Line 3 (optional)"),
        localeTextField("sub", "Sub-heading"),
        localeStringField("ctaPrimary", "CTA Primary"),
        localeStringField("ctaSecondary", "CTA Secondary"),
        localeStringField("dashboardTitle", "Dashboard Title"),
        localeStringField("dashboardCompany", "Dashboard Company"),
        localeStringField("dashboardLive", "Dashboard Live Badge"),
        localeStringsField("statLabels", "Stat Labels"),
        localeStringsField("statValues", "Stat Values"),
        localeStringsField("claimLabels", "Claim Labels"),
        localeStringField("recentClaims", "Recent Claims Label"),
        localeStringField("approved", "Approved Status"),
        localeStringField("processing", "Processing Status"),
        localeStringField("costSaved", "Cost Saved Badge"),
        localeStringField("costSavedSub", "Cost Saved Sub"),
        localeStringField("compliance", "Compliance Badge"),
        localeStringField("services", "Services Badge"),
        localeStringField("servicesSub", "Services Sub"),
      ],
    }),

    // ── Logo Bar ─────────────────────────────────────────────────────────────
    defineField({
      name: "logoBar",
      title: "Logo Bar Section",
      type: "object",
      fields: [
        localeStringField("label", "Label"),
        defineField({
          name: "logos",
          title: "Client / Partner Logos",
          description: "Upload logos here. Leave empty to use the built-in defaults.",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "name", title: "Company Name", type: "string" }),
              defineField({
                name: "image",
                title: "Logo Image",
                type: "image",
                options: { hotspot: false },
              }),
              defineField({ name: "href", title: "Link (optional)", type: "string" }),
            ],
            preview: { select: { title: "name", media: "image" } },
          }],
        }),
      ],
    }),

    // ── Core Platform ─────────────────────────────────────────────────────────
    defineField({
      name: "corePlatform",
      title: "Core Platform Section",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeStringField("headline", "Headline"),
        localeStringField("headlineHighlight", "Headline Highlight"),
        localeTextField("sub", "Sub-heading"),
        localeStringField("learnMore", "Learn More Label"),
        defineField({
          name: "pillars",
          title: "Pillars",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                localeStringField("title", "Title"),
                localeTextField("desc", "Description"),
                localeStringField("stats", "Stats Badge"),
              ],
            },
          ],
        }),
        defineField({
          name: "counters",
          title: "Counters",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "value", title: "Value", type: "string" }),
                localeStringField("label", "Label"),
              ],
            },
          ],
        }),
      ],
    }),

    // ── Platform Features ─────────────────────────────────────────────────────
    defineField({
      name: "platformFeatures",
      title: "Platform Features Section",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeStringField("headline", "Headline"),
        localeTextField("sub", "Sub-heading"),
        localeStringField("soon", "Soon Label"),
        localeStringField("comingSoon", "Coming Soon Label"),
        localeStringField("available", "Available Label"),
        localeStringField("learnMore", "Learn More Label"),
        localeStringField("explore", "Explore Label"),
        defineField({
          name: "features",
          title: "Features",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                localeStringField("headline", "Feature Headline"),
                localeTextField("desc", "Description"),
                localeStringsField("bullets", "Bullets"),
              ],
            },
          ],
        }),
      ],
    }),

    // ── Audience ──────────────────────────────────────────────────────────────
    defineField({
      name: "audience",
      title: "Audience Section",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeTextField("headline", "Headline"),
        localeTextField("sub", "Sub-heading"),
        localeStringField("howWeHelp", "How We Help Label"),
        localeStringField("learnMore", "Learn More Label"),
        defineField({
          name: "audiences",
          title: "Audience Segments",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                localeStringField("label", "Label"),
                localeTextField("tagline", "Tagline"),
                localeStringField("cta", "CTA Label"),
                defineField({ name: "ctaHref", title: "CTA Href", type: "string" }),
                localeStringsField("bullets", "Bullets"),
              ],
            },
          ],
        }),
      ],
    }),

    // ── How It Works ─────────────────────────────────────────────────────────
    defineField({
      name: "howItWorks",
      title: "How It Works Section",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeStringField("headline", "Headline"),
        localeTextField("sub", "Sub-heading"),
        localeStringField("stepLabel", "Step Label"),
        localeStringField("cta", "CTA Label"),
        localeStringField("footnote", "Footnote"),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                localeStringField("title", "Title"),
                localeTextField("desc", "Description"),
              ],
            },
          ],
        }),
      ],
    }),

    // ── Testimonials ─────────────────────────────────────────────────────────
    defineField({
      name: "testimonials",
      title: "Testimonials Section",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeStringField("headline", "Headline"),
        localeTextField("sub", "Sub-heading"),
        defineField({
          name: "audienceLabels",
          title: "Audience Labels",
          type: "object",
          fields: [
            localeStringField("insurer", "Insurer"),
            localeStringField("enterprise", "Enterprise"),
            localeStringField("broker", "Broker"),
            localeStringField("smallBusiness", "Small Business"),
            localeStringField("provider", "Provider"),
          ],
        }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "value", title: "Value", type: "string" }),
                localeStringField("label", "Label"),
              ],
            },
          ],
        }),
      ],
    }),

    // ── Compliance ────────────────────────────────────────────────────────────
    defineField({
      name: "compliance",
      title: "Compliance Section",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeStringField("headline", "Headline"),
        localeTextField("sub", "Sub-heading"),
        localeStringField("certFootnote", "Cert Footnote"),
        defineField({
          name: "pillars",
          title: "Security Pillars",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                localeStringField("title", "Title"),
                localeTextField("desc", "Description"),
              ],
            },
          ],
        }),
      ],
    }),

    // ── CTA ───────────────────────────────────────────────────────────────────
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeStringField("headline", "Headline"),
        localeTextField("sub", "Sub-heading"),
        localeStringField("ctaPrimary", "CTA Primary"),
        localeStringField("ctaSecondary", "CTA Secondary"),
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
