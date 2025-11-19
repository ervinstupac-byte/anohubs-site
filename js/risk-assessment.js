// ==============================================
// QUICK RISK ASSESSMENT LOGIC (js/risk-assessment.js)
// Lagani interaktivni alat za procjenu rizika.
// ==============================================

const RISK_LEVELS = { LOW: 0, MODERATE: 5, HIGH: 10 };
let currentScore = 0;

/**
 * Obrada odgovora korisnika.
 * @param {number} questionId - Broj trenutnog pitanja.
 * @param {string} riskType - 'low', 'moderate', ili 'high'.
 */
function handleAnswer(questionId, riskType) {
    // 1. Dodaj bodove
    if (riskType === 'high') currentScore += RISK_LEVELS.HIGH;
    else if (riskType === 'moderate') currentScore += RISK_LEVELS.MODERATE;
    else currentScore += RISK_LEVELS.LOW;

    // 2. Sakrij trenutno pitanje
    const currentDiv = document.getElementById(`question-${questionId}`);
    if (currentDiv) {
        currentDiv.style.display = 'none';
    }

    // 3. Prikaži sljedeće pitanje ILI rezultate
    const nextQuestionId = questionId + 1;
    const nextDiv = document.getElementById(`question-${nextQuestionId}`);

    if (nextDiv) {
        // Prikaži sljedeće pitanje s malim fade-in efektom (opcionalno preko CSS-a, ovdje samo display)
        nextDiv.style.display = 'block';
    } else {
        // Nema više pitanja, prikaži rezultat
        showResults();
    }
}

/**
 * Izračunava i prikazuje finalni rezultat.
 */
function showResults() {
    const resultDiv = document.getElementById('assessment-results');
    let title, message, colorClass;

    // Logika rezultata
    if (currentScore >= 15) {
        title = "CRITICAL RISK DETECTED";
        message = "Your operational profile suggests a high probability of hidden dynamic failure (48% Risk). Immediate diagnostic intervention is recommended.";
        colorClass = "text-hydro-risk"; // Crvena
    } else if (currentScore >= 5) {
        title = "MODERATE RISK PROFILE";
        message = "While stable, your system shows signs of efficiency gaps. Optimization could yield significant ROI.";
        colorClass = "text-hydro-cta"; // Žuta/Narandžasta
    } else {
        title = "EXCELLENT INTEGRITY";
        message = "Your maintenance culture is strong. We recommend establishing a Digital Twin to maintain this standard.";
        colorClass = "text-hydro-secondary"; // Zelena
    }

    // Ubacivanje HTML-a u rezultat
    resultDiv.innerHTML = `
        <div class="text-center fade-in-up">
            <h3 class="text-3xl font-black ${colorClass} mb-4">${title}</h3>
            <p class="text-lg text-slate-300 mb-8">${message}</p>
            <a href="contact.html" class="inline-block bg-white text-hydro-charcoal font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition transform">
                Discuss Results with an Expert
            </a>
        </div>
    `;
    
    resultDiv.style.display = 'block';
}

// Inicijalizacija dugmeta "Start"
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('assessment-start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            document.getElementById('assessment-start').style.display = 'none';
            document.getElementById('question-1').style.display = 'block';
        });
    }
});