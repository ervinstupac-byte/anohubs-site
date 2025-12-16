// ========================================
// ANOHUBS SITE LAYOUT LOADER
// Dynamic Header/Footer + Preloader System
// ========================================

// STEP 1: Inject Preloader HTML immediately
(function injectPreloader() {
    const preloaderHTML = `
        <div id="site-preloader">
            <div class="preloader-grid"></div>
            <div class="preloader-logo">
                <div class="preloader-ring"></div>
                <div class="preloader-ring"></div>
                <div class="preloader-ring"></div>
                <div class="preloader-icon"></div>
            </div>
            <div class="preloader-bar-container">
                <div class="preloader-bar"></div>
            </div>
            <div class="preloader-text">Initializing System</div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
})();

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

        // STEP 3: Wait 500ms for visual smoothness, then remove preloader
        await new Promise(resolve => setTimeout(resolve, 500));
        removePreloader();

    } catch (error) {
        console.error("Error loading components:", error);
        // Remove preloader even on error to prevent infinite loading
        removePreloader();
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
            link.classList.add("text-white");
            link.classList.remove("text-slate-400");
        }
    });
}

// Preloader Removal
function removePreloader() {
    const preloader = document.getElementById("site-preloader");
    if (preloader) {
        preloader.classList.add("fade-out");
        // Remove from DOM after fade animation completes
        setTimeout(() => {
            preloader.remove();
        }, 500); // Matches CSS transition duration
    }
}
