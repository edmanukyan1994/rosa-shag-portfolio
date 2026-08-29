import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CONTACT = {
  telegramHandle: "roza_shag",
  email: "roza.shaginyan95@mail.ru",
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/rosa_shag",
  tiktok: "https://www.tiktok.com/@rosa_shag",
  telegram: "https://t.me/roza_shag",
};

export function buildTelegramLink(message: string) {
  return `https://t.me/${CONTACT.telegramHandle}?text=${encodeURIComponent(
    message
  )}`;
}

export function buildMailtoLink(subject = "UGC — заявка", body = "") {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${CONTACT.email}${query ? `?${query}` : ""}`;
}
