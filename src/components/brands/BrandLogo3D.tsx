import Image from "next/image";
import type { CSSProperties } from "react";
import type { Brand } from "@/data/brands";

export function BrandLogo3D({ brand }: { brand: Brand }) {
  return (
    <div
      className="brand-logo-3d"
      style={
        {
          "--brand-from": brand.colorFrom,
          "--brand-to": brand.colorTo,
        } as CSSProperties
      }
    >
      <div className="brand-logo-3d__face">
        {brand.logoSrc ? (
          <Image
            src={brand.logoSrc}
            alt={brand.name}
            width={64}
            height={64}
            className="h-14 w-14 object-contain"
          />
        ) : (
          <span className="brand-logo-3d__initials">
            {brand.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="brand-logo-3d__shadow" aria-hidden />
    </div>
  );
}
