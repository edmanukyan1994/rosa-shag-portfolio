"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OrbitShowcase } from "./OrbitShowcase";
import { useUI } from "@/lib/ui-context";
import { heroReels } from "@/data/videos";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const { openContact } = useUI();

  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-20 sm:pb-16 sm:pt-24 lg:pt-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 sm:gap-8 sm:px-8 lg:gap-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <OrbitShowcase items={heroReels} portraitSrc="/images/rosa-cutout.png" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex max-w-xl flex-col items-center gap-5 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">
            UGC · Beauty · Fashion · Lifestyle
          </p>

          <p className="font-display text-xl leading-snug text-text-primary/90 sm:text-2xl">
            Контент, который{" "}
            <span className="font-semibold text-text-primary">вызывает доверие</span>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => openContact()}>
              Заказать видео <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" href="#portfolio">
              Смотреть работы <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
