import React, { useState } from 'react';
import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //Request to server for authentication
        //then call props.onLoggedIn(username)
        props.onLoggedIn(username);
    }

    const register = () => {
        props.register();
    }

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="button" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={ register }>Register</button>
        </form>
    )
}
