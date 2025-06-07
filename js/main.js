// NHS One-Page Website - Main Application

class NHSApp {
  constructor() {
    this.i18n = null;
    this.formHandler = null;
    this.currentLanguage = 'en';
    this.supportedLanguages = ['en', 'es', 'fr', 'ar', 'zh', 'ur', 'pl'];
    
    this.init();
  }

  async init() {
    try {
      await this.initializeTranslation();
      this.setupGlobalEventListeners();
      this.setupAccessibility();
      this.handleUrlParameters();
      
      console.log('NHS App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize NHS App:', error);
    }
  }

  async initializeTranslation() {
    // Initialize i18n system
    this.i18n = new I18nSystem();
    
    // Detect user language
    const userLanguage = this.detectUserLanguage();
    
    // Load translations
    await this.i18n.loadLanguage(userLanguage);
    
    // Create language selector
    this.createLanguageSelector();
  }

  detectUserLanguage() {
    // Priority: URL parameter > saved preference > browser language > default
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    
    if (urlLang && this.supportedLanguages.includes(urlLang)) {
      return urlLang;
    }
    
    const savedLang = NHS.Storage.get('nhsLanguage');
    if (savedLang && this.supportedLanguages.includes(savedLang)) {
      return savedLang;
    }
    
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    return this.supportedLanguages.includes(langCode) ? langCode : 'en';
  }

