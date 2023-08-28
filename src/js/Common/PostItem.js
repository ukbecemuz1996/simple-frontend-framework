import Component from "./Component.js";

function PostItem({ id, title, body }) {
    // inherit component constructor
    Component.call(this);

    // take a 100 character from post body text
    let bodyText = body.substring(0, 100) + "...";

    // component render function
    this.render = function () {
        return `
        <div id="${this.id}" class="post-item">
            <table class="table table-borderless">
                <tr>
                    <td><i class="ph ph-note"></i></td>
                    <td>
                        <table class="table table-borderless">
                            <tr>
                                <td><span class="title">${title}</span></td>
                            </tr>
                            <tr>
                                <td><span class="short-desc">${bodyText}</span></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <div class="actions row flex-row-reverse">
                <div class="col-4">
                    <a class="click-bhvr btn btn-sm d-block" href="/posts/${id}">
                        Read more
                    </a>
                </div>
            </div>
            <hr>            
        </div>
    `;
    };
}

// inherit prototype from component
PostItem.prototype = Object.create(Component.prototype);
PostItem.constructor = PostItem;

export default PostItem;
