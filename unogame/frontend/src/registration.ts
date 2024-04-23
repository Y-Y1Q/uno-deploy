export function validateForm(form: HTMLFormElement) {
  const nameInput = form.querySelector<HTMLInputElement>('#name');
  const usernameInput = form.querySelector<HTMLInputElement>('#username');
  const passwordInput = form.querySelector<HTMLInputElement>('#password1');

  if (nameInput && usernameInput && passwordInput) {
    const name = nameInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;

    console.log('[registration.ts] User entered:');
    console.log('[registration.ts] Name:', name);
    console.log('[registration.ts] Username:', username);
    console.log('[registration.ts] Password:', password);
  }
}

function storeFormData(form: HTMLFormElement) {
  if (form) {
    const user = {
      name: (form.elements as any).name.value,
      username: (form.elements as any).username.value,
      password: (form.elements as any).password1.value,
    };
    console.log('[registration.ts] Stored User Data:', user);
  }
}

function processFormData(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  console.log('[registration.ts] Before validateForm');
  validateForm(form);
  console.log('[registration.ts] After validateForm');
  // Submit data if valid
  if (form.checkValidity()) {
    storeFormData(form);
    console.log('[registration.ts] Form submission successful!');
  }
}

// Add Event Listener
const form = document.getElementById('form') as HTMLFormElement;
if (form) {
  form.addEventListener('submit', processFormData);
}
