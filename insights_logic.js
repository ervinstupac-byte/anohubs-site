// Ovaj fajl sadrži sadržaj SVIH modula (insightData) i logiku za prikaz kartica i modala.

const insightData = [
    // NAPOMENA: Sadržaj modula ostaje IDENTIČAN kao u vašem posljednjem fajlu.
    
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
                
                <h2>🐳 2. The Solution: Hydrodynamic Harmony™ — Dual Application Strategy</h2>
                <p>Our innovative hypothesis finds its solution in nature's most efficient fluid dynamicist: the **Humpback Whale**. The **"Whale Fin" Rotor (Tubercle Concept)** integrates carefully shaped ridges to create **Hydrodynamic Immunity** – a design that tolerates human imperfection.</p>
                
                <p>Metrics Summary (Simplified): Dynamic Risk is **Neutralized**, and Vibrations are **Drastically Reduced**.</p>
                
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

                <h2>1. The Financial Flaw: Galvanic Corrosion</h2>
                <p>Low-bid contracts often mandate inferior materials. Mixing incompatible metals in high-moisture environments creates **galvanic corrosion**—an electrolytic process that destroys bearings and seals prematurely. This failure is rooted in procurement ignorance.</p>
                
                <h2>2. The Strategic Mandate: Integrated Audit</h2>
                <p>The only guarantee is the **Integrated Audit**, which verifies both financial feasibility (LCC) and physical compatibility:</p>
                <ul>
                    <li>**Material Compatibility Audit:** Eliminating Galvanic Corrosion risk.</li>
                    <li>**Enforce Precision:** Flawless Installation Protocol (QC < 0.1 mm) to eliminate the 48-Percent-Risk.</li>
                    <li>**Normative Compliance:** Auditing contracts to enforce **HOAI** and **VDE** electrical standards.</li>
                </ul>
                
                <div class="cta-footer">
                    <strong>The investment in early, comprehensive integrity is the only guarantee that your pursuit of the lowest bid won't become your costliest catastrophic failure.</strong>
                    <a href="/index.html#contact" class="cta-button">REQUEST LCC CONSULTATION</a>
                </div>
            </div>
        `
    },
    
    // MODUL 3: Winter Challenges & M-E Synergy (In Preparation)
    {
        id: 'module3',
        icon: '❄️',
        title: 'Winter Challenges & M-E Synergy',
        subtitle: 'Extreme Conditions and Electro-Mechanical Stress',
        status: 'In preparation',
        content: '<div class="article-container"><h1>❄️ Winter Challenges and M-E Synergy (In Preparation)</h1><p class="article-intro">This module will detail the Machine-Electrical (M-E) Synergy Gap: how electrical instabilities and cold temperatures stress mechanical assets. Focus will be on solutions for protecting equipment in extreme winter conditions.</p></div>'
    },
    
    // MODUL 4: The True Cost of Compromise (Culture and Integrity)
    {
        id: 'module4', 
        icon: '🛡️',
        title: 'The True Cost of Compromise',
        subtitle: 'Why Integrity and Culture Matter in Engineering',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🛡️ The True Cost of Compromise: Why Integrity and Culture Matter in Engineering</h1>
                
                <p class="article-intro">
                    As a seasoned leader, my experience has taught me that the true measure of a project’s success is its long-term resilience. Technical skills are the foundation, but true transformation happens when they are combined with strategic leadership and a culture of integrity.
                </p>

                <h2>1. Technical Expertise in Service of Strategic Leadership</h2>
                <p>A leader must not only give orders but must also deeply understand every aspect of the work on the ground to make informed and safe decisions. I focus on bridging the gap between hands-on expertise and strategic leadership.</p>

                <h2>2. Solving Systemic, Not Just Technical, Challenges</h2>
                <p>Many on-site issues are not technical problems but are the result of systemic failures within the organizational culture. A lack of communication, insufficient staff training, or excessive pressure on deadlines can lead to errors that compromise quality and safety. My focus is on identifying and resolving these systemic challenges.</p>

                <div class="cta-footer">
                    <strong>Ready to build robust, resilient systems?</strong>
                    <p>Let's discuss how integrity and culture drive profitability.</p>
                    <a href="/index.html#contact" class="cta-button">CONNECT WITH ME</a>
                </div>
            </div>
        `
    },

    // MODUL 5: Human Factor (Ethics and Experience)
    {
        id: 'module5', 
        icon: '🤝',
        title: 'The Human Sensor',
        subtitle: 'Why Ethics and Experience Guarantee Precision',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🤝 The Human Sensor: Why Ethics and Experience Guarantee Precision</h1>
                <p class="article-intro">My personal experience proves that a **Culture that tolerates injustice** (ethical compromise) is the same culture that tolerates a **technical compromise** (Execution Gap). You can't have one without the other.</p>

                <h2>1. The Human Sensor Advantage</h2>
                <p>AI serves as a powerful tool, but it doesn't replace the human engineer. Field experts know what cavitation sounds like, how metal smells when it is under fatigue, and how oil looks when it je contaminated. This is the **Human Sensor**—the first and most important layer of diagnostics.</p>
                
                <h2>2. The Ethical Imperative</h2>
                <p>To eliminate the 48% dynamic risk, you need engineers who are **empowered** to report faults immediately. A culture that prioritizes safety, ethics, and worker rights is the only foundation for demanding **100% precision**.</p>
                
                <div class="cta-footer">
                    <strong>Build a culture of trust.</strong>
                    <a href="/index.html#contact" class="cta-button">JOIN THE HYDRO-PRIJATELJSTVO COMMUNITY</a>
                </div>
            </div>
        `
    },

    // MODUL 6: Hidden Costs & Ticking Bombs
    {
        id: 'module6',
        icon: '💣',
        title: 'Hidden Costs & Ticking Bombs',
        subtitle: 'Systematic Review of Mechanical Maintenance',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>💣 Hidden Costs & Ticking Bombs: The Hard Truth About Your Hydropower Plant</h1>

                <h2>1. Relevant Statistics and General Data</h2>
                <ul>
                    <li>70-80% of mechanical equipment failures can be attributed to inadequate maintenance or errors during assembly and installation.</li>
                    <li>10-20% of a hydropower plant's total operating costs are related to maintenance.</li>
                </ul>

                <h2>2. Holistic Problem Breakdown: From Root Cause to Consequence</h2>
                <p><strong>Assembly and Installation Errors</strong> (poor shaft alignment) and **Electrical Factors** are the most dangerous root causes. Consequences: **Misalignment**, **Vibrations** (the "silent killer"), and **Contamination**.</p>

                <h2>3. The Human and Strategic Factor: The True Root Cause</h2>
                <p>The true cost of compromise is found here: **Reactive vs. Proactive Culture**, **Loss of Knowledge and Expertise**, and **Personnel Burnout**.</p>

                <div class="cta-footer">
                    <strong>Conclusion: Your investment in early, comprehensive expert integrity is the only guarantee against costly failures.</strong>
                    <a href="/index.html#contact" class="cta-button">CONNECT WITH OUR EXPERTISE</a>
                </div>
            </div>
        `
    },

    // MODUL 7: Your Hydropower Plant as a Fortress
    {
        id: 'module7', 
        icon: '🏰',
        title: 'Your Hydropower Plant as a Fortress',
        subtitle: 'Take Control of Maintenance and Profit',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🏰 Your Hydropower Plant as a Fortress: How to Take Control of Maintenance and Profit</h1>
                
                <h2>1. Overcoming Myths and Taking Control</h2>
                <p>The main challenge in our industry is not always machine failure, but the lack of knowledge that empowers owners to protect themselves. Maintenance too often relies on a reactive approach. This opens the door for service providers seeking profit, not the optimal solution.</p>

                <h2>2. Keys to Independence: Practical Knowledge and Modern Solutions</h2>
                <p>Your hydropower plant can become a fortress resistant to systemic shocks. The basis of machine longevity is assembly precision. I maintain that a core knowledge of the **0.05 mm per meter** tolerance is essential.</p>
                
                <ul>
                    <li>**Precision as the Foundation:** The basis of machine longevity is assembly precision.</li>
                    <li>**Holistic Inspection:** Focus on key components like shaft seals, central lubrication systems, and the hydraulic system.</li>
                    <li>**Digital Protocol:** Owners must introduce a digital system to serve as a central logbook.</li>
                </ul>

                <div class="cta-footer">
                    <strong>Your first battle is knowledge.</strong>
                    <p>I want to share my experience so owners can make informed decisions. Contact me for insight and advice without any obligation.</p>
                    <a href="/index.html#contact" class="cta-button">GET MY FREE INSIGHT</a>
                </div>
            </div>
        `
    },
    
    // MODUL 8: Beyond the Kilowatt-Hour (Symbiosis Standard)
    {
        id: 'module8',
        icon: '🌱',
        title: 'Beyond the Kilowatt-Hour',
        subtitle: 'The Symbiosis Standard',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🌱 Beyond the Kilowatt-Hour: A Call for a New Standard in Hydropower</h1>

                <h2>The Problem with Our Current Model</h2>
                <p>
                    We have become experts at measuring the obvious—the kilowatt-hour. But what about the hidden value? We treat hydropower as a pure financial equation, ignoring the ecological and natural capital we rely on.
                </p>

                <h2>A Vision for the Future: The Symbiosis Standard</h2>
                <p>
                    I believe we need a "counter-value" system where the preservation of nature—the health of the river, its biodiversity, and its natural beauty—is given real economic weight. I call this the **Symbiosis Standard**. In this model, a project's value wouldn't be judged solely by its energy generation, but by its ability to exist in harmony with the environment.
                </p>
                
                <div class="cta-footer">
                    <strong>What would be the biggest challenge in establishing a "Symbiosis Standard"?</strong>
                    <a href="/index.html#contact" class="cta-button">JOIN THE DEBATE</a>
                </div>
            </div>
        `
    },

    // MODUL 9: Holistic River View (ESG)
    {
        id: 'module9',
        icon: '🌍',
        title: 'A Holistic View',
        subtitle: 'River Protection and Turbines',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🌍 A Holistic View: River Protection and Turbines</h1>

                <h2>The Price of Negligence: The River's Condition as an Indicator</h2>
                <p>When the focus is solely on profit and not on the long-term health of the river, nature sends clear signals: The "hungry" river (erosion due to sediment loss), Oily streaks, and Ineffective fish passages. These issues are not only ecological; they are a sign of an inefficient and outdated approach.</p>

                <h2>Practical Solutions: Paths to Symbiosis with Nature</h2>
                <p>The key is a holistic approach that views the river as a single system. **Sediment Management** (e.g., controlled flushing) and **Natural Fish Passes** secure the long-term health of the river and, crucially for owners, prevent regulatory issues and ensure permanent operating licenses.</p>

                <div class="cta-footer">
                    <strong>It is time for change. Have you struggled with unaddressed problems at your plant?</strong>
                    <a href="/index.html#contact" class="cta-button">SHARE YOUR EXPERIENCE</a>
                </div>
            </div>
        `
    },
    
    // MODUL 10: The "Check Engine Light" of Your Turbine
    {
        id: 'module10',
        icon: '🌡️',
        title: 'The "Check Engine Light" of Your Turbine',
        subtitle: '5 Symptoms You Should Never Ignore',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🌡️ The "Check Engine Light" of Your Turbine: 5 Symptoms You Should Never Ignore</h1>
                
                <p class="article-intro">
                    Unexpected failures don't happen overnight. They are the result of cumulative stress from issues like abrasion, cavitation, and bearing wear. Your best defense is a proactive approach, which means learning to read the subtle cues your turbine is giving you.
                </p>

                <h2>Your Diagnostic Toolkit: 5 Key Indicators</h2>
                
                <h3>1. Unusual Noise</h3>
                <p>Thumping often indicates issues with cavitation. Squealing/Grinding signals bearing problems. Rattling is a common sign of loose parts.</p>

                <h3>2. Changes in Vibration</h3>
                <p>Your hands are your best sensor. Vibrations intensify over time and can signal a variety of problems, from an unbalanced rotor to damaged bearings.</p>
                
                <h3>3. Abnormal Temperature</h3>
                <p>A sudden spike in bearing or oil temperature is a major red flag, often indicating insufficient lubrication or overloading. Simple visual checks can prevent you from overheating vital components.</p>
                
                <div class="cta-footer">
                    <strong>Field experience has taught me that simple, low-cost inspections are far more effective than expensive, last-minute repairs.</strong>
                    <a href="/index.html#contact" class="cta-button">CONNECT WITH OUR EXPERTISE</a>
                </div>
            </div>
        `
    },

    // MODUL 11: From Reactive to Predictive (Digital Twin)
    {
        id: 'module11',
        icon: '💻',
        title: 'From Reactive to Predictive',
        subtitle: 'The Digital Twin’s Role in Hydropower Maintenance',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>💻 From Reactive to Predictive: The Digital Twin’s Role in Hydropower Maintenance</h1>

                <h2>What is a Digital Twin?</h2>
                <p>A digital twin is a virtual replica of a physical object, system, or process. It's created using data collected from sensors, allowing it to behave and react in the same way as its physical counterpart.</p>

                <h2>How a Digital Twin Helps in Practice</h2>
                <p>This technology transforms maintenance from a reactive to a predictive process. Instead of waiting for a breakdown, you predict the problem. This includes <strong>Early Detection of Abrasion and Cavitation</strong>, <strong>Performance Optimization</strong> through simulation, and <strong>Predictive Maintenance</strong> eliminating expensive, unplanned emergency repairs.</p>
                
                <div class="cta-footer">
                    <strong>Abrasion, cavitation, loss of efficiency—let's find better solutions together.</strong>
                    <a href="/index.html#contact" class="cta-button">CONNECT WITH ME</a>
                </div>
            </div>
        `
    },
    
    // MODUL 12: M-E Synergy (Holistic Audit)
    {
        id: 'module12',
        icon: '🔌',
        title: 'M-E Synergy: The Holistic Audit',
        subtitle: 'Against Electro-Mechanical Failures',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🔌 M-E Synergy: Why Electrical Flaws Cause Mechanical Breakdown</h1>
                <p class="article-intro">The classic division between mechanical and electrical engineering is the biggest risk factor. Errors in the electrical subsystem—such as poor grounding or faulty automation—transmit stress directly to the mechanical heart of the turbine, causing electro-erosion and vibration.</p>

                <h2>1. The Double Audit Mandate</h2>
                <p>Our protocol mandates the integration of mechanical and electrical auditing: We check both the mechanical QC (Laser alignment) and the electrical documentation (HOAI/VDE standards) to eliminate the source of the electrical stress.</p>
                
                <div class="cta-footer">
                    <strong>Ensure your mechanical investment is protected from electrical flaws.</strong>
                    <a href="/index.html#e-usluge" class="cta-button">DOWNLOAD HOAI ELECTRICAL SERVICE GUIDE</a>
                </div>
            </div>
        `
    },
    
    // MODUL 13: The Unseen Threat: Sediment and Silt
    {
        id: 'module13',
        icon: '⏳',
        title: 'The Unseen Threat: Sediment and Silt',
        subtitle: 'Eroding Profits, Endangering Assets',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>⏳ The Unseen Threat: Sediment and Silt Are Eroding Hydropower Profits</h1>

                <h2>Defining the Damage: Abrasion vs. Cavitation</h2>
                <p>To fight the problem, you first need to understand the enemy. While both lead to turbine damage, abrasion and cavitation are entirely different phenomena.</p>
                <p><strong>Abrasion</strong> is mechanical wear caused by solid particles in the water. Francis and Kaplan turbines are susceptible to both, while Pelton turbines are highly vulnerable to abrasion alone.</p>
                
                <h2>Protecting Your Investment: The Simple Solution</h2>
                <p>The most effective strategy against sediment is prevention. The best line of defense is a **settling basin or sand trap**. The key to a successful sand trap is a regular flushing and maintenance schedule to remove built-up sediment, protecting your turbine and extending its lifespan.</p>
                
                <div class="cta-footer">
                    <strong>A small investment in a sand trap could save you from a major turbine overhaul.</strong>
                    <a href="/index.html#contact" class="cta-button">SHARE YOUR EXPERIENCES</a>
                </div>
            </div>
        `
    },

    // MODUL 14: 3D Flow Analysis: Ultra-High Head Risk
    {
        id: 'module14',
        icon: '🔬',
        title: '3D Flow Analysis: Ultra-High Head Risk',
        subtitle: 'The Necessity of Full System Simulation (CFD)',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>🔬 3D Flow Analysis: Ultra-High Head Risk and System Coupling</h1>

                <h2>Key Findings: The System is Interconnected</h2>
                <p>This analysis, based on 3D simulations of an ultra-high-head pumped storage unit, demonstrates that severe pressure pulsations significantly threaten operational safety.</p>
                <p><strong>Bidirectional Coupling:</strong> The study reveals a strong bidirectional coupling between the flow in the long outlet pipe and the internal flow within the pump-turbine unit.</p>
                <p><strong>Strategic Takeaway:</strong> Ignoring 3D flow within these long pipelines may result in significant errors in predicting internal flow characteristics and dynamic instability, directly relating to the <strong>48% dynamic risk factor</strong> we seek to mitigate.</p>
                
                <div class="cta-footer">
                    <strong>Is your predictive maintenance based on 1D flow models? Upgrade to the AnoHUB Digital Protocol.</strong>
                    <a href="/index.html#contact" class="cta-button">REQUEST ADVANCED AUDIT</a>
                </div>
            </div>
        `
    },
    
    // MODUL 15: The SCADA-to-CEO Gap (HHI)
    {
        id: 'module15',
        icon: '📈',
        title: 'The SCADA-to-CEO Gap',
        subtitle: 'Bridging Data and Strategic Budgeting',
        status: 'Published',
        content: `
            <div class="article-container">
                <h1>📈 The SCADA-to-CEO Gap: Bridging Data and Strategic Budgeting</h1>
                <p class="article-intro">Traditional monitoring generates massive amounts of data (vibration, temperature, flow) but fails to answer the strategic question: "How does this affect my CAPEX budget and the asset's lifespan?" This is the SCADA-to-CEO Gap.</p>
                
                <h2>The Hydro Health Index (HHI) Solution</h2>
                <p>We use AI and advanced analytics to create the **Hydro Health Index (HHI)**. HHI je a single composite score (0-100%) that aggregates operational metrics into a measurable assessment of risk and Remaining Useful Life (RUL).</p>
                
                <p><strong>Impact:</strong></p>
                <ul>
                    <li>**Proactive Budgeting:** Replace reactive failure costs with predicted, optimized investments.</li>
                    <li>**ROI-focused Maintenance:** Justify component repair costs by directly quantifying the increase in HHI and delayed costs.</li>
                    <li>**Risk Reduction:** Leaders gain immediate insight into the true risk of the entire portfolio, avoiding catastrophic failures.</li>
                </ul>

                <div class="cta-footer">
                    <strong>AnoHUB translates engineering complexity into the language of finance, making your digital transformation a profit center.</strong>
                    <a href="/index.html#contact" class="cta-button">REQUEST EXECUTIVE BRIEFING ON HHI</a>
                </div>
            </div>
        `
    },
];

