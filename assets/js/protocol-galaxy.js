/**
 * Protocol Galaxy Visualization
 * Extracted and refined from legacy protocol.html
 */

const GalaxyApp = {
    modules: [
        { id: '01', nameKey: 'protocol_matrix.m01.name', descKey: 'protocol_matrix.m01.desc', file: '/protocol/anohub_protocol_v2/', color: 'm-cyan' },
        { id: '02', nameKey: 'protocol_matrix.m02.name', descKey: 'protocol_matrix.m02.desc', file: '/protocol/anohub_methodology_v2/', color: 'm-purple' },
        { id: '03', nameKey: 'protocol_matrix.m03.name', descKey: 'protocol_matrix.m03.desc', file: '/protocol/anohub_organization_v2/', color: 'm-orange' },
        { id: '04', nameKey: 'protocol_matrix.m04.name', descKey: 'protocol_matrix.m04.desc', file: '/protocol/anohub_synergy_v2/', color: 'm-yellow' },
        { id: '05', nameKey: 'protocol_matrix.m05.name', descKey: 'protocol_matrix.m05.desc', file: '/protocol/anohub_alignment_v2/', color: 'm-blue' },
        { id: '06', nameKey: 'protocol_matrix.m06.name', descKey: 'protocol_matrix.m06.desc', file: '/protocol/anohub_predictive_v2/', color: 'm-green' },
        { id: '07', nameKey: 'protocol_matrix.m07.name', descKey: 'protocol_matrix.m07.desc', file: '/protocol/anohub_fluid_v2/', color: 'm-cyan' },
        { id: '08', nameKey: 'protocol_matrix.m08.name', descKey: 'protocol_matrix.m08.desc', file: '/protocol/anohub_flux_v2/', color: 'm-magma' },
        { id: '09', nameKey: 'protocol_matrix.m09.name', descKey: 'protocol_matrix.m09.desc', file: '/protocol/anohub_cost_v2/', color: 'm-green' },
        { id: '10', nameKey: 'protocol_matrix.m10.name', descKey: 'protocol_matrix.m10.desc', file: '/protocol/anohub_flood_v2/', color: 'm-blue' },
        { id: '11', nameKey: 'protocol_matrix.m11.name', descKey: 'protocol_matrix.m11.desc', file: '/protocol/anohub_vib_v2/', color: 'm-fuchsia' },
        { id: '12', nameKey: 'protocol_matrix.m12.name', descKey: 'protocol_matrix.m12.desc', file: '/protocol/anohub_dam_v2/', color: 'm-stone' },
        { id: '13', nameKey: 'protocol_matrix.m13.name', descKey: 'protocol_matrix.m13.desc', file: '/protocol/anohub_sat_v2/', color: 'm-cyan' },
        { id: '14', nameKey: 'protocol_matrix.m14.name', descKey: 'protocol_matrix.m14.desc', file: '/protocol/anohub_blackbox_v2/', color: 'm-orange' },
        { id: '15', nameKey: 'protocol_matrix.m15.name', descKey: 'protocol_matrix.m15.desc', file: '/protocol/anohub_scada_v2/', color: 'm-red' },
        { id: '16', nameKey: 'protocol_matrix.m16.name', descKey: 'protocol_matrix.m16.desc', file: '/protocol/anohub_asset_v2/', color: 'm-emerald' },
        { id: '17', nameKey: 'protocol_matrix.m17.name', descKey: 'protocol_matrix.m17.desc', file: '/protocol/anohub_iso_v2/', color: 'm-gold' },
        { id: '18', nameKey: 'protocol_matrix.m18.name', descKey: 'protocol_matrix.m18.desc', file: '/protocol/anohub_global_v2/', color: 'm-blue' },
        { id: '19', nameKey: 'protocol_matrix.m19.name', descKey: 'protocol_matrix.m19.desc', file: '/protocol/anohub_quantum_v2/', color: 'm-purple' },
        { id: '20', nameKey: 'protocol_matrix.m20.name', descKey: 'protocol_matrix.m20.desc', file: '/protocol/anohub_thermal_v2/', color: 'm-red' },
        { id: '21', nameKey: 'protocol_matrix.m21.name', descKey: 'protocol_matrix.m21.desc', file: '/protocol/anohub_core_v2/', color: 'm-magma' },
        { id: '99', nameKey: 'protocol_matrix.m99.name', descKey: 'protocol_matrix.m99.desc', file: '#', color: 'm-gold', isSpecial: true }
    ],

    init() {
        const galaxyContainer = document.getElementById('galaxy');
        if (!galaxyContainer) return;

        this.buildSolarSystem(galaxyContainer);
        this.buildGrid();
        this.initMatrix();

        window.addEventListener('languageChanged', () => {
            this.updateLabels();
            this.updateGrid();
        });

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    },

    getT(key) {
        return window.getTrans ? window.getTrans(key) : key;
    },

    updateLabels() {
        document.querySelectorAll('.planet-link').forEach(link => {
            const mId = link.querySelector('span').textContent;
            const m = this.modules.find(mod => mod.id === mId);
            if (m) {
                const label = link.querySelector('.planet-label');
                label.innerHTML = `<span style="color:${this.getColor(m.color)}; font-weight:bold; margin-right:4px;">${m.id}</span> ${this.getT(m.nameKey)}`;
            }
        });
    },

    updateGrid() {
        const grid = document.getElementById('modules-grid');
        if (grid) {
            grid.innerHTML = '';
            this.buildGrid();
        }
    },

    buildSolarSystem(container) {
        const rings = [
            { r: 175, speed: 25, items: this.modules.slice(0, 7) },   // Inner Ring (Closer, faster)
            { r: 275, speed: 45, items: this.modules.slice(7, 14) },  // Middle Ring
            { r: 375, speed: 65, items: this.modules.slice(14, 22) }  // Outer Ring
        ];

        rings.forEach((ring, idx) => {
            const orbitContainer = document.createElement('div');
            orbitContainer.style.position = 'absolute';
            orbitContainer.style.top = '50%'; orbitContainer.style.left = '50%';
            orbitContainer.style.width = '0'; orbitContainer.style.height = '0';
            orbitContainer.style.transformStyle = 'preserve-3d';
            orbitContainer.style.animation = `spin-orbit ${ring.speed}s linear infinite`;

            if (idx % 2 !== 0) orbitContainer.style.animationDirection = 'reverse';
            orbitContainer.style.pointerEvents = 'none';

            container.appendChild(orbitContainer);

            const step = (2 * Math.PI) / ring.items.length;

            ring.items.forEach((m, i) => {
                const angle = step * i;
                const x = Math.cos(angle) * ring.r;
                const z = Math.sin(angle) * ring.r;

                const link = document.createElement('a');
                link.className = 'planet-link';

                if (m.isSpecial) {
                    link.href = "#";
                    link.dataset.special = "true";
                } else {
                    link.href = m.file;
                }

                const colorHex = this.getColor(m.color);
                link.style.transform = `translate3d(${x}px, 0, ${z}px) rotateX(-90deg)`;

                link.innerHTML = `
                    <div class="planet-body" style="border-color: ${colorHex}; box-shadow: 0 0 15px ${colorHex}"></div>
                    <div class="planet-label" style="border-color: ${colorHex}; color: #fff;">
                        <span style="color:${colorHex}; font-weight:bold; margin-right:4px;">${m.id}</span> ${this.getT(m.nameKey)}
                    </div>
                `;

                orbitContainer.appendChild(link);
            });
        });
    },

    buildGrid() {
        const grid = document.getElementById('modules-grid');
        if (!grid) return;

        this.modules.forEach(m => {
            const hex = this.getColor(m.color);
            const card = document.createElement('a');
            card.className = 'module-card p-6 block group';
            card.style.setProperty('--hover-color', hex);
            card.style.setProperty('--hover-glow', hex + '40');

            if (m.isSpecial) {
                card.href = "#";
            } else {
                card.href = m.file;
            }

            card.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <span class="font-mono text-xs font-bold" style="color:${hex}">SYS-${m.id}</span>
                    <div class="w-2 h-2 rounded-full shadow-[0_0_5px_white]" style="background-color:${hex}"></div>
                </div>
                <h3 class="text-xl font-divine text-white group-hover:text-[${hex}] transition mb-2">${this.getT(m.nameKey)}</h3>
                <p class="text-sm text-slate-400 font-light mb-4 h-10">${this.getT(m.descKey)}</p>
                <div class="h-px w-8 bg-white/20 group-hover:w-full transition-all duration-500" style="background-color:${hex}"></div>
            `;
            grid.appendChild(card);
        });
    },

    initMatrix() {
        const c = document.getElementById('matrix-canvas');
        if (!c) return;
        const ctx = c.getContext('2d');
        const resize = () => {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const cols = Math.floor(c.width / 25);
        const drops = Array(cols).fill(1);

        setInterval(() => {
            ctx.fillStyle = 'rgba(0,0,0,0.08)';
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.font = '12px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(Math.random() * 128);
                const x = i * 25;
                const y = drops[i] * 25;

                if (Math.random() > 0.97) {
                    ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
                    ctx.fillText(text, x, y);
                } else if (Math.random() > 0.98) {
                    ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
                    ctx.fillText(text, x, y);
                }

                if (y > c.height && Math.random() > 0.98) drops[i] = 0;
                drops[i]++;
            }
        }, 50);
    },

    getColor(cls) {
        const map = {
            'm-cyan': '#06b6d4', 'm-purple': '#8b5cf6', 'm-orange': '#f97316', 'm-yellow': '#facc15',
            'm-blue': '#3b82f6', 'm-green': '#10b981', 'm-red': '#ef4444', 'm-magma': '#ff5722',
            'm-stone': '#78716c', 'm-emerald': '#34d399', 'm-fuchsia': '#d946ef', 'm-gold': '#FFD700'
        };
        return map[cls] || '#fff';
    }
};

document.addEventListener('DOMContentLoaded', () => GalaxyApp.init());
