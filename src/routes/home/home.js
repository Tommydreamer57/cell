import React from 'react';
import { POST } from '../../http';
import { Home } from '../../styles/components';
import Login from './Login';

export default function create(update) {
    // FUNCTIONS
    function login(username, password) {
        POST.login(update, username, password).then(console.log).catch(console.log);
    }
    // COMPONENT
    return {
        view(model) {
            return (
                <Home id="home" >
                    <h1>Welcome!</h1>
                    <h3>Please Log In</h3>
                    <Login login={login} />
                </Home>
            );
        }
    };
}
