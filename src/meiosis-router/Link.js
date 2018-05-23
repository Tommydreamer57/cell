import React, { Component } from 'react';

export class Link extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        if (
            !e.defaultPrevented && e.button === 0 && !this.props.target &&
            !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
        ) {
            e.preventDefault();
            if (this.props.replace) this.props.history.replace(this.props.to);
            else this.props.history.push(this.props.to);
        }
    }
    render() {
        return (
            <a href={this.props.to} onClick={this.handleClick} >
                {this.props.children}
            </a>
        );
    }
}

export default function link(model, href, children) {
    return (
        <Link key={href} to={href} history={model.router.history} >
            {children}
        </Link>
    );
}

// different ways to create a link
// // export a function to create a link as a normal meiosis component
// // export a class component Link to use like react router dom -- or export a function to register the `update`, that returns a Link component that can be used like react-router-dom's
// // save the link component on the model for access directly in any component's view
// //
