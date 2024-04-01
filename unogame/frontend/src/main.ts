import './style.css'
// import { route } from './router.ts'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <nav id="nav">
    <a href="/" onclick="event.preventDefault(); window.route(event)">Lobby</a>
    <a href="/login" onclick="event.preventDefault(); window.route(event)">Login</a>
    <a href="/signup" onclick="event.preventDefault(); window.route(event)">Sign up</a>
    </nav>
  <div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


