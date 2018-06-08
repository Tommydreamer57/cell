import React from 'react';
// LISTEN TO WINDOW HREF
import listen from './meiosis-router';
// ROUTES & STATICS
import createGeneralWrapper from './routes/general-wrapper/general-wrapper';
import createMessagesWrapper from './routes/messages-wrapper/messages-wrapper';
// URL PARSER
import { getId, getMatch } from './routes/url-parser';
// HTTP
import { GET } from './http';
// INITIAL MODEL
import defaultModel from './model';
// STYLES
import { StyleSheet } from 'aphrodite-jss';
import wrapper from './styles/components';
import p from './styles/presets';

// APP
export default function create(update) {

    // ROUTER
    listen(update);

    // INITIAL DATA
    GET.authenticate(update);
    GET.allOrganizations(update);
    let MATCH = getMatch();
    let ID = getId();
    if (MATCH === 'organization') GET.organization(update, ID);
    else if (MATCH === 'channel') GET.organizationByChannel(update, ID);

    // CHILDREN
    let generalWrapper = createGeneralWrapper(update);
    let messagesWrapper = createMessagesWrapper(update);

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
                    {generalWrapper.view(model)}
                    {messagesWrapper.view(model)}
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
        background: p.acolor(0.03),
        minHeight: '100vh',
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
        '& button': {
            ...p.reset,
            transition: '0.2s'
        }
    }
});

const App = wrapper('div', style.app);
