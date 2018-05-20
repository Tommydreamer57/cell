const { convertChannel } = require('./utils/utils');
const { requireAuthentication, requireAdmin } = require('../middlewares');

module.exports = function addChannelEndpointsTo(app) {

    app.post('/api/create/channel/:organisation_id', requireAuthentication, create);

    app.post('/api/join/channel/:channel_id', requireAuthentication, join);

}

function create(req, res) {
    let { organisation_id } = req.params;
    let { name, _private } = req.body;
    let { id: created_by } = req.user;
    _private = !!_private;
    console.log('CREATING NEW CHANNEL');
    console.log({ organisation_id, name, _private, created_by });
    if (!req.user.organisations.includes(+organisation_id)) {
        res.status(403).send("user: " + user_id + " not a member of organisation: " + organisation_id);
    } else {
        req.db.create_channel({ organisation_id, created_by, name, _private })
            .then(([channel]) => {
                channel.members = [channel.member_id];
                channel.messages = [];
                delete channel.member_id;
                delete channel.channel_id;
                console.log("CREATED NEW CHANNEL: " + channel.id);
                console.log(channel);
                res.status(200).send(channel);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}

function join(req, res) {
    let { channel_id } = req.params;
    let { id: user_id } = req.user;
    if (req.user.channels.includes(+channel_id)) {
        res.status(400).json("user: " + user_id + " already a member of channel: " + channel_id);
    } else {
        req.db.create_channel_membership({ channel_id, user_id })
            .then(() => {
                res.redirect(`/api/organisation?channel_id=${channel_id}`);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}
