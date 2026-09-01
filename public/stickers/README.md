# Стикеры сайта

Коллекция декоративных PNG с прозрачным фоном.

## Файлы

- `sticker-01.png` … `sticker-27.png` — готовые стикеры
- `manifest.json` — список для сайта (копия в `src/data/stickers-manifest.json`)

## Как обновить

1. Положите новые PNG в эту папку (или замените существующие)
2. Обновите `manifest.json` и `src/data/stickers-manifest.json` в том же формате:

```json
{
  "id": "sticker-01",
  "file": "/stickers/sticker-01.png",
  "group": "custom"
}
```

Размещение на сайте: `src/components/decorative/SiteStickers.tsx`
