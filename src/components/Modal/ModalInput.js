import React, { Component } from 'react';
import { Link } from '../../meiosis-router';

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
        let {
            handleInput,
            handleBooleanInput,
            props: { name, placeholder, type, value, onClick, model, to, close }
        } = this;
        return (
            <div className="input-wrapper" >
                {(type !== 'button' && type !== 'link')
                    &&
                    <h4>{name}</h4>
                }
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
                {(type === 'button')
                    &&
                    <button
                        onClick={onClick}
                    >
                        {name}
                    </button>
                }
                {(type === 'link')
                    &&
                    <Link to={to} ><div onClick={close} >{name}</div></Link>}
            </div>
        );
    }
}
