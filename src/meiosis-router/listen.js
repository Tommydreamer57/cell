import React from 'react';
import createHistory from 'history/createBrowserHistory';
import matchAndParse from './match';
import Link from './Link';

export default function listen(update) {

    const history = createHistory();

    function updateHistory(location = window.location, action) {
        update(model => {
            const match = matchAndParse(location.pathname, model.router.routes);
            return {
                ...model,
                router: {
                    ...model.router,
                    history,
                    match
                }
            };
        });
    }

    setTimeout(updateHistory, 0);

    window.onload = () => { console.log("WINDOW LOADED"); updateHistory() };

    history.listen(updateHistory);

}
