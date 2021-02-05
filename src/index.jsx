import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';


//Import statement to indicade that you need to bundle '.index.scss'
import './index.scss';
import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// Main compontent. This will eventually use all of the other components.

const store = createStore(moviesApp, devToolsEnhancer());

class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainView />
            </Provider>
        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);