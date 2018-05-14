import * as u from './utils';

export const {
    stream,
    scan,
    nestComponent
} = u;

export default function initialize(createApp, render) {
    // UPDATE
    let update = stream();
    
    // APP
    let app = createApp(update);
    
    // MODELS
    let models = scan((model, cb) => cb(model), app.model(), update);
    
    // CONNECT RENDER TO STREAMS
    models.map(render(app));
    
    // INITIALIZE APP
    models(app.model());
}
