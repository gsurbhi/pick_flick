let _singleton = Symbol();
let MAPI_URL = 'http://desolate-retreat-56126.herokuapp.com/api/movie';

class MovieApiClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MovieApiClient(_singleton);
        return this[_singleton]
    }

    static findPopularMovies() {
        return fetch(MAPI_URL+'/popular',{
            credentials:'include'
        }).then(response => response.json())
    }

    static findUpcomingMovies() {
        return fetch(MAPI_URL+'/upcoming',{
            credentials:'include'
        }).then(response => response.json())
    }

    static searchMovie(movieTitle) {
        return fetch(MAPI_URL+'/search/'+movieTitle,{
            credentials:'include'
        }).then(response => response.json())
    }

    static findMovieDetails(movieId) {
        return fetch(MAPI_URL+'/detail/'+movieId,{
            credentials:'include'
        }).then(response => response.json())
    }

    static discoverMovies() {
        return fetch(MAPI_URL+'/discover',{
            credentials:'include'
        }).then(response => response.json())
    }

    static findNowPlayingMovies(){
        return fetch (MAPI_URL+'/get-now-playing',{
            credentials:'include'
        }).then(response => response.json())
    }

}
export default MovieApiClient;
