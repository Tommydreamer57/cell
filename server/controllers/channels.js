const { convertChannel } = require('./utils/utils');

module.exports = {
    read(req, res) {
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
    },
    create(req, res) {
        const { organisation_id } = req.params;
        const { name, _private } = req.body;
        const { id: created_by } = req.session.user;
        req.db.create_channel({ organisation_id, created_by, name, _private })
            .then(([channel]) => {
                channel.members = [channel.member_id];
                channel.messages = [];
                delete channel.member_id;
                delete channel.channel_id;
                console.log(channel);
                res.status(200).send(channel);
            })
            .catch(err => { console.log(err); res.status(500).send(err) });
    }
}