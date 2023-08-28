import { fetchUser, fetchUsers } from "../Api.js";
import Component from "../Common/Component.js";
import UserItem from "../Common/UserItem.js";
import { showAlert } from "../Helper.js";
import { getCurrentParams, navigate } from "../Router.js";

function User() {
    // inherit component constructor
    Component.call(this);

    // set this to self so we can use it in inner callbacks
    const self = this;

    // component state
    this.setState({
        user: null,
    });

    // current route params
    const userId = getCurrentParams("userid");

    // navigations in user page
    const navs = [
        {
            name: "Posts",
            link: `${userId}/posts/`,
            icon: `<i class="ph ph-note-pencil"></i>`,
        },
        {
            name: "Albums",
            link: `${userId}/albums/`,
            icon: `<i class="ph ph-images-square"></i>`,
        },
        {
            name: "Todos",
            link: `${userId}/todos/`,
            icon: `<i class="ph ph-checks"></i>`,
        },
    ];

    // fetch user asynchronously
    fetchUser(
        userId,
        function (user) {
            self.setState({
                ...self.state,
                user,
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

    // render navigations in seperated function
    function renderNavigations(navs = []) {
        return navs.mapJoin(function (nav) {
            return `
            <td>
                <a class="d-block click-bhvr" href="${nav.link}">${nav.icon} ${nav.name}</a>
            </td>`;
        });
    }

    // render user in seperated function
    function renderUser(user) {
        return `
            <table class="table table-borderless user-navs">
                <tr>
                    ${renderNavigations(navs)}
                </tr>
            </table>
            <h1><i class="ph ph-user"></i> ${user.name}</h1>
            <table class="table table-sm">
                <caption>Basic Info</caption>
                <tr>
                    <th><i class="ph ph-user-square"></i> username</th>
                    <td>${user.username}</td>
                </tr>
                <tr>
                    <th><i class="ph ph-at"></i> email</th>
                    <td>${user.email}</td>
                </tr>
                <tr>
                    <th><i class="ph ph-phone"></i> phone</th>
                    <td>${user.phone}</td>
                </tr>
                <tr>
                    <th><i class="ph ph-globe"></i> website</th>
                    <td>${user.website}</td>
                </tr>
            </table>
            <table class="table table-sm">
                <caption>Address</caption>
                <tr>
                    <th><i class="ph ph-person-arms-spread"></i> street</th>
                    <td>${user.address.street}</td>
                </tr>
                <tr>
                    <th><i class="ph ph-house-line"></i> suite</th>
                    <td>${user.address.suite}</td>
                </tr>
                <tr>
                    <th><i class="ph ph-map-trifold"></i> city</th>
                    <td>${user.address.city}</td>
                </tr>
                <tr>
                    <th><i class="ph ph-map-pin"></i> zipcode</th>
                    <td>${user.address.zipcode}</td>
                </tr>
                <tr>
                    <th><i class="ph ph-crosshair"></i> geo</th>
                    <td>
                        <table class="table table-borderless table-sm">
                            <tr>
                                <th>lat</th>
                                <td>${user.address.geo.lat}</td>
                            </tr>
                            <tr>
                                <th>lng</th>
                                <td>${user.address.geo.lng}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <table class="table table-sm">
                <caption>Company</caption>
                <tr>
                    <th><i class="ph ph-buildings"></i> name</th>
                    <td>${user.company.name}</td>
                </tr>
                <tr>
                    <th><i class="ph ph-buildings"></i> catchPhrase</th>
                    <td>${user.company.catchPhrase}</td>
                </tr>
                <tr>
                    <th><i class="ph ph-buildings"></i> bs</th>
                    <td>${user.company.bs}</td>
                </tr>
            </table>
        `;
    }

    // component render function
    this.render = function () {
        const user = this.state.user;
        return `
            <div id="${this.id}" class="page user">
                ${user ? renderUser(user) : "<h5>Loading...</h5>"}
            </div>
        `;
    }.bind(this);
}

// inherit prototype from component
User.prototype = Object.create(Component.prototype);
User.prototype.constructor = User;

export default User;
