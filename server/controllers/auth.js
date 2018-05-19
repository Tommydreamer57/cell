const bcrypt = require('bcryptjs');

module.exports = function addAuthEndpointsTo(app) {

    app.post('/auth/signup', signup);

    app.post('/auth/login', login);

    app.get('/auth/me', getCurrentUser);

    app.put('/auth/reset', resetPassword);

}

function signup(req, res) {
    console.log("SIGNING UP", req.body);

    let { first_name, last_name, username, email, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            req.db.create_user({ first_name, last_name, username, email, hash })
                .then(([user]) => {
                    req.session.user = user;
                    console.log(req.session);
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
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                else if (result) {
                    req.db.read_user({ username, hash })
                        .then(([user]) => {
                            req.session.user = user;
                            res.status(200).send(user);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(200).send(err);
                        });
                }
                else {
                    res.status(401).send({ username });
                }
            });
        })
        .catch(err => {
            err = err.toString();
            console.log(err)
            if (err.match(/Cannot match against/)) {
                res.status(401).json('invalid credentials');
            } else {
                res.status(500).send({ err });
            }
        });

}

function getCurrentUser(req, res) {
    res.status(200).send(req.session.user);
}

function resetPassword(req, res) {
    let { username } = req.body;
}
