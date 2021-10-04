import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './app.css';
import Home from './pages/home';
import Game from './pages/game';
import { useApi } from './hooks/use-api';
import GameContextProvider from './game-context';

function App() {
  // const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8080');
  // const messageHistory = useRef([]);
  //
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
  //   shouldReconnect: (closeEvent) => true,
  //   reconnectAttempts: 10,
  //   reconnectInterval: 3000,
  // });
  //
  // messageHistory.current = useMemo(
  //   () => messageHistory.current.concat(lastMessage),
  //   [lastMessage]
  // );
  //
  // const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);
  //
  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: 'Connecting',
  //   [ReadyState.OPEN]: 'Open',
  //   [ReadyState.CLOSING]: 'Closing',
  //   [ReadyState.CLOSED]: 'Closed',
  //   [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  // }[readyState];

  // const { lastJsonMessage } = useApi();
  //
  // useEffect(() => {
  //   console.log('APP', lastJsonMessage);
  // }, [lastJsonMessage]);

  return (
    <GameContextProvider>
      <Router>
        <Switch>
          <Route path="/game/:id">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </GameContextProvider>
  );

  // return (
  //   /*<div className="App">
  //     <button
  //       onClick={handleClickSendMessage}
  //       disabled={readyState !== ReadyState.OPEN}
  //     >
  //       Click Me to send 'Hello'
  //     </button>
  //
  //     <span>The WebSocket is currently {connectionStatus}</span>
  //     {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
  //
  //     <ul>
  //       {messageHistory.current.map((message, idx) => (
  //         <span key={idx}>{message ? message.data : null}</span>
  //       ))}
  //     </ul>
  //   </div>*/
  // );
}

export default App;
