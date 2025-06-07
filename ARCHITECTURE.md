# NHS One-Page Website Architecture

## Project Overview
A mobile-first, responsive one-page website for NHS participant selection/survey system. The site features a multi-step form interface with official NHS branding and accessibility compliance.

## Design Analysis
Based on the provided mockups:
- **Desktop**: Clean, professional layout with NHS branding
- **Mobile**: Optimized mobile-first design with touch-friendly interfaces
- **Multi-step process**: 5-step form with progress indicators
- **NHS compliance**: Official colors, fonts, and accessibility standards

## Technical Architecture

### 1. File Structure
```
/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css         # Main stylesheet
│   ├── components.css     # Component-specific styles
│   └── responsive.css     # Media queries and responsive design
├── js/
│   ├── main.js           # Main application logic
│   ├── form-handler.js   # Form validation and step management
│   └── utils.js          # Utility functions
├── assets/
│   ├── images/           # Images and icons
│   ├── fonts/            # Custom fonts if needed
│   └── icons/            # Lucide icons (if used)
└── ARCHITECTURE.md       # This file
```

### 2. Technology Stack
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with Flexbox/Grid, CSS Variables
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **Progressive Enhancement**: Works without JavaScript
- **Icons**: Lucide Icons (lightweight, customizable SVG icons)

### 3. Key Components

#### 3.1 Header Section
- **Language Selector**: Four button-style language options (English, भारतीय, 中文, Other) at top
  - Position: Absolute (scrolls with page, not fixed)
  - Responsive button layout with hover states
- **Logos Section**: Three official logos (Sortition Foundation, NHS, Department of Health & Social Care)
  - Mobile: 80px height, Tablet: 100px height, Desktop: 120px height
- **Main Title**: "You have been randomly selected to help shape the future of NHS."
- **Subtitle**: "This form will take less than 3 minutes. All selected participants will receive £175."
- **Video Section**: Ipswich harbor video thumbnail with play button overlay and location badge
- **Contact Information**: Phone number and email with proper formatting
- **Scroll Indicator**: Animated indicator encouraging user to scroll down

#### 3.2 Multi-Step Form System

**Form Section Structure (Reusable Layout Pattern)**
Each form section follows a consistent structure optimized for both mobile and desktop:

**Mobile Layout:**
- Content-driven height (no forced viewport height)
- Left-aligned section header with H1 typography (30px)
- Vertical stacking of all elements
- 4rem top/bottom padding for proper spacing

**Desktop Layout:**
- Horizontal section header (section number + title side by side)
- H2 typography for both elements (40px) with proper baseline alignment
- Content aligned with banner text edges (1200px max-width, 20px padding)
- 6rem top/bottom padding for generous spacing

**Step 1: Eligibility Confirmation**
- Two eligibility cards with checkbox inputs
- Horizontal text layout on desktop (title + description side by side)
- Real-time validation with gray → green background states
- Progress indicator (1/5)

**Step 2: Contact Details**
- Name input fields
- Contact information form
- Validation for required fields

**Step 3: Personal Information**
- Detailed personal information collection
- Multiple form fields with proper labeling
- Accessibility considerations
- Real-time field validation with visual feedback

**Step 4: Data Consent**
- Consent checkboxes
- Privacy information
- Clear consent language

**Step 5: Final Information**
- Summary or additional information
- Completion confirmation

#### 3.3 Navigation System
- Step-by-step progress indicator
- Next/Previous buttons
- Form validation before progression

