import React, { Component, createRef } from 'react';
import { Loading } from '../../../../styles/logo';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create: props.location.includes('signup'),
            failed: false,
            reason: '',
            waiting: false,
            errors: {}
        };
        this.first_name = createRef();
        this.last_name = createRef();
        this.username = createRef();
        this.email = createRef();
        this.password = createRef();
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.handleError = this.handleError.bind(this);
    }
    toggleLogin() {
        this.props.history.replace('/login');
        this.setState({ create: false });
    }
    toggleSignup() {
        this.props.history.replace('/signup');
        this.setState({ create: true });
    }
    handleError(err) {
        let reason = '';
        let {
            response: {
                status,
                data: { detail }
            }
        } = err;
        switch (status) {
            case 500:
                if (this.state.create) {
                    // signup errors
                    if (detail.match(/username.*already exists/)) {
                        let username = detail.replace(/.*\(username\)=\((.*)\).*/, '$1')
                        reason = `username "${username}" is taken`;
                    } else {
                        reason = 'please try again'
                    }
                } else {
                    // login erors
                    reason = 'please try again'
                }
                break;
            case 401:
                reason = 'invalid username / password';
                break;
            default:
                reason = 'please try again';
                break;
        }
        this.setState({ failed: true, reason, waiting: false });
    }
    onKeyDown({ key }) {
        let { signup, login } = this.props;
        if (key === "Enter") {
            this.setState({ waiting: true });
            if (this.state.create) {
                let first_name = this.first_name.current.value;
                let last_name = this.last_name.current.value;
                let username = this.username.current.value;
                let email = this.email.current.value;
                let password = this.password.current.value;
                let errors = {
                    email: !email.match(/ /) && '',
                    password: password.length < 6 && ''
                };

                if (Object.values(errors).some(err => err)) {
                    this.setState({
                        errors
                    });
                } else {
                    signup({ first_name, last_name, username, email, password })
                        .catch(this.handleError);
                }
            } else {
                let username = this.username.current.value;
                let password = this.password.current.value;
                login(username, password)
                    .catch(this.handleError);
            }
        }
    }
    componentWillReceiveProps({ location }) {
        if (location !== this.props.location) {
            this.setState({ location, failed: false, reason: '', waiting: false });
            this.clearRefs();
        }
        this.state.create ? this.first_name.current.focus() : this.username.current.focus();
    }
    componentDidMount(){
        this.state.create ? this.first_name.current.focus() : this.username.current.focus();        
    }
    clearRefs() {
        if (this.state.create) {
            let first_name = this.first_name.current;
            let last_name = this.last_name.current;
            let username = this.username.current;
            let email = this.email.current;
            let password = this.password.current;
            [first_name, last_name, username, email, password]
                .forEach(ref => ref.value = '');
        } else {
            let username = this.username.current;
            let password = this.password.current;
            [username, password]
                .forEach(ref => ref.value = '');
        }
    }
    render() {
        let {
            onKeyDown,
            toggleLogin,
            toggleSignup,
            first_name,
            last_name,
            username,
            email,
            password,
            state: { create, failed, reason, waiting }
        } = this;
        return (
            <div className={`login-box ${failed ? 'failed' : ''}`} onKeyDown={onKeyDown} >
                <div className="button-wrapper">
                    <button className={create ? '' : 'selected'} onClick={toggleLogin} >Log In</button>
                    <button className={create ? 'selected' : ''} onClick={toggleSignup} >Sign Up</button>
                </div>
                {waiting ?
                    <div className="loading-wrapper" >
                        <Loading />
                    </div>
                    :
                    create ?
                        <div className="input-wrapper">
                            {failed && <p>{reason}</p>}
                            {/* SIGN UP */}
                            <input ref={first_name} type="text" placeholder="first name" />
                            <input ref={last_name} type="text" placeholder="last name" />
                            <input ref={email} type="text" placeholder="email" />
                            <input ref={username} type="text" placeholder="username" />
                            <input ref={password} type="password" placeholder="password" />
                        </div>
                        :
                        <div className="input-wrapper" >
                            {failed && <p>{reason}</p>}
                            {/* LOG IN */}
                            <input tabIndex="0" ref={username} type="text" placeholder="username" />
                            <input ref={password} type="password" placeholder="password" />
                        </div>
                }
            </div >
        );
    }
}
