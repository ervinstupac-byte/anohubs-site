// Ovaj fajl čita metapodatke iz articles.json i asinhrono učitava sadržaj članka.

document.addEventListener('DOMContentLoaded', () => {
    // Inicijalizacija ikona (iz globalnog HTML-a)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    loadArticles(); 
    initScrollLogic();
});

let articleCache = []; // Kešira metapodatke članaka

// 1. DOHVAĆANJE METAPODATAKA IZ JSON-a
async function loadArticles() {
    try {
        const response = await fetch('articles.json');
        articleCache = await response.json();

        // Sortirajte članke po datumu (najnoviji prvi, ako želite)
        articleCache.sort((a, b) => new Date(b.date) - new Date(a.date));

        renderInsights(articleCache); 
    } catch (error) {
        console.error('Greška pri učitavanju članaka (articles.json):', error);
        const list = document.getElementById('insights-list');
        if (list) {
            list.innerHTML = '<p class="text-red-400 p-4">Error loading articles. Please check articles.json file path.</p>';
        }
    }
}

// 2. GENERISANJE KARTICA
function renderInsights(data) {
    const list = document.getElementById('insights-list');
    if (!list) return;
    list.innerHTML = ''; // Briše sve što je tamo bilo

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'insight-card flex-shrink-0 w-80 p-6 rounded-xl bg-slate-800 border border-cyan-500/50 cursor-pointer relative';
        card.setAttribute('onclick', `openArticleModal('${item.content_file}')`); // Poziva funkciju sa putanjom do HTML-a
        
        const isPublished = item.status === 'Published';
        const statusText = isPublished ? 'CLICK TO READ' : item.status;
        const statusColor = isPublished ? 'text-cyan-400' : 'text-slate-400';
        
        // Generisanje pregleda (Ne možemo učitati sadržaj, pa koristimo subtitle kao pregled)
        const previewText = item.subtitle;

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


// 3. ASINHRONO UČITAVANJE SADRŽAJA ČLANKA I OTVARANJE MODALA
async function openArticleModal(contentFile) {
    const modal = document.getElementById('article-modal');
    const contentWrapper = document.getElementById('article-content-wrapper');
    const contentArea = document.getElementById('modal-content-area');

    if (!contentWrapper) return;
    
    contentWrapper.innerHTML = '<div class="article-container text-center py-10"><h1 class="text-cyan-600">Loading Article...</h1></div>'; // Placeholder

    try {
        // Asinhrono dohvati čisti HTML sadržaj članka
        const response = await fetch(contentFile);
        const articleHtml = await response.text();

        // Ubacuje učitani HTML sadržaj u Modal
        contentWrapper.innerHTML = articleHtml; 
        
    } catch (error) {
        console.error('Error loading article content:', contentFile, error);
        contentWrapper.innerHTML = '<div class="article-container text-center py-10"><h1 class="text-red-600">Error: Could not load article content. Check file path.</h1></div>';
    }

    // Prikaz Modala
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    // Skrolaj modal na vrh
    if (contentArea) {
        contentArea.scrollTo(0, 0);
    }
}

// Globalna funkcija za zatvaranje modala (poziva se iz HTML-a)
window.closeModal = () => {
    const modal = document.getElementById('article-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
};

// 4. LOGIKA SKROLANJA (Ne mijenja se)
function initScrollLogic() {
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
}