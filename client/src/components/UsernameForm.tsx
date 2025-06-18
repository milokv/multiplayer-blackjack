import type { JSX } from "react";
import { useWebSocket } from "../context/WebSocket";
import style from "../style/general.module.css";

const UsernameForm = (): JSX.Element => {
    const { socket } = useWebSocket();

    const sendJoin = () => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(
        JSON.stringify({ type: "join", username: (document.getElementById("usernameInput") as HTMLInputElement).value })
            );
        }
        else {
            console.error("WebSocket is not open. Cannot send join message.");
        }
        localStorage.setItem("username", (document.getElementById("usernameInput") as HTMLInputElement).value);
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