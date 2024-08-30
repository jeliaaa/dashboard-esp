import { Server } from 'socket.io';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('New client connected');

      // Listen for damage status
      socket.on('damage_status', (data) => {
        console.log('Damage status received:', data);
        io.emit('update', data);  // Notify all connected clients about the damage status
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    console.log('Socket.io server set up successfully');
  }
  res.end();
}
