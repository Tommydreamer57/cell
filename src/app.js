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
import { StyleSheet } from 'aphrodite-jss';
import wrapper from './styles/components';
import p from './styles/presets';

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
                <App id="app" >
                    {routes.view(model)}
                </App>
            );
        }
    };
}

const none = 'none';

const style = StyleSheet.create({
    app: {
        fontFamily: 'calibri',
        color: p.color,
        '& h1': {
            fontSize: 48
        },
        '& h2': {
            fontSize: 36
        },
        '& h3': {
            fontSize: 24
        },
        '& h4': {
            fontSize: 20
        },
        '& h5': {
            fontSize: 18
        },
        '& h6': {
            fontSize: 16
        },
        '& p': {
            fontSize: 14
        },
        '& button': p.reset
    }
});

const App = wrapper('div', style.app);
