import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  titleNode,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title?: string;
  titleNode?: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-2", align === "center" && "justify-center")}>
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(231,84,128,0.6)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </span>
        </div>
      )}
      {titleNode ? (
        titleNode
      ) : title ? (
        <h2
          className={cn(
            "font-display text-3xl font-medium leading-[1.1] text-text-primary text-balance sm:text-4xl lg:text-5xl"
          )}
        >
          {title}
        </h2>
      ) : null}
      {description && (
        <p
          className={cn(
            "max-w-xl text-base text-text-secondary sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
