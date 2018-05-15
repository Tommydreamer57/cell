
export default function create(update, ...children) {
    let previous = {};
    let current = {};
    return {
        view(model) {
            let currentChild = children.find(child => child.path === model.router.match.route) || children[1];
            [previous, current] = [current, currentChild];
            if (previous !== current) {
                if (typeof current.data === 'function') current.data();
                if (typeof previous.clear === 'function') previous.clear();
            }
            if (!currentChild) return null;
            return currentChild.view(model);
        }
    };
}
