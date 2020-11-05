'use strict';

const express = require('express');
const INDEX = './index.html';
const PORT = process.env.PORT || 3000;
const socketIO = require('socket.io');

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => {
    console.log('====================================');
    console.log(`Listening on port http://localhost:${PORT}`);
    console.log('====================================');
  });

//server websocket
/* const { Server } = require('ws');
const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
 */

//server socket.io
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnect'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
