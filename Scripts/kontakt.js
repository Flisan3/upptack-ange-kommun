document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const fields = [
    {
      name: 'name',
      validator: value => value.trim().length >= 2,
      message: 'Ange ett namn med minst 2 tecken.'
    },
    {
      name: 'email',
      validator: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Ange en giltig e-postadress.'
    },
    {
      name: 'subject',
      validator: value => value.trim().length >= 3,
      message: 'Ange ett ämne.'
    },
    {
      name: 'message',
      validator: value => value.trim().length >= 10,
      message: 'Skriv ett meddelande med minst 10 tecken.'
    }
  ];

  const getFormGroup = element => element.closest('.form-group');

  const showError = (input, message) => {
    const group = getFormGroup(input);
    if (!group) return;
    group.classList.add('invalid');
    const error = group.querySelector('.form-error');
    if (error) {
      error.textContent = message;
    }
  };

  const clearError = input => {
    const group = getFormGroup(input);
    if (!group) return;
    group.classList.remove('invalid');
    const error = group.querySelector('.form-error');
    if (error) {
      error.textContent = '';
    }
  };

  form.addEventListener('submit', event => {
    event.preventDefault();

    let isValid = true;

    fields.forEach(({ name, validator, message }) => {
      const input = form.querySelector(`[name="${name}"]`);
      const value = input ? input.value : '';
      if (!validator(value)) {
        isValid = false;
        showError(input, message);
      } else {
        clearError(input);
      }
    });

    if (!isValid) {
      return;
    }

    form.reset();
    const success = document.createElement('p');
    success.className = 'form-success';
    success.textContent = 'Tack! Ditt meddelande har skickats in.';
    form.appendChild(success);
    setTimeout(() => success.remove(), 5000);
  });

  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });
});
