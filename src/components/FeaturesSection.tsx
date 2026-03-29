"use client";

import { Chip } from "@heroui/react";
import {
  LayoutDashboard,
  Zap,
  Shield,
  BarChart3,
  Smartphone,
  Users,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Unified Admin Dashboard",
    description:
      "Manage all benefits, enrollments, and claims from a single intuitive dashboard. No more juggling multiple platforms.",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Instant Claims Processing",
    description:
      "AI-powered claims processing with same-day approvals for most common claims. No paperwork, no hassle.",
    color: "warning",
  },
  {
    icon: Shield,
    title: "HIPAA & PDPO Compliant",
    description:
      "Bank-grade security with full compliance for Hong Kong and international health data regulations.",
    color: "success",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Deep insights into benefits utilization, employee wellness trends, and cost optimization opportunities.",
    color: "secondary",
  },
  {
    icon: Smartphone,
    title: "Employee Mobile App",
    description:
      "Employees can view, use, and manage their benefits from iOS and Android — anytime, anywhere.",
    color: "primary",
  },
  {
    icon: Users,
    title: "HR System Integrations",
    description:
      "Seamlessly connect with Workday, BambooHR, SAP, and 50+ HR platforms for automatic syncing.",
    color: "danger",
  },
];

const iconBgMap: Record<string, string> = {
  primary: "bg-primary-100 text-primary",
  secondary: "bg-secondary-100 text-secondary",
  success: "bg-success-100 text-success",
  warning: "bg-warning-100 text-warning",
  danger: "bg-danger-100 text-danger",
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-content1">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Chip color="secondary" variant="flat" size="sm" className="mb-4 font-semibold">
            Platform Features
          </Chip>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Built for Modern{" "}
            <span className="gradient-text">HR Teams</span>
          </h2>
          <p className="text-default-500 text-lg">
            Powerful features that save HR teams hundreds of hours while giving
            employees a world-class benefits experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group flex gap-5 p-6 bg-background rounded-2xl border border-default-100 hover:border-primary-200 hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBgMap[feature.color]} group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-default-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Up and Running in{" "}
              <span className="gradient-text">3 Simple Steps</span>
            </h2>
            <p className="text-default-500">
              No complex setup. Your team can start using MixCare in days, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your HR System",
                description:
                  "Sync your employee data from Workday, BambooHR, or upload a CSV. We handle the rest.",
              },
              {
                step: "02",
                title: "Design Your Benefits Package",
                description:
                  "Choose from our catalog of benefits and customize coverage levels to fit your budget and culture.",
              },
              {
                step: "03",
                title: "Launch to Your Team",
                description:
                  "Employees receive invitations, onboard in minutes, and start using their benefits immediately.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative text-center p-8 bg-background rounded-2xl border border-default-100"
              >
                <div className="text-5xl font-black text-primary-100 mb-4 leading-none">
                  {item.step}
                </div>
                <h3 className="font-bold text-foreground text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-default-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
