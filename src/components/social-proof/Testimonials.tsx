"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="relative w-[85vw] max-w-sm shrink-0 snap-center rounded-3xl border border-border-subtle bg-bg-card p-6 sm:w-auto sm:max-w-none"
        >
          <Quote className="h-6 w-6 text-accent/50" />
          <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-semibold text-accent">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{t.name}</p>
              <p className="text-xs text-text-muted">
                {t.role} · {t.brand}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
