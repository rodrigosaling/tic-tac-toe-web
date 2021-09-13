import { useParams, Link } from 'react-router-dom';

const Game = () => {
  let { id } = useParams();
  return (
    <>
      <h1>This is game with id {id}</h1>

      <Link to="/">Go home</Link>
    </>
  );
};

export default Game;
