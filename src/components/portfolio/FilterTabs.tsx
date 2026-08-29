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
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {filterTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "shrink-0 cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200",
            active === tab.id
              ? "border-accent/40 bg-accent-soft text-accent"
              : "border-border-subtle bg-black/[0.02] text-text-secondary hover:border-border-strong hover:text-text-primary"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
