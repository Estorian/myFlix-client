import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './login-view.scss';

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
        <Modal.Dialog className="login-view">
            <Modal.Header className="login-view">
                <Modal.Title>Welcome to Jason's MyFlix App</Modal.Title>
            </Modal.Header>
            <Modal.Body className="login-view">
                <p>Please login or register a new account</p>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="login-view">
                <Button type="button" className="dark" onClick={handleSubmit}>Submit</Button>
                <Button type="button" variant="link" onClick={register}>Register</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}
