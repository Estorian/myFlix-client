import React from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { setMovies, setUser, setFavorites } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import NavMenu from '../nav-menu/nav-menu';
import Spinner from 'react-bootstrap/Spinner';
import { getUserInfo, getMovies } from '../../utilities';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            user: null,
            newUser: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            getUserInfo().then(response => {
                this.props.setUser(response.data);
                this.props.setFavorites(response.data.favoriteMovies);
            })
                .catch(e => { console.error(e) });
            getMovies().then(response => {
                this.props.setMovies(response.data);
            })
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
            newUser: null,
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.componentDidMount();
    }

    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setUser({});
    }

    returnHome() {
        this.setState({
            selectedMovie: null,
            newUser: null
        });
    }

    render() {
        let { movies } = this.props;
        const { newUser } = this.state;

        if (newUser) return <RegistrationView returnHome={() => this.returnHome() } history={this.props.history}/>;

        if (!localStorage.getItem('user')) return <LoginView register={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!movies[0]) return <Spinner
            animation="grow"
            variant="light"
            className="main-view"
            style={{ position: 'absolute', left: '50%',  top: '50%' }}
        />;

        return (
            <Router>
                <div className="main-view">
                    <Route exact path="/" render={( history ) =>
                        <div history={history}>
                            <NavMenu onLogout={() => this.onLogout()} user={localStorage.getItem('user')} />
                            <div className="text-center display-1" style={{ padding: 12, color: '#DBF0FF' }}>Estorian's Flix</div>
                            <MoviesList movies={movies} history={history} />
                        </div>
                    } />

                    <Route exact path="/movies/:movieId" render={({ match, history }) => 
                        <MovieView movie={movies.find(m => m._id === match.params.movieId)} history={history} />
                    } />

                    <Route exact path="/directors/:name" render={({ match, history }) => 
                        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} history={history} />
                    } />

                    <Route exact path="/genres/:name" render={({ match, history }) => 
                        <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} history={history} />
                    } />

                    <Route exact path="/users/:username" render={({ history }) =>
                        <ProfileView user={localStorage.getItem('user')} movies={movies} history={history} />
                    } />

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