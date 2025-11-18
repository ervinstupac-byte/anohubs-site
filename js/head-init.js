// ==============================================
// HEAD INITIALIZATION LOGIC (js/head-init.js)
// Odgovoran za dinamičko postavljanje Favicona i Cache Bustera
// ==============================================

/**
 * Dinamički kreira i dodaje <link> tagove za favicone
 * i koristi cache buster (?v=timestamp) kako bi se osiguralo 
 * da korisnici uvijek vide najnovije ikone.
 */
function initFavicons() {
    // === FAVICON & CACHE BUSTER LOGIC ===
    const cacheBuster = "?v=" + new Date().getTime();
    const rootPath = "/"; // Koristite relativnu putanju

    const faviconLinks = [
        { rel: "shortcut icon", href: rootPath + "favicon.ico", type: "image/x-icon" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: rootPath + "favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: rootPath + "favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: rootPath + "apple-touch-icon.png" }
    ];

    faviconLinks.forEach(link => {
        const el = document.createElement("link");
        el.rel = link.rel;
        el.href = link.href + cacheBuster;
        if (link.type) el.type = link.type;
        if (link.sizes) el.sizes = link.sizes;
        document.head.appendChild(el);
    });

    // Favicon Aplikacije (za tab) - APSOLUTNA PUTANJA (GitHub Pages)
    // Ostavljamo apsolutnu putanju kako je bilo i u originalnom kodu.
    const anohubFavicon = document.createElement("link");
    anohubFavicon.rel = "icon";
    anohubFavicon.type = "image/png";
    anohubFavicon.sizes = "32x32";
    anohubFavicon.href = "https://ervinstupac-byte.github.io/anohubsapp/favicon-32x32.png";
    document.head.appendChild(anohubFavicon);
}

// Pozivamo funkciju odmah nakon definisanja, jer je ovo logika za HEAD.
// Ne čekamo DOMContentLoaded.
initFavicons();