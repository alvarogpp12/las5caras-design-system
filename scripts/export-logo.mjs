// Renderiza el logo a PNG transparente (para usarlo como imagen en Canva).
// Uso: node scripts/export-logo.mjs
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import puppeteer from 'puppeteer-core';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
mkdirSync(join(root, 'assets', 'logo'), { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 840, height: 400, deviceScaleFactor: 4 });
await page.goto(pathToFileURL(join(root, 'assets', 'logo', 'logo.svg')).href, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
// recorta al contenido visible del SVG
const el = await page.$('svg');
await el.screenshot({ path: join(root, 'assets', 'logo', 'logo.png'), omitBackground: true });
await browser.close();
console.log('✓ assets/logo/logo.png (transparente)');
