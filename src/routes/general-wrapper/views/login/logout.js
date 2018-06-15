import React from 'react';
// UTILS
import { POST } from '../../../../http';
// COMPONENTS
import { link } from '../../../../meiosis-router';
import { Loading } from '../../../../styles/logo';


export default function createLogout(update) {

    const logout = () => POST.logout(update);

    return {
        view(model) {
            let { user, loggingOut } = model;
            return (
                loggingOut ?
                    <div className="login-box logout-wrapper">
                        <div className="loading-wrapper" >
                            <Loading />
                        </div>
                    </div>
                    :
                    <div className="login-box logout-wrapper" >
                        <div className="input-wrapper" >
                            <h3>{user.first_name} {user.last_name}</h3>
                            <h5>@{user.username}</h5>
                            <h5>{user.email}</h5>
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
