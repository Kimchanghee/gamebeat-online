// Build-time OG images: GameBeat equipment-bench identity, 1200x630.
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import { parse } from 'yaml';
import { site } from '../src/site.config.ts';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function wrap(text, max) {
  const words = String(text).split(/\s+/); const lines = []; let cur = '';
  for (const w of words) { if ((cur + ' ' + w).trim().length > max) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }
  if (cur.trim()) lines.push(cur.trim());
  return lines.slice(0, 4);
}
function svg({ code, title, sub }) {
  const t = wrap(title, 30);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#edf0ed"/>
  <rect x="48" y="48" width="1104" height="534" fill="#fff" stroke="#8da39a" stroke-width="2"/>
  <rect x="48" y="48" width="12" height="534" fill="#166347"/>
  <text x="96" y="110" font-family="Consolas,monospace" font-size="24" fill="#166347">${esc(code)}</text>
  <line x1="96" y1="138" x2="1100" y2="138" stroke="#8da39a"/>
  ${t.map((l,i)=>`<text x="96" y="${224+i*66}" font-family="Arial,sans-serif" font-size="53" font-weight="700" fill="#182b29">${esc(l)}</text>`).join('')}
  <line x1="96" y1="505" x2="1100" y2="505" stroke="#8da39a"/>
  <text x="96" y="550" font-family="Consolas,monospace" font-size="23" fill="#465b57">${esc(sub)}</text>
</svg>`;
}
function out(path, data) {
  mkdirSync(path.split('/').slice(0, -1).join('/'), { recursive: true });
  const png = new Resvg(svg(data), { fitTo: { mode: 'width', value: 1200 }, font: { loadSystemFonts: true } }).render().asPng();
  writeFileSync(path, png);
}
out('public/og/home.png', { code: 'GAMEBEAT / LOADOUT BENCH', title: 'Build a loadout that fits.', sub: 'gamebeat.online · buying checklists, no prices' });
let n = 1;
for (const c of site.categories) { out(`public/og/category/${c.slug}.png`, { code: `LOADOUT ${c.code} · ${c.name.toUpperCase()}`, title: c.seoTitle.split(':')[0], sub: 'gamebeat.online · checklists, no prices' }); n++; }
const dir = 'src/content/guides';
if (existsSync(dir)) for (const f of readdirSync(dir)) {
  if (!f.endsWith('.md') || f.startsWith('_')) continue;
  const fm = parse(readFileSync(`${dir}/${f}`, 'utf8').split(/^---\s*$/m)[1]);
  out(`public/og/guides/${fm.slug}.png`, { code: `${String(fm.category).toUpperCase()} · CHECKLIST`, title: fm.title, sub: `gamebeat.online · facts checked ${fm.data_asof}` });
  n++;
}
const pdir = 'src/content/posts';
if (existsSync(pdir)) for (const f of readdirSync(pdir)) {
  if (!f.endsWith('.md') || f.startsWith('_')) continue;
  const fm = parse(readFileSync(`${pdir}/${f}`, 'utf8').split(/^---\s*$/m)[1]);
  out(`public/og/picks/${fm.slug}.png`, { code: `${String(fm.category).toUpperCase()} · PICK`, title: fm.title, sub: `gamebeat.online · link checked ${String(fm.product?.verifiedAt ?? '').slice(0, 10)}` });
  n++;
}
console.log(`og: wrote ${n} images`);
