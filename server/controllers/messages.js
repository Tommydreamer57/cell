module.exports = {
    read(req, res) {
        let { type, id } = req.params;
        let query = () => ({ then() { } });
        if (type === 'channel') query = req.db.read_channel_messages;
        else if (type === 'direct-messages') query = db.read_group_messages;
        query({ id })
            .then(messages => {
                res.status(200).send(messages);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            })
    }
}