import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export function NavMenu(props) {
    const onLogout = props.onLogout;
    const user = props.user;
    console.log(user);
    const profileURL = '/users/' + user;

    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="main-navbar">
                <Nav className="mr-auto">
                    <Nav.Item>
                        <Link to="/">
                            <Button variant="link">Home</Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to={profileURL}>
                            <Button variant="link">My Profile</Button>
                        </Link>
                    </Nav.Item>
                    <Button variant="link" onClick={ onLogout }>Logout</Button>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Movie Title" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}