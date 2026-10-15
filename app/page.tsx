"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Activity, ArrowUpDown, Square, User, Clock, Heart, Calendar, Unlock, Sparkles, Mail, Check, ArrowRight } from 'lucide-react';
import { Reveal } from "@/components/Reveal";

type ClassTypeItem = { title: string; description: string };
type ValueItem = { title: string; description: string };
type InstructorItem = { name: string; role: string; bio: string };
type TestimonialItem = { quote: string; name: string; role: string };
type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
};

const CLASS_ICONS = [Activity, ArrowUpDown, Square, User, Clock, Heart];
const VALUE_ICONS = [Calendar, Clock, Unlock, Sparkles];
const INSTRUCTOR_IMAGES = [
  "/images/pilates-instructor-portrait-woman.jpg",
  "/images/male-pilates-instructor-portrait.jpg",
  "/images/female-fitness-instructor-smiling-portrait.jpg",
];
const PRICING_HIGHLIGHT_INDEX = 1;

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function HomePage() {
  const t = useTranslations();

  const classTypeItems = (
    Array.isArray(t.raw("home.classTypes.items")) ? t.raw("home.classTypes.items") : []
  ) as ClassTypeItem[];
  const valueItems = (
    Array.isArray(t.raw("home.values.items")) ? t.raw("home.values.items") : []
  ) as ValueItem[];
  const instructorItems = (
    Array.isArray(t.raw("home.instructors.items")) ? t.raw("home.instructors.items") : []
  ) as InstructorItem[];
  const testimonialItems = (
    Array.isArray(t.raw("home.testimonials.items")) ? t.raw("home.testimonials.items") : []
  ) as TestimonialItem[];
  const pricingPlans = (
    Array.isArray(t.raw("home.pricing.plans")) ? t.raw("home.pricing.plans") : []
  ) as PricingPlan[];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredClass, setPreferredClass] = useState(classTypeItems[0]?.title ?? "");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-mesh py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                {t("home.hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                {t("home.hero.titleBefore")}
                <span className="text-gradient">{t("home.hero.titleHighlight")}</span>
                {t("home.hero.titleAfter")}
              </h1>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="#free-trial"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t("home.hero.primaryCta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#class-types"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {t("home.hero.secondaryCta")}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="glass-strong overflow-hidden rounded-2xl p-2 shadow-glow">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0956df5de9fd477782b09c3ac46d0bcd.jpg"
                  alt="A woman practicing Pilates on a reformer machine in a sunlit studio"
                  className="h-[420px] w-full rounded-xl object-cover"
                />
              </div>
              <div className="glass motion-safe:animate-float absolute -bottom-8 -left-6 w-52 rounded-2xl p-4 shadow-glow">
                <p className="text-2xl font-semibold text-gradient">{t("home.hero.badgeLabel")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("home.hero.badgeSub")}</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Values */}
      <Reveal>
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {t("home.values.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.values.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.values.subtitle")}
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
              {valueItems.map((item, i) => {
                const Icon = VALUE_ICONS[i % VALUE_ICONS.length]!;
                return (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div className="flex items-start gap-4 border-t border-border pt-6">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Class Types */}
      <Reveal>
        <section id="class-types" className="bg-muted/40 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {t("home.classTypes.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.classTypes.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.classTypes.subtitle")}
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {classTypeItems.map((item, i) => {
                const Icon = CLASS_ICONS[i % CLASS_ICONS.length]!;
                return (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-glow">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
