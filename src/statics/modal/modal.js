import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { ModalWrapper } from '../../styles/components';

let inn = window.innerHeight * 0.25;
let out = window.innerHeight * 1.5;

export default class Modal extends Component {
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = this.props.inputs.reduce((state, input) => {
            state[input.name] = '';
            return state;
        }, {});
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    // EVENTS
    stopPropagation(e) {
        e.stopPropagation();
    }
    onKeyDown({ key }) {
        if (key === 'Escape') this.props.toggle(false);
        if (key === 'Enter') this.props.submit(this.state);
    }
    handleInput(prop, val) {
        this.setState({
            [prop]: val
        });
    }
    // LIFECYCLE
    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown);
    }
    // RENDER
    render() {
        let { willEnter, willLeave, defaultStyles, styles, stopPropagation } = this;
        let { open, toggle, title, subtitle, inputs } = this.props
        console.log(this.state);

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
                    <ModalWrapper
                        onClick={open ? toggle : undefined}
                        style={{
                            background: `rgba(0, 0, 0, ${styles[0] ? styles[0].style.opacity : 0})`,
                            zIndex: styles[0] ? 4 : -1
                        }}
                    >
                        {styles.map(({ key, style }) => (
                            <div
                                className="modal"
                                key={key}
                                style={{ ...style, opacity: 1 }}
                                onClick={stopPropagation}
                            >
                                <h1>{title}</h1>
                                <h5>{subtitle}</h5>
                                {inputs.map(input => (
                                    <div key={input.name} className="input-wrapper" >
                                        <h4>{input.name}</h4>
                                        <input onChange={(e) => this.handleInput(input.name, e.target.value)} placeholder={'' + input.placeholder} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </ModalWrapper>
                )}
            </TransitionMotion>
        );
    }
}
