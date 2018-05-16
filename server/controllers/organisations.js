const { convertEntireOrganisation, convertOrganisation } = require('./utils/utils');

module.exports = {
    read(req, res) {
        if (req.params.organisation_id === 'all') {
            let { id: user_id } = req.session.user;
            req.db.read_all_organisations({ user_id })
                .then(organisations => {
                    res.status(200).send(organisations);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
        } else {
            req.db.read_organisation(req.params)
                .then(convertOrganisation)
                .then(organisation => {
                    res.status(200).send(organisation);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
        }
    },
    readEntire(req, res) {
        let { organisation_id } = req.params;
        req.db.read_entire_organisation({ organisation_id })
            .then(convertEntireOrganisation)
            .then(organisation => {
                res.status(200).send(organisation);
            })
            .catch(err => {
                console.log(err);
                res.status(200).send(err);
            });
    }
}