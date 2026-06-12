/**
 * One-shot: turn raw uploads in incoming/ into web-res content images.
 * - Renames UUID/camera filenames to work slugs
 * - Resizes to max 2200px long edge (masters stay in incoming/, gitignored)
 * - Converts everything to quality-90 JPEG, metadata stripped
 * - Removes the old placeholder works
 *
 * Usage: node scripts/process-incoming.mjs
 */
import sharp from 'sharp';
import { mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const IN = 'incoming';
const OUT = 'src/content/works/images';
const MAX = 2200;

// source file -> slug. Duplicates intentionally omitted:
// 8D41238B (re-export of 1C8E74B3), B43B289E (re-export of 51A388B7)
const works = {
  'golden-dress.JPEG': 'vestito-doro',
  '51A388B7-FA08-427D-ADA8-C739E028580C.jpg': 'il-velo',
  '64AE461A-4EB3-4421-8E50-0227C19424BB.jpg': 'autunno',
  'CF514B27-7550-4AE7-9C7B-F053A5541434.jpg': 'ombrellino',
  'FB54895C-5D61-479A-B572-F88A18A48820.jpg': 'fiocco',
  'FF4D63AD-FE43-4205-90EE-8CD7AB444AAF.jpg': 'tradizione',
  '97C4FD71-B6EE-4A7B-A285-1D6C0A3A55C6.jpg': 'oro',
  'A49C3A8C-8820-49B8-A6C4-1739E27F19FD.jpg': 'brace',
  '16667E29-7D23-4AAB-B11F-522B19F92C05.jpg': 'fiamma',
  '1C8E74B3-4D32-4D85-A065-E7CD302F46DC.jpg': 'celeste',
  'CF330462-5BA7-490D-93B2-5CA5BB4C3A19.jpg': 'vestito-rosso',
  '98383355-2BEF-45D4-9978-EE219D95768D.jpg': 'lilla',
  '323DC489-0650-4DCB-9385-9C0C9B48B85E.jpg': 'lavanda',
  '80E26BED-11EC-43DE-B637-BBBD3830FAC5.jpg': 'volpe',
  'IMG_0249.JPG': 'il-lupo-bianco',
  'jessica-1 (1).png': 'jessica',
  'IMG_0265.JPEG': 'elfa-in-rosa',
  'IMG_0255.JPG': 'frieren',
  'F94AEB7D-9267-4848-A5FA-36A2B7FA4638.jpg': 'invisibile',
  'AB2D9998-2DC5-4B51-95AF-6C90EF6B02A7.jpg': 'studio-in-blu',
  '30F76C80-5B5B-470E-8345-45977ED72AF1.jpg': 'mille',
};

const placeholders = [
  'studio-di-luce',
  'ritratto-in-ombra',
  'paesaggio-toscano',
  'madonna-moderna',
];

await mkdir(OUT, { recursive: true });

for (const [src, slug] of Object.entries(works)) {
  const out = path.join(OUT, `${slug}.jpg`);
  const img = sharp(path.join(IN, src)).rotate();
  const meta = await img.metadata();
  const dims = `${meta.width} × ${meta.height} px`;
  await img
    .resize(MAX, MAX, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(out);
  console.log(`${slug}.jpg  (source ${dims})`);
}

for (const slug of placeholders) {
  await unlink(`src/content/works/${slug}.md`).catch(() => {});
  await unlink(path.join(OUT, `${slug}.jpg`)).catch(() => {});
  console.log(`removed placeholder ${slug}`);
}
