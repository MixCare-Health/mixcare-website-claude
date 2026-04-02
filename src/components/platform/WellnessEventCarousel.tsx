"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface EventItem {
  title: string;
  desc: string;
  tag: string;
  stat: string;
  emoji: string;
}

interface Props {
  badge: string;
  headline: string;
  sub: string;
  items: EventItem[];
}

const PHOTOS = [
  "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
];

const THUMB_PHOTOS = [
  "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=60",
];

const COLORS = ["#7c3aed", "#16a34a", "#f97316", "#0d9488", "#0891b2"];

const P = "#0891b2";

export default function WellnessEventCarousel({ badge, headline, sub, items }: Props) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const go = useCallback(
    (next: number, dir: "left" | "right" = "right") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive(next);
        setAnimating(false);
      }, 320);
    },
    [animating]
  );

  const prev = () => go((active - 1 + items.length) % items.length, "left");
  const next = () => go((active + 1) % items.length, "right");

  useEffect(() => {
    const id = setInterval(() => go((active + 1) % items.length, "right"), 5000);
    return () => clearInterval(id);
  }, [active, go, items.length]);

  const item = items[active];
  const color = COLORS[active];

  return (
    <section className="py-24 bg-[#0c1322] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: P }}>
            {badge}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{headline}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">{sub}</p>
        </div>

        {/* Main card — portrait on mobile, widescreen on desktop */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] sm:aspect-[16/9] lg:aspect-[16/7]">
          {/* Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={active}
            src={PHOTOS[active]}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `scale(1.04) translateX(${direction === "right" ? "2%" : "-2%"})`
                : "scale(1) translateX(0)",
              transition: "opacity 0.32s ease, transform 0.32s ease",
            }}
          />

          {/* Gradient overlays — stronger bottom gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

          {/* Tag pill — top left */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <span
              className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-white"
              style={{ backgroundColor: color }}
            >
              {item.tag}
            </span>
          </div>

          {/* Slide counter — top right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 text-xs font-bold tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/20"
            aria-label="Previous event"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/20"
            aria-label="Next event"
          >
            <ChevronRight size={18} className="text-white" />
          </button>

          {/* Bottom content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-8">
            <h3
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-1.5 sm:mb-2 leading-tight"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(6px)" : "translateY(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              {item.title}
            </h3>
            <p
              className="text-white/80 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 max-w-xl line-clamp-2 sm:line-clamp-none"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(6px)" : "translateY(0)",
                transition: "opacity 0.3s ease 40ms, transform 0.3s ease 40ms",
              }}
            >
              {item.desc}
            </p>
            {/* Stat badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold backdrop-blur-sm"
              style={{
                backgroundColor: color + "35",
                border: `1px solid ${color}70`,
                color: "#fff",
                opacity: animating ? 0 : 1,
                transition: "opacity 0.3s ease 80ms",
              }}
            >
              <CheckCircle2 size={13} className="flex-shrink-0" />
              {item.stat}
            </div>
          </div>
        </div>

        {/* Thumbnail strip — hidden on mobile, visible sm+ */}
        <div className="hidden sm:flex mt-5 gap-3 justify-center">
          {items.map((evt, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? "right" : "left")}
              className="relative group flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200"
              style={{
                width: i === active ? 88 : 64,
                height: 52,
                outline: i === active ? `2px solid ${COLORS[i]}` : "2px solid transparent",
                outlineOffset: 2,
                opacity: i === active ? 1 : 0.5,
              }}
              aria-label={`Go to ${evt.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={THUMB_PHOTOS[i]}
                alt={evt.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              {i === active && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: COLORS[i] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-4 sm:mt-3 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? "right" : "left")}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                backgroundColor: i === active ? COLORS[active] : "#ffffff20",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
