

var io = require('socket.io-client');

// var socket = io.connect('http://localhost:3000/', {reconnect: true});
var socket = io.connect('http://3.37.119.81:3000/upper', {reconnect: true});

socket.on('connect', function (socket) {
    console.log('Connected!!');
});

socket.emit('CH01', 'meme', 'test msg');
