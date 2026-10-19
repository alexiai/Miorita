(() => {
    "use strict";

    const book = document.getElementById("recipe-book");
    const pagesRoot = document.getElementById("book-pages");
    const sheet = document.getElementById("flip-sheet");
    const front = document.getElementById("flip-front");
    const back = document.getElementById("flip-back");
    if (!book || !pagesRoot || !sheet) return;

    /* Chapters, in the order of a traditional Moldavian menu.
       image: transparent PNG sticker (or null).
       Pages are built automatically: dishes that do not fit continue on the next page,
       and every chapter always starts on a fresh page. */
    const chapters = [
        {
            chapter: "Ciorbe",
            dishes: [
                ["Supă de găină cu tăieței de casă", "26 lei", "", "400 ml"],
                ["Ciorbă de legume", "21 lei", "", "400 ml"],
                ["Ciorbă de văcuță cu tăieței de casă", "26 lei", "", "400 ml · Popular"],
                ["Ciorbă de fasole cu afumătură", "26 lei", "", "400 ml"],
                ["Ciorbă de fasole", "21 lei", "", "400 ml"],
                ["Ciorbă rădăuțeană", "29 lei", "", "400 ml · Popular"],
                ["Ciorbă de cocoș", "26 lei", "", "400 ml"]
            ]
        },
        {
            chapter: "Preparatele zilei",
            dishes: [
                ["Cotlet de berbecuț cu garnitură", "91 lei", "", "450 g"],
                ["Varză călită cu costiță", "36 lei", "", "400 g"],
                ["Varză călită cu cârnați semiafumați", "36 lei", "", "400 g"],
                ["Fasole cu costiță", "36 lei", "", "400 g"],,
                ["Fasole prăjită cu cârnați semiafumați", "36 lei", "", "400 g"],
                ["Pui cu ciuperci cu smântână și mămăliguță", "36 lei", "", "300 g"],
                ["Fasole prăjită de post", "21 lei", "", "300 g"],
                ["Varză călită", "21 lei", "", "300 g"]
            ]
        },
        {
            chapter: "Tochituri",
            dishes: [
                ["Tochitură băcăuană", "48 lei", "Pulpă de porc, cârnați, bacon, ficat de pui, brânză de burduf, mămăligă.", "450 g"],
                ["Tochitură de pui", "48 lei", "Piept de pui, ficat de pui, ou, brânză de burduf, mămăligă.", "400 g"],
                ["Tochitură moldovenească", "48 lei", "", "400 g"]
            ]
        },
        {
            chapter: "Platouri",
            dishes: [
                ["Colierul domniței", "56 lei", "", "400 g"],
                ["Platou ciobănesc", "81 lei", "Pastramă de oaie, coaste de porc, cârnați de oaie, brânză de burduf, murături, cartofi boierești, hrean, mămăligă.", "650 g"],
                ["Zestrea haiducului", "81 lei", "", "600 g"],
                ["Platou Lenea Cucoanei", "81 lei", "Cotlet, piept de pui, ficăței de pui, cârnăciori proaspeți, brânză de burduf, cartofi boierești, murături, mămăligă.", "650 g"],
                ["Ospăț ciobănesc", "81 lei", "", "700 g"],
                ["Platou haiducesc", "81 lei", "Cotlet, cârnați proaspeți, kaiser, cartofi wedges, murături, 2 mititei.", "600 g"],
                ["Platou Comoară dintre vii", "81 lei", "Pastramă de oaie, cârnați de oaie, telemea de oaie, mămăligă, bacon, ou fiert, salată de sfeclă, castravete murat.", "400 g"],
                ["Tigaie picantă", "81 lei", "", "450 g"],
                ["Corabia piraților", "81 lei", "", "650 g"]
            ]
        },
        {
            chapter: "Salate antreu",
            dishes: [
                ["Salată țărănească", "38 lei", "Șuncă presată, cașcaval, kaiser, ciuperci, telemea, castraveți, roșii, măsline, ceapă, salată verde.", "450 g"],
                ["Salată cu ton", "33 lei", "Ton, roșii, salată verde, morcov, porumb, ceapă.", "300 g"],
                ["Salată de pui", "36 lei", "Piept de pui, roșii, castraveți, telemea, porumb, măsline, maioneză, salată.", "450 g"],
                ["Salată Miorița", "35 lei", "Șuncă presată, telemea, măsline, ou, roșii, salată verde.", "300 g"]
            ]
        },
        {
            chapter: "Preparate din pui și curcan",
            dishes: [
                ["Cuib de pasăre", "39 lei", "Piept de pui, ficat de pui, brânză topită, roșii, cartofi pai.", "350 g"],
                ["Aripioare cu smântână și mămăligă", "29 lei", "Aripioare de pui, usturoi, smântână, mămăligă.", "300 g"],
                ["Șnițel parizian", "29 lei", "Piept de pui, ou, făină.", ""],
                ["Șnițel de pui pane", "29 lei", "Piept de pui, ou, pesmet, făină.", "200 g"],
                ["Șnițel vienez", "31 lei", "Piept de pui, cașcaval, făină.", "250 g"],
                ["Șnițel de la Sibiu", "31 lei", "Piept de pui, ou, bacon, făină.", "200 g"],
                ["Curcan haiducesc", "101 lei", "Curcan afumat, cartofi boierești, mămăligă și hrean.", "900 g"],
                ["Scalopina", "31 lei", "Piept de pui, sos de lămâie.", "200 g"],
                ["Rulou de pui românesc", "41 lei", "Piept de pui, cârnați semiafumați, jumări, telemea, ou, făină.", "300 g"],
                ["Aripioare crocante", "25 lei", "", "300 g"],
                ["Șnițel brâncovenesc", "31 lei", "Piept de pui, ou, telemea, făină.", "250 g"],
                ["Piept de curcan la grill", "36 lei", "", "200 g"],
                ["Piept de pui la grătar", "27 lei", "", "200 g"],
                ["Piept de pui cu sos gorgonzola", "45 lei", "Piept de pui, gorgonzola, smântână.", "250 g"],
                ["Șnițel cu fulgi de porumb", "29 lei", "Piept de pui, ou, fulgi de porumb, făină.", "200 g"],
                ["Cordon bleu", "33 lei", "Piept de pui, șuncă, cașcaval.", "300 g"],
                ["Pui Shanghai", "31 lei", "Piept de pui, susan, ou, făină.", "200 g"],
                ["Tocană clujeană", "39 lei", "Piept de pui, ciuperci, usturoi, sos tomat, piper, dafin, mămăligă.", "400 g"],
                ["Mâncare țărănească", "43 lei", "Pulpă de pui, bacon, brânză de burduf, ou fiert, ceapă, ciuperci pe grătar.", "450 g"],
                ["Piept de curcan cu smântână și ciuperci", "41 lei", "", "300 g"],
                ["Ficăței de pui în sos de vin", "31 lei", "Ficat de pui, ceapă, vin alb.", "200 g"],
                ["Ciulama de pui cu ciuperci și smântână", "38 lei", "Piept de pui, ciuperci, smântână, mămăligă.", "400 g"],
                ["Crispy strips cu garnitură", "44 lei", "", "350 g"],
                ["Ficăței prăjiți cu mămăliguță și mujdei", "31 lei", "Ficat de pui, usturoi.", "300 g"],
                ["Ciulama de pui cu ardei și ceapă", "38 lei", "Piept de pui, ardei, ceapă, smântână, mămăligă.", "400 g"],
                ["Pulpe dezosate la grătar", "28 lei", "", "300 g"]
            ]
        },
        {
            chapter: "Preparate din porc",
            dishes: [
                ["Ceafă de porc la grătar", "31 lei", "", "200 g"],
                ["Cârnați proaspeți la grătar", "25 lei", "", "200 g"],
                ["Waldostana", "39 lei", "Cotlet, brânză topită, șuncă presată, roșii, ciuperci.", "300 g"],
                ["Escalop Valea Dornelor", "36 lei", "Cotlet, brânză de burduf, mămăligă, usturoi, vin alb, boia dulce de ardei.", "350 g"],
                ["Coaste de porc proaspete la grătar cu cartofi și sos", "76 lei", "", "600 g"],
                ["Șnițel de porc pane", "31 lei", "Cotlet, ou, pesmet.", "200 g"],
                ["Cotlet de porc la grătar", "31 lei", "", "200 g"],
                ["Cârnați semiafumați la grătar", "25 lei", "", "200 g"],
                ["Cotlet cu ciuperci și smântână", "36 lei", "Cotlet, smântână, ciuperci, mămăligă.", "350 g"]
            ]
        },
        {
            chapter: "Preparate din vită și oaie",
            dishes: [
                ["Șnițel de vițel Măgura", "66 lei", "Mușchi de vită, ou, făină.", "200 g"],
                ["Pastramă de oaie", "15 lei", "", "100 g"],
                ["Escalop de vită cu ciuperci și smântână", "76 lei", "Mușchi de vită, ciuperci, smântână, verdeață.", "400 g"],
                ["Mușchi de vită cu sos gorgonzola", "81 lei", "Mușchi de vită, smântână, gorgonzola.", "250 g"],
                ["Mușchi de vită la grătar", "71 lei", "", "200 g"],
                ["Cârnați de oaie", "13 lei", "", "100 g"]
            ]
        },
        {
            chapter: "Pește",
            dishes: [
                ["Păstrăv la grătar", "49 lei", "", "300 g"],
                ["Saramură de crap", "51 lei", "File de crap, saramură, mămăligă.", "300 g"],
                ["Păstrăv prăjit", "49 lei", "", "300 g"],
                ["Doradă la grătar", "58 lei", "", "300 g"],
                ["File de șalău prăjit", "36 lei", "File de șalău, ou, făină, mălai.", "250 g"],
                ["Somon la grătar", "58 lei", "", "300 g"],
                ["File de șalău la grătar", "31 lei", "", "200 g"],
                ["Crap românesc la grătar", "46 lei", "", "300 g"],
                ["File de șalău pane", "36 lei", "File de șalău, ou, pesmet.", "250 g"],
                ["Crap prăjit în ulei", "46 lei", "Crap, ulei, mălai.", ""],
                ["File de șalău în crustă de migdale", "46 lei", "File de șalău, fulgi de migdale, ou.", "300 g"]
            ]
        },
        {
            chapter: "Paste",
            dishes: [
                ["Penne cu ton", "33 lei", "Penne, sos de roșii, ton.", "350 g"],
                ["Penne Arrabbiata", "28 lei", "Penne, sos de roșii, peperoncino.", "300 g"],
                ["Penne al forno cu sos gorgonzola", "41 lei", "", "350 g"],
                ["Penne cu pui", "36 lei", "Penne, piept de pui, ciuperci, usturoi, sos roșu, mozzarella, busuioc.", "350 g"],
                ["Spaghetti Carbonara", "36 lei", "Spaghetti, bacon, ou, smântână, parmezan.", "350 g"],
                ["Spaghetti Bolognese", "36 lei", "Spaghetti, sos bolognez, vin roșu, parmezan.", "350 g"]
            ]
        },
        {
            chapter: "Minuturi",
            dishes: [
                ["Ochiuri cu kaiser", "21 lei", "", "200 g"],
                ["Mămăliguță cu brânză și smântână", "33 lei", "", "350 g"],
                ["Mititei la grătar (5 buc.)", "36 lei", "", "300 g"],
                ["Cașcaval pane", "26 lei", "", "250 g"],
                ["Omletă cu cașcaval", "21 lei", "", "250 g"],
                ["Crochete de cașcaval", "19 lei", "", "150 g"],
                ["Bruschette", "17 lei", "", "200 g"],
                ["Creier de porc la capac", "31 lei", "", "300 g"],
                ["Omletă țărănească", "31 lei", "Ou, kaiser, roșii, ceapă.", "300 g"],
                ["Omletă cu telemea", "21 lei", "", "200 g"],
                ["Costițe afumate la grătar", "29 lei", "", "400 g"]
            ]
        },
        {
            chapter: "Garnituri",
            dishes: [
                ["Cartofi piure", "14 lei", "", "200 g"],
                ["Cartofi pai", "13 lei", "", "200 g"],
                ["Cartofi pai cu cașcaval", "15 lei", "", "250 g"],
                ["Pilaf cu ciuperci", "16 lei", "", "200 g"],
                ["Cartofi pai cu telemea", "15 lei", "", "250 g"],
                ["Legume la grătar", "16 lei", "", "200 g"],
                ["Ciuperci la grătar", "14 lei", "", "150 g"],
                ["Ciuperci sote cu usturoi", "19 lei", "", "150 g"],
                ["Morcovei sote", "13 lei", "", "200 g"],
                ["Broccoli", "13 lei", "", "200 g"],
                ["Cartofi natur", "13 lei", "", "200 g"],
                ["Cartofi wedges", "14 lei", "", "200 g"]
            ]
        },
        {
            chapter: "Salate de însoțire",
            dishes: [
                ["Salată asortată de roșii și castraveți", "13 lei", "", "200 g"],
                ["Salată de crudități", "17 lei", "", "200 g"],
                ["Salată de castraveți murați", "13 lei", "", "250 g"],
                ["Salată de roșii", "11 lei", "", "200 g"],
                ["Salată de ardei copți", "14 lei", "", "200 g"],
                ["Salată de castraveți proaspeți", "11 lei", "", "200 g"],
                ["Salată de varză albă", "13 lei", "", "200 g"],
                ["Salată de sfeclă roșie cu hrean", "15 lei", "", "200 g"],
                ["Salată verde cu lămâie", "14 lei", "", "200 g"]
            ]
        },
        {
            chapter: "Extra",
            dishes: [
                ["Mujdei de usturoi", "3 lei", "", "50 g"],
                ["Hrean", "5 lei", "", "50 g"],
                ["Muștar", "3 lei", "", "50 g"],
                ["Sos de roșii dulce", "4 lei", "", "50 g"],
                ["Ardei iute", "1,50 lei", "", "1 buc."],
                ["Mămăligă", "6 lei", "", "100 g"],
                ["Chiflă", "2 lei", "", "50 g · Popular"],
                ["Sos de roșii picant", "4 lei", "", "50 g"],
                ["Sos de maioneză cu usturoi", "4 lei", "", "50 g"],
                ["Smântână", "4 lei", "", "50 g"],
                ["Ceapă", "3 lei", "", "50 g"],
                ["Maioneză", "3,50 lei", "", "50 g"],
                ["Telemea", "9 lei", "", "100 g"],
                ["Lămâie", "3 lei", "", "50 g"],
                ["Dulceață", "5 lei", "", "70 g"]
            ]
        },
        {
            chapter: "Deserturi",
            dishes: [
                ["Papanași cu dulceață și smântână", "28 lei", "", "250 g"],
                ["Clătite cu dulceață", "19 lei", "", "200 g"],
                ["Cheesecake", "23 lei", "", "150 g"],
                ["Clătite cu ciocolată", "19 lei", "", "200 g"],
                ["Tartă cu mere", "16 lei", "", "150 g"],
                ["Clătite cu brânză la cuptor", "33 lei", "", "250 g"],
                ["Tartă cu vișine", "16 lei", "", "150 g"]
            ]
        },
        { closing: true }
    ];

    /* Stickere decupate (assets/menu/<nume-slug>.webp). Un preparat fără sticker apare doar cu text. */
    const STICKERS = new Set(["supa-de-gaina-cu-taietei-de-casa", "ciorba-de-legume", "ciorba-de-vacuta-cu-taietei-de-casa", "ciorba-de-fasole-cu-afumatura", "ciorba-de-fasole", "ciorba-radauteana", "ciorba-de-cocos", "cotlet-de-berbecut-cu-garnitura", "varza-calita-cu-costita", "varza-calita-cu-carnati-semiafumati", "fasole-cu-costita", "fasole-prajita-cu-carnati-semiafumati", "pui-cu-ciuperci-cu-smantana-si-mamaliguta", "fasole-prajita-de-post", "varza-calita", "tochitura-bacauana", "tochitura-de-pui", "tochitura-moldoveneasca", "colierul-domnitei", "platou-ciobanesc", "zestrea-haiducului", "platou-lenea-cucoanei", "ospat-ciobanesc", "platou-haiducesc", "platou-comoara-dintre-vii", "tigaie-picanta", "corabia-piratilor", "salata-taraneasca", "salata-cu-ton", "salata-de-pui", "salata-miorita", "cuib-de-pasare", "aripioare-cu-smantana-si-mamaliga", "snitel-parizian", "snitel-de-pui-pane", "snitel-vienez", "snitel-de-la-sibiu", "curcan-haiducesc", "scalopina", "rulou-de-pui-romanesc", "aripioare-crocante", "snitel-brancovenesc", "piept-de-curcan-la-grill", "piept-de-pui-la-gratar", "piept-de-pui-cu-sos-gorgonzola", "snitel-cu-fulgi-de-porumb", "cordon-bleu", "pui-shanghai", "tocana-clujeana", "mancare-taraneasca", "piept-de-curcan-cu-smantana-si-ciuperci", "ficatei-de-pui-in-sos-de-vin", "ciulama-de-pui-cu-ciuperci-si-smantana", "crispy-strips-cu-garnitura", "ficatei-prajiti-cu-mamaliguta-si-mujdei", "ciulama-de-pui-cu-ardei-si-ceapa", "pulpe-dezosate-la-gratar", "ceafa-de-porc-la-gratar", "carnati-proaspeti-la-gratar", "waldostana", "escalop-valea-dornelor", "coaste-de-porc-proaspete-la-gratar-cu-cartofi-si-sos", "snitel-de-porc-pane", "cotlet-de-porc-la-gratar", "carnati-semiafumati-la-gratar", "cotlet-cu-ciuperci-si-smantana", "snitel-de-vitel-magura", "pastrama-de-oaie", "escalop-de-vita-cu-ciuperci-si-smantana", "muschi-de-vita-cu-sos-gorgonzola", "muschi-de-vita-la-gratar", "carnati-de-oaie", "pastrav-la-gratar", "saramura-de-crap", "pastrav-prajit", "dorada-la-gratar", "file-de-salau-prajit", "somon-la-gratar", "file-de-salau-la-gratar", "crap-romanesc-la-gratar", "file-de-salau-pane", "crap-prajit-in-ulei", "file-de-salau-in-crusta-de-migdale", "penne-cu-ton", "penne-arrabbiata", "penne-al-forno-cu-sos-gorgonzola", "penne-cu-pui", "spaghetti-carbonara", "spaghetti-bolognese", "ochiuri-cu-kaiser", "mamaliguta-cu-branza-si-smantana", "mititei-la-gratar-5-buc", "cascaval-pane", "omleta-cu-cascaval", "crochete-de-cascaval", "bruschette", "creier-de-porc-la-capac", "omleta-taraneasca", "omleta-cu-telemea", "costite-afumate-la-gratar", "cartofi-piure", "cartofi-pai", "cartofi-pai-cu-cascaval", "pilaf-cu-ciuperci", "cartofi-pai-cu-telemea", "legume-la-gratar", "ciuperci-la-gratar", "ciuperci-sote-cu-usturoi", "morcovei-sote", "broccoli", "cartofi-natur", "cartofi-wedges", "salata-asortata-de-rosii-si-castraveti", "salata-de-cruditati", "salata-de-castraveti-murati", "salata-de-rosii", "salata-de-ardei-copti", "salata-de-castraveti-proaspeti", "salata-de-varza-alba", "salata-de-sfecla-rosie-cu-hrean", "salata-verde-cu-lamaie", "papanasi-cu-dulceata-si-smantana", "clatite-cu-dulceata", "cheesecake", "clatite-cu-ciocolata", "tarta-cu-mere", "clatite-cu-branza-la-cuptor", "tarta-cu-visine"]);
    const slug = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const DURATION = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 520;
    const mobile = () => matchMedia("(max-width: 640px)").matches;

    let pages = [];         // chapters split into real pages (see paginate)
    let pos = 0;            // index of the left page (desktop) or of the page shown (phone)
    let busy = false;
    let wasMobile = mobile();

    chapters.forEach((p) => { if (p.image) new Image().src = p.image; });   // preload: no delay when turning

    const FLOURISH = `<svg class="flourish" viewBox="0 0 320 36" aria-hidden="true"><path d="M6 18 C 46 -4, 84 40, 138 20 C 150 16, 156 18, 160 18 C 164 18, 170 16, 182 20 C 236 40, 274 -4, 314 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M160 10 L166 18 L160 26 L154 18 Z" fill="currentColor"/></svg>`;

    function pageMarkup(page, side, probe) {
        const head = `<header class="page-head"><span>Miorița · Cartea de bucate</span></header>`;

        if (page.filler) {
            return `
      <article class="book-page ${side}-page filler">
        ${head}
        <div class="filler-ornament">${FLOURISH}</div>
      </article>`;
        }

        if (page.closing) {
            return `
      <article class="book-page ${side}-page closing">
        ${head}
        <div class="closing-body">
          <h2 class="closing-title"><span>Cu drag,</span><span>pentru voi</span></h2>
          ${FLOURISH}
          <p class="closing-sub">Gusturi de acasă, amintiri pentru totdeauna.</p>
          <a class="closing-link" href="index.html#contact">Rezervă o masă</a>
        </div>
      </article>`;
        }

        const dishes = page.dishes.map(([name, price, description, meta]) => {
            const id = slug(name);
            const pic = STICKERS.has(id)
                ? (probe ? `<span class="dish-sticker"></span>` : `<img class="dish-sticker" src="assets/menu/${id}.png" alt="" draggable="false" decoding="sync">`)
                : "";
            return `
        <article class="dish">
          <div class="dish-info">
            <h3>${name}</h3>
            ${description ? `<p class="description">${description}</p>` : ""}
            ${meta ? `<p class="meta">${meta}</p>` : ""}
          </div>
          ${pic}
          <span class="price">${price}</span>
        </article>`;
        }).join("");

        const sticker = page.image
            ? `<div class="sticker">${probe ? "" : `<img src="${page.image}" alt="" draggable="false" decoding="sync" onerror="this.parentElement.remove()">`}</div>`
            : "";

        return `
      <article class="book-page ${side}-page${page.image ? "" : " no-sticker"}${page.cont ? " is-cont" : ""}">
        ${head}
        ${page.cont ? "" : `<div class="page-title"><h2>${page.chapter}</h2></div>`}
        ${sticker}
        <div class="dishes">${dishes}</div>
      </article>`;
    }

    /* ---------- Pagination ----------
       Each chapter is poured into pages by measuring a hidden page of the real size.
       - what does not fit continues on the next page (no sticker there)
       - a chapter never shares a page with the previous one
       - a lone dish is never left by itself on the last page */
    const probeBox = document.createElement("div");
    probeBox.className = "probe";
    probeBox.setAttribute("aria-hidden", "true");
    book.appendChild(probeBox);

    function fits(page) {
        probeBox.innerHTML = pageMarkup(page, "left", true);
        const d = probeBox.querySelector(".dishes");
        return d.scrollHeight <= d.clientHeight + 1;
    }

    function paginate() {
        const out = [];
        for (const ch of chapters) {
            if (ch.closing) {
                if (!mobile() && out.length % 2 === 1) out.push({ filler: true });   // keep spreads even
                out.push(ch);
                continue;
            }
            let rest = ch.dishes.slice();
            const chunks = [];
            while (rest.length) {
                let n = rest.length;
                const image = chunks.length === 0 ? ch.image : null;
                while (n > 1 && !fits({ chapter: ch.chapter, image, cont: chunks.length > 0, dishes: rest.slice(0, n) })) n--;
                chunks.push(rest.slice(0, n));
                rest = rest.slice(n);
            }
            const L = chunks.length;
            if (L > 1 && chunks[L - 1].length === 1 && chunks[L - 2].length > 2) {
                chunks[L - 1].unshift(chunks[L - 2].pop());
            }
            chunks.forEach((dishes, i) => out.push({ chapter: ch.chapter, image: i === 0 ? ch.image : null, cont: i > 0, dishes }));
        }
        probeBox.innerHTML = "";
        pages = out;
    }

    const step = () => (mobile() ? 1 : 2);
    const slot = (i, html) => { pagesRoot.children[i].outerHTML = html; };

    function updateEdges() {
        book.toggleAttribute("data-first", pos === 0);
        book.toggleAttribute("data-last", pos >= pages.length - step());
    }

    function render() {
        pagesRoot.innerHTML = mobile()
            ? pageMarkup(pages[pos], "right")
            : pageMarkup(pages[pos], "left") + pageMarkup(pages[pos + 1], "right");
        updateEdges();
    }

    /* The new page is put under the leaf BEFORE it starts turning, so it is
       revealed as the leaf lifts: nothing appears late, nothing is redrawn at the end. */
    function flip(dir) {
        if (busy) return;
        const m = mobile();
        const next = pos + dir * step();
        if (next < 0 || next > pages.length - step()) return;

        busy = true;
        const fwd = dir > 0;

        if (m) {
            front.innerHTML = pageMarkup(pages[pos], "right");
            back.innerHTML = pageMarkup(pages[next], "right");
            pagesRoot.innerHTML = pageMarkup(pages[next], "right");
        } else if (fwd) {
            front.innerHTML = pageMarkup(pages[pos + 1], "right");
            back.innerHTML = pageMarkup(pages[next], "left");
            slot(1, pageMarkup(pages[next + 1], "right"));
        } else {
            front.innerHTML = pageMarkup(pages[pos], "left");
            back.innerHTML = pageMarkup(pages[next + 1], "right");
            slot(0, pageMarkup(pages[next], "left"));
        }

        sheet.classList.toggle("backwards", !fwd);
        sheet.classList.add("is-flipping");

        const anim = sheet.animate(
            [{ transform: "rotateY(0deg)" }, { transform: `rotateY(${fwd ? -180 : 180}deg)` }],
            { duration: DURATION, easing: "cubic-bezier(.5, .05, .25, 1)", fill: "forwards" }
        );

        const done = () => {
            if (!m) {   // the leaf now covers the other half: swap it, invisibly
                if (fwd) slot(0, pageMarkup(pages[next], "left"));
                else slot(1, pageMarkup(pages[next + 1], "right"));
            }
            pos = next;
            sheet.classList.remove("is-flipping", "backwards");
            anim.cancel();
            busy = false;
            updateEdges();
        };
        anim.finished.then(done, done);
    }

    /* Tap a page to turn it; swipe works too. Links keep working. */
    let down = null;

    book.addEventListener("pointerdown", (e) => {
        if (busy || e.button > 0 || e.target.closest("a")) return;
        down = { x: e.clientX, y: e.clientY, id: e.pointerId };
    });
    book.addEventListener("pointerup", (e) => {
        if (!down || e.pointerId !== down.id) return;
        const dx = e.clientX - down.x;
        const dy = e.clientY - down.y;
        down = null;

        if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.15) return flip(dx < 0 ? 1 : -1);
        if (Math.hypot(dx, dy) > 10) return;                       // a scroll, not a tap

        const r = book.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        flip(x < (mobile() ? 0.3 : 0.5) ? -1 : 1);
    });
    book.addEventListener("pointercancel", () => { down = null; });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") flip(1);
        if (e.key === "ArrowLeft") flip(-1);
    });

    /* Page size changes how many dishes fit, so rebuild the pages (and stay on the same chapter) */
    let resizeTimer = 0;
    addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (busy) return;
            const here = pages[pos];
            const key = here && (here.closing ? "closing" : here.filler ? null : here.chapter);
            wasMobile = mobile();
            paginate();
            const at = key ? pages.findIndex((p) => (p.closing ? "closing" : p.chapter) === key) : -1;
            pos = Math.min(at < 0 ? pos : at, pages.length - step());
            if (!wasMobile) pos -= pos % 2;     // desktop always starts on an even page
            render();
        }, 150);
    });

    /* Wait for the fonts, otherwise the measurements would be wrong */
    const fontLoads = [
        '700 24px "Caveat"', '600 24px "Caveat"', '400 40px "Kings"', '400 40px "Great Vibes"'
    ].map((f) => document.fonts.load(f, "ăâîșțĂÂÎȘȚ Aa").catch(() => {}));
    Promise.race([Promise.all(fontLoads), new Promise((r) => setTimeout(r, 2500))]).then(() => {
        paginate();
        render();
    });
})();