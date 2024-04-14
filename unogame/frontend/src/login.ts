const renderLoginPage = () => {
  const appDiv = document.querySelector<HTMLDivElement>("#app");

  if (appDiv) {
    appDiv.innerHTML = `
            <div class="flex items-center justify-center h-screen bg-gray-900">
                <div class="w-96 bg-white rounded-lg shadow-xl p-8">
                    <h1 class="text-4xl font-bold text-center mb-8">Login</h1>
                    <!-- Form -->
                    <form id="form" class="space-y-4">
                        <!-- Username Input -->
                        <div>
                            <label for="username" class="block text-gray-700">Username</label>
                            <input type="text" id="username" placeholder="Username" required name="username" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-300">
                        </div>
                        <!-- Password Input -->
                        <div>
                            <label for="password" class="block text-gray-700">Password</label>
                            <input type="password" id="password" placeholder="Password" required name="password" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-300">
                        </div>
                        <!-- Submit Button -->
                        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:bg-blue-600">Login</button>
                    </form>
                    <!-- Error/Success Message -->
                    <div class="mt-4 text-center text-red-500" id="message">Log in to your account</div>
                </div>
            </div>
        `;
  }
};

export default renderLoginPage;
