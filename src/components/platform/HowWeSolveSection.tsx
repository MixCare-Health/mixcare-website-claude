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
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: P }}
          >
            {badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {headline}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">{sub}</p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block absolute top-10 left-0 right-0 h-px"
            style={{ backgroundColor: P + "25", marginLeft: "16.66%", marginRight: "16.66%" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
            {items.map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                {/* Step number circle */}
                <div
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
                  style={{ backgroundColor: P }}
                >
                  <span className="text-white text-xl font-extrabold tabular-nums">
                    {item.step}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="w-full rounded-2xl p-6 border flex flex-col items-center text-center"
                  style={{ borderColor: P + "20", backgroundColor: P + "06" }}
                >
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{item.desc}</p>
                  {/* Highlight pill */}
                  <span
                    className="inline-block text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: P + "15", color: P }}
                  >
                    {item.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
