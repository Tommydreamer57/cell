
const r = 50;
const g = 54;
const b = 72;

export default {
    color: `rgb(${r}, ${g}, ${b})`,
    acolor: a => `rgba(${r}, ${g}, ${b}, ${a})`,
    color2: `rgb(29, 42, 158)`,
    reset: {
        background: 'none',
        border: 'none',
        outline: 'none',
        margin: 0,
        padding: 0,
        textDecoration: 'none',
        color: `rgb(${r}, ${g}, ${b})`
    }
};