  createLanguageSelector() {
    // Language selector buttons are already in HTML, so we'll just set up event listeners
    const languageButtons = document.querySelectorAll('.language-btn');
    
    languageButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const langCode = e.target.getAttribute('data-lang');
        if (langCode) {
          this.changeLanguage(langCode);
          
          // Update active state
          languageButtons.forEach(btn => btn.classList.remove('language-btn--active'));
          e.target.classList.add('language-btn--active');
        }
      });
    });
  }

  async changeLanguage(languageCode) {
    if (!this.supportedLanguages.includes(languageCode)) {
      console.warn(`Unsupported language: ${languageCode}`);
      return;
    }
    
    try {
      await this.i18n.loadLanguage(languageCode);
      this.currentLanguage = languageCode;
      NHS.Storage.set('nhsLanguage', languageCode);
      
      // Update URL parameter
      const url = new URL(window.location);
      url.searchParams.set('lang', languageCode);
      window.history.replaceState({}, '', url);
      
      NHS.A11y.announce(`Language changed to ${languageCode}`, 'polite');
    } catch (error) {
      console.error(`Failed to change language to ${languageCode}:`, error);
      NHS.A11y.announce('Failed to change language', 'assertive');
    }
  }

  setupGlobalEventListeners() {
    // Handle window resize
    window.addEventListener('resize', NHS.Events.throttle(() => {
      this.handleResize();
    }, 250));
    
    // Handle scroll for registration banner
    window.addEventListener('scroll', NHS.Events.throttle(() => {
      this.handleScroll();
    }, 100));
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Tab became visible, check for updates
        this.handleTabVisible();
      }
    });
    
    // Handle online/offline status
    window.addEventListener('online', () => {
      NHS.A11y.announce('Connection restored', 'polite');
    });
    
    window.addEventListener('offline', () => {
      NHS.A11y.announce('Connection lost. Your progress is saved locally.', 'assertive');
    });
    
    // Handle beforeunload (page refresh/close)
    window.addEventListener('beforeunload', (e) => {
      // Only show warning if form has data
      if (this.formHandler && this.hasUnsavedData()) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    });
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleGlobalKeyboard(e);
    });
  }

  setupAccessibility() {
    // Add skip link
    const skipLink = NHS.DOM.create('a', {
      href: '#main',
      className: 'skip-link'
    }, 'Skip to main content');
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark if not present
    const main = NHS.DOM.$('main');
    if (main && !main.id) {
      main.id = 'main';
    }
    
    // Enhance focus indicators for keyboard users
    let isUsingKeyboard = false;
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        isUsingKeyboard = true;
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      isUsingKeyboard = false;
      document.body.classList.remove('keyboard-navigation');
    });
    
    // Announce page load to screen readers
    setTimeout(() => {
      NHS.A11y.announce('NHS participant registration form loaded', 'polite');
    }, 1000);
  }

  handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle step parameter
    const step = urlParams.get('step');
    if (step && this.formHandler) {
      const stepNumber = parseInt(step, 10);
      if (stepNumber >= 1 && stepNumber <= 5) {
        setTimeout(() => {
          this.formHandler.goToStep(stepNumber);
        }, 100);
      }
    }
    
    // Handle debug mode
    if (urlParams.get('debug') === 'true') {
      this.enableDebugMode();
    }
  }

  handleResize() {
    // Update device-specific behaviors
    const isMobile = NHS.Device.isMobile();
    const isTablet = NHS.Device.isTablet();
    const isDesktop = NHS.Device.isDesktop();
    
    // Update body classes for CSS targeting
    document.body.classList.toggle('is-mobile', isMobile);
    document.body.classList.toggle('is-tablet', isTablet);
    document.body.classList.toggle('is-desktop', isDesktop);
    
    // Adjust focus behavior for touch devices
    if (NHS.Device.isTouchDevice()) {
      document.body.classList.add('is-touch');
    }
  }

  handleScroll() {
    const scrollY = window.scrollY;
    const registrationBanner = document.getElementById('registrationBanner');
    
    if (registrationBanner) {
      // Show banner when user scrolls down from the top (after 100px)
      if (scrollY > 100) {
        registrationBanner.classList.add('registration-banner--visible');
        registrationBanner.classList.remove('registration-banner--inactive');
        registrationBanner.classList.add('registration-banner--active');
      } else {
        registrationBanner.classList.remove('registration-banner--visible');
        registrationBanner.classList.add('registration-banner--inactive');
        registrationBanner.classList.remove('registration-banner--active');
      }
    }
  }

  handleTabVisible() {
    // Check if form data needs to be refreshed
    if (this.formHandler) {
      // Validate current form state
      this.formHandler.updateRegistrationBanner();
    }
  }

  hasUnsavedData() {
    const savedData = NHS.Storage.get('nhsFormData');
    return savedData && Object.keys(savedData.fields || {}).length > 0;
  }

  handleGlobalKeyboard(e) {
    // Global keyboard shortcuts
    if (e.altKey) {
      switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          e.preventDefault();
          const stepNumber = parseInt(e.key, 10);
          if (this.formHandler) {
            this.formHandler.goToStep(stepNumber);
          }
          break;
        case 'r':
          e.preventDefault();
          if (this.formHandler) {
            this.formHandler.resetForm();
            NHS.A11y.announce('Form reset', 'assertive');
          }
          break;
        case 'h':
          e.preventDefault();
          this.showKeyboardHelp();
          break;
      }
    }
    
    // Escape key handling
    if (e.key === 'Escape') {
      // Close any open modals or dropdowns
      this.closeAllModals();
    }
  }

  showKeyboardHelp() {
    const helpText = `
      Keyboard shortcuts:
      - Ctrl + Arrow Left/Right: Navigate between steps
      - Alt + 1-5: Jump to specific step
      - Alt + R: Reset form
      - Alt + H: Show this help
      - Tab: Navigate through form fields
      - Space/Enter: Activate buttons and checkboxes
    `;
    
    NHS.A11y.announce(helpText, 'assertive');
  }

  closeAllModals() {
    // Close any open modal dialogs or dropdowns
    const modals = NHS.DOM.$$('.modal, .dropdown-open');
    modals.forEach(modal => {
      modal.style.display = 'none';
      modal.classList.remove('modal--open', 'dropdown-open');
    });
  }

  enableDebugMode() {
    console.log('Debug mode enabled');
    
    // Add debug styles
    const debugStyles = NHS.DOM.create('style');
    debugStyles.textContent = `
      .debug-info {
        position: fixed;
        top: 60px;
        right: 20px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        font-size: 12px;
        z-index: 9999;
        border-radius: 4px;
      }
    `;
    document.head.appendChild(debugStyles);
    
    // Add debug info panel
    const debugPanel = NHS.DOM.create('div', { className: 'debug-info' });
    document.body.appendChild(debugPanel);
    
    // Update debug info
    const updateDebugInfo = () => {
      const info = {
        step: this.formHandler?.getCurrentStep() || 'N/A',
        language: this.currentLanguage,
        device: NHS.Device.isMobile() ? 'Mobile' : NHS.Device.isTablet() ? 'Tablet' : 'Desktop',
        online: navigator.onLine,
        savedData: !!NHS.Storage.get('nhsFormData')
      };
      
      debugPanel.innerHTML = Object.entries(info)
        .map(([key, value]) => `${key}: ${value}`)
        .join('<br>');
    };
    
    // Update debug info every second
    setInterval(updateDebugInfo, 1000);
    updateDebugInfo();
  }

  // Public API methods
  getFormHandler() {
    return this.formHandler;
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getSupportedLanguages() {
    return [...this.supportedLanguages];
  }
}

