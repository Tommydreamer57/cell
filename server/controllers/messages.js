
module.exports = function addMessageEndpointsTo(app) {

    app.post('/api/messages/:type/:id', create);

}

function create(req, res) {
    let { type, id: channel_id } = req.params;
    let { text } = req.body;
    let { id: author_id } = req.user;
    if (type === 'channel') {
        if (!req.user.channels.includes(+channel_id)) {
            res.status(403).json("User: " + author_id + " not a member of channel: " + channel_id);
        } else {
            req.db.create_channel_message({ text, author_id, channel_id })
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
