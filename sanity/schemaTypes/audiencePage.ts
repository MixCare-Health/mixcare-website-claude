import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeBulletsField } from "./locale-helpers";

export const audiencePageType = defineType({
  name: "audiencePage",
  title: "Audience Page",
  type: "document",
  fields: [
    defineField({
      name: "pageId",
      title: "Page ID",
      type: "string",
      description: 'e.g. "insurers", "brokers", "enterprises", "small-business", "providers"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "pageId" },
      validation: (R) => R.required(),
    }),
    // Meta
    localeStringField("metaTitle", "Meta Title"),
    localeTextField("metaDescription", "Meta Description"),
    // Hero
    localeStringField("badge", "Badge"),
    localeStringField("headline", "Headline"),
    localeStringField("headlineHighlight", "Headline Highlight"),
    localeTextField("sub", "Subheadline"),
    defineField({ name: "accentColor", title: "Accent Color", type: "string", initialValue: "#0d9488" }),
    defineField({ name: "bgGradient", title: "Background Gradient (CSS)", type: "string" }),
    localeStringField("ctaLabel", "CTA Label"),
    // Challenges
    defineField({
      name: "challenges",
      title: "Challenges",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "icon", title: "Icon Name (lucide)", type: "string" }),
          localeStringField("title", "Title"),
          localeTextField("desc", "Description"),
        ],
        preview: { select: { title: "title.en" } },
      }],
    }),
    // Solutions
    defineField({
      name: "solutions",
      title: "Solutions",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "icon", title: "Icon Name (lucide)", type: "string" }),
          localeStringField("title", "Title"),
          localeTextField("desc", "Description"),
        ],
        preview: { select: { title: "title.en" } },
      }],
    }),
    // Featured Solutions
    defineField({
      name: "featuredSolutions",
      title: "Featured Solutions",
      type: "array",
      of: [{
        type: "object",
        fields: [
          localeStringField("label", "Label"),
          localeTextField("desc", "Description"),
          defineField({ name: "href", title: "Link", type: "string" }),
        ],
        preview: { select: { title: "label.en" } },
      }],
    }),
    // Metrics
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Value", type: "string" }),
          localeStringField("label", "Label"),
          localeStringField("sub", "Sublabel"),
        ],
        preview: { select: { title: "value" } },
      }],
    }),
    // Testimonial
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      fields: [
        localeTextField("quote", "Quote"),
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "company", title: "Company", type: "string" }),
      ],
    }),
    // Display flags
    defineField({ name: "hideSolutions", title: "Hide Solutions Section", type: "boolean", initialValue: false }),
    defineField({ name: "hideTestimonial", title: "Hide Testimonial", type: "boolean", initialValue: false }),
    defineField({ name: "hideMetrics", title: "Hide Metrics", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "pageId" },
    prepare({ title }) { return { title: `Audience: ${title}` }; },
  },
});
