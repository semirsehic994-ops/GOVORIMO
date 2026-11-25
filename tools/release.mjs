// Priprema novu verziju aplikacije.
//   node tools/release.mjs 1.1.0                 → nova verzija sadržaja (iPhone i Android dobiju je automatski)
//   node tools/release.mjs 1.1.0 --apk           → i novi Android APK (korisnici dobiju obavještenje)
//   node tools/release.mjs 1.1.0 "Yeni ünite" "وحدة جديدة"   → napomena na turskom i arapskom
// Zatim: commit i push na granu main. Ostalo radi GitHub Actions ("Objava").
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const ver = args.find((a) => /^\d+\.\d+\.\d+$/.test(a));
const apk = args.includes('--apk');
const notes = args.filter((a) => a !== ver && a !== '--apk');
if (!ver) { console.error('Upotreba: node tools/release.mjs 1.1.0 [--apk] ["napomena tr"] ["napomena ar"]'); process.exit(1); }

const edit = (rel, fn) => { const p = path.join(ROOT, rel); fs.writeFileSync(p, fn(fs.readFileSync(p, 'utf8'))); console.log('✓', rel); };

edit('app/app.js', (s) => s.replace(/const APP_VERSION = '[^']*'/, `const APP_VERSION = '${ver}'`));
edit('app/sw.js', (s) => s.replace(/const VERSION = '[^']*'/, `const VERSION = '${ver}'`));
edit('app/data/course.js', (s) => s.replace(/version: "[^"]*"/, `version: "${ver}"`));

let vc = null;
if (apk) {
  edit('android/version.properties', (s) => {
    const cur = Number((s.match(/versionCode=(\d+)/) || [0, 0])[1]);
    vc = cur + 1;
    return s.replace(/versionCode=\d+/, `versionCode=${vc}`).replace(/versionName=.*/, `versionName=${ver}`);
  });
}
edit('app/version.json', (s) => {
  const v = JSON.parse(s);
  v.version = ver;
  if (notes[0]) v.notes = { tr: notes[0], ar: notes[1] || notes[0] };
  if (apk) { v.android.versionCode = vc; v.android.versionName = ver; }
  return JSON.stringify(v, null, 2) + '\n';
});
console.log(`\nVerzija ${ver} spremna${apk ? ` (APK versionCode ${vc})` : ''}. Sada commit i push na main.`);
