import { fetchPosts } from "../Api.js";
import Component from "../Common/Component.js";
import PostItem from "../Common/PostItem.js";
import { getCurrentParams } from "../Router.js";

function Posts() {
    // inherit component constructor
    Component.call(this);

    // set this to self so we can use it in inner callbacks
    const self = this;

    // component state
    this.setState({
        posts: null,
    });

    // current route params
    const userId = getCurrentParams("userid");

    // fetch posts asynchronously
    fetchPosts(userId, function (posts) {
        self.setState({ ...self.state, posts });
    });

    // render posts in seperated function
    function renderPosts(posts) {
        return posts.mapJoin(function (post) {
            return new PostItem(post).render();
        });
    }

    // component render function
    this.render = function () {
        return `
            <div id="${this.id}" class="page posts">
                ${
                    this.state.posts
                        ? renderPosts(this.state.posts)
                        : `<h5>Loading...</h5>`
                }
            </div>
        `;
    }.bind(this);
}

// inherit prototype from component
Posts.prototype = Object.create(Component.prototype);
Posts.prototype.constructor = Posts;

export default Posts;
