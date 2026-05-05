import { defineType, defineField } from "sanity";

// ── HTML Embed block — used inside Portable Text rich text fields ──────────────
// Allows editors to paste raw HTML (tables, iframes, custom markup, etc.).
// Rendered on the frontend with dangerouslySetInnerHTML inside a sandboxed div.

export const htmlEmbedType = defineType({
  name: "htmlEmbed",
  title: "HTML Code",
  type: "object",
  fields: [
    defineField({
      name: "html",
      title: "HTML Code",
      type: "text",
      rows: 12,
      description:
        "Paste raw HTML here — tables, iframes, custom markup, embeds, etc. " +
        "Rendered as-is on the public site.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
      description: "Shown below the HTML block in italics.",
    }),
  ],
  preview: {
    select: { html: "html", caption: "caption" },
    prepare({ html, caption }: { html?: string; caption?: string }) {
      return {
        title: caption || "HTML Block",
        subtitle: html ? html.trim().slice(0, 100) : "Empty",
      };
    },
  },
});
