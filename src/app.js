import React from 'react';
import listen from './meiosis-router';
import createRoutes from './routes/routes';
import createStatics from './statics/statics';
import http from './http/http';
import defaultModel from './model';

// APP
export default function create(update) {

    // INITIAL DATA
    http.authenticate(update);
    http.getAllOrganisations(update);

    // LISTEN TO ROUTES
    listen(update);

    // CHILDREN
    let routes = createRoutes(update);
    let statics = createStatics(update);

    // COMPONENT
    return {
        // TOP LEVEL MODEL
        model() {
            return defaultModel;
        },
        // TOP LEVEL VIEW
        view(model) {
            console.log("APP MODEL");
            console.log(model);
            return (
                <div id="app">
                    {routes.view(model)}
                    {statics.view(model)}
                </div>
            );
        }
    };
}
