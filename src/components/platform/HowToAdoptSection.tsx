const P = "#0d9488";

interface AdoptItem {
  step: string;
  title: string;
  desc: string;
  duration: string;
}

interface Props {
  badge: string;
  headline: string;
  sub: string;
  items: AdoptItem[];
}

export default function HowToAdoptSection({ badge, headline, sub, items }: Props) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
            {badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">{headline}</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">{sub}</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line — desktop */}
          <div
            className="hidden sm:block absolute left-[2.375rem] top-10 bottom-10 w-px"
            style={{ backgroundColor: P + "25" }}
          />

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.step} className="flex gap-5 sm:gap-7 items-start">
                {/* Step circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="w-[4.75rem] h-[4.75rem] rounded-full flex flex-col items-center justify-center shadow-lg border-2"
                    style={{ backgroundColor: P, borderColor: P + "60" }}
                  >
                    <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest leading-none">
                      Step
                    </span>
                    <span className="text-white text-xl font-black leading-none mt-0.5">
                      {item.step}
                    </span>
                  </div>
                </div>

                {/* Content card */}
                <div
                  className="flex-1 rounded-2xl p-6 border hover:shadow-md transition-all duration-200 mt-1"
                  style={{ borderColor: P + "20", backgroundColor: P + "05" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <h3 className="text-slate-900 font-extrabold text-base leading-snug">
                      {item.title}
                    </h3>
                    {/* Duration badge */}
                    <span
                      className="flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full self-start"
                      style={{ backgroundColor: P + "15", color: P }}
                    >
                      ⏱ {item.duration}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
