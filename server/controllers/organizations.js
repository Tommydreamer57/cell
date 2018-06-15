const { convertEntireOrganization, convertOrganization, convertUser } = require('./utils/utils');
const { awaitUser, requireAdmin } = require('../middlewares');

module.exports = function addOrganizationEndpointsTo(app) {

    // app.get('/api/test/organization', test);

    app.get('/api/organization', awaitUser, read);

    app.get('/api/organization/:organization_id', awaitUser, read);

    app.post('/api/join/organization/:organization_id', awaitUser, join);

    app.post('/api/create/organization', awaitUser, create);

}

function test(req, res) {
    req.db.test_read_organization()
        .then(convertEntireOrganization)
        .then(organization => {
            res.status(200).send(organization);
        })
        .catch(console.error);
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
