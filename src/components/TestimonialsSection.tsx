"use client";

import { Card, CardBody, Avatar, Chip } from "@heroui/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "MixCare transformed how we manage benefits. Our HR team saves over 20 hours a week, and employee satisfaction with benefits jumped from 62% to 94% in just one quarter.",
    name: "Jennifer Lau",
    title: "Chief People Officer",
    company: "Fintech HK Ltd.",
    avatar: "https://i.pravatar.cc/150?img=10",
    rating: 5,
  },
  {
    quote:
      "The mental health support module has been a game-changer for our team. Claims are processed instantly and the mobile app is genuinely beautiful and easy to use.",
    name: "Michael Chan",
    title: "Head of HR",
    company: "TechVision Asia",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    quote:
      "We onboarded 300 employees in under a week. The Workday integration was seamless and our employees were thrilled with the self-service portal. Highly recommend.",
    name: "Sarah Wong",
    title: "VP People & Culture",
    company: "CloudBase Systems",
    avatar: "https://i.pravatar.cc/150?img=20",
    rating: 5,
  },
  {
    quote:
      "Switching from our legacy insurer to MixCare saved us 30% on benefits costs while actually improving coverage. The analytics dashboard alone is worth the price.",
    name: "David Ng",
    title: "CFO",
    company: "Meridian Group",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
  },
  {
    quote:
      "Our employees in Hong Kong, Singapore, and Taiwan all use the same platform. Cross-border benefits management has never been this simple.",
    name: "Alicia Tan",
    title: "Regional HR Director",
    company: "Pan-Asia Retail Co.",
    avatar: "https://i.pravatar.cc/150?img=44",
    rating: 5,
  },
  {
    quote:
      "The 24/7 employee helpline and instant claims made such a difference. We've had zero complaints about benefits administration since switching to MixCare.",
    name: "Kevin Hui",
    title: "HR Manager",
    company: "BlueSky Logistics",
    avatar: "https://i.pravatar.cc/150?img=55",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-content1">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Chip color="success" variant="flat" size="sm" className="mb-4 font-semibold">
            Customer Stories
          </Chip>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Loved by{" "}
            <span className="gradient-text">2,000+ Companies</span>
          </h2>
          <p className="text-default-500 text-lg">
            From startups to enterprise — see how MixCare is changing the way
            companies care for their people.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="border border-default-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200 bg-background"
              radius="lg"
            >
              <CardBody className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Quote className="w-8 h-8 text-primary-200 flex-shrink-0 mt-1" />
                  <div className="flex">
                    {Array(t.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-warning text-warning"
                        />
                      ))}
                  </div>
                </div>

                <p className="text-default-600 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-default-100">
                  <Avatar src={t.avatar} size="sm" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-default-400">
                      {t.title} · {t.company}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "98%", label: "Customer Satisfaction" },
              { value: "< 24h", label: "Average Claim Time" },
              { value: "70%", label: "Admin Time Saved" },
              { value: "4.9★", label: "App Store Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-sm text-white/70 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
