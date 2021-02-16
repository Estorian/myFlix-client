import React from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import NavMenu from '../nav-menu/nav-menu';
import { setMovies, addFavorite, setUser } from '../../actions/actions';

import { MovieCard } from '../movie-card/movie-card';
import { makeFavorite, onLogout } from '../../utilities';

import './director-view.scss';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
    constructor() {
        super()

        this.state = {
            directorMovies: []
        };
    }

    componentDidMount() {
        let { movies, director } = this.props;
        let directorMovies = movies.filter(m => m.Director.Name === director.Name);
        this.setState({
            directorMovies: directorMovies
        })
    }

    render() {
        let { director, visibilityFilter, history } = this.props;
        let { directorMovies } = this.state;

        let filteredMovies = directorMovies;

        if (!directorMovies) {
            return <Spinner
                animation="grow"
                variant="light"
                className="main-view"
                style={{ position: 'absolute', left: '50%', top: '50%' }}
            />;
        }

        if (visibilityFilter !== '') {
            filteredMovies = directorMovies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
        }

        let cards = filteredMovies.map(movie => <MovieCard
            key={movie._id}
            movie={movie}
            buttonFunction={() => makeFavorite(movie, this.props).then(() => {
                history.push('/');
            })}
            buttonName="Favorite" />);

        return (
            <div className="director-view">
                <NavMenu onLogout={() => onLogout(this.props)} user={localStorage.getItem('user')}/>
                <Modal.Dialog>
                    <Modal.Header>
                        <h1>{director.Name}</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="director-birthday">
                            <span className="label">Birth:</span>
                            <span className="value">{director.Birth}</span>
                        </div>
                        <div className="director-bio">
                            {director.Bio}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Link to={`/`}>
                            <Button variant="primary">Home</Button>
                        </Link>
                    </Modal.Footer>
                </Modal.Dialog>
                <Container fluid>
                    <Row>
                        {cards}
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

export default connect(mapStateToProps, { setMovies, addFavorite, setUser })(DirectorView);