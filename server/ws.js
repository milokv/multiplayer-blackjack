import { assignSeat, clearSeat, seats } from './game/table.js';

let wss = null;

function send(socket, data) {
  socket.send(JSON.stringify(data));
}

function broadcastGameState() {
  const players = seats.map((seat, index) => seat
    ? { seat: index, username: seat.username, balance: seat.balance, hand: seat.hand }
    : null
  );
  
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      send(client, { type: 'update-state', players });
    }
  });
}


function setupWebSocket(webSocketServer) {
  wss = webSocketServer; // store the server instance globally

  wss.on('connection', (socket) => {
    console.log('✅ A client connected');

    // handle incoming messages from each client
    socket.on('message', (messageBuffer) => {
      const message = messageBuffer.toString();
      let data;

      try {
        data = JSON.parse(message); // convert string back to object
      } catch (e) {
        console.error('Invalid JSON:', message);
        return;
      }

      if (data.type === 'join') {
        const seatIndex = assignSeat(data.username);
        if (seatIndex !== null) {
          socket.username = data.username;
          socket.seat = seatIndex;
          console.log(`✅ ${data.username} joined seat ${seatIndex}`);
          send(socket, { type: 'joined', seat: seatIndex });
          broadcastGameState();
        } else {
          send(socket, { type: 'error', message: 'No seats available' });
        }
      }

      // more types (hit, stay) will go here later
    });

    // clear seat if socket closes
    socket.on('close', () => {
      if (socket.seat !== undefined) {
        clearSeat(socket.seat);
        console.log(`Disconnected ${socket.username}`);
        broadcastGameState();
      }
    });
    });
}

export { setupWebSocket };
