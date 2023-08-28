import Header from "./Header.js";
import Footer from "./Footer.js";
import Component from "../Common/Component.js";
import { addRoutes, renderRoute, setNotFound } from "../Router.js";

import routes from "../routes.js";
import NotFound from "../Common/NotFound.js";

function Main() {
    // inherit component constructor
    Component.call(this);

    // set not found component for the Router
    setNotFound(NotFound);

    // add routes to the Router
    addRoutes(routes);

    // component render function
    this.render = function () {
        return `
            ${new Header().render()}
                <main>
                    ${renderRoute()}
                </main>
            ${new Footer().render()}
        `;
    };
}

// inherit prototype from component
Main.prototype = Object.create(Component.prototype);
Main.prototype.constructor = Main;

export default Main;
