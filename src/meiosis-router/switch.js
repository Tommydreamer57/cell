import { createMultiple } from './route';

export default function create(update, ...routes) {
    let children = createMultiple(update, ...routes);
    let previous = {};
    let current = {};
    let previousLocation = "";
    let currentLocation = "";
    let emptyChild = { view() { return null; } };
    return {
        view(model) {
            // find correct child
            let currentChild = children.find(child => child.path === model.router.match.route) || emptyChild;
            console.log("CURRENT PATH");
            console.log(model.router.match);
            console.log("CURRENT CHILD");
            console.log(currentChild);
            // track previous children
            [previous, current] = [current, currentChild];
            // track previous pathnames & locations
            let currentPathname = model.router.history.location.pathname;
            [previousLocation, currentLocation] = [currentLocation, currentPathname];
            // if changing pathnames or locations
            if (previous !== current || previousLocation !== currentLocation) {
                // settimeout to wait for components to finish mounting
                if (typeof current.data === 'function') current.data(model);
                if (typeof previous.clear === 'function') previous.clear(model);
            }
            // return view of correct child
            return currentChild.view(model);
        }
    };
}
