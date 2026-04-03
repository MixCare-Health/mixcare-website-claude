import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField } from "./locale-helpers";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    // Hero
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        localeStringField("headline", "Headline"),
        localeStringField("headlineHighlight", "Headline Highlight"),
        localeTextField("sub", "Sub-heading"),
      ],
    }),

    // Section headings
    localeStringField("officesTitle", "Offices Section Title"),
    localeStringField("formTitle", "Form Title"),
    localeTextField("formSub", "Form Sub-heading"),
    localeStringField("hours", "Hours Label"),

    // Form fields
    defineField({
      name: "fields",
      title: "Form Field Labels",
      type: "object",
      fields: [
        localeStringField("name", "Name Label"),
        localeStringField("email", "Email Label"),
        localeStringField("company", "Company Label"),
        localeStringField("message", "Message Label"),
        localeStringField("messagePlaceholder", "Message Placeholder"),
        localeStringField("submit", "Submit Button"),
      ],
    }),

    // Success state
    defineField({
      name: "success",
      title: "Success State",
      type: "object",
      fields: [
        localeStringField("title", "Title"),
        localeTextField("sub", "Sub-heading"),
      ],
    }),

    // Offices array
    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "city", title: "City", type: "string" }),
          defineField({ name: "address", title: "Address", type: "string" }),
          defineField({ name: "phone", title: "Phone", type: "string" }),
          defineField({ name: "email", title: "Email", type: "string" }),
          localeStringField("hours", "Hours"),
        ],
        preview: { select: { title: "city", subtitle: "address" } },
      }],
    }),
  ],
});
