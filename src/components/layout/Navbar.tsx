"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useUI } from "@/lib/ui-context";

const links = [
  { href: "#about", label: "Обо мне" },
  { href: "#brands", label: "Бренды" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#proof", label: "Результаты" },
  { href: "#contact", label: "Контакты" },
];

export function Navbar() {
  const { openContact } = useUI();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4 sm:top-5 sm:px-6">
      <Container className="!px-0">
        <div className="glass-panel flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <a href="#top" className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-text-primary">
              Rosa_shag
            </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button size="sm" onClick={() => openContact()}>
              Заказать видео
            </Button>
          </div>

          <button
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/[0.035] md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open && (
          <div className="glass-panel mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-black/[0.035] hover:text-text-primary"
              >
                {l.label}
              </a>
            ))}
            <Button
              size="sm"
              className="mt-1"
              onClick={() => {
                setOpen(false);
                openContact();
              }}
            >
              Заказать видео
            </Button>
          </div>
        )}
      </Container>
    </header>
  );
}
