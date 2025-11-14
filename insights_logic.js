// Ovaj fajl čita metapodatke iz articles.json i asinhrono učitava sadržaj članka.

document.addEventListener('DOMContentLoaded', () => {
    // Inicijalizacija ikona
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    loadArticles(); 
    initScrollLogic();
});

let articleCache = []; // Kešira metapodatke članaka

// 1. DOHVAĆANJE METAPODATAKA IZ JSON-a (Sa Cache Busterom)
async function loadArticles() {
    try {
        // Koristimo Cache Buster da forsiramo novo učitavanje
        const response = await fetch('articles.json?v=' + new Date().getTime()); 
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} (File not found or server issue).`);
        }
        
        articleCache = await response.json(); 

        // Sortiranje članaka
        articleCache.sort((a, b) => new Date(b.date) - new Date(a.date));

        renderInsights(articleCache); 
    } catch (error) {
        console.error('Error loading articles (articles.json):', error);
        
        const list = document.getElementById('insights-list');
        if (list) {
            list.innerHTML = '<p class="text-red-400 p-4">Error loading articles. Please check **articles.json** file path, syntax, and make sure it is named **articles.json**.</p>';
        }
    }
}

// 2. GENERISANJE KARTICA
function renderInsights(data) {
    const list = document.getElementById('insights-list');
    if (!list) return;
    list.innerHTML = ''; 

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'insight-card flex-shrink-0 w-80 p-6 rounded-xl bg-slate-800 border border-cyan-500/50 cursor-pointer relative';
        card.setAttribute('onclick', `openArticleModal('${item.content_file}')`);
        
        const isPublished = item.status === 'Published';
        const statusText = isPublished ? 'CLICK TO READ' : item.status;
        const statusColor = isPublished ? 'text-cyan-400' : 'text-slate-400';
        
        // Koristimo samo subtitle za pregled
        const previewText = item.subtitle;

        // KRITIČNA KOREKCIJA: Uklanjamo dupli preview tekst i osiguravamo mb-10
        card.innerHTML = `
            <div class="text-3xl mb-4 text-cyan-400">${item.icon}</div>
            <h2 class="text-xl font-bold text-white mb-2">${item.title}</h2>
            
            <p class="text-sm text-slate-400 italic mb-10">${previewText}</p>
            
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
    
    // Placeholder za učitavanje
    contentWrapper.innerHTML = '<div class="article-container text-center py-10 text-black"><h1 class="text-cyan-600">Loading Article...</h1></div>'; 

    try {
        // Dohvati čisti HTML sadržaj članka
        const response = await fetch(contentFile);
        
        if (!response.ok) {
            throw new Error(`Article file not found: ${contentFile}`);
        }
        
        const articleHtml = await response.text();

        // Ubacuje učitani HTML sadržaj u Modal
        contentWrapper.innerHTML = articleHtml; 
        
    } catch (error) {
        console.error('Error loading article content:', contentFile, error);
        contentWrapper.innerHTML = '<div class="article-container text-center py-10 text-black"><h1 class="text-red-600">Error: Could not load article content. Check file path.</h1></div>';
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

// Globalna funkcija za zatvaranje modala 
window.closeModal = () => {
    const modal = document.getElementById('article-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
};

// 4. LOGIKA SKROLANJA 
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