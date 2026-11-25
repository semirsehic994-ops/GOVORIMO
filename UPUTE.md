# Govorimo – upute za objavu

Aplikacija uči bosanski jezik korisnike koji govore turski ili arapski. Nivoi A1, A2, B1 i B2: 83 jedinice, 999 riječi u lekcijama (A1 304, A2 297, B1 248, B2 150) i 389 rečenica.

**Riječi dana:** svaki dan 5 novih riječi (imenica, glagol, pridjev, prilog i jedna „ostalo": zamjenica, prijedlog, veznik, broj ili izraz) iz zasebne zbirke od 506 riječi, dovoljno za oko 100 dana. Svaka riječ ima nivo (A1–B2) i korisnik dobija riječi svog trenutnog nivoa. Propuštene riječi čekaju korisnika, a sutrašnja lekcija ponavlja jučerašnje. Zbirka je u `app/data/daily.js`. Nove riječi dodajte na kraj liste i objavite novu verziju (korak 10).

Pri prvom pokretanju korisnik bira hoće li početi od nule ili uraditi **test znanja** (oko 5 minuta). Test otključa jedinice koje korisnik već zna. Može se ponoviti iz Profila i nikad ne briše napredak.

- **iPhone:** web aplikacija (PWA) koja se doda na početni ekran. Ažurira se sama.
- **Android:** APK aplikacija. Sadržaj se ažurira sam, a za novi APK stiže obavještenje.
- **Hosting:** GitHub Pages i GitHub Releases, potpuno besplatno.

---

## 1. GitHub račun i repozitorij

1. Napravite besplatan račun na https://github.com (ako ga nemate).
2. Kliknite **New repository**, ime `govorimo`, odaberite **Public** i kliknite **Create repository**.
   GitHub Pages je besplatan samo za javne repozitorije.

## 2. Postavite fajlove

Najlakše je preko programa **GitHub Desktop** (https://desktop.github.com):

1. U GitHub Desktop: **File → Clone repository** → `govorimo`.
2. Raspakujte `govorimo.zip` i kopirajte **cijeli sadržaj** (i skrivenu mapu `.github`) u kloniranu mapu.
3. Upišite opis, npr. `Prva verzija`, kliknite **Commit to main**, pa **Push origin**.

> Na Windowsu uključite prikaz skrivenih fajlova (Prikaz → Skrivene stavke) da vidite mapu `.github`. Bez nje se ništa neće objaviti.

## 3. Uključite GitHub Pages

Repozitorij → **Settings → Pages** → kod **Source** odaberite **GitHub Actions**.

## 4. Dodajte ključ za Android (obavezno za APK)

Repozitorij → **Settings → Secrets and variables → Actions → New repository secret**. Dodajte dvije tajne:

| Ime | Vrijednost |
|---|---|
| `KEYSTORE_BASE64` | cijeli sadržaj fajla `keystore-base64.txt` |
| `KEYSTORE_PASSWORD` | lozinka iz fajla `lozinka.txt` (samo dio iza `=`) |

> **Važno:** fajlove `govorimo-release.jks`, `keystore-base64.txt` i `lozinka.txt` čuvajte na sigurnom, npr. na USB-u i u cloudu.
> Svaki novi APK mora biti potpisan **istim ključem**. Ako ga izgubite, Android korisnici neće moći instalirati ažuriranja preko postojeće aplikacije.
> Ove fajlove **nikad** ne stavljajte u repozitorij.

## 5. Pokrenite objavu

1. Repozitorij → kartica **Actions** → **Objava** → **Run workflow**. Nakon svakog pusha na `main` pokreće se i sama.
2. Za 3–6 minuta:
   - aplikacija je na adresi `https://VAŠE-IME.github.io/govorimo/`
   - APK je pod **Releases** (desno na stranici repozitorija), fajl `govorimo.apk`

## 6. Instalacija na iPhone

1. Otvorite adresu aplikacije u **Safariju**.
2. Dodirnite **Podijeli** (kvadrat sa strelicom) → **Dodaj na početni ekran**.
3. Aplikacija se otvara preko cijelog ekrana i radi i bez interneta.

## 7. Instalacija na Android

1. Na telefonu otvorite stranicu **Releases** i preuzmite `govorimo.apk`.
2. Android će tražiti dozvolu za instalaciju iz tog izvora: dozvolite i instalirajte.
3. Pri prvom otvaranju aplikacija traži dozvolu za obavještenja. Mikrofon traži tek kod prve vježbe izgovora.

Za ažuriranja aplikacija sama provjerava novu verziju (otprilike svakih 6 sati) i šalje obavještenje. Dodir na obavještenje preuzima i instalira novi APK. Napredak ostaje sačuvan.

## 8. Fotografije s Pexelsa (besplatno)

Dok fotografije nisu dodane, aplikacija prikazuje ilustracije (emoji).

1. Napravite besplatan račun na https://www.pexels.com/api i kopirajte **API key**.
2. Dodajte tajnu `PEXELS_API_KEY` (isto kao u koraku 4).
3. **Actions → Fotografije → Run workflow**.

Za oko 2 minute fotografije se spreme u `app/img/` i aplikacija se sama ponovo objavi.
Fotografije se traže prema turskoj riječi, pa ih **pregledajte**. Lošu fotografiju zamijenite u `app/img/` istim imenom fajla.

## 9. Prijave grešaka i prijedlozi korisnika (Google Forms, besplatno)

Korisnici šalju povratne informacije na tri mjesta: dugme za poruku (💬) gore desno na početnom ekranu, isto dugme u Profilu, te zastavica u svakoj lekciji i hintu. Mogu prijaviti grešku ili poslati prijedlog teme i riječi. Prijave stižu u vašu Google tabelu. Bez interneta se čuvaju na telefonu i šalju se kad se veza vrati.

1. Na https://forms.google.com napravite novu formu, npr. „Govorimo – prijave".
2. Dodajte **6 pitanja tipa „Kratak odgovor"**, tačno ovim redom: `Vrsta`, `Sadržaj`, `Komentar`, `Jezik`, `Lekcija`, `Verzija`. Nijedno pitanje ne smije biti obavezno.
3. U postavkama forme isključite prikupljanje e-mail adresa i prijavu na Google račun.
4. Tab **Odgovori** → **Poveži s Tabelama**.
5. Meni **⋮** → **Nabavi unaprijed popunjeni link**. Upišite bilo šta u svih 6 polja (npr. 1 do 6) → **Nabavi link** → **Kopiraj link**.
6. U mapi projekta pokrenite:
   ```
   node tools/set-feedback.mjs "ZALIJEPITE-LINK-OVDJE"
   ```
   Zatim commit i push. Bez Node.js: link mi pošaljite i ja ću popuniti `app/feedback.json`.

Šta znače kolone u tabeli:
- **Vrsta:** `error` je opća prijava greške, `translation` je greška u prijevodu (iz lekcije), `hint` je nejasan hint, `suggestion` je prijedlog.
- **Sadržaj:** riječ ili rečenica s prijevodom, npr. `zdravo → merhaba`.
- **Jezik:** `tr` ili `ar`.
- **Lekcija:** npr. `a2u3-2`, tj. A2, jedinica 3, lekcija 3.

Ispravku napravite u `app/data/course.js` i objavite novu verziju (korak 10).

## 10. Nova verzija (npr. nove riječi ili nivo B1)

1. Izmijenite sadržaj u `app/data/course.js` (format je opisan na vrhu fajla).
2. U terminalu, u mapi projekta:
   ```
   node tools/release.mjs 1.1.0 "Yeni kelimeler eklendi" "تمت إضافة كلمات جديدة"
   ```
   Ako ste mijenjali i Android dio (mapa `android/`), dodajte `--apk`:
   ```
   node tools/release.mjs 1.1.0 --apk
   ```
3. Commit i push na `main`.

Šta korisnici dobiju (a mogu i sami pokrenuti ažuriranje: Profil → „Ažuriraj aplikaciju"):
- **iPhone i Android:** novi sadržaj pri sljedećem otvaranju aplikacije, automatski.
- **Android sa `--apk`:** obavještenje "Yeni sürüm 1.1.0 hazır" ili "إصدار جديد 1.1.0 جاهز".

Bez Node.js na računaru: verziju možete promijeniti i ručno, na istim mjestima koja mijenja `release.mjs` (`app/app.js`, `app/sw.js`, `app/version.json`, `android/version.properties`).

---

## Ograničenja koja trebate znati

- **Izgovor aplikacije je isključen** dok bosanski glas nije dovoljno dobar. Korisnik i dalje govori, a aplikacija ocjenjuje izgovor. Za uključivanje izgovora u `app/app.js` promijenite `TTS_ON = false` u `true`.

- **Glas na iPhoneu:** iOS često nema bosanski glas, pa aplikacija koristi hrvatski (isti izgovor latinice).
- **Ocjena izgovora na iPhoneu:** radi preko Safarijevog prepoznavanja govora i treba internet. U aplikaciji dodanoj na početni ekran ponekad ne radi. Tada korisnik može preskočiti vježbu.
- **Podsjetnik na iPhoneu:** web aplikacija na iPhoneu ne može slati zakazana obavještenja bez servera. Podsjetnik se prikazuje kao poruka u aplikaciji. Na Androidu stiže kao pravo obavještenje.
- **Android prvi put:** prvo otvaranje traži internet. Poslije aplikacija radi i bez njega.
- **Prijevodi:** turske i arapske tekstove i hintove treba pregledati izvorni govornik prije javne objave.
