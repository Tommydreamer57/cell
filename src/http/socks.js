import io from 'socket.io-client';

export default function addSockets(update) {

    let addedSocket = false;

    let socket = io('/');

    socket.on('joined organization', ({ new_member }) => {
        let {
            // channels
            channels,
            // member
            email,
            first_name,
            last_name,
            username,
            id,
        } = new_member;
        let member = {
            email,
            first_name,
            last_name,
            username,
            id
        };
        update(model => ({
            ...model,
            organization: {
                ...model.organization,
                members: [...model.organization.members, member],
                channels: model.organization.channels
                    .map(channel => {
                        if (!channels.includes(channel.id)) return channel;
                        else return {
                            ...channel,
                            members: [...channel.members, member.id]
                        };
                    })
            }
        }));
    });

    socket.on('joined channel', ({ member_id, channel_id }) => {
        update(model => ({
            ...model,
            organization: {
                ...model.organization,
                channels: model.organization.channels
                    .map(channel => {
                        if (channel_id !== channel.id) return channel;
                        else return {
                            ...channel,
                            members: [...channel.members, member_id]
                        };
                    })
            }
        }));
    });

    socket.on('created channel', ({ channel }) => {
        update(model => ({
            ...model,
            organization: {
                ...model.organization,
                channels: [...model.organization.channels, channel]
            }
        }));
    });

    socket.on('received message', ({ channel_id, message }) => {
        update(model => ({
            ...model,
            organization: {
                ...model.organization,
                channels: model.organization.channels
                    .map(channel => {
                        if (channel.id !== channel_id) return channel;
                        else return {
                            ...channel,
                            messages: [...channel.messages, message]
                        };
                    })
            }
        }));
    });

    return function socketMiddleware(model) {
        if (addedSocket) return model;
        else {
            return {
                ...model,
                socks: {
                    socket,
                    io
                }
            };
        }
    }

}
