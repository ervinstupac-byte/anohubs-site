// OSLANJA SE NA DINAMIČKO UČITAVANJE SADRŽAJA PRI KLIKU
const insightData = [
    // NAPOMENA: Ovdje je sav sadržaj modula 1 do 15.
    
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
                <p class="article-intro">...</p>
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
                <p class="article-intro">...</p>
                <div class="cta-footer">
                    <strong>The investment in early, comprehensive integrity is the only guarantee...</strong>
                    <a href="/index.html#contact" class="cta-button">REQUEST LCC CONSULTATION</a>
                </div>
            </div>
        `
    },
    // ... [Ovdje dodajte ostatak modula (3 do 15)] ... 
];

// GLAVNA FUNKCIJA ZA RENDERIRANJE KARTICA
function renderInsights(data) {
    const list = document.getElementById('insights-list');
    if (!list) return;

    data.forEach(item => {
        // Kreiranje Kartice (Slider Item)
        const card = document.createElement('div');
        card.className = 'insight-card flex-shrink-0 w-80 p-6 rounded-xl bg-slate-800 border border-cyan-500/50 cursor-pointer relative';
        // Klik sada samo poziva openModal, ostala logika je unutar funkcije
        card.setAttribute('onclick', `openModal('${item.id}')`);
        
        const isPublished = item.status === 'Published';
        const statusText = isPublished ? 'CLICK TO READ' : item.status;
        const statusColor = isPublished ? 'text-cyan-400' : 'text-slate-400';
        
        // Generisanje pregleda sadržaja
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
    });
}


// GLAVNE FUNKCIJE ZA MODAL (Globalne)
function openModal(moduleId) {
    const modal = document.getElementById('article-modal');
    const contentWrapper = document.getElementById('article-content-wrapper');
    const contentArea = document.getElementById('modal-content-area');

    // 1. NAĐI SADRŽAJ U NIZU insightData
    const article = insightData.find(item => item.id === moduleId);

    if (article && contentWrapper) {
        // 2. DINAMIČKI UBACI SADRŽAJ (Ovo je ključno!)
        contentWrapper.innerHTML = article.content;
    } else {
        // Ako ne pronađe sadržaj, prikaži grešku
        contentWrapper.innerHTML = '<div class="article-container"><h1 class="text-red-600">ERROR: Article Content Not Found.</h1></div>';
    }

    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Spriječi skrolanje pozadine
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
    renderInsights(insightData); // Pokreće generisanje kartica
    
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