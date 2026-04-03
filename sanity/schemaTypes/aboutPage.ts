import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField } from "./locale-helpers";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
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
    // Story
    defineField({
      name: "story",
      title: "Our Story",
      type: "object",
      fields: [
        localeStringField("headline", "Section Headline"),
        localeTextField("p1", "Paragraph 1"),
        localeTextField("p2", "Paragraph 2"),
        localeTextField("p3", "Paragraph 3"),
      ],
    }),
    // Stats
    defineField({
      name: "stats",
      title: "Stats Bar",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Value", type: "string" }),
          localeStringField("label", "Label"),
        ],
        preview: { select: { title: "value", subtitle: "label.en" } },
      }],
    }),
    // Values
    defineField({
      name: "values",
      title: "Values Section",
      type: "object",
      fields: [
        localeStringField("headline", "Section Headline"),
        defineField({
          name: "items",
          title: "Values",
          type: "array",
          of: [{
            type: "object",
            fields: [
              localeStringField("title", "Title"),
              localeTextField("desc", "Description"),
            ],
            preview: { select: { title: "title.en" } },
          }],
        }),
      ],
    }),
    // Team section labels
    defineField({
      name: "team",
      title: "Team Section",
      type: "object",
      fields: [
        localeStringField("headline", "Section Headline"),
        localeTextField("sub", "Sub-heading"),
      ],
    }),
    // Careers
    defineField({
      name: "careers",
      title: "Careers Section",
      type: "object",
      fields: [
        localeStringField("headline", "Section Headline"),
        localeTextField("sub", "Sub-heading"),
        localeStringField("cta", "CTA Label"),
      ],
    }),
    // Press
    defineField({
      name: "press",
      title: "Press Section",
      type: "object",
      fields: [
        localeStringField("headline", "Section Headline"),
        localeStringField("mediaEnquiry", "Media Enquiry Link Text"),
        defineField({
          name: "items",
          title: "Press Items",
          type: "array",
          of: [{
            type: "object",
            fields: [
              localeStringField("outlet", "Outlet Name"),
              localeStringField("date", "Date"),
              localeStringField("headline", "Headline"),
              defineField({ name: "url", title: "URL", type: "url" }),
            ],
            preview: { select: { title: "outlet.en", subtitle: "headline.en" } },
          }],
        }),
      ],
    }),
    // CTA
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
    prepare() { return { title: "About Page" }; },
  },
});
