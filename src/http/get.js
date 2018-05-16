import axios from 'axios';
import defaultModel from '../model';

export function authenticate(update) {
    return axios.get('/auth/me')
        .then(({ data: user }) => {
            update(model => ({
                ...model,
                user
            }));
        })
        .catch(console.log);
}
export function allOrganisations(update) {
    return axios.get(`/api/organisation/all`)
        .then(({ data: allOrganisations }) => {
            update(model => ({
                ...model,
                allOrganisations
            }));
        })
        .catch(console.log);
}
export function organisation(update, id) {
    if (!id) return null;
    return axios.get(`/api/entire/organisation/${id}`)
        .then(({ data: organisation }) => {
            update(model => ({
                ...model,
                organisation
            }));
        })
        .catch(console.log);
}
export function organisationByChannel(update, id) {
    if (!id) return null;
    return axios.get(`/api/entire/organisation?channel_id=${id}`)
        .then(({ data: organisation }) => {
            update(model => ({
                ...model,
                organisation
            }));
        });
}
// export function channel(update, id) {
//     return axios.get(`/api/channel/${id}`)
//         .then(({ data: channel }) => {
//             update(model => {
//                 if (!model.organisation.id) organisation(update, channel.organisation_id);
//                 return {
//                     ...model,
//                     channel
//                 }
//             });
//         })
//         .catch(console.log);
// }
// export function messages(update, type, id) {
//     return axios.get(`/api/messages/${type}/${id}`)
//         .then(console.log)
//         .catch(console.log);
// }