"use client";

import { useEffect, useState } from "react";
import { buildStickerPlacements } from "@/data/stickers";

const placements = buildStickerPlacements(16);

export function SiteStickers() {
  const [ready, setReady] = useState(false);
  const [sizeScale, setSizeScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const updateScale = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      setSizeScale(mobile ? 0.52 : 1);
    };
    updateScale();
    mq.addEventListener("change", updateScale);

    const timer = window.setTimeout(() => setReady(true), 300);

    return () => {
      mq.removeEventListener("change", updateScale);
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready || placements.length === 0) return null;

  const visible = isMobile ? placements.filter((_, i) => i % 2 === 0).slice(0, 8) : placements;

  return (
    <div className="site-stickers" aria-hidden="true">
      {visible.map((sticker) => {
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
