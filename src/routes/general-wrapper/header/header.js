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
                        link(model, '/dashboard', <h4>{model.user.username}</h4>)
                        :
                        link(model, '/login', <h4>Login</h4>)}

                </header>
            );
        }
    }
}
