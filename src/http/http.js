import axios from 'axios';
import defaultModel from '../model';

export default {
    authenticate(update) {
        axios.get('/auth/me')
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
        axios.get(`/api/organisation/all`)
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
        axios.get(`/api/organisation/${id}`)
            .then(({ data: organisation }) => {
                update(model => ({
                    ...model,
                    organisation
                }));
            })
            .catch(err => {
                console.log(err);
            });
    }
}