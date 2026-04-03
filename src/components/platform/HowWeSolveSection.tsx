const P = "#0891b2";

interface SolveItem {
  step: string;
  title: string;
  desc: string;
  highlight: string;
}

interface Props {
  badge: string;
  headline: string;
  sub: string;
  items: SolveItem[];
}

export default function HowWeSolveSection({ badge, headline, sub, items }: Props) {
  return (
    <section
      className="py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0c1322 0%, #0a2a3d 50%, #0c1322 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
            {badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{headline}</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{sub}</p>
        </div>

        {/* Steps — horizontal on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <div
              key={item.step}
              className="relative rounded-2xl p-7 border border-white/10 hover:border-white/25 transition-all duration-300"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              {/* Large faded step number in background */}
              <span
                className="absolute top-4 right-5 text-7xl font-black select-none pointer-events-none"
                style={{ color: P + "18", lineHeight: 1 }}
              >
                {item.step}
              </span>

              {/* Step badge */}
              <div
                className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-5"
                style={{ backgroundColor: P + "20", color: P }}
              >
                Step {item.step}
              </div>

              {/* Divider line */}
              <div className="w-8 h-0.5 mb-4 rounded-full" style={{ backgroundColor: P }} />

              <h3 className="text-white font-extrabold text-lg leading-snug mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.desc}</p>

              {/* Highlight pill */}
              <div
                className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: P + "18", color: P }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: P }}
                />
                {item.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
