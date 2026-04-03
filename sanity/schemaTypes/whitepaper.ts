import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeBulletsField, localeStringsField } from "./locale-helpers";

export const whitepaperType = defineType({
  name: "whitepaper",
  title: "Whitepaper",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (R) => R.required(),
    }),
    localeStringField("title", "Title"),
    localeTextField("description", "Description"),
    defineField({ name: "pages", title: "Page Count", type: "string" }),
    defineField({ name: "format", title: "Format", type: "string" }),
    localeStringField("audience", "Target Audience"),
    defineField({ name: "gradient", title: "Gradient (Tailwind classes)", type: "string" }),
    defineField({ name: "accentColor", title: "Accent Color", type: "string" }),
    localeStringsField("topics", "Topics / Key Questions"),
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
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Published At", type: "date" }),
  ],
  preview: {
    select: { title: "title.en" },
  },
});
