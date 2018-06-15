
export default function meiosis(createApp, model, render, ...middles) {

    const middlewares = middles.map(fn => fn(update));

    const app = createApp(update);

    function update(callback) {

        let newModel = callback(model);

        if (newModel) {
            if (middlewares) for (let fn of middlewares) newModel = fn(newModel);

            model = newModel;

            if (app) render(app.view(model));
        }
    }

    update.get = key => model[key];

    update(m => m);
}
