import { Star, Quote } from "lucide-react";

interface PageTestimonialProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  accentColor?: string;
}

export default function PageTestimonial({
  quote,
  name,
  title,
  company,
  accentColor = "#0d9488",
}: PageTestimonialProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-10 border border-slate-100 text-center"
          style={{ backgroundColor: accentColor + "06" }}
        >
          <Quote size={36} style={{ color: accentColor }} className="mx-auto mb-5 opacity-60" />
          <div className="flex justify-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="#f97316" color="#f97316" />
            ))}
          </div>
          <p className="text-xl text-slate-700 leading-relaxed mb-8 font-medium italic">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: accentColor }}
            >
              {name[0]}
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-900">{name}</p>
              <p className="text-sm text-slate-500">
                {title} · {company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
