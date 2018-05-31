import React, { createElement } from 'react';
import { css } from 'aphrodite-jss';

export default function wrapper(type, ...classes) {
    return ({ children, className = '', ...props }) => createElement(type, { ...props, className: className + ' ' + css(...classes) }, children);
}
