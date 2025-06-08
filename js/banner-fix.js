// Simple Banner Color Fix
// This script directly monitors form completion and changes banner color

(function() {
  'use strict';
  
  console.log('Banner fix script loaded');
  
  // Required fields list (from the form handler)
  const requiredFields = [
    'canAttendAllDates', 'isEligible', // Step 1
    'firstName', 'lastName', 'email', 'phone', 'addressLine1', 'city', 'postCode', // Step 2
    'gender', 'birthDay', 'birthMonth', 'birthYear', 'ethnicity', 'healthConditions', 'nhsSatisfaction', 'education', // Step 3
    'dataConsent' // Step 4
  ];
  
  function checkFormCompletion() {
    const form = document.getElementById('nhsForm');
    const banner = document.getElementById('registrationBanner');
    const fieldNumbers = document.getElementById('fieldNumbers');
    
    if (!form || !banner || !fieldNumbers) {
      console.log('Missing elements:', { form: !!form, banner: !!banner, fieldNumbers: !!fieldNumbers });
      return;
    }
    
    let completed = 0;
    const total = requiredFields.length;
    
    requiredFields.forEach(fieldName => {
      const fields = form.querySelectorAll(`[name="${fieldName}"]`);
      if (fields.length === 0) return;
      
      const firstField = fields[0];
      let isValid = false;
      
      if (firstField.type === 'radio') {
        const checkedRadio = form.querySelector(`[name="${fieldName}"]:checked`);
        isValid = !!checkedRadio;
      } else if (firstField.type === 'checkbox') {
        isValid = firstField.checked;
      } else {
        isValid = !!firstField.value.trim();
      }
      
      if (isValid) {
        completed++;
      }
    });
    
    console.log('Form completion check:', { completed, total });
    
    // Update field numbers
    fieldNumbers.textContent = `${completed}/${total}`;
    
    // Update banner color
    const isComplete = completed === total;
    
    if (isComplete) {
      banner.classList.remove('registration-banner--inactive');
      banner.classList.add('registration-banner--active');
      banner.classList.add('registration-banner--complete');
      console.log('Banner should be GREEN - all fields complete');
    } else {
      banner.classList.remove('registration-banner--active');
      banner.classList.remove('registration-banner--complete');
      banner.classList.add('registration-banner--inactive');
      console.log('Banner should be BLUE - fields incomplete');
    }
    
    console.log('Banner classes:', banner.className);
    console.log('Computed background color:', window.getComputedStyle(banner).backgroundColor);
  }
  
  // Wait for DOM to be ready
  function init() {
    const form = document.getElementById('nhsForm');
    if (!form) {
      console.log('Form not found, retrying...');
      setTimeout(init, 100);
      return;
    }
    
    console.log('Form found, setting up listeners');
    
    // Add event listeners for all form changes
    form.addEventListener('input', checkFormCompletion);
    form.addEventListener('change', checkFormCompletion);
    
    // Initial check
    checkFormCompletion();
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})(); 