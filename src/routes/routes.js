import React from 'react';
// ROUTING
import createRoute from './routing/route';
import createSwitch from './routing/switch';
// ROUTES
import createHome from './home/home';
import createDashboard from './dashboard/dashboard';
import createMessages from './messages/messages';
import createOrganisation from './organisation/organisation';
import createProfile from './profile/profile';
// UTILS
import http from '../http/http';
import listen from './routing/utils';

export default function create(update) {
    
    let home = createRoute('/', createHome, update);
    let dashboard = createRoute('/dashboard', createDashboard, update);
    let messages = createRoute('/messages/:type/:id', createMessages, update);
    let organisation = createRoute('/organisation/:id', createOrganisation, update);
    let profile = createRoute('/profile', createProfile, update);

    let switchh = createSwitch(update, home, dashboard, messages, organisation, profile);
    
    listen(update);

    return {
        view(model) {
            return (
                <div>
                    {switchh.view(model)}
                </div>
                // <Switch>
                //     <Route exact path="/" render={props => home.view(model)} />
                //     <Route path="/dashboard" render={props => dashboard.view(model)} />
                //     <Route path="/messages/:type/:id" render={props => messages.view(model)} />
                //     <Route path="/organisation/:id" render={props => organisation.view(model)} />
                //     <Route path="/profile" render={props => profile.view(model)} />
                // </Switch>
            );
        }
    };
}
