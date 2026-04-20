export type IconShapeKey =
  | "faq"
  | "musica"
  | "utilidades"
  | "color"
  | "organizar"
  | "fcpx"
  | "recursos"
  | "computer"
  | "astro";

export const ALL_ICON_SHAPES: IconShapeKey[] = [
  "faq",
  "musica",
  "utilidades",
  "color",
  "organizar",
  "fcpx",
  "recursos",
  "computer",
  "astro",
];

const TITLE_MAP: Record<string, IconShapeKey> = {
  faq: "faq",
  musica: "musica",
  "música": "musica",
  utilidades: "utilidades",
  color: "color",
  "gestion de color": "color",
  organizar: "organizar",
  organizart: "organizar",
  "final cut pro": "fcpx",
  recursos: "recursos",
  computer: "computer",
  ordenador: "computer",
  astro: "astro",
  blog: "astro",
};

export const PALETTES: Record<"home" | IconShapeKey, { hue: number; saturation: number; lightness: number }> = {
  home: { hue: 220, saturation: 24, lightness: 36 },
  faq: { hue: 45, saturation: 92, lightness: 42 },
  musica: { hue: 286, saturation: 90, lightness: 54 },
  utilidades: { hue: 210, saturation: 86, lightness: 46 },
  color: { hue: 220, saturation: 84, lightness: 50 },
  organizar: { hue: 140, saturation: 88, lightness: 38 },
  fcpx: { hue: 320, saturation: 92, lightness: 58 },
  recursos: { hue: 178, saturation: 80, lightness: 36 },
  computer: { hue: 28, saturation: 90, lightness: 50 },
  astro: { hue: 336, saturation: 92, lightness: 54 },
};

export function titleToIconShape(value: string) {
  const lower = value.toLowerCase();
  for (const [keyword, shape] of Object.entries(TITLE_MAP)) {
    if (lower.includes(keyword)) return shape;
  }

  return "astro";
}
