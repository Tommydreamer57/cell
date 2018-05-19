import React, { Component, createRef } from 'react';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            create: false
        };
        this.username = createRef();
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
            let username = this.username.current.value;
            let password = this.password.current.value;
            this.props.login(username, password);
        }
    }
    render() {
        let { onKeyDown, toggleLogin, toggleSignup, username, password } = this;
        return (
            <div onKeyDown={onKeyDown} >
                <button onClick={toggleLogin} >Log In</button>
                <button onClick={toggleSignup} >Sign Up</button>
                {this.state.create ?
                    <div>SIGN UP</div>
                    :
                    <div>LOG IN</div>
                }
                <input ref={username} type="text" placeholder="username" />
                <input ref={password} type="password" placeholder="password" />
            </div>
        );
    }
}
