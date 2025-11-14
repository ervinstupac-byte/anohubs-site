// PODACI O ČLANCIMA (Sadržaj svih članaka u JSON formatu)
const insightData = [
    // MODUL 1: Engineering Immunity (Baziran na 48% riziku)
    {
        id: 'module1', 
        icon: '🐳',
        title: 'Engineering Immunity: Neutralizing 48% Dynamic Risk',
        subtitle: 'The Strategic Pivot from Execution Gap to Asset Integrity.',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🌊 Engineering Immunity: How Technology Neutralizes 48% Dynamic Risk in Hydropower</h1>
                <p class="article-intro">This analysis demonstrates that the most significant threat to hydropower asset integrity is not component failure, but **Organizational Execution Gap**. Studies confirm that installation imperfections introduce a measurable 48% dynamic risk factor that accelerates asset degradation. We introduce the **Dual Application Strategy** – a bio-inspired solution guaranteeing maximum operational resilience.</p>
                
                <h2>🚨 1. The Ticking Bomb Thesis: 48% Risk</h2>
                <p>The crisis is defined by the critical disconnect between perfect design and flawed field implementation (Execution Gap). Even the most precisely designed turbine is vulnerable to failure caused by simple **Installation Errors**—misalignments often invisible during standard commissioning.</p>
                
                <h2>🐳 2. The Solution: Hydrodynamic Harmony™</h2>
                <p>Our innovative hypothesis finds its solution in nature's most efficient fluid dynamicist: the **Humpback Whale**. The **"Whale Fin" Rotor (Tubercle Concept)** integrates carefully shaped ridges to create **Hydrodynamic Immunity** – a design that tolerates human imperfection and reduces pressure fluctuations.</p>
                
                <div class="cta-footer">
                    <strong>Ready to eliminate 48% dynamic risk in your fleet?</strong>
                    <a href="/index.html#kontakt" class="cta-button">CONTACT US FOR A DETAILED STUDY</a>
                </div>
            </div>
        `
    },
    
    // MODUL 5: The True Cost of Low Bid (Vaš njemački manifest)
    {
        id: 'module5', 
        icon: '💰',
        title: 'The True Cost of Low Bid: The Dilemma of CapEx vs. LCC',
        subtitle: 'Why chasing the cheapest contract guarantees financial failure.',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>💰 The True Cost of Low Bid: The Dilemma of Capital Expenditure vs. LCC</h1>
                <p class="article-intro">In the hydropower sector, a silent catastrophe is unfolding. The pursuit of the lowest upfront price (CapEx) is the greatest enemy of your project's longevity. This "Gier nach dem Niedrigstgebot" is dangerous.</p>

                <h2>1. The Science of Subcontracted Failures</h2>
                <p>The consequences of cheap procurement are physical: Mixing incompatible metals in high-moisture systems (e.g., in hydraulic lines) creates **galvanic corrosion**—an electrolytic process that destroys bearings and seals prematurely. This material failure is directly rooted in procurement ignorance.</p>

                <h2>2. The Strategic Mandate: The Integrated Audit</h2>
                <p>We must stop treating hydropower as a simple CapEx transaction. You need a trusted partner who will audit contracts for **Material Compatibility** (eliminating Galvanic Corrosion) and **Normative Conformity** (ensuring HOAI/VDE electrical standards are met).</p>
                
                <div class="cta-footer">
                    <strong>Die Investition in frühe, umfassende Expertenintegrität ist kein Kostenfaktor.</strong>
                    <a href="/index.html#kontakt" class="cta-button">Započnite Audit mit Hydro-Immunity</a>
                </div>
            </div>
        `
    },

    // MODUL 14 - 3D Flow Analysis: Ultra-High Head Risk
    {
        id: 'module14',
        icon: '🔬',
        title: '3D Flow Analysis: Ultra-High Head Risk',
        subtitle: 'The Necessity of Full System Simulation (CFD)',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🔬 3D Flow Analysis: Ultra-High Head Risk and System Coupling</h1>
                <p>This analysis, based on 3D simulations of an ultra-high-head pumped storage unit, demonstrates that severe pressure pulsations significantly threaten operational safety.</p>
                <p><strong>Bidirectional Coupling:</strong> The study reveals a strong bidirectional coupling between the flow in the long outlet pipe and the internal flow within the pump-turbine unit.</p>
                <p><strong>Strategic Takeaway:</strong> Ignoring 3D flow within these long pipelines may result in significant errors in predicting internal flow characteristics and dynamic instability, directly relating to the <strong>48% dynamic risk factor</strong> we seek to mitigate.</p>
            </div>
        `
    },
    
    // Dodajte ostale module ovdje (module13, module12, module11, module10, module9, module7, module4, module3, module2)
    // Radi dužine koda, neću ih ponavljati.

    // PRIMJER KAKO UBACITI NOVI ČLANAK (Na engleskom)
    {
        id: 'module_new_en', 
        icon: '💡',
        title: 'New English Article: M-E Synergy and Asset Value',
        subtitle: 'The holistic advantage of integrated mechanical and electrical audits.',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>💡 M-E Synergy: The Holistic Advantage of Integrated Audits</h1>
                <p class="article-intro">The classic division between mechanical and electrical engineering is the biggest risk factor. Our M-E Synergy protocol ensures that errors in the electrical documentation (HOAI/VDE standards) are immediately identified as a direct mechanical threat.</p>
                <p><strong>Key Insight:</strong> Flawed grounding or automation causes electrical stress, which translates directly into <span class="font-bold">vibration and component fatigue</span>—a critical failure point for the $\mathbf{48\%}$ dynamic risk.</p>
                <div class="cta-footer">
                    <a href="/index.html#kontakt" class="cta-button">Request M-E Synergy Audit</a>
                </div>
            </div>
        `
    },
];

