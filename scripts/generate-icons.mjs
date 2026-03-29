import fs from "fs";
import path from "path";
import { createCanvas, loadImage } from "canvas";

const INPUT_DIR = "./public/icons";
const OUTPUT_FILE = "./src/generated/icons.ts";

const GRID_SIZE = 32;

// Convert image → matrix
async function imageToMatrix(filePath) {
    const img = await loadImage(filePath);

    const canvas = createCanvas(GRID_SIZE, GRID_SIZE);
    const ctx = canvas.getContext("2d");

    // Calculate scaling to preserve aspect ratio and add a 2px padding
    const padding = 2;
    const targetSize = GRID_SIZE - (padding * 2);
    const scale = targetSize / Math.max(img.width, img.height);

    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    const offsetX = padding + (targetSize - scaledWidth) / 2;
    const offsetY = padding + (targetSize - scaledHeight) / 2;

    // High quality scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Draw + downscale
    ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

    const { data } = ctx.getImageData(0, 0, GRID_SIZE, GRID_SIZE);

    const matrix = [];

    for (let y = 0; y < GRID_SIZE; y++) {
        const row = [];

        for (let x = 0; x < GRID_SIZE; x++) {
            const i = (y * GRID_SIZE + x) * 4;

            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            // For full color PNGs and SVG line-art the best mask is the alpha channel
            // or rejecting completely white background pixels.
            if (a < 128) {
                row.push(0);
            } else if (r > 240 && g > 240 && b > 240) {
                // Ignore very bright/white pixels (helps with solid white backgrounds if any)
                row.push(0);
            } else {
                row.push(1);
            }
        }

        matrix.push(row);
    }

    return matrix;
}

// Main
async function run() {
    const files = fs.readdirSync(INPUT_DIR);

    const icons = {};

    for (const file of files) {
        if (!file.match(/\.(png|svg)$/)) continue;

        const name = path.parse(file).name;
        const fullPath = path.join(INPUT_DIR, file);

        console.log(`Processing ${file}...`);

        const matrix = await imageToMatrix(fullPath);
        icons[name] = matrix;
    }

    let content = "{\n";
    for (const [key, matrix] of Object.entries(icons)) {
        content += `  "${key}": [\n`;
        for (const row of matrix) {
            content += `    [${row.join(", ")}],\n`;
        }
        content += "  ],\n";
    }
    content += "}";

    const output = `// AUTO-GENERATED FILE
export const ICONS = ${content} as const;
`;

    fs.writeFileSync(OUTPUT_FILE, output);

    console.log("✅ icons.ts generated");
}

run();