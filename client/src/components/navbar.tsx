import type { JSX } from "react";
import { Link } from "react-router-dom";
import style from '/src/style/navbar.module.css';

type NavbarProps = {
    fixed?: boolean;
};

const Navbar = ({ fixed = true }: NavbarProps): JSX.Element => {
    const navbarClass = fixed ? `${style.navbar} ${style.fixed}` : style.navbar;

    return (
        <nav className={navbarClass}>
            <Link className={style.link} to="/">HOME</Link>
            <Link className={style.link} to="/game">BLACKJACK</Link>
            <Link className={style.link} to="/stats">STATS</Link>
        </nav>
    );
};

export default Navbar;