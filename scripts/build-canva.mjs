// Genera HTML autocontenido (CSS + logo inline) en dist/canva/ para importarlo
// a Canva con import-design-from-url. Uso: node scripts/build-canva.mjs
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist', 'canva');
mkdirSync(dist, { recursive: true });

const brandCss = readFileSync(join(root, 'brand', 'brand.css'), 'utf8');

// El logo se referencia como PNG hospedado: los <img> rasterizados importan
// fielmente a Canva, mientras que el texto SVG con contornos se degrada.
const RAW = 'https://raw.githubusercontent.com/alvarogpp12/las5caras-design-system/master';
const LOGO_PNG = `${RAW}/assets/logo/logo.png`;

function inline(html) {
  return html
    // CSS -> <style>
    .replace(/<link[^>]*href="[^"]*brand\.css"[^>]*>/i, `<style>\n${brandCss}\n</style>`)
    // logo.svg -> PNG hospedado (mantiene el <img>)
    .replace(/(["'])[^"']*logo\.svg\1/gi, `$1${LOGO_PNG}$1`);
}

const targets = [
  ['templates/carrusel/index.html', 'carrusel.html'],
  ['templates/youtube/thumbnail.html', 'youtube-miniatura.html'],
  ['templates/youtube/banner.html', 'youtube-banner.html'],
  ['templates/recursos/index.html', 'recursos.html'],
  ...readdirSync(join(root, 'templates', 'reels'))
    .filter(f => f.endsWith('.html') && f !== 'all.html')
    .map(f => [`templates/reels/${f}`, `reel-${f}`]),
];

for (const [src, outName] of targets) {
  const html = readFileSync(join(root, src), 'utf8');
  writeFileSync(join(dist, outName), inline(html));
  console.log('✓', outName);
}
console.log(`\n✓ ${targets.length} archivos autocontenidos en dist/canva/`);
