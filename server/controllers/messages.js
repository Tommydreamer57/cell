const { convertUpdatedMessages } = require('./utils/utils');

module.exports = function addMessageEndpointsTo(app) {

    app.post('/api/messages/:type/:id', create);

    app.put('/api/messages/:type/:message_id', update);

    app.delete('/api/messages/:type/:message_id', _delete);

}

function create(req, res) {
    let { type, id: channel_id } = req.params;
    let { text } = req.body;
    let { id: author_id } = req.user;
    if (type === 'channel') {
        if (!req.user.channels.includes(+channel_id)) {
            res.status(403).json("User: " + author_id + " not a member of channel: " + channel_id);
        } else {
            let timestamp = new Date(Date.now());
            req.db.create_channel_message({ text, author_id, channel_id, timestamp })
            .then(messages => {
                res.status(200).send(messages);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
        }
    } else res.status(400).json("can only send message to a channel");
}

function update(req, res) {
    let { type, message_id } = req.params;
    let { text } = req.body;
    let { id: author_id } = req.user;
    if (type === 'channel') {
        console.log("UPDATING");
        console.log({ message_id, text, author_id });
        let timestamp = new Date(Date.now());
        req.db.update_channel_message({ message_id, text, author_id, timestamp })
            .then(convertUpdatedMessages)
            .then(messages => {
                res.status(200).send(messages);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    } else res.status(400).json("can only send message to a channel");
}

function _delete(req, res) {
    let { type, message_id } = req.params;
    let { id: author_id } = req.user;
    if (type === 'channel') {
        console.log("DELETING");
        console.log({ message_id, author_id });
        req.db.delete_channel_message({ message_id, author_id })
            .then(messages => {
                res.status(200).send(messages);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    } else res.status(400).json("can only send message to a channel");
}
