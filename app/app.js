/* Govorimo – aplikacija za učenje bosanskog jezika (PWA, radi i u Android WebView ljusci). */
(function () {
  'use strict';
  const APP_VERSION = '1.3.1'; // mijenja ga tools/release.mjs
  // TTS_ON: aplikacija izgovara riječi (isključeno dok bosanski glas nije dovoljno dobar; za uključivanje stavite true).
  // STT_ON: korisnik govori, a aplikacija ocjenjuje izgovor (uključeno).
  const TTS_ON = false;
  const STT_ON = true;
  // Adresa s #novi-korisnik: pregled kao prvi put, u odvojenoj memoriji (pravi napredak se ne dira).
  const DEMO = location.hash === '#novi-korisnik';
  const KEY = DEMO ? 'govorimo.demo' : 'govorimo.v1';
  if (DEMO) { try { localStorage.removeItem(KEY); } catch (e) {} }
  const C = window.COURSE;
  const I = window.I18N;
  const Android = window.GovorimoAndroid || null;
  const $app = document.getElementById('app');

  /* ───────────── Stanje (čuva se samo na uređaju) ───────────── */
  function defaults() {
    return { lang: null, view: 'home', xp: 0, streak: 0, lastDay: null, done: {}, learned: {}, seenTags: {}, forms: {},
      reminder: { on: true, time: '19:00' }, rate: 1, lessonsDone: 0, correct: 0, answered: 0, fbQueue: [], daily: null, dailyPtr: { n: 0, v: 0, adj: 0, adv: 0, other: 0 } };
  }
  let S = load();
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); return Object.assign(defaults(), s || {}); }
    catch (e) { return defaults(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* privatni način rada */ } }
  const L = () => I[S.lang || 'tr'];
  const nat = (o) => o[S.lang || 'tr'];

  /* ───────────── Pomoćne funkcije ───────────── */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pad = (n) => String(n).padStart(2, '0');
  const dayStr = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const today = () => dayStr(new Date());
  const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); };
  const PUNCT = /[.,!?;:«»"“”()¿¡]/g;
  function norm(s) {
    return String(s).toLowerCase().replace(/đ/g, 'dj').normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  const strict = (s) => String(s).toLowerCase().replace(PUNCT, '').replace(/\s+/g, ' ').trim();
  function lev(a, b) {
    const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }
  const sim = (a, b) => { a = norm(a); b = norm(b); const mx = Math.max(a.length, b.length); return mx ? 1 - lev(a, b) / mx : 0; };

  /* ───────────── Model kursa ───────────── */
  function parse(raw) {
    const re = /\{([^}]*)\}/g; const parts = []; const marks = []; let last = 0; let m;
    while ((m = re.exec(raw))) {
      let before = raw.slice(last, m.index);
      const sm = before.match(/[^\s.,!?;:«»"“”()]*$/); const stem = sm ? sm[0] : '';
      before = before.slice(0, before.length - stem.length);
      if (before) parts.push({ t: before });
      const f = m[1].split('|');
      const mk = { stem, end: f[0] || '', tag: f[1] || '', base: f[2] || '' };
      mk.word = mk.stem + mk.end;
      parts.push(mk); marks.push(mk);
      last = re.lastIndex;
    }
    if (last < raw.length) parts.push({ t: raw.slice(last) });
    const plain = parts.map((p) => (p.t != null ? p.t : p.word)).join('');
    return { parts, marks, plain };
  }
  const WORDS = {}; const UNITS = []; const LESSONS = [];
  // Jedinice se slažu po nivou (A1 → B2); unutar nivoa ostaje redoslijed iz course.js.
  const LEVEL_ORDER = { A1: 0, A2: 1, B1: 2, B2: 3 };
  C.units.map((u, i) => [u, i]).sort((a, b) => (LEVEL_ORDER[a[0].level] - LEVEL_ORDER[b[0].level]) || (a[1] - b[1])).map((x) => x[0]).forEach((u, ui) => {
    const words = u.words.map((a) => {
      const w = { id: a[0], bs: a[0], tr: a[1], ar: a[2], pos: a[3], g: a[4], img: a[5], unit: u.id };
      WORDS[w.id] = w; return w;
    });
    const sents = u.sents.map((a, si) => Object.assign({ id: u.id + 's' + si, raw: a[0], tr: a[1], ar: a[2], unit: u.id }, parse(a[0])));
    UNITS.push(Object.assign({}, u, { idx: ui, words, sents }));
  });
  UNITS.forEach((u) => { for (let k = 0; k < 4; k++) LESSONS.push({ id: u.id + '-' + k, unit: u, k }); });
  // Riječi dana (data/daily.js): zasebna zbirka, po kategorijama.
  const DAILY_KEYS = ['n', 'v', 'adj', 'adv', 'other'];
  const DAILY_POOL = {};
  DAILY_KEYS.forEach((k) => {
    DAILY_POOL[k] = ((window.DAILY || {})[k] || []).filter((a) => !WORDS[a[0]]).map((a) => {
      const w = { id: a[0], bs: a[0], tr: a[1], ar: a[2], pos: a[3], g: a[4], img: a[5], unit: 'daily', level: a[6] || 'A1' };
      WORDS[w.id] = w; return w.id;
    });
  });
  const unitById = (id) => UNITS.find((u) => u.id === id);

  function markedHTML(p) {
    return p.parts.map((x) => (x.t != null ? esc(x.t)
      : `<button class="form" data-act="hint" data-tag="${esc(x.tag)}">${esc(x.stem)}<span class="end">${esc(x.end)}</span></button>`)).join('');
  }
  function exHTML(str) {
    const p = parse(str);
    return p.parts.map((x) => (x.t != null ? esc(x.t) : `${esc(x.stem)}<span class="end">${esc(x.end)}</span>`)).join('');
  }
  function recordForms(p) {
    p.marks.forEach((mk) => {
      if (!mk.base || !WORDS[mk.base] || !mk.tag) return;
      const f = S.forms[mk.base] || (S.forms[mk.base] = {});
      f[mk.word.toLowerCase()] = mk.tag;
    });
  }

  /* ───────────── Fotografije (Pexels) ili emoji ───────────── */
  let PHOTOS = {};
  fetch('photos.json').then((r) => (r.ok ? r.json() : {})).then((j) => { PHOTOS = j || {}; if (S.view !== 'lesson') render(); }).catch(() => {});
  function picHTML(w, h, credit) {
    const p = PHOTOS[w.id];
    if (p && p.file) {
      return `<div class="pic" style="height:${h}px"><img src="${esc(p.file)}" alt="">${credit && p.author ? `<span class="credit">${esc(L().photo)}: ${esc(p.author)} · Pexels</span>` : ''}</div>`;
    }
    const num = /^[0-9]+$/.test(w.img);
    return `<div class="pic" style="height:${h}px" aria-hidden="true"><span class="${num ? 'num' : 'emo'}" style="font-size:${Math.round(h * (num ? 0.45 : 0.55))}px">${esc(w.img)}</span></div>`;
  }

  /* ───────────── Ikone ───────────── */
  const sv = (d, s = 24, sw = 2.4, extra = '') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  const IC = {
    x: (s) => sv('<path d="M6 6l12 12M18 6L6 18"/>', s, 2.6),
    spk: (s) => sv('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>', s),
    slow: (s) => sv('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M10 2h4"/>', s),
    mic: (s) => sv('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>', s),
    check: (s) => sv('<path d="M5 12.5l4.5 4.5L19 7.5"/>', s, 3.2),
    lock: (s) => sv('<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', s),
    star: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17l-5.9 3.2 1.3-6.6L2.5 9l6.6-.8z" fill="currentColor"/></svg>`,
    trophy: (s) => sv('<path d="M7 4h10v4a5 5 0 0 1-10 0V4zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M10 13h4v4h-4zM7.5 17h9v3h-9z"/>', s, 2),
    home: (s) => sv('<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>', s, 2.2),
    book: (s) => sv('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M9 8h6"/>', s, 2.2),
    user: (s) => sv('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>', s, 2.2),
    search: (s) => sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>', s),
    arrow: (s) => sv('<path d="M4 12h16M14 6l6 6-6 6"/>', s, 2.6),
    dl: (s) => sv('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>', s, 2.6),
    bell: (s) => sv('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21h4"/>', s),
    clock: (s) => sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', s),
    globe: (s) => sv('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>', s),
    info: (s) => sv('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/>', s),
    chat: (s) => sv('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>', s, 2.2),
    refresh: (s) => sv('<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>', s, 2.4),
    flag: (s) => sv('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>', s, 2.4),
    target: (s) => sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>', s, 2.2),
    chev: (s) => sv('<path d="M9 6l6 6-6 6"/>', s, 2.6),
    ok: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#16A34A"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    bad: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#DC2626"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>`,
    flame: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z" fill="#FFB020"/><path d="M12 13c1 1.5 3 2.5 3 5a3 3 0 0 1-6 0c0-1.5 1-2.5 1.5-3 .3 1 .8 1.5 1.5 1.5 0-1.5-.5-2.5 0-3.5z" fill="#F97316"/></svg>`,
    bolt: (s) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17l-5.9 3.2 1.3-6.6L2.5 9l6.6-.8z" fill="#3B82F6"/></svg>`
  };

  /* ───────────── Glas: izgovor (TTS) i prepoznavanje govora ───────────── */
  const Speech = {
    voice: null, pending: {}, warned: false,
    init() {
      if (Android || !('speechSynthesis' in window)) return;
      const pick = () => {
        const vs = speechSynthesis.getVoices();
        for (const p of ['bs', 'hr', 'sr', 'sl']) {
          const v = vs.find((x) => x.lang && x.lang.toLowerCase().replace('_', '-').startsWith(p));
          if (v) { this.voice = v; break; }
        }
      };
      pick(); speechSynthesis.onvoiceschanged = pick;
    },
    speak(text, slow) {
      if (!TTS_ON) return;
      const rate = (slow ? 0.6 : 1) * (S.rate || 1);
      if (Android && Android.speak) { try { Android.speak(text, rate); } catch (e) {} return; }
      if (!('speechSynthesis' in window)) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (this.voice) { u.voice = this.voice; u.lang = this.voice.lang; } else u.lang = 'hr-HR';
      u.rate = rate;
      speechSynthesis.speak(u);
      if (this.voice && !this.voice.lang.toLowerCase().startsWith('bs') && !this.warned) { this.warned = true; toast(L().voiceMissing); }
    },
    canListen() { if (!STT_ON) return false; return !!(Android && Android.listen) || !!(window.SpeechRecognition || window.webkitSpeechRecognition); },
    listen() {
      return new Promise((resolve, reject) => {
        if (Android && Android.listen) { const id = 'r' + Date.now(); this.pending[id] = { resolve, reject }; Android.listen(id); return; }
        const R = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!R) { reject('unsupported'); return; }
        let done = false;
        const run = (lang, fallback) => {
          const r = new R(); let handled = false;
          r.lang = lang; r.interimResults = false; r.maxAlternatives = 5; r.continuous = false;
          r.onresult = (e) => {
            if (done) return; done = true; const alts = [];
            for (const res of e.results) for (let i = 0; i < res.length; i++) alts.push(res[i].transcript);
            resolve(alts);
          };
          r.onerror = (e) => {
            handled = true;
            if ((e.error === 'language-not-supported' || e.error === 'bad-grammar') && fallback) { run(fallback, null); return; }
            if (!done) { done = true; reject(e.error || 'error'); }
          };
          r.onend = () => { setTimeout(() => { if (!done && !handled) { done = true; reject('no-speech'); } }, 400); };
          try { r.start(); } catch (err) { if (!done) { done = true; reject('start'); } }
        };
        run('bs-BA', 'hr-HR');
      });
    }
  };
  window.__govorimoSpeech = function (id, json) {
    const p = Speech.pending[id]; if (!p) return; delete Speech.pending[id];
    let d; try { d = typeof json === 'string' ? JSON.parse(json) : json; } catch (e) { d = { ok: false, error: 'parse' }; }
    if (d && d.ok) p.resolve(d.results || []); else p.reject((d && d.error) || 'error');
  };
  function scorePron(target, alts) {
    let best = '', score = 0;
    alts.forEach((a) => { const s = sim(a, target); if (s > score) { score = s; best = a; } });
    const heard = norm(best).split(' ');
    const words = target.replace(PUNCT, '').split(/\s+/).filter(Boolean).map((w) => {
      const n = norm(w); const ok = heard.some((h) => h === n || (n.length > 3 && lev(h, n) <= 1));
      return { w, ok };
    });
    return { score, best, words };
  }

  /* ───────────── Pravljenje lekcija ───────────── */
  function distract(w, n) {
    const key = S.lang;
    let pool = shuffle((unitById(w.unit) || { words: Object.values(WORDS).filter((x) => x.unit === w.unit && x.pos === w.pos) }).words.filter((x) => x.id !== w.id && x[key] !== w[key]));
    if (pool.length < n) {
      const extra = shuffle(Object.values(WORDS).filter((x) => x.pos === w.pos && x.id !== w.id && x[key] !== w[key] && !pool.includes(x)));
      pool = pool.concat(extra);
    }
    if (pool.length < n) pool = pool.concat(shuffle(Object.values(WORDS).filter((x) => x.id !== w.id && !pool.includes(x))));
    return pool.slice(0, n);
  }
  function withOpts(ex) { const o = shuffle([ex.w].concat(distract(ex.w, 3))); ex.opts = o; ex.ans = o.indexOf(ex.w); return ex; }
  const tokensOf = (s) => s.replace(PUNCT, '').split(/\s+/).filter(Boolean);
  function buildEx(s) {
    const toks = tokensOf(s.plain);
    const lower = toks.map((t) => t.toLowerCase());
    const others = shuffle(unitById(s.unit).sents.filter((x) => x.id !== s.id).flatMap((x) => tokensOf(x.plain)))
      .filter((t, i, a) => !lower.includes(t.toLowerCase()) && a.findIndex((y) => y.toLowerCase() === t.toLowerCase()) === i);
    return { type: 'build', s, tokens: toks, bank: shuffle(toks.concat(others.slice(0, 2))) };
  }
  const speakable = (w) => w.bs.replace(PUNCT, '').length >= 3;
  function buildLesson(Ls) {
    const u = Ls.unit; const W = u ? u.words : []; const half = Math.ceil(W.length / 2); const q = [];
    if (Ls.k === 'daily') {
      const ws = (S.daily ? S.daily.ids : []).map((id) => WORDS[id]).filter(Boolean);
      ws.forEach((w) => { q.push({ type: 'intro', w }); q.push(withOpts({ type: 'pick', w })); });
      shuffle(ws).forEach((w) => q.push(withOpts({ type: 'trans', w })));
      shuffle(ws).slice(0, 2).forEach((w) => q.push({ type: 'write', w }));
      // ponavljanje jučerašnjih riječi
      const prev = ((S.daily && S.daily.prev) || []).map((id) => WORDS[id]).filter(Boolean);
      shuffle(prev).slice(0, 3).forEach((w) => q.push(withOpts({ type: 'listen', w })));
      const sp = shuffle(ws.filter(speakable))[0]; if (sp) q.push({ type: 'speak', text: sp.bs, w: sp });
    } else if (Ls.k === 'review') {
      const ws = shuffle(Object.keys(S.learned).map((id) => WORDS[id]).filter(Boolean));
      ws.slice(0, 3).forEach((w) => q.push({ type: 'write', w }));
      ws.slice(3, 6).forEach((w) => q.push(withOpts({ type: 'listen', w })));
      ws.slice(6, 10).forEach((w) => q.push(withOpts({ type: 'trans', w })));
      ws.slice(10, 12).forEach((w) => q.push(withOpts({ type: 'pick', w })));
      shuffle(UNITS.filter((x) => S.done[x.id + '-3']).flatMap((x) => x.sents)).slice(0, 3).forEach((x) => q.push(buildEx(x)));
      const sp = shuffle(ws.filter(speakable))[0]; if (sp) q.push({ type: 'speak', text: sp.bs, w: sp });
    } else if (Ls.k === 0 || Ls.k === 1) {
      const set = Ls.k === 0 ? W.slice(0, half) : W.slice(half);
      set.forEach((w) => { q.push({ type: 'intro', w }); q.push(withOpts({ type: 'pick', w })); });
      shuffle(set).forEach((w) => q.push(withOpts({ type: 'trans', w })));
      shuffle(set).slice(0, 3).forEach((w) => q.push(withOpts({ type: 'listen', w })));
      shuffle(set).slice(0, 2).forEach((w) => q.push({ type: 'write', w }));
      const sp = shuffle(set.filter(speakable))[0]; if (sp) q.push({ type: 'speak', text: sp.bs, w: sp });
    } else if (Ls.k === 2) {
      const seen = Object.assign({}, S.seenTags);
      u.sents.forEach((s) => {
        const fresh = [...new Set(s.marks.map((m) => m.tag).filter((t) => t && !seen[t]))];
        if (fresh.length) { fresh.forEach((t) => { seen[t] = true; }); q.push({ type: 'form', s, fresh }); }
        q.push(buildEx(s));
      });
      shuffle(u.sents).slice(0, 2).forEach((s) => q.push({ type: 'speak', text: s.plain, s }));
    } else {
      const ws = shuffle(W);
      ws.slice(0, 3).forEach((w) => q.push({ type: 'write', w }));
      ws.slice(3, 6).forEach((w) => q.push(withOpts({ type: 'listen', w })));
      ws.slice(6, 9).forEach((w) => q.push(withOpts({ type: 'trans', w })));
      const prev = UNITS.slice(0, u.idx).flatMap((x) => x.words);
      shuffle(prev).slice(0, 2).forEach((w) => q.push(withOpts({ type: 'pick', w })));
      shuffle(u.sents).slice(0, 3).forEach((s) => q.push(buildEx(s)));
      const sp = shuffle(W.filter(speakable))[0]; if (sp) q.push({ type: 'speak', text: sp.bs, w: sp });
    }
    // Bez izgovora aplikacije slušanje postaje prevod; bez prepoznavanja govora otpadaju vježbe izgovora.
    for (let i = q.length - 1; i >= 0; i--) {
      if (!STT_ON && q[i].type === 'speak') q.splice(i, 1);
      else if (!TTS_ON && q[i].type === 'listen') q[i].type = 'trans';
    }
    q.forEach((ex, i) => { ex.key = Ls.id + ':' + i; });
    return q;
  }

  /* ───────────── Riječi dana ───────────── */
  // Svaki dan po jedna riječ iz svake kategorije. Nezavršene riječi čekaju; novih nikad nije više od 5.
  // Nivo korisnika = nivo jedinice na kojoj trenutno uči (poslije svih jedinica: B2).
  function userLevel() { const fu = firstUndone(); return fu < LESSONS.length ? LESSONS[fu].unit.level : 'B2'; }
  function nextDailyIds() {
    const out = []; const cur = LEVEL_ORDER[userLevel()];
    const busy = new Set((S.daily && S.daily.ids) || []);
    DAILY_KEYS.forEach((k) => {
      const free = DAILY_POOL[k].filter((id) => !S.learned[id] && !busy.has(id));
      // prvo riječi njegovog nivoa, zatim lakše (od najbližeg), na kraju teže
      const at = (lv) => free.find((id) => LEVEL_ORDER[WORDS[id].level] === lv);
      let pick = at(cur);
      for (let lv = cur - 1; !pick && lv >= 0; lv--) pick = at(lv);
      for (let lv = cur + 1; !pick && lv <= 3; lv++) pick = at(lv);
      if (pick) out.push(pick);
    });
    return out;
  }
  function ensureDaily() {
    const t = today();
    if (!S.daily || (S.daily.done && S.daily.date !== t)) {
      const prev = S.daily ? S.daily.ids : [];
      S.dailyPtr = Object.assign({ n: 0, v: 0, adj: 0, adv: 0, other: 0 }, S.dailyPtr || {});
      S.daily = { date: t, ids: nextDailyIds(), done: false, prev };
      save();
    }
  }
  function dailyHTML() {
    const t = L(); const d = S.daily; if (!d) return '';
    const ws = d.ids.map((id) => WORDS[id]).filter(Boolean);
    let h = `<div style="margin:14px 20px 0;padding:16px 18px;border-radius:22px;background:#FFF7E6;border:2px solid #FCD9A8;display:flex;flex-direction:column;gap:12px">
      <div class="row gap10"><span style="font-size:26px" aria-hidden="true">☀️</span><div class="col grow"><span style="font-size:19px;font-weight:900">${esc(t.dailyTitle)}</span>
      <span class="muted small">${esc(!ws.length ? t.dailyEmpty : d.done ? t.dailyDone : (d.date !== today() ? t.dailyWaiting : t.dailySub))}</span></div></div>`;
    if (ws.length) {
      h += `<div class="row gap8" style="flex-wrap:wrap">${ws.map((w) => `<span class="chip" style="background:#fff;border:2px solid #FCD9A8;gap:6px"><span aria-hidden="true">${esc(/^[0-9½]+$/.test(w.img) ? '#' : w.img)}</span>${d.done ? `<span class="bs">${esc(w.bs)}</span>` : esc(t.pos[w.pos])}</span>`).join('')}</div>`;
      h += d.done ? `<button class="tbtn" style="background:#fff" data-act="openLesson" data-id="daily">${esc(t.dailyReplay)}</button>`
        : `<button class="btn" style="background:#C2410C;box-shadow:0 5px 0 #7C2D12" data-act="openLesson" data-id="daily">${esc(t.dailyStart)}</button>`;
    }
    return h + '</div>';
  }

  /* ───────────── Napredak ───────────── */
  const firstUndone = () => { const i = LESSONS.findIndex((x) => !S.done[x.id]); return i < 0 ? LESSONS.length : i; };
  const curStreak = () => (S.lastDay === today() || S.lastDay === yesterday() ? S.streak : 0);
  const level = () => Math.floor(S.xp / 100) + 1;

  /* ───────────── Ažuriranja (service worker + Android APK) ───────────── */
  const UPD = { reg: null, ready: false, apk: null, remote: null };
  function applyUpdate() { const w = UPD.reg && UPD.reg.waiting; UPD.requested = true; if (w) w.postMessage('skipWaiting'); else location.reload(); }
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    let reloading = false;
    // Ponovo učitaj samo kad smo sami tražili novu verziju (ne pri prvoj instalaciji).
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloading || !UPD.requested) return; reloading = true; location.reload(); });
    navigator.serviceWorker.register('sw.js').then((reg) => {
      UPD.reg = reg;
      const onReady = () => { UPD.ready = true; if (S.view !== 'lesson') applyUpdate(); else render(); };
      if (reg.waiting && navigator.serviceWorker.controller) onReady();
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (nw) nw.addEventListener('statechange', () => { if (nw.state === 'installed' && navigator.serviceWorker.controller) onReady(); });
      });
      setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
    }).catch(() => {});
  }
  function checkRemote(manual) {
    return fetch('version.json?t=' + Date.now(), { cache: 'no-store' }).then((r) => r.json()).then((v) => {
      UPD.remote = v;
      if (Android && Android.getVersionCode && v.android && v.android.versionCode > Android.getVersionCode()) UPD.apk = v.android;
      if (manual) {
        if (UPD.reg) UPD.reg.update().catch(() => {});
        if (!UPD.apk && v.version === APP_VERSION) toast(L().upToDate);
      }
      render();
    }).catch(() => { if (manual) toast(L().upToDate); });
  }

  /* ───────────── Prikaz ───────────── */
  let LS = null; // trenutna lekcija
  let UI = { dictQ: '', dictF: 'all', open: null, tmpLang: null, scrolled: false };
  function go(view) { S.view = view; save(); if (view === 'home' && UPD.ready) { applyUpdate(); return; } window.scrollTo(0, 0); render(); }
  function setDir() {
    document.body.classList.toggle('notts', !TTS_ON);
    const lang = S.lang || 'tr';
    document.documentElement.lang = lang; document.documentElement.dir = I[lang].dir; document.body.dir = I[lang].dir;
  }
  function render() {
    setDir();
    if (!S.lang) { $app.innerHTML = onboardingHTML(); return; }
    let h = '';
    if (S.view === 'lesson' && LS) h = lessonHTML();
    else if (S.view === 'result' && LS) h = resultHTML();
    else if (S.view === 'dict') h = dictHTML();
    else if (S.view === 'start') h = startHTML();
    else if (S.view === 'placement' && PT) h = PT.done ? placeResultHTML() : placeHTML();
    else if (S.view === 'profile') h = profileHTML();
    else { S.view = 'home'; h = homeHTML(); }
    $app.innerHTML = h;
    if (S.view === 'home' && !UI.scrolled) {
      UI.scrolled = true;
      // Ako riječi dana čekaju, ostani na vrhu da se kartica vidi; inače idi na trenutnu lekciju.
      const waiting = S.daily && !S.daily.done && S.daily.ids.length;
      const n = document.querySelector('.node.cur'); if (n && !waiting) n.scrollIntoView({ block: 'center' });
    }
    if (S.view === 'lesson' && LS) afterLessonRender();
  }
  function navHTML(on) {
    const b = (v, icon, label) => `<button data-act="nav" data-v="${v}" class="${on === v ? 'on' : ''}">${icon}${esc(label)}</button>`;
    return `<nav class="nav" aria-label="menu">${b('home', IC.home(26), L().nav.path)}${b('dict', IC.book(26), L().nav.dict)}${b('profile', IC.user(26), L().nav.profile)}</nav>`;
  }

  function onboardingHTML() {
    const sel = UI.tmpLang;
    const t = I[sel || 'tr'];
    return `<div class="screen" style="background:#F4FBF7"><div class="pad col gap24 grow" style="padding-top:48px">
      <div class="col center gap14">
        <svg width="104" height="104" viewBox="0 0 112 112" role="img" aria-label="Govorimo"><circle cx="56" cy="56" r="56" fill="#0F7F4F"/><path d="M30 40c0-8 6-14 14-14h24c8 0 14 6 14 14v16c0 8-6 14-14 14H52l-14 12v-12c-5-2-8-7-8-14V40z" fill="#fff"/><circle cx="46" cy="48" r="5" fill="#1F2937"/><circle cx="66" cy="48" r="5" fill="#1F2937"/><path d="M48 58c4 4 12 4 16 0" stroke="#1F2937" stroke-width="4" stroke-linecap="round" fill="none"/><circle cx="86" cy="26" r="10" fill="#FFB020"/></svg>
        <div class="bs" style="font-size:34px;font-weight:900">Govorimo</div>
        <div class="muted" style="font-size:17px">Boşnakça öğren · <span dir="rtl" style="font-family:'Baloo Bhaijaan 2',sans-serif">تعلّم البوسنية</span></div>
      </div>
      <div class="col gap6"><div style="font-size:22px;font-weight:800">Ana dilini seç</div>
        <div dir="rtl" style="font-size:20px;font-weight:700;color:#4B5563;font-family:'Baloo Bhaijaan 2',sans-serif;text-align:right">اختر لغتك الأم</div></div>
      <div class="col gap14">
        <button class="langbtn ${sel === 'tr' ? 'on' : ''}" data-act="pickLang" data-v="tr" dir="ltr"><span class="code" style="color:#B91C1C">TR</span><span class="grow" style="text-align:left">Türkçe</span></button>
        <button class="langbtn ${sel === 'ar' ? 'on' : ''}" data-act="pickLang" data-v="ar" dir="rtl" style="font-family:'Baloo Bhaijaan 2',sans-serif"><span class="code">AR</span><span class="grow" style="text-align:right">العربية</span></button>
      </div>
      <div class="grow"></div>
      ${sel ? `<div class="muted center" dir="${t.dir}" style="font-size:15px">${esc(t.langNote)}</div>` : ''}
      <button class="btn" data-act="confirmLang" ${sel ? '' : 'disabled'} dir="${t.dir}">${esc(t.continue)}</button>
    </div></div>`;
  }

  function homeHTML() {
    const t = L(); const fu = firstUndone();
    const curL = LESSONS[Math.min(fu, LESSONS.length - 1)];
    let h = `<div class="screen"><div class="topbar">
      <div class="levelchip">${esc(t.levelName[curL.unit.level])}</div>
      <div class="row gap14"><div class="stat" style="color:#B45309">${IC.flame(22)}${curStreak()}</div><div class="stat" style="color:#1D4ED8">${IC.bolt(22)}${S.xp} XP</div>
        <button class="iconbtn" data-act="feedback" aria-label="${esc(t.feedbackTitle)}" title="${esc(t.feedbackTitle)}" style="background:#E3F5EC;color:#0F7F4F">${IC.chat(22)}</button></div>
    </div><div class="scroll">`;
    ensureDaily();
    h += bannersHTML();
    h += dailyHTML();
    let lastLevel = '';
    const offs = [-60, 40, 80, -10];
    UNITS.forEach((u) => {
      if (u.level !== lastLevel) { lastLevel = u.level; h += `<div class="levelhead">${esc(t.levelName[u.level])}</div>`; }
      const firstIdx = LESSONS.findIndex((x) => x.unit === u);
      const unitLocked = firstIdx > fu;
      h += `<div style="margin:12px 20px 0"><div class="unitcard ${unitLocked ? 'locked' : ''}"><div class="ico" aria-hidden="true">${u.icon}</div><div class="col"><div class="t1">${esc(t.unit)} ${u.idx + 1}</div><div class="t2"><span class="bs">${esc(u.title.bs)}</span> · ${esc(nat(u.title))}</div></div></div></div>`;
      h += '<div class="path">';
      for (let k = 0; k < 4; k++) {
        const i = firstIdx + k; const Ls = LESSONS[i];
        const st = S.done[Ls.id] ? 'done' : i === fu ? 'cur' : i < fu ? 'done' : 'lock';
        const icon = st === 'done' ? IC.check(32) : st === 'lock' ? IC.lock(28) : k === 3 ? IC.trophy(32) : IC.star(34);
        h += `<div class="nodewrap" style="margin-inline-start:${offs[k]}px">
          ${st === 'cur' ? `<div class="startbubble">${esc(t.start)}</div>` : ''}
          <button class="node ${st}" data-act="openLesson" data-id="${Ls.id}" aria-label="${esc(t.lessonNames[k])}">${icon}</button>
          <div class="nodelabel">${esc(t.lessonNames[k])}</div></div>`;
      }
      h += '</div>';
    });
    if (fu >= LESSONS.length) {
      h += `<div style="margin:18px 20px 0;padding:20px;border-radius:22px;background:#F5F3FF;border:2px solid #DDD6FE;display:flex;flex-direction:column;gap:12px;text-align:center">
        <div style="font-size:56px" aria-hidden="true">🏆</div><div style="font-size:22px;font-weight:900;color:#5B21B6">${esc(t.allDoneTitle)}</div>
        <div class="muted">${esc(t.allDoneSub)}</div><button class="btn purple" data-act="openLesson" data-id="review">${esc(t.mixedReview)}</button></div>`;
    }
    h += '<div style="height:24px"></div></div>' + navHTML('home') + '</div>';
    return h;
  }
  function bannersHTML() {
    const t = L(); let h = '';
    if (UPD.apk) {
      h += `<div class="updbanner"><div class="row gap12"><div style="width:44px;height:44px;border-radius:14px;background:#FFB020;color:#1F2937;display:flex;align-items:center;justify-content:center">${IC.dl(26)}</div>
        <div class="col"><span class="t">${esc(t.apkUpdate(UPD.apk.versionName || ''))}</span><span class="s">${esc((UPD.remote && UPD.remote.notes && nat(UPD.remote.notes)) || '')}</span></div></div>
        <button class="btn white" data-act="apkUpdate">${esc(t.updateBtn)}</button><span class="s">${esc(t.progressKept)}</span></div>`;
    } else if (UPD.ready) {
      h += `<div class="updbanner"><span class="t">${esc(t.updateReady)}</span><button class="btn white" data-act="applyUpdate">${esc(t.updateBtn)}</button><span class="s">${esc(t.progressKept)}</span></div>`;
    }
    const [hh, mm] = (S.reminder.time || '19:00').split(':').map(Number); const now = new Date();
    if (S.reminder.on && S.lastDay !== today() && (now.getHours() > hh || (now.getHours() === hh && now.getMinutes() >= mm))) {
      h += `<div class="banner">${esc(t.reminderToday)}</div>`;
    }
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !Android;
    const standalone = window.navigator.standalone || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
    if (ios && !standalone) h += `<div class="banner" style="background:#EFF6FF;border-color:#BFDBFE;color:#1E3A8A">${esc(t.installHint)}</div>`;
    return h;
  }

  /* ───────────── Lekcija ───────────── */
  function startLesson(id) {
    const Ls = id === 'daily' || id === 'review' ? { id, k: id, special: true } : LESSONS.find((x) => x.id === id);
    LS = { Ls, q: buildLesson(Ls), i: 0, xp: 0, firstOk: 0, graded: 0, failed: new Set(), counted: new Set(), newWords: new Set(), newTags: new Set() };
    resetEx(); S.view = 'lesson'; render(); window.scrollTo(0, 0);
  }
  function resetEx() { Object.assign(LS, { sel: -1, checked: false, result: null, typed: '', picked: [], pron: null, autoHint: false, spoken: false }); }
  const curEx = () => LS.q[LS.i];

  function lessonHTML() {
    const t = L(); const ex = curEx();
    const pct = Math.round((LS.i / LS.q.length) * 100);
    let body = ''; let foot = '';
    const chk = (dis) => `<div class="foot"><button class="btn" data-act="check" ${dis ? 'disabled' : ''}>${esc(t.check)}</button></div>`;
    const cont = () => `<div class="foot"><button class="btn" data-act="next">${esc(t.continue)}</button></div>`;
    switch (ex.type) {
      case 'intro': {
        const w = ex.w;
        body = `<div class="row gap8" style="color:#7C3AED;font-weight:900;font-size:15px">${IC.star(20)}${esc(t.newWord)}</div>
          <div class="card">${picHTML(w, 240, true).replace('class="pic"', 'class="pic" style="border-radius:0"')}
            <div class="col center gap8" style="padding:18px 16px 20px">
              <div class="bigword bs">${esc(w.bs)}</div>
              <div class="row gap8" style="flex-wrap:wrap;justify-content:center">
                ${w.g ? `<span class="chip ${w.g}"><span class="bs">${esc(t.genderBs[w.g])}</span>&nbsp;· ${esc(t.gender[w.g])}</span>` : ''}
                <span class="chip">${esc(t.pos[w.pos])}</span></div>
              <div style="font-size:20px;font-weight:700;color:#4B5563">${esc(nat(w))}</div></div></div>
          <div class="grid2"><button class="tbtn" data-act="say" data-text="${esc(w.bs)}">${IC.spk(24)}${esc(t.listen)}</button>
            ${Speech.canListen() ? `<button class="tbtn p" data-act="rec" data-text="${esc(w.bs)}">${IC.mic(24)}${esc(t.repeat)}</button>` : `<button class="tbtn" data-act="say" data-text="${esc(w.bs)}" data-slow="1">${IC.slow(24)}${esc(t.slow)}</button>`}</div>
          ${pronHTML()}`;
        foot = cont();
        break;
      }
      case 'pick': {
        body = `<h2 class="prompt">${esc(t.whichIs(nat(ex.w)))}</h2><div class="grid2">` + ex.opts.map((o, i) =>
          `<button class="opt ${optCls(i, ex)}" data-act="sel" data-i="${i}">${picHTML(o, 96)}<span class="bs">${esc(o.bs)}</span></button>`).join('') + '</div>';
        foot = LS.checked ? feedHTML() : chk(LS.sel < 0);
        break;
      }
      case 'trans': {
        body = `<h2 class="prompt">${esc(t.translateWord)}</h2>
          <div class="row gap14"><button class="tbtn" style="width:64px;height:64px;padding:0" data-act="say" data-text="${esc(ex.w.bs)}" aria-label="${esc(t.listen)}">${IC.spk(28)}</button>
          <div class="bigword bs" style="font-size:34px">${esc(ex.w.bs)}</div></div>
          <div class="col gap12">` + ex.opts.map((o, i) => `<button class="opt list ${optCls(i, ex)}" data-act="sel" data-i="${i}">${esc(nat(o))}</button>`).join('') + '</div>';
        foot = LS.checked ? feedHTML() : chk(LS.sel < 0);
        break;
      }
      case 'listen': {
        body = `<h2 class="prompt">${esc(t.listenPick)}</h2>
          <div class="row gap14 center"><button class="speaker" data-act="say" data-text="${esc(ex.w.bs)}" aria-label="${esc(t.listen)}">${IC.spk(56)}</button>
          <button class="tbtn" style="width:64px;height:64px;padding:0" data-act="say" data-text="${esc(ex.w.bs)}" data-slow="1" aria-label="${esc(t.slow)}">${IC.slow(28)}</button></div>
          <div class="grid2">` + ex.opts.map((o, i) => `<button class="opt ${optCls(i, ex)}" data-act="sel" data-i="${i}" style="min-height:72px;justify-content:center"><span class="bs">${esc(o.bs)}</span></button>`).join('') + '</div>';
        foot = LS.checked ? feedHTML() : chk(LS.sel < 0);
        break;
      }
      case 'write': {
        const cls = LS.checked ? (LS.result.ok ? 'ok' : 'bad') : '';
        body = `<h2 class="prompt">${esc(t.writeBs)}</h2>
          <div class="col center gap8" style="padding:14px;border-radius:24px;background:#FFF4E5">${picHTML(ex.w, 120)}<div style="font-size:24px;font-weight:900">${esc(nat(ex.w))}</div></div>
          <div class="col gap8"><label for="ans" class="muted small">${esc(t.yourAnswer)}</label>
            <input id="ans" class="input bs ${cls}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(t.typeHere)}" value="${esc(LS.typed)}" ${LS.checked ? 'readonly' : ''}></div>
          ${LS.checked ? '' : `<div class="col gap8"><div class="muted small">${esc(t.bsLetters)}</div><div class="keys">${['č', 'ć', 'đ', 'š', 'ž'].map((k) => `<button class="key" data-act="key" data-k="${k}">${k}</button>`).join('')}</div></div>`}`;
        foot = LS.checked ? feedHTML() : chk(!LS.typed.trim());
        break;
      }
      case 'build': {
        const used = new Set(LS.picked);
        body = `<h2 class="prompt">${esc(t.buildSent)}</h2>
          <div class="bubble"><button class="iconbtn" data-act="say" data-text="${esc(ex.s.plain)}" aria-label="${esc(t.listen)}" style="color:#1D4ED8">${IC.spk(22)}</button><span>${esc(nat(ex.s))}</span></div>
          <div><div class="answerline">${LS.picked.map((bi, pi) => `<button class="tok" data-act="unpick" data-p="${pi}" ${LS.checked ? 'disabled' : ''}>${esc(ex.bank[bi])}</button>`).join('')}</div><div class="answerline"></div></div>
          <div class="bank">${ex.bank.map((tk, bi) => `<button class="tok ${used.has(bi) ? 'used' : ''}" data-act="pickTok" data-b="${bi}" ${used.has(bi) || LS.checked ? 'disabled' : ''}>${esc(tk)}</button>`).join('')}</div>`;
        foot = LS.checked ? feedHTML() : chk(!LS.picked.length);
        break;
      }
      case 'speak': {
        const w = ex.w;
        body = `<h2 class="prompt">${esc(TTS_ON ? t.speakTitle : t.sayIt)}</h2>
          <div class="row gap14" style="padding:14px;border-radius:24px;border:2px solid var(--line)">
            ${w ? `<div style="width:96px">${picHTML(w, 96)}</div>` : ''}
            <div class="col gap6"><div class="bs" style="font-size:${ex.text.length > 18 ? 24 : 32}px;font-weight:900">${esc(ex.text)}</div>
            <div class="muted">${esc(w ? nat(w) : nat(ex.s))}</div></div></div>
          <div class="grid2"><button class="tbtn" data-act="say" data-text="${esc(ex.text)}">${IC.spk(22)}${esc(t.listen)}</button>
            <button class="tbtn" data-act="say" data-text="${esc(ex.text)}" data-slow="1">${IC.slow(22)}${esc(t.slow)}</button></div>
          ${Speech.canListen() ? `<div class="col center gap8"><button class="mic ${LS.pron && LS.pron.state === 'rec' ? 'rec' : ''}" data-act="rec" data-text="${esc(ex.text)}" aria-label="${esc(t.tapMic)}">${IC.mic(42)}</button>
            <div class="muted small">${esc(LS.pron && LS.pron.state === 'rec' ? t.listening : t.tapMic)}</div></div>` : `<div class="banner" style="margin:0">${esc(t.noStt)}</div>`}
          ${pronHTML()}`;
        const pass = LS.pron && LS.pron.state === 'done' && LS.pron.score >= 0.6;
        if (pass) foot = `<div class="foot ok"><div class="fh">${IC.ok(30)}${esc(LS.pron.score >= 0.8 ? t.pronGood : t.pronOk)}</div><button class="btn" data-act="speakDone">${esc(t.continue)}</button></div>`;
        else foot = `<div class="foot"><button class="btn ${Speech.canListen() ? 'ghost' : ''}" data-act="next">${esc(Speech.canListen() ? t.skip : t.continue)}</button></div>`;
        break;
      }
      case 'form': {
        const s = ex.s; const bw = s.marks.map((m) => WORDS[m.base]).find(Boolean);
        body = `<div class="row gap8" style="color:#7C3AED;font-weight:900;font-size:15px">${IC.star(20)}${esc(t.newForm)}</div>
          <div class="card">${bw ? picHTML(bw, 170).replace('class="pic"', 'class="pic" style="border-radius:0"') : ''}
            <div class="col gap6" style="padding:16px 18px"><div class="bs" style="font-size:28px;font-weight:900;line-height:1.35">${markedHTML(s)}</div>
            <div class="muted" style="font-size:18px">${esc(nat(s))}</div>
            <button class="tbtn" style="align-self:flex-start;margin-top:6px" data-act="say" data-text="${esc(s.plain)}">${IC.spk(22)}${esc(t.listen)}</button></div></div>
          <div class="muted small">${esc(t.tapAgain)}</div>`;
        foot = cont();
        break;
      }
    }
    return `<div class="screen"><div class="lessontop"><button class="iconbtn" data-act="quit" aria-label="${esc(t.quit)}">${IC.x(24)}</button><div class="bar"><div style="width:${pct}%"></div></div><button class="iconbtn" data-act="report" aria-label="${esc(t.report)}" title="${esc(t.report)}">${IC.flag(22)}</button></div>
      <div class="ex">${body}</div>${foot}</div>`;
  }
  function optCls(i, ex) {
    if (LS.checked) { if (i === ex.ans) return 'good'; if (i === LS.sel) return 'badsel'; return ''; }
    return i === LS.sel ? 'sel' : '';
  }
  function pronHTML() {
    const p = LS.pron; const t = L(); if (!p) return '';
    if (p.state === 'rec') return `<div class="pron"><div style="font-weight:900;color:#5B21B6">${esc(t.listening)}</div></div>`;
    if (p.state === 'err') return `<div class="banner" style="margin:0">${esc(p.msg)}</div>`;
    const pc = Math.round(p.score * 100);
    return `<div class="pron"><div class="row" style="justify-content:space-between"><div style="font-size:18px;font-weight:900;color:#5B21B6">${esc(t.yourPron)}</div><div style="font-size:26px;font-weight:900;color:#5B21B6">${pc}%</div></div>
      <div class="pronbar"><div style="width:${pc}%"></div></div>
      <div class="bs" style="font-size:22px;font-weight:900;display:flex;gap:8px;flex-wrap:wrap">${p.words.map((x) => `<span class="${x.ok ? 'w-ok' : 'w-bad'}">${esc(x.w)}</span>`).join('')}</div>
      ${p.score < 0.6 ? `<div class="muted">${esc(t.pronBad)}</div>` : ''}</div>`;
  }
  function feedHTML() {
    const t = L(); const ex = curEx(); const r = LS.result;
    let answer = '';
    if (ex.type === 'build') answer = `<span class="bs">${markedHTML(ex.s)}</span>`;
    else if (ex.type === 'trans') answer = `<span class="bs">${esc(ex.w.bs)}</span> = ${esc(nat(ex.w))}`;
    else answer = `<span class="bs">${esc(ex.w.bs)}</span> = ${esc(nat(ex.w))}`;
    if (r.ok) {
      const head = r.note ? t.accentNote : t.correct[Math.floor(Math.random() * t.correct.length)];
      return `<div class="foot ok"><div class="fh">${IC.ok(30)}${esc(head)}</div><div class="fb">${answer}</div><button class="btn" data-act="next">${esc(t.continue)}</button></div>`;
    }
    return `<div class="foot bad"><div class="fh">${IC.bad(30)}${esc(t.wrong)}</div><div class="fb">${answer}</div><button class="btn red" data-act="next">${esc(t.gotIt)}</button></div>`;
  }
  function afterLessonRender() {
    const ex = curEx();
    if (ex.type === 'intro' && !LS.spoken) {
      LS.spoken = true;
      if (!S.learned[ex.w.id]) { S.learned[ex.w.id] = today(); LS.newWords.add(ex.w.id); save(); }
      setTimeout(() => Speech.speak(ex.w.bs), 250);
    }
    if (ex.type === 'listen' && !LS.spoken) { LS.spoken = true; setTimeout(() => Speech.speak(ex.w.bs), 300); }
    if (ex.type === 'form' && !LS.autoHint) {
      LS.autoHint = true; recordForms(ex.s);
      ex.fresh.forEach((tg) => { S.seenTags[tg] = true; LS.newTags.add(tg); }); save();
      const at = LS.i;
      if (ex.fresh[0]) setTimeout(() => { if (LS && S.view === 'lesson' && LS.i === at) showHint(ex.fresh[0]); }, 350);
    }
    if (ex.type === 'write' && !LS.checked) { const el = document.getElementById('ans'); if (el) { el.focus(); const v = el.value; el.setSelectionRange(v.length, v.length); } }
  }
  function check() {
    const ex = curEx(); let ok = false; let note = false;
    if (ex.type === 'pick' || ex.type === 'trans' || ex.type === 'listen') ok = LS.sel === ex.ans;
    else if (ex.type === 'write') {
      const a = strict(LS.typed); const b = strict(ex.w.bs);
      ok = a === b; if (!ok && norm(a) === norm(b)) { ok = true; note = true; }
    } else if (ex.type === 'build') {
      ok = LS.picked.map((bi) => ex.bank[bi].toLowerCase()).join(' ') === ex.tokens.map((x) => x.toLowerCase()).join(' ');
    }
    LS.checked = true; LS.result = { ok, note };
    grade(ex, ok);
    if (ex.type === 'build') { recordForms(ex.s); save(); }
    if (ok) Speech.speak(ex.type === 'build' ? ex.s.plain : ex.w.bs);
    render();
  }
  function grade(ex, ok) {
    if (!LS.counted.has(ex.key)) {
      LS.counted.add(ex.key); LS.graded++; S.answered++;
      if (ok) { LS.firstOk++; S.correct++; LS.xp += 2; }
    }
    if (!ok && !LS.failed.has(ex.key)) {
      LS.failed.add(ex.key);
      const copy = Object.assign({}, ex);
      if (copy.opts) { copy.opts = shuffle(copy.opts); copy.ans = copy.opts.indexOf(copy.w); }
      if (copy.bank) copy.bank = shuffle(copy.bank);
      LS.q.push(copy);
    }
  }
  function next() {
    LS.i++;
    if (LS.i >= LS.q.length) { finishLesson(); return; }
    resetEx(); render(); window.scrollTo(0, 0);
  }
  function finishLesson() {
    const bonus = 5; LS.xp += bonus; S.xp += LS.xp;
    if (LS.Ls.special) { if (LS.Ls.k === 'daily' && S.daily) S.daily.done = true; }
    else { S.done[LS.Ls.id] = true; S.lessonsDone++; }
    const t = today();
    if (S.lastDay !== t) { S.streak = S.lastDay === yesterday() ? S.streak + 1 : 1; S.lastDay = t; }
    if (Android && Android.lessonDone) { try { Android.lessonDone(t); } catch (e) {} }
    save(); S.view = 'result'; render(); window.scrollTo(0, 0);
  }
  function resultHTML() {
    const t = L(); const acc = LS.graded ? Math.round((LS.firstOk / LS.graded) * 100) : 100;
    const lv = level(); const into = S.xp % 100;
    return `<div class="screen"><div class="pad col gap24 grow" style="padding-top:56px">
      <div class="col center"><svg width="190" height="170" viewBox="0 0 200 180" aria-hidden="true">
        <rect x="24" y="30" width="10" height="10" rx="2" fill="#FFB020" transform="rotate(20 29 35)"/><rect x="160" y="22" width="10" height="10" rx="2" fill="#3B82F6" transform="rotate(-15 165 27)"/>
        <rect x="170" y="96" width="8" height="8" rx="2" fill="#7C3AED"/><rect x="16" y="104" width="8" height="8" rx="2" fill="#0F7F4F"/><circle cx="44" cy="70" r="5" fill="#F472B6"/><circle cx="152" cy="62" r="5" fill="#16A34A"/>
        <path d="M62 30h76v34a38 38 0 0 1-76 0z" fill="#FFB020"/><path d="M62 40H44v8a22 22 0 0 0 22 22M138 40h18v8a22 22 0 0 1-22 22" stroke="#FFB020" stroke-width="8" fill="none"/>
        <rect x="90" y="100" width="20" height="26" fill="#E09400"/><rect x="66" y="126" width="68" height="20" rx="6" fill="#C27C00"/><path d="M100 44l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill="#fff"/></svg></div>
      <div class="col center gap6"><div style="font-size:30px;font-weight:900;color:#0F7F4F">${esc(t.lessonDone)}</div><div class="muted" style="font-size:17px">${esc(t.summary(LS.newWords.size, LS.newTags.size))}</div></div>
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px">
        <div class="statbox" style="border-color:#3B82F6"><div class="k" style="background:#3B82F6">${esc(t.totalXp)}</div><div class="v" style="color:#1D4ED8">+${LS.xp}</div></div>
        <div class="statbox" style="border-color:#16A34A"><div class="k" style="background:#16A34A">${esc(t.accuracy)}</div><div class="v" style="color:#15803D">${acc}%</div></div>
        <div class="statbox" style="border-color:#F59E0B"><div class="k" style="background:#F59E0B;color:#1F2937">${esc(t.streak)}</div><div class="v" style="color:#B45309">${esc(t.days(curStreak()))}</div></div></div>
      <div class="col gap8" style="padding:16px 18px;border-radius:20px;background:#F4FBF7">
        <div class="row" style="justify-content:space-between;font-weight:800"><span>${esc(t.levelN(lv))}</span><span class="muted">${into} / 100 XP</span></div>
        <div class="bar" style="flex:none;height:14px"><div style="width:${into}%"></div></div>
        <div class="muted small">${esc(t.xpLeft(100 - into))}</div></div>
      <div class="grow"></div>
      <button class="btn" data-act="nav" data-v="home">${esc(t.continue)}</button></div></div>`;
  }

  /* ───────────── Test znanja (određivanje nivoa) ───────────── */
  // Test ide po blokovima od 2 jedinice (10 blokova do kraja A2), 3 pitanja po bloku.
  // Blok je položen sa najmanje 2 tačna odgovora; test staje na prvom nepoloženom bloku.
  let PT = null;
  const PT_BLOCK = 4;
  const PT_BLOCKS = Math.ceil(UNITS.length / PT_BLOCK);
  // Oblici kod kojih zamjena nastavka sigurno daje pogrešnu rečenicu (vremena i lica izostavljena: radio/radila su oba ispravna).
  const PT_TAGS = ['f_pl', 'm_pl', 'n_pl', 'pl_irr', 'f_acc', 'm_acc_anim', 'loc_f', 'loc_m', 'loc_n', 'gen', 'ins', 'num234', 'adj_f', 'adj_n', 'poss', 'dat', 'loc_pl', 'gen_pl'];
  function sentVariants(s) {
    // Tačna rečenica + pogrešne varijante: drugi oblik iste riječi (npr. jabuka / jabuke / jabuku).
    const right = s.plain; const out = new Set([right]);
    const mk = s.marks.find((m) => PT_TAGS.includes(m.tag));
    if (mk) {
      const cands = [];
      if (mk.base) cands.push(mk.base);
      // Za akuzativ ženskog roda -e bi dalo ispravnu množinu (jedem jabuke), pa se izostavlja.
      ['a', 'e', 'i', 'u', 'o', 'om', 'ovi'].forEach((e) => { if (e !== mk.end && mk.stem && !(mk.tag === 'f_acc' && e === 'e')) cands.push(mk.stem + e); });
      for (const c of shuffle(cands)) {
        const word = /^[A-ZČĆĐŠŽ]/.test(mk.word) ? c.charAt(0).toUpperCase() + c.slice(1) : c;
        const v = right.replace(mk.word, word);
        if (v !== right) out.add(v);
        if (out.size >= 3) break;
      }
    }
    const others = shuffle(unitById(s.unit).sents.filter((x) => x.id !== s.id));
    for (const o of others) { if (out.size >= 3) break; out.add(o.plain); }
    return shuffle([...out]);
  }
  function ptBlockQs(b) {
    const us = UNITS.slice(b * PT_BLOCK, b * PT_BLOCK + PT_BLOCK);
    const words = shuffle(us.flatMap((u) => u.words)).slice(0, 2);
    const qs = words.map((w) => withOpts({ type: 'trans', w }));
    const sents = us.flatMap((u) => u.sents);
    const marked = sents.filter((x) => x.marks.some((m) => PT_TAGS.includes(m.tag)));
    const s = shuffle(marked.length ? marked : sents)[0];
    const opts = sentVariants(s);
    qs.push({ type: 'sent', s, opts, ans: opts.indexOf(s.plain) });
    return qs;
  }
  function startPlacement() {
    closeOverlay();
    PT = { block: 0, qs: ptBlockQs(0), i: 0, ok: 0, total: 0, okTotal: 0, passed: 0, done: false, picked: -1 };
    S.view = 'placement'; render(); window.scrollTo(0, 0);
  }
  function ptAnswer(i) {
    if (PT.picked >= 0 && i >= 0) return;
    const q = PT.qs[PT.i];
    PT.picked = i; const ok = i === q.ans; if (ok) { PT.ok++; PT.okTotal++; }
    PT.total++;
    if (i >= 0) render();
    setTimeout(() => {
      PT.picked = -1; PT.i++;
      if (PT.i >= PT.qs.length) {
        const passed = PT.ok >= 2;
        if (passed) PT.passed = PT.block + 1;
        if (!passed || PT.block + 1 >= PT_BLOCKS) { finishPlacement(); return; }
        PT.block++; PT.qs = ptBlockQs(PT.block); PT.i = 0; PT.ok = 0;
      }
      render(); window.scrollTo(0, 0);
    }, i >= 0 ? 450 : 0);
  }
  function finishPlacement() {
    const units = Math.min(PT.passed * PT_BLOCK, UNITS.length);
    // Samo pomjera naprijed: postojeći napredak se nikad ne briše.
    UNITS.slice(0, units).forEach((u) => {
      for (let k = 0; k < 4; k++) S.done[u.id + '-' + k] = true;
      u.words.forEach((w) => { if (!S.learned[w.id]) S.learned[w.id] = today(); });
      u.sents.forEach((x) => { recordForms(x); x.marks.forEach((m) => { if (m.tag) S.seenTags[m.tag] = true; }); });
    });
    const prev = S.placement && S.placement.units || 0;
    S.placement = { units: Math.max(units, prev), date: today() };
    PT.done = true; PT.units = units; save(); render(); window.scrollTo(0, 0);
  }
  function startHTML() {
    const t = L();
    const card = (act, icon, title, sub, bg, border) => `<button class="langbtn" data-act="${act}" style="align-items:flex-start;text-align:start;background:${bg};border-color:${border}">
      <span class="code" style="width:56px;height:56px;font-size:28px;background:#fff">${icon}</span>
      <span class="col gap6 grow"><span style="font-size:20px;font-weight:900">${esc(title)}</span><span class="muted" style="font-size:15px">${esc(sub)}</span></span></button>`;
    return `<div class="screen" style="background:#F4FBF7"><div class="pad col gap20 grow" style="padding-top:56px">
      <h1 class="h1">${esc(t.startTitle)}</h1>
      <div class="col gap16">
        ${card('startZero', '🌱', t.startZero, t.startZeroSub, '#fff', '#D7E3DC')}
        ${card('startTest', '🎯', t.startTest, t.startTestSub, '#fff', '#D7E3DC')}
      </div>
      <div class="muted small">${esc(t.retakeNote)}</div>
    </div></div>`;
  }
  function placeHTML() {
    const t = L(); const q = PT.qs[PT.i];
    const pct = Math.round(((PT.block * 3 + PT.i) / (PT_BLOCKS * 3)) * 100);
    const lvl = UNITS[Math.min(PT.block * PT_BLOCK, UNITS.length - 1)].level;
    const cls = (i) => (PT.picked < 0 ? '' : i === PT.picked ? 'sel' : '');
    let body = '';
    if (q.type === 'trans') {
      body = `<h2 class="prompt">${esc(t.translateWord)}</h2>
        <div class="row gap14"><button class="tbtn" style="width:64px;height:64px;padding:0" data-act="say" data-text="${esc(q.w.bs)}" aria-label="${esc(t.listen)}">${IC.spk(28)}</button>
        <div class="bigword bs" style="font-size:34px">${esc(q.w.bs)}</div></div>
        <div class="col gap12">${q.opts.map((o, i) => `<button class="opt list ${cls(i)}" data-act="ptAns" data-i="${i}">${esc(nat(o))}</button>`).join('')}</div>`;
    } else {
      body = `<h2 class="prompt">${esc(t.whichCorrect)}</h2>
        <div class="bubble"><span>${esc(nat(q.s))}</span></div>
        <div class="col gap12">${q.opts.map((o, i) => `<button class="opt list bs ${cls(i)}" data-act="ptAns" data-i="${i}">${esc(o)}</button>`).join('')}</div>`;
    }
    return `<div class="screen"><div class="lessontop"><button class="iconbtn" data-act="ptQuit" aria-label="${esc(t.quit)}">${IC.x(24)}</button><div class="bar"><div style="width:${pct}%;background:#7C3AED"></div></div></div>
      <div class="ex"><div class="row gap8" style="color:#7C3AED;font-weight:900;font-size:15px">${IC.target(20)}${esc(t.testLabel)} · ${esc(lvl)}</div>${body}</div>
      <div class="foot"><button class="btn ghost" data-act="ptSkip">${esc(t.dontKnow)}</button></div></div>`;
  }
  function placeResultHTML() {
    const t = L(); const n = PT.units; const next = UNITS[n];
    let msg;
    if (n === 0) msg = t.placedZero;
    else if (!next) msg = t.placedAll;
    else msg = t.placedAt(next.level, next.idx + 1, `${next.title.bs} · ${nat(next.title)}`);
    return `<div class="screen"><div class="pad col gap24 grow" style="padding-top:64px">
      <div class="col center" style="font-size:96px" aria-hidden="true">🎯</div>
      <div class="col center gap8"><div style="font-size:30px;font-weight:900;color:#7C3AED">${esc(t.testDoneTitle)}</div>
        <div class="muted" style="font-size:16px">${esc(t.testCorrect(PT.okTotal, PT.total))}</div></div>
      <div class="col gap10" style="padding:18px;border-radius:20px;background:#F5F3FF;border:2px solid #DDD6FE">
        <div style="font-size:18px;font-weight:800;line-height:1.45">${esc(msg)}</div>
        ${n ? `<div class="muted small">${esc(t.unitsOpened(n))}</div>` : ''}</div>
      <div class="grow"></div>
      <button class="btn" data-act="ptFinish">${esc(t.continue)}</button></div></div>`;
  }

  /* ───────────── Prijave grešaka i prijedlozi (Google Forms) ───────────── */
  let FB = null; // podešavanje iz feedback.json
  fetch('feedback.json?t=' + Date.now(), { cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)).then((j) => { FB = j; flushFeedback(); }).catch(() => {});
  const fbReady = () => !!(FB && FB.formUrl && FB.fields && FB.fields.type);
  // Šta se prijavljuje u trenutnoj vježbi: riječ ili rečenica s prijevodom na maternjem jeziku.
  function exContext() {
    const ex = LS && curEx(); if (!ex) return null;
    const w = ex.w; const s = ex.s;
    if (s) return { content: `${s.plain} → ${nat(s)}`, tags: [...new Set(s.marks.map((m) => m.tag).filter(Boolean))] };
    if (w) return { content: `${w.bs} → ${nat(w)}`, tags: [] };
    return null;
  }
  function openReport(ctx) {
    const t = L(); closeOverlay();
    const opts = [['translation', t.rTrans]];
    if (ctx.tags.length) opts.push(['hint', t.rHint]);
    UI.report = { ctx, type: ctx.forceType || opts[0][0] };
    const el = document.createElement('div'); el.className = 'sheetbg'; el.id = 'overlay'; el.dataset.act = 'closeOverlayBg';
    el.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(t.report)}"><div class="grip"></div>
      <div class="row gap10" style="color:#B91C1C;font-size:20px;font-weight:900">${IC.flag(22)}${esc(t.report)}</div>
      <div class="bubble" style="font-size:17px"><span>${esc(ctx.content)}</span></div>
      ${ctx.forceType ? '' : `<div class="muted small">${esc(t.reportWhat)}</div>
      <div class="col gap8">${opts.map(([v, lbl]) => `<button class="opt list ${UI.report.type === v ? 'sel' : ''}" data-act="rtype" data-v="${v}" style="padding:12px 16px;font-size:17px">${esc(lbl)}</button>`).join('')}</div>`}
      <label class="muted small" for="fbtext">${esc(t.comment)}</label>
      <textarea id="fbtext" rows="3" class="input" style="height:auto;padding:12px 16px;font-size:17px;direction:auto;font-family:inherit" placeholder="${esc(t.commentPh)}"></textarea>
      <button class="btn" data-act="sendReport">${esc(t.send)}</button>
      <button class="btn ghost" data-act="closeOverlay">${esc(t.cancel)}</button></div>`;
    document.body.appendChild(el);
  }
  function openFeedback(kind) {
    const t = L(); closeOverlay();
    const type = kind || 'error';
    UI.report = { ctx: { content: S.view === 'lesson' && LS ? ((exContext() || {}).content || '') : '', tags: [] }, type };
    const el = document.createElement('div'); el.className = 'sheetbg'; el.id = 'overlay'; el.dataset.act = 'closeOverlayBg';
    const seg = (v, lbl) => `<button class="opt list ${type === v ? 'sel' : ''}" data-act="fbType" data-v="${v}" style="justify-content:center;padding:12px;font-size:17px">${esc(lbl)}</button>`;
    el.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(t.feedbackTitle)}"><div class="grip"></div>
      <div class="row gap10" style="color:#0F7F4F;font-size:20px;font-weight:900">${IC.chat(22)}${esc(t.feedbackTitle)}</div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">${seg('error', t.fbError)}${seg('suggestion', t.fbSuggest)}</div>
      <textarea id="fbtext" rows="5" class="input" style="height:auto;padding:12px 16px;font-size:17px;direction:auto;font-family:inherit" placeholder="${esc(type === 'error' ? t.fbErrorPh : t.suggestPh)}"></textarea>
      <div class="muted small">${esc(t.fbNote)}</div>
      <button class="btn" data-act="sendReport">${esc(t.send)}</button>
      <button class="btn ghost" data-act="closeOverlay">${esc(t.cancel)}</button></div>`;
    document.body.appendChild(el);
    setTimeout(() => { const a = document.getElementById('fbtext'); if (a) a.focus(); }, 200);
  }
  // Ažuriranje na zahtjev: provjeri, preuzmi i odmah primijeni novu verziju.
  function forceUpdate() {
    const t = L(); toast(t.checking);
    if (Android && Android.downloadUpdate && UPD.apk) { Android.downloadUpdate(UPD.apk.apk, UPD.apk.versionName || ''); return; }
    fetch('version.json?t=' + Date.now(), { cache: 'no-store' }).then((r) => r.json()).catch(() => null).then((v) => {
      if (v) {
        UPD.remote = v;
        if (Android && Android.getVersionCode && v.android && v.android.versionCode > Android.getVersionCode()) {
          UPD.apk = v.android; Android.downloadUpdate(v.android.apk, v.android.versionName || ''); return;
        }
      }
      const newer = v && v.version && v.version !== APP_VERSION;
      const reg = UPD.reg;
      if (!reg) { if (newer) { toast(t.updating); location.reload(); } else toast(t.upToDate); return; }
      if (reg.waiting) { toast(t.updating); applyUpdate(); return; }
      reg.update().then(() => {
        const nw = reg.installing || reg.waiting;
        if (reg.waiting) { toast(t.updating); applyUpdate(); return; }
        if (nw) {
          toast(t.updating);
          nw.addEventListener('statechange', () => { if (nw.state === 'installed') applyUpdate(); });
          return;
        }
        if (newer) { // posljednja mjera: obriši stare kopije i učitaj ispočetka
          toast(t.updating);
          caches.keys().then((ks) => Promise.all(ks.map((k) => caches.delete(k)))).then(() => reg.unregister()).then(() => location.reload());
          return;
        }
        toast(t.upToDate);
      }).catch(() => toast(t.upToDate));
    });
  }
  function openSuggest() {
    const t = L(); closeOverlay(); UI.report = { ctx: { content: '', tags: [] }, type: 'suggestion' };
    const el = document.createElement('div'); el.className = 'sheetbg'; el.id = 'overlay'; el.dataset.act = 'closeOverlayBg';
    el.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(t.suggest)}"><div class="grip"></div>
      <div class="row gap10" style="color:#0F7F4F;font-size:20px;font-weight:900">${IC.flag(22)}${esc(t.suggest)}</div>
      <label class="muted" for="fbtext">${esc(t.suggestSub)}</label>
      <textarea id="fbtext" rows="5" class="input" style="height:auto;padding:12px 16px;font-size:17px;direction:auto;font-family:inherit" placeholder="${esc(t.suggestPh)}"></textarea>
      <button class="btn" data-act="sendReport">${esc(t.send)}</button>
      <button class="btn ghost" data-act="closeOverlay">${esc(t.cancel)}</button></div>`;
    document.body.appendChild(el);
    setTimeout(() => { const a = document.getElementById('fbtext'); if (a) a.focus(); }, 200);
  }
  function sendReport() {
    const r = UI.report; if (!r) return;
    const comment = ((document.getElementById('fbtext') || {}).value || '').trim();
    if ((r.type === 'suggestion' || r.type === 'error') && !comment) { const a = document.getElementById('fbtext'); if (a) a.focus(); return; }
    S.fbQueue.push({ type: r.type, content: r.ctx.content, comment, lang: S.lang, lesson: LS && S.view === 'lesson' ? LS.Ls.id : (r.ctx.lesson || ''), version: APP_VERSION + (Android && Android.getVersionName ? ' / APK ' + Android.getVersionName() : ''), ts: new Date().toISOString() });
    save(); closeOverlay(); UI.report = null;
    flushFeedback(true);
  }
  let flushing = false;
  function flushFeedback(fromUser) {
    if (flushing || !S.fbQueue.length) return;
    if (!fbReady() || !navigator.onLine) { if (fromUser) toast(L().queued); return; }
    flushing = true;
    const f = FB.fields; const item = S.fbQueue[0];
    const body = new URLSearchParams();
    const put = (key, val) => { if (f[key]) body.append('entry.' + f[key], val || ''); };
    put('type', item.type); put('content', item.content); put('comment', item.comment);
    put('lang', item.lang); put('lesson', item.lesson); put('version', item.version + ' · ' + item.ts);
    fetch(FB.formUrl, { method: 'POST', mode: 'no-cors', body }).then(() => {
      S.fbQueue.shift(); save(); flushing = false;
      if (fromUser) toast(L().thanks);
      if (S.fbQueue.length) flushFeedback(false); else if (S.view === 'profile') render();
    }).catch(() => { flushing = false; if (fromUser) toast(L().queued); });
  }
  window.addEventListener('online', () => flushFeedback(false));

  /* ───────────── Hint ───────────── */
  function showHint(tag) {
    const hd = C.hints[tag]; if (!hd) return;
    const t = L(); const [title, text] = nat(hd);
    closeOverlay();
    const el = document.createElement('div');
    el.className = 'sheetbg'; el.id = 'overlay'; el.dataset.act = 'closeOverlayBg';
    el.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="grip"></div>
      <div class="row gap10" style="flex-wrap:wrap"><span class="badge">${esc(t.newForm)}</span><span style="font-size:19px;font-weight:900">${esc(title)}</span></div>
      <div class="exs">${hd.ex.map((e) => `<span class="e bs">${exHTML(e)}</span>`).join('')}</div>
      <div class="txt">${hintText(text)}</div>
      <div class="muted small">${esc(t.tapAgain)}</div>
      <button class="btn purple" data-act="closeOverlay">${esc(t.gotIt)}</button>
      <button class="btn ghost" style="height:40px;font-size:15px" data-act="reportHint" data-tag="${esc(tag)}">${IC.flag(18)} ${esc(t.reportHint)}</button></div>`;
    document.body.appendChild(el);
  }
  // U arapskom tekstu latinične dijelove (-a, jabuka) izoluj, da se ne ispremiješaju s arapskim.
  function hintText(text) {
    const t = esc(String(text).replace(/\u200e/g, ''));
    if (S.lang !== 'ar') return t;
    return t.replace(/-?[A-Za-zčćđšžČĆĐŠŽ]+(?:[\/-][A-Za-zčćđšž]+)*/g, (m) => `<bdi dir="ltr" class="bs" style="font-weight:800;white-space:nowrap">${m}</bdi>`);
  }
  function closeOverlay() { const o = document.getElementById('overlay'); if (o) o.remove(); }
  function confirmBox(msg, yes, cb) {
    closeOverlay(); const t = L();
    const el = document.createElement('div'); el.className = 'sheetbg mid'; el.id = 'overlay'; el.dataset.act = 'closeOverlayBg';
    el.innerHTML = `<div class="dialog" role="dialog" aria-modal="true"><div style="font-size:19px;font-weight:800;line-height:1.4">${esc(msg)}</div>
      <button class="btn red" data-act="confirmYes">${esc(yes)}</button><button class="btn ghost" data-act="closeOverlay">${esc(t.cancel)}</button></div>`;
    document.body.appendChild(el); UI.confirmCb = cb;
  }
  let toastTimer = null;
  function toast(msg) {
    const old = document.querySelector('.toast'); if (old) old.remove();
    const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = msg;
    document.body.appendChild(el); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.remove(), 2600);
  }

  /* ───────────── Rječnik ───────────── */
  function dictHTML() {
    const t = L(); const q = norm(UI.dictQ);
    const list = Object.values(WORDS).filter((w) => S.learned[w.id])
      .filter((w) => UI.dictF === 'all' || w.pos === UI.dictF)
      .filter((w) => !q || norm(w.bs).includes(q) || norm(nat(w)).includes(q) || nat(w).includes(UI.dictQ));
    const total = Object.keys(S.learned).length;
    const filters = ['all', 'n', 'v', 'adj', 'pron', 'adv', 'prep', 'conj', 'num', 'phr'];
    let h = `<div class="screen"><div class="pad col gap14" style="border-bottom:2px solid #EEF2F0;padding-bottom:12px">
      <div class="row" style="justify-content:space-between;align-items:baseline"><h1 class="h1">${esc(t.dictTitle)}</h1><div class="muted">${esc(t.wordsCount(total))}</div></div>
      <label class="search">${IC.search(22)}<input id="dictq" placeholder="${esc(t.search)}" aria-label="${esc(t.search)}" value="${esc(UI.dictQ)}"></label>
      <div class="filters">${filters.map((f) => `<button class="filter ${UI.dictF === f ? 'on' : ''}" data-act="dictF" data-v="${f}">${esc(f === 'all' ? t.all : t.pos[f])}</button>`).join('')}</div></div>
      <div class="scroll"><div class="pad col gap12" id="dictlist">`;
    if (!total) h += `<div class="muted center" style="padding:40px 0">${esc(t.dictEmpty)}</div>`;
    list.forEach((w) => {
      const forms = S.forms[w.id] ? Object.entries(S.forms[w.id]) : [];
      const open = UI.open === w.id;
      h += `<div class="entry ${open ? 'open' : ''}"><div class="row gap12">
        <div style="width:48px">${picHTML(w, 48)}</div>
        <button class="col grow" data-act="dictOpen" data-id="${esc(w.id)}" style="border:none;background:none;text-align:start;cursor:pointer;padding:0">
          <span class="bs" style="font-size:20px;font-weight:900">${esc(w.bs)}</span>
          <span class="muted small">${esc(nat(w))}${w.g ? ' · ' + esc(t.gender[w.g]) : ''}${forms.length ? ' · ' + esc(t.formsSeen(forms.length + 1)) : ''}</span></button>
        <button class="iconbtn" data-act="say" data-text="${esc(w.bs)}" aria-label="${esc(t.listen)}" style="background:#EFF6FF;color:#1D4ED8">${IC.spk(22)}</button></div>`;
      if (open && forms.length) {
        h += `<div class="forms"><div class="fr"><span class="bs" style="font-weight:900">${esc(w.bs)}</span><span class="muted">${esc(t.baseForm)}</span></div>`;
        forms.forEach(([f, tag]) => {
          const base = w.bs.toLowerCase(); let i = 0; while (i < f.length && i < base.length && f[i] === base[i]) i++;
          const shown = i > 0 ? `${esc(f.slice(0, i))}<span class="end">${esc(f.slice(i))}</span>` : `<span class="end">${esc(f)}</span>`;
          const hd = C.hints[tag];
          h += `<div class="fr"><button class="form bs" data-act="hint" data-tag="${esc(tag)}" style="font-weight:900">${shown}</button><span class="muted">${esc(hd ? nat(hd)[0] : tag)}</span></div>`;
        });
        h += '</div>';
      }
      h += '</div>';
    });
    h += '</div></div>' + navHTML('dict') + '</div>';
    return h;
  }

  /* ───────────── Profil ───────────── */
  function profileHTML() {
    const t = L(); const sw = S.reminder.on;
    const vname = (UPD.remote && UPD.remote.version) || APP_VERSION;
    let h = `<div class="screen" style="background:#F4FBF7"><div class="scroll"><div class="pad col gap16">
      <h1 class="h1">${esc(t.profile)}</h1>${bannersHTML()}
      <div class="panel">
        <button class="prow" data-act="forceUpdate" style="width:100%;border:none;background:none;cursor:pointer;text-align:start"><span style="color:#1D4ED8">${IC.refresh(24)}</span>
          <div class="col grow"><span class="lbl">${esc(t.updateApp)}</span><span class="muted small">${esc(t.version)}: ${esc(APP_VERSION)}${Android && Android.getVersionName ? ' · APK ' + esc(Android.getVersionName()) : ''}</span></div>${IC.chev(20)}</button>
        <button class="prow" data-act="feedback" style="width:100%;border:none;background:none;cursor:pointer;text-align:start"><span style="color:#0F7F4F">${IC.chat(24)}</span>
          <div class="col grow"><span class="lbl">${esc(t.feedbackTitle)}</span><span class="muted small">${esc(t.feedbackSub)}</span></div>${IC.chev(20)}</button></div>
      <div class="panel" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr))">
        <div class="col center gap6" style="padding:16px;border-inline-end:2px solid var(--soft)"><div class="stat" style="color:#B45309">${IC.flame(24)}${curStreak()}</div><div class="muted small">${esc(t.streak)}</div></div>
        <div class="col center gap6" style="padding:16px"><div class="stat" style="color:#1D4ED8">${IC.bolt(24)}${S.xp}</div><div class="muted small">XP · ${esc(t.levelN(level()))}</div></div>
        <div class="col center gap6" style="padding:16px;border-top:2px solid var(--soft);border-inline-end:2px solid var(--soft)"><div class="stat">${Object.keys(S.learned).length}</div><div class="muted small">${esc(t.wordsLearned)}</div></div>
        <div class="col center gap6" style="padding:16px;border-top:2px solid var(--soft)"><div class="stat">${Object.keys(S.done).length} / ${LESSONS.length}</div><div class="muted small">${esc(t.lessonsDone)}</div></div></div>
      <div class="panel">
        <div class="prow"><span style="color:#0F7F4F">${IC.bell(24)}</span><div class="col grow"><span class="lbl">${esc(t.reminder)}</span><span class="muted small">${esc(t.reminderSub)}</span></div>
          <button class="switch ${sw ? 'on' : ''}" role="switch" aria-checked="${sw}" aria-label="${esc(t.reminder)}" data-act="remToggle"><span></span></button></div>
        <div class="prow"><span style="color:#0F7F4F">${IC.clock(24)}</span><label class="lbl" for="remtime">${esc(t.time)}</label><input id="remtime" type="time" value="${esc(S.reminder.time)}"></div>
        ${Android ? '' : `<div class="prow"><span class="muted small">${esc(t.reminderWeb)}</span></div>`}</div>
      <div class="panel">
        <div class="prow"><span style="color:#0F7F4F">${IC.globe(24)}</span><span class="lbl">${esc(t.nativeLang)}</span>
          <select id="langsel" aria-label="${esc(t.nativeLang)}"><option value="tr" ${S.lang === 'tr' ? 'selected' : ''}>Türkçe</option><option value="ar" ${S.lang === 'ar' ? 'selected' : ''}>العربية</option></select></div>
        ${TTS_ON ? `<div class="prow"><span style="color:#0F7F4F">${IC.spk(24)}</span><span class="lbl">${esc(t.voiceSpeed)}</span>
          <select id="ratesel" aria-label="${esc(t.voiceSpeed)}"><option value="0.8" ${S.rate < 1 ? 'selected' : ''}>${esc(t.speeds[0])}</option><option value="1" ${S.rate >= 1 ? 'selected' : ''}>${esc(t.speeds[1])}</option></select></div>` : ''}
        <div class="prow"><span style="color:#0F7F4F">${IC.info(24)}</span><span class="lbl">${esc(t.version)}</span><span class="muted">${esc(APP_VERSION)}${Android && Android.getVersionName ? ' · APK ' + esc(Android.getVersionName()) : ''}</span></div>
      </div>
      <div class="panel">
        <button class="prow" data-act="startTest" style="width:100%;border:none;background:none;cursor:pointer;text-align:start"><span style="color:#0F7F4F">${IC.target(24)}</span>
          <div class="col grow"><span class="lbl">${esc(t.retakeTest)}</span><span class="muted small">${esc(t.retakeNote)}</span></div>${IC.chev(20)}</button></div>
      <div class="panel">
        <button class="prow" data-act="suggest" style="width:100%;border:none;background:none;cursor:pointer;text-align:start"><span style="color:#0F7F4F">${IC.flag(24)}</span>
          <div class="col grow"><span class="lbl">${esc(t.suggest)}</span><span class="muted small">${esc(t.suggestSub)}</span></div>${IC.chev(20)}</button>
        ${S.fbQueue.length ? `<div class="prow"><span class="muted small">${esc(t.pending(S.fbQueue.length))}</span></div>` : ''}</div>
      <button class="btn ghost" style="color:#B91C1C" data-act="reset">${esc(t.reset)}</button>
      <div class="muted small center" style="padding-bottom:8px">Govorimo ${esc(vname)}</div>
    </div></div>${navHTML('profile')}</div>`;
    return h;
  }
  function syncAndroid() {
    if (!Android) return;
    try {
      if (Android.setLang) Android.setLang(S.lang || 'tr');
      if (Android.setReminder) { const [hh, mm] = S.reminder.time.split(':').map(Number); Android.setReminder(!!S.reminder.on, hh, mm); }
      if (Android.lessonDone && S.lastDay) Android.lessonDone(S.lastDay);
    } catch (e) {}
  }

  /* ───────────── Događaji ───────────── */
  const ACT = {
    pickLang: (el) => { UI.tmpLang = el.dataset.v; render(); },
    confirmLang: () => { if (!UI.tmpLang) return; S.lang = UI.tmpLang; S.view = 'start'; save(); syncAndroid(); render(); },
    startZero: () => { S.placement = { units: 0, date: today(), zero: true }; go('home'); },
    startTest: () => startPlacement(),
    ptAns: (el) => ptAnswer(+el.dataset.i),
    ptSkip: () => ptAnswer(-1),
    ptFinish: () => { PT = null; UI.scrolled = false; go('home'); },
    ptQuit: () => confirmBox(L().quitConfirm, L().quit, () => { PT = null; go(S.placement ? 'home' : 'start'); }),
    nav: (el) => { closeOverlay(); go(el.dataset.v); },
    openLesson: (el) => {
      const i = LESSONS.findIndex((x) => x.id === el.dataset.id);
      if (i >= 0 && i > firstUndone() && !S.done[el.dataset.id]) { toast(L().locked); return; }
      startLesson(el.dataset.id);
    },
    quit: () => confirmBox(L().quitConfirm, L().quit, () => { LS = null; go('home'); }),
    say: (el) => Speech.speak(el.dataset.text, !!el.dataset.slow),
    sel: (el) => { if (LS.checked) return; LS.sel = +el.dataset.i; const ex = curEx(); if (ex.type !== 'trans') Speech.speak(ex.opts[LS.sel].bs); render(); },
    check: () => { if (!LS.checked) check(); },
    next: () => next(),
    key: (el) => {
      const inp = document.getElementById('ans'); if (!inp) return;
      const s = inp.selectionStart != null ? inp.selectionStart : inp.value.length; const e = inp.selectionEnd != null ? inp.selectionEnd : s;
      inp.value = inp.value.slice(0, s) + el.dataset.k + inp.value.slice(e); LS.typed = inp.value;
      inp.focus(); inp.setSelectionRange(s + 1, s + 1);
      const b = document.querySelector('[data-act="check"]'); if (b) b.disabled = !LS.typed.trim();
    },
    pickTok: (el) => { LS.picked.push(+el.dataset.b); Speech.speak(curEx().bank[+el.dataset.b]); render(); },
    unpick: (el) => { LS.picked.splice(+el.dataset.p, 1); render(); },
    rec: (el) => {
      if (LS.pron && LS.pron.state === 'rec') return;
      const text = el.dataset.text; LS.pron = { state: 'rec' }; render();
      Speech.listen().then((alts) => {
        const r = scorePron(text, alts); LS.pron = Object.assign({ state: 'done' }, r);
        if (!r.best) LS.pron = { state: 'err', msg: L().notHeard };
        render();
      }).catch((err) => {
        const t = L();
        const msg = (err === 'not-allowed' || err === 'service-not-allowed' || err === 'permission') ? t.micDenied : err === 'unsupported' ? t.noStt : t.notHeard;
        LS.pron = { state: 'err', msg }; render();
      });
    },
    speakDone: () => { const ex = curEx(); if (!LS.counted.has(ex.key)) { LS.counted.add(ex.key); LS.xp += 2; } next(); },
    hint: (el, e) => { e.stopPropagation(); showHint(el.dataset.tag); },
    closeOverlay: () => closeOverlay(),
    closeOverlayBg: (el, e) => { if (e.target === el) closeOverlay(); },
    confirmYes: () => { const cb = UI.confirmCb; UI.confirmCb = null; closeOverlay(); if (cb) cb(); },
    dictF: (el) => { UI.dictF = el.dataset.v; render(); },
    dictOpen: (el) => { UI.open = UI.open === el.dataset.id ? null : el.dataset.id; render(); },
    remToggle: () => { S.reminder.on = !S.reminder.on; save(); syncAndroid(); render(); },
    checkUpd: () => checkRemote(true),
    forceUpdate: () => forceUpdate(),
    feedback: () => openFeedback('error'),
    fbType: (el) => {
      if (!UI.report) return; const v = el.dataset.v; UI.report.type = v;
      document.querySelectorAll('[data-act="fbType"]').forEach((b) => b.classList.toggle('sel', b.dataset.v === v));
      const a = document.getElementById('fbtext'); if (a) a.placeholder = v === 'error' ? L().fbErrorPh : L().suggestPh;
    },
    report: () => { const c = exContext(); if (c) openReport(c); },
    reportHint: (el) => { const hd = C.hints[el.dataset.tag]; if (!hd) return; openReport({ content: `hint ${el.dataset.tag}: ${nat(hd)[0]}`, tags: [el.dataset.tag], forceType: 'hint' }); },
    rtype: (el) => { if (!UI.report) return; UI.report.type = el.dataset.v; document.querySelectorAll('[data-act="rtype"]').forEach((b) => b.classList.toggle('sel', b.dataset.v === el.dataset.v)); },
    sendReport: () => sendReport(),
    suggest: () => openSuggest(),
    applyUpdate: () => applyUpdate(),
    apkUpdate: () => { if (Android && Android.downloadUpdate && UPD.apk) Android.downloadUpdate(UPD.apk.apk, UPD.apk.versionName || ''); },
    reset: () => confirmBox(L().resetConfirm, L().yes, () => { const lang = S.lang; const q = S.fbQueue; S = defaults(); S.lang = lang; S.fbQueue = q; save(); syncAndroid(); render(); })
  };
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]'); if (!el) return;
    const fn = ACT[el.dataset.act]; if (!fn) return;
    if (el.disabled) return;
    fn(el, e);
  });
  document.addEventListener('input', (e) => {
    if (e.target.id === 'ans' && LS) { LS.typed = e.target.value; const b = document.querySelector('[data-act="check"]'); if (b) b.disabled = !LS.typed.trim(); }
    if (e.target.id === 'dictq') {
      UI.dictQ = e.target.value; const pos = e.target.selectionStart; render();
      const n = document.getElementById('dictq'); if (n) { n.focus(); n.setSelectionRange(pos, pos); }
    }
  });
  document.addEventListener('change', (e) => {
    if (e.target.id === 'remtime') { S.reminder.time = e.target.value || '19:00'; save(); syncAndroid(); }
    if (e.target.id === 'langsel') { S.lang = e.target.value; save(); syncAndroid(); render(); }
    if (e.target.id === 'ratesel') { S.rate = +e.target.value; save(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.id === 'ans' && LS && !LS.checked && LS.typed.trim()) { e.preventDefault(); check(); }
  });
  window.addEventListener('popstate', () => {});

  /* ───────────── Pokretanje ───────────── */
  Speech.init();
  if (S.view === 'lesson' || S.view === 'result') S.view = 'home';
  if (S.view === 'placement') S.view = S.placement ? 'home' : 'start';
  render();
  syncAndroid();
  checkRemote(false);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') flushFeedback(false); });
  window.GovorimoApp = { version: APP_VERSION, state: () => S, render, lesson: () => LS, ex: () => (LS ? curEx() : null), pt: () => (PT && !PT.done ? { block: PT.block, ans: PT.qs[PT.i].ans } : null), lessons: () => LESSONS.map((x) => x.id), build: (id) => buildLesson(LESSONS.find((x) => x.id === id)).map((e) => e.type), daily: () => nextDailyIds() };
})();
