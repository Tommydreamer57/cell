import React from 'react';
import { POST } from '../../http';
import Login from './Login';
import { LoginWrapper } from '../../styles/components';

export default function create(update) {
    // FUNCTIONS
    function login(username, password) {
        POST.login(update, username, password);
    }
    function signup({ first_name, last_name, username, email, password }) {
        POST.signup(update, { first_name, last_name, username, email, password });
    }
    // COMPONENT
    return {
        view(model) {
            return (
                <LoginWrapper id="login" >
                    <h2>Log in or Sign up</h2>
                    <Login login={login} signup={signup} />
                </LoginWrapper>
            );
        }
    };
}
