import Image from "next/image";
import type { Brand } from "@/data/brands";

export function BrandLogo3D({ brand }: { brand: Brand }) {
  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white shadow-[0_8px_20px_-8px_rgba(58,36,41,0.4)] ring-1 ring-black/10">
      <Image
        src={brand.logoSrc}
        alt={brand.name || "Бренд"}
        fill
        sizes="64px"
        className="object-cover"
      />
    </div>
  );
}
