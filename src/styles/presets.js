
const r = 50;
const g = 54;
const b = 72;

const reset = {
    background: 'none',
    border: 'none',
    outline: 'none',
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    color: `rgb(${r}, ${g}, ${b})`
};

const color = `rgb(${r}, ${g}, ${b})`;
const acolor = a => `rgba(${r}, ${g}, ${b}, ${a})`;
const color2 = `rgb(29, 42, 158)`;

export default {
    color,
    acolor,
    color2,
    reset,
    primaryBtn: {
        ...reset,
        padding: '12px 24px',
        background: color2,
        borderRadius: 8,
        color: 'white',
    },
    secondaryBtn: {
        ...reset,
        padding: '12px 24px',
        border: `2px solid ${color2}`,
        borderRadius: 8,
        color: color2,
    }
};
