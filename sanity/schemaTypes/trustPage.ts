import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField } from "./locale-helpers";

export const trustPageType = defineType({
  name: "trustPage",
  title: "Trust Page",
  type: "document",
  fields: [
    // Hero
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeStringField("headline", "Headline"),
        localeStringField("headlineHighlight", "Headline Highlight"),
        localeTextField("sub", "Sub-heading"),
      ],
    }),
    // Certifications
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "object",
      fields: [
        localeStringField("heading", "Section Heading"),
        localeTextField("sub", "Sub-heading"),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [{
            type: "object",
            fields: [
              localeStringField("label", "Label"),
              localeStringField("desc", "Short Description"),
              localeTextField("detail", "Detail"),
            ],
            preview: { select: { title: "label.en" } },
          }],
        }),
      ],
    }),
    // Security Pillars
    defineField({
      name: "security",
      title: "Security Architecture",
      type: "object",
      fields: [
        localeStringField("heading", "Section Heading"),
        localeTextField("sub", "Sub-heading"),
        defineField({
          name: "pillars",
          title: "Pillars",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "icon", title: "Icon Name", type: "string" }),
              localeStringField("title", "Title"),
              localeTextField("desc", "Description"),
            ],
            preview: { select: { title: "title.en" } },
          }],
        }),
      ],
    }),
    // Data Privacy
    defineField({
      name: "privacy",
      title: "Data Privacy Section",
      type: "object",
      fields: [
        localeStringField("heading", "Section Heading"),
        defineField({
          name: "principles",
          title: "Principles",
          type: "array",
          of: [{
            type: "object",
            fields: [
              localeStringField("principle", "Principle"),
              localeTextField("desc", "Description"),
            ],
            preview: { select: { title: "principle.en" } },
          }],
        }),
      ],
    }),
    // Partner Logos bar
    defineField({
      name: "partnerBar",
      title: "Partner Bar",
      type: "object",
      fields: [
        localeStringField("label", "Label"),
        localeTextField("contactNote", "Contact Note (plain text with email)"),
        defineField({
          name: "logos",
          title: "Logo Names",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    // Bottom CTA
    defineField({
      name: "cta",
      title: "Bottom CTA",
      type: "object",
      fields: [
        localeStringField("headline", "Headline"),
        localeTextField("sub", "Sub-heading"),
        localeStringField("ctaLabel", "CTA Label"),
        localeStringField("secondaryLabel", "Secondary Label"),
      ],
    }),
  ],
  preview: {
    prepare() { return { title: "Trust Page" }; },
  },
});
