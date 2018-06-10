import axios from 'axios';

export function message(update, { type, message_id, channel_id }) {
    // socket.to(`organization ${organization_id}`).emit('deleted message', { message_id })
    return axios.delete(`/api/messages/${type}/${message_id}`)
        .then(({ data: messages }) => {
            update(model => {
                console.log("UPDATING MODEL ON DELETE MESSAGE");
                model.organization[type + 's'].find(group => group.id == channel_id).messages = messages;
                return model;
            });
        })
        .catch(console.error);
}
