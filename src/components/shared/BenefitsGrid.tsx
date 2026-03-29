import { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface BenefitsGridProps {
  headline?: string;
  benefits: Benefit[];
  accentColor?: string;
}

export default function BenefitsGrid({
  headline = "Key Benefits",
  benefits,
  accentColor = "#0d9488",
}: BenefitsGridProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {headline && (
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">
            {headline}
          </h2>
        )}
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1"
              style={{ backgroundColor: accentColor + "08" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: accentColor }}
              >
                <b.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{b.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
