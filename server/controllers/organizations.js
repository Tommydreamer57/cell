const { convertEntireOrganization, convertOrganization, convertUser } = require('./utils/utils');
const { requireAuthentication, requireAdmin } = require('../middlewares');

module.exports = function addOrganizationEndpointsTo(app) {

    app.get('/api/organization', requireAuthentication, read);

    app.get('/api/organization/:organization_id', requireAuthentication, read);

    app.post('/api/join/organization/:organization_id', requireAuthentication, join);

    app.post('/api/create/organization', requireAuthentication, create);

}

function read(req, res) {
    let { organization_id } = req.params;
    let { channel_id, all } = req.query;
    let { id: user_id } = req.user;
    if (all) {
        req.db.read_all_organizations()
            .then(organizations => {
                res.status(200).send(organizations);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    } else {
        if ((organization_id && !req.user.organizations.includes(+organization_id)) || (channel_id && !req.user.channels.includes(+channel_id))) {
            res.status(403).json("user: " + user_id + " not a member of organization: " + organization_id + ", or is not a member of channel: " + channel_id);
        } else {
            req.db.read_organization({ organization_id, channel_id, user_id })
                .then(convertEntireOrganization)
                .then(organization => {
                    res.status(200).send(organization);
                })
                .catch(err => {
                    console.log(err);
                    res.status(200).send(err);
                });
        }
    }
}

function join(req, res) {
    let { organization_id } = req.params;
    let { id: user_id } = req.user;
    req.db.create_org_membership({ organization_id, user_id })
        .then(convertUser)
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

function create(req, res) {
    let { name } = req.body;
    let { id: user_id } = req.user;
    req.db.create_organization({ name, user_id })
        .then(([organization]) => {
            res.status(200).send(organization);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
}
