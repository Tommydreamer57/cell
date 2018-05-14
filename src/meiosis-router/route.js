import React from 'react';

function registerRoute(update, route, exact = false) {
    route = {
        route,
        exact
    };
    setTimeout(() => {
        update(model => ({
            ...model,
            router: {
                ...model.router,
                routes: [...model.router.routes, route]
            }
        }));
    }, 0);
}

export default function create(path, createComponent, update, exact) {
    let component = createComponent(update);
    registerRoute(update, path, exact);
    return {
        path,
        ...component
    };
}
