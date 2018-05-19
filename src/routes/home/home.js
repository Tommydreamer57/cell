import React from 'react';
import { POST } from '../../http';
import { Home } from '../../styles/components';
import Login from './Login';

export default function create(update) {
    // FUNCTIONS
    function login(username, password) {
        return POST.login(update, username, password);
    }
    function signup({ first_name, last_name, username, email, password }) {
        return POST.signup(update, { first_name, last_name, username, email, password });
    }
    // COMPONENT
    return {
        view(model) {
            let { history } = model.router;
            return (
                <Home id="home" >
                    <h2>Log in or Sign up</h2>
                    <Login login={login} signup={signup} history={history} />
                </Home>
            );
        }
    };
}
