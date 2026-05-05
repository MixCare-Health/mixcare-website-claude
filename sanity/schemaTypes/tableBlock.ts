import { defineType, defineField } from "sanity";

// ── Custom table block — used inside Portable Text rich text fields ────────────
// Editors add column headers + data rows. Rendered as a styled HTML table.

export const tableBlockType = defineType({
  name: "tableBlock",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
    }),
    defineField({
      name: "headerRow",
      title: "Header Row (column names)",
      description: "Add one entry per column. Leave empty to skip the header.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "rows",
      title: "Data Rows",
      type: "array",
      of: [
        {
          type: "object",
          name: "tableRow",
          title: "Row",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              description: "One cell per column — must match the number of headers.",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare({ cells }: { cells?: string[] }) {
              return { title: Array.isArray(cells) ? cells.join("  |  ") : "Row" };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { caption: "caption", headerRow: "headerRow" },
    prepare({ caption, headerRow }: { caption?: string; headerRow?: string[] }) {
      const cols = Array.isArray(headerRow) ? headerRow.join(", ") : "";
      return { title: caption || "Table", subtitle: cols || "No headers" };
    },
  },
});
