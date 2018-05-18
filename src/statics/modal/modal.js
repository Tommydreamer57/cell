import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { ModalWrapper } from '../../styles/components';
import ModalInput from './ModalInput';

let inn = window.innerHeight * 0.25;
let out = window.innerHeight * 1.5;

export default class Modal extends Component {
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = this.props.inputs
            .reduce((state, input) => {
                state[input.name] = '';
                return state;
            }, {});
        this.onKeyDown = this.onKeyDown.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    // EVENTS
    onKeyDown({ key }) {
        if (key === 'Escape') this.props.toggle(false);
        if (key === 'Enter') this.props.submit(this.state, this.props.organisation_id);
    }
    handleInput(prop, val) {
        this.setState({
            [prop]: val
        });
    }
    toggle() {
        let { current, title } = this.props;
        let open = current === title;
        this.props.toggle(!open && title);
    }
    stopPropagation = e => e.stopPropagation();
    // RENDER
    render() {
        let { willEnter, willLeave, defaultStyles, styles, stopPropagation, onKeyDown, toggle, handleInput } = this;
        let { current, title, subtitle, inputs } = this.props
        console.log(this.state);

        let open = current === title;

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
                            onClick={toggle}
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
                                <h5>{subtitle}</h5>
                                {inputs.map(input => (
                                    <ModalInput {...input} handleInput={handleInput} />
                                ))}
                            </div>
                        ))}
                    </ModalWrapper>
                )}
            </TransitionMotion>
        );
    }
}
