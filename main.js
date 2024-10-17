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

  const validateField = (field, errorElement, rules) => {
    let isValid = true;
    if (rules.required && !field.value.trim()) {
      isValid = false;
      errorElement.textContent = `${field.name} is required.`;
    } else if (rules.pattern && !rules.pattern.test(field.value)) {
      isValid = false;
      errorElement.textContent = rules.errorMessage;
    } else if (rules.minLength && field.value.length < rules.minLength) {
      isValid = false;
      errorElement.textContent = rules.errorMessage;
    } else {
      errorElement.textContent = '';
    }

    field.setAttribute('aria-invalid', !isValid);
    return isValid;
  };

  const onFieldBlur = (field, errorElement, rules) => {
    field.addEventListener('blur', () => {
      validateField(field, errorElement, rules);
    });
  };

  onFieldBlur(emailField, emailError, validationRules.email);
  onFieldBlur(passwordField, passwordError, validationRules.password);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isEmailValid = validateField(
      emailField,
      emailError,
      validationRules.email
    );
    const isPasswordValid = validateField(
      passwordField,
      passwordError,
      validationRules.password
    );

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
