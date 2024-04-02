// lobby.ts
const renderLobbyPage = () => {
    const appDiv = document.querySelector<HTMLDivElement>('#app');
    if (appDiv) {
        appDiv.innerHTML = `
            <div>
                <div class="flex">
                <div class="w-1/3 border border-red-500 p-4">
                    <h2 class="text-lg font-bold mb-4 text-red-500">RULES CONTAINER</h2>
                </div>
                <div class="w-1/3 border border-pink-500 p-4">
                    <h2 class="text-lg font-bold mb-4">LOBBY CONTAINER</h2>
                </div>
                <div class="w-1/3 border border-blue-500 p-4">
                    <h2 class="text-lg font-bold mb-4">CHAT BOX CONTAINER</h2>
                </div>
        
            </div>
        `;
    }
}

export default renderLobbyPage;
