import { StyleSheet, css } from 'aphrodite-jss';

const none = 'none';
const inherit = 'inherit';
const fixed = 'fixed';
const absolute = 'absolute';
const relative = 'relative';
const flex = 'flex';
const auto = 'auto';
const row = 'row';
const column = 'column';
const flexStart = 'flex-start';
const flexEnd = 'flex-end';
const center = 'center';
const spaceBetween = 'space-between';
const spaceEvenly = 'space-evenly';
const scroll = 'scroll';
const bold = 'bold';
const width = 'width';
const height = 'height';
const horizontal = 'horizontal';
const vertical = 'vertical';
const transparent = 'transparent';

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
    padding: 0,
    textDecoration: none
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
        },
        '& button': reset
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
        minWidth: '20vw',
        overflowY: auto,
        flexDirection: column,
        justifyContent: flexStart,
        alignItems: flexStart,
        resize: horizontal,
        '& .header': {
            width: 'calc(100% - 36px)',
            padding: '14px 18px',
            background: '#CCC',
            '& button': {
                ...reset,
                ...startFlex,
                width: '100%',
            },
            '&:hover': {
                background: '#BBB'
            }
        },
        '& .selected': {
            fontWeight: bold,
        },
        '& a, & button': {
            ...reset,
            width: '100%',
            fontSize: 18,
            '& .channel-link, & .channel-header': {
                width: 'calc(100% - 36px)',
                padding: '6px 18px',
                ...xFlex,
                '&:hover': {
                    background: '#BBB'
                }
            }
        },
        '& #sidenav-drag': {
            ...centerFlex,
            position: absolute,
            top: '20vh',
            right: 0,
            bottom: '20vh',
            width: 10,
            cursor: 'ew-resize',
            '& div': {
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 2,
                height: 24,
                width: 4
            }
        }
    },
    header: {
        left: '20vw',
        width: 'calc(80vw - 48px)',
        padding: '14px 24px',
        background: '#EEE',
        justifyContent: spaceBetween,
        alignItems: center,
    },
    routerview: {
        position: fixed,
        left: '20vw',
        top: 55,
        bottom: 96,
        right: 0,
        overflowY: scroll,
    },
    messages: {
        padding: 24,
        display: flex,
        flexDirection: column,
        justifyContent: flexEnd,
        minHeight: '100%',
        zIndex: 1,
        '& .message': {
            padding: 8,
            ...startFlex,
            flexDirection: column,
            '& div': {
                display: flex,
                flexDirection: column
            },
            '& span': {
                display: flex
            }
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
    },
    modalwrapper: {
        '& .modal': {
            position: fixed,
            left: '25vw',
            width: '50vw',
            height: '50vh',
            background: '#EEE',
            ...centerFlex,
            justifyContent: spaceEvenly,
            flexDirection: column,
            '& .input-wrapper': {
                ...xFlex
            }
        }
    },
    home: {
        ...centerFlex,
        flexDirection: column,
        height: '100%',
    }
});
