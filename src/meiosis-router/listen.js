import React from 'react';
import createHistory from 'history/createBrowserHistory';
import matchAndParse from './match';
import Link from './Link';

export default function listen(update) {

    console.log("LISTENING");

    const history = createHistory();

    function updateHistory(location = window.location, action) {
        console.log("UPDATING HISTORY: " + location.pathname);
        update(model => {
            console.log(model.router.routes);
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

    update(model => {
        console.log(model)
    });

    window.onload = () => updateHistory();

    history.listen(updateHistory);

}
