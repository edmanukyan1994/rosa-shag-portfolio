"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Loader2, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useUI } from "@/lib/ui-context";
import { Button } from "@/components/ui/Button";
import { CONTACT, SOCIAL_LINKS, buildMailtoLink } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactDrawer() {
  const { isContactOpen, closeContact, contactPrefill } = useUI();
  const [form, setForm] = useState({ name: "", brand: "", link: "", budget: "", website: "" });
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
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

  useEffect(() => {
    if (!isContactOpen) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isContactOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          brand: form.brand.trim(),
          link: form.link.trim(),
          budget: form.budget.trim(),
          prefill: contactPrefill,
          website: form.website,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Не удалось отправить заявку");
        return;
      }

      setStatus("success");
      setForm({ name: "", brand: "", link: "", budget: "", website: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Проверьте интернет и попробуйте ещё раз");
    }
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

            {status === "success" ? (
              <div className="mt-8 flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Check className="h-7 w-7" />
                </div>
                <h4 className="font-display text-xl text-text-primary">Заявка отправлена!</h4>
                <p className="max-w-xs text-sm text-text-secondary">
                  Спасибо — Роза получит сообщение в Telegram и ответит в ближайшее время.
                </p>
                <Button size="md" onClick={closeContact} className="mt-2">
                  Закрыть
                </Button>
              </div>
            ) : (
              <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                />

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

                {status === "error" && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </p>
                )}

                <div className="mt-2 flex flex-col gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Отправить заявку
                      </>
                    )}
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
            )}

            <div className="mt-6 grid grid-cols-2 gap-2">
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border-subtle bg-white/70 px-3 py-3 text-center text-sm font-medium text-text-primary transition-colors hover:border-accent/40"
              >
                Telegram
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="cursor-pointer rounded-xl border border-border-subtle bg-white/70 px-3 py-3 text-center text-sm font-medium text-text-primary transition-colors hover:border-accent/40"
              >
                {copied ? "Email скопирован" : "Скопировать email"}
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
