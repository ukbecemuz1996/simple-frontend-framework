import { fetchPosts, fetchTodos } from "../Api.js";
import Component from "../Common/Component.js";
import PostItem from "../Common/PostItem.js";
import TodoItem from "../Common/TodoItem.js";
import { getCurrentParams } from "../Router.js";

function Todos() {
    // inherit component constructor
    Component.call(this);

    // set this to self so we can use it in inner callbacks
    const self = this;

    // component state
    this.setState({
        todos: null,
    });

    // current route params
    const userId = getCurrentParams("userid");

    // fetch user todos asynchronously
    fetchTodos(userId, function (todos) {
        todos.sort(function (a, b) {
            if (a.completed && !b.completed) {
                return 1;
            } else if (!a.completed && b.completed) {
                return -1;
            }
            return 0;
        });

        self.setState({ ...self.state, todos });
    });

    // render use todos in seperated function 
    function renderTodos(todos) {
        return todos.mapJoin(function (todo) {
            new TodoItem(todo).render();
        });
    }

    // component render function
    this.render = function () {
        return `
            <div id="${this.id}" class="page todos">
                ${
                    this.state.todos
                        ? renderTodos(this.state.todos)
                        : `<h5>Loading...</h5>`
                }
            </div>
        `;
    }.bind(this);
}

// inherit prototype from component
Todos.prototype = Object.create(Component.prototype);
Todos.prototype.constructor = Todos;

export default Todos;
