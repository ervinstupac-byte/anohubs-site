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

            // C. Smart Header Logic
            if (typeof initSmartHeader === "function") initSmartHeader();

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
// Grid Frequency Ticker (Supabase Connected)
async function initGridTicker() {
    // 1. Find elements (Heuristic as requested via User)
    const allDivs = document.querySelectorAll('div');
    let freqEl = null;

    // Heuristic search for the 50.xx Hz element or ID 'grid-freq'
    // First try ID if exists (from previous code)
    freqEl = document.getElementById("grid-freq");

    // If not found by ID (legacy header might not have it), search by text
    if (!freqEl) {
        for (let div of allDivs) {
            if (div.innerText && div.innerText.includes('Hz')) {
                freqEl = div;
                break;
            }
        }
    }

    if (!freqEl) return;

    // 2. Import Client (Dynamic Import for safety in non-module scripts)
    // Note: This relies on modern browser support for dynamic imports
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');

    const sbUrl = 'https://nehxtecejxklqknscbgf.supabase.co';
    const sbKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laHh0ZWNlanhrbHFrbnNjYmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MjA4NTksImV4cCI6MjA4MTE5Njg1OX0.AWWPN9ocAhjBTMtOgQ29ey3y4KcEXQLvfB98Z998n7A';
    const supabase = createClient(sbUrl, sbKey);

    // 3. Update Function
    const updateFreq = async () => {
        const { data, error } = await supabase
            .from('system_status')
            .select('*')
            .eq('id', 'main_grid')
            .single();

        if (data && !error) {
            const freqVal = parseFloat(data.frequency).toFixed(2);
            freqEl.innerText = `${freqVal} Hz`;

            // Color Logic
            freqEl.classList.remove('text-h-cyan', 'text-h-red', 'text-h-gold', 'text-h-green', 'text-h-yellow');
            if (freqVal >= 49.98 && freqVal <= 50.02) {
                freqEl.classList.add('text-h-green'); // Nominal (Green per user request logic or similar to header design)
            } else if (freqVal >= 49.95 && freqVal <= 50.05) {
                freqEl.classList.add('text-h-cyan'); // Acceptable
            } else {
                freqEl.classList.add('text-h-red', 'animate-pulse'); // Unstable
            }
        }
    };

    // Initial Fetch
    updateFreq();

    // Subscribe to Realtime changes
    supabase
        .channel('grid_updates')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'system_status' }, payload => {
            if (payload.new.id === 'main_grid') {
                const newFreq = parseFloat(payload.new.frequency).toFixed(2);
                freqEl.innerText = `${newFreq} Hz`;

                // Re-apply color logic
                freqEl.classList.remove('text-h-cyan', 'text-h-red', 'text-h-gold', 'text-h-green', 'text-h-yellow');
                if (newFreq >= 49.98 && newFreq <= 50.02) {
                    freqEl.classList.add('text-h-cyan'); // Using user's requested color logic for "Stable"
                } else {
                    freqEl.classList.add('text-h-red', 'animate-pulse');
                }
            }
        })
        .subscribe();
}

// function to handle the Smart Header behavior
function initSmartHeader() {
    const header = document.getElementById('global-header');
    if (!header) return;

    // Ensure transition properties are active (using Tailwind utility classes for the transition itself is fine)
    header.classList.add('transition-transform', 'duration-500', 'ease-in-out');
    // Ensure it has a z-index and fixed or sticky positioning (usually handled in CSS/HTML, but let's be safe)
    header.classList.add('z-50');

    let closeTimer;
    let lastScrollY = window.scrollY;

    // Helper functions - Using inline styles for guaranteed behavior
    const hideHeader = () => {
        header.style.transform = 'translateY(calc(-100% + 4px))'; // Pull up, leave 4px visible
    };
    const showHeader = () => {
        header.style.transform = 'translateY(0)';
    };

    // 1. Initial Timer: Hide after 3 seconds
    setTimeout(() => {
        if (!header.matches(':hover')) {
            hideHeader();
        }
    }, 3000);

    // 2. Mouse Interaction
    header.addEventListener('mouseenter', () => {
        clearTimeout(closeTimer);
        showHeader();
    });

    header.addEventListener('mouseleave', () => {
        closeTimer = setTimeout(() => {
            hideHeader();
        }, 3000);
    });

    // 3. Scroll Interaction
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Scroll Up -> Show
        if (currentScrollY < lastScrollY && currentScrollY > 0) {
            clearTimeout(closeTimer);
            showHeader();
        }
        // Scroll Down -> Hide
        else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            hideHeader();
        }

        lastScrollY = currentScrollY;
    });

    // 4. Touch
    header.addEventListener('touchstart', () => {
        clearTimeout(closeTimer);
        showHeader();
    });
}
