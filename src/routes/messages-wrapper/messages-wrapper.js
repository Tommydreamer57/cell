import React from 'react';
// UTILS
import { createSwitch } from '../../meiosis-router';
// COMPONENTS
import createSidenav from './sidenav/sidenav';
import createHeader from './header/header';
// HIGHER ORDER
import awaitUser from '../components/require-authentication';
// VIEWS
import createMessages from './views/messages/messages';
import createOrganization from './views/organization/organization';
import createChannel from './views/channel/channel';
// STYLE
import wrapper from '../../styles/components';
import { StyleSheet } from 'aphrodite-jss';

export default function create(update) {
    // CHILDREN
    let sidenav = createSidenav(update);
    let header = createHeader(update);

    // SWITCH
    let switchh = createSwitch(update,
        ['/messages/:type/:id', awaitUser(createMessages), update],
        ['/organization/:id', awaitUser(createOrganization), update],
        ['/channel/:id', awaitUser(createChannel), update],
    );

    // COMPONENT
    return {
        view(model) {
            let matched = switchh.view(model);
            console.log(matched, switchh);
            return matched && (
                <ViewWrapper id="router-view" style={{ left: model.sideWidth, bottom: model.router.location.pathname.match(/messages/) ? 96 : 0 }} >
                    {matched}
                    {sidenav.view(model)}
                    {header.view(model)}
                </ViewWrapper>
            );
        }
    };
};


const styles = StyleSheet.create({
    viewwrapper: {
        position: 'fixed',
        left: '20vw',
        top: 55,
        bottom: 0,
        right: 0,
        overflowY: 'scroll',
    }
});

const ViewWrapper = wrapper('div', styles.viewwrapper);
