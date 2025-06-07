// NHS One-Page Website - Utility Functions

/**
 * DOM Utilities
 */
const DOM = {
  // Query selector with error handling
  $(selector, context = document) {
    const element = context.querySelector(selector);
    if (!element) {
      console.warn(`Element not found: ${selector}`);
    }
    return element;
  },

  // Query all with error handling
  $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  },

  // Add class with null check
  addClass(element, className) {
    if (element && className) {
      element.classList.add(className);
    }
  },

  // Remove class with null check
  removeClass(element, className) {
    if (element && className) {
      element.classList.remove(className);
    }
  },

  // Toggle class with null check
  toggleClass(element, className) {
    if (element && className) {
      element.classList.toggle(className);
    }
  },

  // Check if element has class
  hasClass(element, className) {
    return element && element.classList.contains(className);
  },

  // Set attribute safely
  setAttr(element, attr, value) {
    if (element && attr) {
      element.setAttribute(attr, value);
    }
  },

  // Get attribute safely
  getAttr(element, attr) {
    return element ? element.getAttribute(attr) : null;
  },

  // Create element with attributes
  create(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    
    if (textContent) {
      element.textContent = textContent;
    }
    
    return element;
  }
};

/**
 * Validation Utilities
 */
const Validation = {
  // Email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Phone validation (UK format)
  isValidPhone(phone) {
    const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    return phoneRegex.test(cleanPhone) || /^[\d\s\-\+\(\)]{10,15}$/.test(phone);
  },

  // Postcode validation (UK format)
  isValidPostcode(postcode) {
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
    return postcodeRegex.test(postcode.replace(/\s/g, ''));
  },

  // Date validation (not in future, over 16 years old)
  isValidDateOfBirth(dateString) {
    if (!dateString) return false;
    
    const date = new Date(dateString);
    const today = new Date();
    const sixteenYearsAgo = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    
    return date <= today && date <= sixteenYearsAgo;
  },

  // Required field validation
  isRequired(value) {
    return value && value.toString().trim().length > 0;
  },

  // Name validation
  isValidName(name) {
    return name && name.trim().length >= 2 && /^[a-zA-Z\s\-']+$/.test(name);
  }
};

/**
 * Storage Utilities
 */
const Storage = {
  // Set item with error handling
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },

  // Get item with error handling
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  },

  // Remove item
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  },

  // Clear all storage
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }
};

/**
 * Animation Utilities
 */
const Animation = {
  // Fade in element
  fadeIn(element, duration = 300) {
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = progress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  },

  // Fade out element
  fadeOut(element, duration = 300) {
    if (!element) return;
    
    const start = performance.now();
    const startOpacity = parseFloat(getComputedStyle(element).opacity);
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = startOpacity * (1 - progress);
      
      if (progress >= 1) {
        element.style.display = 'none';
      } else {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  },

  // Slide in element
  slideIn(element, direction = 'down', duration = 300) {
    if (!element) return;
    
    const transforms = {
      down: 'translateY(-20px)',
      up: 'translateY(20px)',
      left: 'translateX(20px)',
      right: 'translateX(-20px)'
    };
    
    element.style.transform = transforms[direction];
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = progress;
      element.style.transform = `${transforms[direction].replace(/[\d\-]+/, (match) => {
        return Math.round(parseFloat(match) * (1 - progress));
      })}`;
      
      if (progress >= 1) {
        element.style.transform = '';
      } else {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
};

/**
 * Event Utilities
 */
const Events = {
  // Add event listener with delegation
  on(element, event, selector, handler) {
    if (typeof selector === 'function') {
      handler = selector;
      selector = null;
    }
    
    element.addEventListener(event, (e) => {
      if (selector) {
        if (e.target.matches(selector) || e.target.closest(selector)) {
          handler.call(e.target.closest(selector) || e.target, e);
        }
      } else {
        handler.call(element, e);
      }
    });
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

/**
 * Accessibility Utilities
 */
const A11y = {
  // Announce to screen readers
  announce(message, priority = 'polite') {
    const announcer = DOM.create('div', {
      'aria-live': priority,
      'aria-atomic': 'true',
      className: 'sr-only'
    });
    
    document.body.appendChild(announcer);
    announcer.textContent = message;
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  // Focus management
  focusElement(element) {
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  // Trap focus within element
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
};

/**
 * Form Utilities
 */
const FormUtils = {
  // Get form data as object
  getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    }
    
    return data;
  },

  // Set form data from object
  setFormData(form, data) {
    Object.entries(data).forEach(([key, value]) => {
      const field = form.querySelector(`[name="${key}"]`);
      if (field) {
        if (field.type === 'checkbox' || field.type === 'radio') {
          field.checked = field.value === value || value === true;
        } else {
          field.value = value;
        }
      }
    });
  },

  // Clear form
  clearForm(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
      if (field.type === 'checkbox' || field.type === 'radio') {
        field.checked = false;
      } else {
        field.value = '';
      }
    });
  }
};

/**
 * Device Detection
 */
const Device = {
  isMobile() {
    return window.innerWidth <= 767;
  },

  isTablet() {
    return window.innerWidth >= 768 && window.innerWidth <= 1023;
  },

  isDesktop() {
    return window.innerWidth >= 1024;
  },

  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  },

  isAndroid() {
    return /Android/.test(navigator.userAgent);
  }
};

// Export utilities for use in other files
window.NHS = {
  DOM,
  Validation,
  Storage,
  Animation,
  Events,
  A11y,
  FormUtils,
  Device
}; 