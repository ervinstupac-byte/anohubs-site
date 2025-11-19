// ==============================================
// QUICK RISK ASSESSMENT LOGIC (js/risk-assessment.js)
// Popravljena logika za bodovanje i prikaz
// ==============================================

const RISK_LEVELS = { LOW: 0, MODERATE: 5, HIGH: 10 };
let currentScore = 0;

/**
 * Obrada odgovora korisnika.
 * Mapira specifične odgovore iz HTML-a u nivoe rizika.
 */
function handleAnswer(questionId, answerValue) {
    // 1. Logika bodovanja prema odgovorima iz HTML-a
    let riskPoints = RISK_LEVELS.LOW; // Default je nizak rizik

    // Visok rizik odgovori
    if (answerValue === 'no' || answerValue === 'none') {
        riskPoints = RISK_LEVELS.HIGH;
    }
    // Umjeren rizik odgovori
    else if (answerValue === 'always' || answerValue === 'basic' || answerValue === 'moderate') {
        riskPoints = RISK_LEVELS.MODERATE;
    }
    // Nizak rizik odgovori ('yes', 'scheduled', 'full') ostaju 0

    currentScore += riskPoints;

    // 2. Sakrij trenutno pitanje
    const currentDiv = document.getElementById(`question-${questionId}`);
    if (currentDiv) {
        currentDiv.style.display = 'none';
    }

    // 3. Prikaži sljedeće pitanje ILI rezultate
    const nextQuestionId = questionId + 1;
    const nextDiv = document.getElementById(`question-${nextQuestionId}`);

    if (nextDiv) {
        nextDiv.style.display = 'block';
        // Dodajemo malu animaciju pojave za sljedeće pitanje
        nextDiv.classList.add('fade-in-up', 'is-visible'); 
    } else {
        showResults();
    }
}

/**
 * Izračunava i prikazuje finalni rezultat.
 */
function showResults() {
    const resultDiv = document.getElementById('assessment-results');
    if (!resultDiv) return;

    let title, message, colorClass;

    // Logika rezultata (Maksimalni bodovi su 30)
    if (currentScore >= 15) {
        title = "CRITICAL RISK DETECTED";
        message = "Your operational profile suggests a high probability of hidden dynamic failure (48% Risk). Immediate diagnostic intervention is recommended to prevent unplanned downtime.";
        colorClass = "text-hydro-risk"; // Crvena
    } else if (currentScore >= 5) {
        title = "MODERATE RISK PROFILE";
        message = "While stable, your system shows signs of efficiency gaps. A targeted M-E Synergy Audit could yield significant ROI and extend component life.";
        colorClass = "text-hydro-cta"; // Žuta/Narandžasta
    } else {
        title = "EXCELLENT INTEGRITY";
        message = "Your maintenance culture is strong. We recommend establishing a Digital Twin to maintain this standard and optimize LCC further.";
        colorClass = "text-hydro-secondary"; // Zelena
    }

    // Ubacivanje HTML-a u rezultat
    // KRITIČNO: Dodana klasa 'is-visible' odmah, da se sadržaj vidi!
    resultDiv.innerHTML = `
        <div class="text-center fade-in-up is-visible" style="animation-fill-mode: forwards;">
            <div class="mb-6">
                <h3 class="text-3xl font-black ${colorClass} mb-2">${title}</h3>
                <p class="text-sm text-slate-400 uppercase tracking-widest">Risk Score Analysis Complete</p>
            </div>
            
            <div class="bg-hydro-charcoal/50 p-6 rounded-lg border border-slate-600 mb-8">
                <p class="text-lg text-slate-200 leading-relaxed">${message}</p>
            </div>

            <a href="contact.html" class="inline-flex items-center justify-center px-8 py-4 bg-white text-hydro-charcoal font-bold rounded-full shadow-xl hover:bg-hydro-primary hover:text-white transition transform hover:scale-105">
                Discuss Results with an Expert &rarr;
            </a>
            <p class="mt-4 text-xs text-slate-500">Confidential & Free Initial Consultation</p>
        </div>
    `;
    
    resultDiv.style.display = 'block';
}

// Inicijalizacija dugmeta "Start"
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('assessment-start-btn');
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            const startScreen = document.getElementById('assessment-start');
            const q1 = document.getElementById('question-1');
            
            if (startScreen) startScreen.style.display = 'none';
            if (q1) {
                q1.style.display = 'block';
                q1.classList.add('fade-in-up', 'is-visible');
            }
        });
    }
});