import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

export function NavMenu(props) {
    const { onLogout, visibilityFilter, user } = props;
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
                    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default connect(mapStateToProps)(NavMenu);