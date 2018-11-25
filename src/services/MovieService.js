let _singleton = Symbol();

class MovieService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MovieService(_singleton);
        return this[_singleton]
    }

    getMovies(URL) {
        return fetch(URL)
            .then(function (response) {
                return response.json();
            });
    }
}

export default MovieService;
