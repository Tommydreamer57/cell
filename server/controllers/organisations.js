const { convertEntireOrganisation, convertOrganisation } = require('./utils/utils');
const { requireAuthentication, requireAdmin } = require('../middlewares');

module.exports = function addOrganisationEndpointsTo(app) {

    app.get('/api/organisation/:organisation_id', requireAuthentication, read);

    app.get('/api/entire/organisation', requireAuthentication, readEntire);

    app.get('/api/entire/organisation/:organisation_id', requireAuthentication, readEntire);

    app.post('/api/join/organisation/:organisation_id', requireAuthentication, join);

}

function read(req, res) {
    if (req.params.organisation_id === 'all') {
        let { id: user_id } = req.session.user;
        req.db.read_all_organisations({ user_id })
            .then(organisations => {
                res.status(200).send(organisations);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    } else {
        req.db.read_organisation(req.params)
            .then(convertOrganisation)
            .then(organisation => {
                res.status(200).send(organisation);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}

function readEntire(req, res) {
    let { organisation_id } = req.params;
    let { channel_id } = req.query;
    req.db.read_entire_organisation({ organisation_id, channel_id })
        .then(convertEntireOrganisation)
        .then(organisation => {
            res.status(200).send(organisation);
        })
        .catch(err => {
            console.log(err);
            res.status(200).send(err);
        });
}

function join(req, res) {
    let { organisation_id } = req.params;
    let { id: user_id } = req.session.user;
    req.db.create_org_membership({ organisation_id, user_id })
        .then(() => {
            console.log("successfully joined");
            res.redirect(`/api/organisation/${organisation_id}`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}
