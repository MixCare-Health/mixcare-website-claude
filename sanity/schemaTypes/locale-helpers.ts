import { defineField } from "sanity";

export const localeStringField = (name: string, title: string) =>
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

export const localeTextField = (name: string, title: string) =>
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

export const localeBulletsField = defineField({
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const localeArrayField = (name: string, title: string, of: any[]) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "en",   title: "English",  type: "array", of }),
      defineField({ name: "zhTW", title: "繁體中文",  type: "array", of }),
      defineField({ name: "zhCN", title: "简体中文",  type: "array", of }),
    ],
    options: { columns: 1 },
  });

export const localeStringsField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    description: "Array of strings per language",
    fields: [
      defineField({ name: "en",   title: "English",  type: "array", of: [{ type: "string" }] }),
      defineField({ name: "zhTW", title: "繁體中文",  type: "array", of: [{ type: "string" }] }),
      defineField({ name: "zhCN", title: "简体中文",  type: "array", of: [{ type: "string" }] }),
    ],
    options: { columns: 1 },
  });

// ── Portable Text (rich text) ──────────────────────────────────────────────────
// Used by localeRichTextField for article / case-study / whitepaper / press body.
// Includes: headings, blockquote, bold/italic/underline/strike/code, hyperlinks,
// inline images (with alt + caption), and the custom tableBlock type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RICH_TEXT_OF: any[] = [
  {
    type: "block",
    styles: [
      { title: "Normal",    value: "normal" },
      { title: "Heading 2", value: "h2" },
      { title: "Heading 3", value: "h3" },
      { title: "Heading 4", value: "h4" },
      { title: "Quote",     value: "blockquote" },
    ],
    lists: [
      { title: "Bullet",   value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
    marks: {
      decorators: [
        { title: "Bold",          value: "strong" },
        { title: "Italic",        value: "em" },
        { title: "Underline",     value: "underline" },
        { title: "Strikethrough", value: "strike-through" },
        { title: "Code",          value: "code" },
      ],
      annotations: [
        {
          title: "Link",
          name: "link",
          type: "object",
          fields: [
            {
              name: "href",
              title: "URL",
              type: "url",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              validation: (R: any) =>
                R.uri({ scheme: ["http", "https", "mailto"], allowRelative: true }),
            },
            {
              name: "blank",
              title: "Open in new tab",
              type: "boolean",
              initialValue: true,
            },
          ],
        },
      ],
    },
  },
  {
    type: "image",
    options: { hotspot: true },
    fields: [
      { name: "alt",     title: "Alt text (accessibility)",    type: "string" },
      { name: "caption", title: "Caption (shown below image)", type: "string" },
    ],
  },
  // Custom structured table block — no external plugin required
  { type: "tableBlock" },
  // Raw HTML embed — paste any HTML (tables, iframes, embeds, etc.)
  { type: "htmlEmbed" },
];

// Rich-text (Portable Text) field with EN / 繁體中文 / 简体中文 tabs.
// Replaces localeTextField for section body fields to give WYSIWYG editing.
export const localeRichTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    description: "Rich text: bold, italic, headings, lists, links, images, tables — per language.",
    fields: [
      defineField({ name: "en",   title: "English",  type: "array", of: RICH_TEXT_OF }),
      defineField({ name: "zhTW", title: "繁體中文",  type: "array", of: RICH_TEXT_OF }),
      defineField({ name: "zhCN", title: "简体中文",  type: "array", of: RICH_TEXT_OF }),
    ],
    options: { columns: 1 },
  });
