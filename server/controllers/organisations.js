const { convertOrganisation } = require('./utils/utils');

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
                    // console.log(organisation);
                    res.status(200).send(organisation);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
        }
    },
}