// DEPENDENCIES
const express = require('express');
// MIDDLEWARES
const { default: addMiddlewaresTo } = require('./middlewares');
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

// MIDDLEWARES
addMiddlewaresTo(app);

// DB
connectDbTo(app);

// ENDPOINTS
addAllEndpointsTo(app);

// LISTEN
const server = app.listen(3021, () => console.log('Cells on 3021!'));

// SOCKET
connectSocketsTo(server);
