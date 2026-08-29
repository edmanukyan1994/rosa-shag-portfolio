"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { serviceCategories } from "@/data/pricing";
import { useUI } from "@/lib/ui-context";

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);
  const { openContact } = useUI();
  const category = serviceCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="pricing" className="relative py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Services & Pricing"
          title="Simple pricing, built to test and scale"
          description="Pick a one-off video, a testing bundle to find your next winning hook, or ongoing in-feed placements."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-10 flex justify-center px-4">
          <div className="glass-panel inline-flex w-full max-w-full flex-col gap-1 rounded-2xl p-1.5 sm:w-auto sm:flex-row sm:rounded-full">
            {serviceCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={cn(
                  "cursor-pointer whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200",
                  activeCategory === c.id
                    ? "bg-accent text-accent-foreground"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-lg text-center text-sm text-text-secondary">
          {category.subtitle}
        </p>

        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {category.tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7",
                tier.highlighted
                  ? "border-accent/40 bg-linear-to-b from-accent-soft to-bg-card shadow-[0_20px_60px_-25px_rgba(63,217,140,0.4)]"
                  : "border-border-subtle bg-bg-card"
              )}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-foreground">
                    <Star className="h-3 w-3 fill-current" /> Most popular
                  </span>
                </div>
              )}

              <h3 className="font-display text-lg font-medium text-text-primary">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold text-text-primary">
                  {tier.price}
                </span>
                <span className="text-xs text-text-muted">{tier.priceHint}</span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? "primary" : "secondary"}
                size="md"
                className="mt-8 w-full"
                onClick={() =>
                  openContact(`I'd like to book: ${tier.name} (${tier.price})`)
                }
              >
                {tier.ctaLabel}
              </Button>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
