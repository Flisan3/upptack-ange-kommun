const noDangerousChars = value => !/[<>]/.test(value);

// Hanterar validering och interaktion för kontaktformuläret
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // Definiera fält och deras valideringsregler samt se till att farliga symboler inte används.
const fields = [
  {
    name: 'name',
    validator: value =>
      noDangerousChars(value) &&
      value.trim().length >= 2,
    message: 'Ange ett namn med minst 2 tecken.'
  },
  {
    name: 'email',
    validator: value =>
      noDangerousChars(value) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Ange en giltig e-postadress.'
  },
  {
    name: 'subject',
    validator: value =>
      noDangerousChars(value) &&
      value.trim().length >= 3,
    message: 'Ange ett ämne.'
  },
  {
    name: 'message',
    validator: value =>
      noDangerousChars(value) &&
      value.trim().length >= 10,
    message: 'Skriv ett meddelande med minst 10 tecken.'
  }
];

  // Funktioner för att visa och rensa felmeddelanden
  const getFormGroup = element => element.closest('.form-group');

  // Funktion för att visa ett felmeddelande för ett specifikt inputfält
  const showError = (input, message) => {
    const group = getFormGroup(input);
    if (!group) return;
    group.classList.add('invalid');
    const error = group.querySelector('.form-error');
    if (error) {
      error.textContent = message;
    }
  };

  // Funktion för att rensa felmeddelanden när användaren börjar skriva
  const clearError = input => {
    const group = getFormGroup(input);
    if (!group) return;
    group.classList.remove('invalid');
    const error = group.querySelector('.form-error');
    if (error) {
      error.textContent = '';
    }
  };

  // Event listener för att hantera formulärets submit-event och validera fälten
  form.addEventListener('submit', event => {
    event.preventDefault();

    let isValid = true;

    // Validera varje fält och visa felmeddelanden vid behov
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

    // Simulera formulärskickning och visa en framgångsmeddelande
    form.reset();
    const success = document.createElement('p');
    success.className = 'form-success';
    success.textContent = 'Tack! Ditt meddelande har skickats in.';
    form.appendChild(success);
    setTimeout(() => success.remove(), 5000);
  });

  // Lägg till event listeners för att rensa felmeddelanden när användaren börjar skriva i något av fälten
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });
});
