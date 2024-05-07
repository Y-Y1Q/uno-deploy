import io from 'socket.io-client';
import renderUnoGamePage from './unoGame';

const renderLobbyPage = async () => {
  const appDiv = document.querySelector<HTMLDivElement>('#app');

  const socket = io('http://localhost:3333', { withCredentials: true });

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
                        <button id="startGameButton" class="bg-blue-500 text-white px-4 py-2 rounded mt-4" >Start Game</button>
                        <button id="joinRoomButton" class="bg-red-500 text-white px-4 py-2 rounded mt-4" >Join a Game</button>
                        <button id="logoutButton" class="bg-green-500 text-white px-4 py-2 rounded mt-4" >Log out</button>
                    </div>
                </div>

                <div class="w-1/3 border border-blue-500 p-4 flex flex-col">
                <h2 class="text-lg font-bold mb-4">CHAT BOX CONTAINER</h2>
                <div class="flex-grow border border-gray-300 p-4 mb-4 flex flex-col">
                  <div class="chatbox flex-grow h-64 overflow-y-auto" id="chatbox">

                  <!-- Simulated messages -->
                  
                  <div class="flex justify-end mb-2">
                    <div class="bg-blue-200 text-blue-700 rounded py-2 px-4">
                      <p>Hello, anyone there?</p>
                      <p class="text-right font-bold">6ix9ine</p>
                    </div>
                  </div>

                  <div class="flex justify-end mb-2">
                  <div class="bg-blue-200 text-blue-700 rounded py-2 px-4">
                    <p>I'm here</p>
                    <p class="text-right font-bold">Donald Trump</p>
                  </div>
                </div>

                <div class="flex justify-end mb-2">
                <div class="bg-blue-200 text-blue-700 rounded py-2 px-4">
                  <p>I'm here too</p>
                  <p class="text-right font-bold">Kanye West</p>
                </div>
              </div>

              <!-- New Chat messages will be added here -->
                  
                  </div>
                  <form id="chatForm" class="flex">
                    <input type="text" id="chatMessage" placeholder="Type your message" required name="chatMessage" class="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-300">
                    <input type="submit" value="Send" class="bg-blue-500 text-white px-4 py-2 rounded ml-2">
                  </form>
                </div>
              </div>
        `;

    // listen for 'message' events from the server specifically for the lobby
    socket.on('chat:message:0', (data) => {
      const chatbox = document.querySelector('#chatbox');
      if (chatbox) {
        const newMessage = document.createElement('div');
        newMessage.classList.add('flex', 'justify-start', 'mb-2');

        const messageBubble = document.createElement('div');
        messageBubble.classList.add(
          'bg-green-200',
          'text-green-700',
          'rounded',
          'py-2',
          'px-4',
        );
        messageBubble.innerHTML = `<p>${data.message}</p><p class="text-left font-bold">${data.from}</p>`;

        newMessage.appendChild(messageBubble);
        chatbox.appendChild(newMessage);
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    });

    // adding a delay to ensure the DOM is fully loaded might help in certain cases
    await new Promise((resolve) => setTimeout(resolve, 0));

    const chatForm = document.querySelector('#chatForm');
    if (chatForm) {
      chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const chatMessageInput = chatForm.querySelector('#chatMessage');
        if (chatMessageInput) {
          const chatMessageInput = chatForm.querySelector(
            '#chatMessage',
          ) as HTMLInputElement;
          const chatMessage = chatMessageInput.value;
          try {
            const response = await fetch('/api/lobby/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({ message: chatMessage }),
            });

            if (!response.ok) {
              throw new Error('Failed to send message');
            }
          } catch (error) {
            console.error('Error sending message:', error);
          }
          chatMessageInput.value = '';
        }
      });
    }

    const lobbyContainer =
      appDiv.querySelector<HTMLDivElement>('#lobbyContainer');

    // retrieve the username from local storage
    const storedUsername = localStorage.getItem('username');
    console.log('[lobby.ts] Stored username in local storage:', storedUsername);
    // check if the stored username exists
    if (storedUsername) {
      const welcomeMessage =
        // find the welcome message element in the lobby container
        lobbyContainer?.querySelector<HTMLHeadingElement>('h3');
      // check if the welcome message element exists
      if (welcomeMessage) {
        console.log(
          '[lobby.ts] Welcome message element found in local storage',
        );
        // update the welcome message with the stored username
        welcomeMessage.textContent = `Welcome ${storedUsername}`;
      } else {
        console.log(
          '[lobby.ts] Welcome message element not found in local storage',
        );
        console.error('[lobby.ts] Username element not found in local storage');
      }
    }

    if (lobbyContainer) {
      lobbyContainer.addEventListener('click', async (event) => {
        const target = event.target as HTMLElement;

        if (target.id === 'startGameButton') {
          lobbyContainer.innerHTML = `
                        <h2 class="text-lg font-bold mb-4">LOBBY</h2>
                        <div class="flex flex-col justify-center items-center max-h-full border border-blue-500 p-4">
                            <div class="mb-4">
                                <h3 class="text-xl font-bold">${storedUsername ? `Welcome ${storedUsername}` : 'Welcome Guest'}</h3>
                            </div>
                            <div class="mb-4">
                                <input class="w-full p-2 border border-gray-300 rounded" id="roomNameInput" placeholder="Room Name"></input>
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
                            <div>
                                <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full" name="confirmButton" id="confirmSelectionButton">Confirm Selection</button>
                                <button class="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full" id="goBackButton">Go Back</button>
                            </div>
                        </div>
                    `;

          const confirmButton = lobbyContainer.querySelector<HTMLButtonElement>(
            '#confirmSelectionButton',
          );
          console.log('[lobby.ts] Confirm Button:', confirmButton);

          if (confirmButton) {
            confirmButton.addEventListener('click', async () => {
              console.log('[lobby.ts] Confirm Selection Button clicked');
              const roomNameInput =
                lobbyContainer.querySelector<HTMLInputElement>(
                  '#roomNameInput',
                );
              // const playerCountSelect =
              //   lobbyContainer.querySelector<HTMLSelectElement>('#playerCount');

              if (roomNameInput && roomNameInput.value.trim() !== '') {
                const roomName = roomNameInput.value.trim();

                console.log('[lobby.ts] Room Name:', roomName);
                // console.log('[lobby.ts] Player Count:', playerCount);

                try {
                  const response = await fetch('/api/game/create', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ roomName }),
                  });

                  if (response.ok) {
                    console.log('[lobby.ts] Game room created successfully');
                  } else {
                    throw new Error('[lobby.ts] Failed to create game room');
                  }
                } catch (error) {
                  console.error('[lobby.ts] Error creating game room:', error);
                }
              } else {
                console.error('[lobby.ts] Room name is required');
              }
            });
          }

          const goBackButton =
            lobbyContainer.querySelector<HTMLButtonElement>('#goBackButton');
          if (goBackButton) {
            goBackButton.addEventListener('click', () => {
              history.back(); // navigate back to the previous page
            });
          }
        } else if (target.id === 'confirmSelectionButton') {
          // fetch list of players from the server
          try {
            const response = await fetch('/api/lobby/players', {
              method: 'POST',
              credentials: 'include',
            });

            // check if the response is successful
            if (!response.ok) {
              throw new Error('[lobby.ts] Failed to retrieve list of players');
            }

            // parse the list of players from the response
            const playerList = await response.json();
            console.log('[lobby.ts] List of players:', playerList);

            // update the lobbyContainer with the waiting room UI and the list of players
            lobbyContainer.innerHTML = `
              <h2 class="text-lg font-bold mb-4">WAITING ROOM</h2>
              <div class="flex flex-col justify-center items-center max-h-full border border-blue-500 p-4">
                <div class="mb-4">
                  <h3 class="text-xl font-bold">${storedUsername ? `Welcome ${storedUsername}` : 'Welcome Guest'}</h3>
                </div>
                <div class="mb-4">
                  r.kelly room
                </div>
                <div class="mb-4">
                  <p> 1/2 players joined</p>
                  <p> You are in the room</p>
                  <p> Waiting for other players to join</p>
                </div>
                <div class="mb-4">
                <select id="playerChoice" name="playerChoice" class="w-full p-2 border border-gray-300 rounded">
                  <option value="" disabled selected>Invite Players</option>
                   ${playerList.map((player: any) => `<option value="${player.id}">${player.username}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full" id="playGameButton">Play Game</button>
                  <button class="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full" id="goBackButton">Go Back</button>
                </div>
              </div>
            `;
          } catch (error) {
            console.error(
              '[lobby.ts] Failed to retrieve list of players:',
              error,
            );
          }
          const goBackButton =
            lobbyContainer.querySelector<HTMLButtonElement>('#goBackButton');
          if (goBackButton) {
            goBackButton.addEventListener('click', () => {
              history.back(); // navigate back to the previous page
            });
          }
        } else if (target.id === 'joinRoomButton') {
          lobbyContainer.innerHTML = `
                        <h2 class="text-lg font-bold mb-4">JOIN A ROOM</h2>
                        <div class="flex flex-col justify-center items-center max-h-full border border-blue-500 p-4">
                            <div class="mb-4">
                                <h3 class="text-xl font-bold">Welcome Donald Trump</h3>
                            </div>
                            <div class="flex justify-between w-full border-b border-red-500">
                              <div class="w-1/2 px-2 mb-4">
                                <h4 class="text-lg font-bold mb-2 border-b border-blue-500">Available Rooms</h4>
                                <ul>
                                    <li class="py-1">Gas Chamber</li>
                                    <li class="py-1">The War Room</li>
                                    <li class="py-1">Red Room</li>
                                </ul>
                              </div>
                                <div class="w-1/2 px-2 mb-4">
                                  <h4 class="text-lg font-bold mb-2 border-b border-green-500">Current rooms</h4>
                                    <ul class="border-none">
                                      <li class="py-1">The Green Room</li>
                                      <li class="py-1">The Chamber of Secrets</li>
                                      <li class="py-1">Confederate Legacy Room</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div>
                                <button class="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full" id="goBackButton">Go Back</button>
                            </div>
                        </div>
                    `;

          const goBackButton =
            lobbyContainer.querySelector<HTMLButtonElement>('#goBackButton');
          if (goBackButton) {
            goBackButton.addEventListener('click', () => {
              history.back(); // navigate back to the previous page
            });
          }
        }

        // redirection to the game page
        if (target.id === 'playGameButton') {
          renderUnoGamePage();
        }

        if (target.id === 'logoutButton') {
          logout();
        }
      });
    }
  }
};

