import React from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './genre-view.scss';
import { Link } from 'react-router-dom';

export class GenreView extends React.Component {
    constructor() {
        super()

        this.state = {};
    }

    render() {
        let Genre = this.props;

        if (!Genre) return null;

        return (
            <Jumbotron fluid className="genre-view">
                <title>{Genre.Name}</title>
                <div className="genre-description">
                    {Genre.Description}
                </div>
                <Link to={`/`}>
                    <Button variant="primary">Home</Button>
                </Link>
            </Jumbotron>
        )
    }
}