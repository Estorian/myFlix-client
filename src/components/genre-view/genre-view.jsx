import React from 'react';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import { addFavorite, setUser, setMovies } from '../../actions/actions';
import { onLogout, makeFavorite } from '../../utilities';
import NavMenu from '../nav-menu/nav-menu';

import './genre-view.scss';

export class GenreView extends React.Component {
    constructor() {
        super()

        this.state = {
            genreMovies: []
        };
    }

    componentDidMount() {
        let { movies, genre } = this.props;
        let genreMovies = movies.filter(m => m.Genre.Name === genre.Name);
        this.setState({
            genreMovies: genreMovies
        })
    }

    render() {
        let { genreMovies }= this.state;
        let { genre, visibilityFilter, movies } = this.props;

        if (!movies) return <Spinner animation="grow" variant="primary" />;



        let filteredMovies = genreMovies;

        if (!genreMovies) {
            return <Spinner
                animation="grow"
                variant="light"
                className="main-view"
                style={{ position: 'absolute', left: '50%', top: '50%' }}
            />;
        }

        if (visibilityFilter !== '') {
            filteredMovies = genreMovies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
        }

        let cards = filteredMovies.map(movie => <MovieCard
            key={movie._id}
            movie={movie}
            buttonFunction={() => makeFavorite(movie, this.props).then(() => {
                this.props.history.push('/');
            })}
            buttonName="Favorite" />);

        return (
            <div className="genre-view">
                <NavMenu onLogout={() => onLogout(this.props)} user={localStorage.getItem('user')}/>
                <Modal.Dialog className="genre-definition">
                    <Modal.Header>
                        <h1>The {genre.Name} Genre</h1>
                    </Modal.Header>
                    <Modal.Body>
                        {genre.Description}
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={`/`}>
                            <Button variant="primary">Home</Button>
                        </Link>
                    </Modal.Footer>
                </Modal.Dialog>
                <Container fluid>
                    <Row>
                        { cards }
                    </Row>
                </Container>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user,
        favorites: state.favorites,
        visibilityFilter: state.visibilityFilter
    }
}

export default connect(mapStateToProps, { setMovies, addFavorite, setUser })(GenreView);