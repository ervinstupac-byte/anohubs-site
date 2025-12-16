const fs = require('fs');
const path = require('path');

// Configuration
const protocolDir = path.join(__dirname, 'protocol');
const masterFile = 'anohub_alignment_v2.html';

// 1. Read Master Template
const masterPath = path.join(protocolDir, masterFile);
if (!fs.existsSync(masterPath)) {
    console.error(`Master file not found: ${masterPath}`);
    process.exit(1);
}
let template = fs.readFileSync(masterPath, 'utf8');

// 2. Prepare Template "Skeleton"
// We need to keep:
// - Header (lines 1-229 approx) -> Up to end of Section 01
// - Footer (lines 334-end approx) -> From Section 04 onwards
// - But we need to replace the Middle bit (Sections 02 & 03)

const section02StartMarker = '<section class="mb-8">\n                    <div class="flex justify-between items-end mb-2">\n                        <h3 class="text-xs font-bold uppercase border-b border-black w-full pb-1">02. SHAFT ALIGNMENT ANALYSIS (RIM/FACE)</h3>';
// Note: \n vs \r\n might vary, using regex or flexible index finding is better.
// Let's find unique strings.
const startMarkerStr = '02. SHAFT ALIGNMENT ANALYSIS (RIM/FACE)';
const endMarkerStr = '04. ENGINEER\'S REMARKS';

const startIdx = template.indexOf(startMarkerStr);
const endIdx = template.indexOf(endMarkerStr);

if (startIdx === -1 || endIdx === -1) {
    console.error("Critical: Could not locate markers in template.");
    // Flexible fallback logic or manual abort
    // Trying to find parent Section tags
}

// Find the <section> tag BEFORE the start marker
const preStartSection = template.lastIndexOf('<section class="mb-8">', startIdx);
// Find the <section> tag BEFORE the end marker (which is the start of Section 4, we want to KEEP Section 4)
const preEndSection = template.lastIndexOf('<section class="mb-8">', endIdx);

if (preStartSection === -1 || preEndSection === -1) {
    console.error("Critical: Could not locate section tags.");
    process.exit(1);
}

// Extract Top and Bottom
const templateTop = template.substring(0, preStartSection);
const templateBottom = template.substring(preEndSection);

// Generic Content to Inject
const genericContent = `
                <section class="mb-8">
                    <h3 class="text-xs font-bold uppercase border-b border-black mb-4">02. STANDARD VALIDATION CHECKLIST</h3>
                    <div class="space-y-2">
                        <label class="flex items-center gap-2 text-xs font-mono border-b border-dotted border-gray-300 pb-1">
                            <input type="checkbox" class="accent-black"> <span>SENSOR CALIBRATION VERIFIED</span>
                        </label>
                        <label class="flex items-center gap-2 text-xs font-mono border-b border-dotted border-gray-300 pb-1">
                            <input type="checkbox" class="accent-black"> <span>BASELINE PARAMETERS ESTABLISHED</span>
                        </label>
                        <label class="flex items-center gap-2 text-xs font-mono border-b border-dotted border-gray-300 pb-1">
                            <input type="checkbox" class="accent-black"> <span>DATA INTEGRITY CHECK: PASS</span>
                        </label>
                        <label class="flex items-center gap-2 text-xs font-mono border-b border-dotted border-gray-300 pb-1">
                            <input type="checkbox" class="accent-black"> <span>SAFETY INTERLOCKS ACTIVE</span>
                        </label>
                        <label class="flex items-center gap-2 text-xs font-mono border-b border-dotted border-gray-300 pb-1">
                            <input type="checkbox" class="accent-black"> <span>PROTOCOL EXECUTION COMPLETE</span>
                        </label>
                    </div>
                </section>

                <section class="mb-8">
                    <h3 class="text-xs font-bold uppercase border-b border-black mb-4">03. MEASUREMENT DATA</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="text-[9px] uppercase font-bold text-gray-400">Parameter A</label><input type="text" class="field" placeholder="Enter value..."></div>
                        <div><label class="text-[9px] uppercase font-bold text-gray-400">Parameter B</label><input type="text" class="field" placeholder="Enter value..."></div>
                        <div><label class="text-[9px] uppercase font-bold text-gray-400">Parameter C</label><input type="text" class="field" placeholder="Enter value..."></div>
                        <div><label class="text-[9px] uppercase font-bold text-gray-400">Notes</label><input type="text" class="field" placeholder="..."></div>
                    </div>
                </section>
`;

