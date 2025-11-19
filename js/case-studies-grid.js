// ==============================================
// CASE STUDIES GRID (Data + Render Logic)
// DEBUGGED VERSION
// ==============================================

// 1. PODACI (DATA)
const caseStudiesData = [
    {
        "id": "cs01",
        "icon": "🛡️",
        "title": "98% Availability: Neutralizing Hidden Dynamic Risk",
        "subtitle": "Case Study: Francis Turbine Misalignment Correction in a DACH-region plant.",
        "metrics": "RISK REDUCTION: 48% eliminated",
        "date": "2024-09-15",
        "content_file": "case-studies/cs-francis-misalignment.html"
    },
    {
        "id": "cs02",
        "icon": "⚡",
        "title": "+3.1% Efficiency Gain Post-Modernization",
        "subtitle": "Case Study: Hydraulic Hub Optimization and LCC Analysis for Kaplan Fleet.",
        "metrics": "ROI: 14 months",
        "date": "2024-10-20",
        "content_file": "case-studies/cs-kaplan-optimization.html"
    },
    {
        "id": "cs03",
        "icon": "🔬",
        "title": "Electro-Erosion Stopped: M-E Synergy Audit Success",
        "subtitle": "Case Study: Identifying hidden grounding flaws causing catastrophic bearing wear.",
        "metrics": "BEARING LIFESPAN: Extended by 5 years",
        "date": "2024-11-05",
        "content_file": "case-studies/cs-me-synergy-erosion.html"
    },
    {
        "id": "cs04",
        "icon": "💧",
        "title": "Abrasion Risk Zeroed: Pelton Nozzle & Bucket Integrity",
        "subtitle": "Case Study: Mitigation of high-velocity abrasion damage on a high-head Pelton unit.",
        "metrics": "WEAR REDUCTION: 90%",
        "date": "2025-01-10",
        "content_file": "case-studies/cs-pelton-abrasion.html"
    },
    {
        "id": "cs05",
        "icon": "🤖",
        "title": "Predictive Certainty: 100% Elimination of Unplanned Downtime",
        "subtitle": "Case Study: Validating AI anomaly detection accuracy for 3 years, optimizing maintenance windows.",
        "metrics": "DOWNTIME: 0 Unplanned Hours",
        "date": "2025-02-15",
        "content_file": "case-studies/cs-predictive-maintenance-roi.html"
    },
    {
        "id": "cs06",
        "icon": "⚖️",
        "title": "Compliance Shield: Avoiding €200K Fines with Automated Reporting",
        "subtitle": "Case Study: Implementing verifiaible Digital Protocol to satisfy regulatory bodies and secure permanent license renewal.",
        "metrics": "FINES AVOIDED: €200,000",
        "date": "2025-03-01",
        "content_file": "case-studies/cs-compliance-shield.html"
    },
    {
        "id": "cs07",
        "icon": "💥",
        "title": "Pressure Pulse Control: Eliminating Hydraulic Hammer Risk",
        "subtitle": "Case Study: Governor system recalibration and transient analysis to mitigate water hammer effects and protect penstock integrity.",
        "metrics": "PRESSURE SURGE: -40% reduction",
        "date": "2025-04-10",
        "content_file": "case-studies/cs-hydraulic-hammer-mitigation.html"
    },
    {
        "id": "cs08",
        "icon": "🧪",
        "title": "Material Integrity: Forensic NDT Stops Early Fatigue",
        "subtitle": "Case Study: Utilizing sub-surface NDT protocols to detect stress corrosion cracking in high-stress zones of Francis runners.",
        "metrics": "FATIGUE RISK: 95% mitigated",
        "date": "2025-05-20",
        "content_file": "case-studies/cs-forensic-ndt-fatigue.html"
    },
    {
        "id": "cs09",
        "icon": "💸",
        "title": "Procurement Integrity: LCC Audit Secures 30-Year Value",
        "subtitle": "Case Study: Pre-contract LCC and material compatibility audit prevents catastrophic failure linked to low-bid component sourcing.",
        "metrics": "LCC SAVINGS: 18% over asset lifespan",
        "date": "2025-06-15",
        "content_file": "case-studies/cs-lcc-procurement-audit.html"
    },
    {
        "id": "cs10",
        "icon": "🐠",
        "title": "Symbiosis Success: Fish Passage and Ecological Flow Verification",
        "subtitle": "Case Study: Implementing verifiable ecological monitoring protocols to secure public trust and permanent operating licenses.",
        "metrics": "LICENSE RISK: Eliminated (Verified Flow)",
        "date": "2026-01-20",
        "content_file": "case-studies/cs-fish-passage-optimization.html"
    },
    {
        "id": "cs11",
        "icon": "⚙️",
        "title": "Shaft System Reliability: Micrometer Precision Mitigates 48% Risk",
        "subtitle": "Case Study: Advanced precision measurement and re-alignment eliminates latent dynamic instability and structural fatigue on a large vertical unit.",
        "metrics": "VIBRATION: 85% reduction",
        "date": "2026-03-05",
        "content_file": "case-studies/cs-shaft-system-stability.html"
    },
    {
        "id": "cs12",
        "icon": "📈",
        "title": "SCADA-to-CEO Gap Closed: Verifiable ROI on Digital Protocol",
        "subtitle": "Case Study: Quantifying the financial impact of centralizing data, reducing maintenance labor and insurance premiums.",
        "metrics": "INSURANCE: 15% Premium Reduction",
        "date": "2026-04-15",
        "content_file": "case-studies/cs-digital-protocol-roi.html"
    }
];

