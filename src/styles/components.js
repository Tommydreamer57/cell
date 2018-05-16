import React, { createElement } from 'react';
import { css } from 'aphrodite-jss';
import styles from './styles';

function wrapper(type, ...classes) {
    return ({ children, ...props }) => createElement(type, { ...props, className: css(...classes) }, children)
}

export const App = wrapper('div', styles.app);
export const SideNav = wrapper('nav', styles.nav, styles.sidenav);
export const TopNav = wrapper('nav', styles.nav, styles.topnav);
export const RouterView = wrapper('div', styles.routerview);
export const Messages = wrapper('div', styles.messages);
