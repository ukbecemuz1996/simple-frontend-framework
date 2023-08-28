import { fetchComments, fetchPost, fetchUser } from "../Api.js";
import Component from "../Common/Component.js";
import { showAlert } from "../Helper.js";
import { getCurrentParams, navigate } from "../Router.js";

function Post() {
    // inherit component constructor
    Component.call(this);

    // set this to self so we can use it in inner callbacks
    const self = this;

    // component state
    this.setState({
        post: null,
        user: null,
        userLoaded: false,
        comments: null,
    });

    // current route params
    const postId = getCurrentParams("postid");

    // fetch post asynchronously
    fetchPost(
        postId,
        function (post) {
            self.setState({
                post,
            });

            // fetch post user asynchronously
            fetchUser(
                post.userId,
                function (user) {
                    self.setState({ ...self.state, user, userLoaded: true });
                },
                function (status) {
                    self.setState({ ...self.state, userLoaded: true });
                }
            );

            // fetch post comments asynchronously
            fetchComments(post.id, function (comments) {
                self.setState({ ...self.state, comments });
            });
        },
        function (status) {
            if (status == 404) {
                showAlert(404, "Post Not Found");
                setTimeout(function () {
                    navigate("/404");
                }, 1500);
            }
        }
    );

    // render post comments in seperated function
    function renderComments(comments = []) {
        if (comments.length == 0) return `<h6>No Comments</h6>`;
        else {
            return `
            <div class="comments">
                <table class="table table-borderless">
                    <tr>
                        <td colspan="2"> Comments (${comments.length})</td>
                    </tr>
                    ${comments.mapJoin(function (comment) {
                        return `
                        <tr>
                            <td><i class="ph ph-chat-text"></i></td>
                            <td>${comment.body}</td>
                        </tr>
                        `;
                    })}
                </table>
            </div>
            `;
        }
    }

    // render post user in seperated function
    function renderUser(user) {
        return `
        <a class="btn btn-sm click-bhvr" href="/users/${user.id}" title="Post Author">
            ${user.name}
        </a>
        `;
    }

    // render post in seperated function
    function renderPost(post, user, comments, userLoaded) {
        return `
            <table class="table table-borderless">
                <tr>
                    <td><i class="ph ph-subtitles"></i></td>
                    <td><span class="title" title="Post Title">${
                        post.title
                    }</span></td>
                </tr>
                <tr>
                    <td><i class="ph ph-scroll"></i></td>
                    <td><span class="desc" title="Post Description">${
                        post.body
                    }</span></td>
                </tr>                
                <tr>
                    <td class="align-middle"><i class="ph ph-user"></i></td>
                    <td>
                    ${
                        userLoaded && user
                            ? renderUser(user)
                            : userLoaded && !user
                            ? `<span>No User Found</span>`
                            : `<span>Loading</span>`
                    }
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><hr/></td>
                </tr>
                <tr>
                    <td colspan="2">
                        ${
                            comments
                                ? renderComments(comments)
                                : `<h6>Loading</h6>`
                        }
                    </td>
                </tr>
            </table>
            
        `;
    }

    // component render function
    this.render = function () {
        const { post, user, comments, userLoaded } = this.state;
        return `
            <div id="${this.id}" class="page post" >
                ${
                    post
                        ? renderPost(post, user, comments, userLoaded)
                        : `<h5>Loading</h5>`
                }
            </div>
        `;
    }.bind(this);
}

// inherit prototype from component
Post.prototype = Object.create(Component.prototype);
Post.prototype.constructor = Post;

export default Post;
