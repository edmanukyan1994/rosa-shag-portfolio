"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Rosa_shag" },
  { id: "about", label: "Обо мне" },
  { id: "brands", label: "Бренды" },
  { id: "portfolio", label: "Портфолио" },
  { id: "proof", label: "Результаты" },
  { id: "reviews", label: "Отзывы" },
  { id: "contact", label: "Контакты" },
];

type PlacedLabel = { id: string; label: string; top: number };

export function SiteBackdrop() {
  const [height, setHeight] = useState(0);
  const [labels, setLabels] = useState<PlacedLabel[]>([]);
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let debounceTimer = 0;

    const update = () => {
      const glass = glassRef.current;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      setHeight(docHeight);
      if (!glass) return;

      const glassTop = glass.getBoundingClientRect().top + window.scrollY;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      const placed = SECTIONS.flatMap((section) => {
        if (isMobile && section.id === "top") return [];
        const el = document.getElementById(section.id);
        if (!el) return [];
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY - glassTop;

        if (!isMobile) {
          return [{ id: section.id, label: section.label, top: Math.max(0, top - 56) }];
        }

        // Below the fixed header, inside the empty glass padding above content.
        const band = section.id === "reviews" ? -56 : 108;
        return [{ id: section.id, label: section.label, top: Math.max(0, top + band) }];
      });

      setLabels(placed);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(update, 120);
      });
    };

    schedule();

    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    window.addEventListener("resize", schedule, { passive: true });
    const delayed = window.setTimeout(schedule, 500);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(debounceTimer);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.clearTimeout(delayed);
    };
  }, []);

  return (
    <>
      <div className="site-backdrop-sky" aria-hidden="true">
        <div className="site-backdrop-gradient" />
        <div className="site-backdrop-glow site-backdrop-glow-a" />
        <div className="site-backdrop-glow site-backdrop-glow-b" />
      </div>

      <div
        ref={glassRef}
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
