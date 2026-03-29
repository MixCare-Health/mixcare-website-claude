"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Divider,
  Link,
} from "@heroui/react";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "HK$180",
    period: "/ employee / month",
    description: "Perfect for small businesses taking their first step into employee benefits.",
    color: "default" as const,
    highlighted: false,
    features: [
      "Medical insurance (outpatient)",
      "Basic dental coverage",
      "Employee mobile app",
      "Claims portal",
      "Email support",
      "Up to 50 employees",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Growth",
    price: "HK$380",
    period: "/ employee / month",
    description: "The complete package for growing companies who want to win on talent.",
    color: "primary" as const,
    highlighted: true,
    features: [
      "Everything in Starter",
      "Mental health support (8 sessions/year)",
      "Vision care coverage",
      "Pharmacy benefits",
      "HR dashboard & analytics",
      "Workday / BambooHR integration",
      "Priority phone support",
      "Up to 500 employees",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations with complex requirements.",
    color: "default" as const,
    highlighted: false,
    features: [
      "Everything in Growth",
      "Unlimited mental health sessions",
      "Family planning & maternity",
      "Travel insurance",
      "Wellness reimbursement wallet",
      "Dedicated Customer Success Manager",
      "Custom integrations & SSO",
      "SLA guarantees",
      "Unlimited employees",
    ],
    cta: "Contact Sales",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Chip color="primary" variant="flat" size="sm" className="mb-4 font-semibold">
            Simple Pricing
          </Chip>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Transparent Pricing,{" "}
            <span className="gradient-text">No Surprises</span>
          </h2>
          <p className="text-default-500 text-lg">
            Start with a 30-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`border ${
                plan.highlighted
                  ? "border-primary shadow-xl shadow-primary/20 scale-105"
                  : "border-default-100 shadow-sm"
              }`}
              radius="lg"
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Chip
                    color="primary"
                    variant="solid"
                    size="sm"
                    startContent={<Zap className="w-3 h-3" />}
                    className="font-bold shadow-lg"
                  >
                    Most Popular
                  </Chip>
                </div>
              )}

              <CardHeader className={`flex flex-col items-start gap-2 px-6 pt-8 pb-4 ${plan.highlighted ? "bg-primary-50" : ""}`}>
                <p className="text-sm font-semibold text-default-500 uppercase tracking-wider">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-foreground">{plan.price}</span>
                  <span className="text-sm text-default-400">{plan.period}</span>
                </div>
                <p className="text-sm text-default-500 leading-relaxed">{plan.description}</p>
              </CardHeader>

              <Divider />

              <CardBody className="px-6 py-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? "bg-primary-100" : "bg-default-100"}`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? "text-primary" : "text-default-500"}`} />
                      </div>
                      <span className="text-sm text-default-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>

              <CardFooter className="px-6 pb-8">
                <Button
                  as={Link}
                  href={plan.name === "Enterprise" ? "#contact" : "#contact"}
                  color={plan.highlighted ? "primary" : "default"}
                  variant={plan.highlighted ? "solid" : "bordered"}
                  fullWidth
                  size="lg"
                  radius="full"
                  className={`font-semibold ${!plan.highlighted ? "border-default-300" : ""}`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-sm text-default-400 mt-10">
          All plans include a 30-day free trial. Prices are per active employee per month,
          billed annually. Monthly billing available at a slight premium.
        </p>
      </div>
    </section>
  );
}
