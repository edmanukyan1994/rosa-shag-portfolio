"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Link2, Play, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUI } from "@/lib/ui-context";
import { buildVideoShareUrl } from "@/lib/video-url";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function VideoModal() {
  const { activeVideo, closeVideo, openContact } = useUI();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!activeVideo) return;
    setIsPlaying(false);
    setCopied(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeVideo, closeVideo]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) {
      setIsPlaying((p) => !p);
      return;
    }
    if (el.paused) {
      el.play();
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const shareVideo = useCallback(async () => {
    if (!activeVideo) return;
    const url = buildVideoShareUrl(activeVideo.id);

    try {
      if (navigator.share) {
        await navigator.share({
          title: activeVideo.title,
          text: `${activeVideo.title} — Rosa_shag`,
          url,
        });
        return;
      }
    } catch {
      // fall through to clipboard
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [activeVideo]);

  return (
    <AnimatePresence>
      {activeVideo && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-[#1a1014]/92 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
        >
          {/* Top bar — always visible */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <button
              type="button"
              onClick={() => closeVideo()}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </button>

            <button
              type="button"
              onClick={shareVideo}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Скопировано
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4" />
                  Поделиться
                </>
              )}
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="mx-auto flex w-full max-w-lg flex-col gap-5 px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:max-w-2xl sm:py-8">
              <div
                className="relative mx-auto w-full max-w-[min(100%,340px)] cursor-pointer overflow-hidden rounded-2xl bg-black shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]"
                style={{ aspectRatio: "9/16", maxHeight: "min(68dvh, 620px)" }}
                onClick={togglePlay}
              >
                {activeVideo.videoSrc ? (
                  <video
                    ref={videoRef}
                    src={activeVideo.videoSrc}
                    poster={activeVideo.thumbnail}
                    className="h-full w-full object-contain"
                    playsInline
                    loop
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                ) : (
                  <>
                    <Image
                      src={activeVideo.thumbnail}
                      alt={activeVideo.title}
                      fill
                      sizes="340px"
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                  </>
                )}

                {!isPlaying && activeVideo.videoSrc && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                      <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute left-3 top-3">
                  <Badge variant="accent">{activeVideo.formatTag}</Badge>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 sm:p-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {activeVideo.client}
                  </p>
                  <h3 className="font-display text-xl font-medium leading-snug text-white sm:text-2xl">
                    {activeVideo.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{activeVideo.formatTag}</Badge>
                  {activeVideo.metric && <Badge variant="accent">{activeVideo.metric}</Badge>}
                  {activeVideo.durationLabel && <Badge>{activeVideo.durationLabel}</Badge>}
                </div>

                <p className="text-sm leading-relaxed text-white/75">
                  Хотите такой же формат для вашего бренда? Адаптирую хук, сценарий и
                  монтаж под ваш продукт — от 3 дней.
                </p>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      closeVideo();
                      openContact(
                        `Хочу заказать формат: «${activeVideo.title}» (${activeVideo.formatTag})`
                      );
                    }}
                  >
                    Заказать этот формат
                  </Button>
                  <Button variant="secondary" size="md" onClick={() => closeVideo()}>
                    Смотреть дальше
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop extra close */}
          <button
            type="button"
            onClick={() => closeVideo()}
            className="absolute right-4 top-[max(0.75rem,env(safe-area-inset-top))] hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/15 sm:flex"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
