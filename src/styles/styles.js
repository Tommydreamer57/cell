import { StyleSheet, css } from 'aphrodite-jss';

const none = 'none';
const inherit = 'inherit';
const fixed = 'fixed';
const flex = 'flex';
const auto = 'auto';
const row = 'row';
const column = 'column';
const flexStart = 'flex-start';
const flexEnd = 'flex-end';
const center = 'center';
const spaceBetween = 'space-between';
const scroll = 'scroll';

const centerFlex = {
    display: flex,
    justifyContent: center,
    alignItems: center,
};

const startFlex = {
    display: flex,
    justifyContent: flexStart,
    alignItems: flexStart
};

const endFlex = {
    display: flex,
    justifyContent: flexEnd,
    alignItems: flexEnd
};

const xFlex = {
    display: flex,
    flexDirection: row,
    justifyContent: spaceBetween,
    alignItems: center
};

const yFlex = {
    display: flex,
    flexDirection: column,
    justifyConent: spaceBetween,
    alignItems: center
}

const reset = {
    background: none,
    border: none,
    outline: none,
    margin: 0,
    padding: 0
};

export default StyleSheet.create({
    app: {
        fontFamily: 'calibri',
        '& h1': {
            fontSize: 32
        },
        '& h2': {
            fontSize: 28
        },
        '& h3': {
            fontSize: 24
        },
        '& h4': {
            fontSize: 20
        },
        '& h5': {
            fontSize: 18
        },
        '& h6': {
            fontSize: 16
        },
        '& p': {
            fontSize: 14
        }
    },
    nav: {
        position: fixed,
        top: 0,
        display: flex,
    },
    sidenav: {
        background: '#DDD',
        left: 0,
        bottom: 0,
        width: 'calc(20vw - 48px)',
        padding: 24,
        overflowY: auto,
        flexDirection: column,
        justifyContent: flexStart,
        alignItems: flexStart,
    },
    topnav: {
        left: '20vw',
        height: 'calc(10vh - 16px)',
        width: 'calc(80vw - 48px)',
        padding: '8px 24px',
        background: '#EEE',
        justifyContent: spaceBetween,
        alignItems: center,
    },
    routerview: {
        position: fixed,
        left: '20vw',
        top: '10vh',
        bottom: 96,
        right: 0,
        overflowY: scroll,
    },
    messages: {
        padding: 24,
        display: flex,
        flexDirection: column,
        justifyContent: flexEnd,
        '& .message': {
            padding: 8
        },
        '& .message-input': {
            ...centerFlex,
            position: fixed,
            bottom: 0,
            left: '20vw',
            right: 0,
            width: '80vw',
            height: 96,
            paddingBottom: 8,
            '& .input-wrapper': {
                ...centerFlex,
                width: 'calc(100% - 56px)',
                border: '3px solid #DDD',
                borderRadius: 8,
                '& button': {
                    ...reset,
                    fontSize: 36,
                    color: '#CCC',
                    height: 50,
                    width: 50,
                    borderRight: '3px solid #DDD',
                },
                '& input': {
                    ...reset,
                    padding: 12,
                    width: 'calc(100% - 18px)',
                    fontSize: 18,
                }
            }
        }
    }
});
