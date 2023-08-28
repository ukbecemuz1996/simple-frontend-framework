import Component from "./Component.js";
function NotFound() {
    // inherit component constructor
    Component.call(this);

    // component render function
    this.render = function () {
        return `
            <h2>404 not found</h2>
        `;
    };
}

// inherit prototype from component
NotFound.prototype = Object.create(Component.prototype);
NotFound.constructor = NotFound;

export default NotFound;
