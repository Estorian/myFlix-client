import axios from 'axios';


export function getUserInfo() {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    return axios({
        method: 'get',
        url: `https://estorians-movie-api.herokuapp.com/users/${user}`,
        headers: { Authorization: `Bearer ${token}` }
    })     
}

export const makeFavorite = (movie, props) => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    let movieID = movie._id;
    return getUserInfo().then(response => {
        let favorites = response.data.favoriteMovies;
        if (favorites.includes(movieID)) {
            alert(`${movie.Title} is already in your favorites.`);
        } else {
            props.addFavorite(movieID);
            alert(`${movie.Title} was added to your favorites.`);
            axios({
                method: 'put',
                url: `https://estorians-movie-api.herokuapp.com/users/${user}/movies/${movieID}`,
                headers: { Authorization: `Bearer ${token}` }
            })
        }
    })
}

export const removeFavorite = (movie, props) => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    let movieID = movie._id;
    props.deleteFavorite(movieID);
    return axios({
        method: 'delete',
        url: `https://estorians-movie-api.herokuapp.com/users/${user}/movies/${movieID}`,
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const getMovies = () => {
    let token = localStorage.getItem('token');
    return axios({
        method: 'get',
        url: `https://estorians-movie-api.herokuapp.com/movies`,
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function onLogout(props) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    props.setUser({});
    props.history.push('/');
}