// GLAVNA FUNKCIJA ZA RENDERIRANJE KARTICA
function renderInsights(data) {
    const list = document.getElementById('insights-list');
    const contentWrapper = document.getElementById('article-content-wrapper');
    if (!list || !contentWrapper) return;

    data.forEach(item => {
        // 1. Kreiranje Kartice (Slider Item)
        const card = document.createElement('div');
        card.className = 'insight-card flex-shrink-0 w-80 p-6 rounded-xl bg-slate-800 border border-cyan-500/50 cursor-pointer relative';
        card.setAttribute('onclick', `openModal('${item.id}')`);
        
        const isPublished = item.status === 'Published';
        // TEKST KARTICE JE NA ENGLESKOM
        const statusText = isPublished ? 'CLICK TO READ' : item.status;
        const statusColor = isPublished ? 'text-cyan-400' : 'text-slate-400';
        
        // Generisanje pregleda sadržaja za karticu
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
        
        // 2. Kreiranje Skrivenog Sadržaja za Modal
        // Ovdje koristimo klasični Tailwind "hidden"
        const articleDiv = document.createElement('div');
        articleDiv.id = item.id + '-content';
        articleDiv.className = 'article-container hidden'; 
        articleDiv.innerHTML = item.content;
        contentWrapper.appendChild(articleDiv);
    });
}


// GLAVNE FUNKCIJE ZA MODAL (Globalne)
function openModal(moduleId) {
    const modal = document.getElementById('article-modal');
    const contentArea = document.getElementById('modal-content-area');

    // Sakrij sav sadržaj
    document.querySelectorAll('#article-content-wrapper .article-container').forEach(content => {
        // Koristimo Tailwind klasu
        content.classList.add('hidden'); 
    });
    
    // Prikaži samo ciljani sadržaj
    const targetContent = document.getElementById(moduleId + '-content');
    if (targetContent) {
        // OVO UKLANJA KLASU 'hidden' KOJA TREBA DA PRIKAŽE SADRŽAJ
        targetContent.classList.remove('hidden'); 
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
    // Moramo inicijalizirati Lucide ikone i renderirati podatke
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    renderInsights(insightData); // Pokreće generisanje kartica
    
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