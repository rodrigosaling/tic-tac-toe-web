import React, { useEffect, useReducer } from 'react';
import useWebSocket from 'react-use-websocket';

const initialState = {
  websocket: null,
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

export const GameContext = React.createContext({});

const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    'ws://127.0.0.1:8080',
    {
      shouldReconnect: (closeEvent) => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    }
  );

  useEffect(() => {
    dispatch({ type: 'increment', payload: lastJsonMessage });
  }, [lastJsonMessage]);

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
};

export default GameContextProvider;
