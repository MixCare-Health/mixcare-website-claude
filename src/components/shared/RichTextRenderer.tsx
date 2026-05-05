import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

// ── Types ─────────────────────────────────────────────────────────────────────
// Portable Text can be an array of blocks (new rich text) or a plain string
// (legacy data before the migration). Both are handled gracefully.
export type RichBody = Array<Record<string, unknown>> | string | null | undefined;

// ── Table block renderer ──────────────────────────────────────────────────────
function TableBlock({
  value,
}: {
  value: { caption?: string; headerRow?: string[]; rows?: Array<{ _key: string; cells?: string[] }> };
}) {
  const { caption, headerRow = [], rows = [] } = value;
  const hasHeader = headerRow.length > 0;

  return (
    <figure className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse border border-slate-200 rounded-lg overflow-hidden">
        {hasHeader && (
          <thead>
            <tr className="bg-slate-100">
              {headerRow.map((cell, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide text-slate-600 border border-slate-200"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row._key || ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              {(row.cells || []).map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-slate-700 border border-slate-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <figcaption className="text-center text-xs text-slate-400 mt-2 italic">{caption}</figcaption>
      )}
    </figure>
  );
}

// ── Portable Text component map ───────────────────────────────────────────────
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(value).width(800).fit("max").url()}
            alt={value.alt || ""}
            className="rounded-xl w-full object-cover"
          />
          {value.caption && (
            <figcaption className="text-center text-xs text-slate-400 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tableBlock: ({ value }: { value: any }) => <TableBlock value={value} />,

    // Raw HTML embed — renders whatever HTML the editor pasted
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    htmlEmbed: ({ value }: { value: any }) => {
      if (!value?.html) return null;
      return (
        <figure className="my-6">
          <div
            className="overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-slate-200 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-slate-100 [&_th]:font-bold [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-slate-600 [&_tr:nth-child(even)]:bg-slate-50 [&_a]:text-teal-700 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: value.html }}
          />
          {value.caption && (
            <figcaption className="text-center text-xs text-slate-400 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-teal-700 underline underline-offset-2 hover:text-teal-900 transition-colors"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 text-slate-800 text-[0.85em] px-1.5 py-0.5 rounded font-mono">
        {children}
      </code>
    ),
    "strike-through": ({ children }) => <del>{children}</del>,
  },

  block: {
    h2: ({ children }) => (
      <h2 className="text-xl font-extrabold text-slate-900 mt-8 mb-3 leading-snug">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2 leading-snug">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-bold text-slate-800 mt-4 mb-1">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-teal-500 pl-4 italic text-slate-600 my-4 leading-relaxed">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-slate-600 leading-relaxed mb-3">{children}</p>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-1 mb-3 text-slate-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-1 mb-3 text-slate-600">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

// ── Public component ──────────────────────────────────────────────────────────
// Handles both new Portable Text (array) and legacy plain-text (string) body values.
export default function RichTextRenderer({
  value,
  accentColor,
}: {
  value: RichBody;
  accentColor?: string;
}) {
  if (!value) return null;

  // Legacy: body was stored as a plain string before rich-text migration
  if (typeof value === "string") {
    return <p className="text-slate-600 leading-relaxed">{value}</p>;
  }

  if (!Array.isArray(value) || value.length === 0) return null;

  // Unused but kept as a prop for future accent-color-aware styling
  void accentColor;

  return (
    <div className="rich-text">
      <PortableText
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value={value as any}
        components={components}
      />
    </div>
  );
}
