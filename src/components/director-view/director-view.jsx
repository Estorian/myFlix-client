import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import { MovieCard } from '../movie-card/movie-card';

import './director-view.scss';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
    constructor() {
        super()

        this.state = {
            movies: [],
            directorMovies: []
        };
    }

    getMovies(token) {
        console.log("Loading movies from API...");
        let URL = 'https://estorians-movie-api.herokuapp.com/movies';
        axios.get(URL, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
                console.log("Movies loaded successfully");
                let movies = this.state.movies;
                let { director } = this.props;
                console.log(director);

                let directorMovies = movies.filter(m => m.Director.Name === director.Name);
                this.setState({
                    directorMovies: directorMovies
                })
                console.log('directorMovies:')
                console.log(this.state.directorMovies);
            })
            .catch(err => { console.log(err) });
    }

    makeFavorite(movie) {
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        console.log(movie);
        console.log(movie._id);
        let requestURL = 'https://estorians-movie-api.herokuapp.com/users/' + user + '/movies/' + movie._id;
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
        let { director } = this.props;
        let { directorMovies } = this.state;

        let cards = directorMovies.map(movie => <MovieCard key={movie._id} movie={movie} buttonFunction={() => this.makeFavorite(movie)} buttonName="Favorite"/>);
        if (!directorMovies) return <Spinner animation="grow" variant="primary" />;

        return (
            <div className="director-view">
            <Modal.Dialog>
                <Modal.Header>
                    <h1>{director.Name}</h1>
                </Modal.Header>
                <Modal.Body>
                    <div className="director-birthday">
                        <span className="label">Birth:</span>
                        <span className="value">{director.Birth}</span>
                    </div>
                    <div className="director-bio">
                        {director.Bio}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={`/`}>
                        <Button variant="primary">Home</Button>
                    </Link>
                </Modal.Footer>
                </Modal.Dialog>
                <Container fluid>
                    <Row>
                        {cards}
                    </Row>
                </Container>
            </div>
            )
    }
}