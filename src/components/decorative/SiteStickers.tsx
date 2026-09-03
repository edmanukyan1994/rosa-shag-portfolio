"use client";

import { useEffect, useState } from "react";
import { buildStickerPlacements } from "@/data/stickers";

const placements = buildStickerPlacements(16);

export function SiteStickers() {
  const [ready, setReady] = useState(false);
  const [sizeScale, setSizeScale] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const updateScale = () => setSizeScale(mq.matches ? 0.7 : 1);
    updateScale();
    mq.addEventListener("change", updateScale);

    const timer = window.setTimeout(() => setReady(true), 300);

    return () => {
      mq.removeEventListener("change", updateScale);
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready || placements.length === 0) return null;

  return (
    <div className="site-stickers" aria-hidden="true">
      {placements.map((sticker) => {
        const size = Math.round(sticker.size * sizeScale);

        return (
          <div
            key={sticker.id}
            className="site-sticker"
            style={{
              top: sticker.top,
              left: sticker.left,
              right: sticker.right,
              width: size,
              height: size,
              ["--sticker-base-rotate" as string]: `${sticker.rotate}deg`,
              ["--sticker-delay" as string]: `${sticker.delay}s`,
              ["--sticker-duration" as string]: `${sticker.duration}s`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sticker.file}
              alt=""
              width={size}
              height={size}
              className="site-sticker__img h-full w-full object-contain"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}
    </div>
  );
}
