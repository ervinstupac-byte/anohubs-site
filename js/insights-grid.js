// ==============================================
// INSIGHTS GRID LOGIC (Data + Render + Filtering)
// FIX: Visibility Issue Resolved
// ==============================================

// 1. PODACI (DATA)
const insightsData = [
    {
        "id": "module1",
        "category": "tech",
        "icon": "🌊",
        "title": "Engineering Immunity: Neutralizing 48% Dynamic Risk",
        "subtitle": "The Strategic Pivot from Execution Gap to Asset Integrity.",
        "date": "2025-11-14",
        "content_file": "article-1-engineering-immunity.html"
    },
    {
        "id": "module2",
        "category": "finance",
        "icon": "💰",
        "title": "The True Cost of Low Bid: The CapEx vs. LCC Catastrophe",
        "subtitle": "Why chasing the cheapest contract guarantees financial failure.",
        "date": "2025-11-07",
        "content_file": "article-2-low-bid.html"
    },
    {
        "id": "module3",
        "category": "tech",
        "icon": "❄️",
        "title": "Winter Challenges & M-E Synergy",
        "subtitle": "Extreme Conditions and Electro-Mechanical Stress.",
        "date": "2025-10-30",
        "content_file": "article-3-winter-challenges.html"
    },
    {
        "id": "module4", 
        "category": "culture",
        "icon": "🛡️",
        "title": "Precision Leadership: DACH Region",
        "subtitle": "How Precision Reclaims Leadership and secures asset value.",
        "date": "2025-10-25",
        "content_file": "article-4-dach-leadership.html"
    },
    {
        "id": "module5", 
        "category": "culture",
        "icon": "🤝",
        "title": "The Human Sensor",
        "subtitle": "Why Ethics and Experience Guarantee Precision.",
        "date": "2025-10-20",
        "content_file": "article-5-human-sensor.html"
    },
    {
        "id": "module6",
        "category": "finance",
        "icon": "💣",
        "title": "Hidden Costs & Ticking Bombs",
        "subtitle": "Systematic Review of Mechanical Maintenance Risks.",
        "date": "2025-10-15",
        "content_file": "article-6-ticking-bomb.html"
    },
    {
        "id": "module7", 
        "category": "finance",
        "icon": "🏰",
        "title": "Your Hydropower Plant as a Fortress",
        "subtitle": "How to Take Control of Maintenance and Profit.",
        "date": "2025-10-10",
        "content_file": "article-7-fortress-maintenance.html"
    },
    {
        "id": "module8",
        "category": "culture",
        "icon": "🌱",
        "title": "Beyond the Kilowatt-Hour",
        "subtitle": "The Symbiosis Standard for Sustainable Hydropower.",
        "date": "2025-10-05",
        "content_file": "article-8-symbiosis-standard.html"
    },
    {
        "id": "module9",
        "category": "fluid",
        "icon": "🌍",
        "title": "A Holistic View",
        "subtitle": "The River's Condition as an Operational Indicator.",
        "date": "2025-09-30",
        "content_file": "article-9-holistic-view.html"
    },
    {
        "id": "module10",
        "category": "tech",
        "icon": "🌡️",
        "title": "The 'Check Engine Light' of Your Turbine",
        "subtitle": "5 Symptoms You Should Never Ignore.",
        "date": "2025-09-25",
        "content_file": "article-10-check-engine-light.html"
    },
    {
        "id": "module11",
        "category": "tech",
        "icon": "💻",
        "title": "From Reactive to Predictive",
        "subtitle": "The Digital Twin’s Role in Hydropower Maintenance.",
        "date": "2025-09-20",
        "content_file": "article-11-digital-twin.html"
    },
    {
        "id": "module12",
        "category": "tech",
        "icon": "🔌",
        "title": "M-E Synergy: The Holistic Audit",
        "subtitle": "Protection Against Electro-Mechanical Failures.",
        "date": "2025-09-15",
        "content_file": "article-12-me-synergy-audit.html"
    },
    {
        "id": "module13",
        "category": "fluid",
        "icon": "⏳",
        "title": "The Unseen Threat: Sediment and Silt",
        "subtitle": "Eroding Profits, Endangering Assets.",
        "date": "2025-09-10",
        "content_file": "article-13-sediment-silt.html"
    },
    {
        "id": "module14",
        "category": "fluid",
        "icon": "🔬",
        "title": "3D Flow Analysis: Ultra-High Head Risk",
        "subtitle": "The Necessity of Full System Simulation (CFD).",
        "date": "2025-09-05",
        "content_file": "article-14-3d-flow-analysis.html"
    },
    {
        "id": "module15",
        "category": "finance",
        "icon": "📈",
        "title": "The SCADA-to-CEO Gap",
        "subtitle": "Bridging Data and Strategic Budgeting via HHI.",
        "date": "2025-09-01",
        "content_file": "article-15-scada-ceo-gap.html"
    }
];

