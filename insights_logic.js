// Ovaj fajl sadrži sadržaj SVIH modula (insightData) i logiku za prikaz kartica i modala.

const insightData = [
    // NAPOMENA: Sadržaj svih modula (module 1 do 15) ostaje ovdje...
    
    // MODUL 1: Engineering Immunity (Neutralizing 48% Risk)
    {
        id: 'module1', 
        icon: '🐳',
        title: 'Engineering Immunity',
        subtitle: 'Neutralizing 48% Dynamic Risk',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🌊 Engineering Immunity: How Technology Neutralizes 48% Dynamic Risk in Hydropower</h1>
                <p class="article-intro">
                    This analysis demonstrates that the most significant threat to hydropower asset integrity is not component failure, but **Organizational Execution Gap**. Studies confirm that installation imperfections introduce a measurable <span class="font-bold text-red-600">48% dynamic instability risk</span> that accelerates asset degradation. We introduce the **Dual Application Strategy** – a bio-inspired solution guaranteeing maximum operational resilience.
                </p>
                
                <h2>🚨 1. Organizational Compromise: The Ticking Bomb Thesis</h2>
                <p>The crisis is defined by the critical disconnect between perfect design and flawed field implementation (Execution Gap). Even the most precisely designed turbine is vulnerable to failure caused by simple **Installation Errors**—misalignments often invisible during standard commissioning.</p>
                
                <div class="cta-footer">
                    <strong>Ready to eliminate 48% dynamic risk in your fleet?</strong>
                    <a href="/index.html#contact" class="cta-button">REQUEST A DETAILED STUDY</a>
                </div>
            </div>
        `
    },

    // MODUL 2: True Cost of Low Bid (LCC vs CapEx)
    {
        id: 'module2', 
        icon: '💰',
        title: 'The True Cost of Low Bid',
        subtitle: 'The Dilemma of Capital Expenditure vs. LCC',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>💰 The True Cost of Low Bid: The Dilemma of Capital Expenditure vs. LCC</h1>
                
                <p class="article-intro">
                    In the hydropower sector, a silent catastrophe is unfolding. The pursuit of the lowest upfront price (CapEx) is the greatest enemy of your project's longevity. An investment decision based solely on CapEx is a financially flawed gamble against the entire lifecycle cost (OpEx).
                </p>
                
                <div class="cta-footer">
                    <strong>The investment in early, comprehensive integrity is the only guarantee that your pursuit of the lowest bid won't become your costliest catastrophic failure.</strong>
                    <a href="/index.html#contact" class="cta-button">REQUEST LCC CONSULTATION</a>
                </div>
            </div>
        `
    },
    
    // ... Ostatak Vaših modula (3 do 15) ide ovdje sa istim sadržajem ...
    // NAPOMENA: Ovdje trebate kopirati sadržaj svih ostalih 13 modula (3 do 15)
    // radi dužine koda, ne ponavljam ih, ali morate ih kopirati iz vašeg originalnog fajla.
];


// GLAVNA FUNKCIJA ZA RENDERIRANJE KARTICA
function renderInsights(data) {
    const list = document.getElementById('insights-list');
    const contentWrapper = document.getElementById('article-content-wrapper');
    if (!list || !contentWrapper) return;

    data.forEach(item => {
        // ... (Kreiranje kartice ostaje isto) ...
        const card = document.createElement('div');
        card.className = 'insight-card flex-shrink-0 w-80 p-6 rounded-xl bg-slate-800 border border-cyan-500/50 cursor-pointer relative';
        card.setAttribute('onclick', `openModal('${item.id}')`);
        
        const isPublished = item.status === 'Published';
        const statusText = isPublished ? 'CLICK TO READ' : item.status;
        const statusColor = isPublished ? 'text-cyan-400' : 'text-slate-400';
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = item.content;
        const articleIntro = tempDiv.querySelector('.article-intro') ? tempDiv.querySelector('.article-intro').textContent : '';
        const previewText = (articleIntro || tempDiv.textContent).substring(0, 100).trim();

        card.innerHTML = `
            <div class="text-3xl mb-4 text-cyan-400">${item.icon}</div>
            <h2 class="text-xl font-bold text-white mb-2">${item.title}</h2>
            <p class="text-sm text-slate-400 italic">${item.subtitle}</p>
            <p class="mt-4 text-sm text-slate-300">${previewText}...</p>
            <div class="absolute bottom-6 text-sm font-semibold ${statusColor}">
                ${statusText} →
            </div>
        `;
        list.appendChild(card);
        
        // 2. Kreiranje Skrivenog Sadržaja za Modal - KORISTIMO INLINE STIL
        const articleDiv = document.createElement('div');
        articleDiv.id = item.id + '-content';
        articleDiv.className = 'article-container'; 
        articleDiv.style.display = 'none'; // SAKRIVAMO SA INLINE STILOM
        articleDiv.innerHTML = item.content;
        contentWrapper.appendChild(articleDiv);
    });
}


// GLAVNE FUNKCIJE ZA MODAL (Globalne)
function openModal(moduleId) {
    const modal = document.getElementById('article-modal');
    const contentArea = document.getElementById('modal-content-area');

    // Sakrij sav sadržaj korišćenjem INLINE STILA
    document.querySelectorAll('#article-content-wrapper .article-container').forEach(content => {
        content.style.display = 'none'; 
    });
    
    // Prikaži samo ciljani sadržaj korišćenjem INLINE STILA
    const targetContent = document.getElementById(moduleId + '-content');
    if (targetContent) {
        targetContent.style.display = 'block'; // PRIKAŽI GA SA BLOCK
    }

    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); 
    }
    
    // Skrolaj modal na vrh
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


// Inicijalizacija pri učitavanju DOM-a
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    renderInsights(insightData); 
    
    // Logika za Strelicu (Scroll) ostaje ista
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