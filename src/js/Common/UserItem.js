import Component from "./Component.js";

function UserItem({ id, name, username, email }) {
    // inherit component constructor
    Component.call(this);

    // component render function
    this.render = function () {
        return `
        <div class="user-item">
            <a class="btn click-bhvr text-start d-block p-0" href="/users/${id}">
                <table class="table table-borderless">
                    <tr>
                        <td class="w-25">
                            <i class="main-icon ph-light ph-user-circle"></i>
                        </td>
                        <td class="w-75">
                            <table class="table table-borderless">
                                <tr>
                                    <td colspan="2">${name}</td>
                                </tr>
                                <tr>
                                    <td><i class="ph ph-identification-card"></i></td>
                                    <td>${username}</td>
                                </tr>
                                <tr>
                                    <td><i class="ph ph-at"></i></td>
                                    <td>${email}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>                
            </a>
        </div>
    `;
    };
}

// inherit prototype from component
UserItem.prototype = Object.create(Component.prototype);
UserItem.constructor = UserItem;

export default UserItem;
