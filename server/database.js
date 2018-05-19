const massive = require('massive');

module.exports = function (app) {
    massive(process.env.CONNECTION_STRING)
        .then(db => {
            console.log("Connected To Database");
            app.set('db', db);
        })
        .catch(err => {
            console.log("Database Error");
            console.log(err);
        });
}
