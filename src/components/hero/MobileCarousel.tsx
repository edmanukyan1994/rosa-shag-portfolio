"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { VideoItem } from "@/types";
import { useUI } from "@/lib/ui-context";
import { Badge } from "@/components/ui/Badge";

export function MobileCarousel({ items }: { items: VideoItem[] }) {
  const { openVideo } = useUI();

  return (
    <div className="relative -mx-5 px-5">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => openVideo(item)}
            className="group relative aspect-[9/16] w-[46vw] max-w-[220px] shrink-0 snap-center cursor-pointer overflow-hidden rounded-2xl border border-border-subtle bg-bg-card"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              sizes="220px"
              className="object-cover transition-transform duration-300 group-active:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute left-2 top-2">
              <Badge variant="accent" className="px-2 py-0.5 text-[10px]">
                {item.formatTag}
              </Badge>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Play className="h-4 w-4 translate-x-0.5 fill-white text-white" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-2.5 text-left">
              <p className="line-clamp-2 text-[11px] font-medium leading-snug text-white">
                {item.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
