// import customizations in App before main so all sub-components will be affected 
import "./Customizations.js";
import Main from "./Layout/Main.js";

// get root element
const root = document.getElementById("root");

// create an instance of Main component
const main = new Main();

// set root inner html to the main output
root.innerHTML = main.render();

// run all registered events after the root inner html is set and ready in dom
// events is fired after the html is rendered
main.runEvents();
