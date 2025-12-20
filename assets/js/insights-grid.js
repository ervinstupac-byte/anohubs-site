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
function createInsightCard(insight, isFeatured = false) {
    const locale = (localStorage.getItem('selectedLanguage') === 'bs') ? 'bs-BA' : 'en-US';
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(insight.date).toLocaleDateString(locale, dateOptions);

    const getT = (k) => window.getTrans ? window.getTrans(k) : k;
    const title = getT(`articles_list.${insight.key}.title`);
    const desc = getT(`articles_list.${insight.key}.desc`);
    const readMore = getT('insights_page.read_more') || 'Read Article →';

    if (isFeatured) {
        return `
            <div class="featured-insight-card relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0F1E] group shadow-2xl">
                <div class="absolute inset-0 bg-gradient-to-r from-h-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div class="relative z-10 grid md:grid-cols-2 gap-0">
                    <div class="p-8 md:p-12 flex flex-col justify-center">
                        <div class="flex items-center gap-4 mb-6">
                            <span class="px-3 py-1 bg-h-cyan/10 border border-h-cyan/20 text-h-cyan text-[10px] font-mono font-bold tracking-widest rounded-full uppercase">Latest Intelligence</span>
                            <span class="text-xs font-mono text-slate-500">${formattedDate}</span>
                        </div>
                        <h2 class="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">${title}</h2>
                        <p class="text-slate-400 text-lg mb-8 leading-relaxed line-clamp-3">${desc}</p>
                        <a href="${insight.content_file}" class="inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest hover:text-h-cyan transition-colors group/link">
                            ${readMore} <i data-lucide="arrow-right" class="w-5 h-5 group-hover/link:translate-x-2 transition-transform text-h-cyan"></i>
                        </a>
                    </div>
                    <div class="relative h-64 md:h-auto overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-l from-[#0A0F1E] via-transparent to-transparent z-10 md:block hidden"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent z-10 md:hidden block"></div>
                        <span class="absolute inset-0 flex items-center justify-center text-[15rem] opacity-[0.03] select-none pointer-events-none transition-transform duration-1000 group-hover:scale-110">${insight.icon}</span>
                        <div class="w-full h-full flex items-center justify-center p-12">
                             <div class="w-32 h-32 md:w-48 md:h-48 rounded-full bg-h-cyan/20 blur-3xl animate-pulse"></div>
                             <span class="absolute text-8xl md:text-9xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">${insight.icon}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    return `
        <a href="${insight.content_file}" class="block transform hover:scale-[1.02] transition-all duration-500 opacity-0 animate-fadeIn">
            <div class="bg-[#0f172a]/50 backdrop-blur-sm border border-white/5 hover:border-h-cyan/30 rounded-xl shadow-xl h-full p-8 flex flex-col group">
                <div class="flex items-center justify-between mb-6">
                    <span class="text-4xl transform group-hover:rotate-12 transition-transform duration-500" role="img" aria-label="Icon">${insight.icon}</span>
                    <span class="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-1">${formattedDate}</span>
                </div>
                <h2 class="text-xl font-bold text-white mb-4 group-hover:text-h-cyan transition-colors">${title}</h2>
                <p class="text-slate-400 text-sm leading-relaxed flex-grow line-clamp-3">${desc}</p>
                <div class="mt-6 flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
                    ${readMore.replace('→', '')} <i data-lucide="chevron-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"></i>
                </div>
            </div>
        </a>
    `;
}

// 3. FUNKCIJA ZA RENDEROWANJE
function renderGrid(filterCategory = 'all') {
    const gridContainer = document.getElementById('insights-archive-grid');
    const featuredContainer = document.getElementById('featured-container');

    if (!gridContainer) {
        console.error("Greška: Kontejner #insights-archive-grid nije pronađen!");
        return;
    }

    // Sort data: newest first
    const sortedData = [...insightsData].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Handle Featured Article (always the newest one from the 'all' set, or newest in category)
    if (featuredContainer && filterCategory === 'all') {
        featuredContainer.innerHTML = createInsightCard(sortedData[0], true);
    } else if (featuredContainer) {
        // Clear featured if filtering? Or keep it? The prompt says "zadnji napisani mora biti izrazen u gornjoj sekciji"
        // Let's hide it if filtered to keep it clean, but the prompt says it should be there.
        featuredContainer.innerHTML = '';
    }

    // Filtriranje
    const filteredData = filterCategory === 'all'
        ? sortedData.slice(1) // Remove latest from grid if featured (to avoid duplication)
        : sortedData.filter(item => item.category === filterCategory);

    let htmlContent = '';
    if (filteredData.length === 0) {
        htmlContent = '<div class="col-span-full text-center text-slate-400 py-10"><p>No insights found for this category.</p></div>';
    } else {
        filteredData.forEach((insight) => {
            htmlContent += createInsightCard(insight);
        });
    }

    gridContainer.innerHTML = htmlContent;

    // FIX: Prisilno dodavanje vidljivosti
    setTimeout(() => {
        const cards = gridContainer.querySelectorAll('a');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('opacity-0');
                card.classList.add('opacity-100');
            }, index * 100);
        });
    }, 50);

    // Initialise icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// 4. INICIJALIZACIJA
document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderGrid('all');

    window.addEventListener('languageChanged', () => {
        renderGrid(window.currentFilter || 'all');
    });

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const gridContainer = document.getElementById('insights-archive-grid');
            const featuredContainer = document.getElementById('featured-container');

            if (term === '') {
                renderGrid(window.currentFilter || 'all');
                return;
            }

            // Hide featured on search to avoid confusion
            if (featuredContainer) featuredContainer.innerHTML = '';

            const sortedData = [...insightsData].sort((a, b) => new Date(b.date) - new Date(a.date));
            const filtered = sortedData.filter(item => {
                const getT = (k) => window.getTrans ? window.getTrans(k) : k;
                const title = getT(`articles_list.${item.key}.title`).toLowerCase();
                const desc = getT(`articles_list.${item.key}.desc`).toLowerCase();
                return title.includes(term) || desc.includes(term);
            });

            let htmlContent = '';
            filtered.forEach(insight => htmlContent += createInsightCard(insight));
            gridContainer.innerHTML = htmlContent || '<div class="col-span-full text-center text-slate-400 py-10"><p>No results found for your search.</p></div>';

            // Show cards
            gridContainer.querySelectorAll('a').forEach(a => a.classList.replace('opacity-0', 'opacity-100'));
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }
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