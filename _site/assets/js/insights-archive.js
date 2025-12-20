// ==============================================
// INSIGHTS ARCHIVE LOGIC (js/insights-archive.js)
// Odgovorna za dinamičko generisanje kartica iz insightsData.js
// ==============================================

/**
 * Generiše HTML za pojedinačnu karticu uvida.
 * @param {object} insight - Objekat sa podacima za jedan članak.
 * @returns {string} HTML string kartice.
 */
function createInsightCard(insight) {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(insight.date).toLocaleDateString('en-US', dateOptions);

    // Koristi klase turbine-card i zoom-in za efekte (iz anohubs.css)
    return `
        <a href="${insight.content_file}" class="turbine-card block transform hover:scale-[1.02] zoom-in bg-white border border-slate-200 hover:border-hydro-primary rounded-xl shadow-lg transition duration-300 h-full p-6 text-left">
            <div class="flex items-center space-x-4 mb-4">
                <span class="text-4xl" role="img" aria-label="Icon">${insight.icon}</span>
                <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">${formattedDate}</span>
            </div>
            <h2 class="text-xl font-extrabold text-hydro-charcoal mb-2">${insight.title}</h2>
            <p class="text-slate-600 text-sm">${insight.subtitle}</p>
            <span class="mt-4 inline-flex items-center text-hydro-primary font-semibold text-sm">
                Read Article →
            </span>
        </a>
    `;
}

/**
 * Glavna funkcija za renderovanje arhive.
 */
function renderInsightsArchive() {
    // 1. Provjerava da li su podaci učitani (insightsData je definisan u insights-data.js)
    if (typeof insightsData === 'undefined' || !Array.isArray(insightsData)) {
        console.error("Insights data not loaded or found.");
        return;
    }

    const container = document.getElementById('insights-archive-grid');
    if (!container) {
        console.error("Container #insights-archive-grid not found.");
        return;
    }

    let allCardsHtml = '';
    
    // Generiše HTML za sve kartice
    insightsData.forEach(insight => {
        allCardsHtml += createInsightCard(insight);
    });

    // Ubacuje sav HTML u kontejner odjednom
    container.innerHTML = allCardsHtml;
    
    // Inicijalizira Lucide ikone (ako ih koristimo u karticama, iako su ovdje Emoji)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Pokreće renderovanje kada se DOM učita
document.addEventListener('DOMContentLoaded', renderInsightsArchive);