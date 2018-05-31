import React from 'react';
import { POST } from '../../http';
import Login from './Login';
import wrapper from '../../styles/components';
import { StyleSheet } from 'aphrodite-jss';
import p from '../../styles/presets';

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
                    <Login history={model.router.history} login={login} signup={signup} />
                </LoginWrapper>
            );
        }
    };
}

const styles = StyleSheet.create({
    login: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '27.5vh',
        // '& h2': {
        //     padding: 48
        // },
        '& #login-box': {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 12,
            border: `1px solid ${p.acolor(0.25)}`,
            borderRadius: 5,
            width: '27.5%',
            background: 'white',
            '& .button-wrapper': {
                display: 'flex',
                justifyContent: 'space-around',
                width: 'calc(100% + 24px)',
                margin: '-12px -12px 0',
                '& button': {
                    borderBottom: `1px solid ${p.acolor(0.25)}`,
                    width: '50%',
                    padding: 12,
                    background: p.acolor(0.125)
                },
                '& button:nth-of-type(1)': {
                    borderRight: `1px solid ${p.acolor(0.25)}`
                },
                '& button.nth-of-type(2)': {
                    borderLeft: `1px solid ${p.acolor(0.25)}`
                },
                '& button.selected': {
                    borderBottom: 'none',
                    background: 'none'
                },
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
    }
});

const LoginWrapper = wrapper('div', styles.login);