// Glavna funkcija za renderiranje kartica
function renderInsights(data) {
    const list = document.getElementById('insights-list');
    const contentWrapper = document.getElementById('article-content-wrapper');
    if (!list || !contentWrapper) return;

    data.forEach(item => {
        // 1. Kreiranje Kartice (Slider Item)
        const card = document.createElement('div');
        card.className = 'insight-card flex-shrink-0 w-80 h-96 p-6 rounded-xl bg-slate-800 border border-cyan-500/50 cursor-pointer relative';
        card.setAttribute('onclick', `openModal('${item.id}')`);
        
        const isPublished = item.status === 'Published';
        const statusText = isPublished ? 'CLICK TO READ' : item.status;
        const statusColor = isPublished ? 'text-cyan-400' : 'text-slate-400';
        
        // Generisanje pregleda sadržaja za karticu
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = item.content;
        const previewText = tempDiv.textContent.substring(0, 100).trim();

        card.innerHTML = `
            <div class="text-3xl mb-4 text-cyan-400">${item.icon}</div>
            <h2 class="text-2xl font-bold text-white">${item.title}</h2>
            <p class="text-sm text-slate-400 mt-2 italic">${item.subtitle}</p>
            <p class="mt-4 text-slate-300">${previewText}...</p>
            <div class="absolute bottom-6 text-sm font-semibold ${statusColor}">
                ${statusText} &rarr;
            </div>
        `;
        list.appendChild(card);
        
        // 2. Kreiranje Skrivenog Sadržaja za Modal
        const articleDiv = document.createElement('div');
        articleDiv.id = item.id + '-content';
        articleDiv.className = 'article-container hidden';
        articleDiv.innerHTML = item.content;
        contentWrapper.appendChild(articleDiv);
    });
}


// GLAVNE FUNKCIJE ZA MODAL (Kopirano iz ranijih koraka)
function openModal(moduleId) {
    const modal = document.getElementById('article-modal');
    const contentArea = document.getElementById('modal-content-area');

    document.querySelectorAll('#article-content-wrapper .article-container').forEach(content => {
        content.classList.add('hidden');
    });
    
    const targetContent = document.getElementById(moduleId + '-content');
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }

    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); 
    }
    
    if (contentArea) {
        contentArea.scrollTo(0, 0);
    }
}

function closeModal() {
    const modal = document.getElementById('article-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}


// Inicijalizacija pri učitavanju
document.addEventListener('DOMContentLoaded', () => {
    // Moramo inicijalizirati Lucide ikone i renderirati podatke
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    renderInsights(insightData); 
    
    // Logika za Strelicu (Scroll)
    const insightsList = document.getElementById('insights-list');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const scrollDistance = 350; 

    if (scrollLeftBtn && scrollRightBtn && insightsList) {
        scrollLeftBtn.addEventListener('click', () => {
            insightsList.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            insightsList.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        });
    }
});