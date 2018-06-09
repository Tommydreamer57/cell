import React from 'react';
// UTILS
import { POST } from '../../../../http';
// COMPONENTS
import Login from './Login';
import createLogout from './logout';
// STYLES
import wrapper from '../../../../styles/components';
import { StyleSheet } from 'aphrodite-jss';
import p from '../../../../styles/presets';

export default function create(update) {
    // FUNCTIONS
    function login(username, password) {
        return POST.login(update, username, password);
    }
    function signup({ first_name, last_name, username, email, password }) {
        return POST.signup(update, { first_name, last_name, username, email, password });
    }
    // CHILDREN
    let logout = createLogout(update);
    // COMPONENT
    return {
        view(model) {
            return (
                <LoginWrapper id="login" >
                    {model.user.id ?
                        logout.view(model)
                        :
                        <Login history={model.router.history} login={login} signup={signup} />}
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
        '& .login-box': {
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
                    background: p.acolor(0.125),
                    '&:nth-of-type(1)': {
                        borderRight: `1px solid ${p.acolor(0.25)}`
                    },
                    '&:nth-of-type(2)': {
                        borderLeft: `1px solid ${p.acolor(0.25)}`
                    },
                    '&.selected': {
                        borderBottom: 'none',
                        background: 'none'
                    },
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
            },
            '& h5': {
                padding: 12
            },
            '& h3': {
                marginBottom: 6,
                '&:last-of-type': {
                    marginBottom: 0
                }
            },
            '& .logout-button-wrapper': {
                padding: 12
            }
        }
    }
});

const LoginWrapper = wrapper('div', styles.login);
