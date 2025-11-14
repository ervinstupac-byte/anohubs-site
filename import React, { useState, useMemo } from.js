import React, { useState, useMemo } from 'react';

// --- STILOVI I KONSTANTE (INTERNAL) ---
const COLORS = {
    PRIMARY: '#22d3ee', // Cyan
    SECONDARY: '#4ade80', // Green
    RISK: '#ef4444', // Red
    SLATE: '#1E293B', // Dark Slate
};

// Metrika rizika: Stvarni (tehnički) životni vek ležaja u satima
const BASE_LIFE_HOURS = 100000; 

// Uticaj devijacije na faktor smanjenja životnog veka (Simulacija)
const getLifeFactor = (deviation_mm) => {
    // 0.05 mm/m je nulta tolerancija (faktor 1.0)
    // 0.20 mm/m (Visoki rizik) smanjuje život za 60-80%
    if (deviation_mm <= 0.05) return 1.0;
    if (deviation_mm <= 0.10) return 0.85;
    if (deviation_mm <= 0.15) return 0.60;
    if (deviation_mm <= 0.20) return 0.35;
    return 0.20; // Ekstremna devijacija
};

// --- GLAVNA KOMPONENTA ---
const RiskDashboard = () => {
    const [shaftLength, setShaftLength] = useState(5.0); // Dužina vratila (metri)
    const [measuredDeviation, setMeasuredDeviation] = useState(0.12); // Izmerena devijacija (mm/m)

    // Izračunavanje metrike rizika
    const riskMetrics = useMemo(() => {
        const standardTolerance = 0.05; // 0.05 mm/m
        const standardVibration = 4.5; // Tipičan ISO limit u mm/s
        
        const deviationRatio = measuredDeviation / standardTolerance;
        const lifeFactor = getLifeFactor(measuredDeviation);
        const remainingLifeHours = BASE_LIFE_HOURS * lifeFactor;

        // Simulacija LCC udara
        const lifetimeImpact = (1 - lifeFactor) * 100;

        return {
            standardTolerance,
            lifeFactor: lifeFactor.toFixed(2),
            remainingLifeHours: Math.round(remainingLifeHours).toLocaleString(),
            deviationRatio: deviationRatio.toFixed(1),
            lifetimeImpact: lifetimeImpact.toFixed(0),
            status: measuredDeviation <= standardTolerance ? 'Optimal' : (measuredDeviation <= 0.15 ? 'Moderate Risk' : 'Critical Risk'),
            color: measuredDeviation <= standardTolerance ? COLORS.SECONDARY : (measuredDeviation <= 0.15 ? COLORS.CTA : COLORS.RISK)
        };
    }, [shaftLength, measuredDeviation]);

    return (
        <div 
            className="p-6 sm:p-10 rounded-xl shadow-2xl space-y-10" 
            style={{ backgroundColor: COLORS.SLATE }}
        >
            <header className="text-center">
                <h1 className="text-3xl font-black mb-2" style={{ color: COLORS.PRIMARY }}>
                    Alignment Risk Quantification (0.05 mm/m Standard)
                </h1>
                <p className="text-slate-400">
                    Visualize the direct financial impact of the **Execution Gap** on bearing life and LCC.
                </p>
            </header>

            {/* --- 1. KONTROLNI PANEL (INPUTS) --- */}
            <div className="bg-slate-700/50 p-6 rounded-lg grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-300">
                        Shaft Length (Meters): {shaftLength} m
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.1"
                        value={shaftLength}
                        onChange={(e) => setShaftLength(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer range-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1 text-slate-300">
                        Measured Alignment Deviation (mm/m): {measuredDeviation} mm/m
                    </label>
                    <input
                        type="range"
                        min="0.01"
                        max="0.25"
                        step="0.01"
                        value={measuredDeviation}
                        onChange={(e) => setMeasuredDeviation(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer range-lg"
                    />
                </div>
            </div>

            {/* --- 2. REZULTATI I STATUS --- */}
            <div className="grid lg:grid-cols-4 gap-4 text-center">
                
                {/* STATUS BAR */}
                <div 
                    className="p-4 rounded-lg shadow-inner lg:col-span-4"
                    style={{ backgroundColor: riskMetrics.color }}
                >
                    <h2 className="text-3xl font-black text-white uppercase">
                        CURRENT STATUS: {riskMetrics.status}
                    </h2>
                </div>

                {/* Rem. Life Hours */}
                <div className="p-4 bg-slate-700/80 rounded-lg">
                    <p className="text-4xl font-extrabold" style={{ color: COLORS.PRIMARY }}>
                        {riskMetrics.remainingLifeHours}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">Remaining Life (Hours, L10)</p>
                </div>

                {/* Life Impact */}
                <div className="p-4 bg-slate-700/80 rounded-lg">
                    <p className="text-4xl font-extrabold" style={{ color: COLORS.RISK }}>
                        -{riskMetrics.lifetimeImpact}%
                    </p>
                    <p className="text-sm text-slate-400 mt-1">Total Bearing Life Impact</p>
                </div>
                
                {/* Standard Ratio */}
                <div className="p-4 bg-slate-700/80 rounded-lg">
                    <p className="text-4xl font-extrabold" style={{ color: COLORS.CTA }}>
                        {riskMetrics.deviationRatio}X
                    </p>
                    <p className="text-sm text-slate-400 mt-1">Deviation vs. 0.05 mm/m Standard</p>
                </div>
                
                {/* Precision Mandate */}
                <div className="p-4 bg-slate-700/80 rounded-lg">
                    <p className="text-4xl font-extrabold" style={{ color: COLORS.SECONDARY }}>
                        0.05 mm/m
                    </p>
                    <p className="text-sm text-slate-400 mt-1">AnoHUB Precision Mandate</p>
                </div>

            </div>

            {/* --- 3. EDUKACIJA I AKCIJA --- */}
            <div className="space-y-6 pt-4">
                <h2 className="text-3xl font-bold text-hydro-primary">The Execution Gap & Cost Implications</h2>
                <p className="text-slate-300">
                    Your current measured deviation of **{measuredDeviation} mm/m** confirms an **Execution Gap** that violates the non-negotiable AnoHUB standard ({riskMetrics.standardTolerance} mm/m). This lack of installation discipline results in a direct **{riskMetrics.lifetimeImpact}% reduction** in the expected life of critical rotating components.
                </p>
                
                <blockquote 
                    className="p-4 rounded-lg italic text-sm" 
                    style={{ borderLeft: `4px solid ${COLORS.RISK}`, backgroundColor: COLORS.CHARCOAL }}
                >
                    "Ignoring this misalignment is equivalent to deliberately sacrificing **{remainingLifeHours} hours** of operational life. This is the true cost of compromise."
                </blockquote>
                
                <h3 className="text-2xl font-bold text-hydro-secondary">Actionable Insights</h3>
                <p className="text-slate-300">
                    AnoHUB provides expert supervision to ensure corrective action meets the 0.05 mm/m standard, thereby mitigating the **48% dynamic risk** (vibration induced by misalignment) and optimizing the Total Life Cycle Cost (LCC) of your asset.
                </p>
                
                <div className="pt-4 text-center">
                    <a href="/index.html#contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-bold rounded-full text-hydro-charcoal bg-hydro-cta hover:bg-yellow-600 transition duration-300 transform hover:scale-105 shadow-xl">
                        Request Expert Analysis of Misalignment &rarr;
                    </a>
                </div>
            </div>
            {/* Ostavljamo dugačak tekst za proveru skrolovanja */}
            <div style={{ height: '300px' }} className="text-slate-800">
                .
            </div>
        </div>
    );
};

export default RiskDashboard;