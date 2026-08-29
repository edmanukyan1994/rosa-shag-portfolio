import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CONTACT = {
  telegramHandle: "your_telegram",
  whatsappNumber: "10000000000",
  email: "hello@creator.com",
};

export function buildTelegramLink(message: string) {
  return `https://t.me/${CONTACT.telegramHandle}?text=${encodeURIComponent(
    message
  )}`;
}

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
