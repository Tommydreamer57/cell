import axios from 'axios';

export function requireAuthentication(update) {
    update(({ user, router: { history } }) => {
        if (!user.id) {
            history.push('/login');
        }
    });
}

export function unauthorized(update) {
    return function (err) {
        if (err.response.status === 401) {
            update(({ router: { history } }) => {
                history.push('/login', { message: "Oops, looks like you're not logged in..." });
            });
            update(model => ({
                ...model,
                user: {}
            }));
        } else throw new Error(err);
    }
}

// function deepEquals(one, two, prev = []) {
//     if (typeof one !== typeof two) return false;
//     if (typeof one !== 'object') return one === two;
//     let oneKeys = Object.keys(one);
//     let twoKeys = Object.keys(two);
//     if (oneKeys.length !== twoKeys.length) return false;
//     for (let key of oneKeys) {
//         if (!two.hasOwnProperty(key)) return false;
//         if (!deepEquals(one[key], two[key])) return false;
//     }
//     return true;
// }

// export default function cache(update) {
//     let currentRequests = [];
//     let id = 0;
//     function removeRequest(id) {
//         return function (res) {
//             let index = currentRequests.findIndex(req => req.id === id);
//             currentRequests.splice(index, 1);
//             return res;
//         }
//     }
//     function findRequest(request) {
//         return currentRequests.find(req => deepEquals({
//             ...request,
//             id: null,
//             promise: null,
//         }, {
//                 ...req,
//                 id: null,
//                 promise: null
//             }));
//     }
//     return {
//         registerRequest(request) {
//             let { method, url, body } = request;
//             id++;
//             let found = findRequest(request);
//             if (found) return found.promise;
//             let promise = axios[method.toLowerCase()](url, body).then(removeRequest(id)).catch(console.error);
//             currentRequests.push({
//                 method,
//                 url,
//                 body,
//                 promise,
//                 id
//             });
//             return request.promise;
//         }
//     }
// }
