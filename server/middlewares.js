const bodyParser = require('body-parser');
const session = require('express-session');
const { convertUser } = require('./controllers/utils/utils');

exports.default = function addMiddlewaresTo(app) {

    // BODY PARSER
    app.use(bodyParser.json());

    // DATABASE
    app.use((req, res, next) => {
        const db = req.app.get('db');
        req.db = db;
        next();
    });

    // SESSION
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));

    // DESERIALIZE
    app.use((req, res, next) => {
        let user_id = req.session.user;
        if (user_id) {
            console.log("GETTING USER: " + user_id);
            req.db.read_user({ user_id, username: null, hash: null })
                .then(convertUser)
                .then(user => {
                    req.user = user;
                    next();
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
        } else next();
    });

}

exports.awaitUser = function awaitUser(req, res, next) {
    // if (!req.session.user) {
    if (!req.user || !req.user.id) {
        res.status(401).json("unauthorized");
    } else next();
}

exports.requireAdmin = function requireAdmin(req, res, next) {
    if (!req.session.user || !req.user || !req.user.admin) {
        res.status(403).json("forbidden");
    } else next();
}
