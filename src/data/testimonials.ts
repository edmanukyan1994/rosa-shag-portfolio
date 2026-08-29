import { Testimonial, Metric } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Алина Ковач",
    role: "Head of Growth",
    brand: "GlowLab Cosmetics",
    quote:
      "Удержание на хуке выросло на 38% в первую же неделю после запуска её UGC. Она понимает paid social лучше, чем большинство медиабайеров.",
  },
  {
    id: "t2",
    name: "Марко Феррейра",
    role: "Основатель",
    brand: "Nuvéa Beauty",
    quote:
      "Быстрая сдача, ноль микроменеджмента. Прислала три варианта хука ещё до того, как мы попросили — это редкость.",
  },
  {
    id: "t3",
    name: "Софи Лоран",
    role: "Performance Marketing Lead",
    brand: "Bellamie Skincare",
    quote:
      "Мы масштабировали одну рекламу с $50/день до $4k/день почти полностью на её тестовом пакете. Один из лучших криейторов, с кем работали.",
  },
  {
    id: "t4",
    name: "Даниэла Коста",
    role: "Бренд-менеджер",
    brand: "Lumière Cosmetics",
    quote:
      "Эстетика как у полноценной продакшн-съёмки, а сдаёт за дни, а не недели. Наши in-feed размещения ещё никогда не выглядели так хорошо.",
  },
];

export const metrics: Metric[] = [
  { id: "m1", value: "12M+", label: "Просмотров", hint: "На всех брендовых кампаниях" },
  { id: "m2", value: "+45%", label: "Средний рост CTR", hint: "vs. лучшая реклама бренда" },
  { id: "m3", value: "38%", label: "Удержание на хуке", hint: "3-секундный просмотр" },
  { id: "m4", value: "60+", label: "Брендов", hint: "Beauty, fashion & lifestyle" },
];
