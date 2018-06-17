
export default function meiosis(createApp, model, render, ...middles) {

    const middlewares = middles.map(fn => fn(update));

    const app = createApp(update);

    function update(callback, cb) {

        let newModel = callback(model);

        if (newModel) {
            if (middlewares) for (let fn of middlewares) newModel = fn(newModel);

            model = newModel;

            if (app) render(app.view(model), cb);
        }
    }

    update.access = key => key ?
        Array.isArray(key) ?
            key.reduce((m, k) => m[k], model)
            :
            model[key]
        :
        model;

    update(m => m);
}
