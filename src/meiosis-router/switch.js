
export default function create(update, ...children) {
    let previous = {};
    let current = {};
    let previousLocation = "";
    let currentLocation = "";
    return {
        view(model) {
            let currentChild = children.find(child => child.path === model.router.match.route) || children[1];
            [previous, current] = [current, currentChild];
            let currentPathname = model.router.history.location.pathname;
            [previousLocation, currentLocation] = [currentLocation, currentPathname];
            if (previous !== current || previousLocation !== currentLocation) {
                // SETTIMEOUT TO WAIT FOR COMPONENTS TO FINISH MOUNTING
                if (typeof current.data === 'function') setTimeout(current.data, 0);
                if (typeof previous.clear === 'function') setTimeout(previous.clear, 0);
            }
            if (!currentChild) return null;
            return currentChild.view(model);
        }
    };
}
