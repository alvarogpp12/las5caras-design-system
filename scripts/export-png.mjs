// Exporta cada plantilla a PNG a resolución nativa usando el Chrome del sistema.
// Uso: npm run export      (requiere: npm i)
import { mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, basename } from 'node:path';
import puppeteer from 'puppeteer-core';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'exports');
mkdirSync(out, { recursive: true });

const CHROME = process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// Archivos a exportar (cada uno puede contener varias .canvas)
const reels = readdirSync(join(root, 'templates', 'reels'))
  .filter(f => f.endsWith('.html') && f !== 'all.html')
  .map(f => `templates/reels/${f}`);

const files = [
  'templates/carrusel/index.html',
  ...reels,
  'templates/youtube/thumbnail.html',
  'templates/youtube/banner.html',
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--force-device-scale-factor=2', '--no-sandbox'],
});

let n = 0;
for (const rel of files) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(join(root, rel)).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  const canvases = await page.$$('.canvas');
  const stem = rel.replace(/[\/]/g, '_').replace('.html', '');
  for (let i = 0; i < canvases.length; i++) {
    const name = canvases.length > 1 ? `${stem}__${i + 1}.png` : `${stem}.png`;
    await canvases[i].screenshot({ path: join(out, name) });
    n++;
  }
  await page.close();
  console.log('✓', rel, `(${canvases.length})`);
}
await browser.close();
console.log(`\n✓ ${n} PNG exportados en exports/`);
