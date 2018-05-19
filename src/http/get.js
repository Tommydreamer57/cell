import axios from 'axios';
import defaultModel from '../model';

export function authenticate(update) {
    console.log("app AUTHENTICATING");
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
    console.log("app getting ALL ORGANISATIONS");
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
    console.log("app getting ORGANISATION # " + id);
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
    console.log("app getting ORGANISATION OF CHANNEL # " + id);
    if (!id) return null;
    return axios.get(`/api/organisation?channel_id=${id}`)
        .then(({ data: organisation }) => {
            update(model => ({
                ...model,
                organisation
            }));
        });
}
