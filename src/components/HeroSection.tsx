"use client";

import { Button, Link, Chip, Avatar, AvatarGroup } from "@heroui/react";
import { ArrowRight, Play, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-gradient min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Chip
              color="primary"
              variant="flat"
              size="sm"
              className="font-semibold"
              startContent={<Star className="w-3 h-3" />}
            >
              #1 Employee Benefits Platform in Asia
            </Chip>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Benefits Your{" "}
                <span className="gradient-text">Team Will</span>{" "}
                Actually Love
              </h1>
              <p className="text-xl text-default-500 leading-relaxed max-w-lg">
                MixCare Health brings health insurance, wellness, mental health,
                dental, and more into one seamless platform — reducing admin
                overhead by 70%.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                as={Link}
                href="#contact"
                color="primary"
                size="lg"
                radius="full"
                className="font-semibold px-8"
                endContent={<ArrowRight className="w-4 h-4" />}
              >
                Start Free Trial
              </Button>
              <Button
                variant="bordered"
                size="lg"
                radius="full"
                className="font-semibold px-8 border-default-300"
                startContent={<Play className="w-4 h-4 fill-current" />}
              >
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <AvatarGroup max={4} size="sm">
                  {[
                    "https://i.pravatar.cc/150?img=1",
                    "https://i.pravatar.cc/150?img=2",
                    "https://i.pravatar.cc/150?img=3",
                    "https://i.pravatar.cc/150?img=4",
                    "https://i.pravatar.cc/150?img=5",
                  ].map((src, i) => (
                    <Avatar key={i} src={src} size="sm" />
                  ))}
                </AvatarGroup>
                <div>
                  <div className="flex items-center gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-warning text-warning"
                        />
                      ))}
                  </div>
                  <p className="text-xs text-default-500 mt-0.5">
                    Trusted by <strong className="text-foreground">2,000+</strong> companies
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-default-200">
              {[
                { value: "500K+", label: "Employees Covered" },
                { value: "70%", label: "Admin Time Saved" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-default-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard Preview */}
          <div className="relative hidden lg:block">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-default-100 p-6">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-default-400">Good morning,</p>
                  <p className="font-bold text-foreground">Sarah Chen 👋</p>
                </div>
                <Chip color="success" variant="flat" size="sm">All Benefits Active</Chip>
              </div>

              {/* Benefit Cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: "🏥", label: "Medical", status: "Active", color: "primary" },
                  { icon: "🦷", label: "Dental", status: "Active", color: "secondary" },
                  { icon: "🧠", label: "Mental Health", status: "Active", color: "success" },
                  { icon: "💊", label: "Pharmacy", status: "Active", color: "warning" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`bg-${item.color}-50 rounded-xl p-3 border border-${item.color}-100`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-semibold text-sm mt-2 text-foreground">{item.label}</p>
                    <p className="text-xs text-success-600 font-medium">{item.status}</p>
                  </div>
                ))}
              </div>

              {/* Wellness Score */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-default-500">Wellness Score</p>
                    <p className="text-2xl font-bold text-primary">87/100</p>
                    <p className="text-xs text-success-600 font-medium">↑ 5 pts this month</p>
                  </div>
                  <div className="w-16 h-16 relative flex items-center justify-center">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#e6f1ff" strokeWidth="6" />
                      <circle
                        cx="32" cy="32" r="28" fill="none"
                        stroke="#0070F0" strokeWidth="6"
                        strokeDasharray={`${87 * 1.759} 175.9`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-primary">87%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 border border-default-100 z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center">
                  <span className="text-base">✓</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Claim Approved</p>
                  <p className="text-xs text-default-400">HK$2,800 reimbursed</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg p-4 border border-default-100 z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-base">📅</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Next: GP Appointment</p>
                  <p className="text-xs text-default-400">Tomorrow, 2:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by logos */}
        <div className="mt-20 text-center">
          <p className="text-sm text-default-400 mb-8 font-medium">
            TRUSTED BY LEADING COMPANIES ACROSS ASIA
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale">
            {["HSBC", "Cathay", "AIA", "Standard Chartered", "DBS", "KPMG"].map((company) => (
              <div key={company} className="text-lg font-bold text-default-500">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
