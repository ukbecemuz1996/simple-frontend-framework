import { fetchAlbum, fetchAlbums } from "../Api.js";
import Component from "../Common/Component.js";
import { showAlert } from "../Helper.js";
import { getCurrentParams, navigate } from "../Router.js";

function Album() {
    // inherit component constructor
    Component.call(this);

    // set this to self so we can use it in inner callbacks
    const self = this;

    // component state
    this.setState({
        album: null,
    });

    // current route params
    const albumId = getCurrentParams("albumid");

    // fetch album asynchronously
    fetchAlbum(
        albumId,
        function (album) {
            self.setState({
                ...self.state,
                album,
            });
        },
        function (status) {
            if (status == 404) {
                showAlert(404, "Album Not Found");
                setTimeout(function () {
                    navigate("/404");
                }, 1500);
            }
        }
    );
    
    // render album photos in seperated function 
    function renderAlbum(album) {
        if (album.length == 0) return `<h5>No photos are found</h5>`;
        return album.mapJoin(function (photo) {
            return `
                <div class="col-6">
                    <a href="${photo.url}">
                        <figure>
                            <img src="${photo.thumbnailUrl}"  alt="${photo.title}"/>
                            <figcaption>${photo.title}</figcaption>
                        </figure>
                    </a>
                </div>
            `;
        });
    }

    // component render function
    this.render = function () {
        const album = this.state.album;

        return `
            <div id="${this.id}" class="page album">
                <div class="row">
                    ${album ? renderAlbum(album) : `<h5>Loading...</h5>`}
                </div>
            </div>
        `;
    }.bind(this);
}

// inherit prototype from component
Album.prototype = Object.create(Component.prototype);
Album.prototype.constructor = Album;

export default Album;
