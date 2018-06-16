import axios from 'axios';

export function message(update, { type, message_id, channel_id }) {
    return axios.delete(`/api/messages/${type}/${message_id}`)
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
