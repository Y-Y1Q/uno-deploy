const renderUnoGamePage = () => {
    const appDiv = document.querySelector<HTMLDivElement>('#app');

    if (appDiv) {
        appDiv.innerHTML = `
            <div class="flex">
                <div class="w-1/3 border border-red-500 p-4">
                    <h2 class="text-lg font-bold mb-4 text-red-500">UNO GAME</h2>
                    <div class="flex">
                        <div class="w-1/3 border border-red-500 p-4">
                            UNO GAME INTERFACE
                        </div>

                        <div class="w-1/3 border border-red-500 p-4" id="lobbyContainer">
                            <div class="leaderboard bg-gray-200 p-4 rounded">
                                <h3 class="text-lg font-bold mb-2">LEADERBOARD INTERFACE</h3>
                                <p class="text-base mb-2">STATUS - PLAY</p>
                                <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" id="abandonButton">Abandon</button>
                                <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" id="drawButton">Draw</button>
                            </div>
                        </div>

                    </div>
                   
                </div>

                <div class="w-1/3 border border-blue-500 p-4">
                    <h2 class="text-lg font-bold mb-4">CHAT BOX CONTAINER</h2>
                    <!-- Chat box content goes here -->
                </div>
            </div>
        `;

        const lobbyContainer = appDiv.querySelector<HTMLDivElement>('#lobbyContainer');

        if (lobbyContainer) {
            lobbyContainer.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                
                if (target.id === 'abandonButton') {
                    lobbyContainer.innerHTML = `
                    <!-- ABANDON GAME FUNCTIONALITY goes here -->
                    `;

                    const goBackButton = lobbyContainer.querySelector<HTMLButtonElement>('#goBackButton');
                    if (goBackButton) {
                        goBackButton.addEventListener('click', () => {
                            history.back(); // navigate back to the previous page
                        });
                    }

                } else if (target.id === 'drawButton') {
                    lobbyContainer.innerHTML = `
                    <!-- DRAW GAME FUNCTIONALITY goes here -->
                    `;

                    const goBackButton = lobbyContainer.querySelector<HTMLButtonElement>('#goBackButton');
                    if (goBackButton) {
                        goBackButton.addEventListener('click', () => {
                            history.back(); // Navigate back to the previous page
                        });
                    }  
                }
            });
        }
    }
}

export default renderUnoGamePage;
