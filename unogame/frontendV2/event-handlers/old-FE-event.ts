// Not in use

const lobbyContainer = document.getElementById("lobbyContainer")!;

export default function () {
  if (lobbyContainer) {
    lobbyContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLButtonElement;

      if (target.id === "abandonButton") {
        // Handle abandon game logic
        console.log("Game abandoned");
      } else if (target.id === "drawButton") {
        // Handle draw card logic
        console.log("Draw card");
      } else if (target.id === "sayUnoButton") {
        // Handle say UNO logic
        console.log("UNO!");
      }
    });
  }
}
