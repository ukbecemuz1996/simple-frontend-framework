import { fetchUsers } from "../Api.js";
import Component from "../Common/Component.js";
import UserItem from "../Common/UserItem.js";

function Users() {
    // inherit component constructor
    Component.call(this);
    
    // set this to self so we can use it in inner callbacks
    const self = this;

    // component state
    this.setState({
        users: null,
    });

    // fetch users asynchronously
    fetchUsers(function (users) {
        self.setState({
            ...self.state,
            users,
        });

        console.log(self.state);
    });

    // render album photos in seperated function 
    function renderUsers(users = []) {
        return users.mapJoin(function (user) {
            const { id, name, username, email } = user;
            return new UserItem({
                id,
                name,
                username,
                email,
            }).render();
        });
    }

    // component render function
    this.render = function () {
        return `
            <div id="${this.id}" class="page users">
                ${
                    this.state.users
                        ? renderUsers(this.state.users)
                        : `<h5>Loading...</h5>`
                }
            </div>
        `;
    }.bind(this);
}

// inherit prototype from component
Users.prototype = Object.create(Component.prototype);
Users.prototype.constructor = Users;

export default Users;
