import React, { Component } from 'react';

export default class ModalInput extends Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput({ target: { value } }) {
        console.log(arguments);
        console.log(value);
        let { name, type } = this.props;
        if (type === 'radio' || type === 'checkbox') {
            value = !value;
        }
        this.props.handleInput(name, value);
    }
    render() {
        let { handleInput } = this;
        let { name, placeholder, type } = this.props;
        return (
            <div key={name} className="input-wrapper" >
                <h4>{name}</h4>
                <input
                    type={type}
                    onChange={handleInput}
                    onClick={type === 'radio' || type === 'checkbox' ? handleInput : undefined}
                    placeholder={'' + placeholder}
                />
            </div>
        );
    }
}
