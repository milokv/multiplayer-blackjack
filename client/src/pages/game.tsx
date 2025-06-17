import type { JSX } from "react";

const Game = (): JSX.Element => {
  return (
    <div style={{ padding: '2rem', top: '-17rem', position: 'relative' }}>
      <h1>🃏 Game Page</h1>
      <h3>Start or join a blackjack match here.</h3>
    </div>
  );
};

export default Game;