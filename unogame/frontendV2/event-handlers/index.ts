import { sendMessage } from "./chat-form";
import { drawCard } from "./draw-card";
import { invite } from "./inv-player";
import { sayUno } from "./say-uno";
import { unoDisplay } from "./uno-display";

export default [sendMessage, invite, drawCard, sayUno, unoDisplay];

//Event handler template
/*


const someForm = document.getElementById("someFormId") as HTMLFormElement;

// Hidden input value render from BE route
// in frontendV2/views/layout/server-var.ejs

 const gameId = (
            document.getElementById("game-id") as HTMLInputElement | null
        )?.value;

export function someFunc() {
  if (someForm) {
    //do something
  }
}

// When finished, import and export in ./index.ts, so it can be bundled

*/
