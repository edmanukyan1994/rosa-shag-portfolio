"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Rosa_shag" },
  { id: "about", label: "Обо мне" },
  { id: "brands", label: "Бренды" },
  { id: "portfolio", label: "Портфолио" },
  { id: "proof", label: "Результаты" },
  { id: "contact", label: "Контакты" },
];

type PlacedLabel = { id: string; label: string; top: number };

export function SiteBackdrop() {
  const [height, setHeight] = useState(0);
  const [labels, setLabels] = useState<PlacedLabel[]>([]);

  useEffect(() => {
    const update = () => {
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      setHeight(docHeight);

      const placed = SECTIONS.flatMap((section) => {
        const el = document.getElementById(section.id);
        if (!el) return [];

        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY - 56;

        return [{ id: section.id, label: section.label, top }];
      });

      setLabels(placed);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(document.body);

    window.addEventListener("resize", update);
    const delayed = window.setTimeout(update, 600);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.clearTimeout(delayed);
    };
  }, []);

  return (
    <div
      className="site-backdrop"
      style={{ height: height || "100vh" }}
      aria-hidden="true"
    >
      {/* SVG filters: rib displacement for labels + grain for glass */}
      <svg className="site-backdrop-svg-defs" aria-hidden="true">
        <defs>
          <filter
            id="fluted-refract"
            x="-8%"
            y="-8%"
            width="116%"
            height="116%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035 0.002"
              numOctaves="1"
              seed="4"
              result="ribNoise"
            />
            <feComponentTransfer in="ribNoise" result="ribMap">
              <feFuncR type="discrete" tableValues="0.28 0.72 0.28 0.72" />
              <feFuncG type="discrete" tableValues="0.5 0.5 0.5 0.5" />
              <feFuncB type="discrete" tableValues="0.5 0.5 0.5 0.5" />
            </feComponentTransfer>
            <feGaussianBlur in="ribMap" stdDeviation="0.6" result="ribSoft" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="ribSoft"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="glass-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="5"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0"
              in="noise"
              result="grain"
            />
            <feBlend in="SourceGraphic" in2="grain" mode="overlay" />
          </filter>

          <filter id="glass-grain-extra" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.2"
              numOctaves="3"
              stitchTiles="stitch"
              result="fineNoise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0"
              in="fineNoise"
              result="fineGrain"
            />
            <feBlend in="SourceGraphic" in2="fineGrain" mode="soft-light" />
          </filter>
        </defs>
      </svg>

      <div className="site-backdrop-gradient" />
      <div className="site-backdrop-glow site-backdrop-glow-a" />
      <div className="site-backdrop-glow site-backdrop-glow-b" />
      <div className="site-backdrop-glow site-backdrop-glow-c" />
      <div className="site-backdrop-glow site-backdrop-glow-d" />

      {/* Labels sit behind glass; displacement simulates refraction through flutes */}
      <div className="site-backdrop-labels">
        {labels.map((item) => (
          <span
            key={item.id}
            className="site-backdrop-label"
            style={{ top: item.top }}
          >
            {item.label}
          </span>
        ))}
      </div>

      <div className="site-backdrop-ribbed" />
      <div className="site-backdrop-grain" />
      <div className="site-backdrop-frost" />
    </div>
  );
}
