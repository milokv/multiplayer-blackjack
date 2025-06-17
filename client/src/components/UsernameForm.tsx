import type { JSX } from "react";


const UsernameForm = (): JSX.Element => {
    return (
        <div>
            <h2>Enter your username</h2>
            <input type="text" placeholder="Username" />
        </div>
    );
};

export default UsernameForm;