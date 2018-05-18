import React from 'react';
import ReactDOM from 'react-dom';
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

    console.log(ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
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
