
// DEEP COPY
function deepCopy(obj, prev = []) {
    if (!obj) return obj;
    if (['number', 'boolean', 'function', 'string'].includes(typeof obj)) return obj;
    let newObj = {};
    if (Array.isArray(obj)) {
        newObj = [];
    }
    for (let key in obj) {
        if (prev.includes(obj[key])) {
            newObj[key] = "CIRCULAR";
        } else {
            if (obj[key] && !['number', 'boolean', 'function', 'string'].includes(typeof obj[key])) prev.push(obj[key]);
            newObj[key] = deepCopy(obj[key], prev);
        }
    }
    return newObj;
}

// COMPARE CHANGES
function compare(old, neww, prev = []) {
    let differences = {};
    if (Array.isArray(neww)) {
        differences = [];
    }
    if (!neww) return neww;
    for (let key in neww) {
        prev.push(neww[key]);
        if ((!old || !(key in old)) || (typeof neww[key] !== typeof old[key])) {
            differences[key] = neww[key];
        } else if (typeof neww[key] === "object" && neww[key] !== null) {
            differences[key] = compare(old[key], neww[key], prev);
            if (differences[key] && !Object.keys(differences[key]).length) {
                delete differences[key];
            }
        } else if (neww[key] !== old[key]) {
            differences[key] = neww[key];
        }
    }
    if (old) {
        for (let key in old) {
            if (neww && !(key in neww)) {
                differences[key] = "DELETED";
            }
        }
    }
    return differences;
}

// WATCH CHANGES IN MODEL
export default function watchUpdates() {
    let oldCopy, currentCopy;
    return function (newModel) {
        console.log("NEW MODEL");
        console.log(newModel);
        // TRACK PREVIOUS MODELS - COPY NEW MODELS TO MAINTAIN IMMUTABILITY
        [oldCopy, currentCopy] = [currentCopy, deepCopy(newModel)];
        // COMPUTE DIFFERENCES
        let differences = compare(oldCopy, currentCopy);
        // TRACE SOURCE OF UPDATE IF NO DIFFERENCES MADE
        if (Object.keys(differences).length) {
            console.log("DIFFERENCES:");
            console.log(differences);
        } else {
            console.log("NO DIFFERENCES:");
            console.trace(newModel);
        }
        return newModel;
    }
}