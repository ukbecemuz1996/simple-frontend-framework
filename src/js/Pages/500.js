import Component from "../Common/Component.js";

function Page500() {
    Component.call(this);

    this.render = function () {
        return `
            <div id="${this.id}" class="page 500">
                <h5>500 Server Error</h5>
            </div>
        `;
    }.bind(this);
}

Page500.prototype = Object.create(Component.prototype);
Page500.prototype.constructor = Page500;

export default Page500;
