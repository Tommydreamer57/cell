import React from 'react';
import { createSwitch } from '../../meiosis-router';
// COMPONENTS
import createSidenav from './sidenav/sidenav';
import createHeader from './header/header';
// VIEWS
import createMessages from '../messages/messages';
import createOrganisation from '../organisation/organisation';
import createChannel from '../channel/channel';
// STYLE
import { RouterView } from '../../styles/components';

export default function create(update) {
    // CHILDREN
    // sidenav = createRoute(['/messages/*', '/organisation/*', '/channels/*'], createSidenav, update)
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
                <RouterView id="router-view" style={{ left: model.sideWidth }} >
                    {matched}
                    {sidenav.view(model)}
                    {header.view(model)}
                </RouterView>
            );
        }
    };
}
