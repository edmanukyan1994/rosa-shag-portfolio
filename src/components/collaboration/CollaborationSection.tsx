"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { collaborationOptions } from "@/data/collaboration";
import { useUI } from "@/lib/ui-context";

export function CollaborationSection() {
  const { openContact } = useUI();

  return (
    <section id="collab" className="relative pt-40 pb-16 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Сотрудничество"
          title="Варианты сотрудничества"
          description="Формат и объём контента подбираем под задачи бренда."
          align="center"
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {collaborationOptions.map((option, i) => (
            <motion.article
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-panel flex flex-col rounded-[28px] px-6 py-7 sm:px-8 sm:py-8"
            >
              <span className="font-display text-sm font-semibold tracking-[0.18em] text-accent">
                {option.number}
              </span>
              <h3 className="font-display mt-3 text-2xl font-medium text-text-primary sm:text-[1.65rem]">
                {option.title}
              </h3>
              <p className="mt-1 text-sm tracking-wide text-text-muted">{option.titleEn}</p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {option.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {option.note && (
                <p className="mt-6 border-t border-border-subtle pt-5 text-sm leading-relaxed text-text-primary/85">
                  {option.note}
                </p>
              )}
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button size="lg" onClick={() => openContact()}>
            Обсудить формат
          </Button>
        </div>
      </Container>
    </section>
  );
}
