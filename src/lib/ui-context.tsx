"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { videos } from "@/data/videos";
import { VIDEO_QUERY_KEY } from "@/lib/video-url";
import { VideoItem } from "@/types";

interface UIContextValue {
  activeVideo: VideoItem | null;
  openVideo: (video: VideoItem) => void;
  closeVideo: () => void;
  isContactOpen: boolean;
  contactPrefill: string;
  openContact: (prefill?: string) => void;
  closeContact: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

function UIProviderInner({ children }: { children: ReactNode }) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isContactOpen, setContactOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const skipUrlWrite = useRef(false);

  // Shared URL → open the matching video
  useEffect(() => {
    const id = searchParams.get(VIDEO_QUERY_KEY);

    if (!id) {
      setActiveVideo((current) => {
        if (!current) return current;
        skipUrlWrite.current = true;
        return null;
      });
      return;
    }

    const video = videos.find((item) => item.id === id);
    if (!video) return;

    setActiveVideo((current) => {
      if (current?.id === video.id) return current;
      skipUrlWrite.current = true;
      return video;
    });
  }, [searchParams]);

  // Modal state → update URL for sharing / back button
  useEffect(() => {
    if (skipUrlWrite.current) {
      skipUrlWrite.current = false;
      return;
    }

    const urlId = searchParams.get(VIDEO_QUERY_KEY);

    if (activeVideo) {
      if (urlId === activeVideo.id) return;
      const params = new URLSearchParams(searchParams.toString());
      params.set(VIDEO_QUERY_KEY, activeVideo.id);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      return;
    }

    if (urlId) {
      router.replace(pathname, { scroll: false });
    }
  }, [activeVideo, pathname, router, searchParams]);

  const openVideo = useCallback((video: VideoItem) => setActiveVideo(video), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  const openContact = useCallback((prefill?: string) => {
    setContactPrefill(prefill ?? "");
    setContactOpen(true);
  }, []);

  const closeContact = useCallback(() => setContactOpen(false), []);

  const value = useMemo(
    () => ({
      activeVideo,
      openVideo,
      closeVideo,
      isContactOpen,
      contactPrefill,
      openContact,
      closeContact,
    }),
    [activeVideo, openVideo, closeVideo, isContactOpen, contactPrefill, openContact, closeContact]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function UIProvider({ children }: { children: ReactNode }) {
  return <UIProviderInner>{children}</UIProviderInner>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
