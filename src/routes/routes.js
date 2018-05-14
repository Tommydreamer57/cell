import React from 'react';
// ROUTING
import { createRoute, createSwitch } from '../meiosis-router';
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
    let home = createRoute('/', createHome, update, true);
    let dashboard = createRoute('/dashboard', createDashboard, update);
    let messages = createRoute('/messages/:type/:id', createMessages, update);
    let organisation = createRoute('/organisation/:id', createOrganisation, update);
    let profile = createRoute('/profile', createProfile, update);

    // SWITCH
    return createSwitch(update, home, dashboard, messages, organisation, profile);
}
