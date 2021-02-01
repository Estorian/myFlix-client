import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './registration-view.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        if (username.length < 5) { alert("Usernames must be longer than 5 characters.") }
        else if (!email.includes("@") || !email.includes(".")) { alert("Please use a valid email address.") }
        else if (password.length < 1) { alert("Password is required.") }
        else {
            console.log(username, password, email);
            axios.post('https://estorians-movie-api.herokuapp.com/users', {
                username: username,
                password: password,
                email: email
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self');
                })
                .catch(e => {
                    console.log("Error registering user: " + e)
                });
        }
    }

    const returnHome = () => {
        props.returnHome();
    }

    return (
        <Modal.Dialog>
            <Modal.Header className="registration-view">
                <Modal.Title>Welcome to Jason's MyFlix App</Modal.Title>
            </Modal.Header>
            <Modal.Body className="registration-view">
                <p>Please provide the following information to register a new account:</p>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Choose a username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Usernames must be at least 5 characters and contain only alphanumeric characters (A-Z, 0-9).
                    </Form.Text>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="registration-view">
                <Button type="button" className="dark" onClick={handleRegister}>Register</Button>
                    <Button type="button" variant="link" onClick={returnHome}>Login</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}