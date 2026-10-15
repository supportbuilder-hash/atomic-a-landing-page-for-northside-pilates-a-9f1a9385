"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Activity, ArrowUpDown, Square, User, Clock, Heart, Calendar, Unlock, Sparkles, Mail, Check, ArrowRight } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeader } from "@/components/blocks/shared";

type ClassTypeItem = { title: string; description: string };
type ValueItem = { title: string; description: string };
type InstructorItem = { name: string; role: string; bio: string };
type TestimonialItem = { quote: string; name: string; role: string };
type ScheduleDay = { day: string; classes: { time: string; name: string; instructor: string }[] };
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
  const scheduleDays = (
    Array.isArray(t.raw("home.schedule.days")) ? t.raw("home.schedule.days") : []
  ) as ScheduleDay[];
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
                  <Reveal key={item.title} delay={i * 0.06}>
                    <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                      <div className="mb-4 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Weekly Class Schedule */}
      <Section id="schedule" className="bg-background">
        <SectionHeader
          eyebrow={t("home.schedule.eyebrow")}
          title={t("home.schedule.title")}
          subtitle={t("home.schedule.subtitle")}
        />
        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-7 md:gap-4 md:overflow-visible md:px-0">
          {scheduleDays.map((day) => (
            <div
              key={day.day}
              className="w-64 shrink-0 rounded-lg border border-border bg-card p-5 shadow-sm md:w-auto"
            >
              <h3 className="font-display font-semibold">{day.day}</h3>
              <ul className="mt-4 space-y-4">
                {day.classes.map((session) => (
                  <li key={`${day.day}-${session.time}-${session.name}`} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                    <p className="text-sm font-medium text-foreground">{session.time}</p>
                    <p className="text-sm text-muted-foreground">{session.name}</p>
                    <p className="text-xs text-muted-foreground">{session.instructor}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Instructors */}
      <Reveal>
        <section id="instructors" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {t("home.instructors.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.instructors.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.instructors.subtitle")}
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {instructorItems.map((instructor, i) => (
                <Reveal key={instructor.name} delay={i * 0.08}>
                  <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                    <img
                      src={INSTRUCTOR_IMAGES[i % INSTRUCTOR_IMAGES.length]}
                      alt={instructor.name}
                      className="h-64 w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold">{instructor.name}</h3>
                      <p className="text-sm font-medium text-primary">{instructor.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{instructor.bio}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Testimonials */}
      <Reveal>
        <section className="bg-muted/40 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {t("home.testimonials.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.testimonials.title")}
              </h2>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonialItems.map((item, i) => (
                <Reveal key={item.name} delay={i * 0.08}>
                  <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-sm">
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {initials(item.name)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Pricing */}
      <Reveal>
        <section id="pricing" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {t("home.pricing.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.pricing.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.pricing.subtitle")}
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
              {pricingPlans.map((plan, i) => {
                const highlighted = i === PRICING_HIGHLIGHT_INDEX;
                return (
                  <Reveal key={plan.name} delay={i * 0.08}>
                    <div
                      className={
                        highlighted
                          ? "relative flex h-full flex-col rounded-2xl bg-gradient-brand p-8 text-primary-foreground shadow-glow"
                          : "flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm"
                      }
                    >
                      <h3 className={"font-display text-xl font-semibold " + (highlighted ? "" : "text-foreground")}>
                        {plan.name}
                      </h3>
                      <p className={"mt-2 text-sm " + (highlighted ? "text-primary-foreground/80" : "text-muted-foreground")}>
                        {plan.description}
                      </p>
                      <div className="mt-6 flex items-baseline gap-1">
                        <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                        <span className={highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}>{plan.period}</span>
                      </div>
                      <ul className="mt-6 flex-1 space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                            <span className={highlighted ? "" : "text-muted-foreground"}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="#free-trial"
                        className={
                          highlighted
                            ? "mt-8 inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5"
                            : "mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 ease-out hover:-translate-y-0.5"
                        }
                      >
                        {plan.ctaLabel}
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Free Trial Sign-up */}
      <Reveal>
        <section id="free-trial" className="bg-muted/40 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div>
                <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  {t("home.freeTrial.eyebrow")}
                </span>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                  {t("home.freeTrial.title")}
                </h2>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                  {t("home.freeTrial.subtitle")}
                </p>
              </div>
              <div id="contact" className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                {submitted ? (
                  <div className="flex flex-col items-center py-8 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{t("home.freeTrial.successTitle")}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t("home.freeTrial.successBody")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium">
                        {t("home.freeTrial.nameLabel")}
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium">
                        {t("home.freeTrial.emailLabel")}
                      </label>
                      <div className="relative mt-1.5">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="preferredClass" className="text-sm font-medium">
                        {t("home.freeTrial.classLabel")}
                      </label>
                      <select
                        id="preferredClass"
                        value={preferredClass}
                        onChange={(e) => setPreferredClass(e.target.value)}
                        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {classTypeItems.map((item) => (
                          <option key={item.title} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {t("home.freeTrial.submitLabel")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
