/**
 * Deep Polish Script - Batch Update HTML Files
 * Adds favicon links and noscript blocks to all HTML files
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_DIR = __dirname;
const EXCLUDE_DIRS = ['node_modules', 'components', '.git', '.gemini'];

// Favicon links template
const getFaviconLinks = (basePath) => `
    <!-- Favicons -->
    <link rel="icon" type="image/png" sizes="32x32" href="${basePath}favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="${basePath}favicon-16x16.png">
    <link rel="apple-touch-icon" href="${basePath}apple-touch-icon.png">
    <link rel="manifest" href="${basePath}site.webmanifest">`;

// No script block
const NOSCRIPT_BLOCK = `
    <noscript>
        <div style="border: 1px solid #ef4444; padding: 20px;">
            <h1 style="color: #ef4444; font-size: 24px; margin-bottom: 10px;">SYSTEM ERROR: SCRIPT BLOCKED</h1>
            <p>The AnoHUB Protocol requires JavaScript to function.<br>Please enable scripts to access the interface.</p>
        </div>
    </noscript>`;

/**
 * Recursively find all HTML files
 */
function findHTMLFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const dirName = path.basename(filePath);
            if (!EXCLUDE_DIRS.includes(dirName)) {
                findHTMLFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

/**
 * Determine the correct base path for assets
 */
function getBasePath(filePath) {
    const relativePath = path.relative(ROOT_DIR, filePath);
    const depth = relativePath.split(path.sep).length - 1;

    if (depth === 0) {
        return 'assets/'; // Root level
    } else {
        return '../'.repeat(depth) + 'assets/'; // Subfolder
    }
}

/**
 * Check if content already exists in file
 */
function hasContent(content, searchString) {
    return content.includes(searchString);
}

/**
 * Add favicon links to <head> if not present
 */
function addFaviconLinks(htmlContent, basePath) {
    if (hasContent(htmlContent, 'favicon-32x32.png')) {
        console.log('  ↳ Favicons already present, skipping...');
        return htmlContent;
    }

    const headCloseIndex = htmlContent.indexOf('</head>');
    if (headCloseIndex === -1) {
        console.log('  ⚠ No </head> tag found, skipping favicons...');
        return htmlContent;
    }

    const faviconLinks = getFaviconLinks(basePath);
    const updatedContent = htmlContent.slice(0, headCloseIndex) +
        faviconLinks + '\n' +
        htmlContent.slice(headCloseIndex);

    console.log('  ✓ Added favicon links');
    return updatedContent;
}

/**
 * Add noscript block after <body> if not present
 */
function addNoscriptBlock(htmlContent) {
    if (hasContent(htmlContent, '<noscript>')) {
        console.log('  ↳ Noscript block already present, skipping...');
        return htmlContent;
    }

    const bodyOpenRegex = /<body[^>]*>/i;
    const match = htmlContent.match(bodyOpenRegex);

    if (!match) {
        console.log('  ⚠ No <body> tag found, skipping noscript...');
        return htmlContent;
    }

    const bodyEndIndex = match.index + match[0].length;
    const updatedContent = htmlContent.slice(0, bodyEndIndex) +
        NOSCRIPT_BLOCK + '\n' +
        htmlContent.slice(bodyEndIndex);

    console.log('  ✓ Added noscript block');
    return updatedContent;
}

/**
 * Process a single HTML file
 */
function processHTMLFile(filePath) {
    const fileName = path.basename(filePath);
    const relativePath = path.relative(ROOT_DIR, filePath);

    console.log(`\nProcessing: ${relativePath}`);

    try {
        let htmlContent = fs.readFileSync(filePath, 'utf8');
        const basePath = getBasePath(filePath);

        // Add favicon links
        htmlContent = addFaviconLinks(htmlContent, basePath);

        // Add noscript block
        htmlContent = addNoscriptBlock(htmlContent);

        // Explicit content update for expert-insights.html links (Deep Polish Extra)
        if (htmlContent.includes('insights/expert-insights.html')) {
            htmlContent = htmlContent.replace(/insights\/expert-insights\.html/g, 'insights/');
            console.log('  ✓ Updated insights/expert-insights.html links to insights/');
        }

        // Write back to file
        fs.writeFileSync(filePath, htmlContent, 'utf8');

    } catch (error) {
        console.error(`  ✗ Error processing ${fileName}:`, error.message);
    }
}

/**
 * Main execution
 */
function main() {
    console.log('==========================================');
    console.log('  AnoHUB Deep Polish - Batch HTML Update');
    console.log('==========================================\n');
    console.log('Searching for HTML files...\n');

    const htmlFiles = findHTMLFiles(ROOT_DIR);

    console.log(`Found ${htmlFiles.length} HTML files\n`);
    console.log('Starting updates...');

    let processedCount = 0;
    let skippedCount = 0;

    htmlFiles.forEach(filePath => {
        const initialContent = fs.readFileSync(filePath, 'utf8');
        processHTMLFile(filePath);
        const finalContent = fs.readFileSync(filePath, 'utf8');

        if (initialContent !== finalContent) {
            processedCount++;
        } else {
            skippedCount++;
        }
    });

    console.log('\n==========================================');
    console.log('  SUMMARY');
    console.log('==========================================');
    console.log(`Total files scanned:  ${htmlFiles.length}`);
    console.log(`Files updated:        ${processedCount}`);
    console.log(`Files skipped:        ${skippedCount}`);
    console.log('\n✓ Deep Polish Complete!\n');
}

// Run the script
main();
