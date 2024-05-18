const currentGamesDiv = document.getElementById(
  "current-games"
) as HTMLDivElement;
const availableGamesDiv = document.getElementById(
  "available-games"
) as HTMLDivElement;

export function gameListHandler() {
  if (currentGamesDiv && availableGamesDiv) {
    fetch(`/lobby/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        console.log("Games list:", data);
        displayGameList(currentGamesDiv, data.gamesJoined);
        displayGameList(availableGamesDiv, data.gamesCanJoin);
      })
      .catch((error) =>
        console.error("Error displaying games in lobby:", error)
      );
  }
}

function displayGameList(html: HTMLDivElement, data) {
  let content = "";

  if (data !== undefined && data.length > 0) {
    data.forEach((game) => {
      content += `
            <a
            class="float-left hover:text-blue-800 hover:underline"
            href="/game/${game.id}/join"
            >
            ${game.room_name}
            </a>
    
            <a class="float-right">${game.player_count}/${game.max_players}</a>
            <div style="clear: both;"></div>`;
    });
  } else {
    content = `<p>N/A</p>`;
  }

  html.innerHTML = content;
}
