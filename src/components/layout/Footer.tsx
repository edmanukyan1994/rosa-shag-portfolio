"use client";

import { ArrowUpRight, Check, Mail, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useUI } from "@/lib/ui-context";
import { CONTACT, SOCIAL_LINKS } from "@/lib/utils";
import { InstagramIcon, TelegramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

const socials = [
  { icon: InstagramIcon, label: "Instagram", href: SOCIAL_LINKS.instagram },
  { icon: TikTokIcon, label: "TikTok", href: SOCIAL_LINKS.tiktok },
  { icon: TelegramIcon, label: "Telegram", href: SOCIAL_LINKS.telegram },
];

const footerLinks = [
  { href: "#about", label: "Обо мне" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#proof", label: "Результаты" },
  { href: "#reviews", label: "Отзывы" },
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
        <div className="contact-cta glass-panel flex flex-col items-center gap-6 rounded-[32px] px-6 py-14 text-center sm:px-16">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_24px_-8px_rgba(231,84,128,0.65)]">
            <Sparkles className="h-5 w-5" />
          </span>
          <h2 className="font-display max-w-xl text-3xl font-medium text-text-primary sm:text-4xl">
            Готовы создать ваше следующее конверсионное видео?
          </h2>
          <p className="max-w-md text-text-secondary">
            Пришлите бренд и продукт — отвечу с форматами и сроками в течение
            нескольких часов.
          </p>

          <div className="mt-1 grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
            <Button size="lg" onClick={() => openContact()} className="w-full sm:col-span-1">
              Быстрая заявка <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href={SOCIAL_LINKS.instagram}
              className="w-full border-accent/25 bg-white/80"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href={SOCIAL_LINKS.telegram}
              className="w-full border-accent/25 bg-white/80"
            >
              <MessageCircle className="h-4 w-4" />
              Telegram
            </Button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border-subtle bg-white/70 px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent/35"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-accent" /> Email скопирован
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 text-accent" /> {CONTACT.email}
              </>
            )}
          </button>
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

        <div className="flex flex-col items-center gap-4 pb-10">
          <p className="text-center text-xs text-text-muted">
            © {new Date().getFullYear()} Rosa_shag. Все права защищены.
          </p>
          <a
            href="https://edgarmanukyan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/55 px-3.5 py-1.5 text-[11px] tracking-wide text-text-muted backdrop-blur-sm transition-colors hover:border-accent/35 hover:text-text-secondary"
          >
            <span className="uppercase">Разработка</span>
            <span className="h-3 w-px bg-border-subtle" aria-hidden />
            <span className="font-medium text-text-secondary">Edgar Manukyan</span>
            <span className="text-accent/90">edgarmanukyan.com</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
