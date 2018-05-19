import React, { Component } from 'react';

export default class ModalInput extends Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleBooleanInput = this.handleBooleanInput.bind(this);
    }
    handleInput({ target: { value } }) {
        let { name } = this.props;
        this.props.handleInput(name, value);
    }
    handleBooleanInput() {
        let { name, value } = this.props;
        this.props.handleInput(name, !value);
    }
    render() {
        let { handleInput, handleBooleanInput } = this;
        let { name, placeholder, type, value } = this.props;
        return (
            <div className="input-wrapper" >
                <h4>{name}</h4>
                {(!type || type === 'text')
                    &&
                    <input
                        type="text"
                        onChange={handleInput}
                        value={value}
                        placeholder={placeholder}
                    />
                }
                {(type === 'radio' || type === 'checkbox')
                    &&
                    <input
                        type={type}
                        checked={value}
                        onChange={handleBooleanInput}
                        onClick={handleBooleanInput}
                    />
                }
            </div>
        );
    }
}
