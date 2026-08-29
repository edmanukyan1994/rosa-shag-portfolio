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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let labelFrame = 0;
    let scrollFrame = 0;

    const updateLabels = () => {
      const placed = SECTIONS.flatMap((section) => {
        const el = document.getElementById(section.id);
        if (!el) return [];

        const top = el.offsetTop - 56;
        return [{ id: section.id, label: section.label, top }];
      });

      setLabels(placed);
    };

    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    const scheduleLabels = () => {
      cancelAnimationFrame(labelFrame);
      labelFrame = requestAnimationFrame(updateLabels);
    };

    scheduleLabels();
    onScroll();

    const observer = new ResizeObserver(scheduleLabels);
    observer.observe(document.body);

    window.addEventListener("resize", scheduleLabels, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    const delayed = window.setTimeout(scheduleLabels, 400);

    return () => {
      cancelAnimationFrame(labelFrame);
      cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleLabels);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(delayed);
    };
  }, []);

  return (
    <div className="site-backdrop-visual" aria-hidden="true">
      <div className="site-backdrop-gradient" />
      <div className="site-backdrop-glow site-backdrop-glow-a" />
      <div className="site-backdrop-glow site-backdrop-glow-b" />

      {/* Labels sit between gradient and ribbed glass; synced to scroll */}
      <div
        className="site-backdrop-labels"
        style={{ transform: `translate3d(0, ${-scrollY}px, 0)` }}
      >
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
      <div className="site-backdrop-frost" />
    </div>
  );
}
