"use client";

import { Button, Link } from "@heroui/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-content1">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 rounded-3xl p-14 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white rounded-full px-4 py-1.5 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              30-Day Free Trial — No Credit Card Required
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Start Building a Benefits{" "}
              <br className="hidden md:block" />
              Program Your Team Deserves
            </h2>

            <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
              Join 2,000+ companies who trust MixCare to deliver world-class
              employee benefits — simple to manage, loved by employees.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button
                as={Link}
                href="#contact"
                size="lg"
                radius="full"
                className="bg-white text-primary font-bold px-10 hover:bg-white/90 transition-colors"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Get Started Free
              </Button>
              <Button
                as={Link}
                href="#contact"
                variant="bordered"
                size="lg"
                radius="full"
                className="border-white/50 text-white font-bold px-10 hover:bg-white/10 transition-colors"
              >
                Talk to Sales
              </Button>
            </div>

            <p className="text-white/60 text-sm">
              Setup in 48 hours · No long-term contracts · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
