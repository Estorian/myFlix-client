import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavMenu } from '../nav-menu/nav-menu';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            user: null,
            newUser: null
        };
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

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.username,
            newUser: null,
            userData: authData.user
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
    }

    onLogout() {
        console.log(localStorage.getItem('user') + " logged out.")
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        })
    }

    getMovies(token) {
        console.log("Loading movies from API...");
        axios.get('https://estorians-movie-api.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
                console.log("Movies loaded successfully");
                console.log(response.data);
            })
            .catch(err => { console.log(err) });
    }

    returnHome() {
        this.setState({
            selectedMovie: null,
            newUser: null
        });
    }

    render() {
        const { movies, user, newUser, userData } = this.state;
        let cards = movies.map(movie => <MovieCard key={movie._id} movie={movie} />);


        if (newUser) return <RegistrationView returnHome={() => this.returnHome()} />;

        if (!user) return <LoginView register={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <div className="main-view">
                    <Route exact path="/">
                        <div>
                            <NavMenu onLogout={() => this.onLogout()} user={this.user}/>
                            <div className="text-center display-1" style={{ padding: 12, color: '#DBF0FF' }}>Estorian's Flix</div>
                            <Container fluid>
                                <Row>
                                    {cards}
                                </Row>
                            </Container>
                        </div>
                    </Route>

                    <Route exact path="/movies/:movieId" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                    }} />

                    <Route exact path="/directors/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                    }} />

                    <Route exact path="/genres/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                    }} />

                    <Route exact path="/users/:username" render={() => {
                        if (!movies) return <div className="main-view" />;
                        <ProfileView user={userData} />
                    }} />


                {/*
                                
                 <Route exact path="/register" render={() => <RegistrationView returnHome={() => this.returnHome()} />} />

                //<Route exact path="/login" render={() => <LoginView onLoggedIn={user => this.onLoggedIn(user)} register={() => this.register()} />} />
                */}

                </div>
            </Router>
        );
    }
}