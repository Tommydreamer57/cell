import React from 'react';

// REGISTER SINGLE ROUTE
function registerRoute(update, route, exact = false) {
    console.log("REGISTERING ROUTE: " + route);
    route = {
        route,
        exact
    };
    update(model => ({
        ...model,
        router: {
            ...model.router,
            routes: [...model.router.routes, route]
        },
        log: console.log("UPDATED -- REGISTERED ROUTE: " + route, model)
    }));
}

// CREATE SINGLE ROUTE
export default function createRoute(path, createComponent, update, exact, register = true) {
    console.log("CREATING ROUTE: " + path);
    let component = createComponent(update);
    if (register) registerRoute(update, path, exact);
    return {
        path,
        ...component,
        log: console.log("CREATED ROUTE: " + path)
    };
}

// REGISTER MULTIPLE ROUTES
function registerMultiple(update, routes) {
    console.log("REGISTERING MULTIPLE ROUTES");
    console.log(routes);
    for (let route of routes) {
        if (!route.exact) route.exact = false;
    }
    update(model => ({
        ...model,
        router: {
            ...model.router,
            routes: [...model.router.routes, ...routes]
        },
        log: console.log("UPDATED -- REGISTERED MULTIPLE ROUTES: ", model)
    }));
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
    setTimeout(() => (
        registerMultiple(update, routes)
        , 0));
    return components;
}
