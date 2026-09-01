#!/usr/bin/env python3
"""Extract individual sticker PNGs from collage source images."""

from __future__ import annotations

import io
import json
import os
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "stickers"
SOURCES = OUT / "sources"
ASSETS = Path("/Users/edgarmanukyan/.cursor/projects/Users-edgarmanukyan-Desktop/assets")

SOURCE_FILES = {
    "chanel-patches": ASSETS / "IMG_8620-7b675bb8-4d94-429f-9806-7ca1365b3a92.jpg",
    "beauty-tray": ASSETS / "IMG_8619-035d7797-5b52-40ac-8b81-1eef1b979257.jpg",
    "skincare-grid": ASSETS / "IMG_8626-3ad0704b-9d65-454c-a64c-359512e712c8.jpg",
    "pusy-collage": ASSETS / "IMG_8625-a0a281f6-1616-4c7c-8af9-df358f33e971.jpg",
    "lifestyle-flatlay": ASSETS / "IMG_8618-8049c534-7d50-4dde-8c8a-9a00df9b76e2.jpg",
    "makeup-grid": ASSETS / "IMG_8624-9b4f572e-4102-41d4-8c34-97897840e30e.jpg",
}


def trim_alpha(img: Image.Image, threshold: int = 12) -> Image.Image:
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    alpha = np.array(img.split()[-1])
    mask = alpha > threshold
    if not mask.any():
        return img
    ys, xs = np.where(mask)
    pad = 4
    x0 = max(0, int(xs.min()) - pad)
    y0 = max(0, int(ys.min()) - pad)
    x1 = min(img.width, int(xs.max()) + pad + 1)
    y1 = min(img.height, int(ys.max()) + pad + 1)
    return img.crop((x0, y0, x1, y1))


def remove_bg(img: Image.Image) -> Image.Image:
    buf = io.BytesIO()
    img.convert("RGB").save(buf, format="PNG")
    out = remove(buf.getvalue())
    return trim_alpha(Image.open(io.BytesIO(out)).convert("RGBA"))


def split_grid(img: Image.Image, cols: int, rows: int, inset: tuple[int, int, int, int]) -> list[Image.Image]:
    left, top, right, bottom = inset
    w, h = img.size
    area = img.crop((left, top, w - right, h - bottom))
    aw, ah = area.size
    cw, ch = aw // cols, ah // rows
    cells: list[Image.Image] = []
    for r in range(rows):
        for c in range(cols):
            box = (c * cw, r * ch, (c + 1) * cw, (r + 1) * ch)
            cells.append(area.crop(box))
    return cells


def extract_blobs(img: Image.Image, min_area: int = 2500) -> list[Image.Image]:
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    alpha = np.array(img.split()[-1])
    h, w = alpha.shape
    visited = np.zeros((h, w), dtype=bool)
    blobs: list[Image.Image] = []

    for y in range(h):
        for x in range(w):
            if visited[y, x] or alpha[y, x] < 40:
                continue
            q: deque[tuple[int, int]] = deque([(y, x)])
            visited[y, x] = True
            coords: list[tuple[int, int]] = []
            while q:
                cy, cx = q.popleft()
                coords.append((cy, cx))
                for ny, nx in ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1)):
                    if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and alpha[ny, nx] > 40:
                        visited[ny, nx] = True
                        q.append((ny, nx))
            if len(coords) < min_area:
                continue
            ys = [c[0] for c in coords]
            xs = [c[1] for c in coords]
            pad = 12
            crop = img.crop(
                (
                    max(0, min(xs) - pad),
                    max(0, min(ys) - pad),
                    min(w, max(xs) + pad),
                    min(h, max(ys) + pad),
                )
            )
            blobs.append(trim_alpha(crop))

    blobs.sort(key=lambda b: (b.height * b.width), reverse=True)
    return blobs


def save_sticker(img: Image.Image, path: Path, min_side: int = 36) -> bool:
    img = trim_alpha(img)
    if min(img.width, img.height) < min_side:
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    return True


def copy_source(name: str, src: Path) -> None:
    SOURCES.mkdir(parents=True, exist_ok=True)
    dest = SOURCES / f"{name}{src.suffix.lower()}"
    if not dest.exists():
        Image.open(src).save(dest, quality=95)


def main() -> None:
    manifest: list[dict] = []
    counter = 0

    for name, src in SOURCE_FILES.items():
        if not src.exists():
            print(f"SKIP missing: {src}")
            continue
        copy_source(name, src)
        base = Image.open(src).convert("RGB")
        print(f"Processing {name} ({base.size})")

        if name == "chanel-patches":
            w, h = base.size
            halves = [base.crop((0, 0, w, h // 2 + 40)), base.crop((0, h // 2 - 40, w, h))]
            for i, part in enumerate(halves, start=1):
                sticker = remove_bg(part)
                counter += 1
                fname = f"chanel-patch-{i:02d}.png"
                if save_sticker(sticker, OUT / fname):
                    manifest.append({"id": fname.replace(".png", ""), "file": f"/stickers/{fname}", "group": "beauty"})

        elif name == "beauty-tray":
            sticker = remove_bg(base)
            counter += 1
            fname = "beauty-tray.png"
            if save_sticker(sticker, OUT / fname, min_side=80):
                manifest.append({"id": "beauty-tray", "file": f"/stickers/{fname}", "group": "beauty"})

        elif name == "skincare-grid":
            cells = split_grid(base, 4, 4, (30, 130, 30, 30))
            for i, cell in enumerate(cells, start=1):
                sticker = remove_bg(cell)
                counter += 1
                fname = f"skincare-{i:02d}.png"
                if save_sticker(sticker, OUT / fname):
                    manifest.append({"id": fname.replace(".png", ""), "file": f"/stickers/{fname}", "group": "skincare"})

        elif name == "makeup-grid":
            cells = split_grid(base, 5, 6, (20, 20, 20, 20))
            for i, cell in enumerate(cells, start=1):
                sticker = remove_bg(cell)
                counter += 1
                fname = f"makeup-{i:02d}.png"
                if save_sticker(sticker, OUT / fname):
                    manifest.append({"id": fname.replace(".png", ""), "file": f"/stickers/{fname}", "group": "makeup"})

        elif name == "pusy-collage":
            cells = split_grid(base, 3, 4, (10, 10, 10, 10))
            for i, cell in enumerate(cells, start=1):
                sticker = remove_bg(cell)
                counter += 1
                fname = f"pusy-{i:02d}.png"
                if save_sticker(sticker, OUT / fname, min_side=28):
                    manifest.append({"id": fname.replace(".png", ""), "file": f"/stickers/{fname}", "group": "pusy"})

        elif name == "lifestyle-flatlay":
            cleaned = remove_bg(base)
            blobs = extract_blobs(cleaned, min_area=2200)
            for i, blob in enumerate(blobs, start=1):
                counter += 1
                fname = f"lifestyle-{i:02d}.png"
                if save_sticker(blob, OUT / fname):
                    manifest.append({"id": fname.replace(".png", ""), "file": f"/stickers/{fname}", "group": "lifestyle"})

    manifest_path = OUT / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    src_manifest = ROOT / "src" / "data" / "stickers-manifest.json"
    src_manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Done: {len(manifest)} stickers saved to {OUT}")


if __name__ == "__main__":
    main()
