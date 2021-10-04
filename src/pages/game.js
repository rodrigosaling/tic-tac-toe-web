import { useParams, Link } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { useCallback, useState } from 'react';
import { nanoid } from 'nanoid';

const Game = () => {
  let { id } = useParams();

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'ws://127.0.0.1:8080',
    {
      shouldReconnect: (closeEvent) => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    }
  );

  const handleClickSendMessage = (message) =>
    sendMessage(JSON.stringify({ ...message, id: nanoid(5) }));

  return (
    <>
      <h1>This is game with id {id}</h1>

      <p>
        <button
          type="button"
          onClick={() =>
            handleClickSendMessage({ type: 'this is just a test' })
          }
        >
          Send test message
        </button>
        <button
          type="button"
          onClick={() => handleClickSendMessage({ type: 'create game' })}
        >
          create game
        </button>
        Status: {readyState}
      </p>

      <p>
        <Link to="/">Go home</Link>
      </p>
    </>
  );
};

export default Game;
