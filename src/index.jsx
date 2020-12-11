import React from 'react';
import ReactDOM from 'react-dom';

//Import statement to indicade that you need to bundle '.index.scss'
import './index.scss';
import { MainView } from './components/main-view/main-view';

// Main compontent. This will eventually use all of the other components.
class MyFlixApplication extends React.Component {
    render() {
        return <MainView />;
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);