// lobby.ts
const renderLobbyPage = () => {
    const appDiv = document.querySelector<HTMLDivElement>('#app');
    if (appDiv) {
        appDiv.innerHTML = `
            <div>
                <h1>Welcome to the Lobby!</h1>
                <p>This is the lobby page where you can...</p>
            </div>
        `;
    }
}

export default renderLobbyPage;
