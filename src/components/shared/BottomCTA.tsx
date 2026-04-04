import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEMO_URL } from "@/lib/demo-url";

interface BottomCTAProps {
  headline?: string;
  sub?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function BottomCTA({
  headline = "See it in action — Get a Demo",
  sub = "Speak with a MixCare specialist and discover how we can transform your health benefits.",
  ctaLabel = "Get a Demo",
  ctaHref = DEMO_URL,
  secondaryLabel,
  secondaryHref,
}: BottomCTAProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl px-10 py-14 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0d9488 0%, #1e3a5f 100%)" }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #fff, transparent)" }}
          />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
            {headline}
          </h2>
          <p className="text-teal-100 text-lg max-w-xl mx-auto mb-8 relative z-10">{sub}</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "#f97316", color: "#fff" }}
            >
              {ctaLabel} <ArrowRight size={20} />
            </a>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/30 text-white hover:bg-white/10 transition-all"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
