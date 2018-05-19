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

// function reset(db) {
//     axios.get('/auth/signup')
// }
