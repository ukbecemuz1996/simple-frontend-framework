// Router function
function Router() {
    // registered routes
    const routes = {};

    // router`s not found component
    let NotFoundComponent = null;

    // current route params
    let currentParams = {};

    // add routes array to the router
    function addRoutes(routesِArr = []) {
        for (let route of routesِArr) {
            routes[route.path] = route.component;
        }
    }

    // add single route to the routes
    function addRoute(path, component) {
        routes[path] = component;
    }

    // get all routes
    function getRoutes() {
        return routes;
    }

    // get all current params
    // if param is passed it will search it in currentParams
    function getCurrentParams(param = null) {
        if (param) return currentParams[param];
        return currentParams;
    }

    // compare a given route path with the existing routes
    function compareRoutesWithParams(currentPath) {
        // split the current path to array
        const pathArr = currentPath.split("/");

        // shifting first element of array because it is empty string
        pathArr.shift();

        for (const path of Object.keys(routes)) {
            // split route path to array
            const routeArr = path.split("/");

            // shifting first elemet if the path is started with '/'
            if (path.startsWith("/")) routeArr.shift();

            // compare given path array with route path array
            const [result, params] = compareArrsWithParams(routeArr, pathArr);

            // if the result is equal to the given path that means the given path is located and params is extracted
            if (result && result == currentPath) return [routes[path], params];
        }

        return [null, {}];
    }

    // compare two arrays of paths and return the matched path and fetched params
    function compareArrsWithParams(arr1 = [], arr2 = []) {
        // compare arrays lengths
        if (arr1.length != arr2.length) return ["", {}];

        // matched path
        let tmp = "";

        // fetch params
        const params = {};

        arr1.forEach(function (el, index) {
            // if path from the first array is matching the path from the second array then add first array path to the tmp
            if (el == arr2[index]) {
                tmp += "/" + el;
            }
            // if path from the first array is not matching the path from the second array
            else {
                // if path from the first array starts with ':' which is the sign for route parameter
                if (el.startsWith(":")) {
                    // set params key as first array path without : and set value as second array path
                    params[el.substring(1)] = arr2[index];

                    // add second array path to the tmp
                    tmp += "/" + arr2[index];
                } else {
                    // set params key as first array path  and set value as second array path
                    params[el] = arr2[index];

                    // add first array path to the tmp
                    tmp += "/" + el;
                }
            }
        });

        return [tmp, params];
    }

    // render component according to the current route
    function renderRoute() {
        const currentPath = window.location.pathname;

        // try to get the component directly fom the routes array
        let ComponentToBeRendered = routes[currentPath];

        // if the component not found that means the current route is not registered or it has to be fetched because it has a route param
        if (!ComponentToBeRendered) {
            // trying to get the corresponding component and fetched params
            const [component, params] = compareRoutesWithParams(currentPath);
            ComponentToBeRendered = component;
            currentParams = params;
        }

        let rendered = ``;
        if (ComponentToBeRendered) {
            rendered = new ComponentToBeRendered().render();
        } else {
            rendered = new NotFoundComponent().render() || "Page Not Found";
        }

        return rendered;
    }

    function setNotFound(component) {
        NotFoundComponent = component;
    }

    function navigate(path) {
        window.location.assign(path);
    }

    return {
        navigate,
        addRoutes,
        addRoute,
        getRoutes,
        renderRoute,
        setNotFound,
        getCurrentParams,
    };
}
/**
 * here we invoke the Router function so it will be removed form the call stack
 * and all the exported methods have access to the same variables:
 * routes
 * NotFoundComponent
 * currentParams
 */
const {
    navigate,
    addRoutes,
    addRoute,
    getRoutes,
    renderRoute,
    setNotFound,
    getCurrentParams,
} = Router();

export {
    navigate,
    addRoutes,
    addRoute,
    getRoutes,
    renderRoute,
    setNotFound,
    getCurrentParams,
};
