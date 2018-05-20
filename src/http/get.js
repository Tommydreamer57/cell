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
    return axios.get(`/api/organisation?all=true`)
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
    return axios.get(`/api/organisation/${id}`)
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
    return axios.get(`/api/organisation?channel_id=${id}`)
        .then(({ data: organisation }) => {
            update(model => ({
                ...model,
                organisation
            }));
        })
        .catch(console.log);
}
