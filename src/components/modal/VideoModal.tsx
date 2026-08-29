"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Link2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUI } from "@/lib/ui-context";
import { buildVideoShareUrl } from "@/lib/video-url";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function VideoModal() {
  const { activeVideo, closeVideo, openContact } = useUI();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!activeVideo) return;
    setCopied(false);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      videoRef.current?.pause();
    };
  }, [activeVideo, closeVideo]);

  // Reset player when a new video is opened
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !activeVideo?.videoSrc) return;
    el.pause();
    el.currentTime = 0;
    el.load();
  }, [activeVideo?.id, activeVideo?.videoSrc]);

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

          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="mx-auto flex w-full max-w-lg flex-col gap-5 px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:max-w-2xl sm:py-8">
              <div
                className="relative mx-auto w-full max-w-[min(100%,340px)] overflow-hidden rounded-2xl bg-black shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]"
                style={{ aspectRatio: "9/16", maxHeight: "min(68dvh, 620px)" }}
              >
                {activeVideo.videoSrc ? (
                  <video
                    key={activeVideo.id}
                    ref={videoRef}
                    src={activeVideo.videoSrc}
                    poster={activeVideo.thumbnail}
                    className="h-full w-full object-contain"
                    playsInline
                    controls
                    controlsList="nodownload"
                    preload="metadata"
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

                <div className="pointer-events-none absolute left-3 top-3 z-10">
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
