const i18n = {
    currentLang: localStorage.getItem('anohub_lang') || 'en',
    translations: {},
    // 1. Initialize System
    async init() {
        console.log(`[i18n] Initializing language: ${this.currentLang}`);
        await this.loadTranslations(this.currentLang);
        this.updatePage();
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
    },
    // 2. Load JSON
    async loadTranslations(lang) {
        try {
            // Check if we are in a subfolder
            const basePath = window.location.pathname.includes('/insights/') ||
                window.location.pathname.includes('/protocol/') ||
                window.location.pathname.includes('/case-studies/') ? '../' : '';

            const response = await fetch(`${basePath}assets/i18n/${lang}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            this.translations = await response.json();
            console.log(`[i18n] Loaded ${lang} data:`, this.translations);
        } catch (e) {
            console.error('[i18n] Failed to load translations:', e);
        }
    },
    // 3. Change Language (Called by buttons)
    async setLanguage(lang) {
        console.log(`[i18n] Switching to ${lang}...`);
        this.currentLang = lang;
        localStorage.setItem('anohub_lang', lang);
        await this.loadTranslations(lang);
        this.updatePage();

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    },
    // 4. Update HTML Elements
    updatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        console.log(`[i18n] Updating ${elements.length} elements...`);

        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = this.getNestedValue(this.translations, key);

            if (value) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = value;
                } else if (el.tagName === 'META') {
                    el.setAttribute('content', value);
                } else if (el.tagName === 'IMG') {
                    el.alt = value;
                } else {
                    el.innerHTML = value; // innerHTML allows formatting tags
                }
            } else {
                console.warn(`[i18n] Missing key: ${key}`);
            }
        });

        // Update Active Button State
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('text-h-cyan', 'font-bold');
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('text-h-cyan', 'font-bold');
            }
        });
    },
    // Helper: Find "hero.title" inside object
    getNestedValue(obj, path) {
        return path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : null;
        }, obj);
    }
};

// Expose globally
window.changeLanguage = (lang) => i18n.setLanguage(lang);
window.getTrans = (key) => i18n.getNestedValue(i18n.translations, key);

// Auto-start
document.addEventListener('DOMContentLoaded', () => i18n.init());