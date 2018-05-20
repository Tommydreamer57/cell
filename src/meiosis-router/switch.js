
export default function create(update, ...children) {
    let previous = {};
    let current = {};
    let previousLocation = "";
    let currentLocation = "";
    return {
        view(model) {
            // FIND CORRECT CHILD
            let currentChild = children.find(child => child.path === model.router.match.route)
                || { view() { return null; } };
            // TRACK PREVIOUS CHILDREN
            [previous, current] = [current, currentChild];
            // TRACK PREVIOUS PATHNAMES & LOCATIONS
            let currentPathname = model.router.history.location.pathname;
            [previousLocation, currentLocation] = [currentLocation, currentPathname];
            // IF CHANGING PATHNAMES OR LOCATIONS
            if (previous !== current || previousLocation !== currentLocation) {
                // SETTIMEOUT TO WAIT FOR COMPONENTS TO FINISH MOUNTING
                if (typeof current.data === 'function') setTimeout(() => current.data(model), 0);
                if (typeof previous.clear === 'function') setTimeout(() => previous.clear(model), 0);
            }
            // RETURN VIEW OF CORRECT CHILD
            return currentChild.view(model);
        }
    };
}
