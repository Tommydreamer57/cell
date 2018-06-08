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
        .catch(err => {
            console.error(err);
            console.log(err);
        });
}

export function allOrganizations(update) {
    return axios.get(`/api/organization?all=true`)
        .then(({ data: allOrganizations }) => {
            update(model => ({
                ...model,
                allOrganizations
            }));
        })
        .catch(console.error);
}

export function organization(update, id) {
    if (!id) return null;
    return axios.get(`/api/organization/${id}`)
        .then(({ data: organization }) => {
            update(model => ({
                ...model,
                organization
            }));
        })
        .catch(console.error);
}

export function organizationByChannel(update, id) {
    if (!id) return null;
    return axios.get(`/api/organization?channel_id=${id}`)
        .then(({ data: organization }) => {
            update(model => ({
                ...model,
                organization
            }));
        })
        .catch(console.error);
}
