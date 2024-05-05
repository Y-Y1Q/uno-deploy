const messageForm = document.getElementById("chatForm") as HTMLFormElement;

export default function () {
  if (messageForm) {
    const messageInput = document.getElementById(
      "chatMessage"
    ) as HTMLInputElement;
    const gameId = (
      document.getElementById("game-id") as HTMLInputElement | null
    )?.value;
    messageForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = messageInput.value.trim();
      if (message !== "") {
        fetch(`/chat/${gameId}`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
      }
      messageInput.value = "";
    });
  }
}
