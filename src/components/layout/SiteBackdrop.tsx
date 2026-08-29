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
    let frame = 0;

    const update = () => {
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      setHeight(docHeight);

      const placed = SECTIONS.flatMap((section) => {
        const el = document.getElementById(section.id);
        if (!el) return [];
        return [{ id: section.id, label: section.label, top: el.offsetTop - 56 }];
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
    const delayed = window.setTimeout(schedule, 500);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.clearTimeout(delayed);
    };
  }, []);

  return (
    <>
      {/* Sky — fixed gradient, always fills viewport */}
      <div className="site-backdrop-sky" aria-hidden="true">
        <div className="site-backdrop-gradient" />
        <div className="site-backdrop-glow site-backdrop-glow-a" />
        <div className="site-backdrop-glow site-backdrop-glow-b" />
      </div>

      {/* Glass stack scrolls with the page — labels stay glued to ribs */}
      <div
        className="site-backdrop-glass"
        style={{ height: height || "100vh" }}
        aria-hidden="true"
      >
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
    </>
  );
}
