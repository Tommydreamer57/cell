import React from 'react';
// UTILS
import { POST } from '../../../../http';
// COMPONENTS
import { link } from '../../../../meiosis-router';


export default function createLogout(update) {

    const logout = () => POST.logout(update);

    return {
        view(model) {
            let { user } = model;
            return (
                <div className="login-box" >
                    <h5>Looks like your already logged in</h5>
                    <div className="input-wrapper" >
                        <h3>@{user.username}</h3>
                        <h3>{user.first_name} {user.last_name}</h3>
                        <h3>{user.email}</h3>
                    </div>
                    <div className="logout-button-wrapper">
                        {link(model, '/dashboard', (
                            <button>Continue to Dashboard</button>
                        ))}
                        <button onClick={logout} >Logout</button>
                    </div>
                </div>
            );
        }
    }
}
