import React from 'react';
import { POST } from '../../http';
import Login from './Login';
import wrapper from '../../styles/components';
import { StyleSheet } from 'aphrodite-jss';

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
                    <Login history={model.router.history} login={login} signup={signup} />
                </LoginWrapper>
            );
        }
    };
}

const styles = StyleSheet.create({
    login: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        height: 'calc(100% - 10vh)',
        padding: '5vh',
        '& h2': {
            padding: 48
        },
        '& #login-box': {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 12,
        },
        '& .button-wrapper': {
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%'
        },
        '& .input-wrapper': {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 12,
            '& input': {
                padding: 8,
                margin: 6
            }
        }
    }
});

const LoginWrapper = wrapper('div', styles.login);
