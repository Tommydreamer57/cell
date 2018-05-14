import React, { createContext } from 'react';
import createHistory from 'history/createBrowserHistory';
import matchAndParse from './match';

// export default createContext({ unlisten: createHistory().listen(console.log) });

export default function create(update) {

    console.log(arguments);
    console.trace(update);

    const history = createHistory();
    const Router = createContext({ history });

    // // setTimeout(() => {
    //     update(model => ({
    //         ...model,
    //         router: {
    //             ...model.router,
    //             history
    //         }
    //     }))
    // // }, 0);

    const unlisten = history.listen((location, action) => {
        console.log(location, action);
    });

    return Router;

}
