
export default function meiosis(createApp, model, render, ...middles) {

    var middlewares, app, update;

    update = (callback, cb) => {

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

    middlewares = middles.map(fn => fn(update));

    app = createApp(update);

    update(m => m);
}
