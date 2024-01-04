const express = require('express');
const router = express.Router();

router.post('/order', (req, res, next) => {
    res.send('order sent');
})

module.exports = router;

// const io = require('socket.io')(server);

// io.on('connection', client => {
//     console.log('connected: ' + client.id);
//     client.on('channel1', data => {
//         // log ở phía server
//         // console.log('1');
//         io.emit('channel1', data);
//     });
//     client.on('disconnect', () => {

//     });
// });

// let totalClient = new Set();

// io.on('connection', onConnected);

// function onConnected(socket) {
//     totalClient.add(socket.id);
//     console.log('total: ', totalClient.size);

//     socket.on('disconnect', () => {
//         totalClient.delete(socket.id);
//         console.log('total: ', totalClient.size);
//     })

//     socket.on('fromClient', data => {
//         console.log(data);
//         // trả về cho socket đã gửi
//         socket.emit('fromServer', data);
        
//         // trả cho tất cả socket kết nối trừ socket đã gửi
//         // socket.broadcast.emit('fromServer', data);

//         // trả cho tất cả socket
//         // io.emit('fromServer', data);
//     });
// }