import React from 'react'
import MovieService from "../services/MovieService";
import {MovieCard} from "./MovieCard";
import NowPlayingList from "../containers/NowPlayingList";
import MovieApiService from "../services/mapi.service.client"
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {movies:[],
        nowPlaying : []};
        this.movieService = MovieService.instance;
        this.searchMovies = this.searchMovies.bind(this);
    }


    componentDidMount() {
        this.getMovieList("social");
        this.nowPlayingList();

    }

    getMovieList(searchTerm) {
        let ApiUrl = "https://api.themoviedb.org/3/search/movie?api_key=d69881dd92cd9823997ee32f5f66b479&query=" + searchTerm;
        this.movieService
            .getMovies(ApiUrl)
            .then((searchResults) => {
                let result = searchResults.results;
                this.setState({movies: result});
            })
    }

    nowPlayingList(){
        MovieApiService.findNowPlayingMovies()
            .then((result) => {
                this.setState({nowPlaying: result.results})
            });
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

                <div className='row m-2'>
                    <div className='col-9'>
                        <div className="card-deck">
                            {this.state.movies.map((movie, index) => {
                                return (
                                    <MovieCard key={index} image={movie.poster_path} movie={movie}/>
                                )
                            })}
                        </div>
                    </div>
                        <div className='col-3'>
                            <NowPlayingList nowPlayingMovies={this.state.nowPlaying}/>
                        </div>

                </div>
            </div>
        )
    }
}

export default Search;
