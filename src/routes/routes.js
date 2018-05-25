import React from 'react';
// ROUTING
import { createRoute, createSwitch } from '../meiosis-router';
// ROUTES
import createHome from './home/home';
import createDashboard from './dashboard/dashboard';
import createMessages from './messages/messages';
import createOrganisation from './organisation/organisation';
import createProfile from './profile/profile';
// JSS
import { RouterView } from '../styles/components';

export default function create(update) {

    // SWITCH
    let switchh = createSwitch(update,
        ['/', createHome, update, true],
        ['/dashboard', createDashboard, update],
        ['/messages/:type/:id', createMessages, update],
        ['/organisation/:id', createOrganisation, update],
        ['/profile', createProfile, update]
    );
    
    // COMPONENT
    return {
        view(model) {
            return (
                <RouterView id="router-view" style={{ left: model.sideWidth }} >
                    {switchh.view(model)}
                </RouterView>
            );
        }
    };
}