// 2. FUNKCIJA ZA KREIRANJE KARTICE
function createInsightCard(insight) {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(insight.date).toLocaleDateString('en-US', dateOptions);

    // FIX: Dodana klasa 'is-visible' da se osigura prikazivanje
    // Uklonjena klasa 'zoom-in' da se izbjegne konflikt sa CSS-om ako JS za animacije kasni
    // Umjesto toga koristimo jednostavniju tranziciju
    
    return `
        <a href="${insight.content_file}" class="block transform hover:scale-[1.02] transition-all duration-500 opacity-0 animate-fadeIn">
            <div class="bg-white border border-slate-200 hover:border-hydro-primary rounded-xl shadow-lg h-full p-6 flex flex-col">
                <div class="flex items-center space-x-4 mb-4">
                    <span class="text-4xl" role="img" aria-label="Icon">${insight.icon}</span>
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">${formattedDate}</span>
                </div>
                <h2 class="text-xl font-extrabold text-gray-900 mb-2">${insight.title}</h2>
                <p class="text-slate-600 text-sm flex-grow">${insight.subtitle}</p>
                <span class="mt-4 inline-flex items-center text-hydro-primary font-semibold text-sm">
                    Read Article →
                </span>
            </div>
        </a>
    `;
}

// 3. FUNKCIJA ZA RENDEROWANJE
function renderGrid(filterCategory = 'all') {
    const container = document.getElementById('insights-archive-grid');
    
    if (!container) {
        console.error("Greška: Kontejner #insights-archive-grid nije pronađen!");
        return;
    }

    let htmlContent = '';
    
    // Filtriranje
    const filteredData = filterCategory === 'all' 
        ? insightsData 
        : insightsData.filter(item => item.category === filterCategory);

    if (filteredData.length === 0) {
        htmlContent = '<div class="col-span-full text-center text-slate-400 py-10"><p>No insights found for this category.</p></div>';
    } else {
        filteredData.forEach((insight) => {
            htmlContent += createInsightCard(insight);
        });
    }

    container.innerHTML = htmlContent;

    // FIX: Prisilno dodavanje vidljivosti nakon ubacivanja u DOM
    // Ovo rješava problem "praznog ekrana"
    setTimeout(() => {
        const cards = container.querySelectorAll('a');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('opacity-0');
                card.classList.add('opacity-100');
            }, index * 100); // Kaskadno pojavljivanje
        });
    }, 50);
    
    // Ponovno pokretanje Lucide ikona
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// 4. INICIJALIZACIJA
document.addEventListener('DOMContentLoaded', () => {
    // Prvo renderovanje
    renderGrid('all');

    // Filter dugmad
    const filterButtons = document.querySelectorAll('.topic-button');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset active klase
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.classList.remove('bg-hydro-primary/10');
                b.classList.remove('border-hydro-primary');
                b.classList.remove('text-hydro-primary');
            });
            
            // Set active klasa
            btn.classList.add('active');
            btn.classList.add('bg-hydro-primary/10');
            btn.classList.add('border-hydro-primary');
            btn.classList.add('text-hydro-primary');
            
            const category = btn.getAttribute('data-topic');
            renderGrid(category);
        });
    });
});