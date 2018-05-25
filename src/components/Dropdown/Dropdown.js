import React, { Component } from 'react';
import { GET } from '../../http';
import { link } from '../../meiosis-router';

export default class Dropdown extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            open: !this.state.open
        });
    }
    render() {
        let {
            toggle,
            props: { className, title, type, children },
            state: { open },
        } = this;
        // console.log(this.props);
        return (
            <div className={"dropdown " + className} >
                <button onClick={toggle} >
                    {
                        type === "header" ?
                            <h3>{title} v</h3>
                            :
                            <h4>{title} v</h4>
                    }
                </button>
                <div className="dropdown" onClick={this.toggle} >
                    {open && children}
                </div>    
            </div>
        );
    }
}
