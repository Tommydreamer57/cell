import React from 'react';
import { Switch, Route } from 'react-router-dom';
import createHome from './home/home';
import createDashboard from './dashboard/dashboard';
import createMessages from './messages/messages';
import createOrganisation from './organisation/organisation';
import createProfile from './profile/profile';
import http from '../http/http';

export default function create(update) {
    let home = createHome(update);
    let dashboard = createDashboard(update);
    let messages = createMessages(update);
    let organisation = createOrganisation(update);
    let profile = createProfile(update);
    return {
        view(model) {
            return (
                <Switch>
                    <Route exact path="/" render={props => home.view(model)} />
                    <Route path="/dashboard" render={props => dashboard.view(model)} />
                    <Route path="/messages/:id" render={props => messages.view(model)} />
                    <Route path="/organisation/:id" render={props => organisation.view(model)} />
                    <Route path="/profile" render={props => profile.view(model)} />
                </Switch>
            );
        }
    };
}
