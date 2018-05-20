import React from 'react';
// LISTEN TO WINDOW HREF
import listen from './meiosis-router';
// ROUTES & STATICS
import createRoutes from './routes/routes';
import createStatics from './statics/statics';
// URL PARSER
import { getId, getMatch } from './routes/url-parser';
// HTTP
import { GET } from './http';
// DEFAULT MODEL
import defaultModel from './model';
// STYLES
import { App } from './styles/components';

// APP
export default function create(update) {

    // INITIAL DATA
    GET.authenticate(update);
    GET.allOrganisations(update);
    let MATCH = getMatch();
    let ID = getId();
    if (MATCH === 'organisation') GET.organisation(update, ID);
    else if (MATCH === 'channel') GET.organisationByChannel(update, ID);

    // LISTEN TO ROUTES
    listen(update);

    // TOGGLE MODAL OFF
    window.addEventListener('keydown', ({ key }) => {
        if (key === 'Escape') {
            update(model => (model.currentModal) && {
                ...model,
                currentModal: false
            });
        }
    })

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
            return (
                <App id="app">
                    {routes.view(model)}
                    {statics.view(model)}
                </App>
            );
        }
    };
}
