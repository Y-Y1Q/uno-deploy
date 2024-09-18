const render404Page = () => {
  const appDiv = document.querySelector<HTMLDivElement>('#app');
  if (appDiv) {
    appDiv.innerHTML = `
            <div>
                <h1>404 Not Found</h1>
                <p>The page you're looking for does not exist.</p>
            </div>
        `;
  }
};

export default render404Page;
