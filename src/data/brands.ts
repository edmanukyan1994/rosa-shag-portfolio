export interface Brand {
  id: string;
  name: string;
  /** Placeholder gradient until real logo is provided */
  colorFrom: string;
  colorTo: string;
  logoSrc?: string;
}

export const brands: Brand[] = [
  { id: "glowlab", name: "GlowLab", colorFrom: "#ffc8dc", colorTo: "#e75480" },
  { id: "nuvea", name: "Nuvéa", colorFrom: "#f5d0e0", colorTo: "#c96b8a" },
  { id: "bellamie", name: "Bellamie", colorFrom: "#ffe0ec", colorTo: "#d87098" },
  { id: "lumiere", name: "Lumière", colorFrom: "#ffd6e4", colorTo: "#b85c7a" },
  { id: "amelie", name: "Amélie", colorFrom: "#f8c4d4", colorTo: "#a84868" },
  { id: "noir", name: "Studio Noir", colorFrom: "#e8c0cc", colorTo: "#8a3d55" },
  { id: "purederm", name: "PureDerm", colorFrom: "#fce4ec", colorTo: "#d06088" },
  { id: "vellure", name: "Vellure", colorFrom: "#f0b8cc", colorTo: "#c05078" },
];
