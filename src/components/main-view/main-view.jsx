import React from 'react';
import axios from 'axios';

import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            newUser: null
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

    register() {
        this.setState({
            newUser: true
        });
    } 

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user,
            newUser: null
        });
    }

    returnHome() {
        this.setState({
            selectedMovie: null,
            newUser: null
        });
    }

    render() {
        const { movies, selectedMovie, user, newUser } = this.state;

        if (newUser) return <RegistrationView returnHome={() => this.returnHome} onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!user) return <LoginView register={ newUser => this.register() } onLoggedIn={user => this.onLoggedIn(user)} />;

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