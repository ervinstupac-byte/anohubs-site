function createCaseStudyCard(study) {
    return `
        <a href="${study.content_file}" class="block transform hover:scale-[1.02] transition duration-300 h-full">
            <div class="bg-hydro-slate border border-hydro-light-slate hover:border-hydro-secondary rounded-xl shadow-lg h-full p-6 flex flex-col">
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
            </div>
        </a>
    `;
}

function renderCaseStudiesArchive() {
    if (typeof caseStudiesData === 'undefined' || !Array.isArray(caseStudiesData)) {
        console.error("Case Studies data not found.");
        return;
    }
    const container = document.getElementById('case-studies-grid');
    if (container) {
        let html = '';
        caseStudiesData.forEach(study => html += createCaseStudyCard(study));
        container.innerHTML = html;
    }
}
document.addEventListener('DOMContentLoaded', renderCaseStudiesArchive);