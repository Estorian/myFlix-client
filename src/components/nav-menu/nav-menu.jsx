import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export function NavMenu() {

    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="main-navbar">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="Movies">Movies</Nav.Link>
                    <Nav.Link href="Directors">Directors</Nav.Link>
                    <NavDropdown title="Genre">
                        <NavDropdown.Item href="#Action">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#Adventure">Adventure</NavDropdown.Item>
                        <NavDropdown.Item href="#Drama">Drama</NavDropdown.Item>
                        <NavDropdown.Item href="#Thriller">Thriller</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Movie Title" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}