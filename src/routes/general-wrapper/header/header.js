import React from 'react';
// UTILS
import { link } from '../../../meiosis-router';
import Logo from '../../../styles/logo';

export default function createHeader(update) {
    return {
        view(model) {
            return (
                <header>
                    {link(model, '/',
                        <div id="logo-wrapper" >
                            <Logo />
                            <h3>Meiosis</h3>
                        </div>
                    )}
                    {model.user.id ?
                        model.router.location.pathname.includes('login') ?
                            link(model, '/dashboard', <h4>Dashboard</h4>)
                            :
                            link(model, '/login', <h4>{model.user.username}</h4>)
                        :
                        link(model, '/login', <h4>Login</h4>)}
                </header>
            );
        }
    }
}
