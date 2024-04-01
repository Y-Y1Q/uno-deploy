import renderLobbyPage from "./lobby";
import renderLoginPage from "./login";

// Extend the Window interface to include a route property
declare global {
    interface Window {
        route?: (event: Event) => void;
    }
}

// Route function
const route = (event: Event) => {
    // Prevent the default action of the click event to the href
    event.preventDefault();

    // Update the URL on the browser
    window.history.pushState({}, "", (event.target as HTMLAnchorElement).href); 

    console.log("[router.js] Route clicked:", event.target);
    console.log("[router.js] Updated URL:", window.location.href);

    // Call handleLocation to handle routing based on the new URL
    handleLocation();
}

// Routes mapping
const routes: {[key: string]: () => void} = {
    "/404": () => {},
    "/": renderLobbyPage,
    "/login": renderLoginPage,
}

// Handle location changes
const handleLocation = async () => {
    // Get the current path from the URL
    const path = window.location.pathname;

    // Find the corresponding route in the routes mapping
    const routeHandler = routes[path] || routes["/404"];

    console.log("[router.ts] Current path:", path);

    // Call the corresponding route handler
    routeHandler();
}

// Handle case where user clicks forward or backward button on the browser
window.onpopstate = handleLocation;

// Assign the route function to the route property of the window object
window.route = route;

// Call handleLocation initially to handle the initial URL
handleLocation();