// const initializeLobbyPage = (playerList: string[]) => {
//   console.log('initializeLobbyPage function is called');
//   console.log('[lobby.ts] List of players:', playerList);
//   // update select element with player list
//   const playerChoiceSelect = document.getElementById(
//     'playerChoice',
//   ) as HTMLSelectElement;
//   console.log('[lobby.ts] playerChoiceSelect:', playerChoiceSelect);
//   if (playerChoiceSelect) {
//     console.log('[lobby.ts] Player choice select element found');
//     playerChoiceSelect.innerHTML = ''; // clear existing options
//     playerChoiceSelect.add(new Option('Invite Players', '', true, true)); // add default option
//     playerList.forEach((player: string) => {
//       playerChoiceSelect.add(new Option(player, player));
//     });
//   }
// };

const logout = async () => {
  try {
    // send logout request to the server
    const response = await fetch(`/api/logout`, {
      credentials: 'include',
      method: 'POST',
    });

    // check if logout was successful
    if (response.ok) {
      // redirect to the mainn page upon successful logout
      window.location.href = '/';
      console.log('[Lobby.ts] Logged out successfully');
    } else {
      throw new Error('[lobby.ts] Failed to log out');
    }
  } catch (error) {
    console.error('[lobby.ts] Logout failed:', error);
  }
};

export default renderLobbyPage;
