import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeBulletsField } from "./locale-helpers";

// ── Article document type ────────────────────────────────────────────────────

export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    // ── Non-localised meta ──
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "AI & Claims",       value: "AI & Claims" },
          { title: "Employee Benefits", value: "Employee Benefits" },
          { title: "SMB Guide",         value: "SMB Guide" },
          { title: "Wellness",          value: "Wellness" },
          { title: "Compliance",        value: "Compliance" },
          { title: "Insurers",          value: "Insurers" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "date",
      options: { dateFormat: "MMM YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      description: 'e.g. "8 min read"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Optional hero image shown at the top of the article and in listings.",
      options: { hotspot: true },
    }),

    // ── Localised fields ──
    localeStringField("title",       "Title"),
    localeTextField("description",   "Description (SEO + intro callout)"),

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "section",
          title: "Section",
          fields: [
            localeStringField("heading", "Heading"),
            localeTextField("body",      "Body"),
            localeBulletsField,
          ],
          preview: {
            select: { title: "heading.en" },
          },
        },
      ],
    }),
  ],

  preview: {
    select: { title: "title.en", subtitle: "category" },
  },

  orderings: [
    {
      title: "Published Date (Newest First)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
