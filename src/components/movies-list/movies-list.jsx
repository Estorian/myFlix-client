import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { Container } from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

export function MoviesList(props) {
    let { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (!movies[0]) {
        console.log('nothing to load yet.');
        return <div className="main-view" />;
    }

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
    }


    let cards = filteredMovies.map(movie => <MovieCard
        key={movie._id}
        movie={movie}
        buttonName="Favorite"
        buttonFunction={() => console.log('this is button')}
    />);
    
    return (
        <div className="movies-list">
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            <Container fluid>
                <Row>
                    {cards}
                </Row>
            </Container>
        </div>
    );
}

export default connect(mapStateToProps)(MoviesList);