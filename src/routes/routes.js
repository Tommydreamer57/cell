import React from 'react';
// ROUTING
import { createRoute, createSwitch, createMultiple } from '../meiosis-router';
// ROUTES
import createHome from './home/home';
import createDashboard from './dashboard/dashboard';
import createMessages from './messages/messages';
import createOrganisation from './organisation/organisation';
import createProfile from './profile/profile';
// JSS
import { RouterView } from '../styles/components';

export default function create(update) {

    // VIEWS
    let routes = createMultiple(
        ['/', createHome, update, true],
        ['/dashboard', createDashboard, update],
        ['/messages/:type/:id', createMessages, update],
        ['/organisation/:id', createOrganisation, update],
        ['/profile', createProfile, update]
    );

    // SWITCH
    let switchh = createSwitch(update, ...routes);
    
    // COMPONENT
    return {
        view(model) {
            return (
                <RouterView>
                    {switchh.view(model)}
                </RouterView>
            );
        }
    };
}
