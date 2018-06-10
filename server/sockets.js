const socketio = require('socket.io');
const shareSession = require('express-socket.io-session');
const { convertUser } = require('./controllers/utils/utils');

module.exports = function connectSocketsTo(server, session, app) {

    const io = socketio(server);

    // SESSION
    io.use(shareSession(session));

    // DB
    io.use((socket, next) => {
        socket.db = app.get('db');
        next();
    });

    // USER
    io.use((socket, next) => {
        let user_id = socket.handshake.session.user;
        if (user_id) {
            if (user_id) {
                console.log("SOCKET GETTING USER: " + user_id);
                socket.db.read_user({ user_id, username: null, hash: null })
                    .then(convertUser)
                    .then(user => {
                        socket.user = user;
                        next();
                    })
                    .catch(err => {
                        socket.emit(err);
                    });
            } else next();
        }
        next();
    });

    io.on('connection', socket => {

        socket.on('', () => {

        });

    });

}
