// FUNKCIJE ZA INICIJALIZACIJU I ANIMACIJU
// CILJ: Pokretanje svih vizualnih elemenata i animacija
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        // Postavljanje tekuće godine
        yearEl.textContent = new Date().getFullYear();
    }
}

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('svg');
        
        // Toggles menu icon (menu <-> X)
        if (icon && typeof lucide !== 'undefined') {
            icon.setAttribute('data-lucide', mobileMenu.classList.contains('hidden') ? 'x' : 'menu');
            lucide.createIcons();
        }
    });

    // Zatvaranje menija klikom na link (navigacija)
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
    // Logika za otvaranje/zatvaranje Akordeona (Protocol/Safety sekcije)
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('svg');

            // Close other open accordions
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

            // Toggle current accordion state
            content.classList.toggle('is-open');
            icon?.classList.toggle('rotate-180');

            if (content.classList.contains('is-open')) {
                // Postavljanje visine na osnovu sadržaja za tranziciju
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
}

function initCounters() {
    // Logika za dinamičku animaciju brojača (Metrics)
    const countUp = (targetElement) => {
        const end = parseFloat(targetElement.getAttribute('data-target'));
        const decimals = parseInt(targetElement.getAttribute('data-decimal')) || 0;
        const isBigNumber = end > 1000 && decimals === 0;
        
        let current = 0;
        const duration = 2500;
        const stepTime = 10;
        const steps = Math.ceil(duration / stepTime);
        const stepValue = (end - current) / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            current += stepValue;
            currentStep++;

            if (currentStep >= steps) {
                current = end;
                clearInterval(timer);
            }

            let displayValue = current.toFixed(decimals);
            
            if (isBigNumber) {
                displayValue = Math.round(current).toLocaleString('en-US');
            } else {
                displayValue = displayValue.replace('.', ',');
            }

            targetElement.textContent = displayValue;
        }, stepTime);
    };

    // Intersection Observer za pokretanje brojača
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                countUp(entry.target);
                entry.target.classList.add('counted');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('#counter-group .counter-number').forEach(counter => {
        observer.observe(counter);
    });
}

function initScrollAnimations() {
    // Intersection Observer za fade-in i zoom-in efekte
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .zoom-in').forEach(el => {
        observer.observe(el);
    });
}

// Glavna funkcija za pokretanje UI inicijalizacije
document.addEventListener('DOMContentLoaded', () => {
    initLucideIcons();
    initFooterYear();
    initMobileMenu();
    initAccordions();
    initCounters(); 
    initScrollAnimations();
});