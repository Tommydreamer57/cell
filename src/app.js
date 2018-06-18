import React from 'react';
// ROUTES & STATICS
import createGeneralWrapper from './routes/general-wrapper/general-wrapper';
import createMessagesWrapper from './routes/messages-wrapper/messages-wrapper';
// HTTP
import { GET } from './http';
// STYLES
import { StyleSheet } from 'aphrodite-jss';
import wrapper from './styles/components';
import p from './styles/presets';

// APP
export default function create(update) {

    // INITIAL DATA
    GET.authenticate(update);
    GET.allOrganizations(update);

    // CHILDREN
    let generalWrapper = createGeneralWrapper(update);
    let messagesWrapper = createMessagesWrapper(update);

    // COMPONENT
    return {
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
        },
        '& blockquote': {
            borderLeft: `3px solid ${p.acolor(0.25)}`,
            padding: 8,
            paddingLeft: 16
        },
        '& pre': {
            width: 'calc(100% - 16px)',
            padding: 8,
            borderRadius: 4,
            background: p.acolor(0.05),
            border: `1px solid ${p.acolor(0.5)}`,
            '& code': {
                background: 'none',
                padding: 0,
                border: 'none'
            }
        },
        '& code': {
            padding: '0 4px',
            borderRadius: 4,
            border: `1px solid ${p.acolor(0.1)}`,
            fontFamily: 'monospace',
            background: p.acolor(0.1),
        },
        '& b': {
            fontWeight: 'bold'
        },
        '& em': {
            fontStyle: 'italic'
        }
    }
});

const App = wrapper('div', style.app);
