function defaultQuery() {
    return {
        then(cb) {
            cb();
            return this;
        },
        catch(cb) {
            cb();
            return this;
        }
    };
}

module.exports = {
    read(req, res) {
        let { type, id } = req.params;
        let query = defaultQuery;
        if (type === 'channel') query = req.db.read_channel_messages;
        else if (type === 'direct') query = db.read_group_messages;
        query({ id })
            .then(messages => {
                res.status(200).send(messages);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            })
    },
    create(req, res) {
        let { type, id: channel_id } = req.params;
        let { text } = req.body;
        let { id: author_id } = req.session.user;
        // let query = defaultQuery;
        // if (type === 'channel') query = req.db.create_channel_message;
        // else if (type === 'direct') query = db.create_direct_message;
        req.db.create_channel_message({ text, author_id, channel_id })
            .then(messages => {
                res.status(200).send(messages);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}