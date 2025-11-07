document.addEventListener('DOMContentLoaded', () => {
    // Initialization of all dynamic functionalities
    initLucideIcons();
    initFooterYear();
    initMobileMenu();
    initAccordions();
    initCounters(); 
    initScrollAnimations();
    initContactForm(); 
});

function initLucideIcons() {
    // Ensures Lucide icons load correctly
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function initFooterYear() {
    // Sets the current year in the footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

function initMobileMenu() {
    // Handles toggling the mobile navigation menu
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

    // Closing menu by clicking a link
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
    // Handles the interactive Accordion functionality (Protocol/Safety sections)
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
                // Use scrollHeight for dynamic content sizing during transition
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
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

function initContactForm() {
    // Handles form submission (simulated in client-side to simplify deployment)
    const contactForm = document.getElementById('contactForm');
    const messageElement = document.getElementById('formMessage');

    if (contactForm && messageElement) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const form = event.target;
            const data = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');

            submitButton.disabled = true;
            submitButton.textContent = '⏳ Submitting... Please wait.'; 
            messageElement.textContent = 'Sending request...';
            messageElement.classList.remove('hidden', 'text-green-400', 'text-red-600');
            messageElement.classList.add('text-yellow-400');

            try {
                // Using Formspree endpoint (This requires the action URL in HTML to be correct)
                const response = await fetch("https://formspree.io/f/xqaywlaq", { 
                    method: "POST",
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    messageElement.textContent = '✅ Request Sent! Thank you. Expect our engineer response within 24 hours.'; 
                    messageElement.classList.remove('text-yellow-400');
                    messageElement.classList.add('text-green-400');
                    form.reset();
                } else {
                    const errorData = await response.json();
                    const errorMessage = errorData?.errors?.map(err => err.message).join(', ') || 'An unknown error occurred during submission.';
                    throw new Error(errorMessage);
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An error occurred.';
                messageElement.textContent = `❌ Error: ${errorMessage}. Please try again.`;
                messageElement.classList.remove('text-yellow-400');
                messageElement.classList.add('text-red-600');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Request Assessment →';
                setTimeout(() => {
                    messageElement.classList.add('hidden');
                }, 7000);
            }
        });
    }
}