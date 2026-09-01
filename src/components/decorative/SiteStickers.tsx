"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { buildStickerPlacements } from "@/data/stickers";

const placements = buildStickerPlacements(24);

export function SiteStickers() {
  const reduceMotion = useReducedMotion();
  const [sizeScale, setSizeScale] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setSizeScale(mq.matches ? 0.78 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (placements.length === 0) return null;

  return (
    <div className="site-stickers" aria-hidden="true">
      {placements.map((sticker) => {
        const size = Math.round(sticker.size * sizeScale);

        return (
        <motion.div
          key={sticker.id}
          className="site-sticker"
          style={{
            top: sticker.top,
            left: sticker.left,
            right: sticker.right,
            width: size,
            height: size,
          }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1, rotate: sticker.rotate }
              : {
                  opacity: 1,
                  scale: [1, 1.04, 1],
                  y: [0, -18, 0],
                  x: [0, 10, -8, 0],
                  rotate: [
                    sticker.rotate,
                    sticker.rotate + 7,
                    sticker.rotate - 5,
                    sticker.rotate,
                  ],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  opacity: { duration: 0.6, delay: sticker.delay * 0.05 },
                  scale: {
                    duration: 4 + (sticker.delay % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: sticker.delay * 0.3,
                  },
                  y: {
                    duration: 5 + (sticker.delay % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: sticker.delay,
                  },
                  x: {
                    duration: 7 + (sticker.delay % 4),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: sticker.delay * 0.6,
                  },
                  rotate: {
                    duration: 8 + (sticker.delay % 5),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: sticker.delay * 0.4,
                  },
                }
          }
        >
          <Image
            src={sticker.file}
            alt=""
            width={size}
            height={size}
            className="h-full w-full object-contain"
            draggable={false}
            loading="lazy"
          />
        </motion.div>
        );
      })}
    </div>
  );
}
