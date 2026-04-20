import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import type { IconShapeKey } from "./ascii-config";

const ICON_FILES: Record<IconShapeKey, string> = {
  faq: "faq.png",
  musica: "musica.svg",
  utilidades: "utilidades.svg",
  color: "DaVinci_Resolve_Studio.png",
  organizar: "organizar.svg",
  fcpx: "fcpx.png",
  recursos: "recursos.svg",
  computer: "computer.svg",
  astro: "astro.svg",
};

const iconDir = fileURLToPath(new URL("../../public/icons/", import.meta.url));
const shapeCache = new Map<string, Promise<Set<string>>>();
const isDev = Boolean((import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV);

function keyFor(x: number, y: number) {
  return `${x}:${y}`;
}

async function rasterizeIcon(iconPath: string, gridSize: number) {
  const sampleScale = 8;
  const sampleSize = gridSize * sampleScale;
  const padding = sampleScale * 2;
  const targetSize = sampleSize - padding * 2;

  const { data } = await sharp(iconPath)
    .resize(targetSize, targetSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: padding,
      right: padding,
      bottom: padding,
      left: padding,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const activeCells = new Set<string>();

  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      let filledPixels = 0;

      for (let sy = 0; sy < sampleScale; sy += 1) {
        for (let sx = 0; sx < sampleScale; sx += 1) {
          const sampleX = x * sampleScale + sx;
          const sampleY = y * sampleScale + sy;
          const index = (sampleY * sampleSize + sampleX) * 4;
          const red = data[index];
          const green = data[index + 1];
          const blue = data[index + 2];
          const alpha = data[index + 3];

          if (alpha < 32) continue;
          if (red > 245 && green > 245 && blue > 245) continue;

          filledPixels += 1;
        }
      }

      if (filledPixels / (sampleScale * sampleScale) >= 0.18) {
        activeCells.add(keyFor(x, y));
      }
    }
  }

  return activeCells;
}

export async function getIconShapeCells(shape: IconShapeKey, gridSize: number) {
  const cacheKey = `${shape}:${gridSize}`;

  if (!isDev && shapeCache.has(cacheKey)) {
    return shapeCache.get(cacheKey)!;
  }

  const promise = rasterizeIcon(path.join(iconDir, ICON_FILES[shape]), gridSize);

  if (!isDev) {
    shapeCache.set(cacheKey, promise);
  }

  return promise;
}