#### 3.4 Blue Registration Banner
- **Position**: Fixed to bottom of screen (both desktop and mobile)
- **Color**: Banner Blue (#31B7FF)
- **Functionality**: 
  - Appears when user scrolls down from hero section (after 100px scroll)
  - Tracks completion status of all form fields with live updates
  - Left side: "Click to Register. All selected participants will receive £175."
  - Right side: Live field progress counter (e.g., "4/9 fields completed")
  - Only becomes active/clickable when all required fields are completed
  - Remains inactive (non-clickable) until form validation passes
- **Typography**: 
  - Desktop: h3 size (20px) with font-weight 400, black text
  - Mobile: h2 size (24px) with font-weight 400, black text, centered layout
- **Responsive**: Adapts to screen width while maintaining fixed bottom position
- **Scroll Behavior**: Hidden at top of page, slides in when scrolling starts

### 4. Responsive Design Strategy

#### 4.1 Mobile-First Approach
- Base styles for mobile (320px+)
- Progressive enhancement for larger screens
- Touch-friendly interface elements
- Fixed bottom banner on all screen sizes

#### 4.2 Grid System
**Desktop Grid (768px+)**
- 10 columns
- 20px margins
- 20px gutters

**Mobile Grid (320px-767px)**
- 3 columns
- 20px margins
- 0px gutters

#### 4.3 Breakpoints
```css
/* Mobile First */
@media (min-width: 768px)  { /* Tablet/Desktop */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large Desktop */ }
```

#### 4.4 Key Responsive Features
- Column-based grid system with defined margins and gutters
- Scalable typography with device-specific sizing
- Touch-optimized form elements
- Optimized images and assets
- Fixed section numbers on desktop with smooth transitions
- Persistent bottom registration banner across all devices

### 5. NHS Design System Compliance

#### 5.1 Colors
**Primary Colors:**
- Background: #F0F0F0
- Default Gray: #D9D9D9 (unfilled input fields)
- Approval Green: #66D575 (valid/completed fields)
- Banner Blue: #31B7FF (registration banner)
- Selection Black: #000000 (selected buttons/options)
- Option White: #FFFFFF (unselected buttons/options)
- Reject Red: #FF4444 (invalid/error fields)

#### 5.2 Typography
**Font Family:** Helvetica Now Display (Regular 400, Medium 500, Bold 700)
- Custom font files loaded from `/assets/fonts/`
- HelveticaNowDisplay-Regular.ttf (400 weight)
- HelveticaNowDisplay-Md.ttf (500 weight)  
- HelveticaNowDisplay-Bd.ttf (700 weight)
- Fallback: Helvetica, Arial, sans-serif

**Desktop Typography:**
- H1: 56px (main title) / -2% letter-spacing
- H2: 48px (section titles) / -1% letter-spacing
- H3: 20px (banner text, form labels) / normal letter-spacing
- Body: 16px / normal letter-spacing

**Mobile Typography:**
- H1: 28px (main title) / -2% letter-spacing
- H2: 24px (banner text, important elements) / normal letter-spacing
- H3: 18px (section titles) / normal letter-spacing
- Body: 14px / normal letter-spacing

**Additional Typography Guidelines:**
- Accessible font sizes and line heights
- Proper heading hierarchy
- Responsive scaling between mobile and desktop
- Registration banner uses h3/h2 sizes with weight 400 for readability

#### 5.3 Accessibility (WCAG 2.1 AA)
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management

### 6. JavaScript Architecture

#### 6.1 Main Application (main.js)
- Application initialization with translation system
- Event delegation and scroll event handling
- State management and language selector setup
- Registration banner scroll behavior (appears after 100px scroll)
- Language button event listeners (no dropdown, uses HTML buttons)
- Translation system integration with proper text updates

#### 6.2 Form Handler (form-handler.js)
- Step navigation logic (converted to long-scroll format)
- Real-time form validation with visual feedback
- Field completion tracking for registration banner with live updates
- Data persistence (localStorage) - auto-save on field changes
- Progress tracking with "X/Y fields completed" format
- Registration banner state management with scroll-triggered visibility
- State restoration on page load/refresh
- Scroll event handling for banner appearance (shows after 100px scroll)

#### 6.3 Utilities (utils.js)
- Helper functions
- DOM manipulation utilities
- Validation helpers

### 7. Performance Optimization

#### 7.1 Loading Strategy
- Critical CSS inlined
- Progressive image loading
- Minimal JavaScript footprint

#### 7.2 Mobile Optimization
- Optimized images for different screen densities
- Minimal HTTP requests
- Compressed assets
- Efficient icon loading (Lucide icons as inline SVG when needed)

### 8. Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Android Chrome 70+
- Progressive enhancement for older browsers

### 9. Development Considerations

#### 9.1 Code Organization
- Modular CSS with BEM methodology
- ES6 modules for JavaScript
- Consistent naming conventions

#### 9.2 Maintainability
- Well-documented code
- Consistent code style
- Separation of concerns

### 10. Testing Strategy
- Cross-browser testing
- Mobile device testing
- Accessibility testing
- Form validation testing
- Performance testing

## Implementation Priority
1. **Phase 1**: HTML structure and basic CSS
2. **Phase 2**: Mobile-responsive design
3. **Phase 3**: JavaScript functionality
4. **Phase 4**: Form validation and step management
5. **Phase 5**: Accessibility and performance optimization

## Design System Specifications

### Grid Implementation
```css
/* Desktop Grid */
.container {
  max-width: 1200px;
  margin: 0 20px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 20px;
}

/* Mobile Grid */
@media (max-width: 767px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
}
```

### Font Loading Implementation
```css
/* Font Face Declarations */
@font-face {
  font-family: 'Helvetica Now Display';
  src: url('../assets/fonts/HelveticaNowDisplay-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Helvetica Now Display';
  src: url('../assets/fonts/HelveticaNowDisplay-Md.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Helvetica Now Display';
  src: url('../assets/fonts/HelveticaNowDisplay-Bd.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### Typography Implementation
```css
/* CSS Variables for Typography System */
:root {
  /* Desktop Typography */
  --font-size-h1-desktop: 70px;
  --font-size-h2-desktop: 40px;
  --font-size-h3-desktop: 20px;
  
  /* Mobile Typography */
  --font-size-h1-mobile: 30px;
  --font-size-h2-mobile: 15px;
  --font-size-h3-mobile: 12px;
  
  /* Letter Spacing */
  --letter-spacing-h1: -2%;
  --letter-spacing-h2: -1%;
  --letter-spacing-h3: -1%;
  
  /* Transitions */
  --transition-fast: 0.3s ease;
}

/* Desktop Typography */
h1 { 
  font-size: var(--font-size-h1-desktop); 
  letter-spacing: var(--letter-spacing-h1); 
  font-weight: 700; 
}

h2 { 
  font-size: var(--font-size-h2-desktop); 
  letter-spacing: var(--letter-spacing-h2); 
  font-weight: 600; 
}

h3 { 
  font-size: var(--font-size-h3-desktop); 
  letter-spacing: var(--letter-spacing-h3); 
  font-weight: 400; 
}

/* Mobile Typography */
@media (max-width: 767px) {
  h1 { 
    font-size: var(--font-size-h1-mobile); 
    letter-spacing: var(--letter-spacing-h1); 
    font-weight: 700; 
  }
  
  h2 { 
    font-size: var(--font-size-h2-mobile); 
    letter-spacing: var(--letter-spacing-h2); 
    font-weight: 400; 
  }
  
  h3 { 
    font-size: var(--font-size-h3-mobile); 
    letter-spacing: var(--letter-spacing-h3); 
    font-weight: 400; 
  }
}
```

### Color Variables
```css
:root {
  --color-background: #F0F0F0;
  --color-gray-default: #D9D9D9;
  --color-green-approval: #66D575;
  --color-blue-banner: #31B7FF;
  --color-black-selection: #000000;
  --color-white-option: #FFFFFF;
  --color-red-reject: #FF4444;
  
  /* Typography */
  --font-family: 'Helvetica Now Display', Helvetica, Arial, sans-serif;
}

body {
  font-family: var(--font-family);
  background-color: #F0F0F0 !important;
  color: var(--color-black-selection);
  line-height: 1.6;
  min-height: 100vh;
  padding-bottom: 80px; /* Space for fixed banner */
}
```

### Form Section Layout Implementation
```css
/* Reusable Form Section Structure */
.form-section--fullscreen {
  display: grid;
  grid-template-columns: inherit;
  align-items: center;
  margin-bottom: 0;
  border-bottom: none;
  padding: 4rem 0; /* Mobile: content-driven height */
}

@media (min-width: 768px) {
  .form-section--fullscreen {
    padding: 6rem 0; /* Desktop: generous spacing */
  }
}

/* Section Header - Mobile: Vertical, Desktop: Horizontal */
.section-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Mobile: left-aligned */
  margin-bottom: 3rem;
}

