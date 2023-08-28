import Component from "./Component.js";

function Back() {
    // inherit component constructor
    Component.call(this);

    // add click listener for back component
    this.addEventListener("click", function () {
        console.log(history.length);
        history.back();
    });

    // component render function
    this.render = function () {
        return `
        <button id="${this.id}" class="btn btn-back click-bhvr">
            <i class="ph ph-caret-circle-left"></i>
        </button>
    `;
    };
}

// inherit prototype from component
Back.prototype = Object.create(Component.prototype);
Back.prototype.constructor = Back;
export default Back;
