import './style.css';
// login.ts
const renderLoginPage = () => {
    const appDiv = document.querySelector<HTMLDivElement>('#app');
    if (appDiv) {
        appDiv.innerHTML = `
      <div class="flex items-center justify-center h-screen bg-[#392B3E]">
        <div class="w-96 h-160 bg-white flex flex-col items-center rounded-lg shadow-2xl">
          <h1 class="text-8xl">Login</h1>
          <!-- Form -->
          <form id="form" class="w-9/10">
              <!-- Email -->
              <div class="h-16">
                  <label for="username" class="relative bottom-1 mt-1">Username</label>
                  <input type="username" id="username" placeholder="Username" required name="username" class="w-full h-8 p-1 border-black border rounded-none outline-none transition-all duration-300 box-border mb-1">
              </div>
              <!-- Password -->
              <div class="h-16">
                  <label for="password1" class="relative bottom-1 mt-1">Password</label>
                  <input type="password" id="password1" placeholder="Create Password (8 character minimum)" required
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" 
                  title="include 1 uppercase character, 1 lowercase character, and 1 number."
                  class="w-full h-8 p-1 border-black border rounded-none outline-none transition-all duration-300 box-border mb-1">
              </div>
              <button type="submit" class="cursor-pointer text-white bg-black border-none rounded-md h-12 w-full font-sans text-5xl tracking-wider mt-1 hover:brightness-200 focus:outline-none">Register</button>
              <button type="submit" class="cursor-pointer text-white bg-black border-none rounded-md h-12 w-full font-sans text-5xl tracking-wider mt-1 hover:brightness-200 focus:outline-none">Login</button>
          </form>
          <!-- Error/Success Message -->
          <div class="border-black border rounded-md w-9/10 mt-5 flex justify-center text-black">
              <h3 id="message">Log in to your account</h3>
          </div>
        </div>
        </div>
        `;
    }
}

export default renderLoginPage;
