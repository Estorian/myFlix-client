import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './login-view.scss';
import { Link } from 'react-router-dom';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://estorians-movie-api.herokuapp.com/login', {
            Username: username,
            Password: password
            })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                alert("Username or Password was incorrect.");
                console.log(e);
            });
    }

    const register = () => {
        window.open('/register', '_self');
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
                <Button type="button" variant="link" onClick={props.register}>Register</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}
