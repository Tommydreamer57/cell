import * as u from './utils';

export const {
    stream,
    scan,
    nestComponent
} = u;

export default function initialize(createApp, render, ...middleWares) {
    // UPDATE
    let update = stream();

    // APP
    let app = createApp(update);

    // INITIAL MODEL
    let initialModel = app.model();

    // MODELS
    // -- callback (argument of update function), initialmodel, stream
    let models = scan((model, cb) => cb(model), initialModel, update);

    // CONNECT RENDER TO STREAMS
    models.map(render(app));

    // ADD MIDDLEWARES
    for (let fn of middleWares) {
        models.map(fn);
    }

    // INITIALIZE APP
    models(initialModel);
}

// // createApp = function to create root app meiosis component
// // render = function to render app to the dom
// // middlewares = functions to invoke on the previous and currentmodel anytime there is a change
// export default function meiosis(createApp, render, ...middlewares) {
//     // create the app, passing in the update function
//     let app = createApp(update);
//     // track the previous and current models
//     let previousModel;
//     // current model starts at the app's model
//     let currentModel = app.model();
//     // update = function to update the model and rerender the app
//     function update(callback) {
//         // invoke the callback function on the current model
//         let newModel = callback(currentModel);
//         // if a new model was returned
//         if (newModel) {
//             // update the previous & current models
//             [previousModel, currentModel] = [currentModel, newModel];
//             // invoke middlewares
//             for (let fn of middlewares) fn(previousModel, currentModel);
//             // rerender app with the updated model
//             render(app.view(currentModel));
//         }
//     }
// }
