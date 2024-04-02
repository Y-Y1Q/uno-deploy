// import render404Page from "./404";
import renderLobbyPage from "./lobby";
import renderLoginPage from "./login";

// extend the Window interface to include a route property
declare global {
    interface Window {
        route?: (event: Event) => void;
    }
}

// route function
const route = (event: Event) => {
    // prevent the default action of the click event to the href
    event.preventDefault();

    // update the URL on the browser
    window.history.pushState({}, "", (event.target as HTMLAnchorElement).href); 

    console.log("[router.js] Route clicked:", event.target);
    console.log("[router.js] Updated URL:", window.location.href);

    // call handleLocation to handle routing based on the new URL
    handleLocation();
}

// Routes mapping
const routes: {[key: string]: () => void} = {
    // "/404": render404Page,
    "/": renderLobbyPage,
    "/login": renderLoginPage,
}

// handle location changes
const handleLocation = async () => {
    // get the current path from the URL
    const path = window.location.pathname;

    // find the corresponding route in the routes mapping
    const routeHandler = routes[path] || routes["/404"];

    console.log("[router.ts] Current path:", path);

    // call the corresponding route handler
    routeHandler();
}

// handle case where user clicks forward or backward button on the browser
window.onpopstate = handleLocation;

// assign the route function to the route property of the window object
window.route = route;

// call handleLocation initially to handle the initial URL
handleLocation();
