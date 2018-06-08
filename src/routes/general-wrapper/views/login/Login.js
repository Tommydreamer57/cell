import React, { Component, createRef } from 'react';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            create: window.location.pathname.includes('signup')
        };
        this.first_name = createRef();
        this.last_name = createRef();
        this.username = createRef();
        this.email = createRef();
        this.password = createRef();
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    toggleLogin() {
        this.props.history.replace('/login');
        this.setState({ create: false });
    }
    toggleSignup() {
        this.props.history.replace('/signup');
        this.setState({ create: true });
    }
    onKeyDown({ key }) {
        let { signup, login } = this.props;
        if (key === "Enter") {
            if (this.state.create) {
                let first_name = this.first_name.current.value;
                let last_name = this.last_name.current.value;
                let username = this.username.current.value;
                let email = this.email.current.value;
                let password = this.password.current.value;
                signup({ first_name, last_name, username, email, password });
            } else {
                let username = this.username.current.value;
                let password = this.password.current.value;
                login(username, password);
            }
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
            state: { create }
        } = this;
        return (
            <div className="login-box" onKeyDown={onKeyDown} >
                <div className="button-wrapper">
                    <button className={create ? '' : 'selected'} onClick={toggleLogin} >Log In</button>
                    <button className={create ? 'selected' : ''} onClick={toggleSignup} >Sign Up</button>
                </div>
                {create ?
                    <div className="input-wrapper" >
                        {/* SIGN UP */}
                        <input ref={first_name} type="text" placeholder="first name" />
                        <input ref={last_name} type="text" placeholder="last name" />
                        <input ref={email} type="text" placeholder="email" />
                        <input ref={username} type="text" placeholder="username" />
                        <input ref={password} type="password" placeholder="password" />
                    </div>
                    :
                    <div className="input-wrapper" >
                        {/* LOG IN */}
                        <input ref={username} type="text" placeholder="username" />
                        <input ref={password} type="password" placeholder="password" />
                    </div>
                }
            </div>
        );
    }
}