// 2. LOGIKA ZA RENDEROWANJE
function createCaseStudyCard(study) {
    return `
        <a href="${study.content_file}" class="turbine-card block transform hover:scale-[1.02] zoom-in bg-hydro-slate border border-hydro-light-slate hover:border-hydro-secondary rounded-xl shadow-lg transition duration-300 h-full p-6 text-left">
            <div class="flex items-center space-x-4 mb-4">
                <span class="text-4xl" role="img" aria-label="Icon">${study.icon}</span>
                <div class="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    ${study.metrics}
                </div>
            </div>
            <h2 class="text-2xl font-extrabold text-white mb-2">${study.title}</h2>
            <p class="text-slate-400 text-sm mb-4 flex-grow">${study.subtitle}</p>
            <span class="mt-auto inline-flex items-center text-hydro-secondary font-semibold text-sm">
                View Full Study →
            </span>
        </a>
    `;
}

function renderCaseStudiesArchive() {
    const container = document.getElementById('case-studies-grid');
    
    if (!container) {
        console.error("Greška: Element #case-studies-grid nije pronađen na stranici!");
        return;
    }

    console.log("Pronađen kontejner, počinjem renderovanje...");
    
    let allCardsHtml = '';
    
    if (typeof caseStudiesData !== 'undefined' && Array.isArray(caseStudiesData)) {
        caseStudiesData.forEach((study, index) => {
            // Dodajemo delay klasu za ljepšu animaciju
            let cardHtml = createCaseStudyCard(study);
            // Ručno ubacivanje delay klase u string
            const delayClass = `delay-${Math.min((index % 4) * 200, 800)}`; 
            // Zamjena klase zoom-in sa zoom-in + delay
            cardHtml = cardHtml.replace('zoom-in', `zoom-in ${delayClass}`);
            
            allCardsHtml += cardHtml;
        });

        container.innerHTML = allCardsHtml;
        console.log("Renderovanje završeno.");
        
        // Ponovno pokretanje Lucide ikona ako su potrebne
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Pokreni animacije
        if (typeof initScrollAnimations === 'function') {
             initScrollAnimations();
        }
        
    } else {
        console.error("Podaci caseStudiesData nisu definisani!");
        container.innerHTML = "<p class='text-red-500 text-center'>Greška: Podaci nisu učitani.</p>";
    }
}

// SIGURNO POKRETANJE: Provjerava da li je DOM već učitan
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCaseStudiesArchive);
} else {
    // Ako je skripta učitana nakon DOM-a (npr. defer), pokreni odmah
    renderCaseStudiesArchive();
}