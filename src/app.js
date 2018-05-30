import React from 'react';
// LISTEN TO WINDOW HREF
// import Router from './meiosis-router';
import listen from './meiosis-router';
// ROUTES & STATICS
import createRoutes from './routes/routes';
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

    // ROUTER
    listen(update);

    setTimeout(() => update(model => console.log(model)), 100);

    // INITIAL DATA
    GET.authenticate(update);
    GET.allOrganisations(update);
    let MATCH = getMatch();
    let ID = getId();
    if (MATCH === 'organisation') GET.organisation(ID);
    else if (MATCH === 'channel') GET.organisationByChannel(update, ID);

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

    // COMPONENT
    return {
        // TOP LEVEL MODEL
        model() {
            return defaultModel;
        },
        // TOP LEVEL VIEW
        view(model) {
            return (
                // <Router update={update} >
                <App id="app" >
                    {routes.view(model)}
                </App>
                // </Router>
            );
        }
    };
}
