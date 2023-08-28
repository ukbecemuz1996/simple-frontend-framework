/**
 * Component Factory is used to create a component class related to a globalEvents Closure
 * globalEvents is shared between all instances of Component class
 * globalEvents is used to save all registered events to be triggered later after the html output is rendered
 */
function ComponentFactory() {
    const globalEvents = [];

    // generate uuid to be used as id of component html
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
            /[018]/g,
            function (c) {
                return (
                    c ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] &
                        (15 >> (c / 4)))
                ).toString(16);
            }
        );
    }

    // get the element by its id and rechange the outerHTML of it
    function reRender(id, template) {
        const el = document.getElementById(id);
        if (el) el.outerHTML = template;
    }

    // Component constructor function
    function Component() {
        this.id = uuidv4();
        this.template = ``;
        this.state = null;
    }

    // is used to add event listener to the component using its id
    // it`s important to say that if you doesn`t set the id manually the event listener will not work 
    Component.prototype.addEventListener = function (event, callback) {
        const eventObject = { id: this.id, event, callback };
        globalEvents.push(eventObject);
    };

    // used to run the events 
    Component.prototype.runEvents = function () {
        globalEvents.forEach(function (item) {
            document
                .getElementById(item.id)
                .addEventListener(item.event, item.callback);
        });
    };

    // the main render method that used to output the component html
    Component.prototype.render = function () {
        return this.template;
    };

    // used to set component state
    Component.prototype.setState = function (newState) {
        this.state = newState;
        // when the state is changed a reRender method is called to ensure that the component is rendered according to its last state
        reRender(this.id, this.render());
    };
    
    Component.prototype.getState = function () {
        return this.state;
    };

    return Component;
}

// here we invoke the ComponentFactory so it will be removed form the call stack and all the components will share the same globalEvents
export default ComponentFactory();
