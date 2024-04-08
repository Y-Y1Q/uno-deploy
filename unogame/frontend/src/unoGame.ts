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
                                <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" id="startGameButton">Abandon</button>
                                <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" id="joinRoomButton">Draw</button>
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
                
                if (target.id === 'startGameButton') {
                    lobbyContainer.innerHTML = `
                        <h2 class="text-lg font-bold mb-4">LOBBY</h2>
                        <div class="flex flex-col justify-center items-center max-h-full border border-blue-500 p-4">
                            <div class="mb-4">
                                <h3 class="text-xl font-bold">Welcome Donald Trump</h3>
                            </div>
                            <div class="mb-4">
                                <input class="w-full p-2 border border-gray-300 rounded" placeholder="Room Name"></input>
                            </div>
                            <div class="mb-4">
                                <select id="playerCount" name="playerCount" class="w-full p-2 border border-gray-300 rounded">
                                    <option value="" disabled selected>Select Number of Players</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <select id="playerChoice" name="playerChoice" class="w-full p-2 border border-gray-300 rounded">
                                    <option value="" disabled selected>Select Players</option>
                                    <option value="P.Diddy">P.Diddy</option>
                                    <option value="6ix9ine">6ix9ine</option>
                                    <option value="Kanye West">Kanye West</option>
                                    <option value="Chris Brown">Chris Brown</option>
                                </select>
                            </div>
                            <div>
                                <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full" id="confirmSelectionButton">Confirm Selection</button>
                                <button class="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full" id="goBackButton">Go Back</button>
                            </div>
                        </div>
                    `;

                    const goBackButton = lobbyContainer.querySelector<HTMLButtonElement>('#goBackButton');
                    if (goBackButton) {
                        goBackButton.addEventListener('click', () => {
                            history.back(); // navigate back to the previous page
                        });
                    }

                } else if (target.id === 'confirmSelectionButton') {
                    lobbyContainer.innerHTML = `
                        <h2 class="text-lg font-bold mb-4">WAITING ROOM</h2>
                        <div class="flex flex-col justify-center items-center max-h-full border border-blue-500 p-4">
                            <div class="mb-4">
                                <h3 class="text-xl font-bold">Welcome Donald Trump</h3>
                            </div>
                            <div class="mb-4">
                                r.kelly room
                            </div>
                            <div class="mb-4">
                                <p> 1/2 players joined</p>
                                <p> You are in the room</p>
                                <p> Waiting for other players to join</p>
                            </div>
                            <div>
                                <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full" id="playGameButton">Play Game</button>
                                <button class="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full" id="goBackButton">Go Back</button>
                            </div>
                        </div>
                    `;

                    const goBackButton = lobbyContainer.querySelector<HTMLButtonElement>('#goBackButton');
                    if (goBackButton) {
                        goBackButton.addEventListener('click', () => {
                            history.back(); // Navigate back to the previous page
                        });
                    }
                    
                } else if (target.id === 'joinRoomButton') {
                    lobbyContainer.innerHTML = `
                        <h2 class="text-lg font-bold mb-4">JOIN A ROOM</h2>
                        <div class="flex flex-col justify-center items-center max-h-full border border-blue-500 p-4">
                            <div class="mb-4">
                                <h3 class="text-xl font-bold">Welcome Donald Trump</h3>
                            </div>
                            <div class="mb-4">
                                r.kelly room
                            </div>
                            <div class="mb-4">
                                kanye west room
                            </div>
                            <div>
                                <button class="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full" id="goBackButton">Go Back</button>
                            </div>
                        </div>
                    `;

                    const goBackButton = lobbyContainer.querySelector<HTMLButtonElement>('#goBackButton');
                    if (goBackButton) {
                        goBackButton.addEventListener('click', () => {
                            history.back(); // navigate back to the previous page
                        });
                    }
                }
            });
        }
    }
}

export default renderUnoGamePage;
