// FUNKCIJE ZA RUKOVANJE KONTAKT FORMOM
// CILJ: Slanje podataka na Formspree i prikaz statusa
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const data = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const messageElement = document.getElementById('formMessage');

    // === VALIDACIJA (Potencijalni dodatak za numeričke inpute, trenutno samo standardna provjera) ===
    // Ako bi postojala polja za H_rated (Pad) i Q_rated (Protok)
    /*
    const hRated = form.elements['H_rated']?.value;
    const qRated = form.elements['Q_rated']?.value;
    if (hRated && (isNaN(hRated) || parseFloat(hRated) <= 0)) {
        messageElement.textContent = '❌ Error: Rated Head (H_rated) must be a positive number.';
        messageElement.className = 'mt-4 text-center text-sm text-red-600';
        return; 
    }
    */
    // === KRAJ VALIDACIJE ===

    submitButton.disabled = true;
    submitButton.textContent = '⏳ Submitting... Please wait.'; 
    messageElement.textContent = 'Sending request...';
    messageElement.classList.remove('hidden', 'text-green-400', 'text-red-600');
    messageElement.classList.add('text-yellow-400');

    try {
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
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Povezivanje forme sa funkcijom za rukovanje
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

// Potrebna globalna inicijalizacija (poziva se iz DOMContentLoaded u ui_init.js)
if (typeof initContactForm !== 'undefined') {
    // Nista ne radimo ovdje, funkcija će biti pozvana iz ui_init.js
}