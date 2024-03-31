// extend the Window interface to include a route property
interface Window {
    route?: (event: Event) => void;
}

// route function
const route = (event: Event) => {
    // prevent the default action of the click event to the href
    event.preventDefault();

    // update the url on the browser
    window.history.pushState({}, "", (event.target as HTMLAnchorElement).href); 
}

// assign the route function to the route property of the window object
window.route = route;
