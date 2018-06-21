import axios from 'axios';

export function message(update, { type, message_id, text, channel_id }, cb) {
    update(model => ({
        ...model,
        organization: {
            ...model.organization,
            channels: model.organization.channels
                .map(channel => (
                    channel.id == channel_id ?
                        {
                            ...channel,
                            messages: channel.messages
                                .map(message => (
                                    message.id === message_id ?
                                        { ...message, isLoading: true, text }
                                        :
                                        message
                                ))
                        }
                        :
                        channel
                ))
        }
    }), cb);
    return axios.put(`/api/messages/${type}/${message_id}`, { text })
        .then(({ data: messages }) => {
            update(model => ({
                ...model,
                organization: {
                    ...model.organization,
                    channels: model.organization.channels
                        .map(channel => (
                            channel.id == channel_id ?
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
