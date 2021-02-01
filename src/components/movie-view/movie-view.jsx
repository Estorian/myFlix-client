import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Link } from "react-router-dom";
import axios from 'axios';

export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    makeFavorite() {
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        let movie = this.props;
        console.log(movie);
        console.log(movie.movie._id);
        let requestURL = 'https://estorians-movie-api.herokuapp.com/users/' + user + '/movies/' + movie.movie._id;
        console.log(requestURL);
        axios.put(requestURL, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log("Movie added to favorites successfully:");
                console.log(response.data);
            })
            .catch(err => { console.log(err) });
    }


    render() {
        let { movie } = this.props;

        if (!movie) return null;

        return (
            <Modal.Dialog className="movie-view">
                <Modal.Header>
                    <h1>{movie.Title}</h1>
                </Modal.Header>

                <Modal.Body>
                    <img className="movie-poster" src={movie.ImageURL} />
                    <div className="movie-title">
                        <span className="m-label">Title: </span>
                        <span className="value">{movie.Title} </span>
                    </div>
                    <div className="movie-description">
                        <span className="m-label">Description: </span>
                        <span className="value">{movie.Description} </span>
                    </div>
                    <div className="movie-genre">
                        <span className="m-label">Genre: </span>
                        <span className="value">
                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <Button variant="link">{movie.Genre.Name}</Button>
                            </Link>
                        </span>
                    </div>
                    <div className="movie-director">
                        <span className="m-label">Director: </span>
                        <span className="value">
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <Button variant="link">{movie.Director.Name}</Button>
                            </Link>
                        </span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="dark" onClick={() => this.makeFavorite() }>Add to my Favorites</Button>
                    <Link to={'/'}>
                        <Button className="dark">Back to Movies</Button>
                    </Link>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}