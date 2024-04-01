// login.ts
const renderLoginPage = () => {
    const appDiv = document.querySelector<HTMLDivElement>('#app');
    if (appDiv) {
        appDiv.innerHTML = `
            <div>
                <h1>Login Page</h1>
                <form>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username"><br><br>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password"><br><br>
                    <button type="submit">Login</button>
                </form>
            </div>
        `;
    }
}

export default renderLoginPage;