@media (min-width: 768px) {
  .section-header {
    flex-direction: row; /* Desktop: horizontal layout */
    align-items: baseline;
    justify-content: flex-start;
    gap: 2rem;
    margin-bottom: 2rem;
    max-width: 1200px; /* Align with banner */
    margin-left: auto;
    margin-right: auto;
    padding: 0 20px;
  }
}

/* Typography - Mobile: H1, Desktop: H2 for consistency */
.step-indicator {
  text-align: left;
  margin-bottom: 2rem;
  font-size: var(--font-size-h1-mobile); /* 30px */
  font-weight: 300;
  color: var(--color-black-selection);
  letter-spacing: var(--letter-spacing-h1);
}

.section-title {
  text-align: left;
  margin-bottom: 0;
  color: var(--color-black-selection);
  font-size: var(--font-size-h1-mobile); /* 30px */
  font-weight: bold;
  letter-spacing: var(--letter-spacing-h1);
}

@media (min-width: 768px) {
  .step-indicator {
    font-size: var(--font-size-h2-desktop); /* 40px */
    margin-bottom: 0;
    letter-spacing: var(--letter-spacing-h2);
    flex-shrink: 0;
  }
  
  .section-title {
    font-size: var(--font-size-h2-desktop); /* 40px */
    letter-spacing: var(--letter-spacing-h2);
    flex: 1;
  }
}

