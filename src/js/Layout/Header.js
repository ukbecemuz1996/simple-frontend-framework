import Back from "../Common/Back.js";
import Component from "../Common/Component.js";
import Logo from "../Common/Logo.js";

function Header() {
    // inherit component constructor
    Component.call(this);

    // current pathname
    const path = window.location.pathname;

    this.render = function () {
        // show back button if it is not home page
        return `
            <header>
                ${path !== "/" ? new Back().render() : ""}
                ${new Logo().render()}
            </header>
        `;
    };
}

// inherit prototype from component
Header.prototype = Object.create(Component.prototype);
Header.prototype.constructor = Header;
export default Header;
