// Povezuje prijave iz aplikacije s vašom Google formom.
// Upotreba: node tools/set-feedback.mjs "https://docs.google.com/forms/d/e/.../viewform?usp=pp_url&entry.111=1&entry.222=2..."
// Link se dobije u formi: ⋮ → "Nabavi unaprijed popunjeni link" → popunite sva polja → "Nabavi link".
// Pitanja u formi moraju biti ovim redom: Vrsta, Sadržaj, Komentar, Jezik, Lekcija, Verzija.
import fs from 'node:fs';
import path from 'node:path';

const link = process.argv[2];
if (!link) { console.error('Upotreba: node tools/set-feedback.mjs "<unaprijed popunjeni link forme>"'); process.exit(1); }
const u = new URL(link);
const m = u.pathname.match(/\/forms\/d\/e\/([^/]+)\//);
if (!m) { console.error('Ovo ne izgleda kao link Google forme (forms/d/e/…).'); process.exit(1); }
const ids = [...u.searchParams.keys()].filter((k) => k.startsWith('entry.')).map((k) => k.slice(6));
const names = ['type', 'content', 'comment', 'lang', 'lesson', 'version'];
if (ids.length < names.length) { console.error(`Link ima ${ids.length} polja, a treba ih 6. Popunite sva polja prije "Nabavi link".`); process.exit(1); }
const fields = Object.fromEntries(names.map((n, i) => [n, ids[i]]));
const cfg = { formUrl: `https://docs.google.com/forms/d/e/${m[1]}/formResponse`, fields };
const out = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../app/feedback.json');
fs.writeFileSync(out, JSON.stringify(cfg, null, 2) + '\n');
console.log('✓ app/feedback.json:', cfg);
console.log('Sada commit i push. Prijave će stizati u vašu Google tabelu.');
