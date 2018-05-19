import React from 'react';
import http from '../../http';
import { Home } from '../../styles/components';
import Login from './Login';

export default function create(update) {
    // COMPONENT
    return {
        view(model) {
            return (
                <Home id="home" >
                    <h1>Welcome!</h1>
                    <h3>Please Log In</h3>
                    <Login />
                </Home>
            );
        }
    };
}
