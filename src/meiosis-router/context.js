import React, { Component, createContext } from 'react';
import createHistory from 'history/createBrowserHistory';
import matchAndParse from './match';

// CONTEXT
const { Provider, Consumer } = createContext(() => { });

// PROVIDER - ROUTER
export default class Router extends Component {
    constructor(props) {
        super(props);

        this.history = createHistory();

        this.updateHistory = this.updateHistory.bind(this);

        setTimeout(this.updateHistory, 0)

        this.history.listen(this.updateHistory);

    }
    updateHistory(location = window.location, action) {
        console.log("UPDATING HISTORY");
        this.props.update(model => {
            const match = matchAndParse(location.pathname, model.router.routes);
            return {
                ...model,
                router: {
                    ...model.router,
                    history: this.history,
                    match,
                    log: console.log(this.history)
                }
            };
        });
    }
    render() {
        let { history,
            props: { children }
        } = this;
        return (
            <Provider value={history} >
                {children}
            </Provider>
        );
    }
}

// CONSUMER - LINK
class A extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        let { onClick, replace, to, history } = this.props;
        if (
            !e.defaultPrevented && e.button === 0 && !this.props.target &&
            !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
        ) {
            e.preventDefault();
            if (onClick) onClick(e);
            if (replace) history.replace(to);
            else history.push(to);
        }
    }
    render() {
        let {
            handleClick,
            props: { to, ...props }
        } = this;
        return (
            <a {...props} href={to} onClick={handleClick} />
        );
    }
}

export function Link(props) {
    console.log(props);
    return (
        <Consumer>
            {history => <A {...props} history={history} />}
        </Consumer>
    );
}
