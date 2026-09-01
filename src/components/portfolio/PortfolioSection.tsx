"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FluffyTitle } from "@/components/ui/FluffyTitle";
import { FilterTabs } from "./FilterTabs";
import { VideoCard } from "./VideoCard";
import { videos } from "@/data/videos";
import { VideoFormat } from "@/types";

export function PortfolioSection() {
  const [active, setActive] = useState<VideoFormat>("all");

  const filtered = useMemo(
    () => (active === "all" ? videos : videos.filter((v) => v.format === active)),
    [active]
  );

  return (
    <section id="portfolio" className="relative py-24 sm:py-28 [content-visibility:auto] [contain-intrinsic-size:auto_1200px]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-2 px-2 sm:px-4"
        >
          <SectionHeading
            eyebrow="Портфолио"
            titleNode={<FluffyTitle src="/images/fluffy-raboty.png" alt="Работы" priority />}
            description="15 форматов — от влогов и распаковок до POV и эстетики."
            align="center"
          />
        </motion.div>

        <div className="mt-8">
          <FilterTabs active={active} onChange={setActive} />
        </div>

        <motion.div
          className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
        >
          <AnimatePresence mode="sync">
            {filtered.map((item) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
