import axios from 'axios';
import initialModel from '../model';

function gotUser(update) {
    return function ({ data: user }) {
        update(model => ({
            ...model,
            user
        }));
        update.access(['router', 'history']).push('/dashboard');
    }
}

export function signup(update, { first_name, last_name, username, email, password }) {
    return axios.post('/auth/signup', { first_name, last_name, username, email, password })
        .then(gotUser(update));
}

export function login(update, username, password) {
    return axios.post('/auth/login', { username, password })
        .then(gotUser(update));
}

export function logout(update) {
    update(model => ({
        ...model,
        loggingOut: true
    }));
    return axios.post('/auth/logout')
        .then(() => {
            update(model => ({
                ...model,
                user: initialModel.user,
                loggingOut: false
            }));
            update.access(['router', 'history']).push('/login');
        });
}

export function message(update, { type, id, text }) {
    update(model => ({
        ...model,
        organization: {
            ...model.organization,
            channels: model.organization.channels
                .map(channel => (
                    channel.id == id ?
                        {
                            ...channel,
                            messages: [...channel.messages, { isLoading: true, text, author_id: model.user.id }]
                        }
                        :
                        channel
                ))
        }
    }));
    return axios.post(`/api/messages/${type}/${id}`, { text })
        .then(({ data: messages }) => {
            update(model => ({
                ...model,
                organization: {
                    ...model.organization,
                    channels: model.organization.channels
                        .map(channel => (
                            channel.id == id ?
                                {
                                    ...channel,
                                    messages
                                }
                                :
                                channel
                        ))
                }
            }));
        });
}

export function newChannel(update, organization_id, name, _private) {
    return axios.post(`/api/create/channel/${organization_id}`, { name, _private })
        .then(({ data: channel }) => {
            update(model => ({
                ...model,
                organization: {
                    ...model.organization,
                    channels: [...model.organization.channels, channel]
                },
                user: {
                    ...model.user,
                    channels: [...model.user.channels, channel.id]
                }
            }));
            update.access(['router', 'history']).push(`/messages/channel/${channel.id}`);
        });
}

export function joinChannel(update, channel_id) {
    return axios.post(`/api/join/channel/${channel_id}`)
        .then(({ data: organization }) => {
            update(model => ({
                ...model,
                organization
            }));
            update.access(['router', 'history']).push(`/messages/channel/${channel_id}`);
        });
}

export function joinOrganization(update, organization_id) {
    return axios.post(`/api/join/organization/${organization_id}`)
        .then(({ data: user }) => {
            update(model => ({
                ...model,
                user
            }));
        });
};

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
        });
};
