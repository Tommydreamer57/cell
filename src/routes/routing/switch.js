
export default function create(update, ...children) {

    return {
        view(model) {
            let current = children.find(child => child.path === model.router.match);
            if (!current) return null;
            return (
                current.view(model)
            )
        }
    };
}
