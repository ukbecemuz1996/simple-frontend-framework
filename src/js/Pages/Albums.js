import { fetchAlbums } from "../Api.js";
import Component from "../Common/Component.js";
import { getCurrentParams } from "../Router.js";

function Albums() {
    // inherit component constructor
    Component.call(this);

    // set this to self so we can use it in inner callbacks
    const self = this;

    // component state
    this.setState({
        albums: null,
    });

    // current route params
    const userId = getCurrentParams("userid");

    // fetch albums asynchronously
    fetchAlbums(userId, function (albums) {
        self.setState({
            ...self.state,
            albums,
        });
    });

    // render albums in seperated function 
    function renderAlbums(albums) {
        return albums.mapJoin(function (album) {
            return `
                <tr class="album-item click-bhvr">
                    <td><i class="ph ph-images"></i></td>
                    <td>
                        <h6><a href="/albums/${album.id}">${album.title}</a></h6>
                    </td>                                  
                </tr>
            `;
        });
    }

    // component render function
    this.render = function () {
        const albums = this.state.albums;

        return `
            <div id="${this.id}" class="page albums">
                <table class="table">
                    ${albums ? renderAlbums(albums) : `<h5>Loading...</h5>`}
                </table>
                
            </div>
        `;
    }.bind(this);
}

// inherit prototype from component
Albums.prototype = Object.create(Component.prototype);
Albums.prototype.constructor = Albums;

export default Albums;
