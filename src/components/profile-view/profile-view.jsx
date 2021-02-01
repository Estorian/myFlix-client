import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './profile-view.scss';
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
            user: localStorage.getItem('user'),
            userData: null,
            favorites: [],
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
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        if (user !== null) {
            this.getUserData(token, user);
        }
    }

    checkLogin() {
        let username = this.state.username;
        let password = this.state.password;
        let doubleCheck = this.state.doubleCheck;
        if (!doubleCheck) {
            axios.post('https://estorians-movie-api.herokuapp.com/login', {
                Username: username,
                Password: password
            })
                .then(() => {
                    this.setState({
                        doubleCheck: true,
                        username: username,
                        password: password,
                        showLogin: false
                    })
                })
                .catch(e => {
                    console.log(e);
                    alert(`Login failed. Please try again. You have ${3 - this.state.lockout} more chances before you will be logged out.`);
                    this.setState({
                        lockoutCheck: this.state.lockoutCheck + 1
                    });
                    if (this.state.lockoutCheck > 4) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.open('/', '_self');
                    }

                })
        }
    }

    getUserData(token, user) {
        console.log("Getting user information");
        let userURL = 'https://estorians-movie-api.herokuapp.com/users/' + user;
        axios.get(userURL, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    userData: response.data
                })
                console.log(`User ${user}'s information was successfully loaded.`);
                this.getFavorites();
            })
            .catch(err => { console.log(err) });
    }

    getFavorites() {
        let { movies, user } = this.props;
        console.log('started getFavorites(). Movies: ');
        console.log(movies);
        let { userData }= this.state;
        console.log(userData);
        let favIDs = userData.favoriteMovies;
        console.log(favIDs);
        if (favIDs.length > 0) {
            for (let i = 0; i < (favIDs.length); i++) {
                let newFav = movies.find(m => m._id === favIDs[i]);
                this.setState({
                    favorites: this.state.favorites.concat(newFav)
                });
            }
            console.log(this.state.favorites);
        }
        else console.log('no favorite movies');
    }

    removeFavorite(movie) {
        let movieID = movie._id;
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        let removeURL = 'https://estorians-movie-api.herokuapp.com/users/' + user + '/movies/' + movieID + '/remove';
        axios.delete(removeURL, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => { alert(`${movie.Title} was removed from your favorites`) })
            .catch(err => { console.log(err) });
    }

    updateUserInfo() {

    }

    unregister() {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        let unRegisterURL = 'https://estorians-movie-api.herokuapp.com/users/' + user;
        axios.delete(unRegisterURL, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
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

    onLogout() {
        console.log(localStorage.getItem('user') + " logged out.")
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        })
        window.open('/', '_self');
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

        axios.put(updateURL, {
            headers: { Authorization: `Bearer ${token}` },
            username: username,
            password: password,
            email: email
        })
            .then(() => {
                alert("Your information has been updated. Please login again.");
                this.onLogout();
            })
            .catch(e => { console.log(e) });
    }

    render() {
        let { userData, favorites, user, showWarning, showEdit, showLogin, doubleCheck } = this.state;


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


        if (favorites == []) console.log("No favorites for this user were loaded.");
        let cards = favorites.map(movie => <MovieCard key={movie._id} movie={movie} buttonFunction={() => this.removeFavorite(movie) } buttonName="Remove" />)

        if (!userData) return <div className="profile-view"> <Spinner animation="border" variant="light" /> </div>;

        return (
            <div>
                <NavMenu onLogout={() => this.onLogout()} user={localStorage.getItem('user')} />
                <h1 className="text-center display-1" style={{ padding: 12, color: '#DBF0FF' }}>My Profile</h1>
                <ListGroup style={{ margin: '20px'}}>
                    <ListGroup.Item>
                    <div className="username">
                        <span className="label">Username: </span>
                        <span className="value">{user}</span>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <div className="user-email">
                        <span className="label">Email: </span>
                        <span className="value">{userData.email} </span>

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

                <div className="unregister">
                    <Button variant="link" onClick={handleShowWarning}>Unregister</Button>
                </div>
                <Link to={'/'} >
                    <Button inline="true" className="dark">Back to Movies</Button>
                </Link>

                <Modal show={showWarning} onHide={handleCloseWarning}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Unregistering will delete all user data. This cannot be undone. Are you sure you want to unregister?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={() => this.unregister()}>Unregister</Button>
                        <Button variant="primary" onClick={handleCloseWarning}>Cancel</Button>
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
                                    placeholder={userData.email}
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