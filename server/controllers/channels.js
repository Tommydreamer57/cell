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
    }
}