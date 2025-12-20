// ==============================================
// ANIMATION LOGIC (js/animation_logic.js)
// Logika za Countere, Efekte Skrolanja (IntersectionObserver), i Parallax.
// ==============================================

function initProtocolParallax() {
    // Parallax efekt za hero sekciju na protocol.html
    const heroSection = document.getElementById('hero-protocol');
    if (heroSection) {
        // Postavlja se na scroll-event (samo za ovu stranicu)
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            // 30% brzine skrola (za blagi parallax)
            heroSection.style.backgroundPositionY = -scrollPosition * 0.3 + 'px'; 
        });
    }
}

function initCounters() {
    // Logic for animating the metrics (e.g., 98.5% Availability Factor)
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
                // Use EN formatting for large numbers (e.g., 1,500)
                displayValue = Math.round(current).toLocaleString('en-US');
            } else {
                // Use comma for decimals 
                displayValue = displayValue.replace('.', ',');
            }

            targetElement.textContent = displayValue;
        }, stepTime);
    };

    // Observer to detect when counters enter the viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                countUp(entry.target);
                entry.target.classList.add('counted');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Apply observer to all counter elements
    document.querySelectorAll('#counter-group .counter-number').forEach(counter => {
        observer.observe(counter);
    });
}

function initScrollAnimations() {
    // Logic for fade-in and zoom-in effects on scroll
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

// Glavna funkcija za pokretanje ANIMACIJA
document.addEventListener('DOMContentLoaded', () => {
    initCounters(); 
    initScrollAnimations();
    initProtocolParallax(); // Poziva Parallax logiku
});