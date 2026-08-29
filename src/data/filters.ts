import { VideoFormat } from "@/types";

export const filterTabs: { id: VideoFormat; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "before-after", label: "До/После" },
  { id: "problem-solution", label: "Проблема/Решение" },
  { id: "unboxing", label: "Распаковка" },
  { id: "talking-head", label: "Говорящая голова" },
  { id: "picks", label: "Подборки" },
  { id: "grwm", label: "GRWM" },
  { id: "vlog", label: "Vlog" },
  { id: "asmr", label: "ASMR" },
  { id: "honest-review", label: "Честный отзыв" },
  { id: "tutorial", label: "Туториал" },
  { id: "pov", label: "POV" },
  { id: "time-result", label: "Результат через время" },
  { id: "aesthetic", label: "Эстетика" },
  { id: "lifehack", label: "Лайфхак" },
  { id: "funny", label: "Юморной" },
];
