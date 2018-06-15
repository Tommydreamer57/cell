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
            let {
                router: {
                    history,
                    location: {
                        pathname,
                        state
                    }
                }
            } = model;
            if (state) var { message } = state;
            if (model.user.id) var message = 'Looks like you\'re already logged in';
            return (
                <LoginWrapper id="login" >
                    {message && <h3>{message}</h3>}
                    {model.user.id ?
                        logout.view(model)
                        :
                        <Login location={pathname} history={history} login={login} signup={signup} />}
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
        '& > h3': {
            marginTop: '-8vh',
            marginBottom: '8vh'
        },
        '& .login-box': {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 12,
            border: `1px solid ${p.acolor(0.25)}`,
            borderRadius: 5,
            width: '27.5%',
            background: 'white',
            '& .loading-wrapper': {
                display: 'flex',
                justifyContent: 'center',
                width: 'calc(100% - 32px)',
                padding: 16,
                paddingTop: 32
            },
            '&.failed': {
                '& p': {
                    color: 'red',
                    padding: 6
                },
                '& input': {
                    border: '1px solid red',
                    outline: 'none'
                },
            },
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
            '&.logout-wrapper': {
                '& .loading-wrapper': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                '& h3, h5': {
                    padding: 0,
                    marginBottom: 18
                },
                '& h5': {
                    '&:last-of-type': {
                        marginBottom: 0
                    }
                },
                '& .logout-button-wrapper': {
                    padding: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    '& button': {
                        padding: '6px 12px',
                        borderRadius: 5,
                        background: p.color2,
                        background: p.acolor(0.125),
                    },
                    '& a': {
                        '& button': {
                            background: p.acolor2(0.75),
                            color: p.white(0.875)
                        }
                    },
                }
            }
        }
    }
});

const LoginWrapper = wrapper('div', styles.login);
