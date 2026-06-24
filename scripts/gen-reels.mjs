// Genera las 8 portadas de reel (1080x1920), una por categoría.
// Uso: node scripts/gen-reels.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'templates', 'reels');
mkdirSync(outDir, { recursive: true });

// slug, etiqueta, icono (assets/icons), titular y subtítulo de ejemplo, live?
const CATS = [
  ['ultima-hora','Última hora','fire','EL ÚLTIMO GIRO QUE NADIE VIO VENIR','Lo que está pasando ahora mismo y de lo que todo el mundo habla.', true],
  ['exclusiva','Exclusiva','star','LO CONTAMOS NOSOTROS PRIMERO','Una exclusiva que adelanta lo que mañana será portada.', false],
  ['trending','Trending','fire','EL TEMA QUE ARRASA EN REDES','Sube como la espuma: te lo resumimos en 10 segundos.', false],
  ['deportes','Deportes','ball','PELEA VALVERDE Y TCHOUAMÉNI','Lo último en el Real Madrid no tiene que ver con el césped… sino con el vestuario.', false],
  ['musica','Música','music','EL DROP QUE ROMPE EL VERANO','Nuevo lanzamiento, colaboración sorpresa y números de récord.', false],
  ['television','Televisión','tv','ISA PANTOJA SUELTA VARIOS BOMBAZOS','"Mi madre me ha escrito". Después de seis años sin hablarse.', false],
  ['famosos','Famosos','star','EL FICHAJE QUE REVOLUCIONA EL CORAZÓN','El rostro del momento protagoniza la historia más comentada.', false],
  ['viral','Viral','fire','EL VÍDEO QUE NO PUEDES PARAR DE VER','Millones de reproducciones en horas. Y no es para menos.', false],
];

const icon = (name) => {
  // Inline simple para que el badge muestre el icono (currentColor).
  const map = {
    fire:  `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 6c4 16-6 24-14 32C28 46 22 54 22 66a28 28 0 0 0 56 0c0-14-8-22-14-30-3 6-7 9-11 9 6-14-3-30-3-39z"/></svg>`,
    star:  `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 6l12.4 25.1 27.7 4-20 19.5 4.7 27.6L50 69.2 25.2 82.2l4.7-27.6-20-19.5 27.7-4z"/></svg>`,
    ball:  `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="7"><circle cx="50" cy="50" r="40"/><path d="M50 28l17 12-6 20H39l-6-20z" fill="currentColor" stroke="none"/></svg>`,
    music: `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M82 14a4 4 0 0 0-5-4L40 21a5 5 0 0 0-4 5v40a16 16 0 1 0 8 14V40l30-9v23a16 16 0 1 0 8 14z"/></svg>`,
    tv:    `<svg viewBox="0 0 100 100" fill="currentColor"><path d="M44 26 22 12a5 5 0 0 0-6 8l13 9H24a8 8 0 0 0-8 8v37a8 8 0 0 0 8 8h52a8 8 0 0 0 8-8V37a8 8 0 0 0-8-8H61l13-9a5 5 0 0 0-6-8L46 26z"/></svg>`,
  };
  return map[name] || map.star;
};

const page = (c) => {
  const [slug,label,ic,titular,subtitulo,live] = c;
  const liveDot = live ? `<span class="live-dot"></span>` : `<span class="bicon">${icon(ic)}</span>`;
  return `
<section class="canvas canvas--reel reel" data-document-role="page" data-label="${label}">
  <div class="photo-ph">FOTO</div>
  <div class="photo" data-field="foto" style="display:none"></div>
  <img class="logo" src="../../assets/logo/logo.svg" alt="Las 5 caras del día">
  <div class="scrim"></div>
  <div class="content">
    <span class="badge" data-cat="${slug}" data-field="categoria">${liveDot}${label.toUpperCase()}</span>
    <h1 class="headline" data-field="titular">${titular}</h1>
    <p class="subhead" data-field="subtitulo">${subtitulo}</p>
  </div>
</section>`;
};

const STYLE = `
  body{background:#555}
  .reel{background:#0D0D0D}
  .reel .photo-ph{position:absolute;inset:0;background:linear-gradient(160deg,#2b2b2b,#141414);
     display:flex;align-items:center;justify-content:center;font-family:var(--f-label);font-weight:800;color:#4f4f4f;font-size:64px}
  .reel .logo{position:absolute;top:60px;left:64px;width:320px;height:auto;filter:drop-shadow(0 6px 18px rgba(0,0,0,.5))}
  .reel .scrim{background:linear-gradient(to top,rgba(0,0,0,.95) 6%,rgba(0,0,0,.55) 34%,rgba(0,0,0,0) 60%)}
  .reel .content{position:absolute;left:64px;right:64px;bottom:130px}
  .reel .badge{font-size:34px;margin-bottom:30px}
  .reel .badge .bicon{width:1.15em;height:1.15em;display:inline-block}
  .reel .badge .bicon svg{width:100%;height:100%;display:block}
  .reel .badge .live-dot{display:inline-block}
  .reel .headline{font-size:118px;color:#fff;text-shadow:var(--shadow-text)}
  .reel .subhead{font-size:42px;margin-top:30px;max-width:880px;text-shadow:0 1px 4px rgba(0,0,0,.6)}
`;

const doc = (body, title, extra='') => `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>${title}</title>
<link rel="stylesheet" href="../../brand/brand.css">
<style>${STYLE}${extra}</style></head>
<body>
${body}
</body></html>`;

// Un archivo por categoría (para importar individualmente a Canva)
for (const c of CATS) {
  writeFileSync(join(outDir, `${c[0]}.html`), doc(page(c), `Reel — ${c[1]}`));
}
// Galería con las 8
writeFileSync(join(outDir, `all.html`), doc(CATS.map(page).join('\n'), 'Reels — todas las categorías'));

console.log(`✓ ${CATS.length} portadas de reel generadas en templates/reels/`);
