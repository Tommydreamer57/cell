import React from 'react';
import createHistory from 'history/createBrowserHistory';
import matchAndParse from './match';
import Link from './Link';

export default function listen(update) {

    const history = createHistory();

    function updateHistory(location, action) {
        update(model => {
            console.log(model);
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

    setTimeout(() => updateHistory(history.location.pathname), 0);

    history.listen(updateHistory);

    // return function Provide(app) {
    //     console.log("PROVIDING TO");
    //     console.log(app);
    //     return (function (children) {

    //         if (Array.isArray(children)) {
    //             for (let child of children) {
    //                 if (child instanceof Link) {
    //                     child.props.history = history;
    //                     console.log("ADDED HISTORY TO");
    //                     console.log(child);
    //                 }
    //                 if (child.props.children) {
    //                     console.log("RECURSIVE TO");
    //                     Provide(child);
    //                 }
    //             }
    //         }
    //         return children;
    //     })(app.props.children);
    // }
}
