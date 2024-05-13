const cardContainer = document.getElementById(
  "cardContainer"
) as HTMLDivElement;

const discardPileContainer = document.getElementById(
  "discardPileContainer"
) as HTMLDivElement;

const opponentsContainer = document.getElementById(
  "opponentsContainer"
) as HTMLDivElement;

const gameId = (document.getElementById("game-id") as HTMLInputElement | null)
  ?.value;

export function unoDisplay() {
  if (cardContainer) {
    updateGameState();
  }
}

function updateGameState() {
  fetch(`/game/${gameId}/get-status`, { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Current Game State:", data);
      displayCards(data.current_user_cards);
      displayDiscard(data.last_card_played);
      displayOpponents(data.opponent_info);
    })
    .catch((error) => console.error("Error fetching game state:", error));
}

function displayOpponents(opponents) {
  opponentsContainer.innerHTML = "";

  opponents.forEach((opponent) => {
    const opponentDiv = document.createElement("div");
    opponentDiv.classList.add("flex", "items-center", "justify-center", "m-4");

    const avatarImg = document.createElement("img");
    avatarImg.src = "cards/Back.png";
    avatarImg.alt = "Card Back";
    avatarImg.classList.add("w-16", "h-24");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("flex", "flex-col", "items-center", "ml-2");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = opponent.username;
    const countSpan = document.createElement("span");
    countSpan.textContent = `x${opponent.card_count}`;

    infoDiv.appendChild(nameSpan);
    infoDiv.appendChild(countSpan);
    opponentDiv.appendChild(avatarImg);
    opponentDiv.appendChild(infoDiv);

    opponentsContainer.appendChild(opponentDiv);
  });
}

function displayCards(cards) {
  cardContainer.innerHTML = "";
  cards.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("relative", "inline-block", "m-2");

    const cardElement = document.createElement("img");
    cardElement.src = card.path;
    cardElement.alt = `${card.type}`;
    cardElement.classList.add(
      "w-16",
      "h-24",
      "cursor-pointer",
      "hover:scale-125"
    );
    cardDiv.appendChild(cardElement);

    if (card.type.includes("wild")) {
      const selectElement = document.createElement("select");
      const defaultOption = document.createElement("option");
      defaultOption.selected = true;
      defaultOption.disabled = true;
      selectElement.appendChild(defaultOption);

      ["Red", "Blue", "Yellow", "Green"].forEach((color) => {
        const option = document.createElement("option");
        option.value = color.toLowerCase();
        option.text = color;
        selectElement.appendChild(option);
      });

      selectElement.classList.add(
        "absolute",
        "top-0",
        "left-0",
        "w-full",
        "h-full",
        "opacity-0",
        "cursor-pointer"
      );
      selectElement.style.display = "none";

      cardElement.addEventListener("click", () => {
        selectElement.style.display = "block";
        selectElement.classList.remove("opacity-0");
      });

      selectElement.addEventListener("change", () => {
        playCard(index, selectElement.value);
        selectElement.style.display = "none";
      });

      cardDiv.appendChild(selectElement);
    } else {
      cardElement.addEventListener("click", () => {
        playCard(index, null);
      });
    }

    cardContainer.appendChild(cardDiv);
  });
}

function displayDiscard(card) {
  discardPileContainer.innerHTML = "";
  const cardElement = document.createElement("img");
  cardElement.src = card.path;
  cardElement.alt = `${card.type}`;
  cardElement.classList.add("w-16");
  discardPileContainer.style.border = `3px solid ${card.color}`;
  discardPileContainer.appendChild(cardElement);
}

function playCard(cardIndex, wildColor) {
  fetch(`/game/${gameId}/play`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      card_index: cardIndex,
      wild_color: wildColor,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        alert(data.error);
        return;
      }
      console.log("Play card response:", data);
    })
    .catch((error) => console.error("Error playing card:", error));
}

/*

Toggle to hide interface


// display uno
const startGameButton = document.getElementById("startGameButton");
startGameButton.style.display = "none";

function showGameControls() {
  drawButton.classList.remove("hidden");
  sayUnoButton.classList.remove("hidden");
}

*/
