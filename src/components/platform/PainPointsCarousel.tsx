"use client";

import { useRef, useState } from "react";
import { TrendingUp, Sliders, BarChart2, Globe, ChevronLeft, ChevronRight } from "lucide-react";

interface PainPoint {
  title: string;
  desc: string;
}

interface Props {
  headline: string;
  sub: string;
  items: ReadonlyArray<PainPoint>;
}

const configs = [
  { icon: TrendingUp, color: "#0d9488", bg: "#f0fdfa" },
  { icon: Sliders,    color: "#f97316", bg: "#fff7ed" },
  { icon: BarChart2,  color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Globe,      color: "#0891b2", bg: "#ecfeff" },
];

export default function PainPointsCarousel({ headline, sub, items }: Props) {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    setCurrent(clamped);
    if (!scrollRef.current) return;
    const child = scrollRef.current.children[clamped] as HTMLElement;
    child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section className="py-16" style={{ backgroundColor: "#f8fafc" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{headline}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{sub}</p>
        </div>

        <div className="relative">
          {/* Cards */}
          <div
            ref={scrollRef}
            className={`flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {items.map(({ title, desc }, i) => {
              const { icon: Icon, color, bg } = configs[i];
              return (
                <div
                  key={i}
                  className="snap-center flex-shrink-0 w-[78vw] sm:w-[42vw] lg:w-auto rounded-3xl p-7 flex flex-col border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1"
                  style={{ backgroundColor: bg }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: color + "20" }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div className="w-6 h-1 rounded-full mb-4" style={{ backgroundColor: color }} />
                  <h3 className="text-sm font-extrabold text-slate-900 mb-3 leading-snug">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  <div className="mt-5 flex items-center gap-1.5">
                    {items.map((_, d) => (
                      <div
                        key={d}
                        className="h-1 rounded-full transition-all"
                        style={{ backgroundColor: d === i ? color : color + "30", width: d === i ? "20px" : "6px" }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile prev/next arrows — hidden on lg+ */}
          <div className="lg:hidden flex justify-between items-center mt-5 px-1">
            <button
              onClick={() => scrollToIndex(current - 1)}
              disabled={current === 0}
              className="w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all disabled:opacity-30 bg-white"
              style={{ border: "1.5px solid #e2e8f0" }}
              aria-label="Previous"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>

            <div className="flex gap-2 items-center">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: i === current ? "#0d9488" : "#cbd5e1",
                    width: i === current ? "24px" : "8px",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToIndex(current + 1)}
              disabled={current === items.length - 1}
              className="w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all disabled:opacity-30 bg-white"
              style={{ border: "1.5px solid #e2e8f0" }}
              aria-label="Next"
            >
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
