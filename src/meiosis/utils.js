
// STREAM
export function stream(initial) {
    // console.log(initial);
    let mapFunctions = [];
    function createdStream(value) {
        // console.trace(value);
        mapFunctions.forEach(fn => fn(value));
    }
    createdStream.map = function (mapFn) {
        let newInitial;
        if (initial !== undefined) newInitial = mapFn(initial);
        let newStream = stream(newInitial);
        mapFunctions.push(function (value) {
            newStream(mapFn(value));
        });
        return newStream;
    }
    return createdStream;
}

// SCAN
export function scan(accumulator, initial, sourceStream) {
    let newStream = stream(initial);
    let accumulated = initial;
    sourceStream.map(function (value) {
        accumulated = accumulator(accumulated, value);
        return newStream(accumulated);
    });
    return newStream;
}

function isObjNotArr(obj) {
    return (
        obj &&
        typeof obj === 'object' &&
        !Array.isArray(obj)
    );
}

// MERGE
export function merge(old, neww) {
    if (old === neww) return neww;
    let obj = { ...old };
    if (typeof neww === 'function') {
        neww = neww(old);
    }
    for (let prop in neww) {
        // IF PROP ALREADY EXISTS & IS DIFFERENT
        if (obj.hasOwnProperty(prop) && isObjNotArr(obj[prop]) && isObjNotArr(neww[prop])) {
            obj[prop] = merge(obj[prop], neww[prop]);
        } else {
            obj[prop] = neww[prop];
        }
    }
    return obj;
}

// NEST UPDATE
function nestUpdate(update, prop) {
    return function (cb) {
        update(function (model) {
            return { ...model, [prop]: cb(model[prop]) };
        });
    }
}

// NEST
export function nestComponent(create, update, prop) {
    // console.log("CREATING NESTED COMPONENT: " + prop);
    let component = create(nestUpdate(update, prop));
    let result = { ...component };
    if (component.model) {
        result.model = function () {
            // console.log("INVOKING NESTED MODEL");
            return {
                [prop]: component.model()
            };
        }
    }
    if (component.view) {
        result.view = function (model, props) {
            // console.log("INVOKING NESTED VIEW");
            return component.view(model[prop] || {}, props | {});
        }
    }
    return result;
}
