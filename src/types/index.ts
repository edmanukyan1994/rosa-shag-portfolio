export type VideoFormat =
  | "all"
  | "before-after"
  | "problem-solution"
  | "unboxing"
  | "talking-head"
  | "picks"
  | "grwm"
  | "vlog"
  | "asmr"
  | "honest-review"
  | "tutorial"
  | "pov"
  | "time-result"
  | "aesthetic"
  | "lifehack"
  | "funny"
  | "inspiring-recipes"
  | "beauty-aesthetic"
  | "hair-care"
  | "humor";

export interface VideoItem {
  id: string;
  title: string;
  client: string;
  format: Exclude<VideoFormat, "all">;
  formatTag: string;
  thumbnail: string;
  videoSrc?: string;
  metric?: string;
  durationLabel?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  brand: string;
  quote: string;
  avatar?: string;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  hint?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceHint: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  tiers: PricingTier[];
}
