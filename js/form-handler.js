// NHS One-Page Website - Form Handler

class FormHandler {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.formData = {};
    this.validationRules = {};
    this.requiredFields = [];
    
    this.init();
  }

  init() {
    this.setupElements();
    this.setupValidationRules();
    this.setupEventListeners();
    this.restoreFormData();
    this.updateUI();
  }

  setupElements() {
    this.form = NHS.DOM.$('#nhsForm');
    this.steps = NHS.DOM.$$('.form-step');
    this.nextBtn = NHS.DOM.$('#nextBtn');
    this.prevBtn = NHS.DOM.$('#prevBtn');
    this.submitBtn = NHS.DOM.$('#submitBtn');
    this.progressBar = NHS.DOM.$('.progress__fill');
    this.progressText = NHS.DOM.$('.progress__current');
    this.sectionNumber = NHS.DOM.$('.section-number');
    this.registrationBanner = NHS.DOM.$('#registrationBanner');
    this.bannerProgress = NHS.DOM.$('#fieldProgress');
  }

  setupValidationRules() {
    this.validationRules = {
      eligibility: {
        required: true,
        validator: (value) => value === 'yes',
        message: 'You must be eligible to participate'
      },
      firstName: {
        required: true,
        validator: NHS.Validation.isValidName,
        message: 'Please enter a valid first name'
      },
      lastName: {
        required: true,
        validator: NHS.Validation.isValidName,
        message: 'Please enter a valid last name'
      },
      email: {
        required: true,
        validator: NHS.Validation.isValidEmail,
        message: 'Please enter a valid email address'
      },
      phone: {
        required: true,
        validator: NHS.Validation.isValidPhone,
        message: 'Please enter a valid phone number'
      },
      dateOfBirth: {
        required: true,
        validator: NHS.Validation.isValidDateOfBirth,
        message: 'Please enter a valid date of birth (must be over 16)'
      },
      gender: {
        required: true,
        validator: (value) => NHS.Validation.isRequired(value),
        message: 'Please select your gender'
      },
      postcode: {
        required: true,
        validator: NHS.Validation.isValidPostcode,
        message: 'Please enter a valid UK postcode'
      },
      dataConsent: {
        required: true,
        validator: (value) => value === 'on',
        message: 'You must consent to data processing to continue'
      }
    };

    // Define required fields for each step
    this.requiredFields = [
      ['eligibility'], // Step 1
      ['firstName', 'lastName', 'email', 'phone'], // Step 2
      ['dateOfBirth', 'gender', 'postcode'], // Step 3
      ['dataConsent'], // Step 4
      [] // Step 5 - no required fields
    ];
  }

  setupEventListeners() {
    // Navigation buttons
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextStep());
    }
    
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevStep());
    }
    
    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', (e) => this.handleSubmit(e));
    }

    // Form field validation
    NHS.Events.on(this.form, 'input', 'input, textarea', 
      NHS.Events.debounce((e) => this.validateField(e.target), 300)
    );
    
    NHS.Events.on(this.form, 'change', 'input[type="radio"], input[type="checkbox"]', 
      (e) => this.validateField(e.target)
    );

    // Option button styling
    NHS.Events.on(this.form, 'change', 'input[type="radio"]', (e) => {
      this.updateOptionButtons(e.target);
    });

    // Registration banner click
    if (this.registrationBanner) {
      this.registrationBanner.addEventListener('click', () => {
        if (NHS.DOM.hasClass(this.registrationBanner, 'registration-banner--active')) {
          this.nextStep();
        }
      });
      
      this.registrationBanner.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (NHS.DOM.hasClass(this.registrationBanner, 'registration-banner--active')) {
            this.nextStep();
          }
        }
      });
    }

    // Auto-save on form changes
    NHS.Events.on(this.form, 'input', () => {
      NHS.Events.debounce(() => this.saveFormData(), 500)();
    });
    
    NHS.Events.on(this.form, 'change', () => {
      this.saveFormData();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' && e.ctrlKey) {
        e.preventDefault();
        this.nextStep();
      } else if (e.key === 'ArrowLeft' && e.ctrlKey) {
        e.preventDefault();
        this.prevStep();
      }
    });
  }

  validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.type === 'checkbox' ? (field.checked ? 'on' : '') : field.value;
    const rule = this.validationRules[fieldName];
    
    if (!rule) return true;

    let isValid = true;
    let errorMessage = '';

    // Check if required
    if (rule.required && !NHS.Validation.isRequired(fieldValue)) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    // Check custom validator
    else if (fieldValue && rule.validator && !rule.validator(fieldValue)) {
      isValid = false;
      errorMessage = rule.message;
    }

    this.updateFieldState(field, isValid, errorMessage);
    this.updateRegistrationBanner();
    
    return isValid;
  }

  updateFieldState(field, isValid, errorMessage = '') {
    const fieldContainer = field.closest('.form-group');
    const errorElement = fieldContainer?.querySelector('.form-error');
    
    // Remove existing state classes
    NHS.DOM.removeClass(field, 'form-field--empty');
    NHS.DOM.removeClass(field, 'form-field--valid');
    NHS.DOM.removeClass(field, 'form-field--invalid');
    
    // Add appropriate state class
    if (!field.value && field.type !== 'checkbox' && field.type !== 'radio') {
      NHS.DOM.addClass(field, 'form-field--empty');
    } else if (isValid) {
      NHS.DOM.addClass(field, 'form-field--valid');
    } else {
      NHS.DOM.addClass(field, 'form-field--invalid');
    }
    
    // Update error message
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = errorMessage ? 'block' : 'none';
    }
    
    // Announce error to screen readers
    if (errorMessage) {
      NHS.A11y.announce(`Error in ${field.name}: ${errorMessage}`, 'assertive');
    }
  }

  updateOptionButtons(radioInput) {
    const fieldset = radioInput.closest('.form-fieldset');
    if (!fieldset) return;
    
    const allOptions = fieldset.querySelectorAll('.option-button');
    const selectedOption = radioInput.closest('.option-button');
    
    // Reset all options
    allOptions.forEach(option => {
      NHS.DOM.removeClass(option, 'option-button--selected');
      NHS.DOM.removeClass(option, 'option-button--valid');
      NHS.DOM.addClass(option, 'option-button--unselected');
    });
    
    // Update selected option
    if (selectedOption) {
      NHS.DOM.removeClass(selectedOption, 'option-button--unselected');
      NHS.DOM.addClass(selectedOption, 'option-button--selected');
      
      // If validation passes, make it green
      if (this.validateField(radioInput)) {
        NHS.DOM.removeClass(selectedOption, 'option-button--selected');
        NHS.DOM.addClass(selectedOption, 'option-button--valid');
      }
    }
  }

  validateCurrentStep() {
    const currentStepFields = this.requiredFields[this.currentStep - 1];
    let isValid = true;
    
    currentStepFields.forEach(fieldName => {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field && !this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      if (this.validateCurrentStep()) {
        this.currentStep++;
        this.updateUI();
        this.saveFormData();
        NHS.A11y.announce(`Step ${this.currentStep} of ${this.totalSteps}`);
      } else {
        NHS.A11y.announce('Please complete all required fields before continuing', 'assertive');
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateUI();
      this.saveFormData();
      NHS.A11y.announce(`Step ${this.currentStep} of ${this.totalSteps}`);
    }
  }

  updateUI() {
    // Update step visibility
    this.steps.forEach((step, index) => {
      const stepNumber = index + 1;
      if (stepNumber === this.currentStep) {
        NHS.DOM.removeClass(step, 'form-step--hidden');
        NHS.DOM.addClass(step, 'form-step--active');
        step.style.display = 'block';
      } else {
        NHS.DOM.removeClass(step, 'form-step--active');
        NHS.DOM.addClass(step, 'form-step--hidden');
        step.style.display = 'none';
      }
    });

    // Update progress bar
    const progressPercentage = (this.currentStep / this.totalSteps) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = `${progressPercentage}%`;
    }
    
    if (this.progressText) {
      this.progressText.textContent = this.currentStep;
    }

    // Update section number
    if (this.sectionNumber) {
      this.sectionNumber.textContent = this.currentStep;
    }

    // Update navigation buttons
    if (this.prevBtn) {
      this.prevBtn.style.display = this.currentStep > 1 ? 'inline-flex' : 'none';
    }
    
    if (this.nextBtn) {
      this.nextBtn.style.display = this.currentStep < this.totalSteps ? 'inline-flex' : 'none';
    }
    
    if (this.submitBtn) {
      this.submitBtn.style.display = this.currentStep === this.totalSteps ? 'inline-flex' : 'none';
    }

    // Focus management
    const currentStepElement = NHS.DOM.$(`#step-${this.currentStep}`);
    if (currentStepElement) {
      const firstInput = currentStepElement.querySelector('input, textarea, select');
      if (firstInput) {
        setTimeout(() => NHS.A11y.focusElement(firstInput), 100);
      }
    }

    this.updateRegistrationBanner();
  }

  updateRegistrationBanner() {
    if (!this.registrationBanner || !this.bannerProgress) return;
    
    const { completed, total } = this.getCompletionStatus();
    const isComplete = completed === total;
    
    // Update banner state
    if (isComplete) {
      NHS.DOM.removeClass(this.registrationBanner, 'registration-banner--inactive');
      NHS.DOM.addClass(this.registrationBanner, 'registration-banner--active');
    } else {
      NHS.DOM.removeClass(this.registrationBanner, 'registration-banner--active');
      NHS.DOM.addClass(this.registrationBanner, 'registration-banner--inactive');
    }
    
    // Update progress text
    this.bannerProgress.textContent = `${completed}/${total} fields completed`;
  }

  getCompletionStatus() {
    const allRequiredFields = this.requiredFields.flat();
    let completed = 0;
    
    allRequiredFields.forEach(fieldName => {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        const fieldValue = field.type === 'checkbox' ? (field.checked ? 'on' : '') : field.value;
        const rule = this.validationRules[fieldName];
        
        if (rule && NHS.Validation.isRequired(fieldValue) && 
            (!rule.validator || rule.validator(fieldValue))) {
          completed++;
        }
      }
    });
    
    return { completed, total: allRequiredFields.length };
  }

  saveFormData() {
    const formData = {
      currentStep: this.currentStep,
      fields: {},
      timestamp: Date.now()
    };
    
    // Save all form field values and states
    const allFields = this.form.querySelectorAll('input, select, textarea');
    allFields.forEach(field => {
      const fieldName = field.name || field.id;
      if (fieldName) {
        formData.fields[fieldName] = {
          value: field.value,
          checked: field.checked,
          validationState: this.getFieldValidationState(field)
        };
      }
    });
    
    NHS.Storage.set('nhsFormData', formData);
  }

  getFieldValidationState(field) {
    if (NHS.DOM.hasClass(field, 'form-field--valid')) return 'valid';
    if (NHS.DOM.hasClass(field, 'form-field--invalid')) return 'invalid';
    return 'empty';
  }

  restoreFormData() {
    const savedData = NHS.Storage.get('nhsFormData');
    if (!savedData) return;
    
    // Restore current step
    this.currentStep = savedData.currentStep || 1;
    
    // Restore field values and states
    Object.entries(savedData.fields || {}).forEach(([fieldName, fieldData]) => {
      const field = this.form.querySelector(`[name="${fieldName}"], #${fieldName}`);
      if (field) {
        // Restore value
        if (field.type === 'checkbox' || field.type === 'radio') {
          field.checked = fieldData.checked || false;
        } else {
          field.value = fieldData.value || '';
        }
        
        // Restore validation state
        NHS.DOM.removeClass(field, 'form-field--empty');
        NHS.DOM.removeClass(field, 'form-field--valid');
        NHS.DOM.removeClass(field, 'form-field--invalid');
        NHS.DOM.addClass(field, `form-field--${fieldData.validationState || 'empty'}`);
        
        // Update option buttons for radio inputs
        if (field.type === 'radio' && field.checked) {
          this.updateOptionButtons(field);
        }
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Final validation
    if (!this.validateCurrentStep()) {
      NHS.A11y.announce('Please complete all required fields before submitting', 'assertive');
      return;
    }
    
    // Collect all form data
    const finalFormData = NHS.FormUtils.getFormData(this.form);
    
    // Show loading state
    NHS.DOM.addClass(this.submitBtn, 'loading');
    this.submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      this.onSubmissionSuccess(finalFormData);
    }, 2000);
  }

  onSubmissionSuccess(formData) {
    // Clear saved data
    NHS.Storage.remove('nhsFormData');
    
    // Show success message
    NHS.A11y.announce('Form submitted successfully! Thank you for your participation.', 'assertive');
    
    // Replace form with success message
    this.showSuccessMessage();
    
    console.log('Form submitted:', formData);
  }

  showSuccessMessage() {
    const successHTML = `
      <div class="success-message">
        <h2>Thank you for your participation!</h2>
        <p>Your information has been submitted successfully. We may contact you using the details you provided.</p>
        <p>Your participation helps us improve NHS services for everyone.</p>
      </div>
    `;
    
    this.form.innerHTML = successHTML;
    
    // Hide registration banner
    if (this.registrationBanner) {
      this.registrationBanner.style.display = 'none';
    }
  }

  // Public methods for external access
  getCurrentStep() {
    return this.currentStep;
  }

  goToStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
      this.currentStep = stepNumber;
      this.updateUI();
      this.saveFormData();
    }
  }

  getFormData() {
    return NHS.FormUtils.getFormData(this.form);
  }

  resetForm() {
    NHS.FormUtils.clearForm(this.form);
    NHS.Storage.remove('nhsFormData');
    this.currentStep = 1;
    this.updateUI();
  }
}

// Initialize form handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.formHandler = new FormHandler();
}); 