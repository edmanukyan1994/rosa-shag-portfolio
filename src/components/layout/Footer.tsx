"use client";

import { ArrowUpRight, Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useUI } from "@/lib/ui-context";
import { CONTACT } from "@/lib/utils";
import { InstagramIcon, TelegramIcon, TikTokIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

const socials = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
  { icon: TikTokIcon, label: "TikTok", href: "https://tiktok.com" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
  { icon: TelegramIcon, label: "Telegram", href: "https://t.me" },
];

const footerLinks = [
  { href: "#about", label: "Обо мне" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#proof", label: "Результаты" },
];

export function Footer() {
  const { openContact } = useUI();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative overflow-hidden pt-24 sm:pt-28">
      <Container>
        <div className="glass-panel flex flex-col items-center gap-6 rounded-[32px] px-6 py-14 text-center sm:px-16">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
            <Sparkles className="h-5 w-5" />
          </span>
          <h2 className="font-display max-w-xl text-3xl font-medium text-text-primary sm:text-4xl">
            Готовы создать ваше следующее конверсионное видео?
          </h2>
          <p className="max-w-md text-text-secondary">
            Пришлите бренд и продукт — отвечу с форматами и сроками в течение
            нескольких часов.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => openContact()}>
              Быстрая заявка <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> Email скопирован
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> {CONTACT.email}
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-border-subtle py-10 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold text-text-primary">
              Rosa_shag
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/[0.035] text-text-secondary transition-colors hover:bg-black/[0.07] hover:text-text-primary"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <p className="pb-10 text-center text-xs text-text-muted">
          © {new Date().getFullYear()} Rosa_shag. Все права защищены.
        </p>
      </Container>
    </footer>
  );
}
