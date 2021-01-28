import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;
        const abbrDescription = movie.Description.substring(0, 100) + '...';

        return (
            <Card className="movie-card" /*style={{ width: '20rem', height: '32rem', margin: '2rem', background: '#DBF0FF'}}*/>
                <Card.Img variant="top" className="mx-auto thumbnail" src={movie.ImageURL} /*style={{ 'padding-top': '2rem' }}*//>
                <Card.Body>
                    <Card.Title className="text-center h4">{movie.Title}</Card.Title>
                    <Card.Text>{abbrDescription}
                        <span className="link" onClick={() => onClick(movie)} style={{ color: '#00538F'}}> Read more</span>
                    </Card.Text>
                </Card.Body>
            </Card>
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