let HEROKU_URL = 'http://desolate-retreat-56126.herokuapp.com/api/';

class MovieServiceClient {

    static getFavouriteMovies() {
        return fetch(HEROKU_URL + 'movie/favourites', {
            credentials: 'include'
        }).then(response => response.json())
    }

    static getWatchlistMovies() {
        return fetch(HEROKU_URL + 'movie/watchlist', {
            credentials: 'include'
        }).then(response => response.json())
    }

    static saveDislike(movie) {
        return fetch(HEROKU_URL + 'dislikeMovie',{
            method: 'delete',
            credentials: "include",
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static removeMovieFromWatchlist(movie) {
        return fetch(HEROKU_URL + `movie/${movie._id}/watchlist`,{
            method: 'delete',
            credentials: "include",
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static unrecommendMovie(item) {
        return fetch(HEROKU_URL + 'unrecommendMovie',{
            method: 'delete',
            credentials: "include",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static getRecommendedMovies() {
        return fetch(HEROKU_URL + 'recommendedMovies', {
            credentials: 'include'
        })
    }

    static setWatchListMovies(movie){
        return fetch(HEROKU_URL + 'movie/'+movie.id+'/watchlist', {
            method:'post',
            credentials: 'include',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    static favouriteMovies(movie) {
        return fetch(HEROKU_URL + 'movie/'+movie.id+'/favourite', {
            method:'post',
            credentials: 'include',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export default MovieServiceClient;