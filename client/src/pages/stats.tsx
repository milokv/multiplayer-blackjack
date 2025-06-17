import type { JSX } from "react";

const Stats = (): JSX.Element => {
  return (
    <div  style={{ padding: '2rem', top: '-20vh', position: 'relative' }}>
      <h1>📊 Stats Page</h1>
      <h3>View win/loss records and leaderboard.</h3>
    </div>
  );
};

export default Stats;