/**
 * gallery-protection.js
 * Implementira zaštitu sadržaja:
 * 1. Onemogućava desni klik (contextmenu) na slikama.
 * 2. Onemogućava povlačenje i ispuštanje (dragstart) slika.
 */

document.addEventListener('contextmenu', function(e) {
    // Ako je cilj klika bilo koji IMG tag ili element unutar galerije
    if (e.target.tagName === 'IMG' || e.target.closest('.gallery-grid') || e.target.closest('#lightbox-modal')) {
        e.preventDefault();
        // Opcionalno: return false;
    }
});

document.addEventListener('dragstart', function(e) {
    // Ako je cilj povlačenja bilo koji IMG tag
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Dodatna zaštita za tastaturu (onemogućava F12, Ctrl+Shift+I, Ctrl+S na nekim preglednicima)
document.addEventListener('keydown', function(e) {
    // Ctrl+S (Save)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
    }
});