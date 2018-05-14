import React, { Component } from 'react';

export default class Link extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        console.log(this);
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
