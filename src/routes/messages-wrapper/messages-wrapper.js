import React from 'react';
import { createSwitch } from '../../meiosis-router';
// COMPONENTS
import createSidenav from './sidenav/sidenav';
import createHeader from './header/header';
// VIEWS
import createMessages from './views/messages/messages';
import createOrganisation from './views/organisation/organisation';
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
        ['/messages/:type/:id', createMessages, update],
        ['/organisation/:id', createOrganisation, update],
        ['/channel/:id', createChannel, update],
    );

    // COMPONENT
    return {
        view(model) {
            let matched = switchh.view(model);
            return matched && (
                <ViewWrapper id="router-view" style={{ left: model.sideWidth }} >
                    {matched}
                    {sidenav.view(model)}
                    {header.view(model)}
                </ViewWrapper>
            );
        }
    };
}


const styles = StyleSheet.create({
    viewwrapper: {
        position: 'fixed',
        left: '20vw',
        top: 55,
        bottom: 96,
        right: 0,
        overflowY: 'scroll',
    }
});

const ViewWrapper = wrapper('div', styles.viewwrapper);
