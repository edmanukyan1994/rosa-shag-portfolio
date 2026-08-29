"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { VideoItem } from "@/types";
import { useUI } from "@/lib/ui-context";
import { Badge } from "@/components/ui/Badge";

export function VideoCard({ item }: { item: VideoItem }) {
  const { openVideo } = useUI();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => openVideo(item)}
      className="group relative aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-2xl border border-border-subtle bg-bg-card text-left"
    >
      <Image
        src={item.thumbnail}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 45vw, (max-width: 1200px) 30vw, 22vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
      />

      {item.videoSrc && (
        <video
          ref={videoRef}
          src={item.videoSrc}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/0 transition-opacity duration-300 group-hover:from-black/90" />

      <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
        <Badge variant="accent" className="px-2 py-0.5 text-[10px]">
          {item.formatTag}
        </Badge>
      </div>

      {item.metric && (
        <div className="absolute right-2.5 top-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Badge className="px-2 py-0.5 text-[10px]">{item.metric}</Badge>
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
          <Play className="h-4 w-4 translate-x-0.5 fill-white text-white" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="text-[10px] font-medium uppercase tracking-wide text-accent/90">
          {item.client}
        </p>
        <p className="mt-0.5 line-clamp-2 text-xs font-medium leading-snug text-white sm:text-sm">
          {item.title}
        </p>
      </div>
    </motion.button>
  );
}
