import React from 'react';
// UTILS
import { link } from '../../../meiosis-router';
import Logo from '../../../styles/logo';

export default function createHeader(update) {
    return {
        view(model) {
            let {
                user: {
                    username,
                    id
                },
                router: {
                    location: {
                        pathname
                    }
                }
            } = model;
            return (
                <header>
                    {link(model, '/',
                        <div id="logo-wrapper" >
                            <Logo />
                            <h3>Meiosis</h3>
                        </div>
                    )}
                    {id ?
                        pathname.includes('login') ?
                            link(model, '/dashboard', <h4>Dashboard</h4>)
                            :
                            link(model, '/login', <h4>{username}</h4>)
                        :
                        link(model, '/login', <h4>Login</h4>)}
                </header>
            );
        }
    }
}