// Clean up Scripts
// In templateBottom, we need to remove specific JS.
const scriptStartMarker = '// === 1. ALIGNMENT ENGINE ===';
const scriptEndMarker = '// Init Calls'; // Or just before '});'

// We will just REPLACE the entire Script block logic.
// Find `document.addEventListener('DOMContentLoaded', () => {`
// And the closing `});`
const scriptBlockRegex = /document\.addEventListener\('DOMContentLoaded', \(\) => \{([\s\S]*?)\}\);/m;
const cleanScript = `document.addEventListener('DOMContentLoaded', () => {
            if (window.lucide) lucide.createIcons();
            
            // Set Dates
            const now = new Date().toISOString().split('T')[0];
            const dateInput = document.getElementById('date-now');
            if(dateInput) dateInput.value = now;
            
            const footerDate = document.getElementById('footer-date');
            if(footerDate) footerDate.innerText = now;
            
            const docHash = document.getElementById('doc-hash');
            if(docHash) docHash.innerText = Math.random().toString(36).substring(2, 15).toUpperCase();
        });`;

let finalTemplateBottom = templateBottom.replace(scriptBlockRegex, cleanScript);


// 3. Iterate Files
const files = fs.readdirSync(protocolDir);

files.forEach(file => {
    if (file === masterFile || !file.endsWith('.html')) return;

    // Derive ID and Title
    // format: anohub_cost_v2.html -> topic = COST
    const match = file.match(/anohub_(.*?)_v2\.html/);
    let topic = "UNKNOWN";
    if (match && match[1]) {
        topic = match[1].toUpperCase().replace(/_/g, ' ');
    } else {
        // Fallback
        topic = file.replace('.html', '').toUpperCase();
    }

    const shortId = topic.split(' ')[0].substring(0, 6); // First 6 chars of first word
    const newId = `AH-${shortId}-01`;

    // Construct New Content
    let fileContent = templateTop + genericContent + finalTemplateBottom;

    // Customizations
    // 1. Title Tag
    fileContent = fileContent.replace('<title>AnoHUB | ALIGNMENT AUTHORITY</title>', `<title>AnoHUB | ${topic}</title>`);

    // 2. H1 Header ("AnoHUB Engineering" is generic, maybe keep it? User said "Update H1 Header... to match specific protocol topic")
    // Previous H1: <h1 class="text-4xl font-header font-bold text-black leading-none uppercase">AnoHUB Engineering</h1>
    // We will change it to PROJECT TOPIC
    fileContent = fileContent.replace('>AnoHUB Engineering</h1>', `>AnoHUB ${topic}</h1>`);

    // 3. Subtitle ("HYDRO-MECHANICAL INTEGRITY DIVISION") -> Keep or Update? User: "Simplify... Update H1"
    // Let's keep subtitle generic or update to "PROTOCOL SHEET"
    fileContent = fileContent.replace('HYDRO-MECHANICAL INTEGRITY DIVISION', `${topic} VERIFICATION PROTOCOL`);

    // 4. Protocol ID value
    fileContent = fileContent.replace('value="AH-ALIGN-05"', `value="${newId}"`);

    // Write File
    const filePath = path.join(protocolDir, file);
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`Updated: ${file} -> Topic: ${topic}, ID: ${newId}`);
});

console.log("Standardization Complete.");
