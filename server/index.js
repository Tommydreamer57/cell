// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
// MIDDLEWARES
const dbToReq = require('./middlewares/db');
const userToSession = require('./middlewares/user');
// CONTROLLERS
const ec = require('./controllers/everything');
const oc = require('./controllers/organisations');

// APP
const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(dbToReq);
app.use(userToSession);

// DB
massive(process.env.CONNECTION_STRING).then(db => {
    // db.seed().then(() => console.log('refreshed database'));
    app.set('db', db);
});

// ENDPOINTS

// EVERYTHING
app.get('/api/everything', ec.read);
// ORGANISATION
app.get('/api/organisation/:organisation_id', oc.read);

// LISTEN

app.listen(3021, () => console.log('cells on 3021!'));
