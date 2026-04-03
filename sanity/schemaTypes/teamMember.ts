import { defineField, defineType } from "sanity";
import { localeStringField, localeTextField } from "./locale-helpers";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    localeStringField("role", "Role / Title"),
    localeTextField("bio", "Bio"),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role.en", media: "photo" },
  },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
