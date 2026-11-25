/* Govorimo – sadržaj kursa bosanskog jezika, nivoi A1, A2, B1 i B2 (oko 1.000 riječi).
   Riječ:    [bosanski, turski, arapski, vrsta, rod, slika]
             vrsta: n imenica, v glagol, adj pridjev, pron zamjenica, num broj, adv prilog, prep prijedlog, conj veznik, phr fraza
             rod:   m muški, f ženski, n srednji, "" bez roda
   Rečenica: [bosanski s oznakama, turski, arapski]
             oznaka oblika: osnova{nastavak|oznaka|osnovna_riječ}  npr. jabuk{e|f_pl|jabuka}
             cijela riječ:  {psi|pl_irr|pas}
   Turske i arapske tekstove treba pregledati izvorni govornik prije objave. */
window.COURSE = {
  version: "1.3.3",
  units: [
    // ───────────────────────── A1 ─────────────────────────
    { id: "a1u1", level: "A1", icon: "👋", title: { bs: "Pozdravi", tr: "Selamlaşma", ar: "التحيات" },
      words: [
        ["zdravo", "merhaba", "مرحبا", "phr", "", "👋"],
        ["dobro jutro", "günaydın", "صباح الخير", "phr", "", "🌅"],
        ["dobar dan", "iyi günler", "طاب يومك", "phr", "", "☀️"],
        ["dobro veče", "iyi akşamlar", "مساء الخير", "phr", "", "🌆"],
        ["laku noć", "iyi geceler", "تصبح على خير", "phr", "", "🌙"],
        ["hvala", "teşekkürler", "شكرا", "phr", "", "🙏"],
        ["molim", "lütfen", "من فضلك", "phr", "", "🤲"],
        ["da", "evet", "نعم", "phr", "", "✅"],
        ["ne", "hayır", "لا", "phr", "", "❌"],
        ["doviđenja", "hoşça kal", "مع السلامة", "phr", "", "🚪"],
        ["izvinite", "affedersiniz", "عذرا", "phr", "", "🙇"],
        ["kako si?", "nasılsın?", "كيف حالك؟", "phr", "", "🙂"],
        ["dobro sam", "iyiyim", "أنا بخير", "phr", "", "😊"]
      ],
      sents: [
        ["Zdravo, kako si?", "Merhaba, nasılsın?", "مرحبا، كيف حالك؟"],
        ["Dobro sam, hvala.", "İyiyim, teşekkürler.", "أنا بخير، شكرا."],
        ["Kako se zoveš?", "Adın ne?", "ما اسمك؟"],
        ["Zovem se Emir.", "Benim adım Emir.", "اسمي أمير."],
        ["Doviđenja i hvala!", "Hoşça kal ve teşekkürler!", "مع السلامة وشكرا!"]
      ] },

    { id: "a1u2", level: "A1", icon: "👨‍👩‍👧", title: { bs: "Porodica", tr: "Aile", ar: "العائلة" },
      words: [
        ["majka", "anne", "أم", "n", "f", "👩"],
        ["otac", "baba", "أب", "n", "m", "👨"],
        ["brat", "erkek kardeş", "أخ", "n", "m", "👦"],
        ["sestra", "kız kardeş", "أخت", "n", "f", "👧"],
        ["sin", "oğul", "ابن", "n", "m", "🧒"],
        ["kćerka", "kız evlat", "ابنة", "n", "f", "👱‍♀️"],
        ["dijete", "çocuk", "طفل", "n", "n", "👶"],
        ["baka", "büyükanne", "جدة", "n", "f", "👵"],
        ["djed", "büyükbaba", "جد", "n", "m", "👴"],
        ["muž", "koca", "زوج", "n", "m", "🤵"],
        ["žena", "kadın, eş", "امرأة، زوجة", "n", "f", "👰"],
        ["porodica", "aile", "عائلة", "n", "f", "👨‍👩‍👧"],
        ["prijatelj", "arkadaş", "صديق", "n", "m", "🤝"]
      ],
      sents: [
        ["Ovo je moj{a|poss|moj} majka.", "Bu benim annem.", "هذه أمي."],
        ["Ovo je moj otac.", "Bu benim babam.", "هذا أبي."],
        ["Moj brat je ovdje.", "Kardeşim burada.", "أخي هنا."],
        ["Gdje je baka?", "Büyükanne nerede?", "أين الجدة؟"],
        ["Ovo je moj{e|poss|moj} dijete.", "Bu benim çocuğum.", "هذا طفلي."],
        ["Ovo je moj{a|poss|moj} porodica.", "Bu benim ailem.", "هذه عائلتي."]
      ] },

    { id: "a1u3", level: "A1", icon: "🍎", title: { bs: "Hrana", tr: "Yiyecek", ar: "الطعام" },
      words: [
        ["jabuka", "elma", "تفاحة", "n", "f", "🍎"],
        ["hljeb", "ekmek", "خبز", "n", "m", "🍞"],
        ["voda", "su", "ماء", "n", "f", "💧"],
        ["mlijeko", "süt", "حليب", "n", "n", "🥛"],
        ["sir", "peynir", "جبن", "n", "m", "🧀"],
        ["jaje", "yumurta", "بيضة", "n", "n", "🥚"],
        ["meso", "et", "لحم", "n", "n", "🥩"],
        ["riba", "balık", "سمك", "n", "f", "🐟"],
        ["kafa", "kahve", "قهوة", "n", "f", "☕"],
        ["čaj", "çay", "شاي", "n", "m", "🍵"],
        ["šećer", "şeker", "سكر", "n", "m", "🍬"],
        ["supa", "çorba", "حساء", "n", "f", "🍲"],
        ["banana", "muz", "موز", "n", "f", "🍌"]
      ],
      sents: [
        ["Ovo je jabuka.", "Bu bir elma.", "هذه تفاحة."],
        ["Hljeb i sir.", "Ekmek ve peynir.", "خبز وجبن."],
        ["Kafa, molim.", "Kahve, lütfen.", "قهوة من فضلك."],
        ["Čaj ili kafa?", "Çay mı kahve mi?", "شاي أم قهوة؟"],
        ["Gdje je mlijeko?", "Süt nerede?", "أين الحليب؟"]
      ] },

    { id: "a1u4", level: "A1", icon: "🏠", title: { bs: "Kuća", tr: "Ev", ar: "البيت" },
      words: [
        ["kuća", "ev", "بيت", "n", "f", "🏠"],
        ["stan", "daire", "شقة", "n", "m", "🏢"],
        ["soba", "oda", "غرفة", "n", "f", "🚪"],
        ["kuhinja", "mutfak", "مطبخ", "n", "f", "🍳"],
        ["kupatilo", "banyo", "حمام", "n", "n", "🛁"],
        ["prozor", "pencere", "نافذة", "n", "m", "🪟"],
        ["stol", "masa", "طاولة", "n", "m", "🍽️"],
        ["stolica", "sandalye", "كرسي", "n", "f", "🪑"],
        ["krevet", "yatak", "سرير", "n", "m", "🛏️"],
        ["ključ", "anahtar", "مفتاح", "n", "m", "🔑"],
        ["televizor", "televizyon", "تلفاز", "n", "m", "📺"],
        ["lampa", "lamba", "مصباح", "n", "f", "💡"]
      ],
      sents: [
        ["Ovo je moj{a|poss|moj} kuća.", "Bu benim evim.", "هذا بيتي."],
        ["Gdje je ključ?", "Anahtar nerede?", "أين المفتاح؟"],
        ["Kuhinja je ovdje.", "Mutfak burada.", "المطبخ هنا."],
        ["Ovo nije moj stan.", "Bu benim dairem değil.", "هذه ليست شقتي."],
        ["Ovdje je stolica.", "Sandalye burada.", "الكرسي هنا."]
      ] },

    { id: "a1u5", level: "A1", icon: "🔢", title: { bs: "Brojevi", tr: "Sayılar", ar: "الأرقام" },
      words: [
        ["jedan", "bir", "واحد", "num", "", "1"],
        ["dva", "iki", "اثنان", "num", "", "2"],
        ["tri", "üç", "ثلاثة", "num", "", "3"],
        ["četiri", "dört", "أربعة", "num", "", "4"],
        ["pet", "beş", "خمسة", "num", "", "5"],
        ["šest", "altı", "ستة", "num", "", "6"],
        ["sedam", "yedi", "سبعة", "num", "", "7"],
        ["osam", "sekiz", "ثمانية", "num", "", "8"],
        ["devet", "dokuz", "تسعة", "num", "", "9"],
        ["deset", "on", "عشرة", "num", "", "10"],
        ["dvadeset", "yirmi", "عشرون", "num", "", "20"],
        ["sto", "yüz", "مئة", "num", "", "100"]
      ],
      sents: [
        ["Jedan, dva, tri.", "Bir, iki, üç.", "واحد، اثنان، ثلاثة."],
        ["Pet i pet je deset.", "Beş ve beş on eder.", "خمسة وخمسة تساوي عشرة."],
        ["Koliko je to?", "Bu ne kadar?", "كم هذا؟"],
        ["Dva čaj{a|num234|čaj}, molim.", "İki çay, lütfen.", "كوبان من الشاي، من فضلك."],
        ["Tri kaf{e|num234|kafa}, molim.", "Üç kahve, lütfen.", "ثلاثة أكواب قهوة، من فضلك."]
      ] },

    { id: "a1u6", level: "A1", icon: "🎨", title: { bs: "Boje", tr: "Renkler", ar: "الألوان" },
      words: [
        ["crven", "kırmızı", "أحمر", "adj", "", "🔴"],
        ["plav", "mavi", "أزرق", "adj", "", "🔵"],
        ["zelen", "yeşil", "أخضر", "adj", "", "🟢"],
        ["žut", "sarı", "أصفر", "adj", "", "🟡"],
        ["bijel", "beyaz", "أبيض", "adj", "", "⚪"],
        ["crn", "siyah", "أسود", "adj", "", "⚫"],
        ["smeđ", "kahverengi", "بني", "adj", "", "🟤"],
        ["narandžast", "turuncu", "برتقالي", "adj", "", "🟠"],
        ["ljubičast", "mor", "بنفسجي", "adj", "", "🟣"]
      ],
      sents: [
        ["Jabuka je crven{a|adj_f|crven}.", "Elma kırmızı.", "التفاحة حمراء."],
        ["Banana je žut{a|adj_f|žut}.", "Muz sarı.", "الموز أصفر."],
        ["Mlijeko je bijel{o|adj_n|bijel}.", "Süt beyaz.", "الحليب أبيض."],
        ["More je plav{o|adj_n|plav}.", "Deniz mavi.", "البحر أزرق."],
        ["Ovo je zelen{a|adj_f|zelen} jabuka.", "Bu yeşil bir elma.", "هذه تفاحة خضراء."],
        ["Ključ je žut.", "Anahtar sarı.", "المفتاح أصفر."]
      ] },

    { id: "a1u7", level: "A1", icon: "🐾", title: { bs: "Životinje", tr: "Hayvanlar", ar: "الحيوانات" },
      words: [
        ["pas", "köpek", "كلب", "n", "m", "🐕"],
        ["mačka", "kedi", "قطة", "n", "f", "🐈"],
        ["konj", "at", "حصان", "n", "m", "🐎"],
        ["krava", "inek", "بقرة", "n", "f", "🐄"],
        ["ptica", "kuş", "طائر", "n", "f", "🐦"],
        ["ovca", "koyun", "خروف", "n", "f", "🐑"],
        ["kokoš", "tavuk", "دجاجة", "n", "f", "🐔"],
        ["zec", "tavşan", "أرنب", "n", "m", "🐇"],
        ["medvjed", "ayı", "دب", "n", "m", "🐻"],
        ["miš", "fare", "فأر", "n", "m", "🐭"]
      ],
      sents: [
        ["Mačka je crn{a|adj_f|crn}.", "Kedi siyah.", "القطة سوداء."],
        ["Ovo je moj pas.", "Bu benim köpeğim.", "هذا كلبي."],
        ["Krava je bijel{a|adj_f|bijel}.", "İnek beyaz.", "البقرة بيضاء."],
        ["Gdje je mačka?", "Kedi nerede?", "أين القطة؟"],
        ["Ptica je plav{a|adj_f|plav}.", "Kuş mavi.", "الطائر أزرق."]
      ] },

    { id: "a1u8", level: "A1", icon: "🏙️", title: { bs: "Grad", tr: "Şehir", ar: "المدينة" },
      words: [
        ["grad", "şehir", "مدينة", "n", "m", "🏙️"],
        ["ulica", "sokak", "شارع", "n", "f", "🛣️"],
        ["škola", "okul", "مدرسة", "n", "f", "🏫"],
        ["bolnica", "hastane", "مستشفى", "n", "f", "🏥"],
        ["prodavnica", "dükkân", "متجر", "n", "f", "🏪"],
        ["banka", "banka", "بنك", "n", "f", "🏦"],
        ["pijaca", "pazar", "سوق", "n", "f", "🧺"],
        ["džamija", "cami", "مسجد", "n", "f", "🕌"],
        ["apoteka", "eczane", "صيدلية", "n", "f", "💊"],
        ["park", "park", "حديقة", "n", "m", "🌳"],
        ["most", "köprü", "جسر", "n", "m", "🌉"],
        ["autobus", "otobüs", "حافلة", "n", "m", "🚌"],
        ["auto", "araba", "سيارة", "n", "m", "🚗"],
        ["lijevo", "solda", "على اليسار", "adv", "", "⬅️"],
        ["desno", "sağda", "على اليمين", "adv", "", "➡️"]
      ],
      sents: [
        ["Gdje je apoteka?", "Eczane nerede?", "أين الصيدلية؟"],
        ["Škola je blizu.", "Okul yakında.", "المدرسة قريبة."],
        ["Bolnica je daleko.", "Hastane uzakta.", "المستشفى بعيد."],
        ["Autobus je ovdje.", "Otobüs burada.", "الحافلة هنا."],
        ["Banka je lijevo.", "Banka solda.", "البنك على اليسار."],
        ["Pijaca je desno.", "Pazar sağda.", "السوق على اليمين."]
      ] },

    { id: "a1u9", level: "A1", icon: "🏃", title: { bs: "Glagoli", tr: "Fiiller", ar: "الأفعال" },
      words: [
        ["biti", "olmak", "يكون", "v", "", "🟰"],
        ["imati", "sahip olmak", "يملك", "v", "", "🎁"],
        ["jesti", "yemek", "يأكل", "v", "", "🍽️"],
        ["piti", "içmek", "يشرب", "v", "", "🥤"],
        ["ići", "gitmek", "يذهب", "v", "", "🚶"],
        ["govoriti", "konuşmak", "يتكلم", "v", "", "🗣️"],
        ["raditi", "çalışmak", "يعمل", "v", "", "💼"],
        ["živjeti", "yaşamak", "يعيش", "v", "", "🏡"],
        ["spavati", "uyumak", "ينام", "v", "", "😴"],
        ["učiti", "öğrenmek", "يتعلم", "v", "", "📚"],
        ["voljeti", "sevmek", "يحب", "v", "", "💕"],
        ["razumjeti", "anlamak", "يفهم", "v", "", "💡"]
      ],
      sents: [
        ["Ja jede{m|pres_1sg|jesti} hljeb.", "Ekmek yiyorum.", "أنا آكل الخبز."],
        ["Ti pije{š|pres_2sg|piti} čaj.", "Sen çay içiyorsun.", "أنت تشرب الشاي."],
        ["On rad{i|pres_3sg|raditi} ovdje.", "O burada çalışıyor.", "هو يعمل هنا."],
        ["Ja {sam|biti|biti} ovdje.", "Ben buradayım.", "أنا هنا."],
        ["Voli{m|pres_1sg|voljeti} čaj.", "Çayı severim.", "أحب الشاي."],
        ["Ti govori{š|pres_2sg|govoriti} bosanski.", "Sen Boşnakça konuşuyorsun.", "أنت تتكلم البوسنية."]
      ] },

    { id: "a1u10", level: "A1", icon: "🧑", title: { bs: "Ja, ti, on", tr: "Ben, sen, o", ar: "أنا، أنت، هو" },
      words: [
        ["ja", "ben", "أنا", "pron", "", "🙋"],
        ["ti", "sen", "أنت", "pron", "", "👉"],
        ["on", "o (erkek)", "هو", "pron", "", "👨"],
        ["ona", "o (kadın)", "هي", "pron", "", "👩"],
        ["mi", "biz", "نحن", "pron", "", "👥"],
        ["vi", "siz", "أنتم", "pron", "", "🫵"],
        ["oni", "onlar", "هم", "pron", "", "👨‍👩‍👦"],
        ["velik", "büyük", "كبير", "adj", "", "🐘"],
        ["mali", "küçük", "صغير", "adj", "", "🐜"],
        ["nov", "yeni", "جديد", "adj", "", "✨"],
        ["star", "eski, yaşlı", "قديم، كبير السن", "adj", "", "🏚️"],
        ["dobar", "iyi", "جيد", "adj", "", "👍"],
        ["lijep", "güzel", "جميل", "adj", "", "🌸"],
        ["hladan", "soğuk", "بارد", "adj", "", "❄️"]
      ],
      sents: [
        ["Kuća je velik{a|adj_f|velik}.", "Ev büyük.", "البيت كبير."],
        ["Dijete je mal{o|adj_n|mali}.", "Çocuk küçük.", "الطفل صغير."],
        ["Ona je {dobra|adj_f|dobar}.", "O iyi biri.", "هي طيبة."],
        ["Voda je {hladna|adj_f|hladan}.", "Su soğuk.", "الماء بارد."],
        ["Mi {smo|biti|biti} ovdje.", "Biz buradayız.", "نحن هنا."],
        ["Grad je lijep.", "Şehir güzel.", "المدينة جميلة."]
      ] },

    // ───────────────────────── A2 ─────────────────────────
    { id: "a2u1", level: "A2", icon: "📚", title: { bs: "Množina", tr: "Çoğul", ar: "الجمع" },
      words: [
        ["knjiga", "kitap", "كتاب", "n", "f", "📕"],
        ["olovka", "kalem", "قلم", "n", "f", "✏️"],
        ["torba", "çanta", "حقيبة", "n", "f", "👜"],
        ["telefon", "telefon", "هاتف", "n", "m", "📱"],
        ["selo", "köy", "قرية", "n", "n", "🏘️"],
        ["pismo", "mektup", "رسالة", "n", "n", "✉️"],
        ["čovjek", "insan, adam", "إنسان، رجل", "n", "m", "🧑"],
        ["čaša", "bardak", "كأس", "n", "f", "🥃"]
      ],
      sents: [
        ["Ovo su jabuk{e|f_pl|jabuka}.", "Bunlar elma.", "هذه تفاحات."],
        ["Knjig{e|f_pl|knjiga} su ovdje.", "Kitaplar burada.", "الكتب هنا."],
        ["Ovo su telefon{i|m_pl|telefon}.", "Bunlar telefon.", "هذه هواتف."],
        ["Sel{a|n_pl|selo} su daleko.", "Köyler uzakta.", "القرى بعيدة."],
        ["{Psi|pl_irr|pas} i mačk{e|f_pl|mačka}.", "Köpekler ve kediler.", "الكلاب والقطط."],
        ["{Djeca|pl_irr|dijete} su ovdje.", "Çocuklar burada.", "الأطفال هنا."],
        ["Grad{ovi|m_pl|grad} su veliki.", "Şehirler büyük.", "المدن كبيرة."],
        ["{Ljudi|pl_irr|čovjek} su dobri.", "İnsanlar iyi.", "الناس طيبون."]
      ] },

    { id: "a2u2", level: "A2", icon: "🎯", title: { bs: "Šta radiš?", tr: "Ne yapıyorsun?", ar: "ماذا تفعل؟" },
      words: [
        ["vidjeti", "görmek", "يرى", "v", "", "👀"],
        ["kupiti", "satın almak", "يشتري", "v", "", "🛒"],
        ["čitati", "okumak", "يقرأ", "v", "", "📖"],
        ["pisati", "yazmak", "يكتب", "v", "", "✍️"],
        ["slušati", "dinlemek", "يستمع", "v", "", "🎧"],
        ["tražiti", "aramak", "يبحث", "v", "", "🔍"],
        ["trebati", "ihtiyacı olmak", "يحتاج", "v", "", "🆘"],
        ["muzika", "müzik", "موسيقى", "n", "f", "🎵"]
      ],
      sents: [
        ["Jedem jabuk{u|f_acc|jabuka}.", "Elma yiyorum.", "آكل تفاحة."],
        ["Pijem vod{u|f_acc|voda}.", "Su içiyorum.", "أشرب الماء."],
        ["Čitam knjig{u|f_acc|knjiga}.", "Kitap okuyorum.", "أقرأ كتابا."],
        ["Vidim brat{a|m_acc_anim|brat}.", "Kardeşimi görüyorum.", "أرى أخي."],
        ["Imam {psa|m_acc_anim|pas}.", "Bir köpeğim var.", "عندي كلب."],
        ["Slušam muzik{u|f_acc|muzika}.", "Müzik dinliyorum.", "أستمع إلى الموسيقى."],
        ["Kupujem hljeb.", "Ekmek alıyorum.", "أشتري الخبز."]
      ] },

    { id: "a2u3", level: "A2", icon: "📍", title: { bs: "Gdje si?", tr: "Neredesin?", ar: "أين أنت؟" },
      words: [
        ["u", "içinde (-de, -da)", "في", "adv", "", "📥"],
        ["na", "üstünde (-de, -da)", "على", "adv", "", "🔝"],
        ["more", "deniz", "بحر", "n", "n", "🌊"],
        ["kancelarija", "ofis", "مكتب", "n", "f", "🗄️"],
        ["univerzitet", "üniversite", "جامعة", "n", "m", "🎓"],
        ["restoran", "restoran", "مطعم", "n", "m", "🍴"]
      ],
      sents: [
        ["Ja sam u kuć{i|loc_f|kuća}.", "Evdeyim.", "أنا في البيت."],
        ["Radim u škol{i|loc_f|škola}.", "Okulda çalışıyorum.", "أعمل في المدرسة."],
        ["Djeca su u park{u|loc_m|park}.", "Çocuklar parkta.", "الأطفال في الحديقة."],
        ["Živim u grad{u|loc_m|grad}.", "Şehirde yaşıyorum.", "أعيش في المدينة."],
        ["Mi smo na mor{u|loc_n|more}.", "Biz denizdeyiz.", "نحن على البحر."],
        ["Živim u Sarajev{u|loc_n}.", "Saraybosna'da yaşıyorum.", "أعيش في سراييفو."],
        ["Kupujem hljeb na pijac{i|loc_f|pijaca}.", "Pazarda ekmek alıyorum.", "أشتري الخبز في السوق."]
      ] },

    { id: "a2u4", level: "A2", icon: "🕰️", title: { bs: "Jučer", tr: "Dün", ar: "أمس" },
      words: [
        ["jučer", "dün", "أمس", "adv", "", "⏪"],
        ["prije", "önce", "قبل", "adv", "", "⏮️"],
        ["sedmica", "hafta", "أسبوع", "n", "f", "🗓️"],
        ["gledati", "izlemek", "يشاهد", "v", "", "📺"],
        ["kuhati", "yemek pişirmek", "يطبخ", "v", "", "🍳"],
        ["doći", "gelmek", "يأتي", "v", "", "🏃"],
        ["film", "film", "فيلم", "n", "m", "🎬"]
      ],
      sents: [
        ["Jučer sam radi{o|past_m|raditi}.", "Dün çalıştım. (erkek)", "أمس عملتُ. (للمذكر)"],
        ["Jučer sam radi{la|past_f|raditi}.", "Dün çalıştım. (kadın)", "أمس عملتُ. (للمؤنث)"],
        ["Ona je gleda{la|past_f|gledati} film.", "O bir film izledi.", "هي شاهدت فيلما."],
        ["On je kuha{o|past_m|kuhati} sup{u|f_acc|supa}.", "O çorba pişirdi.", "هو طبخ الحساء."],
        ["Mi smo je{li|past_pl|jesti} rib{u|f_acc|riba}.", "Biz balık yedik.", "أكلنا السمك."],
        ["{Išao|past_m|ići} sam u škol{u|f_acc|škola}.", "Okula gittim. (erkek)", "ذهبتُ إلى المدرسة. (للمذكر)"]
      ] },

    { id: "a2u5", level: "A2", icon: "⏭️", title: { bs: "Sutra", tr: "Yarın", ar: "غدا" },
      words: [
        ["sutra", "yarın", "غدا", "adv", "", "⏩"],
        ["danas", "bugün", "اليوم", "adv", "", "📆"],
        ["sada", "şimdi", "الآن", "adv", "", "⏱️"],
        ["kasnije", "sonra", "لاحقا", "adv", "", "⌛"],
        ["uvijek", "her zaman", "دائما", "adv", "", "♾️"],
        ["nikad", "asla", "أبدا", "adv", "", "🚫"]
      ],
      sents: [
        ["Sutra {ću|fut} raditi.", "Yarın çalışacağım.", "سأعمل غدا."],
        ["Danas {ćemo|fut} jesti rib{u|f_acc|riba}.", "Bugün balık yiyeceğiz.", "سنأكل السمك اليوم."],
        ["Šta {ćeš|fut} piti?", "Ne içeceksin?", "ماذا ستشرب؟"],
        ["Ona {će|fut} doći kasnije.", "O sonra gelecek.", "ستأتي لاحقا."],
        ["Uvijek pijem kaf{u|f_acc|kafa}.", "Her zaman kahve içerim.", "أشرب القهوة دائما."]
      ] },

    { id: "a2u6", level: "A2", icon: "📅", title: { bs: "Dani i vrijeme", tr: "Günler ve saat", ar: "الأيام والوقت" },
      words: [
        ["ponedjeljak", "pazartesi", "الاثنين", "n", "m", "1️⃣"],
        ["utorak", "salı", "الثلاثاء", "n", "m", "2️⃣"],
        ["srijeda", "çarşamba", "الأربعاء", "n", "f", "3️⃣"],
        ["četvrtak", "perşembe", "الخميس", "n", "m", "4️⃣"],
        ["petak", "cuma", "الجمعة", "n", "m", "5️⃣"],
        ["subota", "cumartesi", "السبت", "n", "f", "6️⃣"],
        ["nedjelja", "pazar", "الأحد", "n", "f", "7️⃣"],
        ["sat", "saat", "ساعة", "n", "m", "⏰"],
        ["dan", "gün", "يوم", "n", "m", "🌞"],
        ["jutro", "sabah", "صباح", "n", "n", "🌄"],
        ["veče", "akşam", "مساء", "n", "n", "🌇"],
        ["noć", "gece", "ليل", "n", "f", "🌃"]
      ],
      sents: [
        ["Danas je petak.", "Bugün cuma.", "اليوم الجمعة."],
        ["U ponedjeljak radim.", "Pazartesi çalışıyorum.", "أعمل يوم الاثنين."],
        ["U subot{u|f_acc|subota} idemo na pijac{u|f_acc|pijaca}.", "Cumartesi pazara gidiyoruz.", "يوم السبت نذهب إلى السوق."],
        ["Koliko je sati?", "Saat kaç?", "كم الساعة؟"],
        ["U nedjelj{u|f_acc|nedjelja} dugo spavam.", "Pazar günü uzun uyurum.", "يوم الأحد أنام طويلا."]
      ] },

    { id: "a2u7", level: "A2", icon: "💼", title: { bs: "Posao i škola", tr: "İş ve okul", ar: "العمل والدراسة" },
      words: [
        ["posao", "iş", "عمل", "n", "m", "💼"],
        ["učitelj", "öğretmen", "معلم", "n", "m", "🧑‍🏫"],
        ["ljekar", "doktor", "طبيب", "n", "m", "🧑‍⚕️"],
        ["inženjer", "mühendis", "مهندس", "n", "m", "👷"],
        ["student", "öğrenci", "طالب", "n", "m", "🧑‍🎓"],
        ["kompjuter", "bilgisayar", "حاسوب", "n", "m", "💻"],
        ["sveska", "defter", "دفتر", "n", "f", "📓"],
        ["zadaća", "ödev", "واجب", "n", "f", "📝"]
      ],
      sents: [
        ["Ja sam ljekar.", "Ben doktorum.", "أنا طبيب."],
        ["Ona je učitelj{ica|fem_noun|učitelj}.", "O öğretmen. (kadın)", "هي معلمة."],
        ["Moj otac je inženjer.", "Babam mühendis.", "أبي مهندس."],
        ["Pišem zadać{u|f_acc|zadaća}.", "Ödev yazıyorum.", "أكتب الواجب."],
        ["Student{i|m_pl|student} uče na univerzitet{u|loc_m|univerzitet}.", "Öğrenciler üniversitede okuyor.", "الطلاب يدرسون في الجامعة."],
        ["Radim na kompjuter{u|loc_m|kompjuter}.", "Bilgisayarda çalışıyorum.", "أعمل على الحاسوب."]
      ] },

    { id: "a2u8", level: "A2", icon: "🛍️", title: { bs: "Kupovina", tr: "Alışveriş", ar: "التسوق" },
      words: [
        ["košulja", "gömlek", "قميص", "n", "f", "👔"],
        ["haljina", "elbise", "فستان", "n", "f", "👗"],
        ["jakna", "ceket", "سترة", "n", "f", "🧥"],
        ["cipele", "ayakkabı", "حذاء", "n", "f", "👞"],
        ["cijena", "fiyat", "سعر", "n", "f", "🏷️"],
        ["novac", "para", "مال", "n", "m", "💵"],
        ["skupo", "pahalı", "غالٍ", "adv", "", "💰"],
        ["jeftino", "ucuz", "رخيص", "adv", "", "🪙"]
      ],
      sents: [
        ["Koliko košta jakna?", "Ceket ne kadar?", "كم سعر السترة؟"],
        ["Ovo je skupo.", "Bu pahalı.", "هذا غالٍ."],
        ["Čaša vod{e|gen|voda}, molim.", "Bir bardak su, lütfen.", "كأس ماء، من فضلك."],
        ["Nemam {novca|gen|novac}.", "Param yok.", "ليس عندي مال."],
        ["Nema hljeb{a|gen|hljeb}.", "Ekmek yok.", "لا يوجد خبز."],
        ["Kupi{la|past_f|kupiti} sam haljin{u|f_acc|haljina}.", "Bir elbise aldım. (kadın)", "اشتريتُ فستانا. (للمؤنث)"]
      ] },

    { id: "a2u9", level: "A2", icon: "🩺", title: { bs: "Tijelo i zdravlje", tr: "Vücut ve sağlık", ar: "الجسم والصحة" },
      words: [
        ["glava", "baş", "رأس", "n", "f", "🧠"],
        ["ruka", "el, kol", "يد", "n", "f", "✋"],
        ["noga", "bacak", "ساق", "n", "f", "🦵"],
        ["oko", "göz", "عين", "n", "n", "👁️"],
        ["uho", "kulak", "أذن", "n", "n", "👂"],
        ["zub", "diş", "سن", "n", "m", "🦷"],
        ["srce", "kalp", "قلب", "n", "n", "❤️"],
        ["stomak", "karın, mide", "بطن", "n", "m", "🫃"],
        ["lijek", "ilaç", "دواء", "n", "m", "💉"],
        ["bolestan", "hasta", "مريض", "adj", "", "🤒"]
      ],
      sents: [
        ["Boli me glava.", "Başım ağrıyor.", "رأسي يؤلمني."],
        ["Boli me stomak.", "Midem ağrıyor.", "بطني يؤلمني."],
        ["Bolestan sam.", "Hastayım. (erkek)", "أنا مريض."],
        ["{Bolesna|adj_f|bolestan} sam.", "Hastayım. (kadın)", "أنا مريضة."],
        ["Trebam lijek.", "İlaca ihtiyacım var.", "أحتاج دواء."],
        ["{Oči|pl_irr|oko} su plave.", "Gözler mavi.", "العيون زرقاء."]
      ] },

    { id: "a2u10", level: "A2", icon: "✈️", title: { bs: "Putovanje", tr: "Seyahat", ar: "السفر" },
      words: [
        ["avion", "uçak", "طائرة", "n", "m", "✈️"],
        ["voz", "tren", "قطار", "n", "m", "🚆"],
        ["aerodrom", "havalimanı", "مطار", "n", "m", "🛫"],
        ["karta", "bilet", "تذكرة", "n", "f", "🎫"],
        ["hotel", "otel", "فندق", "n", "m", "🏨"],
        ["planina", "dağ", "جبل", "n", "f", "⛰️"],
        ["rijeka", "nehir", "نهر", "n", "f", "🏞️"],
        ["pasoš", "pasaport", "جواز سفر", "n", "m", "🛂"],
        ["putovati", "seyahat etmek", "يسافر", "v", "", "🧳"]
      ],
      sents: [
        ["Putujem voz{om|ins|voz}.", "Trenle seyahat ediyorum.", "أسافر بالقطار."],
        ["Idemo avion{om|ins|avion} u Mostar.", "Mostar'a uçakla gidiyoruz.", "نذهب إلى موستار بالطائرة."],
        ["Gdje je aerodrom?", "Havalimanı nerede?", "أين المطار؟"],
        ["Trebam kart{u|f_acc|karta} za Sarajevo.", "Saraybosna için bilete ihtiyacım var.", "أحتاج تذكرة إلى سراييفو."],
        ["Putujem sa sestr{om|ins|sestra}.", "Kız kardeşimle seyahat ediyorum.", "أسافر مع أختي."],
        ["Hotel je blizu rijek{e|gen|rijeka}.", "Otel nehrin yakınında.", "الفندق قريب من النهر."]
      ] },

    // ───────────────────────── B1 ─────────────────────────
    { id: "b1u1", level: "B1", icon: "🩺", title: { bs: "Kod ljekara", tr: "Doktorda", ar: "عند الطبيب" },
      words: [
        ["pregled", "muayene", "فحص طبي", "n", "m", "🔍"],
        ["recept", "reçete", "وصفة طبية", "n", "m", "📄"],
        ["termin", "randevu", "موعد", "n", "m", "📅"],
        ["temperatura", "ateş", "حرارة", "n", "f", "🌡️"],
        ["kašalj", "öksürük", "سعال", "n", "m", "😷"],
        ["prehlada", "soğuk algınlığı", "زكام", "n", "f", "🤧"],
        ["tableta", "tablet (ilaç)", "قرص دواء", "n", "f", "💊"],
        ["zdravlje", "sağlık", "صحة", "n", "n", "💚"],
        ["hitna pomoć", "ambulans, acil", "الإسعاف", "phr", "", "🚑"],
        ["medicinska sestra", "hemşire", "ممرضة", "phr", "", "👩‍⚕️"],
        ["pozvati", "çağırmak", "يتصل، يستدعي", "v", "", "📞"]
      ],
      sents: [
        ["Idem ljekar{u|dat|ljekar}.", "Doktora gidiyorum.", "أذهب إلى الطبيب."],
        ["Dajem recept sestr{i|dat|sestra}.", "Reçeteyi hemşireye veriyorum.", "أعطي الوصفة للممرضة."],
        ["Imam temperatur{u|f_acc|temperatura}.", "Ateşim var.", "عندي حرارة."],
        ["Ljekar mi daje tablet{e|f_pl|tableta}.", "Doktor bana tablet veriyor.", "الطبيب يعطيني أقراصا."],
        ["Trebam termin za pregled.", "Muayene için randevuya ihtiyacım var.", "أحتاج موعدا للفحص."],
        ["Pozov{ite|imp|pozvati} hitnu pomoć!", "Ambulans çağırın!", "اتصلوا بالإسعاف!"]
      ] },

    { id: "b1u2", level: "B1", icon: "👔", title: { bs: "Posao i intervju", tr: "İş ve mülakat", ar: "العمل والمقابلة" },
      words: [
        ["šef", "müdür, patron", "مدير", "n", "m", "🧑‍💼"],
        ["plata", "maaş", "راتب", "n", "f", "💶"],
        ["firma", "şirket", "شركة", "n", "f", "🏢"],
        ["iskustvo", "deneyim", "خبرة", "n", "n", "⭐"],
        ["intervju", "mülakat", "مقابلة", "n", "m", "🗣️"],
        ["ugovor", "sözleşme", "عقد", "n", "m", "📝"],
        ["kolega", "iş arkadaşı", "زميل", "n", "m", "👥"],
        ["radno vrijeme", "çalışma saatleri", "ساعات العمل", "phr", "", "🕘"]
      ],
      sents: [
        ["Sutra imam intervju.", "Yarın mülakatım var.", "عندي مقابلة غدا."],
        ["Razgovaram sa šef{om|ins|šef}.", "Müdürle konuşuyorum.", "أتكلم مع المدير."],
        ["Imam tri godine iskustv{a|gen|iskustvo}.", "Üç yıllık deneyimim var.", "عندي ثلاث سنوات من الخبرة."],
        ["Potpisujem ugovor s firm{om|ins|firma}.", "Şirketle sözleşme imzalıyorum.", "أوقّع عقدا مع الشركة."],
        ["Plata je dobra.", "Maaş iyi.", "الراتب جيد."],
        ["Moj kolega je ljubazan.", "İş arkadaşım nazik.", "زميلي لطيف."]
      ] },

    { id: "b1u3", level: "B1", icon: "🏘️", title: { bs: "Stan i komšije", tr: "Ev ve komşular", ar: "السكن والجيران" },
      words: [
        ["komšija", "komşu", "جار", "n", "m", "🧑‍🤝‍🧑"],
        ["zgrada", "bina", "مبنى", "n", "f", "🏬"],
        ["sprat", "kat", "طابق", "n", "m", "🔼"],
        ["lift", "asansör", "مصعد", "n", "m", "🛗"],
        ["kirija", "kira", "إيجار", "n", "f", "💷"],
        ["balkon", "balkon", "شرفة", "n", "m", "🪴"],
        ["zid", "duvar", "جدار", "n", "m", "🧱"],
        ["komšiluk", "mahalle", "حيّ", "n", "m", "🏡"],
        ["struja", "elektrik", "كهرباء", "n", "f", "⚡"]
      ],
      sents: [
        ["Moj komšija živi na trećem sprat{u|loc_m|sprat}.", "Komşum üçüncü katta oturuyor.", "جاري يسكن في الطابق الثالث."],
        ["Ljudi žive u stan{ovima|loc_pl|stan}.", "İnsanlar dairelerde yaşıyor.", "الناس يعيشون في الشقق."],
        ["Živimo u velikim grad{ovima|loc_pl|grad}.", "Büyük şehirlerde yaşıyoruz.", "نعيش في مدن كبيرة."],
        ["Na ulic{ama|loc_pl|ulica} je gužva.", "Sokaklarda kalabalık var.", "الشوارع مزدحمة."],
        ["Kirija je skup{a|adj_f}.", "Kira pahalı.", "الإيجار غالٍ."],
        ["Lift ne radi.", "Asansör çalışmıyor.", "المصعد لا يعمل."]
      ] },

    { id: "b1u4", level: "B1", icon: "📮", title: { bs: "Banka i pošta", tr: "Banka ve postane", ar: "البنك والبريد" },
      words: [
        ["pošta", "postane", "مكتب البريد", "n", "f", "📮"],
        ["račun", "hesap, fatura", "حساب، فاتورة", "n", "m", "🧾"],
        ["kartica", "kart", "بطاقة", "n", "f", "💳"],
        ["marka", "mark (para)", "مارك (عملة)", "n", "f", "💴"],
        ["paket", "paket", "طرد", "n", "m", "📦"],
        ["red", "sıra, kuyruk", "طابور", "n", "m", "🧍"],
        ["šalter", "gişe", "شبّاك", "n", "m", "🏧"],
        ["potpis", "imza", "توقيع", "n", "m", "🖊️"],
        ["plaćati", "ödemek", "يدفع", "v", "", "💸"]
      ],
      sents: [
        ["To košta pet {maraka|gen_pl|marka}.", "Bu beş mark tutuyor.", "هذا يكلف خمسة ماركات."],
        ["Čekam deset minut{a|gen_pl}.", "On dakika bekliyorum.", "أنتظر عشر دقائق."],
        ["Imam puno paket{a|gen_pl|paket}.", "Çok paketim var.", "عندي طرود كثيرة."],
        ["Plaćam račun kartic{om|ins|kartica}.", "Faturayı kartla ödüyorum.", "أدفع الفاتورة بالبطاقة."],
        ["Šaljem paket u Tursk{u|f_acc}.", "Türkiye'ye paket gönderiyorum.", "أرسل طردا إلى تركيا."],
        ["Trebam vaš potpis ovdje.", "Burada imzanız gerekiyor.", "أحتاج توقيعك هنا."]
      ] },

    { id: "b1u5", level: "B1", icon: "🎒", title: { bs: "Škola i djeca", tr: "Okul ve çocuklar", ar: "المدرسة والأطفال" },
      words: [
        ["učenik", "öğrenci (okul)", "تلميذ", "n", "m", "🧒"],
        ["učionica", "sınıf", "فصل دراسي", "n", "f", "🏫"],
        ["ocjena", "not", "درجة، علامة", "n", "f", "💯"],
        ["raspust", "okul tatili", "عطلة مدرسية", "n", "m", "🏖️"],
        ["roditelj", "ebeveyn", "أحد الوالدين", "n", "m", "👪"],
        ["napisati", "yazmak (bitirmek)", "يكتب (وينهي)", "v", "", "✍️"],
        ["pročitati", "okumak (bitirmek)", "يقرأ (حتى النهاية)", "v", "", "📗"],
        ["uraditi", "yapmak (bitirmek)", "يُنجز", "v", "", "✅"]
      ],
      sents: [
        ["Pisao sam zadaću cijelo veče.", "Bütün akşam ödev yazdım.", "كنتُ أكتب الواجب طوال المساء."],
        ["{Na|aspect|napisati}pisao sam zadaću.", "Ödevi yazıp bitirdim.", "كتبتُ الواجب وأنهيته."],
        ["{Pro|aspect|pročitati}čitao sam knjigu.", "Kitabı okuyup bitirdim.", "قرأتُ الكتاب حتى النهاية."],
        ["Moj sin ima dobre ocjen{e|f_pl|ocjena}.", "Oğlumun notları iyi.", "ابني لديه علامات جيدة."],
        ["Roditelj{i|m_pl|roditelj} dolaze u škol{u|f_acc|škola}.", "Ebeveynler okula geliyor.", "الأهل يأتون إلى المدرسة."],
        ["Učenici su u učionic{i|loc_f|učionica}.", "Öğrenciler sınıfta.", "التلاميذ في الفصل."]
      ] },

    { id: "b1u6", level: "B1", icon: "🧾", title: { bs: "Kupovina i reklamacija", tr: "Alışveriş ve iade", ar: "الشراء والإرجاع" },
      words: [
        ["reklamacija", "şikâyet, iade talebi", "شكوى، طلب إرجاع", "n", "f", "📢"],
        ["kusur", "para üstü", "الباقي", "n", "m", "🪙"],
        ["veličina", "beden", "مقاس", "n", "f", "📏"],
        ["kesa", "poşet", "كيس", "n", "f", "🛍️"],
        ["popust", "indirim", "تخفيض", "n", "m", "🔖"],
        ["garancija", "garanti", "ضمان", "n", "f", "🛡️"],
        ["vratiti", "geri vermek, iade etmek", "يُرجِع", "v", "", "↩️"],
        ["zamijeniti", "değiştirmek", "يستبدل", "v", "", "🔄"],
        ["probati", "denemek", "يجرّب", "v", "", "👕"]
      ],
      sents: [
        ["Daj{te|imp} mi kesu, molim vas.", "Bana bir poşet verin, lütfen.", "أعطني كيسا من فضلك."],
        ["Probaj{te|imp|probati} ovu jaknu.", "Bu ceketi deneyin.", "جرّب هذه السترة."],
        ["Želim vratiti cipele.", "Ayakkabıları iade etmek istiyorum.", "أريد إرجاع الحذاء."],
        ["Imate li veću veličinu?", "Daha büyük bedeniniz var mı?", "هل عندكم مقاس أكبر؟"],
        ["Ima li popust{a|gen|popust}?", "İndirim var mı?", "هل يوجد تخفيض؟"],
        ["Čekaj{te|imp}, ovo je vaš kusur.", "Bekleyin, bu sizin para üstünüz.", "انتظر، هذا هو الباقي."]
      ] },

    { id: "b1u7", level: "B1", icon: "🌦️", title: { bs: "Vrijeme i priroda", tr: "Hava ve doğa", ar: "الطقس والطبيعة" },
      words: [
        ["kiša", "yağmur", "مطر", "n", "f", "🌧️"],
        ["snijeg", "kar", "ثلج", "n", "m", "☃️"],
        ["sunce", "güneş", "شمس", "n", "n", "🌤️"],
        ["vjetar", "rüzgâr", "رياح", "n", "m", "💨"],
        ["oblak", "bulut", "غيمة", "n", "m", "☁️"],
        ["cvijet", "çiçek", "زهرة", "n", "m", "🌷"],
        ["jezero", "göl", "بحيرة", "n", "n", "⛵"],
        ["toplo", "sıcak (hava)", "دافئ", "adv", "", "🌡️"],
        ["hladno", "soğuk (hava)", "بارد", "adv", "", "🥶"]
      ],
      sents: [
        ["Pada kiša.", "Yağmur yağıyor.", "إنها تمطر."],
        ["Danas je toplo.", "Bugün hava sıcak.", "الجو دافئ اليوم."],
        ["Sviđa mi {se|refl} snijeg.", "Karı seviyorum.", "يعجبني الثلج."],
        ["Djeca {se|refl} igraju u parku.", "Çocuklar parkta oynuyor.", "الأطفال يلعبون في الحديقة."],
        ["Na nebu nema oblak{a|gen|oblak}.", "Gökyüzünde bulut yok.", "لا توجد غيوم في السماء."],
        ["Zimi je hladno.", "Kışın hava soğuk.", "الجو بارد في الشتاء."]
      ] },

    { id: "b1u8", level: "B1", icon: "🏛️", title: { bs: "Općina i dokumenti", tr: "Belediye ve belgeler", ar: "البلدية والوثائق" },
      words: [
        ["općina", "belediye", "بلدية", "n", "f", "🏛️"],
        ["dokument", "belge", "وثيقة", "n", "m", "🗂️"],
        ["lična karta", "kimlik kartı", "بطاقة الهوية", "phr", "", "🪪"],
        ["obrazac", "form", "استمارة", "n", "m", "📋"],
        ["adresa", "adres", "عنوان", "n", "f", "📍"],
        ["datum", "tarih", "تاريخ", "n", "m", "🗓️"],
        ["morati", "zorunda olmak", "يجب عليه", "v", "", "❗"],
        ["moći", "-ebilmek", "يستطيع", "v", "", "💪"],
        ["smjeti", "izinli olmak", "يُسمح له", "v", "", "🟢"]
      ],
      sents: [
        ["{Moram|modal|morati} popuniti obrazac.", "Formu doldurmam gerekiyor.", "يجب أن أملأ الاستمارة."],
        ["{Možete|modal|moći} li mi pomoći?", "Bana yardım edebilir misiniz?", "هل يمكنك مساعدتي؟"],
        ["Ovdje se ne {smije|modal|smjeti} pušiti.", "Burada sigara içilmez.", "ممنوع التدخين هنا."],
        ["Trebam ličnu kart{u|f_acc|karta}.", "Kimlik kartına ihtiyacım var.", "أحتاج بطاقة الهوية."],
        ["Napiš{ite|imp|pisati} vašu adres{u|f_acc|adresa}.", "Adresinizi yazın.", "اكتب عنوانك."],
        ["Koji je datum danas?", "Bugün tarih ne?", "ما تاريخ اليوم؟"]
      ] },

    { id: "b1u9", level: "B1", icon: "🎉", title: { bs: "Praznici i običaji", tr: "Bayramlar ve gelenekler", ar: "الأعياد والعادات" },
      words: [
        ["praznik", "bayram, tatil günü", "عيد، عطلة", "n", "m", "🎉"],
        ["Bajram", "Bayram", "العيد", "n", "m", "🌙"],
        ["poklon", "hediye", "هدية", "n", "m", "🎀"],
        ["gost", "misafir", "ضيف", "n", "m", "🙋"],
        ["proslava", "kutlama", "احتفال", "n", "f", "🥳"],
        ["čestitka", "tebrik kartı", "بطاقة تهنئة", "n", "f", "💌"],
        ["kolač", "tatlı, pasta", "حلوى، كعكة", "n", "m", "🍰"],
        ["ručak", "öğle yemeği", "غداء", "n", "m", "🥘"],
        ["posjetiti", "ziyaret etmek", "يزور", "v", "", "🚶‍♀️"]
      ],
      sents: [
        ["Bajram šerif mubarek olsun!", "Bayramınız mübarek olsun!", "عيد مبارك!"],
        ["Volio {bih|cond} posjetiti baku.", "Büyükannemi ziyaret etmek isterdim.", "أودّ أن أزور جدتي."],
        ["Kupi{la|past_f|kupiti} sam poklon za brat{a|m_acc_anim|brat}.", "Kardeşime hediye aldım. (kadın)", "اشتريتُ هدية لأخي. (للمؤنث)"],
        ["Gost{i|m_pl|gost} dolaze na ručak.", "Misafirler öğle yemeğine geliyor.", "الضيوف قادمون إلى الغداء."],
        ["Mogli {bismo|cond} slaviti zajedno.", "Birlikte kutlayabilirdik.", "يمكننا أن نحتفل معا."],
        ["Čestitam ti praznik!", "Bayramını kutlarım!", "أهنئك بالعيد!"]
      ] },

    { id: "b1u10", level: "B1", icon: "🗺️", title: { bs: "Planovi", tr: "Planlar", ar: "الخطط" },
      words: [
        ["ako", "eğer", "إذا", "conj", "", "🔀"],
        ["kad", "-dığında, ne zaman", "عندما", "conj", "", "🕰️"],
        ["jer", "çünkü", "لأن", "conj", "", "➡️"],
        ["ali", "ama", "لكن", "conj", "", "↔️"],
        ["zato", "bu yüzden", "لذلك", "conj", "", "🔗"],
        ["plan", "plan", "خطة", "n", "m", "🗺️"],
        ["cilj", "hedef", "هدف", "n", "m", "🎯"],
        ["budućnost", "gelecek", "مستقبل", "n", "f", "🔮"],
        ["naučiti", "öğrenmek (bitirmek)", "يتعلّم (تماما)", "v", "", "🧠"]
      ],
      sents: [
        ["Ako bude lijepo vrijeme, ići {ćemo|fut} na more.", "Hava güzel olursa denize gideceğiz.", "إذا كان الطقس جميلا سنذهب إلى البحر."],
        ["Učim bosanski jer živim u Bosn{i|loc_f}.", "Bosna'da yaşadığım için Boşnakça öğreniyorum.", "أتعلم البوسنية لأنني أعيش في البوسنة."],
        ["Kad završim posao, idem kući.", "İşi bitirince eve gidiyorum.", "عندما أنهي العمل أذهب إلى البيت."],
        ["Moj cilj je dobro govoriti bosanski.", "Hedefim iyi Boşnakça konuşmak.", "هدفي أن أتكلم البوسنية جيدا."],
        ["Umoran sam, ali {ću|fut} učiti.", "Yorgunum ama ders çalışacağım.", "أنا متعب، لكنني سأدرس."],
        ["{Na|aspect|naučiti}učit {ću|fut} nove riječi.", "Yeni kelimeler öğreneceğim.", "سأتعلم كلمات جديدة."]
      ] },

    // ───────── Dodatne jedinice (verzija 1.3.0): app ih slaže po nivou A1 → B2 ─────────
    { id: "a1u11", level: "A1", icon: "👕", title: { bs: "Odjeća", tr: "Giyim", ar: "الملابس" },
      words: [
        ["majica", "tişört", "قميص قصير", "n", "f", "👕"],
        ["pantalone", "pantolon", "بنطال", "n", "f", "👖"],
        ["suknja", "etek", "تنورة", "n", "f", "👗"],
        ["kapa", "bere, şapka", "قبعة", "n", "f", "🧢"],
        ["čarape", "çorap", "جوارب", "n", "f", "🧦"],
        ["šal", "atkı", "وشاح", "n", "m", "🧣"],
        ["rukavice", "eldiven", "قفازات", "n", "f", "🧤"],
        ["kaput", "palto", "معطف", "n", "m", "🧥"],
        ["patike", "spor ayakkabı", "حذاء رياضي", "n", "f", "👟"],
        ["džemper", "kazak", "كنزة", "n", "m", "🧶"],
        ["kaiš", "kemer", "حزام", "n", "m", "🪢"],
        ["naočale", "gözlük", "نظارة", "n", "f", "👓"],
        ["odjeća", "kıyafet", "ملابس", "n", "f", "👚"],
        ["obući", "giymek", "يرتدي", "v", "", "👕"],
        ["nositi", "taşımak, giymek", "يحمل، يلبس", "v", "", "👜"]
      ],
      sents: [
        ["Ovo je moj{a|poss|moj} majica.", "Bu benim tişörtüm.", "هذا قميصي."],
        ["Gdje su moje čarape?", "Çoraplarım nerede?", "أين جواربي؟"],
        ["Zimi nosim šal i kap{u|f_acc|kapa}.", "Kışın atkı ve bere takarım.", "في الشتاء ألبس وشاحا وقبعة."],
        ["Patike su nove.", "Spor ayakkabılar yeni.", "الأحذية الرياضية جديدة."]
      ] },

    { id: "a1u12", level: "A1", icon: "🥕", title: { bs: "Voće i povrće", tr: "Meyve ve sebze", ar: "الفواكه والخضروات" },
      words: [
        ["voće", "meyve", "فواكه", "n", "n", "🍏"],
        ["povrće", "sebze", "خضروات", "n", "n", "🥦"],
        ["kupus", "lahana", "ملفوف", "n", "m", "🥬"],
        ["paprika", "dolmalık biber", "فلفل حلو", "n", "f", "🫑"],
        ["trešnja", "kiraz", "كرز", "n", "f", "🍒"],
        ["lubenica", "karpuz", "بطيخ", "n", "f", "🍉"],
        ["krompir", "patates", "بطاطا", "n", "m", "🥔"],
        ["luk", "soğan", "بصل", "n", "m", "🧅"],
        ["paradajz", "domates", "طماطم", "n", "m", "🍅"],
        ["krastavac", "salatalık", "خيار", "n", "m", "🥒"],
        ["mrkva", "havuç", "جزر", "n", "f", "🥕"],
        ["kruška", "armut", "إجاص", "n", "f", "🍐"],
        ["grožđe", "üzüm", "عنب", "n", "n", "🍇"],
        ["limun", "limon", "ليمون", "n", "m", "🍋"],
        ["jagoda", "çilek", "فراولة", "n", "f", "🍓"]
      ],
      sents: [
        ["Volim voće.", "Meyveyi severim.", "أحب الفواكه."],
        ["Kupujem krompir i luk.", "Patates ve soğan alıyorum.", "أشتري البطاطا والبصل."],
        ["Dvije krušk{e|num234|kruška}, molim.", "İki armut, lütfen.", "إجاصتان من فضلك."],
        ["Jagod{e|f_pl|jagoda} su slatke.", "Çilekler tatlı.", "الفراولة حلوة."]
      ] },

    { id: "a1u13", level: "A1", icon: "🥐", title: { bs: "Doručak i večera", tr: "Kahvaltı ve akşam yemeği", ar: "الفطور والعشاء" },
      words: [
        ["doručak", "kahvaltı", "فطور", "n", "m", "🍳"],
        ["večera", "akşam yemeği", "عشاء", "n", "f", "🍽️"],
        ["jogurt", "yoğurt", "لبن زبادي", "n", "m", "🥣"],
        ["kifla", "poğaça", "كرواسون", "n", "f", "🥐"],
        ["pekmez", "reçel", "مربى", "n", "m", "🫙"],
        ["puter", "tereyağı", "زبدة", "n", "m", "🧈"],
        ["salata", "salata", "سلطة", "n", "f", "🥗"],
        ["ćevapi", "ćevapi (köfte)", "تشيفابي (كفتة)", "n", "m", "🍢"],
        ["sok", "meyve suyu", "عصير", "n", "m", "🧃"],
        ["med", "bal", "عسل", "n", "m", "🍯"],
        ["riža", "pirinç", "أرز", "n", "f", "🍚"],
        ["so", "tuz", "ملح", "n", "f", "🧂"],
        ["biber", "biber", "فلفل", "n", "m", "🌶️"],
        ["pita", "börek", "فطيرة", "n", "f", "🥧"]
      ],
      sents: [
        ["Za doručak jedem jaje i hljeb.", "Kahvaltıda yumurta ve ekmek yerim.", "في الفطور آكل بيضة وخبزا."],
        ["Ujutro pijem sok.", "Sabahları meyve suyu içerim.", "أشرب العصير في الصباح."],
        ["Ćevapi su ukusni.", "Ćevapi çok lezzetli.", "التشيفابي لذيذ."],
        ["Ima li riž{e|gen|riža}?", "Pirinç var mı?", "هل يوجد أرز؟"]
      ] },

    { id: "a1u14", level: "A1", icon: "🍴", title: { bs: "U kuhinji", tr: "Mutfakta", ar: "في المطبخ" },
      words: [
        ["lonac", "tencere", "قدر", "n", "m", "🍲"],
        ["tava", "tava", "مقلاة", "n", "f", "🍳"],
        ["sudoper", "eviye", "مغسلة المطبخ", "n", "m", "🚰"],
        ["mašina za veš", "çamaşır makinesi", "غسالة", "phr", "", "🧺"],
        ["tanjir", "tabak", "صحن", "n", "m", "🍽️"],
        ["viljuška", "çatal", "شوكة", "n", "f", "🍴"],
        ["nož", "bıçak", "سكين", "n", "m", "🔪"],
        ["kašika", "kaşık", "ملعقة", "n", "f", "🥄"],
        ["šolja", "fincan", "فنجان", "n", "f", "☕"],
        ["flaša", "şişe", "زجاجة", "n", "f", "🍾"],
        ["frižider", "buzdolabı", "ثلاجة", "n", "m", "🧊"],
        ["šporet", "ocak", "موقد", "n", "m", "🔥"]
      ],
      sents: [
        ["Nož je na stol{u|loc_m|stol}.", "Bıçak masanın üstünde.", "السكين على الطاولة."],
        ["Gdje je šolja?", "Fincan nerede?", "أين الفنجان؟"],
        ["Mlijeko je u frižider{u|loc_m|frižider}.", "Süt buzdolabında.", "الحليب في الثلاجة."],
        ["Trebam viljušk{u|f_acc|viljuška} i nož.", "Çatal ve bıçağa ihtiyacım var.", "أحتاج شوكة وسكينا."]
      ] },

    { id: "a1u15", level: "A1", icon: "🛁", title: { bs: "Kupatilo i spavaća soba", tr: "Banyo ve yatak odası", ar: "الحمام وغرفة النوم" },
      words: [
        ["četkica za zube", "diş fırçası", "فرشاة أسنان", "phr", "", "🪥"],
        ["pasta za zube", "diş macunu", "معجون أسنان", "phr", "", "🦷"],
        ["tuš", "duş", "دُش", "n", "m", "🚿"],
        ["šampon", "şampuan", "شامبو", "n", "m", "🧴"],
        ["ormar", "dolap", "خزانة", "n", "m", "🚪"],
        ["toalet", "tuvalet", "مرحاض", "n", "m", "🚽"],
        ["češalj", "tarak", "مشط", "n", "m", "💇"],
        ["sapun", "sabun", "صابون", "n", "m", "🧼"],
        ["peškir", "havlu", "منشفة", "n", "m", "🧺"],
        ["ogledalo", "ayna", "مرآة", "n", "n", "🪞"],
        ["jastuk", "yastık", "وسادة", "n", "m", "🛏️"],
        ["ćebe", "battaniye", "بطانية", "n", "n", "🛌"]
      ],
      sents: [
        ["Sapun je u kupatil{u|loc_n|kupatilo}.", "Sabun banyoda.", "الصابون في الحمام."],
        ["Treba mi novi peškir.", "Yeni bir havluya ihtiyacım var.", "أحتاج منشفة جديدة."],
        ["Jastuk je mekan.", "Yastık yumuşak.", "الوسادة ناعمة."],
        ["Odjeća je u ormar{u|loc_m|ormar}.", "Kıyafetler dolapta.", "الملابس في الخزانة."]
      ] },

    { id: "a1u16", level: "A1", icon: "🙂", title: { bs: "Kakav je?", tr: "Nasıl biri?", ar: "كيف هو؟" },
      words: [
        ["visok", "uzun (boylu), yüksek", "طويل، عالٍ", "adj", "", "🦒"],
        ["nizak", "kısa (boylu), alçak", "قصير، منخفض", "adj", "", "🐁"],
        ["mlad", "genç", "شاب", "adj", "", "🧑"],
        ["sretan", "mutlu", "سعيد", "adj", "", "😄"],
        ["tužan", "üzgün", "حزين", "adj", "", "😞"],
        ["umoran", "yorgun", "متعب", "adj", "", "🥱"],
        ["gladan", "aç", "جائع", "adj", "", "🍽️"],
        ["žedan", "susamış", "عطشان", "adj", "", "🥤"],
        ["brz", "hızlı", "سريع", "adj", "", "⚡"],
        ["spor", "yavaş", "بطيء", "adj", "", "🐢"],
        ["jak", "güçlü", "قوي", "adj", "", "💪"],
        ["slab", "zayıf, güçsüz", "ضعيف", "adj", "", "🥀"],
        ["debeo", "şişman", "سمين", "adj", "", "🍔"],
        ["mršav", "zayıf, ince", "نحيف", "adj", "", "🥢"],
        ["ljubazan", "nazik", "لطيف", "adj", "", "🤗"]
      ],
      sents: [
        ["Moj brat je visok.", "Kardeşim uzun boylu.", "أخي طويل."],
        ["Ona je {sretna|adj_f|sretan}.", "O mutlu.", "هي سعيدة."],
        ["Gladan sam i žedan.", "Açım ve susadım.", "أنا جائع وعطشان."],
        ["Moja baka je {ljubazna|adj_f|ljubazan}.", "Büyükannem nazik.", "جدتي لطيفة."]
      ] },

    { id: "a1u17", level: "A1", icon: "🕐", title: { bs: "Koliko je sati?", tr: "Saat kaç?", ar: "كم الساعة؟" },
      words: [
        ["minuta", "dakika", "دقيقة", "n", "f", "⏱️"],
        ["sekunda", "saniye", "ثانية", "n", "f", "⏲️"],
        ["četvrt", "çeyrek", "ربع", "n", "f", "🕒"],
        ["podne", "öğle", "الظهر", "n", "n", "🕛"],
        ["ponoć", "gece yarısı", "منتصف الليل", "n", "f", "🌌"],
        ["popodne", "öğleden sonra", "بعد الظهر", "n", "n", "🌤️"],
        ["vrijeme", "zaman; hava", "وقت؛ طقس", "n", "n", "⏳"],
        ["budilnik", "çalar saat", "منبّه", "n", "m", "⏰"],
        ["kasniti", "geç kalmak", "يتأخر", "v", "", "🏃‍♂️"],
        ["žuriti", "acele etmek", "يستعجل", "v", "", "🏃‍♀️"],
        ["pola", "yarım", "نصف", "num", "", "½"],
        ["rano", "erken", "مبكرا", "adv", "", "🐓"],
        ["kasno", "geç", "متأخرا", "adv", "", "🦉"]
      ],
      sents: [
        ["Sada je pola dva.", "Şimdi saat bir buçuk.", "الساعة الآن الواحدة والنصف."],
        ["Ustajem rano.", "Erken kalkarım.", "أستيقظ مبكرا."],
        ["Kasnim pet minut{a|gen_pl|minuta}.", "Beş dakika geç kalıyorum.", "أتأخر خمس دقائق."],
        ["U podne ručamo.", "Öğlen yemek yiyoruz.", "نتغدّى عند الظهر."]
      ] },

    { id: "a1u18", level: "A1", icon: "🍂", title: { bs: "Mjeseci i godišnja doba", tr: "Aylar ve mevsimler", ar: "الشهور والفصول" },
      words: [
        ["januar", "ocak", "يناير", "n", "m", "1"],
        ["februar", "şubat", "فبراير", "n", "m", "2"],
        ["mart", "mart", "مارس", "n", "m", "3"],
        ["april", "nisan", "أبريل", "n", "m", "4"],
        ["maj", "mayıs", "مايو", "n", "m", "5"],
        ["juni", "haziran", "يونيو", "n", "m", "6"],
        ["juli", "temmuz", "يوليو", "n", "m", "7"],
        ["august", "ağustos", "أغسطس", "n", "m", "8"],
        ["septembar", "eylül", "سبتمبر", "n", "m", "9"],
        ["oktobar", "ekim", "أكتوبر", "n", "m", "10"],
        ["novembar", "kasım", "نوفمبر", "n", "m", "11"],
        ["decembar", "aralık", "ديسمبر", "n", "m", "12"],
        ["ljeto", "yaz", "صيف", "n", "n", "🏖️"],
        ["zima", "kış", "شتاء", "n", "f", "⛄"],
        ["proljeće", "ilkbahar", "ربيع", "n", "n", "🌼"],
        ["jesen", "sonbahar", "خريف", "n", "f", "🍂"]
      ],
      sents: [
        ["U januar{u|loc_m|januar} je hladno.", "Ocakta hava soğuk.", "الجو بارد في يناير."],
        ["Volim ljeto.", "Yazı severim.", "أحب الصيف."],
        ["Rođen sam u maj{u|loc_m|maj}.", "Mayısta doğdum.", "وُلدتُ في مايو."],
        ["Jesen je lijep{a|adj_f|lijep}.", "Sonbahar güzel.", "الخريف جميل."]
      ] },

    { id: "a1u19", level: "A1", icon: "❓", title: { bs: "Pitanja", tr: "Sorular", ar: "الأسئلة" },
      words: [
        ["odakle", "nereden", "من أين", "adv", "", "🧭"],
        ["kuda", "nereye", "إلى أين", "adv", "", "➡️"],
        ["da li", "mı, mi (soru)", "هل", "phr", "", "❔"],
        ["kakav", "nasıl (bir)", "أيّ نوع، كيف", "pron", "", "🤔"],
        ["ko", "kim", "مَن", "pron", "", "❓"],
        ["šta", "ne", "ماذا", "pron", "", "❔"],
        ["gdje", "nerede", "أين", "adv", "", "🗺️"],
        ["kada", "ne zaman", "متى", "adv", "", "🕒"],
        ["zašto", "neden", "لماذا", "adv", "", "❔"],
        ["kako", "nasıl", "كيف", "adv", "", "❓"],
        ["koliko", "ne kadar, kaç", "كم", "adv", "", "🔢"],
        ["koji", "hangi", "أيّ", "pron", "", "🔢"],
        ["čiji", "kimin", "لِمَن", "pron", "", "🏷️"]
      ],
      sents: [
        ["Odakle si?", "Nerelisin?", "من أين أنت؟"],
        ["Ja sam iz Tursk{e|gen}.", "Ben Türkiye'denim.", "أنا من تركيا."],
        ["Zašto učiš bosanski?", "Neden Boşnakça öğreniyorsun?", "لماذا تتعلم البوسنية؟"],
        ["Koliko imaš godina?", "Kaç yaşındasın?", "كم عمرك؟"]
      ] },

    { id: "a1u20", level: "A1", icon: "☕", title: { bs: "Mjesta u gradu", tr: "Şehirdeki yerler", ar: "أماكن في المدينة" },
      words: [
        ["pekara", "fırın", "مخبز", "n", "f", "🥖"],
        ["kafić", "kafe", "مقهى", "n", "m", "☕"],
        ["kino", "sinema", "سينما", "n", "n", "🎬"],
        ["muzej", "müze", "متحف", "n", "m", "🏺"],
        ["trg", "meydan", "ساحة", "n", "m", "⛲"],
        ["čaršija", "çarşı", "السوق القديم", "n", "f", "🏮"],
        ["tržni centar", "alışveriş merkezi", "مركز تسوق", "phr", "", "🛒"],
        ["frizer", "kuaför", "حلاق", "n", "m", "💈"],
        ["policija", "polis", "شرطة", "n", "f", "👮"],
        ["benzinska pumpa", "benzin istasyonu", "محطة وقود", "phr", "", "⛽"],
        ["crkva", "kilise", "كنيسة", "n", "f", "⛪"],
        ["parking", "otopark", "موقف سيارات", "n", "m", "🅿️"],
        ["taksi", "taksi", "سيارة أجرة", "n", "m", "🚕"]
      ],
      sents: [
        ["Idem u pekar{u|f_acc|pekara}.", "Fırına gidiyorum.", "أذهب إلى المخبز."],
        ["Kafić je pored džamij{e|gen|džamija}.", "Kafe caminin yanında.", "المقهى بجانب المسجد."],
        ["Gdje je parking?", "Otopark nerede?", "أين موقف السيارات؟"],
        ["Na trg{u|loc_m|trg} ima mnogo ljudi.", "Meydanda çok insan var.", "في الساحة ناس كثيرون."]
      ] },

    { id: "a1u21", level: "A1", icon: "⚽", title: { bs: "Slobodno vrijeme", tr: "Boş zaman", ar: "وقت الفراغ" },
      words: [
        ["fudbal", "futbol", "كرة القدم", "n", "m", "⚽"],
        ["košarka", "basketbol", "كرة السلة", "n", "f", "🏀"],
        ["šetnja", "yürüyüş", "نزهة", "n", "f", "🚶‍♂️"],
        ["hobi", "hobi", "هواية", "n", "m", "🧩"],
        ["utakmica", "maç", "مباراة", "n", "f", "🏟️"],
        ["igrati", "oynamak", "يلعب", "v", "", "🎲"],
        ["plivati", "yüzmek", "يسبح", "v", "", "🏊"],
        ["pjevati", "şarkı söylemek", "يغني", "v", "", "🎤"],
        ["plesati", "dans etmek", "يرقص", "v", "", "💃"],
        ["crtati", "çizmek", "يرسم", "v", "", "✏️"],
        ["svirati", "(müzik aleti) çalmak", "يعزف", "v", "", "🎸"],
        ["lopta", "top", "كرة", "n", "f", "⚽"],
        ["pjesma", "şarkı", "أغنية", "n", "f", "🎶"]
      ],
      sents: [
        ["Igram fudbal subotom.", "Cumartesi günleri futbol oynarım.", "ألعب كرة القدم يوم السبت."],
        ["Volim plivati.", "Yüzmeyi severim.", "أحب السباحة."],
        ["Utakmica počinje u osam.", "Maç sekizde başlıyor.", "تبدأ المباراة في الثامنة."],
        ["Moj{a|poss|moj} kćerka lijepo pjeva.", "Kızım güzel şarkı söylüyor.", "ابنتي تغني جميلا."]
      ] },

    { id: "a1u22", level: "A1", icon: "🔑", title: { bs: "Važni glagoli", tr: "Önemli fiiller", ar: "أفعال مهمة" },
      words: [
        ["otvoriti", "açmak", "يفتح", "v", "", "🔓"],
        ["zatvoriti", "kapatmak", "يغلق", "v", "", "🔒"],
        ["uzeti", "almak", "يأخذ", "v", "", "✋"],
        ["dati", "vermek", "يعطي", "v", "", "🎁"],
        ["čekati", "beklemek", "ينتظر", "v", "", "⏳"],
        ["znati", "bilmek", "يعرف", "v", "", "🧠"],
        ["misliti", "düşünmek", "يفكر", "v", "", "💭"],
        ["sjediti", "oturmak", "يجلس", "v", "", "🪑"],
        ["stajati", "ayakta durmak", "يقف", "v", "", "🧍"],
        ["hodati", "yürümek", "يمشي", "v", "", "🚶"],
        ["pomoći", "yardım etmek", "يساعد", "v", "", "🤝"],
        ["pitati", "sormak", "يسأل", "v", "", "🙋"],
        ["ući", "girmek", "يدخل", "v", "", "🚪"],
        ["izaći", "çıkmak", "يخرج", "v", "", "🌳"]
      ],
      sents: [
        ["Otvori{te|imp|otvoriti} prozor, molim vas.", "Pencereyi açın, lütfen.", "افتح النافذة من فضلك."],
        ["Ne znam.", "Bilmiyorum.", "لا أعرف."],
        ["Čekam autobus.", "Otobüs bekliyorum.", "أنتظر الحافلة."],
        ["Mogu li ući?", "Girebilir miyim?", "هل يمكنني الدخول؟"]
      ] },

    { id: "a1u23", level: "A1", icon: "🔟", title: { bs: "Brojevi 2", tr: "Sayılar 2", ar: "الأرقام 2" },
      words: [
        ["četrdeset", "kırk", "أربعون", "num", "", "40"],
        ["šezdeset", "altmış", "ستون", "num", "", "60"],
        ["sedamdeset", "yetmiş", "سبعون", "num", "", "70"],
        ["osamdeset", "seksen", "ثمانون", "num", "", "80"],
        ["devedeset", "doksan", "تسعون", "num", "", "90"],
        ["dvjesta", "iki yüz", "مئتان", "num", "", "200"],
        ["drugi", "ikinci", "الثاني", "adj", "", "🥈"],
        ["treći", "üçüncü", "الثالث", "adj", "", "🥉"],
        ["jedanaest", "on bir", "أحد عشر", "num", "", "11"],
        ["dvanaest", "on iki", "اثنا عشر", "num", "", "12"],
        ["petnaest", "on beş", "خمسة عشر", "num", "", "15"],
        ["trideset", "otuz", "ثلاثون", "num", "", "30"],
        ["pedeset", "elli", "خمسون", "num", "", "50"],
        ["hiljada", "bin", "ألف", "num", "", "1000"],
        ["milion", "milyon", "مليون", "num", "", "1000000"],
        ["prvi", "birinci", "أول", "adj", "", "🥇"]
      ],
      sents: [
        ["Imam trideset godina.", "Otuz yaşındayım.", "عمري ثلاثون سنة."],
        ["To košta pedeset {maraka|gen_pl|marka}.", "Bu elli mark.", "هذا بخمسين ماركا."],
        ["Ovo je moj prvi dan.", "Bu benim ilk günüm.", "هذا يومي الأول."],
        ["Živim na drugom sprat{u|loc_m|sprat}.", "İkinci katta oturuyorum.", "أسكن في الطابق الثاني."]
      ] },

    { id: "a2u11", level: "A2", icon: "😊", title: { bs: "Osjećanja", tr: "Duygular", ar: "المشاعر" },
      words: [
        ["ljubav", "aşk, sevgi", "حب", "n", "f", "❤️‍🔥"],
        ["strah", "korku", "خوف", "n", "m", "😨"],
        ["radost", "sevinç", "فرح", "n", "f", "😊"],
        ["tuga", "üzüntü", "حزن", "n", "f", "😔"],
        ["briga", "endişe", "قلق", "n", "f", "😟"],
        ["bojati se", "korkmak", "يخاف", "v", "", "😱"],
        ["nervozan", "gergin", "متوتر", "adj", "", "😬"],
        ["ponosan", "gururlu", "فخور", "adj", "", "🦚"],
        ["iznenađen", "şaşkın", "مندهش", "adj", "", "😮"],
        ["zabrinut", "endişeli", "قلِق", "adj", "", "😰"],
        ["osjećati", "hissetmek", "يشعر", "v", "", "💗"],
        ["plakati", "ağlamak", "يبكي", "v", "", "😢"],
        ["smijati se", "gülmek", "يضحك", "v", "", "😂"],
        ["nadati se", "umut etmek", "يأمل", "v", "", "🌈"],
        ["ljut", "kızgın; acı (yemek)", "غاضب؛ حار", "adj", "", "😠"]
      ],
      sents: [
        ["Sretan sam danas.", "Bugün mutluyum.", "أنا سعيد اليوم."],
        ["Zašto si ljut?", "Neden kızgınsın?", "لماذا أنت غاضب؟"],
        ["{Ponosna|adj_f|ponosan} sam na tebe.", "Seninle gurur duyuyorum. (kadın)", "أنا فخورة بك."],
        ["Ne boj {se|refl}!", "Korkma!", "لا تخف!"]
      ] },

    { id: "a2u12", level: "A2", icon: "🌾", title: { bs: "Na selu", tr: "Köyde", ar: "في الريف" },
      words: [
        ["farma", "çiftlik", "مزرعة", "n", "f", "🚜"],
        ["seljak", "köylü, çiftçi", "فلاح", "n", "m", "🧑‍🌾"],
        ["bašta", "bahçe", "حديقة منزلية", "n", "f", "🌻"],
        ["drvo", "ağaç", "شجرة", "n", "n", "🌳"],
        ["trava", "çimen, ot", "عشب", "n", "f", "🌱"],
        ["potok", "dere", "جدول ماء", "n", "m", "💧"],
        ["staza", "patika", "ممر", "n", "f", "🥾"],
        ["ograda", "çit", "سياج", "n", "f", "🚧"],
        ["traktor", "traktör", "جرّار", "n", "m", "🚜"],
        ["polje", "tarla", "حقل", "n", "n", "🌾"],
        ["šuma", "orman", "غابة", "n", "f", "🌲"],
        ["brdo", "tepe", "تلّ", "n", "n", "🏔️"],
        ["kamen", "taş", "حجر", "n", "m", "🪨"]
      ],
      sents: [
        ["Moj djed živi na sel{u|loc_n|selo}.", "Dedem köyde yaşıyor.", "جدي يعيش في القرية."],
        ["Djeca trče kroz šum{u|f_acc|šuma}.", "Çocuklar ormanda koşuyor.", "الأطفال يركضون عبر الغابة."],
        ["U bašt{i|loc_f|bašta} raste cvijeće.", "Bahçede çiçekler büyüyor.", "تنمو الزهور في الحديقة."],
        ["Krava jede trav{u|f_acc|trava}.", "İnek ot yiyor.", "البقرة تأكل العشب."]
      ] },

    { id: "a2u13", level: "A2", icon: "🚦", title: { bs: "Saobraćaj", tr: "Trafik", ar: "المرور" },
      words: [
        ["semafor", "trafik ışığı", "إشارة مرور", "n", "m", "🚦"],
        ["raskrsnica", "kavşak", "تقاطع", "n", "f", "✖️"],
        ["vozač", "şoför", "سائق", "n", "m", "🧑‍✈️"],
        ["saobraćaj", "trafik", "حركة المرور", "n", "m", "🚥"],
        ["gužva", "kalabalık, trafik sıkışıklığı", "زحمة", "n", "f", "🚙"],
        ["kazna", "ceza", "غرامة", "n", "f", "⚖️"],
        ["pješak", "yaya", "ماشٍ", "n", "m", "🚸"],
        ["trotoar", "kaldırım", "رصيف", "n", "m", "🛤️"],
        ["tramvaj", "tramvay", "ترام", "n", "m", "🚋"],
        ["stati", "durmak", "يتوقف", "v", "", "🛑"],
        ["skrenuti", "dönmek (yön)", "ينعطف", "v", "", "↪️"],
        ["voziti", "(araba) sürmek", "يقود", "v", "", "🚗"],
        ["bicikl", "bisiklet", "دراجة", "n", "m", "🚲"]
      ],
      sents: [
        ["Skreni{te|imp|skrenuti} lijevo.", "Sola dönün.", "انعطف يسارا."],
        ["Stani{te|imp|stati}!", "Durun!", "توقفوا!"],
        ["Idem bicikl{om|ins|bicikl}.", "Bisikletle gidiyorum.", "أذهب بالدراجة."],
        ["Danas je velika gužva.", "Bugün trafik çok yoğun.", "هناك زحمة كبيرة اليوم."]
      ] },

    { id: "a2u14", level: "A2", icon: "📦", title: { bs: "Selidba", tr: "Taşınma", ar: "الانتقال" },
      words: [
        ["selidba", "taşınma", "انتقال", "n", "f", "🚚"],
        ["kutija", "kutu", "صندوق", "n", "f", "📦"],
        ["namještaj", "mobilya", "أثاث", "n", "m", "🛋️"],
        ["tepih", "halı", "سجادة", "n", "m", "🟫"],
        ["zavjesa", "perde", "ستارة", "n", "f", "🪟"],
        ["polica", "raf", "رف", "n", "f", "📚"],
        ["vrata", "kapı", "باب", "n", "n", "🚪"],
        ["plafon", "tavan", "سقف", "n", "m", "⬜"],
        ["pod", "zemin", "أرضية", "n", "m", "⬛"],
        ["stepenice", "merdiven", "درج", "n", "f", "🪜"],
        ["podrum", "bodrum", "قبو", "n", "m", "🕳️"],
        ["garaža", "garaj", "مرآب", "n", "f", "🚗"],
        ["popraviti", "tamir etmek", "يُصلح", "v", "", "🔧"],
        ["graditi", "inşa etmek", "يبني", "v", "", "🏗️"]
      ],
      sents: [
        ["Selimo {se|refl} u novi stan.", "Yeni daireye taşınıyoruz.", "ننتقل إلى شقة جديدة."],
        ["Kutije su u podrum{u|loc_m|podrum}.", "Kutular bodrumda.", "الصناديق في القبو."],
        ["Zatvor{i|imp|zatvoriti} vrata, molim te.", "Kapıyı kapat, lütfen.", "أغلق الباب من فضلك."],
        ["Tepih je na pod{u|loc_m|pod}.", "Halı yerde.", "السجادة على الأرض."]
      ] },

    { id: "a2u15", level: "A2", icon: "📱", title: { bs: "Telefon i poruke", tr: "Telefon ve mesajlar", ar: "الهاتف والرسائل" },
      words: [
        ["poruka", "mesaj", "رسالة", "n", "f", "📩"],
        ["poziv", "arama; davet", "مكالمة؛ دعوة", "n", "m", "📞"],
        ["broj", "numara", "رقم", "n", "m", "#️⃣"],
        ["internet", "internet", "إنترنت", "n", "m", "🌐"],
        ["mail", "e-posta", "بريد إلكتروني", "n", "m", "📧"],
        ["punjač", "şarj aleti", "شاحن", "n", "m", "🔌"],
        ["aplikacija", "uygulama", "تطبيق", "n", "f", "📲"],
        ["lozinka", "şifre", "كلمة المرور", "n", "f", "🔐"],
        ["javiti se", "haber vermek", "يتواصل", "v", "", "📣"],
        ["razgovarati", "konuşmak, sohbet etmek", "يتحدث", "v", "", "🗨️"],
        ["zvati", "aramak, çağırmak", "يتصل، ينادي", "v", "", "📱"],
        ["poslati", "göndermek", "يرسل", "v", "", "📨"],
        ["odgovoriti", "cevap vermek", "يجيب", "v", "", "💬"]
      ],
      sents: [
        ["Pošalj{i|imp|poslati} mi poruk{u|f_acc|poruka}.", "Bana mesaj gönder.", "أرسل لي رسالة."],
        ["Koji je tvoj broj?", "Numaran ne?", "ما رقمك؟"],
        ["Nemam internet{a|gen|internet}.", "İnternetim yok.", "ليس عندي إنترنت."],
        ["Javi mi {se|refl} sutra.", "Yarın bana haber ver.", "تواصل معي غدا."]
      ] },

    { id: "a2u16", level: "A2", icon: "🍽️", title: { bs: "U restoranu", tr: "Restoranda", ar: "في المطعم" },
      words: [
        ["konobar", "garson", "نادل", "n", "m", "💁"],
        ["jelovnik", "menü", "قائمة الطعام", "n", "m", "📜"],
        ["rezervacija", "rezervasyon", "حجز", "n", "f", "🗒️"],
        ["predjelo", "başlangıç yemeği", "مقبلات", "n", "n", "🥟"],
        ["glavno jelo", "ana yemek", "الطبق الرئيسي", "phr", "", "🍛"],
        ["desert", "tatlı", "حلوى", "n", "m", "🍮"],
        ["napojnica", "bahşiş", "بقشيش", "n", "f", "💵"],
        ["ukusan", "lezzetli", "لذيذ", "adj", "", "😋"],
        ["vegetarijanski", "vejetaryen", "نباتي", "adj", "", "🥦"],
        ["pržen", "kızarmış", "مقلي", "adj", "", "🍟"],
        ["pečen", "fırında pişmiş, ızgara", "مشوي", "adj", "", "🍗"],
        ["naručiti", "sipariş etmek", "يطلب", "v", "", "🛎️"]
      ],
      sents: [
        ["Jelovnik, molim.", "Menü, lütfen.", "قائمة الطعام من فضلك."],
        ["Želim naručiti rib{u|f_acc|riba}.", "Balık sipariş etmek istiyorum.", "أريد أن أطلب سمكا."],
        ["Jelo je vrlo {ukusno|adj_n|ukusan}.", "Yemek çok lezzetli.", "الطعام لذيذ جدا."],
        ["Ostavljam napojnic{u|f_acc|napojnica}.", "Bahşiş bırakıyorum.", "أترك بقشيشا."]
      ] },

    { id: "a2u17", level: "A2", icon: "💊", title: { bs: "U apoteci", tr: "Eczanede", ar: "في الصيدلية" },
      words: [
        ["sirup", "şurup", "شراب دواء", "n", "m", "🍯"],
        ["flaster", "yara bandı", "لاصقة طبية", "n", "m", "🩹"],
        ["mast", "merhem", "مرهم", "n", "f", "🧴"],
        ["alergija", "alerji", "حساسية", "n", "f", "🤧"],
        ["glavobolja", "baş ağrısı", "صداع", "n", "f", "🤕"],
        ["zubobolja", "diş ağrısı", "ألم الأسنان", "n", "f", "🦷"],
        ["vitamin", "vitamin", "فيتامين", "n", "m", "🍊"],
        ["termometar", "termometre", "ميزان حرارة", "n", "m", "🌡️"],
        ["kašljati", "öksürmek", "يسعل", "v", "", "😷"],
        ["povrijediti se", "yaralanmak", "يُصاب", "v", "", "🩼"],
        ["zdrav", "sağlıklı", "صحي", "adj", "", "🥗"]
      ],
      sents: [
        ["Imam glavobolj{u|f_acc|glavobolja}.", "Başım ağrıyor.", "عندي صداع."],
        ["Trebam nešto protiv {kašlja|gen|kašalj}.", "Öksürük için bir şeye ihtiyacım var.", "أحتاج شيئا ضد السعال."],
        ["Uzmi{te|imp|uzeti} jednu tabletu dnevno.", "Günde bir tablet alın.", "خذ قرصا واحدا يوميا."],
        ["Imam alergij{u|f_acc|alergija} na mlijeko.", "Süte alerjim var.", "عندي حساسية من الحليب."]
      ] },

    { id: "a2u18", level: "A2", icon: "👛", title: { bs: "Novac", tr: "Para", ar: "المال" },
      words: [
        ["novčanik", "cüzdan", "محفظة", "n", "m", "👛"],
        ["kovanica", "madeni para", "قطعة نقدية", "n", "f", "🪙"],
        ["štedjeti", "biriktirmek", "يدّخر", "v", "", "🐷"],
        ["trošiti", "harcamak", "يصرف", "v", "", "💸"],
        ["zarađivati", "kazanmak (para)", "يكسب", "v", "", "💼"],
        ["kredit", "kredi", "قرض", "n", "m", "🏦"],
        ["bankomat", "bankamatik", "صرّاف آلي", "n", "m", "🏧"],
        ["kurs", "döviz kuru; kurs", "سعر الصرف؛ دورة", "n", "m", "💱"],
        ["mijenjati", "değiştirmek", "يغيّر", "v", "", "🔃"],
        ["prodati", "satmak", "يبيع", "v", "", "🏷️"],
        ["platiti", "ödemek", "يدفع", "v", "", "💳"],
        ["skup", "pahalı", "غالٍ", "adj", "", "💎"],
        ["jeftin", "ucuz", "رخيص", "adj", "", "🏷️"],
        ["bogat", "zengin", "غني", "adj", "", "💰"],
        ["siromašan", "fakir", "فقير", "adj", "", "🪙"]
      ],
      sents: [
        ["Gdje mogu promijeniti novac?", "Parayı nerede bozdurabilirim?", "أين يمكنني تصريف المال؟"],
        ["Štedim za auto.", "Araba için para biriktiriyorum.", "أدّخر لشراء سيارة."],
        ["Novčanik je u torb{i|loc_f|torba}.", "Cüzdan çantada.", "المحفظة في الحقيبة."],
        ["Plati{o|past_m|platiti} sam kartic{om|ins|kartica}.", "Kartla ödedim.", "دفعتُ بالبطاقة."]
      ] },

    { id: "a2u19", level: "A2", icon: "🏖️", title: { bs: "Odmor i hotel", tr: "Tatil ve otel", ar: "العطلة والفندق" },
      words: [
        ["plaža", "plaj", "شاطئ", "n", "f", "🏖️"],
        ["recepcija", "resepsiyon", "الاستقبال", "n", "f", "🛎️"],
        ["rezervisati", "rezervasyon yapmak", "يحجز", "v", "", "📅"],
        ["pogled", "manzara", "منظر", "n", "m", "🌄"],
        ["turist", "turist", "سائح", "n", "m", "📸"],
        ["kamp", "kamp", "مخيم", "n", "m", "⛺"],
        ["vodič", "rehber", "مرشد", "n", "m", "🧭"],
        ["razglednica", "kartpostal", "بطاقة بريدية", "n", "f", "🏞️"],
        ["suvenir", "hediyelik eşya", "تذكار", "n", "m", "🎁"],
        ["sunčati se", "güneşlenmek", "يتشمّس", "v", "", "😎"],
        ["odmor", "dinlenme, tatil", "راحة، إجازة", "n", "m", "🏝️"],
        ["kofer", "bavul", "حقيبة سفر", "n", "m", "🧳"]
      ],
      sents: [
        ["Rezervisao sam sob{u|f_acc|soba} za dvije noći.", "İki gecelik oda ayırttım.", "حجزتُ غرفة لليلتين."],
        ["Hotel ima lijep pogled na more.", "Otelin güzel bir deniz manzarası var.", "للفندق إطلالة جميلة على البحر."],
        ["Ljeti idemo na plaž{u|f_acc|plaža}.", "Yazın plaja gidiyoruz.", "في الصيف نذهب إلى الشاطئ."],
        ["Turist{i|m_pl|turist} kupuju suvenire.", "Turistler hediyelik eşya alıyor.", "السياح يشترون التذكارات."]
      ] },

    { id: "a2u20", level: "A2", icon: "🏰", title: { bs: "Opis grada", tr: "Şehrin tarifi", ar: "وصف المدينة" },
      words: [
        ["stari grad", "eski şehir", "المدينة القديمة", "phr", "", "🏰"],
        ["spomenik", "anıt", "نصب تذكاري", "n", "m", "🗿"],
        ["toranj", "kule", "برج", "n", "m", "🗼"],
        ["tvrđava", "kale", "قلعة", "n", "f", "🏯"],
        ["centar", "merkez", "مركز", "n", "m", "🎯"],
        ["okolina", "çevre", "ضواحي", "n", "f", "🗺️"],
        ["stanovnik", "sakin", "ساكن", "n", "m", "👥"],
        ["poznat", "ünlü", "مشهور", "adj", "", "⭐"],
        ["moderan", "modern", "حديث", "adj", "", "🏙️"],
        ["historijski", "tarihi", "تاريخي", "adj", "", "📜"],
        ["turistički", "turistik", "سياحي", "adj", "", "🧳"]
      ],
      sents: [
        ["Stari most je u Mostar{u|loc_m}.", "Eski Köprü Mostar'da.", "الجسر القديم في موستار."],
        ["Sarajevo ima mnogo stanovnik{a|gen_pl|stanovnik}.", "Saraybosna'nın çok sakini var.", "في سراييفو سكان كثيرون."],
        ["Tvrđava je na brd{u|loc_n|brdo}.", "Kale tepenin üstünde.", "القلعة على التل."],
        ["Centar grada je blizu.", "Şehir merkezi yakın.", "مركز المدينة قريب."]
      ] },

    { id: "a2u21", level: "A2", icon: "🧹", title: { bs: "Kućni poslovi", tr: "Ev işleri", ar: "الأعمال المنزلية" },
      words: [
        ["peglati", "ütülemek", "يكوي", "v", "", "👔"],
        ["usisavati", "elektrik süpürgesiyle temizlemek", "يكنس بالمكنسة الكهربائية", "v", "", "🧹"],
        ["prašina", "toz", "غبار", "n", "f", "🌫️"],
        ["smeće", "çöp", "قمامة", "n", "n", "🗑️"],
        ["veš", "çamaşır", "غسيل", "n", "m", "🧺"],
        ["suđe", "bulaşık", "الصحون", "n", "n", "🍽️"],
        ["pomagati", "yardım etmek", "يساعد", "v", "", "🤝"],
        ["obaveza", "görev, sorumluluk", "واجب", "n", "f", "📋"],
        ["sređivati", "toparlamak", "يرتّب", "v", "", "🧽"],
        ["prati", "yıkamak", "يغسل", "v", "", "🫧"],
        ["čistiti", "temizlemek", "ينظف", "v", "", "🧹"]
      ],
      sents: [
        ["Perem suđe svaki dan.", "Her gün bulaşık yıkıyorum.", "أغسل الصحون كل يوم."],
        ["Iznes{i|imp} smeće, molim te.", "Çöpü çıkar, lütfen.", "أخرج القمامة من فضلك."],
        ["Danas čistim kuć{u|f_acc|kuća}.", "Bugün evi temizliyorum.", "أنظف البيت اليوم."],
        ["Djeca mi pomažu.", "Çocuklar bana yardım ediyor.", "الأطفال يساعدونني."]
      ] },

    { id: "a2u22", level: "A2", icon: "💍", title: { bs: "Ljudi i odnosi", tr: "İnsanlar ve ilişkiler", ar: "الناس والعلاقات" },
      words: [
        ["prijateljica", "kız arkadaş", "صديقة", "n", "f", "👭"],
        ["djevojka", "kız; sevgili", "فتاة؛ حبيبة", "n", "f", "👩"],
        ["momak", "genç adam; sevgili", "شاب؛ حبيب", "n", "m", "👦"],
        ["brak", "evlilik", "زواج", "n", "m", "💍"],
        ["vjenčanje", "düğün", "حفل زفاف", "n", "n", "💒"],
        ["rođak", "akraba", "قريب (من العائلة)", "n", "m", "👨‍👩‍👧"],
        ["tetka", "teyze, hala", "خالة، عمة", "n", "f", "👩‍🦳"],
        ["amidža", "amca", "عم", "n", "m", "👨‍🦳"],
        ["daidža", "dayı", "خال", "n", "m", "👨‍🦱"],
        ["unuk", "torun", "حفيد", "n", "m", "👶"],
        ["rođendan", "doğum günü", "عيد ميلاد", "n", "m", "🎂"],
        ["upoznati", "tanışmak, tanımak", "يتعرّف", "v", "", "🤝"]
      ],
      sents: [
        ["Moja tetka živi u Tuzl{i|loc_f}.", "Teyzem Tuzla'da yaşıyor.", "خالتي تعيش في توزلا."],
        ["Danas mi je rođendan.", "Bugün benim doğum günüm.", "اليوم عيد ميلادي."],
        ["Drago mi je što smo {se|refl} upoznali.", "Tanıştığımıza memnun oldum.", "سعدتُ بالتعرف عليك."],
        ["Idemo na vjenčanje u subotu.", "Cumartesi düğüne gidiyoruz.", "سنذهب إلى حفل زفاف يوم السبت."]
      ] },

    { id: "a2u23", level: "A2", icon: "🏋️", title: { bs: "Sport", tr: "Spor", ar: "الرياضة" },
      words: [
        ["trening", "antrenman", "تمرين", "n", "m", "🏋️"],
        ["teretana", "spor salonu", "نادي رياضي", "n", "f", "💪"],
        ["vježbati", "egzersiz yapmak", "يتمرّن", "v", "", "🤸"],
        ["tim", "takım", "فريق", "n", "m", "👥"],
        ["pobijediti", "kazanmak (yarış)", "يفوز", "v", "", "🏆"],
        ["izgubiti", "kaybetmek", "يخسر", "v", "", "😞"],
        ["gol", "gol", "هدف (رياضي)", "n", "m", "🥅"],
        ["navijač", "taraftar", "مشجع", "n", "m", "📣"],
        ["sportista", "sporcu", "رياضي", "n", "m", "🏅"],
        ["odmarati", "dinlenmek", "يرتاح", "v", "", "🛋️"],
        ["trčati", "koşmak", "يركض", "v", "", "🏃"]
      ],
      sents: [
        ["Vježbam tri puta sedmično.", "Haftada üç kez egzersiz yapıyorum.", "أتمرّن ثلاث مرات في الأسبوع."],
        ["Naš tim je pobijedi{o|past_m|pobijediti}!", "Takımımız kazandı!", "فاز فريقنا!"],
        ["Idem u teretan{u|f_acc|teretana}.", "Spor salonuna gidiyorum.", "أذهب إلى النادي الرياضي."],
        ["Ko je dao gol?", "Golü kim attı?", "من سجّل الهدف؟"]
      ] },

    { id: "a2u24", level: "A2", icon: "🧑‍🍳", title: { bs: "Kuhanje", tr: "Yemek yapmak", ar: "الطبخ" },
      words: [
        ["brašno", "un", "طحين", "n", "n", "🌾"],
        ["ulje", "yağ", "زيت", "n", "n", "🫒"],
        ["tijesto", "hamur", "عجين", "n", "n", "🥟"],
        ["miješati", "karıştırmak", "يخلط", "v", "", "🥄"],
        ["dodati", "eklemek", "يضيف", "v", "", "➕"],
        ["ukus", "tat", "طعم", "n", "m", "👅"],
        ["začin", "baharat", "بهار", "n", "m", "🌿"],
        ["gram", "gram", "غرام", "n", "m", "⚖️"],
        ["litar", "litre", "لتر", "n", "m", "🥛"],
        ["sastojak", "malzeme", "مكوّن", "n", "m", "🧂"],
        ["peći", "(fırında) pişirmek", "يخبز", "v", "", "🥖"],
        ["sjeći", "kesmek", "يقطع", "v", "", "✂️"]
      ],
      sents: [
        ["Treba mi kilogram brašn{a|gen|brašno}.", "Bir kilo una ihtiyacım var.", "أحتاج كيلوغراما من الطحين."],
        ["Doda{j|imp|dodati} malo {soli|gen|so}.", "Biraz tuz ekle.", "أضف قليلا من الملح."],
        ["Pečem pit{u|f_acc|pita}.", "Börek pişiriyorum.", "أخبز فطيرة."],
        ["Ulje je u flaš{i|loc_f|flaša}.", "Yağ şişede.", "الزيت في الزجاجة."]
      ] },

    { id: "a2u25", level: "A2", icon: "🧸", title: { bs: "Moje djetinjstvo", tr: "Çocukluğum", ar: "طفولتي" },
      words: [
        ["djetinjstvo", "çocukluk", "طفولة", "n", "n", "🧸"],
        ["sjećati se", "hatırlamak", "يتذكّر", "v", "", "💭"],
        ["uspomena", "anı", "ذكرى", "n", "f", "📷"],
        ["nekada", "eskiden", "في الماضي", "adv", "", "⌛"],
        ["mladost", "gençlik", "شباب", "n", "f", "🌱"],
        ["odrasti", "büyümek", "يكبر", "v", "", "📏"],
        ["roditi se", "doğmak", "يُولد", "v", "", "👶"],
        ["preseliti se", "taşınmak", "ينتقل", "v", "", "🚚"],
        ["prošlost", "geçmiş", "الماضي", "n", "f", "⏮️"],
        ["sjetiti se", "hatırlamak", "يتذكر", "v", "", "💡"],
        ["zaboraviti", "unutmak", "ينسى", "v", "", "🤷"]
      ],
      sents: [
        ["Rodio sam {se|refl} u Damask{u|loc_m}.", "Şam'da doğdum.", "وُلدتُ في دمشق."],
        ["Rodi{la|past_f|roditi se} sam se u Istanbulu.", "İstanbul'da doğdum. (kadın)", "وُلدتُ في إسطنبول. (للمؤنث)"],
        ["Odrastao sam na sel{u|loc_n|selo}.", "Köyde büyüdüm.", "نشأتُ في القرية."],
        ["Sjećam se svog {djetinjstva|gen|djetinjstvo}.", "Çocukluğumu hatırlıyorum.", "أتذكر طفولتي."]
      ] },

    { id: "a2u26", level: "A2", icon: "🧔", title: { bs: "Kako izgleda?", tr: "Neye benziyor?", ar: "كيف يبدو؟" },
      words: [
        ["brada", "sakal", "لحية", "n", "f", "🧔"],
        ["brkovi", "bıyık", "شارب", "n", "m", "👨"],
        ["obrve", "kaşlar", "حاجبان", "n", "f", "🤨"],
        ["usne", "dudaklar", "شفتان", "n", "f", "👄"],
        ["koža", "cilt, deri", "بشرة، جلد", "n", "f", "✋"],
        ["visina", "boy", "طول", "n", "f", "📏"],
        ["frizura", "saç modeli", "تسريحة", "n", "f", "💇‍♀️"],
        ["kovrdžav", "kıvırcık", "مجعّد", "adj", "", "🌀"],
        ["ćelav", "kel", "أصلع", "adj", "", "👨‍🦲"],
        ["zgodan", "yakışıklı, hoş", "وسيم", "adj", "", "😍"],
        ["ružan", "çirkin", "قبيح", "adj", "", "👹"],
        ["sličan", "benzer", "مشابه", "adj", "", "👯"],
        ["izgledati", "görünmek", "يبدو", "v", "", "🪞"],
        ["ličiti", "benzemek", "يشبه", "v", "", "👯‍♂️"],
        ["izgled", "görünüş", "مظهر", "n", "m", "🧍"]
      ],
      sents: [
        ["On ima brad{u|f_acc|brada}.", "Onun sakalı var.", "له لحية."],
        ["Kako izgleda tvoj brat?", "Kardeşin neye benziyor?", "كيف يبدو أخوك؟"],
        ["Ličiš na majk{u|f_acc|majka}.", "Annene benziyorsun.", "أنت تشبه أمك."],
        ["Ona je visoka i {zgodna|adj_f|zgodan}.", "O uzun boylu ve hoş.", "هي طويلة وجميلة."]
      ] },

    { id: "a2u27", level: "A2", icon: "🛒", title: { bs: "Namirnice", tr: "Gıda alışverişi", ar: "شراء المواد الغذائية" },
      words: [
        ["namirnice", "gıda malzemeleri", "مواد غذائية", "n", "f", "🛒"],
        ["pakovanje", "paket, ambalaj", "عبوة", "n", "n", "📦"],
        ["konzerva", "konserve", "علبة معلّبات", "n", "f", "🥫"],
        ["kasa", "kasa", "صندوق الدفع", "n", "f", "🧾"],
        ["tegla", "kavanoz", "برطمان", "n", "f", "🫙"],
        ["mesar", "kasap", "جزّار", "n", "m", "🔪"],
        ["halal", "helal", "حلال", "adj", "", "✅"],
        ["piletina", "tavuk eti", "لحم دجاج", "n", "f", "🍗"],
        ["govedina", "sığır eti", "لحم بقر", "n", "f", "🥩"],
        ["janjetina", "kuzu eti", "لحم خروف", "n", "f", "🐑"],
        ["mljeveno meso", "kıyma", "لحم مفروم", "phr", "", "🍖"],
        ["sirće", "sirke", "خلّ", "n", "n", "🍶"],
        ["čokolada", "çikolata", "شوكولاتة", "n", "f", "🍫"],
        ["vaga", "terazi", "ميزان", "n", "f", "⚖️"]
      ],
      sents: [
        ["Da li je ovo meso halal?", "Bu et helal mi?", "هل هذا اللحم حلال؟"],
        ["Kupujem pola kilograma govedin{e|gen|govedina}.", "Yarım kilo sığır eti alıyorum.", "أشتري نصف كيلو من لحم البقر."],
        ["Kasa je tamo.", "Kasa orada.", "صندوق الدفع هناك."],
        ["Djeca vole čokolad{u|f_acc|čokolada}.", "Çocuklar çikolatayı sever.", "الأطفال يحبون الشوكولاتة."]
      ] },

    { id: "b1u11", level: "B1", icon: "🛫", title: { bs: "Na aerodromu", tr: "Havalimanında", ar: "في المطار" },
      words: [
        ["let", "uçuş", "رحلة جوية", "n", "m", "✈️"],
        ["kašnjenje", "gecikme", "تأخير", "n", "n", "⏰"],
        ["prtljag", "bagaj", "أمتعة", "n", "m", "🧳"],
        ["carina", "gümrük", "جمارك", "n", "f", "🛃"],
        ["granica", "sınır", "حدود", "n", "f", "🚧"],
        ["viza", "vize", "تأشيرة", "n", "f", "🛂"],
        ["ukrcavanje", "biniş", "الصعود إلى الطائرة", "n", "n", "🛫"],
        ["polazak", "kalkış", "مغادرة", "n", "m", "🛫"],
        ["dolazak", "varış", "وصول", "n", "m", "🛬"],
        ["presjedanje", "aktarma", "ترانزيت", "n", "n", "🔁"],
        ["povratna karta", "gidiş-dönüş bileti", "تذكرة ذهاب وإياب", "phr", "", "🎫"],
        ["sjedište", "koltuk", "مقعد", "n", "n", "💺"],
        ["izlaz", "çıkış", "مخرج", "n", "m", "🏃"],
        ["ulaz", "giriş", "مدخل", "n", "m", "🚪"]
      ],
      sents: [
        ["Let kasni dva sat{a|num234|sat}.", "Uçuş iki saat gecikiyor.", "الرحلة متأخرة ساعتين."],
        ["Gdje je izlaz broj pet?", "Beş numaralı çıkış kapısı nerede?", "أين البوابة رقم خمسة؟"],
        ["Moj prtljag nije stigao.", "Bagajım gelmedi.", "لم تصل أمتعتي."],
        ["Na granic{i|loc_f|granica} čekamo sat vremena.", "Sınırda bir saat bekliyoruz.", "ننتظر ساعة على الحدود."]
      ] },

    { id: "b1u12", level: "B1", icon: "📊", title: { bs: "Na radnom mjestu", tr: "İş yerinde", ar: "في مكان العمل" },
      words: [
        ["sastanak", "toplantı", "اجتماع", "n", "m", "👥"],
        ["projekat", "proje", "مشروع", "n", "m", "📊"],
        ["rok", "son tarih", "موعد نهائي", "n", "m", "⏳"],
        ["izvještaj", "rapor", "تقرير", "n", "m", "📑"],
        ["zadatak", "görev", "مهمة", "n", "m", "📋"],
        ["godišnji odmor", "yıllık izin", "إجازة سنوية", "phr", "", "🏝️"],
        ["prekovremeni rad", "fazla mesai", "عمل إضافي", "phr", "", "⏰"],
        ["smjena", "vardiya", "نوبة عمل", "n", "f", "🔄"],
        ["direktor", "müdür, direktör", "مدير عام", "n", "m", "🧑‍💼"],
        ["zaposlenik", "çalışan", "موظف", "n", "m", "👷"],
        ["otkaz", "işten çıkarılma, istifa", "فصل، استقالة", "n", "m", "📤"],
        ["zaposliti se", "işe girmek", "يتوظّف", "v", "", "💼"],
        ["zarada", "kazanç", "دخل", "n", "f", "💰"]
      ],
      sents: [
        ["Sastanak počinje u devet.", "Toplantı dokuzda başlıyor.", "يبدأ الاجتماع في التاسعة."],
        ["Moram završiti izvještaj do {petka|gen|petak}.", "Raporu cumaya kadar bitirmem gerekiyor.", "يجب أن أنهي التقرير قبل الجمعة."],
        ["Radim u noćnoj smjen{i|loc_f|smjena}.", "Gece vardiyasında çalışıyorum.", "أعمل في نوبة الليل."],
        ["Zaposlila sam {se|refl} u banci.", "Bankada işe girdim. (kadın)", "توظفتُ في بنك. (للمؤنث)"]
      ] },

    { id: "b1u13", level: "B1", icon: "💭", title: { bs: "Moje mišljenje", tr: "Benim fikrim", ar: "رأيي" },
      words: [
        ["mišljenje", "fikir, görüş", "رأي", "n", "n", "💭"],
        ["slagati se", "katılmak (fikre)", "يوافق", "v", "", "👍"],
        ["tvrditi", "iddia etmek", "يدّعي", "v", "", "🗣️"],
        ["razlog", "sebep", "سبب", "n", "m", "❓"],
        ["problem", "sorun", "مشكلة", "n", "m", "⚠️"],
        ["rješenje", "çözüm", "حلّ", "n", "n", "💡"],
        ["prednost", "avantaj", "ميزة", "n", "f", "➕"],
        ["nedostatak", "dezavantaj, eksiklik", "عيب، نقص", "n", "m", "➖"],
        ["vjerovati", "inanmak", "يصدّق، يؤمن", "v", "", "🙏"],
        ["tačan", "doğru", "صحيح", "adj", "", "✔️"],
        ["pogrešan", "yanlış", "خاطئ", "adj", "", "✖️"],
        ["važan", "önemli", "مهم", "adj", "", "⭐"],
        ["zanimljiv", "ilginç", "مثير للاهتمام", "adj", "", "🤩"]
      ],
      sents: [
        ["Po mom mišljenju, to je dobra ideja.", "Bence bu iyi bir fikir.", "في رأيي، هذه فكرة جيدة."],
        ["Slažem {se|refl} s tobom.", "Sana katılıyorum.", "أتفق معك."],
        ["Koji je razlog?", "Sebebi ne?", "ما السبب؟"],
        ["Imamo problem, ali i rješenje.", "Bir sorunumuz var ama çözümü de var.", "لدينا مشكلة، ولكن لدينا حل أيضا."]
      ] },

    { id: "b1u14", level: "B1", icon: "🏥", title: { bs: "Zdravstveni sistem", tr: "Sağlık sistemi", ar: "النظام الصحي" },
      words: [
        ["osiguranje", "sigorta", "تأمين", "n", "n", "🛡️"],
        ["dom zdravlja", "sağlık ocağı", "مركز صحي", "phr", "", "🏥"],
        ["specijalista", "uzman doktor", "أخصائي", "n", "m", "👨‍⚕️"],
        ["uputnica", "sevk kağıdı", "إحالة طبية", "n", "f", "📄"],
        ["nalaz", "tahlil sonucu", "نتيجة الفحص", "n", "m", "📋"],
        ["operacija", "ameliyat", "عملية جراحية", "n", "f", "🩻"],
        ["zubar", "diş hekimi", "طبيب أسنان", "n", "m", "🦷"],
        ["hitan", "acil", "عاجل", "adj", "", "🚨"],
        ["liječiti", "tedavi etmek", "يعالج", "v", "", "🩺"],
        ["čekaonica", "bekleme salonu", "غرفة الانتظار", "n", "f", "🪑"],
        ["pacijent", "hasta", "مريض", "n", "m", "🛏️"]
      ],
      sents: [
        ["Trebam uputnic{u|f_acc|uputnica} za specijalistu.", "Uzman doktor için sevk kağıdına ihtiyacım var.", "أحتاج إحالة إلى الأخصائي."],
        ["Nalaz je dobar.", "Tahlil sonucu iyi.", "نتيجة الفحص جيدة."],
        ["Idem kod zubar{a|gen|zubar}.", "Diş hekimine gidiyorum.", "أذهب إلى طبيب الأسنان."],
        ["Pacijenti čekaju u čekaonic{i|loc_f|čekaonica}.", "Hastalar bekleme salonunda bekliyor.", "المرضى ينتظرون في غرفة الانتظار."]
      ] },

    { id: "b1u15", level: "B1", icon: "🎭", title: { bs: "Kultura", tr: "Kültür", ar: "الثقافة" },
      words: [
        ["pozorište", "tiyatro", "مسرح", "n", "n", "🎭"],
        ["koncert", "konser", "حفلة موسيقية", "n", "m", "🎵"],
        ["izložba", "sergi", "معرض", "n", "f", "🖼️"],
        ["umjetnost", "sanat", "فن", "n", "f", "🎨"],
        ["pisac", "yazar", "كاتب", "n", "m", "✍️"],
        ["pjesnik", "şair", "شاعر", "n", "m", "📜"],
        ["roman", "roman", "رواية", "n", "m", "📖"],
        ["glumac", "oyuncu", "ممثل", "n", "m", "🎬"],
        ["publika", "seyirci", "جمهور", "n", "f", "👏"],
        ["tradicija", "gelenek", "تقليد", "n", "f", "🎎"],
        ["sevdalinka", "sevdalinka (Boşnak aşk şarkısı)", "سيفدالينكا (أغنية بوسنية)", "n", "f", "🎶"]
      ],
      sents: [
        ["Večeras idemo u pozorište.", "Bu akşam tiyatroya gidiyoruz.", "سنذهب إلى المسرح الليلة."],
        ["Sevdalinka je tradicionalna bosanska pjesma.", "Sevdalinka geleneksel bir Boşnak şarkısıdır.", "السيفدالينكا أغنية بوسنية تقليدية."],
        ["Izložba je u muzej{u|loc_m|muzej}.", "Sergi müzede.", "المعرض في المتحف."],
        ["Publika je oduševljena.", "Seyirciler çok beğendi.", "الجمهور مسرور جدا."]
      ] },

    { id: "b1u16", level: "B1", icon: "🔧", title: { bs: "Popravke u kući", tr: "Evde tamirat", ar: "الإصلاحات في البيت" },
      words: [
        ["kvar", "arıza", "عطل", "n", "m", "⚠️"],
        ["majstor", "usta, tamirci", "حرفي", "n", "m", "🧰"],
        ["cijev", "boru", "أنبوب", "n", "f", "🚰"],
        ["utičnica", "priz", "مقبس كهربائي", "n", "f", "🔌"],
        ["sijalica", "ampul", "مصباح كهربائي", "n", "f", "💡"],
        ["grijanje", "ısıtma", "تدفئة", "n", "n", "🔥"],
        ["klima", "klima", "مكيّف", "n", "f", "❄️"],
        ["bojler", "şofben", "سخان ماء", "n", "m", "🚿"],
        ["alat", "alet", "أدوات", "n", "m", "🛠️"],
        ["čekić", "çekiç", "مطرقة", "n", "m", "🔨"],
        ["pokvariti se", "bozulmak", "يتعطّل", "v", "", "💥"]
      ],
      sents: [
        ["Bojler {se|refl} pokvario.", "Şofben bozuldu.", "تعطّل سخان الماء."],
        ["Zovem majstor{a|m_acc_anim|majstor}.", "Ustayı çağırıyorum.", "أتصل بالحرفي."],
        ["Nema grijanj{a|gen|grijanje}.", "Isıtma yok.", "لا توجد تدفئة."],
        ["Treba mi čekić.", "Çekice ihtiyacım var.", "أحتاج مطرقة."]
      ] },

    { id: "b1u17", level: "B1", icon: "💡", title: { bs: "Savjeti i odluke", tr: "Tavsiyeler ve kararlar", ar: "النصائح والقرارات" },
      words: [
        ["savjet", "tavsiye", "نصيحة", "n", "m", "💡"],
        ["pokušati", "denemek", "يحاول", "v", "", "🔄"],
        ["odlučiti", "karar vermek", "يقرّر", "v", "", "⚖️"],
        ["odluka", "karar", "قرار", "n", "f", "✅"],
        ["izbor", "seçim", "اختيار", "n", "m", "🔀"],
        ["mogućnost", "imkân", "إمكانية", "n", "f", "🚪"],
        ["prilika", "fırsat", "فرصة", "n", "f", "🍀"],
        ["uspjeh", "başarı", "نجاح", "n", "m", "🏆"],
        ["greška", "hata", "خطأ", "n", "f", "❌"],
        ["strpljenje", "sabır", "صبر", "n", "n", "⏳"],
        ["truditi se", "çabalamak", "يجتهد", "v", "", "💪"]
      ],
      sents: [
        ["Daj mi savjet.", "Bana bir tavsiye ver.", "أعطني نصيحة."],
        ["Trebao bi više spavati.", "Daha çok uyumalısın.", "يجب أن تنام أكثر."],
        ["Odluči{la|past_f|odlučiti} sam učiti bosanski.", "Boşnakça öğrenmeye karar verdim. (kadın)", "قررتُ أن أتعلم البوسنية. (للمؤنث)"],
        ["Svaka greška je prilika za učenje.", "Her hata öğrenmek için bir fırsattır.", "كل خطأ فرصة للتعلم."]
      ] },

    { id: "b1u18", level: "B1", icon: "🔑", title: { bs: "Iznajmljivanje stana", tr: "Ev kiralama", ar: "استئجار شقة" },
      words: [
        ["stanodavac", "ev sahibi", "المؤجِّر", "n", "m", "🔑"],
        ["podstanar", "kiracı", "مستأجِر", "n", "m", "🏠"],
        ["depozit", "depozito", "عربون", "n", "m", "💶"],
        ["režije", "aidat ve faturalar", "فواتير الخدمات", "n", "f", "🧾"],
        ["namješten", "eşyalı", "مفروش", "adj", "", "🛋️"],
        ["useliti se", "(eve) taşınmak", "يسكن (في بيت جديد)", "v", "", "📦"],
        ["iseliti se", "(evden) çıkmak", "يُخلي (البيت)", "v", "", "🚚"],
        ["oglas", "ilan", "إعلان", "n", "m", "📰"],
        ["kvadrat", "metrekare", "متر مربع", "n", "m", "📐"],
        ["uvjet", "şart", "شرط", "n", "m", "📜"],
        ["prazan", "boş", "فارغ", "adj", "", "🫗"]
      ],
      sents: [
        ["Tražim namješten stan u centr{u|loc_m|centar}.", "Merkezde eşyalı bir daire arıyorum.", "أبحث عن شقة مفروشة في المركز."],
        ["Kirija je četiristo maraka plus režije.", "Kira dört yüz mark artı faturalar.", "الإيجار أربعمئة مارك بالإضافة إلى الفواتير."],
        ["Stanodavac traži depozit.", "Ev sahibi depozito istiyor.", "المؤجِّر يطلب عربونا."],
        ["Stan ima pedeset kvadrat{a|gen_pl|kvadrat}.", "Daire elli metrekare.", "مساحة الشقة خمسون مترا مربعا."]
      ] },

    { id: "b1u19", level: "B1", icon: "🛒", title: { bs: "Kupovina preko interneta", tr: "İnternetten alışveriş", ar: "التسوق عبر الإنترنت" },
      words: [
        ["narudžba", "sipariş", "طلب شراء", "n", "f", "📦"],
        ["dostava", "teslimat", "توصيل", "n", "f", "🚚"],
        ["kupac", "müşteri", "زبون", "n", "m", "🧑"],
        ["prodavač", "satıcı", "بائع", "n", "m", "🧑‍💼"],
        ["korpa", "sepet", "سلة", "n", "f", "🧺"],
        ["povrat", "iade", "إرجاع", "n", "m", "↩️"],
        ["besplatan", "ücretsiz", "مجاني", "adj", "", "🆓"],
        ["stići", "ulaşmak, varmak", "يصل", "v", "", "📬"],
        ["plaćanje", "ödeme", "الدفع", "n", "n", "💳"],
        ["pouzeće", "kapıda ödeme", "الدفع عند الاستلام", "n", "n", "💵"],
        ["poštar", "postacı", "ساعي البريد", "n", "m", "📮"]
      ],
      sents: [
        ["Naručio sam knjig{u|f_acc|knjiga} preko interneta.", "İnternetten kitap sipariş ettim.", "طلبتُ كتابا عبر الإنترنت."],
        ["Dostava je {besplatna|adj_f|besplatan}.", "Teslimat ücretsiz.", "التوصيل مجاني."],
        ["Paket {će|fut} stići sutra.", "Paket yarın gelecek.", "سيصل الطرد غدا."],
        ["Plaćam pouzećem.", "Kapıda ödüyorum.", "أدفع عند الاستلام."]
      ] },

    { id: "b1u20", level: "B1", icon: "📚", title: { bs: "Kurs jezika", tr: "Dil kursu", ar: "دورة اللغة" },
      words: [
        ["nivo", "seviye", "مستوى", "n", "m", "📶"],
        ["ispit", "sınav", "امتحان", "n", "m", "📝"],
        ["diploma", "diploma", "شهادة", "n", "f", "🎓"],
        ["certifikat", "sertifika", "شهادة معتمدة", "n", "m", "📜"],
        ["predavanje", "ders, konferans", "محاضرة", "n", "n", "🧑‍🏫"],
        ["profesor", "profesör, öğretmen", "أستاذ", "n", "m", "👨‍🏫"],
        ["gramatika", "dilbilgisi", "قواعد اللغة", "n", "f", "📖"],
        ["vokabular", "kelime hazinesi", "مفردات", "n", "m", "🔤"],
        ["izgovor", "telaffuz", "النطق", "n", "m", "🗣️"],
        ["prevesti", "çevirmek", "يترجم", "v", "", "🌐"],
        ["ponoviti", "tekrarlamak", "يكرر", "v", "", "🔁"],
        ["objasniti", "açıklamak", "يشرح", "v", "", "🧑‍🏫"]
      ],
      sents: [
        ["Polažem ispit iz bosanskog.", "Boşnakça sınavına giriyorum.", "أقدّم امتحان اللغة البوسنية."],
        ["Profesor nam objašnjava gramatik{u|f_acc|gramatika}.", "Öğretmen bize dilbilgisini açıklıyor.", "الأستاذ يشرح لنا القواعد."],
        ["Moj nivo je B1.", "Seviyem B1.", "مستواي B1."],
        ["Ponovi{te|imp|ponoviti}, molim vas.", "Tekrar edin, lütfen.", "أعِد من فضلك."]
      ] },

    { id: "b1u21", level: "B1", icon: "📈", title: { bs: "Karijera", tr: "Kariyer", ar: "المسيرة المهنية" },
      words: [
        ["karijera", "kariyer", "مسيرة مهنية", "n", "f", "📈"],
        ["struka", "meslek", "مهنة", "n", "f", "🛠️"],
        ["obuka", "eğitim (iş)", "تدريب", "n", "f", "🎓"],
        ["praksa", "staj", "تدريب عملي", "n", "f", "🏢"],
        ["prijava", "başvuru", "طلب تقديم", "n", "f", "📨"],
        ["biografija", "özgeçmiş (CV)", "سيرة ذاتية", "n", "f", "📄"],
        ["vještina", "beceri", "مهارة", "n", "f", "🧠"],
        ["napredovati", "ilerlemek, terfi etmek", "يتقدّم", "v", "", "📈"],
        ["konkurs", "iş ilanı", "مسابقة توظيف", "n", "m", "📰"],
        ["poslodavac", "işveren", "صاحب العمل", "n", "m", "🏭"]
      ],
      sents: [
        ["Šaljem prijav{u|f_acc|prijava} na konkurs.", "İş ilanına başvuru gönderiyorum.", "أرسل طلبا للوظيفة."],
        ["Poslodavac traži iskustvo.", "İşveren deneyim istiyor.", "صاحب العمل يطلب خبرة."],
        ["Želim napredovati u karijer{i|loc_f|karijera}.", "Kariyerimde ilerlemek istiyorum.", "أريد أن أتقدم في مسيرتي المهنية."],
        ["Završi{la|past_f|završiti} sam obuku za medicinsku sestru.", "Hemşirelik eğitimini bitirdim. (kadın)", "أنهيتُ التدريب كممرضة. (للمؤنث)"]
      ] },

    { id: "b1u22", level: "B1", icon: "🚉", title: { bs: "Prevoz po BiH", tr: "Bosna'da ulaşım", ar: "التنقل في البوسنة" },
      words: [
        ["autobuska stanica", "otogar", "محطة الحافلات", "phr", "", "🚌"],
        ["željeznička stanica", "tren istasyonu", "محطة القطار", "phr", "", "🚉"],
        ["red vožnje", "sefer tarifesi", "جدول المواعيد", "phr", "", "🗓️"],
        ["linija", "hat", "خط", "n", "f", "〰️"],
        ["mjesečna karta", "aylık kart", "اشتراك شهري", "phr", "", "🎟️"],
        ["kontrolor", "kontrolör", "مفتّش التذاكر", "n", "m", "🕵️"],
        ["putnik", "yolcu", "مسافر", "n", "m", "🧍"],
        ["sjever", "kuzey", "شمال", "n", "m", "⬆️"],
        ["jug", "güney", "جنوب", "n", "m", "⬇️"],
        ["istok", "doğu", "شرق", "n", "m", "➡️"],
        ["zapad", "batı", "غرب", "n", "m", "⬅️"],
        ["udaljenost", "mesafe", "مسافة", "n", "f", "📏"],
        ["kilometar", "kilometre", "كيلومتر", "n", "m", "🛣️"],
        ["putovanje", "yolculuk", "سفر", "n", "n", "🧳"],
        ["polaziti", "kalkmak (araç)", "ينطلق", "v", "", "🚏"]
      ],
      sents: [
        ["Kada polazi autobus za Mostar?", "Mostar otobüsü ne zaman kalkıyor?", "متى تنطلق الحافلة إلى موستار؟"],
        ["Bihać je na zapad{u|loc_m|zapad} Bosne.", "Bihać, Bosna'nın batısında.", "بيهاتش في غرب البوسنة."],
        ["Do grada ima dvadeset kilometar{a|gen_pl|kilometar}.", "Şehre yirmi kilometre var.", "المسافة إلى المدينة عشرون كيلومترا."],
        ["Putnic{i|m_pl|putnik} čekaju na stanici.", "Yolcular durakta bekliyor.", "المسافرون ينتظرون في المحطة."]
      ] },

    { id: "b1u23", level: "B1", icon: "🤝", title: { bs: "Zajednica i volontiranje", tr: "Topluluk ve gönüllülük", ar: "المجتمع والتطوع" },
      words: [
        ["udruženje", "dernek", "جمعية", "n", "n", "🤝"],
        ["volonter", "gönüllü", "متطوّع", "n", "m", "🙋"],
        ["pomoć", "yardım", "مساعدة", "n", "f", "🆘"],
        ["donacija", "bağış", "تبرّع", "n", "f", "🎁"],
        ["skupljati", "toplamak", "يجمع", "v", "", "🧺"],
        ["organizovati", "düzenlemek", "ينظّم", "v", "", "📋"],
        ["učestvovati", "katılmak (etkinliğe)", "يشارك", "v", "", "🙌"],
        ["događaj", "etkinlik", "فعالية", "n", "m", "📅"],
        ["pozivnica", "davetiye", "بطاقة دعوة", "n", "f", "💌"],
        ["dobrotvoran", "hayırsever", "خيري", "adj", "", "💚"],
        ["džemat", "cemaat", "جماعة المسجد", "n", "m", "🕌"],
        ["sedmični", "haftalık", "أسبوعي", "adj", "", "🗓️"],
        ["član", "üye", "عضو", "n", "m", "🪪"],
        ["sastati se", "buluşmak", "يلتقي", "v", "", "👋"],
        ["volontirati", "gönüllü çalışmak", "يتطوّع", "v", "", "🙋‍♀️"]
      ],
      sents: [
        ["Volontiram u udruženj{u|loc_n|udruženje}.", "Bir dernekte gönüllü çalışıyorum.", "أتطوّع في جمعية."],
        ["Skupljamo pomoć za porodice.", "Aileler için yardım topluyoruz.", "نجمع المساعدات للعائلات."],
        ["Sastajemo {se|refl} svake sedmice.", "Her hafta buluşuyoruz.", "نلتقي كل أسبوع."],
        ["Ona je član{ica|fem_noun|član} udruženja.", "O, derneğin üyesi. (kadın)", "هي عضوة في الجمعية."]
      ] },

    { id: "b2u1", level: "B2", icon: "📰", title: { bs: "Mediji i vijesti", tr: "Medya ve haberler", ar: "الإعلام والأخبار" },
      words: [
        ["vijest", "haber", "خبر", "n", "f", "🗞️"],
        ["novinar", "gazeteci", "صحفي", "n", "m", "🎙️"],
        ["televizija", "televizyon", "تلفزيون", "n", "f", "📺"],
        ["emisija", "program (TV, radyo)", "برنامج", "n", "f", "📡"],
        ["članak", "makale", "مقال", "n", "m", "📝"],
        ["naslov", "başlık", "عنوان", "n", "m", "🔠"],
        ["izvor", "kaynak", "مصدر", "n", "m", "🔍"],
        ["objaviti", "yayımlamak", "ينشر", "v", "", "📢"],
        ["istina", "gerçek", "حقيقة", "n", "f", "✔️"],
        ["laž", "yalan", "كذبة", "n", "f", "✖️"],
        ["javnost", "kamuoyu", "الرأي العام", "n", "f", "👥"],
        ["društvene mreže", "sosyal medya", "وسائل التواصل الاجتماعي", "phr", "", "📱"],
        ["uticaj", "etki", "تأثير", "n", "m", "🌊"],
        ["izvještavati", "haber vermek", "يغطّي إخباريا", "v", "", "🎥"],
        ["čitalac", "okuyucu", "قارئ", "n", "m", "👓"]
      ],
      sents: [
        ["Vijest je {objavljena|pass|objaviti} jutros.", "Haber bu sabah yayımlandı.", "نُشر الخبر هذا الصباح."],
        ["Članak je {napisan|pass|napisati} prošle sedmice.", "Makale geçen hafta yazıldı.", "كُتب المقال الأسبوع الماضي."],
        ["Novinar {koji|rel} piše o ekonomiji je moj prijatelj.", "Ekonomi hakkında yazan gazeteci benim arkadaşım.", "الصحفي الذي يكتب عن الاقتصاد صديقي."],
        ["Uvijek provjeri izvor.", "Her zaman kaynağı kontrol et.", "تحقّق دائما من المصدر."]
      ] },

    { id: "b2u2", level: "B2", icon: "🏛️", title: { bs: "Društvo i država", tr: "Toplum ve devlet", ar: "المجتمع والدولة" },
      words: [
        ["društvo", "toplum", "مجتمع", "n", "n", "👥"],
        ["država", "devlet", "دولة", "n", "f", "🏛️"],
        ["vlada", "hükümet", "حكومة", "n", "f", "🏢"],
        ["izbori", "seçimler", "انتخابات", "n", "m", "🗳️"],
        ["glasati", "oy vermek", "يصوّت", "v", "", "✅"],
        ["zakon", "kanun", "قانون", "n", "m", "⚖️"],
        ["pravo", "hak; hukuk", "حق؛ قانون", "n", "n", "📜"],
        ["građanin", "vatandaş", "مواطن", "n", "m", "🧑"],
        ["zajednica", "topluluk", "مجتمع محلي", "n", "f", "🤝"],
        ["demokratija", "demokrasi", "ديمقراطية", "n", "f", "🗳️"],
        ["sloboda", "özgürlük", "حرية", "n", "f", "🕊️"],
        ["jednakost", "eşitlik", "مساواة", "n", "f", "🟰"],
        ["odgovornost", "sorumluluk", "مسؤولية", "n", "f", "📋"],
        ["parlament", "parlamento", "برلمان", "n", "m", "🏛️"],
        ["ustav", "anayasa", "دستور", "n", "m", "📘"]
      ],
      sents: [
        ["Svaki građanin ima pravo glasa.", "Her vatandaşın oy hakkı var.", "لكل مواطن حق التصويت."],
        ["Izbori su {održani|pass} u oktobru.", "Seçimler ekimde yapıldı.", "أُجريت الانتخابات في أكتوبر."],
        ["Zakon {koji|rel} štiti djecu je važan.", "Çocukları koruyan kanun önemlidir.", "القانون الذي يحمي الأطفال مهم."],
        ["Sloboda dolazi s odgovornošću.", "Özgürlük sorumlulukla gelir.", "الحرية تأتي مع المسؤولية."]
      ] },

    { id: "b2u3", level: "B2", icon: "♻️", title: { bs: "Ekologija", tr: "Çevre", ar: "البيئة" },
      words: [
        ["okoliš", "çevre", "البيئة", "n", "m", "🌍"],
        ["zagađenje", "kirlilik", "تلوّث", "n", "n", "🏭"],
        ["klimatske promjene", "iklim değişikliği", "تغيّر المناخ", "phr", "", "🌡️"],
        ["otpad", "atık", "نفايات", "n", "m", "🗑️"],
        ["reciklirati", "geri dönüştürmek", "يعيد التدوير", "v", "", "♻️"],
        ["energija", "enerji", "طاقة", "n", "f", "⚡"],
        ["obnovljiv", "yenilenebilir", "متجدّد", "adj", "", "☀️"],
        ["zrak", "hava (solunan)", "هواء", "n", "m", "💨"],
        ["priroda", "doğa", "طبيعة", "n", "f", "🌿"],
        ["zaštititi", "korumak", "يحمي", "v", "", "🛡️"],
        ["životinja", "hayvan", "حيوان", "n", "f", "🐾"],
        ["biljka", "bitki", "نبات", "n", "f", "🪴"],
        ["šteta", "zarar", "ضرر", "n", "f", "💥"],
        ["potrošnja", "tüketim", "استهلاك", "n", "f", "📊"],
        ["plastika", "plastik", "بلاستيك", "n", "f", "🧴"]
      ],
      sents: [
        ["Zrak je danas {čišći|comp|čist}.", "Hava bugün daha temiz.", "الهواء أنظف اليوم."],
        ["Plastika {se|refl} reciklira.", "Plastik geri dönüştürülüyor.", "يُعاد تدوير البلاستيك."],
        ["Moramo zaštititi prirod{u|f_acc|priroda}.", "Doğayı korumalıyız.", "يجب أن نحمي الطبيعة."],
        ["Zagađenje je {najveći|sup|velik} problem u gradu.", "Kirlilik şehirdeki en büyük sorun.", "التلوث أكبر مشكلة في المدينة."]
      ] },

    { id: "b2u4", level: "B2", icon: "💹", title: { bs: "Ekonomija", tr: "Ekonomi", ar: "الاقتصاد" },
      words: [
        ["ekonomija", "ekonomi", "اقتصاد", "n", "f", "📈"],
        ["tržište", "piyasa", "سوق (اقتصادية)", "n", "n", "📊"],
        ["inflacija", "enflasyon", "تضخّم", "n", "f", "🎈"],
        ["porez", "vergi", "ضريبة", "n", "m", "🧾"],
        ["budžet", "bütçe", "ميزانية", "n", "m", "💼"],
        ["investicija", "yatırım", "استثمار", "n", "f", "💹"],
        ["preduzeće", "işletme", "مؤسسة", "n", "n", "🏭"],
        ["nezaposlenost", "işsizlik", "بطالة", "n", "f", "📉"],
        ["rast", "büyüme", "نموّ", "n", "m", "🌱"],
        ["pad", "düşüş", "انخفاض", "n", "m", "⬇️"],
        ["uvoz", "ithalat", "استيراد", "n", "m", "📥"],
        ["izvoz", "ihracat", "تصدير", "n", "m", "📤"],
        ["profit", "kâr", "ربح", "n", "m", "💰"],
        ["trošak", "masraf", "تكلفة", "n", "m", "💸"],
        ["posto", "yüzde", "بالمئة", "adv", "", "%"]
      ],
      sents: [
        ["Cijene su {veće|comp|velik} nego prošle godine.", "Fiyatlar geçen yıldan daha yüksek.", "الأسعار أعلى من العام الماضي."],
        ["Porez {se|refl} plaća svakog mjeseca.", "Vergi her ay ödenir.", "تُدفع الضريبة كل شهر."],
        ["Izvoz je porastao za deset posto.", "İhracat yüzde on arttı.", "ارتفعت الصادرات بنسبة عشرة بالمئة."],
        ["Ovo preduzeće je {najbolje|sup|dobar} u gradu.", "Bu işletme şehrin en iyisi.", "هذه المؤسسة هي الأفضل في المدينة."]
      ] },

    { id: "b2u5", level: "B2", icon: "⚖️", title: { bs: "Pravo i institucije", tr: "Hukuk ve kurumlar", ar: "القانون والمؤسسات" },
      words: [
        ["sud", "mahkeme", "محكمة", "n", "m", "⚖️"],
        ["sudija", "hakim", "قاضٍ", "n", "m", "🧑‍⚖️"],
        ["advokat", "avukat", "محامٍ", "n", "m", "💼"],
        ["potpisati", "imzalamak", "يوقّع", "v", "", "✍️"],
        ["pravilo", "kural", "قاعدة", "n", "n", "📏"],
        ["dozvola", "izin", "تصريح", "n", "f", "📄"],
        ["zahtjev", "talep, başvuru", "طلب رسمي", "n", "m", "📨"],
        ["žalba", "itiraz, şikâyet", "طعن، شكوى", "n", "f", "📢"],
        ["svjedok", "tanık", "شاهد", "n", "m", "👁️"],
        ["dokaz", "kanıt", "دليل", "n", "m", "🔍"],
        ["ovjeriti", "onaylatmak (noterde)", "يصادق", "v", "", "🖋️"],
        ["notar", "noter", "كاتب العدل", "n", "m", "🖊️"],
        ["prevodilac", "tercüman", "مترجم", "n", "m", "🌐"],
        ["ured", "büro", "مكتب", "n", "m", "🏢"],
        ["institucija", "kurum", "مؤسسة رسمية", "n", "f", "🏛️"]
      ],
      sents: [
        ["Dokument mora biti {ovjeren|pass|ovjeriti} kod notar{a|gen|notar}.", "Belgenin noterde onaylanması gerekir.", "يجب أن تُصادَق الوثيقة لدى كاتب العدل."],
        ["Trebam prevodioca {koji|rel} govori arapski.", "Arapça bilen bir tercümana ihtiyacım var.", "أحتاج مترجما يتكلم العربية."],
        ["Imam pravo na žalb{u|f_acc|žalba}.", "İtiraz hakkım var.", "لي الحق في الطعن."],
        ["Zahtjev je {odbijen|pass}.", "Talep reddedildi.", "رُفض الطلب."]
      ] },

    { id: "b2u6", level: "B2", icon: "🔬", title: { bs: "Nauka i zdravlje", tr: "Bilim ve sağlık", ar: "العلم والصحة" },
      words: [
        ["istraživanje", "araştırma", "بحث", "n", "n", "🔬"],
        ["naučnik", "bilim insanı", "عالِم", "n", "m", "🧪"],
        ["nauka", "bilim", "علم", "n", "f", "🔭"],
        ["otkriće", "keşif", "اكتشاف", "n", "n", "💡"],
        ["vakcina", "aşı", "لقاح", "n", "f", "💉"],
        ["bolest", "hastalık", "مرض", "n", "f", "🦠"],
        ["liječenje", "tedavi", "علاج", "n", "n", "🩺"],
        ["prevencija", "önleme", "وقاية", "n", "f", "🛡️"],
        ["laboratorija", "laboratuvar", "مختبر", "n", "f", "🧫"],
        ["rezultat", "sonuç", "نتيجة", "n", "m", "📊"],
        ["dokazati", "kanıtlamak", "يُثبت", "v", "", "✅"],
        ["uzrok", "neden", "سبب", "n", "m", "🔗"],
        ["posljedica", "sonuç, etki", "عاقبة", "n", "f", "➡️"],
        ["stručnjak", "uzman", "خبير", "n", "m", "🎓"],
        ["otkriti", "keşfetmek", "يكتشف", "v", "", "🔎"]
      ],
      sents: [
        ["Naučnici su otkrili novi lijek.", "Bilim insanları yeni bir ilaç keşfetti.", "اكتشف العلماء دواء جديدا."],
        ["Prevencija je {bolja|comp|dobar} od liječenja.", "Önlemek tedaviden daha iyidir.", "الوقاية خير من العلاج."],
        ["Istraživanje {koje|rel} je objavljeno pokazuje dobre rezultate.", "Yayımlanan araştırma iyi sonuçlar gösteriyor.", "البحث الذي نُشر يُظهر نتائج جيدة."],
        ["Uzrok bolesti još nije poznat.", "Hastalığın nedeni henüz bilinmiyor.", "سبب المرض غير معروف بعد."]
      ] },

    { id: "b2u7", level: "B2", icon: "🏺", title: { bs: "Historija i naslijeđe", tr: "Tarih ve miras", ar: "التاريخ والتراث" },
      words: [
        ["historija", "tarih", "تاريخ", "n", "f", "📜"],
        ["vijek", "yüzyıl", "قرن", "n", "m", "⏳"],
        ["carstvo", "imparatorluk", "إمبراطورية", "n", "n", "👑"],
        ["osmanski", "Osmanlı", "عثماني", "adj", "", "🕌"],
        ["austrougarski", "Avusturya-Macaristan", "نمساوي مجري", "adj", "", "🏛️"],
        ["naslijeđe", "miras", "إرث", "n", "n", "🏺"],
        ["arhitektura", "mimari", "عمارة", "n", "f", "🏗️"],
        ["kraljevina", "krallık", "مملكة", "n", "f", "👑"],
        ["mir", "barış", "سلام", "n", "m", "🕊️"],
        ["obnova", "yeniden yapım", "إعادة إعمار", "n", "f", "🏗️"],
        ["običaj", "gelenek, âdet", "عادة", "n", "m", "🎎"],
        ["nošnja", "geleneksel kıyafet", "زيّ تقليدي", "n", "f", "👘"],
        ["zanat", "zanaat", "حرفة", "n", "m", "🔨"],
        ["bakar", "bakır", "نحاس", "n", "m", "🥉"],
        ["ćilim", "kilim", "سجادة يدوية", "n", "m", "🧶"]
      ],
      sents: [
        ["Stari most je {izgrađen|pass} u šesnaestom vijek{u|loc_m|vijek}.", "Eski Köprü on altıncı yüzyılda inşa edildi.", "بُني الجسر القديم في القرن السادس عشر."],
        ["Baščaršija je {najpoznatiji|sup|poznat} dio Sarajeva.", "Başçarşı, Saraybosna'nın en ünlü yeridir.", "الباشتشارشيا أشهر جزء في سراييفو."],
        ["Ćilimi {se|refl} tkaju ručno.", "Kilimler elle dokunur.", "تُنسج السجاجيد يدويا."],
        ["Ovo naslijeđe moramo čuvati.", "Bu mirası korumalıyız.", "يجب أن نحافظ على هذا الإرث."]
      ] },

    { id: "b2u8", level: "B2", icon: "🤖", title: { bs: "Tehnologija", tr: "Teknoloji", ar: "التكنولوجيا" },
      words: [
        ["tehnologija", "teknoloji", "تكنولوجيا", "n", "f", "💻"],
        ["uređaj", "cihaz", "جهاز", "n", "m", "📱"],
        ["softver", "yazılım", "برمجيات", "n", "m", "🖥️"],
        ["podatak", "veri", "معلومة", "n", "m", "📊"],
        ["mreža", "ağ", "شبكة", "n", "f", "🕸️"],
        ["sigurnost", "güvenlik", "أمان", "n", "f", "🔒"],
        ["vještačka inteligencija", "yapay zekâ", "الذكاء الاصطناعي", "phr", "", "🤖"],
        ["ekran", "ekran", "شاشة", "n", "m", "🖥️"],
        ["baterija", "pil", "بطارية", "n", "f", "🔋"],
        ["preuzeti", "indirmek", "يُنزّل", "v", "", "⬇️"],
        ["instalirati", "yüklemek (program)", "يثبّت", "v", "", "🧩"],
        ["ažurirati", "güncellemek", "يحدّث", "v", "", "🔄"],
        ["pretraživati", "aramak (internette)", "يبحث", "v", "", "🔎"],
        ["korisnik", "kullanıcı", "مستخدم", "n", "m", "👤"],
        ["privatnost", "gizlilik", "خصوصية", "n", "f", "🕶️"]
      ],
      sents: [
        ["Aplikacija {koja|rel} uči jezike je korisna.", "Dil öğreten uygulama faydalı.", "التطبيق الذي يعلّم اللغات مفيد."],
        ["Ovaj telefon je {brži|comp|brz} od starog.", "Bu telefon eskisinden daha hızlı.", "هذا الهاتف أسرع من القديم."],
        ["Podaci su {zaštićeni|pass|zaštititi}.", "Veriler korunuyor.", "البيانات محمية."],
        ["Preuzm{i|imp|preuzeti} novu verziju.", "Yeni sürümü indir.", "نزّل الإصدار الجديد."]
      ] },

    { id: "b2u9", level: "B2", icon: "🗣️", title: { bs: "Rasprava", tr: "Tartışma", ar: "النقاش" },
      words: [
        ["argument", "argüman", "حجّة", "n", "m", "🗣️"],
        ["stav", "tutum", "موقف", "n", "m", "🧍"],
        ["tvrdnja", "iddia", "ادّعاء", "n", "f", "💬"],
        ["zaključak", "sonuç (çıkarım)", "استنتاج", "n", "m", "🏁"],
        ["s jedne strane", "bir yandan", "من جهة", "phr", "", "⬅️"],
        ["s druge strane", "öte yandan", "من جهة أخرى", "phr", "", "➡️"],
        ["međutim", "ancak", "غير أنّ", "conj", "", "↔️"],
        ["stoga", "bu nedenle", "لذلك", "conj", "", "🔗"],
        ["osim toga", "bunun yanında", "بالإضافة إلى ذلك", "phr", "", "➕"],
        ["uvjeriti", "ikna etmek", "يُقنع", "v", "", "🤝"],
        ["prigovor", "itiraz", "اعتراض", "n", "m", "✋"],
        ["dakle", "yani", "إذن", "conj", "", "👉"],
        ["naglasiti", "vurgulamak", "يؤكّد", "v", "", "❗"],
        ["raspravljati", "tartışmak", "يناقش", "v", "", "💬"],
        ["ipak", "yine de", "ومع ذلك", "adv", "", "🔄"]
      ],
      sents: [
        ["Rekao je da {će|fut} doći kasnije.", "Daha sonra geleceğini söyledi.", "قال إنه سيأتي لاحقا."],
        ["S jedne strane je skupo, s druge strane je kvalitetno.", "Bir yandan pahalı, öte yandan kaliteli.", "من جهة هو غالٍ، ومن جهة أخرى هو جيّد الجودة."],
        ["Kad bih imao vremena, učio {bih|cond} više.", "Zamanım olsaydı daha çok çalışırdım.", "لو كان عندي وقت لدرستُ أكثر."],
        ["Međutim, problem nije {riješen|pass}.", "Ancak sorun çözülmedi.", "غير أنّ المشكلة لم تُحلّ."]
      ] },

    { id: "b2u10", level: "B2", icon: "🧗", title: { bs: "Vrijednosti i ciljevi", tr: "Değerler ve hedefler", ar: "القيم والأهداف" },
      words: [
        ["životni stil", "yaşam tarzı", "نمط الحياة", "phr", "", "🧘"],
        ["vrijednost", "değer", "قيمة", "n", "f", "💎"],
        ["poštovanje", "saygı", "احترام", "n", "n", "🙏"],
        ["povjerenje", "güven", "ثقة", "n", "n", "🤝"],
        ["saradnja", "işbirliği", "تعاون", "n", "f", "🧑‍🤝‍🧑"],
        ["razvoj", "gelişme", "تطوّر", "n", "m", "📈"],
        ["promjena", "değişim", "تغيير", "n", "f", "🔄"],
        ["izazov", "meydan okuma", "تحدٍّ", "n", "m", "🧗"],
        ["postići", "başarmak", "يحقّق", "v", "", "🏆"],
        ["uticati", "etkilemek", "يؤثّر", "v", "", "🌊"],
        ["ostvariti", "gerçekleştirmek", "يحقّق (حلما)", "v", "", "✨"],
        ["san", "rüya, hayal", "حلم", "n", "m", "💭"],
        ["integracija", "entegrasyon, uyum", "اندماج", "n", "f", "🧩"],
        ["zajednički", "ortak", "مشترك", "adj", "", "🤲"],
        ["samostalan", "bağımsız", "مستقلّ", "adj", "", "🧭"]
      ],
      sents: [
        ["Svaka promjena je izazov.", "Her değişim bir meydan okumadır.", "كل تغيير تحدٍّ."],
        ["Želim ostvariti svoje snove.", "Hayallerimi gerçekleştirmek istiyorum.", "أريد أن أحقق أحلامي."],
        ["Saradnja je {najvažnija|sup|važan}.", "İşbirliği en önemli şeydir.", "التعاون هو الأهم."],
        ["Kad bismo radili zajedno, postigli {bismo|cond} više.", "Birlikte çalışsaydık daha fazlasını başarırdık.", "لو عملنا معا لحققنا أكثر."]
      ] }
  ],

  /* Hintovi za nove oblike: naslov i kratko objašnjenje na turskom i arapskom.
     ex: primjeri, s istom oznakom {nastavak} za bojenje. */
  hints: {
    comp: { tr: ["Karşılaştırma (komparativ)", "“Daha …” için sıfat -iji, -ji veya -ši alır: brz → brži. Düzensiz olanlar: dobar → bolji, velik → veći, mali → manji."],
            ar: ["صيغة المقارنة", "للدلالة على «أكثر» تأخذ الصفة ‎-iji‎ أو ‎-ji‎ أو ‎-ši‎: brz ← brži. وهناك صيغ شاذة: dobar ← bolji، velik ← veći، mali ← manji."],
            ex: ["brž{i}", "{veći}", "{bolja}"] },
    sup: { tr: ["En üstünlük (superlativ)", "“En …” için karşılaştırma biçiminin başına naj- gelir: najbolji, najveći."],
           ar: ["التفضيل المطلق", "للدلالة على «الأكثر» تُضاف naj- إلى صيغة المقارنة: najbolji، najveći."],
           ex: ["{naj}bolji", "{naj}veći", "{naj}važniji"] },
    pass: { tr: ["Edilgen (pasiv)", "Yapanı söylenmeyen iş: biti ve -n, -en, -t ile biten sıfat: vijest je objavljena (haber yayımlandı)."],
            ar: ["المبني للمجهول", "للحدث الذي لا يُذكر فاعله: biti مع صفة المفعول المنتهية بـ ‎-n‎ أو ‎-en‎ أو ‎-t‎: vijest je objavljena (نُشر الخبر)."],
            ex: ["objavljen{a}", "{izgrađen}", "{zaštićeni}"] },
    rel: { tr: ["İlgi zamiri: koji, koja, koje", "“… olan” anlamındadır ve ismin cinsine uyar: koji (eril), koja (dişil), koje (nötr). Türkçedeki -an/-en gibi."],
           ar: ["الاسم الموصول: koji وkoja وkoje", "بمعنى «الذي» أو «التي»، ويتبع جنس الاسم: koji للمذكر، وkoja للمؤنث، وkoje للمحايد."],
           ex: ["novinar {koji} piše", "aplikacija {koja} uči", "istraživanje {koje}"] },
    dat: { tr: ["Yönelme hâli (dativ)", "“Kime?” ya da bir kişiye doğru: eril isim -u alır, dişil isimde -a, -i olur. Türkçedeki -e/-a gibi."],
           ar: ["حالة القابل (داتيف)", "«لِمَن؟» أو الذهاب إلى شخص: يأخذ الاسم المذكر ‎-u‎، وفي المؤنث تصبح ‎-a‎ ‎-i‎، مثل «إلى» أو «لـ»."],
           ex: ["ljekar{u}", "sestr{i}", "brat{u}"] },
    loc_pl: { tr: ["Bulunma hâli: çoğul", "Çoğulda u veya na'dan sonra eril ve nötr isim -ima, dişil isim -ama alır."],
              ar: ["المكان: الجمع", "في الجمع بعد u أو na يأخذ المذكر والمحايد ‎-ima‎، والمؤنث ‎-ama‎."],
              ex: ["u stan{ovima}", "na ulic{ama}", "u sel{ima}"] },
    gen_pl: { tr: ["Tamlayan hâli: çoğul", "5 ve üstü sayılardan ve mnogo, puno, malo'dan sonra isim çoğul genitif alır, çoğu zaman -a ile biter."],
              ar: ["الجر: الجمع", "بعد الأعداد من 5 فما فوق وبعد mnogo وpuno وmalo يأتي الاسم في جمع الجر، وغالبا ينتهي بـ ‎-a‎."],
              ex: ["pet {maraka}", "deset minut{a}", "puno paket{a}"] },
    aspect: { tr: ["Fiil görünüşü (aspekt)", "Çoğu fiilin iki biçimi vardır: süren eylem (pisati) ve biten eylem (napisati). Ön ek (na-, pro-, u-) eylemin bittiğini gösterir."],
              ar: ["مظهر الفعل", "لمعظم الأفعال صيغتان: حدث مستمر (pisati) وحدث مكتمل (napisati). البادئة (na- وpro- وu-) تدل على أن الحدث انتهى."],
              ex: ["{na}pisati", "{pro}čitati", "{u}raditi"] },
    imp: { tr: ["Emir kipi (imperativ)", "Rica veya emir için: sen → -i/-j (piši, daj), siz → -ite/-jte (pišite, dajte). Kibar konuşmada siz kullanılır."],
           ar: ["صيغة الأمر", "للطلب أو الأمر: للمفرد ‎-i/-j‎ (piši، daj)، وللجمع أو للاحترام ‎-ite/-jte‎ (pišite، dajte)."],
           ex: ["daj{te}", "piš{ite}", "čekaj{te}"] },
    refl: { tr: ["Dönüşlü fiil: se", "Bazı fiiller se ile kullanılır: zvati se (adı olmak), igrati se (oynamak), sviđati se (hoşa gitmek). se çoğu zaman cümlede ikinci sıradadır."],
            ar: ["الفعل مع se", "بعض الأفعال تُستعمل مع se: zvati se (يُسمّى)، igrati se (يلعب)، sviđati se (يُعجِب). تأتي se غالبا في المكان الثاني من الجملة."],
            ex: ["zovem {se}", "igram {se}", "sviđa mi {se}"] },
    modal: { tr: ["Kip fiilleri", "morati (zorunda olmak), moći (-ebilmek), smjeti (izinli olmak) ve ardından mastar: moram raditi."],
             ar: ["الأفعال المساعدة", "morati (يجب)، وmoći (يستطيع)، وsmjeti (يُسمح)، ثم المصدر: moram raditi."],
             ex: ["{moram} raditi", "{mogu} doći", "{smijem} ući"] },
    cond: { tr: ["Şart kipi (kondicional)", "bih, bi, bismo, biste ve geçmiş zaman biçimi: volio bih (isterdim), mogli bismo (yapabilirdik). Kibar istek için de kullanılır."],
            ar: ["صيغة الشرط", "bih وbi وbismo وbiste مع صيغة الماضي: volio bih (أودّ)، mogli bismo (يمكننا). تُستعمل أيضا للطلب المهذب."],
            ex: ["volio {bih}", "mogla {bi}", "mogli {bismo}"] },
    poss: { tr: ["İyelik: moj, moja, moje", "“Benim” kelimesi ismin cinsine göre değişir: eril isimde moj, dişil isimde moja, nötr isimde moje."],
            ar: ["الملكية: moj وmoja وmoje", "كلمة «لي» تتغير حسب جنس الاسم: moj للمذكر، وmoja للمؤنث، وmoje للمحايد."],
            ex: ["moj otac", "moj{a} majka", "moj{e} dijete"] },
    adj_f: { tr: ["Sıfat: dişil", "Dişil bir isimle sıfat -a alır: crven → crvena."],
             ar: ["الصفة مع المؤنث", "تأخذ الصفة ‎-a‎ مع الاسم المؤنث: crven ← crvena."],
             ex: ["crven{a} jabuka", "velik{a} kuća", "{dobra} žena"] },
    adj_n: { tr: ["Sıfat: nötr", "Nötr bir isimle sıfat -o (bazen -e) alır: bijel → bijelo."],
             ar: ["الصفة مع المحايد", "مع الاسم المحايد تأخذ الصفة ‎-o‎ (أحيانا ‎-e‎): bijel ← bijelo."],
             ex: ["bijel{o} mlijeko", "plav{o} more", "mal{o} dijete"] },
    num234: { tr: ["2, 3 ve 4'ten sonra", "dva, tri, četiri'den sonra eril isim -a, dişil isim -e alır."],
              ar: ["بعد 2 و3 و4", "بعد dva وtri وčetiri يأخذ الاسم المذكر ‎-a‎ والمؤنث ‎-e‎."],
              ex: ["dva čaj{a}", "tri kaf{e}", "četiri sir{a}"] },
    biti: { tr: ["biti (olmak)", "Türkçedeki -im, -sin eki gibi, ayrı bir kelimedir: ja sam, ti si, on je, mi smo, vi ste, oni su."],
            ar: ["فعل biti (يكون)", "في البوسنية يُذكر فعل الكون دائما: ja sam، ti si، on je، mi smo، vi ste، oni su."],
            ex: ["ja {sam}", "ti {si}", "mi {smo}"] },
    pres_1sg: { tr: ["Şimdiki zaman: ben", "“Ben” için fiil -m ile biter."],
                ar: ["المضارع: أنا", "مع «أنا» ينتهي الفعل بـ ‎-m‎."],
                ex: ["radi{m}", "jede{m}", "ima{m}"] },
    pres_2sg: { tr: ["Şimdiki zaman: sen", "“Sen” için fiil -š ile biter."],
                ar: ["المضارع: أنت", "مع «أنت» ينتهي الفعل بـ ‎-š‎."],
                ex: ["radi{š}", "pije{š}", "ima{š}"] },
    pres_3sg: { tr: ["Şimdiki zaman: o", "“O” için fiil -i, -a veya -e ile biter, başka ek yoktur."],
                ar: ["المضارع: هو، هي", "مع «هو» و«هي» ينتهي الفعل بـ ‎-i‎ أو ‎-a‎ أو ‎-e‎ دون إضافة."],
                ex: ["rad{i}", "im{a}", "jed{e}"] },
    f_pl: { tr: ["Çoğul: dişil", "-a ile biten dişil isimler çoğulda -e alır. Türkçedeki -ler/-lar gibi."],
            ar: ["الجمع: المؤنث", "الأسماء المؤنثة المنتهية بـ ‎-a‎ تنتهي في الجمع بـ ‎-e‎."],
            ex: ["jabuk{e}", "kuć{e}", "mačk{e}"] },
    m_pl: { tr: ["Çoğul: eril", "Eril isimler çoğulda -i alır. Kısa isimler çoğu zaman -ovi veya -evi alır."],
            ar: ["الجمع: المذكر", "تأخذ الأسماء المذكرة ‎-i‎ في الجمع، والقصيرة منها غالبا ‎-ovi‎ أو ‎-evi‎."],
            ex: ["telefon{i}", "student{i}", "grad{ovi}"] },
    n_pl: { tr: ["Çoğul: nötr", "Nötr isimlerde -o veya -e, çoğulda -a olur."],
            ar: ["الجمع: المحايد", "في الأسماء المحايدة تصبح ‎-o‎ أو ‎-e‎ في الجمع ‎-a‎."],
            ex: ["sel{a}", "mor{a}", "jaj{a}"] },
    pl_irr: { tr: ["Düzensiz çoğul", "Bazı kelimelerin çoğulu farklıdır ve ezberlenir."],
              ar: ["جمع غير قياسي", "بعض الكلمات لها جمع خاص يُحفظ، مثل جمع التكسير في العربية."],
              ex: ["pas → {psi}", "dijete → {djeca}", "čovjek → {ljudi}", "oko → {oči}"] },
    f_acc: { tr: ["Belirtme hâli (akuzativ)", "Fiilin nesnesi olan dişil isimde -a, -u olur. Türkçedeki “elmayı” gibi."],
             ar: ["المفعول به (أكوزاتيف)", "عندما يكون الاسم المؤنث مفعولا به تتغير ‎-a‎ في آخره إلى ‎-u‎، مثل الفتحة في «أكلتُ تفاحةً»."],
             ex: ["jabuk{u}", "vod{u}", "knjig{u}"] },
    m_acc_anim: { tr: ["Akuzativ: canlı eril", "Nesne canlı ve eril ise -a eklenir. Cansız eril isim değişmez: vidim grad."],
                  ar: ["المفعول به: المذكر الحي", "إذا كان المفعول به كائنا حيا مذكرا يُضاف ‎-a‎، أما الأشياء فلا تتغير: vidim grad."],
                  ex: ["brat{a}", "{psa}", "prijatelj{a}"] },
    loc_f: { tr: ["Bulunma hâli: dişil", "“Nerede?” sorusunda u veya na'dan sonra dişil isimde -a, -i olur. Türkçedeki -de/-da gibi."],
             ar: ["المكان: المؤنث", "بعد u أو na للدلالة على المكان تصبح ‎-a‎ في آخر الاسم المؤنث ‎-i‎."],
             ex: ["u kuć{i}", "u škol{i}", "na pijac{i}"] },
    loc_m: { tr: ["Bulunma hâli: eril", "u veya na'dan sonra eril isim -u alır."],
             ar: ["المكان: المذكر", "بعد u أو na يأخذ الاسم المذكر ‎-u‎."],
             ex: ["u grad{u}", "u park{u}", "na univerzitet{u}"] },
    loc_n: { tr: ["Bulunma hâli: nötr", "Nötr isimlerde -o veya -e, -u olur."],
             ar: ["المكان: المحايد", "في الاسم المحايد تصبح ‎-o‎ أو ‎-e‎ ‎-u‎."],
             ex: ["na mor{u}", "u Sarajev{u}", "u sel{u}"] },
    past_m: { tr: ["Geçmiş zaman: erkek", "Konuşan erkekse fiil -o veya -ao ile biter ve yanında sam, si, je gelir."],
              ar: ["الماضي: المذكر", "إذا كان المتكلم مذكرا ينتهي الفعل بـ ‎-o‎ أو ‎-ao‎ ويأتي معه sam أو si أو je."],
              ex: ["radi{o} sam", "{išao} sam", "kuha{o} je"] },
    past_f: { tr: ["Geçmiş zaman: kadın", "Konuşan kadınsa fiil -la ile biter."],
              ar: ["الماضي: المؤنث", "إذا كانت المتكلمة مؤنثة ينتهي الفعل بـ ‎-la‎."],
              ex: ["radi{la} sam", "kupi{la} sam", "gleda{la} je"] },
    past_pl: { tr: ["Geçmiş zaman: çoğul", "Biz, siz ve onlar için fiil -li ile biter."],
               ar: ["الماضي: الجمع", "مع «نحن» و«أنتم» و«هم» ينتهي الفعل بـ ‎-li‎."],
               ex: ["je{li} smo", "radi{li} su", "gleda{li} ste"] },
    fut: { tr: ["Gelecek zaman", "ću, ćeš, će, ćemo, ćete, će ve mastar. Türkçedeki -ecek/-acak gibi."],
           ar: ["المستقبل", "تُستعمل ću وćeš وće وćemo وćete مع المصدر، مثل «سـ» في العربية."],
           ex: ["{ću} raditi", "{ćeš} piti", "{ćemo} jesti"] },
    gen: { tr: ["Tamlayan hâli (genitiv)", "Miktar, yokluk (nema) ve “-in” anlamında kullanılır: dişil isimde -a, -e olur; eril isim -a alır."],
           ar: ["حالة الجر (جينيتيف)", "تُستعمل بعد الكمية والنفي (nema) وفي الإضافة: في المؤنث تصبح ‎-a‎ ‎-e‎، والمذكر يأخذ ‎-a‎."],
           ex: ["čaša vod{e}", "nema hljeb{a}", "blizu rijek{e}"] },
    ins: { tr: ["Araç hâli (instrumental)", "“ile” anlamındadır: eril isim -om alır, dişil isimde -a, -om olur. Türkçedeki -le/-la gibi."],
           ar: ["حالة الأداة", "بمعنى «بـ» أو «مع»: يأخذ الاسم المذكر ‎-om‎، وفي المؤنث تصبح ‎-a‎ ‎-om‎."],
           ex: ["voz{om}", "avion{om}", "sa sestr{om}"] },
    fem_noun: { tr: ["Meslek: kadın", "Kadınlar için meslek adına çoğu zaman -ica eklenir."],
                ar: ["المهنة: المؤنث", "للمؤنث يُضاف غالبا ‎-ica‎ إلى اسم المهنة، مثل «معلم ← معلمة»."],
                ex: ["učitelj{ica}", "student{ica}", "prijatelj{ica}"] }
  }
};
