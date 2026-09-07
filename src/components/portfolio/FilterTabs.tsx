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
    <div className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pb-2 pt-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 max-md:pr-28">
      {filterTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "filter-tab shrink-0 cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-300 ease-out sm:px-4 sm:py-2.5 sm:text-sm",
            active === tab.id
              ? "border-accent/40 bg-white text-accent shadow-[0_10px_28px_-12px_rgba(58,36,41,0.28)] sm:scale-105"
              : "border-border-subtle bg-black/[0.02] text-text-secondary hover:border-white hover:bg-white hover:text-text-primary hover:shadow-[0_12px_32px_-14px_rgba(58,36,41,0.24)] sm:hover:scale-110"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
