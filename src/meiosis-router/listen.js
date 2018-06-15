import createHistory from 'history/createBrowserHistory';
import { matchAndParse } from './utils';

export default function watchUrl(update) {

    let history = createHistory();

    function updateHistory(location, action) {
        update(model => ({
            ...model,
            router: {
                ...model.router,
                history,
                location,
                changed: true
            }
        }));
    }

    history.listen(updateHistory);

    updateHistory(window.location);

    return function routerMiddleware(model) {
        if (model.router.hasOwnProperty('changed') && !model.router.changed) return model;
        const match = matchAndParse(model.router.history.location.pathname, model.router.routes);
        return {
            ...model,
            router: {
                ...model.router,
                history,
                match,
                changed: false
            }
        };
    }
}
