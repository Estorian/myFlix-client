import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './main-view.scss';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null
        };
    }

    componentDidMount() {
        axios.get('https://estorians-movie-api.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    returnHome() {
        this.setState({
            selectedMovie: null
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onClick={() => this.returnHome()}/>
                : movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                ))}
            </div>
        );
    }
}