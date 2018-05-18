// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const http = require('http');
const socketio = require('socket.io');
const massive = require('massive');
require('dotenv').config();
// MIDDLEWARES
const dbToReq = require('./middlewares/db');
const userToSession = require('./middlewares/user');
// CONTROLLERS
const ec = require('./controllers/everything');
const oc = require('./controllers/organisations');
const cc = require('./controllers/channels');
const mc = require('./controllers/messages');

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
massive(process.env.CONNECTION_STRING)
    .then(db => {
        // db.seed().then(() => console.log('refreshed database'));
        console.log("Connected To Database");
        app.set('db', db);
    })
    .catch(err => {
        console.log("Database Error");
        console.log(err);
    });

// ENDPOINTS

// POST

// CONSOLE
app.post('/api/console', (req, res) => { console.log(req.body); res.sendStatus(200) });
// MESSAGES
app.post('/api/messages/:type/:id', mc.create);

// GET

// AUTHENTICATION
app.get('/auth/me', (req, res) => res.status(200).send(req.session.user));
// EVERYTHING
app.get('/api/everything', ec.read);
// ORGANISATION
app.get('/api/organisation/:organisation_id', oc.read);
app.get('/api/entire/organisation', oc.readEntire);
app.get('/api/entire/organisation/:organisation_id', oc.readEntire);
// CHANNEL
app.get('/api/channel/:channel_id', cc.read);
app.post('/api/channel/:organisation_id', cc.create);
// MESSAGES
app.get('/api/messages/:type/:id', mc.read);

// LISTEN
const server = app.listen(3021, () => console.log('Cells on 3021!'));

// SOCKET
const io = socketio(server);

// SOCKETS
io.on('connection', socket => {

    socket.on('')

});
