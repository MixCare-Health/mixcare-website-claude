import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeArrayField } from "./locale-helpers";

// ── Reusable item shapes ───────────────────────────────────────────────────────

const challengeOrSolutionItem = {
  type: "object" as const,
  fields: [
    defineField({ name: "icon",  title: "Icon Name (lucide)", type: "string" }),
    defineField({ name: "title", title: "Title",              type: "string" }),
    defineField({ name: "desc",  title: "Description",        type: "text"   }),
  ],
  preview: { select: { title: "title" } },
};

const featuredSolutionItem = {
  type: "object" as const,
  fields: [
    defineField({ name: "label", title: "Label",       type: "string" }),
    defineField({ name: "desc",  title: "Description", type: "text"   }),
    defineField({ name: "href",  title: "Link",        type: "string" }),
    defineField({ name: "tag",   title: "Tag",         type: "string" }),
  ],
  preview: { select: { title: "label" } },
};

const metricItem = {
  type: "object" as const,
  fields: [
    defineField({ name: "value", title: "Value",    type: "string" }),
    defineField({ name: "label", title: "Label",    type: "string" }),
    defineField({ name: "sub",   title: "Sublabel", type: "string" }),
  ],
  preview: { select: { title: "value" } },
};

// ── Schema ─────────────────────────────────────────────────────────────────────

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
    localeStringField("metaTitle",       "Meta Title"),
    localeTextField("metaDescription",   "Meta Description"),
    // Hero
    localeStringField("badge",             "Badge"),
    localeStringField("headline",          "Headline"),
    localeStringField("headlineHighlight", "Headline Highlight"),
    localeTextField("sub",                 "Subheadline"),
    defineField({ name: "accentColor", title: "Accent Color",              type: "string", initialValue: "#0d9488" }),
    defineField({ name: "bgGradient",  title: "Background Gradient (CSS)", type: "string" }),
    localeStringField("ctaLabel", "CTA Label"),
    // Arrays — stored as locale objects: { en: [...], zhTW: [...], zhCN: [...] }
    localeArrayField("challenges",        "Challenges",         [challengeOrSolutionItem]),
    localeArrayField("solutions",         "Solutions",          [challengeOrSolutionItem]),
    localeArrayField("featuredSolutions", "Featured Solutions", [featuredSolutionItem]),
    localeArrayField("metrics",           "Metrics",            [metricItem]),
    // Testimonial
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      fields: [
        localeTextField("quote",   "Quote"),
        defineField({ name: "name", title: "Name", type: "string" }),
        localeStringField("title",   "Title"),
        localeStringField("company", "Company"),
      ],
    }),
    // Display flags
    defineField({ name: "hideSolutions",  title: "Hide Solutions Section", type: "boolean", initialValue: false }),
    defineField({ name: "hideTestimonial", title: "Hide Testimonial",      type: "boolean", initialValue: false }),
    defineField({ name: "hideMetrics",    title: "Hide Metrics",           type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "pageId" },
    prepare({ title }) { return { title: `Audience: ${title}` }; },
  },
});
