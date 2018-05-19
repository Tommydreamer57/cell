const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = function addMiddlewaresTo(app) {

    app.use(bodyParser.json());

    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));

    app.use((req, res, next) => {
        const db = req.app.get('db');
        req.db = db;
        next();
    });

    app.use((req, res, next) => {
        if (!req.session.user) {
            req.session.user = {
                id: 1,
                first_name: "Thomas",
                last_name: "Lowry",
                username: "Tommydreamer57",
                email: "minilao94@yahoo.com",
                admin: true,
                organisations: [1, 2]
            };
            next();
            // req.db.get_user_by_id({ id: 1 }).then(([user]) => {
            //     req.session.user = user;
            //     next();
            // });
        } else next();
    });

}
