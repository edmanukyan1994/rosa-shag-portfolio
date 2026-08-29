# Rosa_shag — UGC Portfolio

Портфолио UGC-креатора **Манукян Роза** (Rosa_shag). Next.js 15, React 19, Tailwind v4.

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Деплой на Railway

1. Создайте новый проект на [Railway](https://railway.app) → **Deploy from GitHub repo**
2. Выберите репозиторий `rosa-shag-portfolio`
3. Railway автоматически определит Next.js
4. Build command: `npm run build`
5. Start command: `npm run start`
6. После деплоя добавьте свой домен в настройках сервиса

> Видео лежат в `public/videos/**/web/` — они включены в репозиторий (~130 MB).

## Шаринг видео

Каждое видео открывается по ссылке вида:

```
https://ваш-домен/?v=unbox-1
```

Кнопка **«Поделиться»** в модалке копирует эту ссылку (или открывает системный share на мобилке).

## Структура

- `src/data/videos.ts` — каталог роликов
- `src/data/brands.ts` — бренды (лого добавляются в `logoSrc`)
- `public/videos/` — web-версии mp4
- `public/images/thumbnails/` — превью
