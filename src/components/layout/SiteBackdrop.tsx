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
  const [labels, setLabels] = useState<PlacedLabel[]>([]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const placed = SECTIONS.flatMap((section) => {
        const el = document.getElementById(section.id);
        if (!el) return [];

        const top = el.offsetTop - 56;
        return [{ id: section.id, label: section.label, top }];
      });

      setLabels(placed);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    schedule();

    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    window.addEventListener("resize", schedule, { passive: true });
    const delayed = window.setTimeout(schedule, 400);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.clearTimeout(delayed);
    };
  }, []);

  return (
    <>
      {/* Fixed visual layers — viewport only, no SVG filters (GPU-friendly) */}
      <div className="site-backdrop-visual" aria-hidden="true">
        <div className="site-backdrop-gradient" />
        <div className="site-backdrop-glow site-backdrop-glow-a" />
        <div className="site-backdrop-glow site-backdrop-glow-b" />
        <div className="site-backdrop-ribbed" />
        <div className="site-backdrop-frost" />
      </div>

      {/* Labels scroll with content; lightweight CSS only */}
      <div className="site-backdrop-labels" aria-hidden="true">
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
    </>
  );
}
