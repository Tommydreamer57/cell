import axios from 'axios';
// import { unauthorized } from './utils';

export function authenticate(update) {
    return axios.get('/auth/me')
        .then(({ data: user }) => {
            update(model => ({
                ...model,
                user
            }));
            return user;
        })
    // .catch(unauthorized(update))
    // .catch(console.error);
}

export function allOrganizations(update) {
    return axios.get(`/api/organization?all=true`)
        .then(({ data: allOrganizations }) => {
            update(model => ({
                ...model,
                allOrganizations
            }));
        })
        // .catch(unauthorized(update))
        .catch(console.error);
}

export function organization(update, id) {
    if (!id) return null;
    return axios.get(`/api/organization/${id}`)
        .then(({ data: organization }) => {
            update(model => ({
                ...model,
                organization: (
                    // IN CASE ROUTE WAS CHANGED WHILE REQUEST WAS PROCESSING
                    (
                        model.router.location.pathname.includes('organization')
                        &&
                        organization.id == model.router.match.params.id
                    ) || (
                        model.router.location.pathname.includes('channel')
                        &&
                        organization.channels.some(channel => channel.id == model.router.match.params.id)
                    )
                ) ? organization : model.organization
            }));
        })
        // .catch(unauthorized(update))
        .catch(console.error);
}

export function organizationByChannel(update, id) {
    if (!id) return null;
    return axios.get(`/api/organization?channel_id=${id}`)
        .then(({ data: organization }) => {
            update(model => ({
                ...model,
                organization: (
                    // IN CASE ROUTE WAS CHANGED WHILE REQUEST WAS PROCESSING
                    (
                        model.router.location.pathname.includes('organization')
                        &&
                        organization.id == model.router.match.params.id
                    ) || (
                        model.router.location.pathname.includes('channel')
                        &&
                        organization.channels.some(channel => channel.id == model.router.match.params.id)
                    )
                ) ? organization : model.organization
            }));
        })
        // .catch(unauthorized(update))
        .catch(console.error);
}

export function channel(update, id) {
    if (!id) return null;
    return axios.get(`/api/channel/${id}`)
        .then(({ data: updatedChannel }) => {
            update(model => ({
                ...model,
                organization: {
                    ...model.organization,
                    channels: model.organization.channels
                        .map(channel => {
                            if (channel.id == id) return updatedChannel;
                            else return channel;
                        })
                }
            }));
        })
        // .catch(unauthorized(update))
        .catch(console.error);
}
