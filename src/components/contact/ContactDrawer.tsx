"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useUI } from "@/lib/ui-context";
import { Button } from "@/components/ui/Button";
import { buildMailtoLink, buildTelegramLink, CONTACT } from "@/lib/utils";

export function ContactDrawer() {
  const { isContactOpen, closeContact, contactPrefill } = useUI();
  const [form, setForm] = useState({ name: "", brand: "", link: "", budget: "" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isContactOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isContactOpen, closeContact]);

  const buildMessage = () => {
    const parts = [
      contactPrefill || "Привет! Хочу заказать UGC-контент.",
      form.name && `Имя: ${form.name}`,
      form.brand && `Бренд: ${form.brand}`,
      form.link && `Ссылка на продукт: ${form.link}`,
      form.budget && `Бюджет: ${form.budget}`,
    ].filter(Boolean);
    return parts.join("\n");
  };

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isContactOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContact}
          />
          <motion.div
            className="fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-md flex-col overflow-y-auto border-l border-border-subtle bg-bg-elevated p-6 sm:p-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Быстрая заявка
                </p>
                <h3 className="mt-1 font-display text-2xl font-medium text-text-primary">
                  Давайте создадим что-то крутое
                </h3>
              </div>
              <button
                onClick={closeContact}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/[0.035] transition-colors hover:bg-black/[0.07]"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {contactPrefill && (
              <div className="mt-5 rounded-xl border border-accent/20 bg-accent-soft px-4 py-3 text-sm text-accent">
                {contactPrefill}
              </div>
            )}

            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <Field
                label="Ваше имя"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="Анна Иванова"
              />
              <Field
                label="Бренд / Компания"
                value={form.brand}
                onChange={(v) => setForm((f) => ({ ...f, brand: v }))}
                placeholder="GlowLab Cosmetics"
              />
              <Field
                label="Ссылка на продукт"
                value={form.link}
                onChange={(v) => setForm((f) => ({ ...f, link: v }))}
                placeholder="https://yourbrand.com/product"
              />
              <Field
                label="Бюджет"
                value={form.budget}
                onChange={(v) => setForm((f) => ({ ...f, budget: v }))}
                placeholder="Обсудим индивидуально"
              />

              <div className="mt-2 flex flex-col gap-3">
                <Button
                  href={buildTelegramLink(buildMessage())}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  <Send className="h-4 w-4" />
                  Отправить в Telegram
                </Button>
                <Button
                  href={buildMailtoLink("UGC — заявка с сайта", buildMessage())}
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  Написать на email
                </Button>
              </div>
            </form>

            <div className="mt-8 flex items-center justify-between rounded-xl border border-border-subtle bg-black/[0.025] px-4 py-3">
              <span className="text-sm text-text-secondary">{CONTACT.email}</span>
              <button
                onClick={handleCopyEmail}
                className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Скопировано
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Копировать
                  </>
                )}
              </button>
            </div>

            <p className="mt-auto pt-8 text-center text-xs text-text-muted">
              Обычно отвечаю в течение нескольких часов.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-border-subtle bg-black/[0.025] px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent/50 focus:bg-black/[0.04]"
      />
    </label>
  );
}
