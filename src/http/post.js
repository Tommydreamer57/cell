import utils from './utils';
import axios from 'axios';


export function message(update, type, id, text) {
    return axios.post(`/api/messages/${type}/${id}`, { text })
        .then(({ data: channel }) => {
            update(model => ({
                ...model,
                channel
            }));
        })
        .catch(console.log);
}
