
export default function create(update, ...children) {
    let previous = {};
    let current = {};
    let previousLocation = "";
    let currentLocation = "";
    let emptyChild = { view() { return null; } };
    return {
        view(model) {
            // find correct child
            let currentChild = children.find(child => child.path === model.router.match.route) || emptyChild;
            // track previous children
            [previous, current] = [current, currentChild];
            // track previous pathnames & locations
            let currentPathname = model.router.history.location.pathname;
            [previousLocation, currentLocation] = [currentLocation, currentPathname];
            // if changing pathnames or locations
            if (previous !== current || previousLocation !== currentLocation) {
                // settimeout to wait for components to finish mounting
                if (typeof current.data === 'function') setTimeout(() => current.data(model), 0);
                if (typeof previous.clear === 'function') setTimeout(() => previous.clear(model), 0);
            }
            // return view of correct child
            return currentChild.view(model);
        }
    };
}
