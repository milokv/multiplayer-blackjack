import type { JSX } from "react";
import UsernameForm from "../components/UsernameForm";

const Home = (): JSX.Element => {
  return (
    <>
      <div style={{ padding: '2rem' }}>
        <h1>🏠 Home Page</h1>
        <h3>Welcome to Multiplayer Blackjack</h3>
      </div>
      <UsernameForm></UsernameForm>
    </>
  );
};

export default Home;