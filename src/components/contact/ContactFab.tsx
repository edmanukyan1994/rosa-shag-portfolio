"use client";

import { MessageCircle } from "lucide-react";
import { useUI } from "@/lib/ui-context";

export function ContactFab() {
  const { openContact, isContactOpen } = useUI();

  if (isContactOpen) return null;

  return (
    <button
      type="button"
      onClick={() => openContact()}
      className="contact-fab fixed bottom-5 right-4 z-[55] flex cursor-pointer items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_-8px_rgba(231,84,128,0.75)] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5 sm:text-base"
      aria-label="Открыть форму заявки"
    >
      <MessageCircle className="h-5 w-5" />
      <span>Связаться</span>
    </button>
  );
}
