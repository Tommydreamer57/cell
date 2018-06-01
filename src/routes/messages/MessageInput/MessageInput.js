import React, { Component } from 'react';

export default class MessageInput extends Component {
    onKeyDown = ({ target, key }) => {
        if (key === 'Enter' && target.value.trim()) {
            this.props.sendMessage(target.value);
            target.value = '';
        }
    }
    render() {
        let {
            onKeyDown,
            props
        } = this;
        return (
            <div className="message-input" {...props} >
                <div className="input-wrapper">
                    <button className="plus-button">+</button>
                    <input onKeyDown={onKeyDown} />
                </div>
            </div>
        );
    }
}
