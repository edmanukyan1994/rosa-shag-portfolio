"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/data/brands";
import { BrandLogo3D } from "./BrandLogo3D";

/** Final resting positions inside / above the cart basket */
const DROP_TARGETS = [
  { x: -90, y: 48, rotate: -10 },
  { x: -30, y: 28, rotate: 7 },
  { x: 30, y: 42, rotate: -5 },
  { x: 85, y: 32, rotate: 8 },
  { x: -60, y: 8, rotate: 5 },
  { x: 0, y: 2, rotate: -7 },
  { x: 55, y: 14, rotate: 4 },
  { x: -10, y: 62, rotate: -4 },
];

export function BrandsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="brands" ref={ref} className="relative overflow-hidden py-24 sm:py-28">
      <Container>
        <div className="mb-10 px-2 sm:px-4">
          <SectionHeading
            eyebrow="Бренды"
            title="С кем я работала"
            description="Бренды, с которыми сотрудничала — и те, кому доверяю свою рекомендацию."
            align="center"
          />
        </div>

        <div className="relative mx-auto h-[min(72vw,420px)] w-full max-w-3xl sm:h-[460px]">
          {/* Falling brand logos */}
          <div className="pointer-events-none absolute inset-0 z-10">
            {brands.map((brand, i) => {
              const target = DROP_TARGETS[i] ?? DROP_TARGETS[0];
              return (
                <motion.div
                  key={brand.id}
                  className="absolute left-1/2 top-[18%] -translate-x-1/2"
                  initial={{
                    x: target.x,
                    y: -320,
                    opacity: 0,
                    scale: 0.55,
                    rotate: 0,
                  }}
                  animate={
                    inView
                      ? {
                          x: target.x,
                          y: target.y,
                          opacity: 1,
                          scale: 1,
                          rotate: target.rotate,
                        }
                      : {
                          x: target.x,
                          y: -320,
                          opacity: 0,
                          scale: 0.55,
                          rotate: 0,
                        }
                  }
                  transition={{
                    delay: 0.75 + i * 0.13,
                    type: "spring",
                    stiffness: 110,
                    damping: 13,
                    mass: 0.9,
                  }}
                >
                  <BrandLogo3D brand={brand} />
                </motion.div>
              );
            })}
          </div>

          {/* Pink cart slides in from the right */}
          <motion.div
            className="absolute bottom-0 right-0 z-20 w-[min(88vw,340px)]"
            initial={{ x: "115%", opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: "115%", opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[210px] w-full overflow-hidden sm:h-[240px]">
              <Image
                src="/images/pink-cart.jpg"
                alt=""
                fill
                priority={false}
                sizes="340px"
                className="object-cover object-[center_94%] scale-[2.4] sm:scale-[2.6]"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
