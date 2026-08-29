"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

const highlights = [
  "2+ года в блогинге",
  "Коммерческие интеграции",
  "Работа по ТЗ",
  "Beauty · Fashion · Lifestyle",
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto lg:mx-0"
          >
            <div className="relative flex w-[220px] items-end justify-center sm:w-[260px]">
              <div className="relative h-[280px] w-[182px] sm:h-[330px] sm:w-[214px]">
                <Image
                  src="/images/rosa-cutout.png"
                  alt="Манукян Роза — UGC-креатор"
                  fill
                  sizes="214px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <SectionHeading
              eyebrow="Обо мне"
              title="Манукян Роза"
              description="Мама, жена и UGC-креатор, который создаёт живой, эстетичный и нативный контент для брендов."
              className="[&_h2]:font-editorial [&_h2]:text-4xl [&_h2]:sm:text-5xl"
            />

            <div className="flex flex-wrap gap-2">
              {highlights.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>

            <div className="readable-copy flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-text-primary/90">
              <p>
                Я — мама дочки и счастливая жена, активная, ответственная и всегда
                открытая к новым знаниям и развитию.
              </p>
              <p>
                Более 2 лет занимаюсь блогингом и за это время реализовала множество
                коммерческих интеграций с брендами. Умею работать по ТЗ, чувствую
                визуал, понимаю особенности съёмки, подачи и работы с техникой.
              </p>
              <p>
                Особенно люблю beauty-контент: косметику, уход, различные процедуры,
                а также fashion, переодевания и актуальные тренды. Мне нравится снимать
                короткие лайфстайл-влоги, показывать моменты из жизни и создавать
                живой, эстетичный и нативный контент.
              </p>
              <p>
                Сейчас хочу активно развиваться в направлении UGC и создавать для
                брендов контент, который выглядит естественно, вызывает доверие и
                помогает продукту быть замеченным.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
