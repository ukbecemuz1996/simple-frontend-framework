import Component from "./Component.js";

function Logo() {
    // inherit component constructor
    Component.call(this);

    // logo letters and its colors and animation durations
    const logo = [
        { letter: "<", color: "#000", animationDuration: 100 },
        { letter: "o", color: "#000", animationDuration: 200 },
        { letter: "k", color: "#000000ad", animationDuration: 300 },
        { letter: "b", color: "#00000062", animationDuration: 400 },
        { letter: "a", color: "#00000034", animationDuration: 500 },
        { letter: "/", color: "#000", animationDuration: 600 },
        { letter: ">", color: "#000", animationDuration: 700 },
    ];

    // component render function
    this.render = function () {
        return `<div class="logo">
            ${logo.mapJoin(function (item) {
                const style = `color:${item.color};animation-duration:${item.animationDuration}ms`;
                return `<span class="letter" style="${style}">${item.letter}</span>`;
            })}
        </div>`;
    };
}

// inherit prototype from component
Logo.prototype = Object.create(Component.prototype);
Logo.prototype.constructor = Logo;
export default Logo;
