import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeBulletsField, localeStringsField } from "./locale-helpers";

export const platformPageType = defineType({
  name: "platformPage",
  title: "Platform Page",
  type: "document",
  fields: [
    defineField({
      name: "pageId",
      title: "Page ID",
      type: "string",
      description: 'e.g. "self-funded-outpatient"',
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
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        localeStringField("badge", "Badge"),
        localeStringField("headline", "Headline"),
        localeStringField("headlineHighlight", "Headline Highlight"),
        localeTextField("sub", "Subheadline"),
        localeStringField("ctaLabel", "CTA Label"),
        defineField({ name: "iconColor", title: "Icon Color", type: "string" }),
        defineField({ name: "bgGradient", title: "Background Gradient (CSS)", type: "string" }),
      ],
    }),
    // Benefits
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "object",
      fields: [
        localeStringField("heading", "Heading"),
        localeTextField("sub", "Subheading"),
        defineField({
          name: "items",
          title: "Items",
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
      ],
    }),
    // How It Works
    defineField({
      name: "howItWorks",
      title: "How It Works",
      type: "object",
      fields: [
        localeStringField("heading", "Heading"),
        localeTextField("sub", "Subheading"),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "step", title: "Step Number", type: "string" }),
              localeStringField("title", "Title"),
              localeTextField("desc", "Description"),
              localeBulletsField,
            ],
            preview: { select: { title: "title.en" } },
          }],
        }),
      ],
    }),
    // Stats
    defineField({
      name: "stats",
      title: "Stats",
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
        defineField({ name: "title", title: "Title/Role", type: "string" }),
        defineField({ name: "company", title: "Company", type: "string" }),
      ],
    }),
    // CTA
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      fields: [
        localeStringField("heading", "Heading"),
        localeTextField("sub", "Subheading"),
        localeStringField("ctaLabel", "CTA Label"),
        localeStringField("secondaryLabel", "Secondary Label"),
      ],
    }),
    // Pain Points
    defineField({
      name: "painPoints",
      title: "Pain Points",
      type: "array",
      of: [{
        type: "object",
        fields: [
          localeStringField("title", "Title"),
          localeTextField("desc", "Description"),
          defineField({ name: "icon", title: "Icon", type: "string" }),
        ],
        preview: { select: { title: "title.en" } },
      }],
    }),
    // Comparison/Use Cases (flexible extra content)
    defineField({
      name: "extraSections",
      title: "Extra Content Sections",
      type: "array",
      of: [{
        type: "object",
        name: "extraSection",
        fields: [
          defineField({ name: "sectionType", title: "Section Type", type: "string" }),
          localeStringField("heading", "Heading"),
          localeTextField("sub", "Subheading"),
          defineField({
            name: "items",
            title: "Items",
            type: "array",
            of: [{
              type: "object",
              fields: [
                localeStringField("title", "Title"),
                localeTextField("desc", "Description"),
                localeBulletsField,
              ],
              preview: { select: { title: "title.en" } },
            }],
          }),
        ],
        preview: { select: { title: "heading.en" } },
      }],
    }),
  ],
  preview: {
    select: { title: "pageId" },
    prepare({ title }) { return { title: `Platform: ${title}` }; },
  },
});
