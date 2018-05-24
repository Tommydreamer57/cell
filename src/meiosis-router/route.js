import React from 'react';

// REGISTER SINGLE ROUTE
function registerRoute(update, route, exact = false) {
    route = {
        route,
        exact
    };
    update(model => ({
        ...model,
        router: {
            ...model.router,
            routes: [...model.router.routes, route]
        }
    }));
}

// CREATE SINGLE ROUTE
export default function create(path, createComponent, update, exact, register = true) {
    let component = createComponent(update);
    if (register) registerRoute(update, path, exact);
    return {
        path,
        ...component
    };
}

// REGISTER MULTIPLE ROUTES
function registerMultiple(update, routes) {
    for (let route of routes) {
        if (!route.exact) route.exact = false;
    }
    update(model => ({
        ...model,
        router: {
            ...model.router,
            routes: [...model.router.routes, ...routes]
        }
    }))
}

// CREATE MULTIPLE ROUTES
export function createMultiple() {
    let update = arguments[0][2];
    let routes = [];
    let components = [];
    for (let argSet of arguments) {
        let [path, createComponent, update, exact] = argSet;
        components.push(create(path, createComponent, update, exact, false));
        routes.push({ path, exact });
    }
    registerMultiple(update, routes);
    return components;
}
