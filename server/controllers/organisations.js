const { convertEntireOrganisation, convertOrganisation, convertUser } = require('./utils/utils');
const { requireAuthentication, requireAdmin } = require('../middlewares');

module.exports = function addOrganisationEndpointsTo(app) {

    app.get('/api/organisation', requireAuthentication, read);

    app.get('/api/organisation/:organisation_id', requireAuthentication, read);

    app.post('/api/join/organisation/:organisation_id', requireAuthentication, join);

}

function read(req, res) {
    let { organisation_id } = req.params;
    let { channel_id, all } = req.query;
    let { id: user_id } = req.user;
    if (all) {
        req.db.read_all_organisations()
            .then(organisations => {
                res.status(200).send(organisations);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    } else {
        if ((organisation_id && !req.user.organisations.includes(+organisation_id)) || (channel_id && !req.user.channels.includes(+channel_id))) {
            res.status(403).json("user: " + user_id + " not a member of organisation: " + organisation_id + ", or is not a member of channel: " + channel_id);
        } else {
            req.db.read_organisation({ organisation_id, channel_id, user_id })
                .then(convertEntireOrganisation)
                .then(organisation => {
                    res.status(200).send(organisation);
                })
                .catch(err => {
                    console.log(err);
                    res.status(200).send(err);
                });
        }
    }
}

function join(req, res) {
    let { organisation_id } = req.params;
    let { id: user_id } = req.user;
    req.db.create_org_membership({ organisation_id, user_id })
        .then(convertUser)
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}
