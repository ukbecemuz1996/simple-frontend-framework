import Component from "./Component.js";

function Alert() {
    // inherit component constructor
    Component.call(this);

    // component render function
    this.render = function () {
        return `
            <div id="global-alert"></div>
        `;
    };
}

// inherit prototype from component
Alert.prototype = Object.create(Component.prototype);
Alert.constructor = Alert;

export default Alert;
