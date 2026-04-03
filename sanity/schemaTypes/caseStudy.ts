import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeBulletsField } from "./locale-helpers";

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "company.en" },
      validation: (R) => R.required(),
    }),
    localeStringField("company", "Company Name"),
    localeStringField("segment", "Segment"),
    localeStringField("headline", "Headline"),
    localeStringField("result", "Result (short)"),
    localeTextField("description", "Description"),
    defineField({ name: "color", title: "Accent Color", type: "string" }),
    defineField({ name: "gradient", title: "Gradient (Tailwind classes)", type: "string" }),
    localeTextField("challenge", "Challenge"),
    localeTextField("approach", "Approach"),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Value", type: "string" }),
          localeStringField("label", "Label"),
        ],
        preview: { select: { title: "value" } },
      }],
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      of: [{
        type: "object",
        name: "section",
        fields: [
          localeStringField("heading", "Heading"),
          localeTextField("body", "Body"),
          localeBulletsField,
        ],
        preview: { select: { title: "heading.en" } },
      }],
    }),
    defineField({ name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Published At", type: "date" }),
  ],
  preview: {
    select: { title: "company.en", subtitle: "segment.en" },
  },
  orderings: [{ title: "Published (Newest)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
});
