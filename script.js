/* Miorița — small enhancements. Anchor links work without this file. */
(() => {
    "use strict";

    const GALLERY_COUNT = 20; // gallery1.jpg … gallery20.jpg in assets/gallery/

    /* 1. Title: scrolls up with the page, shrinking, until it docks in the header.
          The header is transparent and never changes size; only its text tone
          (cream or ink) follows the section behind it (data-nav="dark" | "light"). */
    const brand = document.getElementById("brand");
    const heroSlot = document.getElementById("hero-slot");
    const navSlot = document.getElementById("nav-slot");
    const navList = document.getElementById("nav-list");
    const toned = [...document.querySelectorAll("[data-nav]")];

    const isLightBehind = (el) => {
        const r = el.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        const hit = toned.find((t) => {
            const b = t.getBoundingClientRect();
            return b.left <= x && x < b.right && b.top <= y && y < b.bottom;
        });
        return hit?.dataset.nav === "light";
    };

    let sx, sy, ex, dist, scale;

    const update = () => {
        const p = Math.min(Math.max(scrollY / dist, 0), 1);
        brand.style.transform =
            `translate(${sx + (ex - sx) * p}px, ${sy - dist * p}px) scale(${1 + (scale - 1) * p})`;
        brand.classList.add("is-ready");
        brand.classList.toggle("is-ink", isLightBehind(navSlot));
        navList.classList.toggle("is-ink", isLightBehind(navList));
    };

    const measure = () => {
        const a = heroSlot.getBoundingClientRect(); // in the hero (scrolls with the page)
        const b = navSlot.getBoundingClientRect();  // in the fixed header
        sx = a.left;
        sy = a.top + scrollY;
        ex = b.left;
        scale = b.width / a.width;
        dist = Math.max(sy - b.top, 1);
        brand.style.width = `${a.width}px`;
        update();
    };

    let ticking = false;
    addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { update(); ticking = false; });
    }, { passive: true });
    addEventListener("resize", measure);
    addEventListener("load", measure);
    document.fonts.ready.then(measure);
    measure();

    /* 2. Highlight the nav link of the section currently in view. */
    const links = new Map(
        [...document.querySelectorAll(".nav__list a")].map((a) => [a.hash.slice(1), a])
    );
    const spy = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                const link = links.get(entry.target.id);
                if (!link) continue;
                if (entry.isIntersecting) link.setAttribute("aria-current", "true");
                else link.removeAttribute("aria-current");
            }
        },
        { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

    /* 3. Gallery: deal the photos out to the three rows (1, 2, 3, 1, 2, 3, …). */
    const rows = document.querySelectorAll(".film__row");

    for (let n = 1; n <= GALLERY_COUNT; n++) {
        const img = new Image();
        img.src = `assets/gallery/gallery${n}.jpg`;
        img.alt = `Fotografie ${n} din galeria Miorița`;
        img.loading = "lazy";
        img.decoding = "async";
        img.draggable = false;

        const li = document.createElement("li");
        li.className = "film__item";
        li.append(img);
        rows[(n - 1) % rows.length].append(li);

        img.addEventListener("error", () => li.remove());
    }

    /* Click-and-drag scrolling with the mouse (touch/trackpad/keys work natively). */
    document.querySelectorAll(".film__scroller").forEach((scroller) => {
        let startX = 0;
        let startLeft = 0;
        let dragging = false;

        scroller.addEventListener("pointerdown", (e) => {
            if (e.pointerType !== "mouse" || e.button !== 0) return;
            dragging = true;
            startX = e.clientX;
            startLeft = scroller.scrollLeft;
            scroller.classList.add("is-dragging");
            scroller.setPointerCapture(e.pointerId);
        });
        scroller.addEventListener("pointermove", (e) => {
            if (dragging) scroller.scrollLeft = startLeft - (e.clientX - startX);
        });
        const stop = () => {
            dragging = false;
            scroller.classList.remove("is-dragging");
        };
        scroller.addEventListener("pointerup", stop);
        scroller.addEventListener("pointercancel", stop);
    });

    /* 4. Menu book: half a second after it is on screen, it tilts into place. */
    const book = document.querySelector(".book");
    if (book) {
        document.documentElement.classList.add("js-anim");
        let timer;
        new IntersectionObserver(
            ([entry]) => {
                clearTimeout(timer);
                if (entry.isIntersecting) timer = setTimeout(() => book.classList.add("is-in"), 500);
                else book.classList.remove("is-in");
            },
            { threshold: 0.6 }
        ).observe(book);
    }
})();