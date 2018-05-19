const { convertChannel } = require('./utils/utils');

module.exports = function addChannelEndpointsTo(app) {

    app.get('/api/channel/:channel_id', read);

    app.post('/api/channel/:organisation_id', create);

}

function read(req, res) {
    const { channel_id } = req.params;
    console.log("GETTING CHANNEL " + channel_id);
    if (channel_id === 'all') {

    }
    else {
        req.db.read_channel({ channel_id })
            .then(convertChannel)
            .then(channel => res.status(200).send(channel))
            .catch(err => { console.log(err); res.status(500).send(err) });
    }
}

function create(req, res) {
    let { organisation_id } = req.params;
    let { name, _private } = req.body;
    let { id: created_by } = req.session.user;
    _private = !!_private;
    console.log('CREATING NEW CHANNEL');
    console.log({ organisation_id, name, _private, created_by });
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
        .catch(err => { console.log(err); res.status(500).send(err) });
}
