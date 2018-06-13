import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite-jss';
import p from './presets';

export default function Logo({ size = 24, ...props }) {
    const styles = StyleSheet.create({
        logo: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: size,
            height: size,
            transform: 'rotate(-15deg)',
            '& div': {
                opacity: 0.66,
                width: size,
                minWidth: size,
                height: size / 6,
                borderRadius: size,
                margin: `0 ${- size / 2}px`
            },
            '& .one': {
                backgroundColor: 'rgb(0, 255, 255)',
                transform: `rotate(90deg) translateY(${size / 6}px)`
            },
            '& .two': {
                backgroundColor: 'rgb(255, 0, 255)',
                transform: `translateY(${- size / 6}px)`
            },
            '& .three': {
                backgroundColor: 'rgb(127.5, 255, 127.5)',
                transform: `rotate(90deg) translateY(${- size / 6}px)`
            },
            '& .four': {
                backgroundColor: 'rgb(255, 127.5, 127.5)',
                transform: `translateY(${size / 6}px)`
            }
        }
    });

    return (
        <div {...props} className={'logo ' + css(styles.logo)} >
            <div className="one" />
            <div className="two" />
            <div className="three" />
            <div className="four" />
        </div>
    );
}

export function Carat({ size = 12, ...props }) {

    const styles = StyleSheet.create({
        carat: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'rotate(-90deg)',
            '& div': {
                background: p.acolor(0.25),
                width: size,
                height: size / 6,
                margin: `0 ${- size / 6}px`,
                transform: 'rotate(45deg)',
                '&:nth-of-type(2)': {
                    transform: 'rotate(-45deg)'
                }
            }
        }
    });

    return (
        <div {...props} className={'carat ' + css(styles.carat)} >
            <div />
            <div />
        </div>
    );
}

export class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rotation: 0
        };
        const size = props.size || 20;
        const duration = props.duration || 1.25;
        const color = props.color || p.color2;
        this.duration = duration;
        this.styles = StyleSheet.create({
            loading: {
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: size,
                width: size,
                maxWidth: size,
                maxHeight: size,
                minWidth: size,
                minHeight: size,
                borderRadius: '100%',
                transition: `transform ${duration}s linear`,
                '& .circle': {
                    background: 'white',
                    height: size,
                    width: size,
                    maxWidth: size,
                    maxHeight: size,
                    minWidth: size,
                    minHeight: size,
                    borderRadius: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTop: `3px solid ${color}`,
                    borderLeft: `3px solid rgba(0, 0, 0, 0)`,
                    borderRight: `3px solid ${color}`,
                    borderBottom: `3px solid ${color}`,
                    '& .inner-circle': {
                        height: 0,
                        width: 0,
                        borderRadius: '100%',
                        // borderLeft: `${size * 0.4}px solid ${color}`,
                        borderRight: `${size * 0.4}px solid rgba(0, 0, 0, 0)`,
                        borderTop: `${size * 0.4}px solid rgba(0, 0, 0, 0)`,
                        borderBottom: `${size * 0.4}px solid rgba(0, 0, 0, 0)`,
                        opacity: 0.5,
                        zIndex: 1
                    },
                },
            },
        });
        this.rotate = this.rotate.bind(this);
    }

    componentDidMount() {
        this.timeouts = [setTimeout(this.rotate)];
    }

    componentWillUnmount() {
        this.timeouts.forEach(clearTimeout);
    }

    rotate() {
        this.setState({ rotation: this.state.rotation + 360 });
        this.timeouts.push(setTimeout(this.rotate, this.duration * 1000));
    }

    render() {

        let { props, styles, state: { rotation } } = this;

        return (
            <div {...props} className={'loading ' + css(styles.loading)} style={{ transform: `rotate(${rotation}deg)` }} >
                <div className='circle'>
                    {/* <div className='inner-circle' /> */}
                </div>
            </div>
        );
    }
}
