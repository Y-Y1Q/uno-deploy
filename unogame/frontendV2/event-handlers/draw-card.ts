const drawButton = document.getElementById("drawButton") as HTMLButtonElement;

export function drawCard() {
  if (drawButton) {
    const gameId = (
      document.getElementById("game-id") as HTMLInputElement | null
    )?.value;
    drawButton.addEventListener("click", async (event) => {
      event.preventDefault();
      fetch(`/game/${gameId}/play`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ card_index: null, wild_color: null }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            console.log("Play card response:", data);
            return;
          }
        })
        .catch((error) => console.error("Error drawing card:", error));
    });
  }
}