/* Content Container - Aligned with banner edges */
.form-section__content {
  grid-column: 1 / -1;
  width: 100%;
  max-width: none;
}

@media (min-width: 768px) {
  .form-section__content {
    grid-column: 2 / -2;
  }
}

/* Eligibility Cards - Horizontal text layout on desktop */
.eligibility-card__text-content {
  flex: 1;
  display: flex;
  flex-direction: column; /* Mobile: vertical */
}

@media (min-width: 768px) {
  .eligibility-card__text-content {
    flex-direction: row; /* Desktop: horizontal */
    align-items: baseline;
    gap: 1rem;
  }
  
  .eligibility-card__title {
    margin-bottom: 0;
    flex-shrink: 0;
    width: 50%; /* Title takes left half */
  }
  
  .eligibility-card__text {
    margin-top: 0;
    flex: 1;
    margin-left: auto; /* Text starts at center */
  }
}
```

### Form Field States
```css
/* Input field states */
.form-field {
  transition: background-color 0.3s ease;
}

.form-field--empty {
  background-color: var(--color-gray-default);
}

.form-field--valid {
  background-color: var(--color-green-approval);
}

.form-field--invalid {
  background-color: var(--color-red-reject);
}

/* Eligibility Card States */
.eligibility-card__content {
  background-color: var(--color-gray-default); /* Default: gray */
  transition: all var(--transition-fast);
}

.eligibility-card__input:checked ~ .eligibility-card__content {
  background-color: var(--color-green-approval) !important; /* Checked: green */
}
```

### Button/Option States
```css
/* Button and option states */
.option-button {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.option-button--unselected {
  background-color: var(--color-white-option);
  color: var(--color-black-selection);
}

.option-button--selected {
  background-color: var(--color-black-selection);
  color: var(--color-white-option);
}

.option-button--valid {
  background-color: var(--color-green-approval);
  color: var(--color-white-option);
}
```

### Registration Banner
```css
.registration-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-blue-banner);
  padding: 16px 20px;
  z-index: 1000;
  transition: all 0.3s ease;
  transform: translateY(100%); /* Hidden by default */
}

.registration-banner--inactive {
  opacity: 0;
  pointer-events: none;
  transform: translateY(100%);
}

.registration-banner--active {
  opacity: 1 !important;
  cursor: pointer;
  transform: translateY(0);
}

.registration-banner__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.registration-banner__text {
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  color: #000000;
}

.registration-banner__progress {
  font-size: 20px;
  font-weight: 400;
  text-align: right;
  color: #000000;
}

