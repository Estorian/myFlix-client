import React from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './director-view.scss';
import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {
    constructor() {
        super()

        this.state = {};
    }

    render() {
        let Director = this.props;

        if (!Director) return null;

        return (
            <Jumbotron fluid className="director-view">
                <title>{Director.Name}</title>
                <div className="director-birthday">
                    <span className="label">Birth:</span>
                    <span className="value">{Director.Birth}</span>
                </div>
                <div className="director-bio">
                    {Director.Bio}
                </div>
                <Link to={`/`}>
                    <Button variant="primary">Home</Button>
                </Link>
            </Jumbotron>
            )
    }
}