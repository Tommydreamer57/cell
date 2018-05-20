
// COMPARE CHANGES
function compare(old, neww) {
    let differences = {};
    if (!neww) return neww;
    for (let key in neww) {
        if ((!old || !(key in old)) || (typeof neww[key] !== typeof old[key])) {
            differences[key] = neww[key];
        } else if (typeof neww[key] === "object" && neww[key] !== null) {
            differences[key] = compare(old[key], neww[key]);
            if (differences[key] && !Object.keys(differences[key]).length) {
                delete differences[key];
            }
        } else if (neww[key] !== old[key]) {
            differences[key] = neww[key];
        }
    }
    return differences;
}

// DEEP COPY
function deepCopy(obj) {
    if (!obj) return obj;
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number') return obj;
    let newObj = {};
    if (Array.isArray(obj)) newObj = [];
    for (let key in obj) {
        newObj[key] = deepCopy(obj[key]);
    }
    return newObj;
}

// WATCH CHANGES IN MODEL IN CONSOLE
export function watch(oldModel) {
    let currentModel = oldModel;
    return function (newModel) {
        console.log("NEW MODEL");
        [oldModel, currentModel] = [currentModel, newModel];
        let oldCopy = deepCopy(oldModel);
        let newCopy = deepCopy(newModel);
        let differences = compare(oldModel, newModel);
        if (Object.keys(differences).length) {
            console.log("DIFFERENCES:");
            console.log(differences);
        } else {
            console.log("NO DIFFERENCES:");
            console.trace(newModel);
        }
    }
}