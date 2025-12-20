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
        "key": "immunity",
        "date": "2025-11-14",
        "content_file": "/insights/article-1-engineering-immunity/"
    },
    {
        "id": "module2",
        "category": "finance",
        "icon": "💰",
        "key": "hidden_cost",
        "date": "2025-11-07",
        "content_file": "/insights/article-2-low-bid/"
    },
    {
        "id": "module3",
        "category": "tech",
        "icon": "❄️",
        "key": "winter_ops",
        "date": "2025-10-30",
        "content_file": "/insights/article-3-winter-challenges/"
    },
    {
        "id": "module4",
        "category": "culture",
        "icon": "🛡️",
        "key": "dach_insights",
        "date": "2025-10-25",
        "content_file": "/insights/article-4-dach-leadership/"
    },
    {
        "id": "module5",
        "category": "culture",
        "icon": "🤝",
        "key": "human_sensor",
        "date": "2025-10-20",
        "content_file": "/insights/article-5-human-sensor/"
    },
    {
        "id": "module6",
        "category": "finance",
        "icon": "💣",
        "key": "ticking_bomb",
        "date": "2025-10-15",
        "content_file": "/insights/article-6-ticking-bomb/"
    },
    {
        "id": "module7",
        "category": "finance",
        "icon": "🏰",
        "key": "fortress",
        "date": "2025-10-10",
        "content_file": "/insights/article-7-fortress-maintenance/"
    },
    {
        "id": "module8",
        "category": "culture",
        "icon": "🌱",
        "key": "symbiosis",
        "date": "2025-10-05",
        "content_file": "/insights/article-8-symbiosis-standard/"
    },
    {
        "id": "module9",
        "category": "fluid",
        "icon": "🌍",
        "key": "holistic",
        "date": "2025-09-30",
        "content_file": "/insights/article-9-holistic-view/"
    },
    {
        "id": "module10",
        "category": "tech",
        "icon": "🌡️",
        "key": "check_engine",
        "date": "2025-09-25",
        "content_file": "/insights/article-10-check-engine-light/"
    },
    {
        "id": "module11",
        "category": "tech",
        "icon": "💻",
        "key": "digital_twin",
        "date": "2025-09-20",
        "content_file": "/insights/article-11-digital-twin/"
    },
    {
        "id": "module12",
        "category": "tech",
        "icon": "🔌",
        "key": "me_synergy",
        "date": "2025-09-15",
        "content_file": "/insights/article-12-me-synergy-audit/"
    },
    {
        "id": "module13",
        "category": "fluid",
        "icon": "⏳",
        "key": "sediment",
        "date": "2025-09-10",
        "content_file": "/insights/article-13-sediment-silt/"
    },
    {
        "id": "module14",
        "category": "fluid",
        "icon": "🔬",
        "key": "cfd_analysis",
        "date": "2025-09-05",
        "content_file": "/insights/article-14-3d-flow-analysis/"
    },
    {
        "id": "module15",
        "category": "finance",
        "icon": "📈",
        "key": "scada_gap",
        "date": "2025-09-01",
        "content_file": "/insights/article-15-scada-ceo-gap/"
    },
    {
        "id": "module16",
        "category": "tech",
        "icon": "🤖",
        "key": "ai_paradox",
        "date": "2025-08-28",
        "content_file": "/insights/article-16-ai-paradox/"
    },
    {
        "id": "module17",
        "category": "culture",
        "icon": "📄",
        "key": "manifesto",
        "date": "2025-08-25",
        "content_file": "/insights/article-17-cultural-betrayal/"
    }
];

// 2. FUNKCIJA ZA KREIRANJE KARTICE
function createInsightCard(insight) {
    const locale = (localStorage.getItem('selectedLanguage') === 'bs') ? 'bs-BA' : 'en-US';
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(insight.date).toLocaleDateString(locale, dateOptions);

    const getT = (k) => window.getTrans ? window.getTrans(k) : k;
    const title = getT(`articles_list.${insight.key}.title`);
    const desc = getT(`articles_list.${insight.key}.desc`);
    const readMore = getT('insights_page.read_more') || 'Read Article →';

    return `
        <a href="${insight.content_file}" class="block transform hover:scale-[1.02] transition-all duration-500 opacity-0 animate-fadeIn">
            <div class="bg-white border border-slate-200 hover:border-hydro-primary rounded-xl shadow-lg h-full p-6 flex flex-col">
                <div class="flex items-center space-x-4 mb-4">
                    <span class="text-4xl" role="img" aria-label="Icon">${insight.icon}</span>
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">${formattedDate}</span>
                </div>
                <h2 class="text-xl font-extrabold text-gray-900 mb-2">${title}</h2>
                <p class="text-slate-600 text-sm flex-grow">${desc}</p>
                <span class="mt-4 inline-flex items-center text-hydro-primary font-semibold text-sm">
                    ${readMore}
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

    window.addEventListener('languageChanged', () => {
        renderGrid(window.currentFilter || 'all');
    });

    // Filter dugmad
    const filterButtons = document.querySelectorAll('.topic-button, .filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-topic') || (btn.onclick ? null : 'all');
            // filterInsights is called via onclick in HTML
        });
    });
});

// Exposed globally for index.html
window.filterInsights = function (category) {
    window.currentFilter = category;

    // Update active state of buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.getAttribute('onclick')?.includes(`'${category}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderGrid(category);
};