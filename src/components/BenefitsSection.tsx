"use client";

import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import {
  HeartPulse,
  Brain,
  Smile,
  Pill,
  Eye,
  Baby,
  Dumbbell,
  Plane,
} from "lucide-react";

const benefits = [
  {
    icon: HeartPulse,
    title: "Medical Insurance",
    description:
      "Comprehensive inpatient and outpatient coverage with access to 3,000+ network hospitals and clinics.",
    color: "primary",
    tag: "Most Popular",
  },
  {
    icon: Brain,
    title: "Mental Health",
    description:
      "24/7 mental health support, counseling sessions, and mindfulness programs for employee wellbeing.",
    color: "secondary",
    tag: "Trending",
  },
  {
    icon: Smile,
    title: "Dental Care",
    description:
      "Full dental coverage including preventive, restorative, and orthodontic treatments.",
    color: "success",
    tag: null,
  },
  {
    icon: Eye,
    title: "Vision Care",
    description:
      "Annual eye exams, glasses, contact lenses, and laser eye surgery benefits.",
    color: "warning",
    tag: null,
  },
  {
    icon: Pill,
    title: "Pharmacy",
    description:
      "Discounted prescription medications at 500+ partnered pharmacies across Hong Kong.",
    color: "danger",
    tag: null,
  },
  {
    icon: Baby,
    title: "Family Planning",
    description:
      "Maternity, fertility treatments, and newborn care benefits supporting growing families.",
    color: "primary",
    tag: null,
  },
  {
    icon: Dumbbell,
    title: "Wellness & Fitness",
    description:
      "Gym memberships, fitness classes, nutrition consultations, and health challenges.",
    color: "secondary",
    tag: null,
  },
  {
    icon: Plane,
    title: "Travel Insurance",
    description:
      "Business and leisure travel coverage with emergency medical assistance worldwide.",
    color: "success",
    tag: null,
  },
];

const colorMap: Record<string, string> = {
  primary: "bg-primary-50 text-primary border-primary-100",
  secondary: "bg-secondary-50 text-secondary border-secondary-100",
  success: "bg-success-50 text-success border-success-100",
  warning: "bg-warning-50 text-warning border-warning-100",
  danger: "bg-danger-50 text-danger border-danger-100",
};

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Chip color="primary" variant="flat" size="sm" className="mb-4 font-semibold">
            Complete Benefits Suite
          </Chip>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything Your Employees Need,{" "}
            <span className="gradient-text">All in One Place</span>
          </h2>
          <p className="text-default-500 text-lg">
            From medical to mental health, dental to travel — build the perfect
            benefits package tailored to your team.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.title}
                className="card-hover border border-default-100 shadow-sm"
                radius="lg"
              >
                <CardHeader className="pb-0 pt-6 px-6">
                  <div className="flex items-start justify-between w-full">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorMap[benefit.color]}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {benefit.tag && (
                      <Chip size="sm" color="primary" variant="flat" className="text-xs font-semibold">
                        {benefit.tag}
                      </Chip>
                    )}
                  </div>
                </CardHeader>
                <CardBody className="px-6 pt-4 pb-6">
                  <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-default-500 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
