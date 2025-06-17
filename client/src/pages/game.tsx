import type { JSX } from "react";

const Game = (): JSX.Element => {
  return (
    <div style={{ padding: '2rem', top: '-20vh', position: 'relative' }}>
      <h1>🃏 Blackjack</h1>
      <h3>Start or join a blackjack match here.</h3>
    </div>
  );
};

export default Game;