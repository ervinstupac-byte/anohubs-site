document.addEventListener("DOMContentLoaded", () => {
    // 1. Detect Location
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const isSubfolder = path.includes("/insights/") ||
        path.includes("/case-studies/") ||
        path.includes("/protocol/");
    const basePath = isSubfolder ? "../" : "";

    // 2. Load Header
    fetch(basePath + "components/header.html")
        .then(response => response.text())
        .then(data => {
            const headerEl = document.getElementById("global-header");
            headerEl.innerHTML = data;

            // A. Fix Navigation Links for Subfolders
            if (isSubfolder) {
                const navLinks = headerEl.querySelectorAll("a");
                navLinks.forEach(link => {
                    const href = link.getAttribute("href");
                    // Don't change external links, anchors, or absolute paths
                    if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto")) {
                        link.setAttribute("href", "../" + href);
                    }
                });
                // Fix Logo Image Source separately
                const logoImg = headerEl.querySelector("img");
                if (logoImg) logoImg.src = "../" + logoImg.getAttribute("src");
            }

            // B. Initialize Icons & Grid Ticker
            if (window.lucide) window.lucide.createIcons();
            if (typeof initGridTicker === "function") initGridTicker();

            // C. Bind Language Switcher (Fixes Issue #1)
            // Looks for buttons with ID 'btn-en' and 'btn-bs'
            const btnEn = document.querySelector("button[data-lang='en']");
            const btnBs = document.querySelector("button[data-lang='bs']");

            if (btnEn && window.changeLanguage) btnEn.addEventListener("click", () => window.changeLanguage('en'));
            if (btnBs && window.changeLanguage) btnBs.addEventListener("click", () => window.changeLanguage('bs'));

            // D. Mobile Menu Logic
            const menuBtn = document.getElementById("mobile-menu-btn");
            const mobileMenu = document.getElementById("mobile-menu");
            const closeLinks = document.querySelectorAll(".mobile-link");

            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener("click", () => {
                    mobileMenu.classList.toggle("translate-x-full");
                    document.body.style.overflow = mobileMenu.classList.contains("translate-x-full") ? "auto" : "hidden";
                });

                closeLinks.forEach(link => {
                    link.addEventListener("click", () => {
                        mobileMenu.classList.add("translate-x-full");
                        document.body.style.overflow = "auto";
                    });
                });
            }

            // E. Highlight Active Link
            const navLinks = document.querySelectorAll("nav a");
            navLinks.forEach(link => {
                if (link.getAttribute("href").includes(page) && page !== "") {
                    link.classList.add("active-link", "text-white");
                    link.classList.remove("text-slate-400");
                }
            });

            // F. Apply Translations (Immediate check)
            if (window.updateContent) window.updateContent();
        });

    // 3. Load Footer
    fetch(basePath + "components/footer.html")
        .then(response => response.text())
        .then(data => {
            const footerEl = document.getElementById("global-footer");
            footerEl.innerHTML = data;

            if (isSubfolder) {
                // Fix footer links similarly
                footerEl.querySelectorAll("a").forEach(link => {
                    const href = link.getAttribute("href");
                    if (href && !href.startsWith("http") && !href.startsWith("#")) {
                        link.setAttribute("href", "../" + href);
                    }
                });
            }

            if (window.lucide) window.lucide.createIcons();
            if (window.updateContent) window.updateContent();
        });

    // 4. Conditional Preloader (Fixes Issue #3)
    // Only run on Index or Protocol main page
    if (page === "index.html" || page === "" || page === "protocol.html") {
        if (typeof runBootSequence === "function") runBootSequence();
    }
});

// 5. Anti-FOUC
window.onload = function () {
    document.documentElement.classList.add('wf-active');
};


// ========================================
// HELPER FUNCTIONS (Preserved)
// ========================================

// Hydro-Specific Boot Sequence
function runBootSequence() {
    // Inject Preloader HTML if missing (since we removed the automatic injection)
    if (!document.getElementById('hydro-loader')) {
        const preloaderHTML = `
            <div id="hydro-loader">
                <div id="boot-sequence"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
    }

    const bootMessages = [
        "INITIALIZING ANOHUB PROTOCOL v35.0...",
        "CHECKING PENSTOCK PRESSURE...",
        "SERVO OIL PUMPS: ONLINE...",
        "GUIDE VANE LOCKS: RELEASED...",
        "TURBINE BEARING TEMP: NOMINAL...",
        "WICKET GATE POSITION: VERIFIED...",
        "SYNCHRONIZING WITH GRID...",
        "FREQUENCY LOCK: 50.00 Hz",
        "VOLTAGE MATCH: CONFIRMED",
        "BREAKER STATUS: READY",
        "ACCESS GRANTED."
    ];

    const bootSequenceContainer = document.getElementById('boot-sequence');
    if (!bootSequenceContainer) return; // Safety check

    let messageIndex = 0;

    const displayNextMessage = () => {
        if (messageIndex < bootMessages.length) {
            const logLine = document.createElement('div');
            logLine.className = 'boot-log';
            logLine.textContent = `> ${bootMessages[messageIndex]}`;
            bootSequenceContainer.appendChild(logLine);
            messageIndex++;
            setTimeout(displayNextMessage, 150);
        } else {
            // Boot complete, fade out after a brief pause
            setTimeout(() => {
                const loader = document.getElementById('hydro-loader');
                if (loader) {
                    loader.classList.add('fade-out');
                    setTimeout(() => loader.remove(), 500);
                }
            }, 400);
        }
    };

    // Start the sequence after a brief delay
    setTimeout(displayNextMessage, 200);
}

// Grid Frequency Ticker (SCADA Easter Egg)
function initGridTicker() {
    const freqElement = document.getElementById("grid-freq");
    if (!freqElement) return;

    // Update frequency every 2 seconds
    setInterval(() => {
        // Generate random frequency between 49.95 and 50.05 Hz
        const frequency = (Math.random() * 0.10) + 49.95;

        // Format to 2 decimal places
        const formattedFreq = frequency.toFixed(2);

        // Update text
        freqElement.textContent = `${formattedFreq} Hz`;

        // Update color based on threshold
        if (frequency < 49.98) {
            // Warning: below nominal
            freqElement.classList.remove("text-h-green");
            freqElement.classList.add("text-h-yellow");
        } else {
            // Nominal: green
            freqElement.classList.remove("text-h-yellow");
            freqElement.classList.add("text-h-green");
        }
    }, 2000); // Every 2 seconds
}
