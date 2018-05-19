const socketio = require('socket.io');

module.exports = function connectSocketsTo(server) {
    
    const io = socketio(server);

    io.on('connection', socket => {

        socket.on('')

    });

}