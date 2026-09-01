"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const highlights = [
  "2+ года в блогинге",
  "Коммерческие интеграции",
  "Работа по ТЗ",
  "Beauty · Fashion · Lifestyle",
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="about-panel mx-auto flex max-w-2xl flex-col items-center gap-8 px-6 py-10 text-center sm:gap-10 sm:px-10 sm:py-12"
        >
          <div className="relative flex w-[200px] items-end justify-center sm:w-[240px]">
            <div className="relative h-[260px] w-[170px] sm:h-[300px] sm:w-[196px]">
              <Image
                src="/images/rosa-cutout.png"
                alt="Манукян Роза — UGC-креатор"
                fill
                sizes="196px"
                className="object-contain object-bottom drop-shadow-[0_12px_28px_rgba(58,36,41,0.18)]"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(231,84,128,0.6)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Обо мне
              </span>
            </div>

            <h2 className="font-editorial text-4xl leading-tight text-text-primary sm:text-5xl">
              Манукян Роза
            </h2>

            <p className="about-lead max-w-md text-lg leading-relaxed text-text-secondary sm:text-xl">
              Мама, жена и UGC-креатор. Снимаю живой, эстетичный и нативный контент для брендов.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {highlights.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>

          <div className="about-copy flex max-w-lg flex-col gap-5 text-center">
            <p>
              Я — мама дочки и счастливая жена. Активная, ответственная и всегда открытая к новым
              знаниям. Более двух лет веду блог и реализовала множество коммерческих интеграций с
              брендами.
            </p>
            <p>
              Умею работать по ТЗ, чувствую визуал и понимаю съёмку, подачу и работу с техникой.
              Особенно люблю beauty — косметику, уход и процедуры — а также fashion и лайфстайл.
            </p>
            <p>
              Сейчас развиваюсь в UGC: создаю контент, который выглядит естественно, вызывает
              доверие и помогает продукту быть замеченным.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
