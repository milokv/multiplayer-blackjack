import type { JSX } from "react";
import { Link } from "react-router-dom";
import style from '/src/navbar.module.css';

const Navbar = (): JSX.Element => {
  return (
    <nav className={style.navbar}>
      <div className={style.navbarCenter}><Link to="/game/" className={style.link}>GAME</Link></div>
      <div className={style.navbarCenter}><Link to="/" className={style.link}>HOME</Link></div>
      <div className={style.navbarCenter}><Link to="/stats/" className={style.link}>STATS</Link></div>
    </nav>
  );
};

export default Navbar;