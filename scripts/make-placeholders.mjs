/**
 * Generates placeholder "paintings" for the works collection until real
 * exports replace them. Old-master-ish color fields with vignette + grain.
 *
 * Usage: node scripts/make-placeholders.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('src/content/works/images');

const placeholders = [
  { slug: 'studio-di-luce', w: 1600, h: 2000, base: '#3a2c1c', glow: '#c08a4a' },
  { slug: 'ritratto-in-ombra', w: 1600, h: 2200, base: '#241d18', glow: '#9a5a3c' },
  { slug: 'paesaggio-toscano', w: 2200, h: 1500, base: '#2c3026', glow: '#b89a55' },
  { slug: 'madonna-moderna', w: 1700, h: 2100, base: '#1f2233', glow: '#7a86b0' },
];

function svgFor({ w, h, base, glow }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <radialGradient id="light" cx="42%" cy="34%" r="75%">
        <stop offset="0%" stop-color="${glow}" stop-opacity="0.9"/>
        <stop offset="55%" stop-color="${base}"/>
        <stop offset="100%" stop-color="#0d0b08"/>
      </radialGradient>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer><feFuncA type="linear" slope="0.07"/></feComponentTransfer>
        <feComposite operator="over" in2="SourceGraphic"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#light)" filter="url(#grain)"/>
    <text x="50%" y="52%" text-anchor="middle" font-family="Georgia, serif"
      font-style="italic" font-size="${Math.round(w / 22)}" fill="#ece5d8" fill-opacity="0.35">
      placeholder
    </text>
  </svg>`;
}

await mkdir(OUT_DIR, { recursive: true });
for (const p of placeholders) {
  const file = path.join(OUT_DIR, `${p.slug}.jpg`);
  await sharp(Buffer.from(svgFor(p))).jpeg({ quality: 88 }).toFile(file);
  console.log('wrote', file);
}
