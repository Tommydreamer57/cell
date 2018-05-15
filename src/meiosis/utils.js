
// STREAM
export function stream(initial) {
    let mapFunctions = [];
    function createdStream(value) {
        for (let fn of mapFunctions) fn(value);
    }
    createdStream.map = mapFn => {
        let newInitial;
        if (initial !== undefined) newInitial = mapFn(initial);
        let newStream = stream(newInitial);
        mapFunctions.push(value => newStream(mapFn(value)));
        return newStream;
    }
    return createdStream;
}

// SCAN
export function scan(accumulator, initial, sourceStream) {
    let newStream = stream(initial);
    let accumulated = initial;
    sourceStream.map(value => {
        accumulated = accumulator(accumulated, value);
        return newStream(accumulated);
    });
    return newStream;
}

// NEST UPDATE
function nestUpdate(update, prop) {
    return cb => update(model => ({ ...model, [prop]: cb(model[prop]) }));
}

// NEST
export function nestComponent(create, update, prop) {
    let component = create(nestUpdate(update, prop));
    if (component.model) {
        component.model = () => ({ [prop]: component.model() });
    }
    if (component.view) {
        component.view = (model, props) => component.view(model[prop] || {}, props || {});
    }
    return component;
}
