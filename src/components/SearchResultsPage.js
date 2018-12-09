import React from 'react'
import {Link} from 'react-router-dom';
import UserHomeNavbar from "./UserHomeNavbar";
import UserHomeMovieCards from "./UserHomeMovieCards";
import MovieService from "../services/MovieService";
import UserListCards from "./UserListCards";
import MovieServiceClient from "../services/movie.service.client";

export default class SearchResultsPage extends React.Component{

    constructor(props){
        super(props);
        this.movieService = MovieService.instance;
        this.state = {
            movies:[],
            watchList: [],
            favoriteMovies:[],
            dislikedMovies:[]
        };
        this.setFavoriteMovies = this.setFavoriteMovies.bind(this)
        this.setWatchListState = this.setWatchListState.bind(this)
        this.addMovieToUserWatchList = this.addMovieToUserWatchList.bind(this)
        this.favoriteMovie = this.favoriteMovie.bind(this)
        this.dislikeMovie = this.dislikeMovie.bind(this)
    }

    componentDidMount() {
        let searchTerm = this.props.match.params.term
        console.log(searchTerm)
        let ApiUrl = "https://api.themoviedb.org/3/search/movie?api_key=d69881dd92cd9823997ee32f5f66b479&query=" + searchTerm;
        this.movieService
            .getMovies(ApiUrl)
            .then((searchResults) => {
                let result = searchResults.results;
                if (result) {
                    this.setState({movies: result});
                }
            })
    }
    setWatchListState(movies){
        this.setState({
            watchList:movies
        })

    }

    setFavoriteMovies(movies){
        this.setState({
            favoriteMovies:movies
        })
    }

    addMovieToUserWatchList(movie){
        MovieServiceClient.setWatchListMovies(movie).then(response=>
        {
            if (response.status !== 200) {
                alert("Internal Server Error, Try Again")
            }
            else {
                MovieServiceClient.getWatchlistMovies().then(movies=>this.setWatchListState(movies.watchList))
            }
        })
    }

    favoriteMovie(movie){
        MovieServiceClient.favouriteMovies(movie).then(response=>
        {
            if (response.status !== 200) {
                alert("Internal Server Error, Try Again")
            }
            else {
                MovieServiceClient.getFavouriteMovies().then(movies => this.setFavoriteMovies(movies.favourites))
            }
        })
    }

    dislikeMovie(movie){
        MovieServiceClient.saveDislike(movie).then(response=>
        {
            if (response.status !== 200) {
                alert("Internal Server Error, Try Again")
            }
            else {
                MovieServiceClient.getFavouriteMovies().then(movies => this.setFavoriteMovies(movies.favourites))
            }
        })
    }

    render(){
        return(
            <div>
                <UserHomeNavbar/>
                <div className="container-fluid">
                    Showing titles related to {this.props.match.params.term}
                    <div className="row">
                        {
                            this.state.movies.map((movie,index) => {
                                return <div className="col-lg-2 col-md-4 col-sm-12">
                                    {   movie &&
                                    <UserHomeMovieCards
                                        key={index}
                                        movie={movie}
                                        addMovieToUserWatchList={this.addMovieToUserWatchList}
                                        favoriteMovie={this.favoriteMovie}
                                        dislikeMovie={this.dislikeMovie}/>
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }
}

