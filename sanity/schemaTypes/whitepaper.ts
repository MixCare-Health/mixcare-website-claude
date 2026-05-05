import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeBulletsField, localeStringsField, localeRichTextField } from "./locale-helpers";

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
          localeStringField("heading",  "Heading"),
          localeRichTextField("body",  "Body (Rich Text — bold, italic, headings, lists, images, tables…)"),
          localeBulletsField,
        ],
        preview: { select: { title: "heading.en" } },
      }],
    }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Published At", type: "date" }),
    defineField({
      name: "externalUrl",
      title: "External / Custom Page URL",
      type: "url",
      description:
        "Optional. If set, clicking this whitepaper will redirect to this URL instead of rendering content. " +
        "Use a relative path like /articles/my-report.html for hosted HTML, or a full https:// URL.",
    }),
  ],
  preview: {
    select: { title: "title.en" },
  },
});
