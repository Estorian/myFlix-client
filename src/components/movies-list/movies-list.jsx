import React from 'react';
import { connect } from 'react-redux';

import { addFavorite } from '../../actions/actions';
import { makeFavorite } from '../../utilities';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';

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
                    buttonFunction={() => {
                        makeFavorite(movie, props).then(() => {
                            props.history.push('/');
                        }).catch(e => console.log(e));
                    }}
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