import React from 'react';
// ROUTING
import { createSwitch } from '../meiosis-router';
// ROUTES
import createHome from './home/home';
import createDashboard from './dashboard/dashboard';
import createViewWrapper from './view-wrapper/view-wrapper';
import createSignup from './login/signup';

export default function create(update) {

    // SWITCH
    let routes = createSwitch(update,
        ['/', createHome, update, true],
        ['/dashboard', createDashboard, update],
        ['/login', createSignup, update],
        ['/signup', createSignup, update],
    );

    let viewWrapper = createViewWrapper(update);
    
    // COMPONENT
    return {
        view(model) {
            return (
                <div>
                    {routes.view(model)}
                    {viewWrapper.view(model)}
                </div>
            );
        }
    };
}
