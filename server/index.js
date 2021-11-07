import { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid';

const wss = new WebSocketServer({ port: 8080 });

const games = [];
const players = [];

const createGame = () => {
  const id = nanoid(5);
  const newGame = {
    id,
    status: 'created',
    players: [],
  };
  games.push(newGame);
  return newGame;
};

const createPlayer = () => {
  const id = nanoid(5);
  const newPlayer = {
    id,
    name: '',
  };
  players.push(newPlayer);
  return newPlayer;
};

const joinGame = (gameId, playerId) => {
  return games[gameId].players.push({
    id: playerId,
    symbol: '',
    status: 'joined',
  });
};

wss.on('connection', (ws) => {
  console.log('handshake complete');

  ws.on('message', (buffer) => {
    const stringifiedJSON = buffer.toString();
    console.log('received:', stringifiedJSON);
    // ws.send(`something ${Date.now()}`);

    const { id, type } = JSON.parse(stringifiedJSON);

    switch (type) {
      case 'create game':
        ws.send(JSON.stringify({ id, type, game: createGame() }));
        break;
      case 'join game':
        break;
      case 'create player':
        break;
      case 'set play':
        break;
      default:
        ws.send('nothing');
        break;
    }
  });

  ws.on('open', () => {
    ws.send('connection open');
  });

  // setInterval(() => ws.send(`something ${Date.now()}`), 5000)
});

wss.on('error', (error) => {
  console.log('error', error);
});
