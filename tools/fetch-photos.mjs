// Preuzima po jednu fotografiju s Pexelsa (besplatno) za svaku imenicu iz kursa.
// Pokreće ga GitHub Actions ("Fotografije") ili ručno: PEXELS_API_KEY=... node tools/fetch-photos.mjs
// Pretraga ide po turskoj riječi (Pexels podržava turski), pa fotografije treba pregledati.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const APP = path.join(ROOT, 'app');
const KEY = process.env.PEXELS_API_KEY;
const REPLACE = (process.env.REPLACE || '').toLowerCase().startsWith('d');
if (!KEY) { console.error('Nedostaje PEXELS_API_KEY.'); process.exit(1); }

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(APP, 'data/course.js'), 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync(path.join(APP, 'data/daily.js'), 'utf8'), ctx);
const course = ctx.window.COURSE;
const daily = ctx.window.DAILY || {};

const slug = (s) => s.toLowerCase().replace(/č|ć/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z').replace(/đ/g, 'dj').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const photosPath = path.join(APP, 'photos.json');
const photos = fs.existsSync(photosPath) ? JSON.parse(fs.readFileSync(photosPath, 'utf8')) : {};
fs.mkdirSync(path.join(APP, 'img'), { recursive: true });

// Samo konkretne imenice; dani u sedmici i apstraktne riječi ostaju s ilustracijom.
const SKIP = new Set(['ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota', 'nedjelja', 'posao', 'sedmica', 'dan', 'cijena', 'zadaća', 'iskustvo', 'zdravlje', 'budućnost', 'cilj', 'plan', 'riječ', 'pitanje', 'odgovor', 'godina', 'jezik']);
const words = course.units.flatMap((u) => u.words).concat(daily.n || []).filter((w) => w[3] === 'n' && !SKIP.has(w[0]));

let added = 0;
for (const w of words) {
  const [bs, tr] = w;
  if (photos[bs] && !REPLACE) continue;
  const q = tr.split(',')[0].trim();
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&locale=tr-TR&per_page=1&orientation=landscape`;
  try {
    const r = await fetch(url, { headers: { Authorization: KEY } });
    if (!r.ok) { console.log(`! ${bs}: HTTP ${r.status}`); continue; }
    const j = await r.json();
    const p = j.photos && j.photos[0];
    if (!p) { console.log(`- ${bs}: nema rezultata za "${q}"`); continue; }
    const img = await fetch(p.src.medium);
    const file = `img/${slug(bs)}.jpg`;
    fs.writeFileSync(path.join(APP, file), Buffer.from(await img.arrayBuffer()));
    photos[bs] = { file, author: p.photographer, url: p.url };
    added++;
    console.log(`+ ${bs} (${q}) – ${p.photographer}`);
    await new Promise((res) => setTimeout(res, 400));
  } catch (e) {
    console.log(`! ${bs}: ${e.message}`);
  }
}
fs.writeFileSync(photosPath, JSON.stringify(photos, null, 2) + '\n');
console.log(`Gotovo: ${added} novih fotografija, ukupno ${Object.keys(photos).length}.`);
