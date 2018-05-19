const bcrypt = require('bcryptjs');

module.exports = function addAuthEndpointsTo(app) {

    app.post('/auth/signup', signup);

    app.post('/auth/login', login);

    app.get('/auth/me', getCurrentUser);

}

function signup(req, res) {
    console.log("SIGNING UP", req.body);

    let { first_name, last_name, username, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            req.db.create_user({ first_name, last_name, username, email, hash })
                .then(([user]) => {
                    res.status(200).send(user);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
        });
    });

}

function login(req, res) {
    console.log("LOGGING IN", req.body);

    let { username, password } = req.body;

    req.db.read_hash({ username })
        .then(([{ hash }]) => {
            bcrypt.compare(password, hash, (err, result) => {
                if (result) {
                    req.db.read_user({ username, hash })
                        .then(([user]) => {
                            res.status(200).send(user);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(200).send(err);
                        })
                }
                else {
                    res.status(401).send({ username });
                }
            })
        })

}

function getCurrentUser(req, res) {
    res.status(200).send(req.session.user);
}
