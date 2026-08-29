import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variant === "default" && "bg-black/[0.035] text-text-secondary border border-border-subtle",
        variant === "accent" && "bg-accent-soft text-accent border border-accent/20",
        variant === "outline" && "border border-border-strong text-text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
