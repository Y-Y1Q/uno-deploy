import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <nav id="nav" class="sidebar">
      <a href= "/" onclick="route()">Lobby</a>
      <a href= "/login" onclick="route()">Login</a>
      <a href= "/signup" onclick="route()">Sign up</a>
    </nav>
  <div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
