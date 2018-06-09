import * as u from './utils';

export const {
    stream,
    scan,
    nestComponent
} = u;

// MEIOSIS AFTER THE TUTORIAL

export function initialize(createApp, render, ...middleWares) {
    // UPDATE
    let update = stream(m => m);

    // APP
    let app = createApp(update);

    // INITIAL MODEL
    let initialModel = app.model();

    // MODELS
    // -- callback (argument of update function), initialmodel, stream
    let models = scan((model, cb) => (cb(model) || model), initialModel, update);

    // ADD MIDDLEWARES
    for (let fn of middleWares) {
        models.map(fn);
    }

    // CONNECT RENDER TO STREAMS
    models.map(render(app));

    // INITIALIZE APP
    models(initialModel);
}

// MY OWN CUSTOM MEIOSIS

// createApp = function to create root app meiosis component
// render = function to render app to the dom
// middlewares = functions to invoke on the previous and currentmodel anytime there is a change
export default function meiosis(createApp, render, ...middles) {
    // create the app, passing in the update function
    let app = createApp(update);
    // current model starts at the app's model
    let currentModel = app.model();
    // track middlewares
    let middlewares = [];
    // invoke middlewares with update
    for (let fn of middles) middlewares.push(fn(update));
    // update = function to update the model and rerender the app
    function update(callback) {
        // invoke the callback function on the current model
        let newModel = callback(currentModel);
        // if a new model was returned
        if (newModel) {
            // invoke middlewares
            for (let fn of middlewares) newModel = fn(newModel);
            // update the previous & current models
            currentModel = newModel;
            // rerender app with the updated model
            render(app.view(currentModel));
        }
    }
    render(app.view(currentModel));
}
