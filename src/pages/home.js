import { useState } from 'react';

const Home = () => {
  const [nickname, setNickname] = useState('');

  const handleNicknameChange = (event) => {
    const { value } = event.target;
    setNickname(value);
    window.localStorage.setItem('ttt_nickname', value);
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>

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
        <button type="button">Create game</button>
      </div>

      <div>
        <label htmlFor="game-id">Join Game with ID</label>
        <input type="text" id="game-id" />
        <button type="button">Go</button>
      </div>
    </>
  );
};

export default Home;
