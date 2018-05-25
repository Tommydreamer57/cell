
// STREAM
// -- initial
export function stream(initial) {
    console.log("STREAM WAS INVOKED");
    console.log([...arguments]);
    // LIST OF FUNCTIONS TO INVOKE WHEN THE CREATED STREAM IS INVOKED
    let mapFunctions = [];
    // CREATED STREAM TO RETURN
    function createdStream(value) {
        console.log("CREATED STREAM WAS INVOKED");
        console.log([...arguments]);
        // INVOKE ALL FUNCTIONS
        for (let fn of mapFunctions) fn(value);
    }
    // METHOD OF ADDING FUNCTIONS TO THE LIST
    createdStream.map = function (mapFn) {
        console.log("STREAM.MAP() WAS INVOKED");
        console.log([...arguments]);
        let newInitial;
        if (initial !== undefined) newInitial = mapFn(initial);
        let newStream = stream(newInitial);
        // ADD THE NEW FUNCTION TO THE LIST
        mapFunctions.push(function (value) {
            return newStream(mapFn(value));
        });
        return newStream;
    }
    // RETURN THE CREATED STREAM
    return createdStream;
}

// SCAN
// -- accumulator merges the old model to the new model -- initialModel of the application -- sourceStream = update function
export function scan(accumulator, initialModel, sourceStream) {
    console.log("SCAN WAS INVOKED");
    console.log([...arguments]);
    let newStream = stream(initialModel);
    // ACCUMULATED IS THE MODEL OF THE APP
    let accumulated = initialModel;
    sourceStream.map(function (callback) {
        console.log("SOURCESTREAM.MAP() CALLBACK WAS INVOKED");
        console.log([...arguments]);
        // COPY ACCUMULATED VALUE
        let oldAccumulated = accumulated;
        // INVOKE ACCUMULATOR & CAPTURE RESULT
        let newAccumulated = accumulator(accumulated, callback);
        // REASSIGN ACCUMULATED TO THE NEW VALUE
        accumulated = newAccumulated;
        // RERENDER
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
