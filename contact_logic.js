// contact_logic.js
// FUNKCIJE ZA RUKOVANJE KONTAKT FORMOM (Slanje upita na Formspree i prikaz statusa)

/**
 * Rukovodi slanjem kontakt forme asinhrono.
 * @param {Event} event - Događaj submitovanja forme.
 */
async function handleContactFormSubmit(event) {
    // Spriječava standardno osvježavanje stranice
    event.preventDefault();
    
    const form = event.target;
    const data = new FormData(form);
    
    // Ključni elementi forme za povratnu informaciju
    const submitButton = form.querySelector('button[type="submit"]');
    const messageElement = document.getElementById('formMessage');

    // === Postavljanje stanja "Slanje" ===
    submitButton.disabled = true;
    submitButton.textContent = '⏳ Submitting... Please wait.'; 
    messageElement.textContent = 'Sending request...';
    // Uklanjanje klasa za skrivanje i boju greške/uspeha
    // Pretpostavljamo da su klase definirane u globalnom CSS-u/Tailwind configu
    messageElement.classList.remove('hidden', 'text-hydro-secondary', 'text-hydro-risk');
    // Postavljanje privremene boje (CTA boja)
    messageElement.classList.add('text-hydro-cta');

    try {
        // Asinhrono slanje podataka
        const response = await fetch(form.action, { 
            method: "POST",
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // === USPEH ===
            messageElement.textContent = '✅ Request Sent! Thank you. Expect our engineer response within 24 hours.'; 
            messageElement.classList.remove('text-hydro-cta');
            messageElement.classList.add('text-hydro-secondary'); // Zelena boja za uspeh
            form.reset();
        } else {
            // === NEUSPEH ===
            const errorData = await response.json();
            const errorMessage = errorData?.errors?.map(err => err.message).join(', ') || 'An unknown error occurred during submission.';
            throw new Error(errorMessage);
        }
    } catch (error) {
        // === RUKOVANJE GREŠKOM ===
        const errorMessage = error instanceof Error ? error.message : 'An error occurred.';
        messageElement.textContent = `❌ Error: ${errorMessage}. Please try again.`;
        messageElement.classList.remove('text-hydro-cta');
        messageElement.classList.add('text-hydro-risk'); // Crvena boja za grešku
    } finally {
        // === VRAĆANJE DUGMETA U INICIJALNO STANJE ===
        submitButton.disabled = false;
        submitButton.textContent = 'Send Inquiry';
        
        // Automatsko sakrivanje poruke nakon 7 sekundi
        setTimeout(() => {
            messageElement.classList.add('hidden');
        }, 7000);
    }
}

/**
 * Inicijalizuje kontakt formu, povezujući submit event sa handler funkcijom.
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Povezivanje forme sa asinhronom funkcijom za rukovanje
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// KRITIČNA INICIJALIZACIJA: Poziva funkciju tek kada je cijeli HTML dokument učitan
document.addEventListener('DOMContentLoaded', initContactForm);