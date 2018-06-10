const addAuthEndpointsTo = require('./controllers/auth');
const addOrganizationEndpointsTo = require('./controllers/organizations');
const addChannelEndpointsTo = require('./controllers/channels');
const addMessageEndpointsTo = require('./controllers/messages');

module.exports = function addAllEndpointsTo(app) {
    // AUTHENTICATION
    addAuthEndpointsTo(app);
    // ORGANIZATION
    addOrganizationEndpointsTo(app);
    // CHANNEL
    addChannelEndpointsTo(app);
    // MESSAGES
    addMessageEndpointsTo(app);
}
