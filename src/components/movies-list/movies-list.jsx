import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { addFavorite } from '../../actions/actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';

/*
function makeFavorite(movie, props) {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    console.log('movie:', movie);
    console.log('id: ', movie._id);
    let newID = movie._id;
    let faveIDs = [];
    for (let i = 0; i < props.favorites.length; i++) {
        faveIDs.push(props.favorites[i]._id);
    }
    console.log('faveIDs: ', faveIDs);
    if (faveIDs.includes(newID)) {
        console.log('Movie already in favorites');
    } else {
        let requestURL = 'https://estorians-movie-api.herokuapp.com/users/' + user + '/movies/' + movie._id;
        console.log(requestURL);
        axios.put(requestURL, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log("Movie added to favorites successfully:");
                console.log(response.data);
                addFavorite(movie);
            })
            .catch(err => { console.log(err) });
    }
}*/

function makeFavorite(movie, props) {
    let favorites = props.favorites;
    console.log('Favorites: ', favorites);
    console.log('movie._id: ', movie._id);
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    if (favorites.includes(movie._id)) {
        console.log('Movie already in ye favorites. Try again.');
    } else {
        let requestURL = 'https://estorians-movie-api.herokuapp.com/users/' + user + '/movies/' + movie._id;
        console.log(requestURL);
        axios.put(requestURL, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log("Movie added to favorites successfully:");
                console.log(response.data);
                addFavorite(movie._id);
                window.open('/', '_self');
            })
            .catch(err => { console.log(err) });
    }
}

export function MoviesList(props) {
    let { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (!movies[0]) {
        console.log('nothing to load yet.');
        return <div className="main-view" />;
    }

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    return <div className="movies-list">
        <Container fluid>
            <Row>
                {filteredMovies.map(movie => <MovieCard
                    key={movie._id}
                    movie={movie}
                    buttonName="Favorite"
                    buttonFunction={() => makeFavorite(movie, props)}
            />)}
            </Row>
        </Container>
    </div>
    
}

let mapStateToProps = state => {
    return {
        visibilityFilter: state.visibilityFilter,
        movies: state.movies,
        user: state.user,
        favorites: state.favorites
    }
}

export default connect(mapStateToProps, { addFavorite })(MoviesList);