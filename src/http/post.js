import utils from './utils';
import axios from 'axios';

export function signup(update, { first_name, last_name, username, email, password }) {
    return axios.post(`/auth/signup`, { first_name, last_name, username, email, password })
        .then(({ data: user }) => {
            update(model => ({
                ...model,
                user
            }));
        })
        .catch(console.log);
}

export function login(update, username, password) {
    return axios.post(`/auth/login`, { username, password })
        .then(({ data: user }) => {
            update(model => ({
                ...model,
                user
            }));
        })
        .catch(console.log);
}

export function message(update, type, id, text) {
    return axios.post(`/api/messages/${type}/${id}`, { text })
        .then(({ data: messages }) => {
            update(model => {
                model.organisation[type + 's'].find(group => group.id == id).messages = messages;
                return model;
            });
        })
        .catch(console.log);
}

export function newChannel(update, organisation_id, name, _private) {
    return axios.post(`/api/create/channel/${organisation_id}`, { name, _private })
        .then(({ data: channel }) => {
            update(model => {
                if (model.organisation.id === organisation_id) model.organisation.channels.push(channel);
                return model;
            });
        })
        .catch(console.log);
}

export function joinChannel(update, channel_id) {
    return axios.post(`/api/join/channel/${channel_id}`)
        .then(({ data: organisation }) => {
            update(model => ({
                ...model,
                organisation
            }));
        })
        .catch(console.log);
}
