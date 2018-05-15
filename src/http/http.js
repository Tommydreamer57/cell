import axios from 'axios';
import defaultModel from '../model';

export default {
    authenticate(update) {
        return axios.get('/auth/me')
            .then(({ data: user }) => {
                update(model => ({
                    ...model,
                    user
                }));
            })
            .catch(err => {
                console.log(err);
            });
    },
    getAllOrganisations(update) {
        return axios.get(`/api/organisation/all`)
            .then(({ data: allOrganisations }) => {
                update(model => ({
                    ...model,
                    allOrganisations
                }));
            })
            .catch(err => {
                console.log(err);
            });
    },
    getOrganisation(update, id) {
        update(model => ({
            ...model,
            organisation: defaultModel.organisation
        }));
        return axios.get(`/api/organisation/${id}`)
            .then(({ data: organisation }) => {
                update(model => ({
                    ...model,
                    organisation
                }));
            })
            .catch(err => {
                console.log(err);
            });
    },
    getChannel(update, id) {
        axios.get(`/api/channel/${id}`)
            .then(({ data: channel }) => {
                update(model => ({
                    ...model,
                    channel
                }));
            })
            .catch(console.log);
    },
    getMessages(update, type, id) {
        return axios.get(`/api/messages/${type}/${id}`)
            .then(console.log)
            .catch(console.log);
    }
}