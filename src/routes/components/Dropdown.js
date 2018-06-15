import React, { Component } from 'react';

export default class Dropdown extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
        this.toggle = () => this.setState({ open: !this.state.open })
    }
    render() {
        let {
            toggle,
            props: { className, title, type, children },
            state: { open },
        } = this;
        return (
            <div className={"dropdown-wrapper " + className} >
                <button className='dropdown-title' onClick={toggle} >
                    <h3>{title}</h3>
                </button>
                <div className={`dropdown ${open ? 'open' : 'closed'}`} onClick={this.toggle} >
                    {children}
                </div>
            </div>
        );
    }
}
