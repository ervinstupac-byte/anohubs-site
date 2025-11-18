// ==============================================
// CORE UI LOGIC (js/ui_core.js)
// Inicijalizacija Menija, Ikona, Akordiona i Podnožja
// ==============================================

function initLucideIcons() {
    // Osigurava da se Lucide ikone učitaju ispravno
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function initFooterYear() {
    // Postavlja tekuću godinu u podnožju
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

function initMobileMenu() {
    // Rukuje uključivanjem/isključivanjem mobilne navigacije
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('svg');
        
        // Mijenja ikonu menija (menu <-> X)
        if (icon && typeof lucide !== 'undefined') {
            icon.setAttribute('data-lucide', mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
            lucide.createIcons();
        }
    });

    // Zatvaranje menija klikom na link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const menuIcon = mobileMenuButton.querySelector('svg');
            if (menuIcon && typeof lucide !== 'undefined') {
                menuIcon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
}

function initAccordions() {
    // Rukuje interaktivnom funkcionalnošću Harmonike (za podstranice)
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('svg');

            // Zatvara sve ostale otvorene harmonike
            document.querySelectorAll('.accordion-content.is-open').forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.classList.remove('is-open');
                    otherContent.style.maxHeight = null;
                    const otherIcon = otherContent.previousElementSibling?.querySelector('svg');
                    if (otherIcon) {
                        otherIcon.classList.remove('rotate-180');
                    }
                }
            });

            // Uključuje/isključuje trenutno stanje harmonike
            content.classList.toggle('is-open');
            icon?.classList.toggle('rotate-180');

            if (content.classList.contains('is-open')) {
                // Koristi scrollHeight za dinamičko dimenzioniranje sadržaja tokom tranzicije
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
}

// Glavna funkcija za pokretanje CORE UI inicijalizacije
document.addEventListener('DOMContentLoaded', () => {
    initLucideIcons();
    initFooterYear();
    initMobileMenu();
    initAccordions();
});

// NAPOMENA: initCounters() i initScrollAnimations() su premješteni u js/animation_logic.js