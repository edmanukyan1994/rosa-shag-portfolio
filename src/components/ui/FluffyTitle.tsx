import { cn } from "@/lib/utils";

export function FluffyTitle({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const webpSrc = src.replace(/\.png$/i, ".webp");

  return (
    <picture className={cn("fluffy-title block", className)}>
      <source srcSet={webpSrc} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={1400}
        height={400}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="fluffy-title__img h-auto w-[min(92vw,420px)] object-contain sm:w-[500px] lg:w-[580px]"
      />
    </picture>
  );
}
