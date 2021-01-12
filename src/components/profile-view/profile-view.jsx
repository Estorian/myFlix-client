import React from 'react';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';
import MovieCard from '../movie-card/movie-card';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    unregister() {
        let unRegisterURL = 'https://estorians-movie-api.herokuapp.com/' + this.props.username;
        axios.delete(unRegisterURL)
            .then(response => {
                alert(this.props.username + " has been unregistered.");
            })
            .catch(e => {
                console.log(e);
                alert("There was an error unregistering. Please try again later.");
            });
    }

    render() {
        let { userData, movies } = this.props;

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


        let favorites = [];
        for (let i = 0; i < (userData.favoriteMovies.length - 1); i++) {
            movie = movies.find(m => m._id === userData.favoriteMovies[i]);
            favorites.append(movie);
            console.log({ movie } + " was added to favorites");
        }
        if (!favorites) console.log("No favorites for this user were loaded.");
        let cards = favorites.map(movie => <MovieCard key={movie._id} movie={movie} />)

        if (!userData) return null;

        return (
            <div className="profile-view">
                <title>My Profile</title>
                <div className="username">
                    <span className="label">Username: </span>
                    <span className="value">{userData.username}</span>
                </div>
                <div className="user-email">
                    <span className="label">Email: </span>
                    <span className="value">{userData.email} </span>
                </div>
                <div className="movie-genre">
                    <span className="label">Favorite Movies:</span>
                    {cards}
                </div>
                <div className="unregister">
                    <Button variant="warning" onClick={handleShow}>Unregister</Button>
                </div>
                <Button className="dark" onClick={() => onClick()}>Back to Movies</Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Unregistering will delete all user data. This cannot be undone. Are you sure you want to unregister?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={this.unregister}>Unregister</Button>
                        <Button variant="primary" onClick={handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}