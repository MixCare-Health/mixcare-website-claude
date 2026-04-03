import { defineField, defineType } from "sanity";

// ── Reusable localized field helpers ────────────────────────────────────────

const localeStringField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "en",   title: "English",  type: "string" }),
      defineField({ name: "zhTW", title: "繁體中文",  type: "string" }),
      defineField({ name: "zhCN", title: "简体中文",  type: "string" }),
    ],
    options: { columns: 1 },
  });

const localeTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "en",   title: "English",  type: "text", rows: 4 }),
      defineField({ name: "zhTW", title: "繁體中文",  type: "text", rows: 4 }),
      defineField({ name: "zhCN", title: "简体中文",  type: "text", rows: 4 }),
    ],
    options: { columns: 1 },
  });

const localeBulletsField = defineField({
  name: "bullets",
  title: "Bullet Points",
  type: "object",
  description: "Optional bullet list to append after the body text.",
  fields: [
    defineField({ name: "en",   title: "English",  type: "array", of: [{ type: "string" }] }),
    defineField({ name: "zhTW", title: "繁體中文",  type: "array", of: [{ type: "string" }] }),
    defineField({ name: "zhCN", title: "简体中文",  type: "array", of: [{ type: "string" }] }),
  ],
  options: { columns: 1 },
});

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
