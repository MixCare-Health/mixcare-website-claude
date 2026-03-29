"use client";

import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
  Chip,
} from "@heroui/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const companySizes = [
  { key: "1-50", label: "1–50 employees" },
  { key: "51-200", label: "51–200 employees" },
  { key: "201-500", label: "201–500 employees" },
  { key: "501-1000", label: "501–1,000 employees" },
  { key: "1000+", label: "1,000+ employees" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div>
              <Chip color="primary" variant="flat" size="sm" className="mb-4 font-semibold">
                Get Started Today
              </Chip>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Ready to Transform Your{" "}
                <span className="gradient-text">Employee Benefits?</span>
              </h2>
              <p className="text-default-500 text-lg leading-relaxed">
                Talk to a benefits specialist. We&apos;ll help you design the
                perfect package for your team, walk you through the platform, and
                answer any questions.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: Mail,
                  title: "Email Us",
                  value: "hello@mixcare.health",
                  sub: "We reply within 2 hours",
                },
                {
                  icon: Phone,
                  title: "Call Us",
                  value: "+852 3906 1234",
                  sub: "Mon–Fri, 9am–6pm HKT",
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  value: "18/F, One Exchange Square, Central, HK",
                  sub: "By appointment",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-default-600">{item.value}</p>
                      <p className="text-xs text-default-400">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              {[
                "HIPAA Compliant",
                "ISO 27001",
                "PDPO Compliant",
              ].map((badge) => (
                <Chip key={badge} variant="bordered" size="sm" className="text-xs font-medium border-default-300">
                  ✓ {badge}
                </Chip>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <Card className="border border-default-100 shadow-lg" radius="lg">
            <CardBody className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Book a Free Demo
              </h3>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Sarah"
                    variant="bordered"
                    radius="lg"
                    classNames={{ inputWrapper: "border-default-200" }}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Chen"
                    variant="bordered"
                    radius="lg"
                    classNames={{ inputWrapper: "border-default-200" }}
                  />
                </div>

                <Input
                  label="Work Email"
                  placeholder="sarah@company.com"
                  type="email"
                  variant="bordered"
                  radius="lg"
                  classNames={{ inputWrapper: "border-default-200" }}
                />

                <Input
                  label="Company Name"
                  placeholder="Acme Corporation"
                  variant="bordered"
                  radius="lg"
                  classNames={{ inputWrapper: "border-default-200" }}
                />

                <Select
                  label="Company Size"
                  placeholder="Select company size"
                  variant="bordered"
                  radius="lg"
                  classNames={{ trigger: "border-default-200" }}
                >
                  {companySizes.map((size) => (
                    <SelectItem key={size.key}>
                      {size.label}
                    </SelectItem>
                  ))}
                </Select>

                <Textarea
                  label="How can we help?"
                  placeholder="Tell us about your current benefits setup and what you're looking for..."
                  variant="bordered"
                  radius="lg"
                  minRows={3}
                  classNames={{ inputWrapper: "border-default-200" }}
                />

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  fullWidth
                  radius="full"
                  className="font-semibold mt-2"
                  endContent={<Send className="w-4 h-4" />}
                >
                  Book My Free Demo
                </Button>

                <p className="text-xs text-default-400 text-center">
                  No commitment. 30-minute session. We&apos;ll tailor it to your needs.
                </p>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
