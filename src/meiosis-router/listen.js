import createHistory from 'history/createBrowserHistory';
import { matchAndParse } from './utils';

export default function watchUrl(update) {

    let history = createHistory();

    function updateHistory(location = window.location, action) {
        update(model => ({
            ...model,
            router: {
                ...model.router,
                history,
                location,
                updateModel: true
            }
        }))
    }

    history.listen(updateHistory);

    setTimeout(updateHistory);

    return function routerMiddleware(model) {
        if (!model.router.updateModel) return model;
        console.log(model.router.routes);
        const match = matchAndParse(model.router.history.location.pathname, model.router.routes);
        return {
            ...model,
            router: {
                ...model.router,
                history,
                match,
                updateModel: false
            }
        };
    }
}