/* Mobile responsive */
@media (max-width: 767px) {
  .registration-banner__content {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  
  .registration-banner__text,
  .registration-banner__progress {
    text-align: center;
    font-size: 24px;
    font-weight: 400;
  }
}
```

### Desktop Section Numbers
```css
@media (min-width: 768px) {
  .section-number {
    position: fixed;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    font-size: 120px;
    font-weight: bold;
    color: var(--color-gray-default);
    z-index: 100;
    transition: all 0.5s ease;
  }
  
  .section-number--entering {
    opacity: 0;
    transform: translateY(-50%) translateX(-50px);
  }
  
  .section-number--active {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
  
  .section-number--exiting {
    opacity: 0;
    transform: translateY(-50%) translateX(50px);
  }
  }
  ```

### Data Persistence Implementation
```javascript
// Auto-save form data
const saveFormData = () => {
  const formData = {
    currentStep: getCurrentStep(),
    fields: {},
    completionStatus: {}
  };
  
  // Save all form field values
  document.querySelectorAll('input, select, textarea').forEach(field => {
    formData.fields[field.name || field.id] = {
      value: field.value,
      checked: field.checked,
      validationState: field.classList.contains('form-field--valid') ? 'valid' : 
                      field.classList.contains('form-field--invalid') ? 'invalid' : 'empty'
    };
  });
  
  localStorage.setItem('nhsFormData', JSON.stringify(formData));
};

// Restore form data on page load
const restoreFormData = () => {
  const savedData = localStorage.getItem('nhsFormData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    
    // Restore field values and states
    Object.entries(formData.fields).forEach(([fieldName, fieldData]) => {
      const field = document.querySelector(`[name="${fieldName}"], #${fieldName}`);
      if (field) {
        field.value = fieldData.value;
        if (field.type === 'checkbox' || field.type === 'radio') {
          field.checked = fieldData.checked;
        }
        
        // Restore validation state
        field.classList.remove('form-field--empty', 'form-field--valid', 'form-field--invalid');
        field.classList.add(`form-field--${fieldData.validationState}`);
      }
    });
    
    // Restore current step
    navigateToStep(formData.currentStep);
    
    // Update registration banner
    updateRegistrationBanner();
  }
};
```

## Form Validation System

### Field State Management
1. **Empty State**: Default Gray background (#D9D9D9)
2. **Valid State**: Approval Green background (#66D575)
3. **Invalid State**: Reject Red background (#FF4444)
4. **Real-time Validation**: Immediate feedback on field changes
5. **Registration Banner Integration**: Tracks all field completion status

### Button/Option State Management
1. **Unselected State**: Option White background (#FFFFFF) with black text
2. **Selected State**: Selection Black background (#000000) with white text
3. **Valid Selection**: Approval Green background (#66D575) with white text
4. **Smooth Transitions**: 0.3s ease animation between states

### Registration Banner Behavior
- **Inactive State**: 60% opacity, non-clickable when fields incomplete
- **Active State**: 100% opacity, clickable when all fields valid
- **Progress Display**: Shows "X of Y fields completed"
- **Fixed Position**: Always visible at bottom of screen

### Desktop Section Numbers
- **Fixed Positioning**: Left side of screen during section viewing
- **Smooth Transitions**: 0.5s ease animation between sections
- **Animation States**: Entering, Active, Exiting with slide effects
- **Large Typography**: 120px bold for clear section identification

### Data Persistence System
- **Auto-save**: All form inputs saved to localStorage on change
- **State Restoration**: Form data restored on page load/refresh
- **Progress Preservation**: Current step and completion status maintained
- **Validation State**: Field validation states restored with data
- **Registration Banner**: Completion tracking persists across sessions

## Translation/Localization Strategy

### Recommended Approach: Vanilla JS i18n Library
**Primary Solution**: Use a lightweight vanilla JS i18n library (similar to vanilla-i18n or Polyglot.js)

### Why This Approach Works Best:
1. **Browser Compatibility**: Works on all browsers (IE11+, mobile devices)
2. **NHS Compliant**: Manual translations ensure accuracy for medical content
3. **Simple Setup**: No complex API keys or server dependencies
4. **Offline Ready**: All translations bundled with the app
5. **Privacy Friendly**: No external API calls with sensitive form data

### Implementation Strategy
```javascript
// Simple vanilla JS i18n implementation
const i18n = {
  currentLanguage: 'en',
  translations: {},
  supportedLanguages: ['en', 'es', 'fr', 'ar', 'zh', 'ur', 'pl'],
  
  // Load translation file
  async loadLanguage(lang) {
    try {
      const response = await fetch(`assets/translations/${lang}.json`);
      this.translations[lang] = await response.json();
      this.currentLanguage = lang;
      this.translatePage();
      this.updateDirection(lang);
      localStorage.setItem('nhsLanguage', lang);
    } catch (error) {
      console.warn(`Failed to load ${lang}, falling back to English`);
      if (lang !== 'en') this.loadLanguage('en');
    }
  },
  
  // Translate text with interpolation
  t(key, params = {}) {
    const translation = this.translations[this.currentLanguage]?.[key] || key;
    return this.interpolate(translation, params);
  },
  
  // Simple interpolation
  interpolate(text, params) {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => params[key] || match);
  },
  
  // Apply translations to page
  translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.t(key);
    });
    
    // Handle placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });
  },
  
  // Handle RTL languages
  updateDirection(lang) {
    const rtlLanguages = ['ar', 'ur', 'he'];
    document.body.dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }
};

