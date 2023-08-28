
# Front End Simple Framework

This project aims to clarify some concepts in JavaScript like:

- Constructor Functions
- Higher Order Functions
- Closures
- Prototype Inheritance

In this project we try to use the basics of JavaScript so there are no:

- Arrow Function
- Promises
- Fetch
- Async/Await
- Class

Instead there are :
- Higher Orde Functions and Callbacks
- Constructor Functions
- XMLHttpRequest

We use [{JSON} Placeholder](https://jsonplaceholder.typicode.com/) fake API in this project.

In our project we build our Router with these features:

- Add routes
- Link route to component
- add route params
- fetch route params

In this project we don`t use virutal dom, we use template literal to return component inner html and then these nested components entwined with each other in the Main component which is rendered in the element with id #root

```javascript
const root = document.getElementById("root");
const main = new Main();
root.innerHTML = main.render();
```

So all the html of all components is collected in main component and then is set to the innerHTML of the root element, we collect all events in **globalEvents** in **ComponentFactory** (Closure) and then all registered events is triggered after the innerHTML is set

```javascript
main.runEvents();
```
So we don`t use template literal to output component html we use **uuidv4** function to generate **Component** id and all registered events using **Component.prototype.addEventListener** is linked to that id.

In **Component** constuctor function we use **state** property to save component state and **setState** and **getState** to set and get that **state**.

If component **state** is changed using **setState** method, **reRender** method is called to apply a rerending process for that component
```javascript
function reRender(id, template) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = template;
}
```

**Note:**: This project is for educational purposes and can of course be used for personal or business purposes 
## Authors

- [@okbacemuz](https://www.github.com/ukbecemuz1996)
- [@ahmadsaber](https://github.com/ahmedsaber96)
- [@asafwat](https://github.com/asafwat-roots)

