import React from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './profile-view.scss';

import { setMovies, deleteFavorite, setUser, setFavorites } from '../../actions/actions';
import { getUserInfo, getMovies, onLogout } from '../../utilities';

import { MovieCard } from '../movie-card/movie-card';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { NavMenu } from '../nav-menu/nav-menu';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            showWarning: false,
            showEdit: false,
            showLogin: false,
            username: '',
            email: '',
            password: '',
            doubleCheck: false,
            lockoutCheck: 0
        }
    }

    componentDidMount() {
        if (!this.props.user) {
            getUserInfo().then(response => {
                this.props.setUser(response.data);
            })
        }
        if (!this.props.movies) {
            getMovies()
                .then(response => { this.props.setMovies(response.data); })
                .then(() => { this.props.setFavorites(this.props.user.favoriteMovies) });
        }
    }

    checkLogin() {
        let username = this.state.username;
        let password = this.state.password;
        let doubleCheck = this.state.doubleCheck;
        if (!doubleCheck) {
            axios({
                method: 'post',
                url: `https://estorians-movie-api.herokuapp.com/login`,
                data: {
                    Username: username,
                    Password: password
                }
            }).then(() => {
                    this.setState({
                        doubleCheck: true,
                        username: username,
                        password: password,
                        showLogin: false
                    })
                })
                .catch(e => {
                    console.error(e);
                    alert(`Login failed. Please try again. You have ${3 - this.state.lockout} more chances before you will be logged out.`);
                    this.setState({
                        lockoutCheck: this.state.lockoutCheck + 1
                    });
                    if (this.state.lockoutCheck > 4) {
                        onLogout(this.props);
                    }

                })
        }
    }

    removeFavorite(movie) {
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        let movieID = movie._id;
        this.props.deleteFavorite(movieID);
        axios({
            method: 'delete',
            url: `https://estorians-movie-api.herokuapp.com/users/${user}/movies/${movieID}/remove`,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                this.props.history.push(`/users/${user}`);
            })
            .catch((e) => { console.error(e) });
    }

    unregister() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        let unRegisterURL = 'https://estorians-movie-api.herokuapp.com/users/' + user;
        axios.delete(unRegisterURL, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert(user + " has been unregistered.");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.open('/', '_self');
            })
            .catch(e => {
                console.log(e);
                alert("There was an error unregistering. Please try again later.");
            });
    }

    setShowWarning(show) {
        this.setState({
            showWarning: show
        });
    }

    setShowEdit(show) {
        this.setState({
            showEdit: show
        })
    }

    setShowLogin(show) {
        this.setState({
            showLogin: show
        })
    }

    handleEdit() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        let updateURL = 'https://estorians-movie-api.herokuapp.com/users/' + user;
        let { username, email, password } = this.state;
        console.log(`Username: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(updateURL);

        axios({
            method: 'put',
            url: `https://estorians-movie-api.herokuapp.com/users/${user}`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                username: username,
                password: password,
                email: email
            }
        }).then(() => {
            alert("Your information has been updated. Please login again.");
            this.onLogout();
        }).catch(e => { console.error(e); });
    }

    render() {
        let { showWarning, showEdit, showLogin, doubleCheck } = this.state;

        let { user, movies, favorites, visibilityFilter } = this.props;

        let filteredMovies = movies;

        const handleCloseWarning = () => this.setShowWarning(false);
        const handleShowWarning = () => {
            if (doubleCheck) { this.setShowWarning(true) }
            else { this.setShowLogin(true) }
        }
        const handleShowEdit = () => {
            if (doubleCheck) { this.setShowEdit(true) }
            else { this.setShowLogin(true) }
        };
        const handleCloseEdit = () => this.setShowEdit(false);

        const hideLogin = () => this.setShowLogin(false);

        if (!movies) return <Spinner
            animation="grow"
            variant="light"
            className="main-view"
            style={{ position: 'absolute', left: '50%', top: '50%' }}
        />;

        if (!user) return <div className="profile-view"> <Spinner animation="border" variant="light" /> </div>;

        if (visibilityFilter !== '') {
            filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
        }

        let cards = filteredMovies
            .filter(movie => (favorites.includes(movie._id)))
            .map(movie => <MovieCard key={movie._id} movie={movie} buttonFunction={() => this.removeFavorite(movie)} buttonName="Remove" />)


        return (
            <div>
                <NavMenu onLogout={() => this.onLogout()} user={localStorage.getItem('user')} />
                <h1 className="text-center display-1" style={{ padding: 12, color: '#DBF0FF' }}>My Profile</h1>
                <ListGroup style={{ margin: '50px'}}>
                    <ListGroup.Item>
                    <div className="username">
                        <span className="label">Username: </span>
                        <span className="value">{user.username}</span>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <div className="user-email">
                        <span className="label">Email: </span>
                        <span className="value">{user.email} </span>

                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={handleShowEdit}>
                        Click here to edit your information.
                    </ListGroup.Item>
                </ListGroup>

                <div className="movies">
                    <h3 className="text-center display-3" style={{ padding: 12, color: '#DBF0FF' }}>Favorite Movies:</h3>
                    <Container>
                        <Row>
                            {cards}
                        </Row>
                    </Container>
                </div>

                <div className="text-center">
                    <Link to={'/'}>
                        <Button inline="true" className="dark">Back to Movies</Button>
                    </Link>
                </div>
                <div className="unregister text-center">
                    <Button variant="link" onClick={handleShowWarning}>Unregister</Button>
                </div>

                <Modal show={showWarning} onHide={handleCloseWarning}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Unregistering will delete all user data. This cannot be undone. Are you sure you want to unregister?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseWarning}>Cancel</Button>
                        <Button className="mx-auto" variant="warning" onClick={() => this.unregister()}>Unregister</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEdit} onHide={handleShowEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit my Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.username}
                                    onChange={e => this.setState({ username: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder={user.email}
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={() => this.handleEdit()}>Save Changes</Button>
                            <Button variant="link" onClick={handleCloseEdit}>Cancel</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={showLogin} onHide={hideLogin}>
                    <Modal.Header>
                        <Modal.Title>Please verify your identity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.username}
                                    onChange={e => this.setState({ username: e.target.value })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value })} />
                            </Form.Group>
                            <Button variant="primary" onClick={() => this.checkLogin()}>Login</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}


let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user,
        favorites: state.favorites,
        visibilityFilter: state.visibilityFilter
    }
}

export default connect(mapStateToProps, { setMovies, deleteFavorite, setUser, setFavorites })(ProfileView);