import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

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
import Spinner from 'react-bootstrap/Spinner';

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
        this.setState({
            user: authData.user.username,
            newUser: null,
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        console.log(authData);
        this.getMovies(authData.token);
    }

    onLogout() {
        console.log(localStorage.getItem('user') + " logged out.")
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userInfo');
        this.setState({
            user: null
        })
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

    getMovies(token) {
        console.log("Loading movies from API...");
        axios.get('https://estorians-movie-api.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(response.data);
                this.props.setMovies(response.data);
                console.log('props', this.props);
                console.log('state', this.state);
                /*
                this.setState({
                    movies: response.data
                });
                console.log("Movies loaded successfully");
                console.log(response.data);*/
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
        let { movies } = this.props;
        console.log("rendering movies:", movies);
        const { user, newUser } = this.state;

        if (newUser) return <RegistrationView returnHome={() => this.returnHome()} />;

        if (!user) return <LoginView register={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!movies[0]) return <Spinner animation="grow" variant="light" className="main-view mx-auto my-auto" />;

        return (
            <Router>
                <div className="main-view">
                    <Route exact path="/" render={() =>
                        <div>
                            <NavMenu onLogout={() => this.onLogout()} user={localStorage.getItem('user')} />
                            <div className="text-center display-1" style={{ padding: 12, color: '#DBF0FF' }}>Estorian's Flix</div>
                            <MoviesList movies={movies} />
                            {/*
                            <Container fluid>
                                <Row>
                                    {movies.map(movie => <MovieCard key={movie._id} movie={movie} buttonFunction={() => this.makeFavorite(movie) } buttonName="Favorite" />)}
                                </Row>
                            </Container>
                            */}
                        </div>
                    } />

                    <Route exact path="/movies/:movieId" render={({ match }) => 
                        <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                    } />

                    <Route exact path="/directors/:name" render={({ match }) => 
                        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                    } />

                    <Route exact path="/genres/:name" render={({ match }) => 
                        <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                    } />

                    <Route exact path="/users/:username" render={() =>
                        <ProfileView user={localStorage.getItem('user')} movies={movies}/>
                    } />


                {/*
                                
                 <Route exact path="/register" render={() => <RegistrationView returnHome={() => this.returnHome()} />} />

                //<Route exact path="/login" render={() => <LoginView onLoggedIn={user => this.onLoggedIn(user)} register={() => this.register()} />} />
                */}

                </div>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps, { setMovies } )(MainView);