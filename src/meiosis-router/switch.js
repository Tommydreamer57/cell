
export default function create(update, ...children) {
    return {
        view(model) {
            let current = children.find(child => child.path === model.router.match.route) || children[1];
            // console.log(model);
            // console.log(current);
            if (!current) return null;
            return current.view(model);
        }
    };
}
