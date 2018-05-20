import React from 'react';
import { POST } from '../../http';
import { Home } from '../../styles/components';
import Login from './Login';

export default function create(update) {
    // FUNCTIONS
    function login(username, password) {
        return POST.login(update, username, password)
            .then(user => {
                update(({ router: { history } }) => {
                    history.push('/dashboard');
                    return false;
                });
            })
            .catch(console.log);
    }
    function signup({ first_name, last_name, username, email, password }) {
        return POST.signup(update, { first_name, last_name, username, email, password })
            .then(user => {
                update(({ router: { history } }) => {
                    history.push('/dashboard');
                    return false;
                });
            })
            .catch(console.log);
    }
    // COMPONENT
    return {
        view(model) {
            return (
                <Home id="home" >
                    <h2>Log in or Sign up</h2>
                    <Login login={login} signup={signup} />
                </Home>
            );
        }
    };
}
