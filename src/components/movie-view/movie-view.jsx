import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }



    render() {
        let { movie, onClick } = this.props;

        if (!movie) return null;

        return (
            <Modal show className="movie-view" dialogClassName="modal-90w" >
                <Modal.Header>
                    <Modal.Title>{movie.Title}</Modal.Title>
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
                        <span className="value">{movie.Genre.Name} </span>
                    </div>
                    <div className="movie-director">
                        <span className="m-label">Director: </span>
                        <span className="value">{movie.Director.Name} </span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                   <Button className="dark" onClick={() => onClick()}>Back to Movies</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}