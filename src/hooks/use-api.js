import useWebSocket, { ReadyState } from 'react-use-websocket';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useRef } from 'react';

const connectionStatus = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

const getConnectionStatusVerbose = (readyState) => {
  return connectionStatus[readyState];
};

export const useApi = () => {
  const messageHistory = useRef([]);
  // const messageHistory = [];

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    'ws://127.0.0.1:8080',
    {
      shouldReconnect: (closeEvent) => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    }
  );

  // Adds new message in the array
  // messageHistory.current = useMemo(
  //   () => messageHistory.current.concat(lastJsonMessage),
  //   [lastJsonMessage]
  // );

  messageHistory.current = messageHistory.current.concat(lastJsonMessage);

  // console.log(11111, lastJsonMessage, messageHistory.current);
  // messageHistory.current = useMemo(
  //   () => messageHistory.current.concat(lastJsonMessage),
  //   [lastJsonMessage]
  // );

  // useEffect(() => {
  //   messageHistory.current.concat(lastJsonMessage);
  // }, [lastJsonMessage]);

  const post = ({ type, value }) => {
    const id = nanoid(5);
    sendJsonMessage({ type, value, id });
    return id;
  };

  const get = (messageId) => {
    // return messageHistory.current;
    // console.log(messageHistory.current);
    // if (messageHistory.current.length) {
    const messageIndex = messageHistory.current.findIndex(
      (message) => message?.id === messageId
    );
    return messageHistory.current.splice(messageIndex, 1);
    // }
    // return null;
  };

  return {
    post,
    lastJsonMessage,
    status: getConnectionStatusVerbose(readyState),
  };
};