// Simple I18n System
class I18nSystem {
  constructor() {
    this.currentLanguage = 'en';
    this.translations = {};
    this.fallbackLanguage = 'en';
  }

  async loadLanguage(languageCode) {
    try {
      // For now, we'll use a simple fallback system
      // In a real implementation, you would fetch from assets/translations/
      this.translations[languageCode] = await this.loadTranslationFile(languageCode);
      this.currentLanguage = languageCode;
      this.translatePage();
      this.updateDirection(languageCode);
    } catch (error) {
      console.warn(`Failed to load ${languageCode}, falling back to English`);
      if (languageCode !== this.fallbackLanguage) {
        await this.loadLanguage(this.fallbackLanguage);
      }
    }
  }

  async loadTranslationFile(languageCode) {
    // Simplified translation loading
    // In production, this would fetch from assets/translations/${languageCode}.json
    const translations = {
      en: {
        'header.title': 'You have been randomly selected to help shape the future of NHS',
        'header.subtitle': 'This form will take less than 3 minutes. All selected participants will receive £175.',
        'form.step1.title': 'Eligibility Confirmation',
        'form.step1.description': 'Please confirm that you are eligible to participate in this NHS survey.',
        'form.step1.question': 'Are you eligible to participate?',
        'form.step1.yes': 'Yes',
        'form.step1.no': 'No',
        'form.step2.title': 'Contact Details',
        'form.step2.description': 'Please provide your contact information.',
        'form.step2.firstName': 'First Name',
        'form.step2.lastName': 'Last Name',
        'form.step2.email': 'Email Address',
        'form.step2.phone': 'Phone Number',
        'navigation.previous': 'Previous',
        'navigation.next': 'Next',
        'navigation.submit': 'Submit',
        'banner.register': 'Click to Register. All selected participants will receive £175.',
        'banner.progress': '{{completed}}/{{total}} fields completed'
      },
      es: {
        'header.title': 'Ha sido seleccionado aleatoriamente para ayudar a dar forma al futuro del NHS',
        'header.subtitle': 'Su participación nos ayudará a mejorar los servicios de salud para todos',
        'form.step1.title': 'Confirmación de Elegibilidad',
        'form.step1.description': 'Por favor confirme que es elegible para participar en esta encuesta del NHS.',
        'form.step1.question': '¿Es elegible para participar?',
        'form.step1.yes': 'Sí',
        'form.step1.no': 'No',
        'form.step2.title': 'Datos de Contacto',
        'form.step2.description': 'Por favor proporcione su información de contacto.',
        'form.step2.firstName': 'Nombre',
        'form.step2.lastName': 'Apellido',
        'form.step2.email': 'Correo Electrónico',
        'form.step2.phone': 'Teléfono',
        'navigation.previous': 'Anterior',
        'navigation.next': 'Siguiente',
        'navigation.submit': 'Enviar',
        'banner.incomplete': '{{completed}} de {{total}} campos completados',
        'banner.continue': 'Continuar'
      }
    };
    
    return translations[languageCode] || translations.en;
  }

  t(key, params = {}) {
    const translation = this.translations[this.currentLanguage]?.[key] || 
                      this.translations[this.fallbackLanguage]?.[key] || 
                      key;
    
    return this.interpolate(translation, params);
  }

  interpolate(text, params) {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => params[key] || match);
  }

  translatePage() {
    // Translate elements with data-i18n attribute
    NHS.DOM.$$('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.t(key);
    });
    
    // Translate placeholders
    NHS.DOM.$$('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });
  }

  updateDirection(languageCode) {
    const rtlLanguages = ['ar', 'ur', 'he'];
    document.body.dir = rtlLanguages.includes(languageCode) ? 'rtl' : 'ltr';
    document.documentElement.lang = languageCode;
  }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.nhsApp = new NHSApp();
  
  // Wait for form handler to be ready
  const checkFormHandler = () => {
    if (window.formHandler) {
      window.nhsApp.formHandler = window.formHandler;
    } else {
      setTimeout(checkFormHandler, 100);
    }
  };
  
  checkFormHandler();
});

// Handle page load performance
window.addEventListener('load', () => {
  // Log performance metrics
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
  }
  
  // Remove loading states
  document.body.classList.remove('loading');
}); 