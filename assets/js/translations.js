// ========================================
// ANOHUBS i18n TRANSLATION ENGINE
// JSON-based multilingual support
// ========================================

(function () {
    // Global state
    let currentLang = 'en';
    let translations = {};

    // Initialize on page load
    function init() {
        // Load saved language preference or default to 'en'
        currentLang = localStorage.getItem('anoHubsLang') || 'en';
        loadTranslations(currentLang);
    }

    // Load translation JSON file
    async function loadTranslations(lang) {
        try {
            // Determine if we're in a subfolder
            const isSubfolder = window.location.pathname.includes("/insights/") ||
                window.location.pathname.includes("/case-studies/") ||
                window.location.pathname.includes("/protocol/");

            const basePath = isSubfolder ? "../" : "";

            // Load global translations
            const response = await fetch(`${basePath}assets/i18n/${lang}.json`);

            if (!response.ok) {
                throw new Error(`Failed to load ${lang}.json`);
            }

            translations = await response.json();

            // Check if page has a specific translation source
            const translationSource = document.body.getAttribute('data-translation-source');

            if (translationSource) {
                try {
                    // Load page-specific translations
                    const pageResponse = await fetch(`${basePath}assets/i18n/insights/${translationSource}.${lang}.json`);

                    if (pageResponse.ok) {
                        const pageTranslations = await pageResponse.json();
                        // Merge page-specific translations into global translations
                        translations = { ...translations, ...pageTranslations };
                        console.log(`Loaded page-specific translations: ${translationSource}.${lang}.json`);
                    }
                } catch (pageError) {
                    console.warn(`Page-specific translation file not found: ${translationSource}.${lang}.json`, pageError);
                    // Continue with global translations only
                }
            }

            currentLang = lang;

            // Apply translations immediately
            updateContent();

            // Dispatch custom event for other scripts to react
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { lang: currentLang, translations: translations }
            }));

        } catch (error) {
            console.error('Translation loading error:', error);
            // Fallback to English if loading fails
            if (lang !== 'en') {
                console.warn('Falling back to English');
                loadTranslations('en');
            }
        }
    }

    // Update all elements with data-i18n attributes
    function updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getNestedValue(translations, key);

            if (translation) {
                // Check if we should update innerHTML or textContent
                const useInnerHTML = element.hasAttribute('data-i18n-html');

                if (useInnerHTML) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Handle placeholder translations
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = getNestedValue(translations, key);
            if (translation) {
                element.setAttribute('placeholder', translation);
            }
        });

        // Handle title attribute translations
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = getNestedValue(translations, key);
            if (translation) {
                element.setAttribute('title', translation);
            }
        });

        // Handle aria-label translations
        const ariaElements = document.querySelectorAll('[data-i18n-aria]');
        ariaElements.forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            const translation = getNestedValue(translations, key);
            if (translation) {
                element.setAttribute('aria-label', translation);
            }
        });

        // Update active language button styling
        updateLanguageSwitcher();
    }

    // Get nested value from object using dot notation (e.g., "nav.home")
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    // Update language switcher UI
    function updateLanguageSwitcher() {
        const langButtons = document.querySelectorAll('[data-lang]');

        langButtons.forEach(button => {
            const buttonLang = button.getAttribute('data-lang');

            if (buttonLang === currentLang) {
                button.classList.add('text-white', 'font-bold');
                button.classList.remove('text-slate-400');
            } else {
                button.classList.remove('text-white', 'font-bold');
                button.classList.add('text-slate-400');
            }
        });
    }

    // Global function to change language
    window.changeLanguage = function (lang) {
        if (lang === currentLang) {
            return; // Already using this language
        }

        // Save preference
        localStorage.setItem('anoHubsLang', lang);

        // Load new translations
        loadTranslations(lang);
    };

    // Expose updateContent globally for layout-loader to call
    window.updateContent = updateContent;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();