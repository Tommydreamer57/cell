import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';

export default function Logo({ size = 24 }) {
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
        <div className={css(styles.logo)} >
            <div className="one" />
            <div className="two" />
            <div className="three" />
            <div className="four" />
        </div>
    );
}
