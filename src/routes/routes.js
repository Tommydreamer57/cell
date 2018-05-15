import React from 'react';
// ROUTING
import { createRoute, createSwitch, createMultiple } from '../meiosis-router';
// ROUTES
import createHome from './home/home';
import createDashboard from './dashboard/dashboard';
import createMessages from './messages/messages';
import createOrganisation from './organisation/organisation';
import createProfile from './profile/profile';
// UTILS
import http from '../http/http';

export default function create(update) {

    // VIEWS
    let routes = createMultiple(
        ['/', createHome, update, true],
        ['/dashboard', createDashboard, update],
        ['/messages/:type/:id', createMessages, update],
        ['/organisation/:id', createOrganisation, update],
        ['/profile', createProfile, update]
    );
    // let home = createRoute('/', createHome, update, true);
    // let dashboard = createRoute('/dashboard', createDashboard, update);
    // let messages = createRoute('/messages/:type/:id', createMessages, update);
    // let organisation = createRoute('/organisation/:id', createOrganisation, update);
    // let profile = createRoute('/profile', createProfile, update);
    // let routes = [home, dashboard, messages, organisation, profile];

    // SWITCH
    return createSwitch(update, ...routes); //home, dashboard, messages, organisation, profile);
}
