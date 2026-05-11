import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField, localeRichTextField, localeBulletsField } from "./locale-helpers";

// ── Event document type ───────────────────────────────────────────────────────

export const eventItemType = defineType({
  name: "eventItem",
  title: "Events",
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
      name: "eventDate",
      title: "Event Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventEndDate",
      title: "Event End Date (optional)",
      type: "date",
      description: "Leave blank for single-day events.",
    }),
    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Conference",       value: "Conference" },
          { title: "Webinar",          value: "Webinar" },
          { title: "Workshop",         value: "Workshop" },
          { title: "Networking",       value: "Networking" },
          { title: "Award Ceremony",   value: "Award Ceremony" },
          { title: "Health Screening", value: "Health Screening" },
          { title: "Exhibition",       value: "Exhibition" },
          { title: "Seminar",          value: "Seminar" },
        ],
      },
      initialValue: "Conference",
    }),
    defineField({
      name: "isVirtual",
      title: "Virtual / Online Event",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Pin this event to the top of the listing.",
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration / Event URL",
      type: "url",
      description: "External link to register or learn more. If set, clicking the card opens this URL.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),

    // ── Localised fields ──
    localeStringField("title",      "Event Title"),
    localeTextField("description",  "Short Description / Excerpt"),
    localeStringField("organizer",  "Organiser"),
    localeStringField("location",   "Location (e.g. HKCEC, Online, etc.)"),

    defineField({
      name: "sections",
      title: "Content Sections (for events hosted on MixCare)",
      type: "array",
      description: "Only needed if full event detail is hosted on MixCare (no external registration URL).",
      of: [
        {
          type: "object",
          name: "section",
          title: "Section",
          fields: [
            localeStringField("heading", "Heading"),
            localeRichTextField("body",  "Body (Rich Text — bold, italic, headings, lists, images, tables, HTML…)"),
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
    select: { title: "title.en", date: "eventDate", type: "eventType", media: "coverImage" },
    prepare({ title, date, type }: { title?: string; date?: string; type?: string }) {
      return {
        title: title || "Untitled Event",
        subtitle: [type, date].filter(Boolean).join("  ·  "),
      };
    },
  },

  orderings: [
    {
      title: "Event Date (Newest First)",
      name: "eventDateDesc",
      by: [{ field: "eventDate", direction: "desc" }],
    },
    {
      title: "Event Date (Upcoming First)",
      name: "eventDateAsc",
      by: [{ field: "eventDate", direction: "asc" }],
    },
  ],
});
