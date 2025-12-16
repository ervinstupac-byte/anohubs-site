document.addEventListener("DOMContentLoaded", () => {
    const isSubfolder = window.location.pathname.includes("/insights/") ||
        window.location.pathname.includes("/case-studies/") ||
        window.location.pathname.includes("/protocol/");

    const basePath = isSubfolder ? "../" : "";

    // 1. Load Header
    fetch(basePath + "components/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("global-header").innerHTML = data;

            // A. Re-init Icons
            if (window.lucide) window.lucide.createIcons();

            // B. Mobile Menu Logic (Attached AFTER DOM injection)
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

            // C. Active State Logic
            const currentPath = window.location.pathname.split("/").pop() || "index.html";
            const navLinks = document.querySelectorAll("nav a");
            navLinks.forEach(link => {
                if (link.getAttribute("href").includes(currentPath)) {
                    link.classList.add("text-white");
                    link.classList.remove("text-slate-400");
                }
            });
        });

    // 2. Load Footer
    fetch(basePath + "components/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("global-footer").innerHTML = data;
            if (window.lucide) window.lucide.createIcons();
        });
});
