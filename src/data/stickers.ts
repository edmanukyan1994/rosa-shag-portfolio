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
}

/** Deterministic chaotic layout — stable between server and client renders. */
export function buildStickerPlacements(count = 36): StickerPlacement[] {
  const pool = [...stickers];
  if (pool.length === 0) return [];

  const picked: StickerAsset[] = [];
  while (picked.length < count) {
    picked.push(pool[picked.length % pool.length]);
  }

  return picked.map((sticker, index) => {
    const seed = hashSeed(`${sticker.id}-${index}`);
    const topBase = 3 + (seed % 88);
    const size = 120 + pick(seed, 8, 72);
    const rotate = -28 + pick(seed, 12, 56);
    const delay = (seed % 20) / 10;

    const onRight = index % 2 === 1;
    const zone = pick(seed, 4, 4);
    let left: string | undefined;
    let right: string | undefined;

    if (onRight) {
      if (zone === 0) {
        right = `${seed % 8}%`;
      } else if (zone === 1) {
        right = `${8 + (seed % 12)}%`;
      } else if (zone === 2) {
        right = `${2 + (seed % 6)}%`;
      } else {
        right = `${14 + (seed % 18)}%`;
      }
    } else if (zone === 0) {
      left = `${seed % 8}%`;
    } else if (zone === 1) {
      left = `${8 + (seed % 12)}%`;
    } else if (zone === 2) {
      left = `${2 + (seed % 6)}%`;
    } else {
      left = `${14 + (seed % 18)}%`;
    }

    return {
      id: `${sticker.id}-${index}`,
      file: sticker.file,
      top: `${topBase}%`,
      left,
      right,
      size,
      rotate,
      delay,
    };
  });
}
