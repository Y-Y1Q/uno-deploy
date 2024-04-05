// lobby.ts
const renderLobbyPage = () => {
    const appDiv = document.querySelector<HTMLDivElement>('#app');

    if (appDiv) {
        appDiv.innerHTML = `
            <div class="flex">
                <div class="w-1/3 border border-red-500 p-4">
                    <h2 class="text-lg font-bold mb-4 text-red-500">RULES CONTAINER</h2>
                    <div class="rules-content">
                        <p class="border-l-4 border-red-500 pl-4 mb-4">
                            <span class="font-bold block mb-2">Setup:</span>
                            The deck consists of 108 cards - 25 cards in each of red, green, blue, and yellow, with values of 0-9 in each color. There are also 8 "Draw Two" and "Reverse" cards, and 4 "Skip" and "Wild" cards. Choose a dealer and deal each player 7 cards. Place the remaining cards face down in the center to form a draw pile. Flip over the top card to start the discard pile.
                        </p>

                        <p class="border-l-4 border-red-500 pl-4 mb-4">
                            <span class="font-bold block mb-2">Playing the Game:</span>
                            Players take turns matching a card from their hand to the card on the top of the discard pile, either by number, color, or symbol (symbols are Draw Two, Reverse, and Skip). If you don't have a matching card, you must draw from the draw pile until you get a playable card.
                        </p>

                        <p class="border-l-4 border-red-500 pl-4 mb-4">
                            <span class="font-bold block mb-2">Special Cards:</span>
                            Skip: When played, skip the next player. Reverse: Reverses direction of play. Draw Two: Next player draws two cards and misses a turn. Wild: Play any color you want and state the new color. Wild Draw Four: Player gets to choose new color and next player draws four cards and misses a turn. Can only be played if the player doesn't have a card in the color led.
                        </p>

                        <p class="border-l-4 border-red-500 pl-4 mb-4">
                            <span class="font-bold block mb-2">Going Out (Getting Uno):</span>
                            When you get down to one card left, you must say "Uno" to alert other players. Failing to do so results in drawing two more cards if caught. You can go out by discarding your second-to-last card if it matches the upcard, then discarding your last card. The first player to get rid of all their cards wins! Players score points for cards left in opponents' hands.
                        </p>
                        
                    </div>
                </div>

                <div class="w-1/3 border border-pink-500 p-4" id="lobbyContainer">
                    <h2 class="text-lg font-bold mb-4">LOBBY CONTAINER</h2>
                    <h3 class="mb-2">Welcome Donald Trump</h3>
                    <div class="flex flex-col justify-center items-center">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4" id="startGameButton">Start Game</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded mt-4">Join a Game</button>
                        <button class="bg-green-500 text-white px-4 py-2 rounded mt-4">Log out</button>
                    </div>
                </div>

                <div class="w-1/3 border border-blue-500 p-4">
                    <h2 class="text-lg font-bold mb-4">CHAT BOX CONTAINER</h2>
                    <!-- Chat box content goes here -->
                </div>
            </div>
        `;

        const startGameButton = appDiv.querySelector<HTMLButtonElement>('#startGameButton');
        const lobbyContainer = appDiv.querySelector<HTMLDivElement>('#lobbyContainer');

        if (startGameButton && lobbyContainer) {
            startGameButton.addEventListener('click', () => {
                lobbyContainer.innerHTML = `
                    <h2 class="text-lg font-bold mb-4">GAME CONTAINER</h2>
                    <h3>Welcome Donald Trump</h3>
                    <div class="flex flex-col justify-center items-center">
                       <input placeholder="room name"></input>
    
                        <select id="playerCount" name="playerCount">
                            <option value="" disabled selected>select number of players</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>

                        <select id="playerChoice" name="playerChoice">
                            <option value="" disabled selected>select players</option>
                            <option value="P.Diddy">P.Diddy</option>
                            <option value="6ix9ine">6ix9ine</option>
                            <option value="Kanye West">Kanye West</option>
                            <option value="Chris Brown">Chris Brown</option>
                        </select>

                    </div>
                    <div>
                    <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4" id="startGameButton">Start Game</button>
                    <button class="bg-gray-500 text-white px-4 py-2 rounded mt-4" id="goBackButton">Go Back</button>
                    </div>
                    
                `;
            });
        }

        const rulesContentDiv = appDiv.querySelector<HTMLDivElement>('.rules-content');
        if (rulesContentDiv) {
            rulesContentDiv.classList.add('max-h-400', 'overflow-y-auto'); 
        }
    }
}

export default renderLobbyPage;
