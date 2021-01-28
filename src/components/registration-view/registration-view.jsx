import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './registration-view.scss';

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
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
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
                <Button type="button" className="dark" onClick={handleSubmit}>Register</Button>
                <Button type="button" variant="link" onClick={returnHome}>Login</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}