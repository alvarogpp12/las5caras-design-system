// Genera HTML autocontenido (CSS + logo inline) en dist/canva/ para importarlo
// a Canva con import-design-from-url. Uso: node scripts/build-canva.mjs
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist', 'canva');
mkdirSync(dist, { recursive: true });

const brandCss = readFileSync(join(root, 'brand', 'brand.css'), 'utf8');
let logoSvg = readFileSync(join(root, 'assets', 'logo', 'logo.svg'), 'utf8')
  .replace(/<\?xml[^>]*\?>/, '').trim();
// Inyecta class="logo" en el <svg> raíz del logo
logoSvg = logoSvg.replace(/<svg /, '<svg class="logo" ');

function inline(html) {
  return html
    // CSS -> <style>
    .replace(/<link[^>]*href="[^"]*brand\.css"[^>]*>/i, `<style>\n${brandCss}\n</style>`)
    // <img ... logo.svg ...> -> SVG inline
    .replace(/<img[^>]*src="[^"]*logo\.svg"[^>]*>/gi, logoSvg);
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
