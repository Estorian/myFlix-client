import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './movie-view.scss';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }



    render() {
        let { movie, onClick } = this.props;

        if (!movie) return null;

        return (
            <Jumbotron fluid className="movie-view">
                <title>{movie.Title}</title>
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
                        <Link to={`/genre/${movie.Genre.Name}`}>
                            <Button variant="link" inline>{movie.Genre.Name}</Button>
                        </Link>
                    </span>
                </div>
                <div className="movie-director">
                    <span className="m-label">Director: </span>
                    <span className="value">
                        <Link to={`/directors/${movie.Director.Name}`}>
                            <Button variant="link" inline>{movie.Director.Name}</Button>
                        </Link>
                    </span>
                </div>
                <Button className="dark" onClick={() => onClick()}>Back to Movies</Button>
            </Jumbotron>
        )
    }
}