// DEPENDENCIES
const express = require('express');
// MIDDLEWARES
const { default: applyMiddlewaresTo } = require('./middlewares');
// CONTROLLERS
const addAllEndpointsTo = require('./endpoints');
// DATABASE
const connectDbTo = require('./database');
// SOCKETS
const connectSocketsTo = require('./sockets');
// ENV
require('dotenv').config();

// APP
const app = express();

// EXPRESS STATIC
app.use(express.static(__dirname + '/../build'));

// MIDDLEWARES
applyMiddlewaresTo(app);

// DB
connectDbTo(app);

// ENDPOINTS
addAllEndpointsTo(app);

// SERVE REACT
const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

// LISTEN
const server = app.listen(3021, () => console.log('Cells on 3021!'));

// SOCKETS
connectSocketsTo(server);
