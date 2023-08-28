import Component from "./Component.js";

function TodoItem({ id, title, completed }) {
    // inherit component constructor
    Component.call(this);

    // component render function
    this.render = function () {
        return `
        <div id="${this.id}" class="todo-item">
            ${
                completed
                    ? `<span><i class="ph-fill ph-check-circle" style="color:#0a6d47;"></i></span>`
                    : ``
            }
            
            <span class="${
                completed ? "text-through" : ""
            }">${title}</span>       
        </div>
    `;
    };
}

// inherit prototype from component
TodoItem.prototype = Object.create(Component.prototype);
TodoItem.constructor = TodoItem;

export default TodoItem;
