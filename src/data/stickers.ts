import stickersManifest from "@/data/stickers-manifest.json";

export interface StickerAsset {
  id: string;
  file: string;
  group: string;
}

export const stickers = stickersManifest as StickerAsset[];

function hashSeed(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pick(seed: number, shift: number, mod: number): number {
  return ((seed >>> shift) % mod) >>> 0;
}

export interface StickerPlacement {
  id: string;
  file: string;
  top: string;
  left?: string;
  right?: string;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
}

/** Deterministic layout — stickers stay in side gutters, behind content. */
export function buildStickerPlacements(count = 16): StickerPlacement[] {
  const pool = [...stickers];
  if (pool.length === 0) return [];

  const picked: StickerAsset[] = [];
  while (picked.length < count) {
    picked.push(pool[picked.length % pool.length]);
  }

  return picked.map((sticker, index) => {
    const seed = hashSeed(`${sticker.id}-${index}`);
    // Spread along page height, keep clear of the very top navbar band.
    const topBase = 8 + ((index * 11 + (seed % 9)) % 84);
    const size = 88 + pick(seed, 8, 48);
    const rotate = -18 + pick(seed, 12, 36);
    const delay = (seed % 24) / 10;
    const duration = 6 + pick(seed, 3, 5);

    // Narrow side gutters only — free margins, not over the content column.
    const onRight = index % 2 === 1;
    const inset = 0.5 + (seed % 5) * 0.6;

    return {
      id: `${sticker.id}-${index}`,
      file: sticker.file,
      top: `${topBase}%`,
      left: onRight ? undefined : `${inset}%`,
      right: onRight ? `${inset}%` : undefined,
      size,
      rotate,
      delay,
      duration,
    };
  });
}
