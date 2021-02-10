import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies, setUser, setFavorites } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import NavMenu from '../nav-menu/nav-menu';
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
            let user = localStorage.getItem('user');
            this.setState({
                user: localStorage.getItem('user')
            })
            
            this.getMovies(accessToken);
            // Getting user info for already logged in users.
            let userURL = 'https://estorians-movie-api.herokuapp.com/users/' + user;
            axios.get(userURL, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
                .then(response => {
                    this.props.setUser(response.data);
                    console.log('User loaded to redux state.');
                    this.getFavorites();
                })
                .catch(err => { console.log(err) });
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
        setUser(authData.user);
        console.log(this.props.user, 'logged in');
        this.setState({
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
        setUser([]);
    }

    getFavorites() {
        this.props.setFavorites(this.props.user.favoriteMovies);
        console.log('faves: ', this.props.favorites);
        /*let favesList = [];
        let favesIDs = this.props.user.favoriteMovies;
        console.log('favesIDs: ', favesIDs);
        let movies = this.props.movies;
        for (let i = 0; i < favesIDs.length; i++) {     //for each fave ID
            for (let j = 0; j < movies.length; j++) {   // look at each movie
                if (movies[j]._id == favesIDs[i]) {     // if the ids match
                    favesList.push(movies[j]._id);          //add the movie to favesList
                }
            }
        }
        console.log('favesList: ', favesList);
        this.props.setFavorites(favesList);*/
    }

    getMovies(token) {
        console.log("Loading movies from API...");
        axios.get('https://estorians-movie-api.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(response.data);
                this.props.setMovies(response.data);
                this.getFavorites();
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
        let { movies, user } = this.props;
        const { newUser } = this.state;

        if (newUser) return <RegistrationView returnHome={() => this.returnHome()} />;

        if (!localStorage.getItem('user')) return <LoginView register={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />;

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
        movies: state.movies,
        user: state.user,
        favorites: state.favorites
    }
}

export default connect(mapStateToProps, { setMovies, setFavorites, setUser })(MainView);