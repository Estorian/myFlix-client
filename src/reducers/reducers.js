import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, SET_FAVORITES, ADD_FAVORITE, DELETE_FAVORITE } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function user(state = [], action) {
    switch (action.type) {
        case SET_USER:
            return action.value; 

        default:
            return state;
    }
}

function favorites(state = [], action) { //all favorites must be an id ONLY
    switch (action.type) {
        case SET_FAVORITES:
            return action.value;

        case ADD_FAVORITE:
            return [
                ...state, action.value
            ];

        case DELETE_FAVORITE:
            let newState = state.filter(movieID => (movieID !== action.value));
            return newState;

        default:
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    favorites,
    user
});


export default moviesApp;