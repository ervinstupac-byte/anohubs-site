// ========================================
// ANOHUBS SITE LAYOUT LOADER
// Dynamic Header/Footer + Preloader System
// ========================================

// STEP 1: Inject Hydro Boot Sequence Preloader
(function injectPreloader() {
    const preloaderHTML = `
        <div id="hydro-loader">
            <div id="boot-sequence"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
    runBootSequence();
})();

// Hydro-Specific Boot Sequence
function runBootSequence() {
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

// STEP 2: Load Components on DOM Ready
document.addEventListener("DOMContentLoaded", async () => {
    const isSubfolder = window.location.pathname.includes("/insights/") ||
        window.location.pathname.includes("/case-studies/") ||
        window.location.pathname.includes("/protocol/");

    const basePath = isSubfolder ? "../" : "";

    try {
        // Fetch Header and Footer in parallel
        const [headerResponse, footerResponse] = await Promise.all([
            fetch(basePath + "components/header.html"),
            fetch(basePath + "components/footer.html")
        ]);

        const [headerData, footerData] = await Promise.all([
            headerResponse.text(),
            footerResponse.text()
        ]);

        // Inject Header
        document.getElementById("global-header").innerHTML = headerData;

        // Inject Footer
        document.getElementById("global-footer").innerHTML = footerData;

        // Re-initialize Lucide icons for both header and footer
        if (window.lucide) window.lucide.createIcons();

        // Initialize Mobile Menu (after header is injected)
        initializeMobileMenu();

        // Highlight Active Navigation Link
        highlightActiveLink();

        // Initialize Grid Frequency Ticker (SCADA Easter Egg)
        initGridTicker();

        // Apply translations after components are loaded
        if (typeof window.updateContent === 'function') {
            window.updateContent();
        }

    } catch (error) {
        console.error("Error loading components:", error);
        // Remove boot loader even on error to prevent infinite loading
        const loader = document.getElementById('hydro-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 500);
        }
    }
});

// Mobile Menu Toggle Logic
function initializeMobileMenu() {
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
}

// Active Link Highlighting
function highlightActiveLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href && href.includes(currentPath)) {
            link.classList.add("active-link", "text-white");
            link.classList.remove("text-slate-400");
        }
    });
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

// === ANTI-FOUC: Fade in page when fully loaded ===
window.onload = function () {
    document.documentElement.classList.add('wf-active');
};
