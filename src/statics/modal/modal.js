import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { ModalWrapper } from '../../styles/components';
import ModalInput from './ModalInput';

export default class Modal extends Component {
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.close = this.close.bind(this);
    }
    // STATE
    get initialState() {
        return this.props.inputs
            .reduce((state, input) => {
                state[input.name] = '';
                return state;
            }, {});
    }
    // EVENTS
    onKeyDown({ key }) {
        if (key === 'Escape') this.props.toggle(false);
        if (key === 'Enter') {
            this.props.submit(this.state, this.props.organisation_id).then(() => {
                this.setState(this.initialState);
            })
         }
    }
    handleInput(prop, val) {
        this.setState({
            [prop]: val
        });
    }
    close() {
        this.props.toggle('null');
    }
    stopPropagation(e) {
        e.stopPropagation();
    }
    // RENDER
    render() {
        let { willEnter, willLeave, defaultStyles, styles, stopPropagation, onKeyDown, close, handleInput } = this;
        let { current, title, subtitle, inputs } = this.props
        // console.log(this.state);

        let open = current === title;

        let inn = window.innerHeight * 0.25;
        let out = window.innerHeight * 1.5;

        return (
            <TransitionMotion
                willEnter={() => ({
                    opacity: 0,
                    top: out
                })}
                willLeave={() => ({
                    opacity: spring(0),
                    top: spring(out)
                })}
                defaultStyles={(open ? [{
                    key: 'modal',
                    style: {
                        opacity: 0,
                        top: out
                    }
                }] : [])}
                styles={() => (open ? [{
                    key: 'modal',
                    style: {
                        opacity: spring(0.2),
                        top: spring(inn)
                    }
                }] : [])}
            >
                {styles => (
                    <ModalWrapper>
                        <div
                            onClick={close}
                            style={{
                                position: 'fixed',
                                top: styles[0] ? 0 : window.innerHeight,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: `rgba(0, 0, 0, ${styles[0] ? styles[0].style.opacity : 0})`
                            }}
                        />
                        {styles.map(({ key, style }) => (
                            <div
                                className="modal"
                                key={key}
                                style={{ ...style, opacity: 1, zIndex: 5 }}
                                onClick={stopPropagation}
                                onKeyDown={onKeyDown}
                            >
                                <h1>{title}</h1>
                                {subtitle && <h5>{subtitle}</h5>}
                                {inputs.map(input => (
                                    <ModalInput key={input.name} value={this.state[input.name]} {...input} handleInput={handleInput} />
                                ))}
                            </div>
                        ))}
                    </ModalWrapper>
                )}
            </TransitionMotion>
        );
    }
}
