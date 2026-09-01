"use client";

import { cn } from "@/lib/utils";
import { filterTabs } from "@/data/filters";
import { VideoFormat } from "@/types";

export function FilterTabs({
  active,
  onChange,
}: {
  active: VideoFormat;
  onChange: (id: VideoFormat) => void;
}) {
  return (
    <div className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 pt-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
      {filterTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "filter-tab shrink-0 cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out",
            active === tab.id
              ? "scale-105 border-accent/40 bg-white text-accent shadow-[0_10px_28px_-12px_rgba(58,36,41,0.28)]"
              : "border-border-subtle bg-black/[0.02] text-text-secondary hover:scale-110 hover:border-white hover:bg-white hover:text-text-primary hover:shadow-[0_12px_32px_-14px_rgba(58,36,41,0.24)]"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
