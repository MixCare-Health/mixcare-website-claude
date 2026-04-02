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

        {/* Main card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "16/7" }}>
          {/* Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={active}
            src={PHOTOS[active]}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `scale(1.04) translateX(${direction === "right" ? "2%" : "-2%"})`
                : "scale(1) translateX(0)",
              transition: "opacity 0.32s ease, transform 0.32s ease",
            }}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

          {/* Tag pill — top left */}
          <div className="absolute top-6 left-6">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
              style={{ backgroundColor: color }}
            >
              {item.tag}
            </span>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/20 hover:scale-110"
            aria-label="Previous event"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all duration-200 border border-white/20 hover:scale-110"
            aria-label="Next event"
          >
            <ChevronRight size={20} className="text-white" />
          </button>

          {/* Bottom content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight transition-all duration-300"
                  style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-white/75 text-sm sm:text-base max-w-xl leading-relaxed transition-all duration-300"
                  style={{
                    opacity: animating ? 0 : 1,
                    transform: animating ? "translateY(6px)" : "translateY(0)",
                    transitionDelay: "40ms",
                  }}
                >
                  {item.desc}
                </p>
              </div>
              {/* Stat badge */}
              <div
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold backdrop-blur-sm transition-all duration-300"
                style={{
                  backgroundColor: color + "30",
                  borderColor: color + "60",
                  border: `1px solid ${color}60`,
                  color: "#fff",
                  opacity: animating ? 0 : 1,
                }}
              >
                <CheckCircle2 size={14} className="flex-shrink-0" />
                {item.stat}
              </div>
            </div>
          </div>

          {/* Slide counter */}
          <div className="absolute top-6 right-6 text-white/50 text-xs font-bold tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-5 flex gap-3 justify-center">
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
              {/* Active overlay color bar */}
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
        <div className="mt-4 flex justify-center gap-2">
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
