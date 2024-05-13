const sayUnoButton = document.getElementById(
  "sayUnoButton"
) as HTMLButtonElement;

// TODO

export function sayUno() {
  if (sayUnoButton) {
    const gameId = (
      document.getElementById("game-id") as HTMLInputElement | null
    )?.value;

    sayUnoButton.addEventListener("click", () =>
      alert(`SAY UNO! button clicked in Room ID - ${gameId}`)
    );
  }
}
