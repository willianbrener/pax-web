'use strict';

app.service('SocketService', function () {
    this.init = function() {
        var chat_log, system_log, config;

        return io();
    }

    this.Listeners = function(socket, evt, callback) {
        socket.on(evt, function(obj){
            return callback(obj);
        });
    }

});