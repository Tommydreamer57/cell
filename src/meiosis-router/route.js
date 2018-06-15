import { matchAndParse } from './utils';

// REGISTER ROUTES

// REGISTER SINGLE ROUTE
function registerRoute(update, route, exact = false) {
    console.log("REGISTERING ROUTE: " + route);
    route = {
        route,
        exact
    };
    update(model => {
        let routes = [...model.router.routes, route];
        let match = matchAndParse(model.router.history.location.pathname, routes);
        return {
            ...model,
            router: {
                ...model.router,
                match,
                routes
            },
        }
    });
}

// REGISTER MULTIPLE ROUTES
function registerMultiple(update, routes) {
    console.log("REGISTERING MULTIPLE ROUTES");
    console.log(routes);
    for (let route of routes) {
        if (!route.exact) route.exact = false;
    }
    update(model => {
        let newRoutes = [...model.router.routes, ...routes];
        let match = matchAndParse(model.router.history.location.pathname, newRoutes);
        return {
            ...model,
            router: {
                ...model.router,
                match,
                routes: newRoutes
            },
        }
    });
}

// CREATE ROUTES

// CREATE SINGLE ROUTE
export function createRoute(path, createComponent, update, exact, register = true) {
    console.log("CREATING ROUTE: " + path);
    let component = createComponent(update);
    if (register) registerRoute(update, path, exact);
    return {
        ...component,
        path,
        view(model) {
            if (model.router.match.route !== path) return null;
            else return component.view(model)
        }
    };
}

// CREATE MULTIPLE ROUTES
export function createMultiple(update, ...args) {
    console.log("CREATING MULTIPLE ROUTES");
    let routes = [];
    let components = [];
    for (let argSet of args) {
        let [path, createComponent, update, exact] = argSet;
        components.push(createRoute(path, createComponent, update, exact, false));
        routes.push({ path, exact });
    }
    registerMultiple(update, routes);
    return components;
}
