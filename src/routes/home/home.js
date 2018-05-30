import React from 'react';
import { Home } from '../../styles/components';
import { link } from '../../meiosis-router';

export default function create(update) {
    // COMPONENT
    return {
        view(model) {
            return (
                <Home id="home" >
                    <header>
                        {model.user.id ?
                            link(model, '/dashboard', <h4>{model.user.username}</h4>)
                            :
                            link(model, '/login', <h4>Login</h4>)}

                    </header>
                    <h2>Welcome</h2>
                    <div>
                        {link(model, '/signup', <h4>Sign Up</h4>)}
                    </div>
                </Home>
            );
        }
    };
}
