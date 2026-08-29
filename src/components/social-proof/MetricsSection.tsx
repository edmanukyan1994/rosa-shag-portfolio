"use client";

import { motion } from "framer-motion";
import { metrics } from "@/data/testimonials";

export function MetricsSection() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="glass-panel rounded-2xl p-5 sm:p-6"
        >
          <p className="font-display text-3xl font-semibold text-accent sm:text-4xl">
            {m.value}
          </p>
          <p className="mt-1.5 text-sm font-medium text-text-primary">{m.label}</p>
          {m.hint && <p className="mt-0.5 text-xs text-text-muted">{m.hint}</p>}
        </motion.div>
      ))}
    </div>
  );
}
