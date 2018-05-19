import React, { Component, createRef } from 'react';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            create: false
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
        this.setState({ create: false });
    }
    toggleSignup() {
        this.setState({ create: true });
    }
    onKeyDown({ key }) {
        if (key === "Enter") {
            if (this.state.create) {
                let first_name = this.first_name.current.value;
                let last_name = this.last_name.current.value;
                let username = this.username.current.value;
                let email = this.email.current.value;
                let password = this.password.current.value;
                this.props.signup({ first_name, last_name, username, email, password });
            } else {
                let username = this.username.current.value;
                let password = this.password.current.value;
                this.props.login(username, password);
            }
        }
    }
    render() {
        let { onKeyDown, toggleLogin, toggleSignup, first_name, last_name, username, email, password } = this;
        return (
            <div onKeyDown={onKeyDown} >
                <button onClick={toggleLogin} >Log In</button>
                <button onClick={toggleSignup} >Sign Up</button>
                {this.state.create ?
                    <div>
                        <h4>SIGN UP</h4>
                        <input ref={first_name} type="text" placeholder="first name" />
                        <input ref={last_name} type="text" placeholder="last name" />
                        <input ref={email} type="text" placeholder="email" />
                        <input ref={username} type="text" placeholder="username" />
                        <input ref={password} type="password" placeholder="password" />
                    </div>
                    :
                    <div>
                        <h4>LOG IN</h4>
                        <input ref={username} type="text" placeholder="username" />
                        <input ref={password} type="password" placeholder="password" />
                    </div>
                }
            </div>
        );
    }
}