// Auto-detect user language
const detectUserLanguage = () => {
  // Priority: saved preference > browser language > default
  const savedLang = localStorage.getItem('nhsLanguage');
  if (savedLang && i18n.supportedLanguages.includes(savedLang)) {
    return savedLang;
  }
  
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0];
  return i18n.supportedLanguages.includes(langCode) ? langCode : 'en';
};

// Initialize translation system
const initializeTranslation = () => {
  const userLanguage = detectUserLanguage();
  i18n.loadLanguage(userLanguage);
  createLanguageSelector();
};
```

### Language Selector Implementation
```javascript
// Create language selector dropdown
const createLanguageSelector = () => {
  const selector = document.createElement('select');
  selector.className = 'translation-selector';
  selector.innerHTML = `
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="fr">Français</option>
    <option value="ar">العربية</option>
    <option value="zh">中文</option>
    <option value="ur">اردو</option>
    <option value="pl">Polski</option>
  `;
  
  selector.value = i18n.currentLanguage;
  selector.addEventListener('change', (e) => {
    i18n.loadLanguage(e.target.value);
  });
  
  document.body.appendChild(selector);
};
```

### Translation File Structure
```
assets/
├── translations/
│   ├── en.json          # English (default)
│   ├── es.json          # Spanish
│   ├── fr.json          # French  
│   ├── ar.json          # Arabic (RTL)
│   ├── zh.json          # Chinese
│   ├── ur.json          # Urdu (RTL)
│   └── pl.json          # Polish
└── i18n/
    └── i18n.js          # Translation engine
```

### Sample Translation File (en.json)
```json
{
  "form": {
    "title": "NHS Participant Registration",
    "step1": {
      "title": "Eligibility Confirmation",
      "question": "Are you eligible to participate?",
      "yes": "Yes",
      "no": "No"
    },
    "step2": {
      "title": "Contact Details",
      "email": "Email Address",
      "phone": "Phone Number",
      "emailPlaceholder": "Enter your email address"
    },
    "validation": {
      "required": "This field is required",
      "invalidEmail": "Please enter a valid email address",
      "invalidPhone": "Please enter a valid phone number"
    },
    "banner": {
      "incomplete": "{{completed}} of {{total}} fields completed",
      "complete": "All fields completed - Click to continue",
      "continue": "Continue"
    }
  }
}
```

### Translation Button Styling
```css
.translation-selector {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--color-blue-banner);
  color: var(--color-white-option);
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
  font-family: Helvetica, sans-serif;
}

.translation-selector:hover {
  background: var(--color-green-approval);
}

.translation-selector:focus {
  outline: none;
  border-color: var(--color-black-selection);
}

@media (max-width: 767px) {
  .translation-selector {
    top: 10px;
    right: 10px;
    padding: 6px 12px;
    font-size: 14px;
  }
}

/* RTL Support */
[dir="rtl"] .translation-selector {
  left: 20px;
  right: auto;
}

@media (max-width: 767px) {
  [dir="rtl"] .translation-selector {
    left: 10px;
    right: auto;
  }
}
```

## Notes
- Ensure GDPR compliance for data collection
- Implement proper error handling
- Consider offline functionality if needed
- Plan for analytics integration if required
- Use Lucide icons sparingly and inline as SVG for optimal performance
- Implement comprehensive field validation with immediate visual feedback
- Ensure registration banner accessibility with proper ARIA labels
- Auto-save form data prevents user frustration from accidental page refresh
- Clear localStorage on successful form submission for privacy
- **Privacy**: Client-side translation preferred to keep sensitive form data local
- **Accessibility**: Ensure translation controls are keyboard accessible and screen reader compatible 