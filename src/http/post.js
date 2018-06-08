import utils from './utils';
import axios from 'axios';
import initialModel from '../model';

function gotUser(update) {
    return function ({ data: user }) {
        update(model => {
            return {
                ...model,
                user
            };
        });
        update(({ router: { history } }) => {
            history.push('/dashboard');
        });
    }
}

export function signup(update, { first_name, last_name, username, email, password }) {
    return axios.post('/auth/signup', { first_name, last_name, username, email, password })
        .then(gotUser(update))
        .catch(console.error);
}

export function login(update, username, password) {
    return axios.post('/auth/login', { username, password })
        .then(gotUser(update))
        .catch(console.error);
}

export function logout(update) {
    return axios.post('/auth/logout')
        .then(() => {
            update(model => ({
                ...model,
                user: initialModel.user
            }));
            update(({ router: { history } }) => {
                history.push('/login');
            });
        })
        .catch(console.error);
}

export function message(update, type, id, text) {
    return axios.post(`/api/messages/${type}/${id}`, { text })
        .then(({ data: messages }) => {
            update(model => {
                console.log("UPDATING MODEL ON SEND MESSAGE");
                model.organization[type + 's'].find(group => group.id == id).messages = messages;
                return model;
            });
        })
        .catch(console.error);
}

export function newChannel(update, organization_id, name, _private) {
    return axios.post(`/api/create/channel/${organization_id}`, { name, _private })
        .then(({ data: channel }) => {
            update(({ router: { history } }) => {
                history.push(`/messages/channel/${channel.id}`);
            });
            update(model => {
                if (model.organization.id === organization_id) model.organization.channels.push(channel);
                return model;
            });
        })
        .catch(console.error);
}

export function joinChannel(update, channel_id) {
    return axios.post(`/api/join/channel/${channel_id}`)
        .then(({ data: organization }) => {
            update(({ router: { history } }) => {
                history.push(`/messages/channel/${channel_id}`);
            });
            update(model => ({
                ...model,
                organization
            }));
        })
        .catch(console.error);
}

export function joinOrganization(update, organization_id) {
    return axios.post(`/api/join/organization/${organization_id}`)
        .then(({ data: user }) => {
            update(model => ({
                ...model,
                user
            }));
        })
        .catch(console.error);
}

export function createOrganization(update, name) {
    return axios.post('/api/create/organization', { name })
        .then(({ data: organization }) => {
            update(model => ({
                ...model,
                allOrganizations: [...model.allOrganizations, organization],
                user: {
                    ...model.user,
                    organizations: [...model.user.organizations, organization.id]
                }
            }));
        })
        .catch(console.error);
}
