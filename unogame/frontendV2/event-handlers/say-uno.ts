const sayUnoButton = document.getElementById(
  "sayUnoButton"
) as HTMLButtonElement;

const gameId = (document.getElementById("game-id") as HTMLInputElement | null)
  ?.value;

export function sayUno() {
  if (sayUnoButton) {
    sayUnoButton.addEventListener("click", async (event) => {
      event.preventDefault();
      fetch(`/game/${gameId}/uno`, {
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
        })
        .catch((error) => console.error("Error saying UNO: ", error));
    });
  }
}
