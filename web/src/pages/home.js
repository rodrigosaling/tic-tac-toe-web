import { useEffect, useState } from 'react';
import { useApi } from '../hooks/use-api';
import { GameContext } from '../game-context';

const savedNickname = window.localStorage.getItem('ttt_nickname');

const Home = () => {
  const [nickname, setNickname] = useState(savedNickname || '');
  const { post, status, lastJsonMessage } = useApi();

  const handleNicknameChange = (event) => {
    const { value } = event.target;
    setNickname(value);
    window.localStorage.setItem('ttt_nickname', value);
  };

  const handleCreateGame = () => {
    const messageId = post({ type: 'create game' });
    console.log(messageId);
  };

  // useEffect(() => {
  //   console.log('GET', lastJsonMessage);
  // }, [lastJsonMessage]);

  return (
    <>
      <h1>Tic Tac Toe</h1>

      <p>Server status: {status}</p>

      <div>
        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          id="nickname"
          value={nickname}
          onChange={handleNicknameChange}
        />
      </div>

      <div>
        <button type="button" onClick={handleCreateGame}>
          Create game
        </button>
      </div>

      <div>
        <label htmlFor="game-id">Join Game with ID</label>
        <input type="text" id="game-id" />
        <button type="button">Go</button>
      </div>

      <div>
        <GameContext.Consumer>
          {(state) => <p>{`State count: ${state.count}`}</p>}
        </GameContext.Consumer>
      </div>
    </>
  );
};

export default Home;
