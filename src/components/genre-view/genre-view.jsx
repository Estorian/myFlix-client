import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import './genre-view.scss';

export class GenreView extends React.Component {
    constructor() {
        super()

        this.state = {
            movies: []
        };
    }

    getMovies(token) {
        console.log("Loading movies from API...");
        let URL = 'https://estorians-movie-api.herokuapp.com/genres/' + this.props.genre.Name;
        axios.get(URL, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
                console.log("Genre Movies loaded successfully");
                console.log(response.data);
            })
            .catch(err => { console.log(err) });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }

    }

    render() {
        let Genre = this.props;
        let { movies }= this.state;
        let cards = movies.map(movie => <MovieCard key={movie._id} movie={movie} />);
        if (!movies) return <Spinner animation="grow" variant="primary" />;

        return (
            <div className="genre-view">
                <Modal.Dialog className="genre-definition">
                    <Modal.Header>
                        <h1>The {Genre.genre.Name} Genre</h1>
                    </Modal.Header>
                    <Modal.Body>
                        {Genre.genre.Description}
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={`/`}>
                            <Button variant="primary">Home</Button>
                        </Link>
                    </Modal.Footer>
                </Modal.Dialog>
                <Container fluid>
                    <Row>
                        { cards }
                    </Row>
                </Container>
            </div>
        )
    }
}