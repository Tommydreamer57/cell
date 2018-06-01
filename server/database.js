const massive = require('massive');
const axios = require('axios');

module.exports = function (app) {
    massive(process.env.CONNECTION_STRING)
        .then(db => {
            // reset(db);
            console.log("Connected To Database");
            app.set('db', db);
        })
        .catch(err => {
            console.log("Database Error");
            console.log(err);
        });
}

function reset(db) {
    db.seed()
        .then(users => {
            Promise.all([
                ...users.map(({ username }) => {
                    return axios.put('http://localhost:3021/auth/reset', { username, newPassword: username });
                })
            ])
                .then(responses => console.log("done refreshing db", responses.map(({ data }) => data)))
                .catch(console.log);
        })
        .catch(console.error);
}
