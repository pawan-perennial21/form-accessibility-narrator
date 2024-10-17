document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('accessibleForm');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  // Email and Password Validation Rules
  const validationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: 'Invalid email address',
    },
    password: {
      required: true,
      minLength: 6,
      errorMessage: 'Password must be at least 6 characters',
    },
  };

  // Function to validate email field
  window.validateFieldEmail = () => {
    console.log("hello")
    return validateField(emailField, emailError, validationRules.email);
  };

  // Function to validate password field
  window.validateFieldPassword = () => {
    return validateField(passwordField, passwordError, validationRules.password);
  };

  const validateField = (field, errorElement, rules) => {
    let isValid = true;

    // Clear all previous error announcements
    emailError.setAttribute('aria-live', 'off');
    passwordError.setAttribute('aria-live', 'off');

    if (rules.required && !field.value.trim()) {
      isValid = false;
      errorElement.textContent = `${field.name} is required.`;
      errorElement.setAttribute('aria-live', 'assertive'); 
    } else if (rules.pattern && !rules.pattern.test(field.value)) {
      isValid = false;
      errorElement.textContent = rules.errorMessage;
      errorElement.setAttribute('aria-live', 'assertive'); 
    } else if (rules.minLength && field.value.length < rules.minLength) {
      isValid = false;
      errorElement.textContent = rules.errorMessage;
      errorElement.setAttribute('aria-live', 'assertive');
    } else {
      errorElement.textContent = '';
      errorElement.setAttribute('aria-live', 'off'); 
    }

    field.setAttribute('aria-invalid', !isValid);
    return isValid;
  };

  const onFieldBlur = (field, errorElement, validateFunction) => {
    field.addEventListener('blur', () => {
      validateFunction();
      errorElement.setAttribute('aria-live', 'off');
    });
  };

  // Add focus event to announce errors only for focused field
  const onFieldFocus = (field, errorElement) => {
    field.addEventListener('focus', () => {
      if (errorElement.textContent) {
        errorElement.setAttribute('aria-live', 'assertive'); // Announce error for focused field
      } else {
        errorElement.setAttribute('aria-live', 'off'); // Clear if no error
      }
    });
  };

  onFieldBlur(emailField, emailError, validateFieldEmail);
  onFieldBlur(passwordField, passwordError, validateFieldPassword);
  onFieldFocus(emailField, emailError);
  onFieldFocus(passwordField, passwordError);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isEmailValid = validateFieldEmail();
    const isPasswordValid = validateFieldPassword();

    if (isEmailValid && isPasswordValid) {
      console.log({
        email: emailField.value,
        password: passwordField.value,
      });
      form.reset();
      emailError.textContent = '';
      passwordError.textContent = '';
      alert('Form submitted successfully.');
    }
  });
});
