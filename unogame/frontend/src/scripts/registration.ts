export function validateForm(form: HTMLFormElement) {
  const messageContainer = document.querySelector('.message-container') as HTMLElement;
  const password1E = document.getElementById('password1') as HTMLInputElement;
  const message = document.getElementById('message') as HTMLDivElement;
  let isValid = false;

  // ConstraintAPI
  if (form) {
    isValid = form.checkValidity();
}

if (!isValid) {
    if (message) {
        message.textContent = 'Please fill out required fields.';
        message.style.color = 'red';
    }
    if (messageContainer) {
        messageContainer.style.borderColor = 'red';
    }
    if (password1E) {
        password1E.setCustomValidity('');
    }
    return;
}

if (isValid) {
    if (message) {
        message.textContent = 'Successfully Registered!';
        message.style.color = 'green';
    }
    if (messageContainer) {
        messageContainer.style.borderColor = 'green';
    }
    if (password1E) {
        password1E.setCustomValidity('');
    }
}
}

function storeFormData (form: HTMLFormElement) {
  if (form) {
      const user = {
        name : (form.elements as any).name.value,
        username: (form.elements as any).username.value,
        password: (form.elements as any).password1.value,
      };
      console.log(user);
  }
}

function processFormData(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  console.log("before validateForm");
  validateForm(form);
  console.log("after validateForm");
  // Submit data if valid 
  if (form.checkValidity()) {
      storeFormData(form);
  }
}

// Add Event Listener 
const form = document.getElementById('form') as HTMLFormElement;
if (form) {
  form.addEventListener('submit', processFormData);
}