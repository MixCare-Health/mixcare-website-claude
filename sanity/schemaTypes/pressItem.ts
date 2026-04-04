import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeBulletsField } from "./locale-helpers";

// ── Press / Media Coverage document type ─────────────────────────────────────

export const pressItemType = defineType({
  name: "pressItem",
  title: "Media Coverage",
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
      name: "outlet",
      title: "Publication / Outlet",
      type: "string",
      description: 'e.g. "South China Morning Post", "RTHK", "Tech in Asia"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "outletLogo",
      title: "Outlet Logo (optional)",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "date",
      options: { dateFormat: "MMM YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Press Coverage",  value: "Press Coverage" },
          { title: "Press Release",   value: "Press Release" },
          { title: "Interview",       value: "Interview" },
          { title: "Award",           value: "Award" },
          { title: "Industry Report", value: "Industry Report" },
        ],
      },
      initialValue: "Press Coverage",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Pin this item to the top of the listing.",
    }),
    defineField({
      name: "externalUrl",
      title: "Original Article URL",
      type: "url",
      description: "Link to the source article (leave blank for press releases hosted on MixCare).",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),

    // ── Localised fields ──
    localeStringField("title",       "Headline"),
    localeTextField("description",   "Description / Excerpt"),

    defineField({
      name: "sections",
      title: "Sections (for hosted press releases)",
      type: "array",
      description: "Only needed when full content is hosted on MixCare (no external URL).",
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
    select: { title: "title.en", subtitle: "outlet", media: "coverImage" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `📰 ${subtitle}` : "Media Coverage" };
    },
  },

  orderings: [
    {
      title: "Published Date (Newest First)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
