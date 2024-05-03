import { validateForm } from './registration.ts'; // Assuming the registration validation function is correctly implemented

const renderSignUpPage = () => {
  const appDiv = document.querySelector<HTMLDivElement>('#app');
  if (appDiv) {
    appDiv.innerHTML = `
        <div class="flex items-center justify-center h-screen bg-gray-900">
        <div class="w-96 bg-white rounded-lg shadow-xl p-8">
          <h1 class="text-4xl font-bold text-center mb-8">Register</h1>
          <!-- Form -->
          <form id="form" class="space-y-4">
              <!-- Full Name -->
              <div class="h-16">
                  <label for="name" class="block text-gray-700">Full Name</label>
                  <input type="text" id="name" placeholder="Full Name" name="name" required class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-300">
              </div>
              <!-- Username -->
              <div class="h-16">
                  <label for="username" class="block text-gray-700">Username</label>
                  <input type="username" id="username" placeholder="Username" required name="username" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-300">
              </div>
              <!-- Password -->
              <div class="h-16">
                  <label for="password1" class="block text-gray-700">Password</label>
                  <input type="password" id="password1" placeholder="Create Password (8 character minimum)" required 
                  title="include 1 uppercase character, 1 lowercase character, and 1 number."
                  class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-300">
              </div>
              <button id="signupButton" type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:bg-blue-600">Register</button>
              <button id="loginButton" type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:bg-blue-600">Login</button>
          </form>
          <!-- Error/Success Message -->
          <div class="mt-4 text-center text-gray-700" id="message">Sign up now!</div>
        </div>
        </div>
`;
    attachValidationHandlers();
  }
};

function attachValidationHandlers() {
  const form = document.getElementById('form') as HTMLFormElement;
  const passwordInput = document.getElementById(
    'password1',
  ) as HTMLInputElement;

  if (passwordInput) {
    passwordInput.addEventListener('input', function () {
      if (passwordInput.value.length < 8) {
        // check if password is less than 8 characters
        passwordInput.setCustomValidity(
          'Password must be at least 8 characters long.',
        );
      } else {
        passwordInput.setCustomValidity('');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // prevent form submission
      if (passwordInput) {
        validateForm(form); // console logs the form data
        try {
          const formData = {
            fullname: form.querySelector<HTMLInputElement>('#name')?.value,
            username: form.querySelector<HTMLInputElement>('#username')?.value,
            password: form.querySelector<HTMLInputElement>('#password1')?.value,
          };

          // filter out null or undefined values
          const filteredFormData = Object.fromEntries(
            Object.entries(formData).filter(
              ([_, value]) => value !== null && value !== undefined,
            ),
          );

          // send signup request to the server
          const response = await fetch(`/api/signup`, {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(filteredFormData),
          });

          // check if signup was successful
          if (!response.ok) {
            throw new Error('[signup.ts] Failed to sign up');
          }

          // redirect to lobby upon successful signup
          const data = await response.json();
          console.log('[signup.ts] login successful - message:', data.message);
          window.location.href = '/lobby';
        } catch (error) {
          console.error('[signup.ts] Signup failed:', (error as Error).message);
        }
      }
    });
  }

  const loginButton = document.getElementById('loginButton');
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      window.location.href = '/login'; // redirect to login page
    });
  }
}

export default renderSignUpPage;
