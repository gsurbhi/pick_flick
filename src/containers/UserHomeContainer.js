import React, {Component} from 'react'
import UserHomeNavbar from "../components/UserHomeNavbar";
import {Row,Container} from 'reactstrap';
import MovieService from "../services/MovieService";
import UserHomeMovieCards from "../components/UserHomeMovieCards";
import UserListCards from "../components/UserListCards";
import MovieApiClient from "../services/mapi.service.client";
import MovieServiceClient from "../services/movie.service.client";
import {Link} from 'react-router-dom';

export default class UserHomeContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            watchList: [],
            favoriteMovies:[],
            dislikedMovies:[]
        };
        this.setPopularMovies = this.setPopularMovies.bind(this)
        this.setFavoriteMovies = this.setFavoriteMovies.bind(this)
        this.setWatchListState = this.setWatchListState.bind(this)
        this.addMovieToUserWatchList = this.addMovieToUserWatchList.bind(this)
        this.favoriteMovie = this.favoriteMovie.bind(this)
        this.dislikeMovie = this.dislikeMovie.bind(this)
    }

    setPopularMovies(movies){
        let truncatedMoviesList  = movies.slice(0,6)
        this.setState({
            popularMovies:truncatedMoviesList
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
    componentDidMount(){
        MovieApiClient.findPopularMovies().then(movies => this.setPopularMovies(movies.results))
        MovieServiceClient.getWatchlistMovies().then(movies => this.setWatchListState(movies.watchList))
        MovieServiceClient.getFavouriteMovies().then(movies => this.setFavoriteMovies(movies.favourites))
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

    deleteFromUserWatchList = (movie) => {
        MovieServiceClient.removeMovieFromWatchlist(movie).then(response=>
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
        console.log(movie)
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

    render() {

        return(
            <div>

                <UserHomeNavbar/>

                <div className="mt-2 container">
                    <h5>Trending now </h5>
                    <div className="row">
                        {
                            this.state.popularMovies && this.state.popularMovies.map((movie,index) => {
                                return <div className="col-lg-2 col-md-4 col-sm-12">
                                        {movie &&
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

                    <h5>My WatchList </h5>
                    <div className="row">
                        {
                            this.state.watchList && this.state.watchList.map((movie,index) => {
                                return <div className="col-lg-2 col-md-4 col-sm-12">
                                        {   movie &&
                                        <UserListCards
                                        key={index}
                                        movie={movie}
                                        deleteFromUserWatchList={this.deleteFromUserWatchList}/>
                                        }
                                </div>
                            })
                        }
                    </div>
                    <h5>My Favorite Movies</h5>
                    <div className="row m-1">
                        {
                            this.state.favoriteMovies && this.state.favoriteMovies.map((movie,index) => {
                                return <div className="col-lg-2 col-md-4 col-sm-12">
                                        { movie &&
                                    <UserListCards
                                        key={index}
                                        movie={movie}
                                        deleteFromUserWatchList={this.dislikeMovie}/>
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