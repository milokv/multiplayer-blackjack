import type { JSX } from "react";
import { useWebSocket } from "../context/WebSocket";
import style from "../style/general.module.css";
import { useNavigate } from "react-router-dom";


const UsernameForm = (): JSX.Element => {
    const { socket } = useWebSocket();
    const navigate = useNavigate();

    const sendJoin = () => {
        const username = (document.getElementById("usernameInput") as HTMLInputElement).value.trim();

        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(
        JSON.stringify({ type: "join", username })
            );
        }
        else {
            console.error("WebSocket is not open. Cannot send join message.");
        }

        localStorage.setItem("username", username);

        fetch('http://localhost:3001/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        })
        .then(res => res.json())
        .then(data => console.log("User saved:", data));

        navigate("/game");
    };

    return (
        <div>
            <h2>Enter your username</h2>
            <div className={style.usernameDiv}>
                <input id="usernameInput" type="text" placeholder="Username" className={style.inputForm} />
                <button onClick={sendJoin} className={style.smallButton}>Join Game</button>
            </div>
        </div>
    );
};

export default UsernameForm;