document.addEventListener('DOMContentLoaded', () => {
    
    // === DATA: THE 12 MISSION FILES ===
    const casesData = [
        {
            id: '001',
            title: 'Compliance Shield',
            type: 'finance',
            file: 'cs-compliance-shield.html',
            risk: 'Regulatory Fines',
            outcome: '€200k Saved',
            color: 'text-h-green',
            borderClass: 'type-finance'
        },
        {
            id: '002',
            title: 'Digital Protocol ROI',
            type: 'finance',
            file: 'cs-digital-protocol-roi.html',
            risk: 'Budget Bloat',
            outcome: '25% Labor Cut',
            color: 'text-h-blue',
            borderClass: 'type-finance'
        },
        {
            id: '003',
            title: 'Fish Passage Opt.',
            type: 'kaplan',
            file: 'cs-fish-passage-optimization.html',
            risk: 'License Revocation',
            outcome: '100% Compliance',
            color: 'text-h-green',
            borderClass: 'type-kaplan'
        },
        {
            id: '004',
            title: 'Forensic NDT Fatigue',
            type: 'francis',
            file: 'cs-forensic-ndt-fatigue.html',
            risk: 'Blade Separation',
            outcome: 'Fatigue Arrested',
            color: 'text-h-purple',
            borderClass: 'type-francis'
        },
        {
            id: '005',
            title: 'Francis Misalignment',
            type: 'francis',
            file: 'cs-francis-misalignment.html',
            risk: 'Bearing Failure',
            outcome: '99.1% Uptime',
            color: 'text-h-cyan',
            borderClass: 'type-francis'
        },
        {
            id: '006',
            title: 'Hydraulic Hammer',
            type: 'pelton',
            file: 'cs-hydraulic-hammer-mitigation.html',
            risk: 'Penstock Rupture',
            outcome: '-40% Surge',
            color: 'text-h-cta',
            borderClass: 'type-pelton'
        },
        {
            id: '007',
            title: 'Kaplan Optimization',
            type: 'kaplan',
            file: 'cs-kaplan-optimization.html',
            risk: 'Efficiency Loss',
            outcome: '+3.1% Output',
            color: 'text-h-green',
            borderClass: 'type-kaplan'
        },
        {
            id: '008',
            title: 'LCC Procurement Audit',
            type: 'finance',
            file: 'cs-lcc-procurement-audit.html',
            risk: 'Low-Bid Failure',
            outcome: '18% LCC Savings',
            color: 'text-h-blue',
            borderClass: 'type-finance'
        },
        {
            id: '009',
            title: 'M-E Synergy Erosion',
            type: 'pelton',
            file: 'cs-me-synergy-erosion.html',
            risk: 'Electro-Erosion',
            outcome: 'Shaft Voltage 0V',
            color: 'text-h-yellow',
            borderClass: 'type-pelton'
        },
        {
            id: '010',
            title: 'Pelton Abrasion',
            type: 'pelton',
            file: 'cs-pelton-abrasion.html',
            risk: 'Bucket Wear',
            outcome: '5yr Life Ext.',
            color: 'text-h-cta',
            borderClass: 'type-pelton'
        },
        {
            id: '011',
            title: 'Predictive Maint. ROI',
            type: 'finance',
            file: 'cs-predictive-maintenance-roi.html',
            risk: 'Unplanned Outage',
            outcome: 'Zero Downtime',
            color: 'text-h-green',
            borderClass: 'type-finance'
        },
        {
            id: '012',
            title: 'Shaft Stability',
            type: 'francis',
            file: 'cs-shaft-system-stability.html',
            risk: 'Vibration Trip',
            outcome: '-85% Amplitude',
            color: 'text-h-cta',
            borderClass: 'type-francis'
        }
    ];

    // === RENDER LOGIC ===
    const grid = document.getElementById('cases-grid');
    
    // Check if grid exists to avoid errors on other pages
    if(!grid) return;

    function renderCases(filterType) {
        grid.innerHTML = '';
        const filtered = filterType === 'all' ? casesData : casesData.filter(c => c.type === filterType);
        
        if(filtered.length === 0) {
            grid.innerHTML = '<div class="col-span-full text-center py-20 text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl">NO MISSIONS FOUND IN THIS SECTOR.</div>';
            return;
        }

        filtered.forEach((item, index) => {
            const delay = index * 100; // Stagger animation
            const card = document.createElement('a');
            card.href = `case-studies/${item.file}`;
            card.className = `dossier-card rounded-xl p-6 group block ${item.borderClass} animate-[fadeInUp_0.5s_ease-out]`;
            card.style.animationDelay = `${delay}ms`;
            
            card.innerHTML = `
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <div class="text-[10px] font-mono text-slate-500 mb-1">CASE ID: ${item.id}</div>
                        <h3 class="text-xl font-bold text-white group-hover:text-white transition">${item.title}</h3>
                    </div>
                    <div class="bg-white/5 px-2 py-1 rounded text-[10px] font-bold border border-white/10 uppercase text-slate-400 group-hover:text-white group-hover:border-white/30 transition">
                        ${item.type.toUpperCase()}
                    </div>
                </div>

                <div class="mt-auto space-y-3">
                    <div class="flex justify-between text-xs border-b border-slate-700 pb-2">
                        <span class="text-slate-500 font-mono">THREAT</span>
                        <span class="text-h-red font-bold text-right">${item.risk}</span>
                    </div>
                    <div class="flex justify-between text-sm pt-1">
                        <span class="text-slate-400 font-mono uppercase text-[10px]">RESULT</span>
                        <span class="${item.color} font-black text-right">${item.outcome}</span>
                    </div>
                </div>

                <div class="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition transform translate-y-2 group-hover:translate-y-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // === FILTER LOGIC ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.getAttribute('data-filter');
            renderCases(filter);
        });
    });

    // === SEARCH LOGIC ===
    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.dossier-card');
            
            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Initial Render
    renderCases('all');
});