// src/actions/actions.js

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const SET_FAVORITES = 'SET_FAVORITES';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';

export function setMovies(value) {
    return {
        type: SET_MOVIES,
        value
    };
}

export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}

export function setUser(value) {
    return {
        type: SET_USER,
        value
    }
}

export function addFavorite(value) {
    return {
        type: ADD_FAVORITE,
        value
    }
}

export function setFavorites(value) {
    return {
        type: SET_FAVORITES,
        value
    }
}

export function deleteFavorite(value) {
    return {
        type: DELETE_FAVORITE,
        value
    }
}