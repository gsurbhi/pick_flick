
import React from 'react'
import Movie from "./Movie";
import MovieService from "../services/MovieService";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {movies:[]};
        this.movieService = MovieService.instance;
        this.searchMovies = this.searchMovies.bind(this);
    }


    componentDidMount() {
        this.getMovieList("social");
    }

    getMovieList(searchTerm) {
        let ApiUrl = "https://api.themoviedb.org/3/search/movie?api_key=d69881dd92cd9823997ee32f5f66b479&query=" + searchTerm;
        this.movieService
            .getMovies(ApiUrl)
            .then((searchResults) => {
                let result = searchResults.results;
                let movies = [];
                if (result) {
                    result.map((movie) => {
                        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
                        let movieItem = <Movie key={movie.id} movie={movie}/>;
                        movies.push(movieItem);
                    });
                    this.setState({movies: movies});
                }
            })
    }

    searchMovies(event) {
        let query = event.target.value;
        this.getMovieList(query);
    }


    render() {
        return (
            <div>
                    <input className="form-control mr-sm-2"
                           id="search-movies"
                           type="search" onChange={this.searchMovies} placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                <div className="row course-deck">
                    {
                        this.state.movies.map((course,index) =>
                            ( <div className="col-lg-2 col-md-4 col-sm-12">{course}</div>))
                    }
                </div>
            </div>
        )
    }
}

export default Search;
