import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { Link } from "react-router-dom";
import { Col } from 'react-bootstrap';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;
        const abbrDescription = movie.Description.substring(0, 100) + '...';

        return (
            <Col className="my-auto mx-auto" >
                <Card className="movie-card mx-auto">
                <Card.Img variant="top" className="mx-auto thumbnail" src={movie.ImageURL}  />
                    <Card.Body>
                        <Card.Title className="text-center h4">{movie.Title}</Card.Title>
                        <Card.Text>{abbrDescription}
                            <Link to={`/movies/${movie._id}`}>
                                <Button variant="link">Read more</Button>
                            </Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageURL: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};