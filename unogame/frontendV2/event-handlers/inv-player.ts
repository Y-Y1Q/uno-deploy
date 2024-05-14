const selectElement = document.getElementById("invPlayer") as HTMLSelectElement;

export function invite() {
  if (selectElement) {
    const gameId = (
      document.getElementById("game-id") as HTMLInputElement | null
    )?.value;

    selectElement.addEventListener("change", (event) => {
      const username = (event.target as HTMLInputElement).value.trim();

      if (username !== "") {
        fetch(`/send-inv/${gameId}`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
      }
    });
  }
}
