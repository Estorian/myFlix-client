import React, { useState } from 'react';

export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email);
        //Request to server for registration of new user
        props.onLoggedIn(username);
    }

    return (
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                Email address:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <button type="button" onClick={ handleSubmit }>Register</button>
            <button type="button" onClick={ props.returnHome() }>Cancel</button>
        </form>

    )
}