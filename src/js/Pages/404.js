import { fetchAlbum, fetchAlbums } from "../Api.js";
import Component from "../Common/Component.js";
import { getCurrentParams } from "../Router.js";

function Page404() {
    Component.call(this);

    this.render = function () {
        return `
            <div id="${this.id}" class="page 404">
                <h5>404 Not Found</h5>
            </div>
        `;
    }.bind(this);
}

Page404.prototype = Object.create(Component.prototype);
Page404.prototype.constructor = Page404;

export default Page404;
