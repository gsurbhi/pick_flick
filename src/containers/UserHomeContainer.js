import React, {Component} from 'react'
import UserHomeNavbar from "../components/UserHomeNavbar";
import {Row,Container} from 'reactstrap';
import MovieService from "../services/MovieService";
import UserHomeMovieCards from "../components/UserHomeMovieCards";
import UserPageService from "../services/user.page.service.client"
import UserListCards from "../components/UserListCards";
import MovieApiClient from "../services/mapi.service.client";
import MovieServiceClient from "../services/movie.service.client";

export default class UserHomeContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            usersList: [],
            watchList: [],
            popularMovies:[]
        };
        this.userPageService = new UserPageService();
        this.setPopularMovies = this.setPopularMovies.bind(this)
        this.addMovieToUserWatchList = this.addMovieToUserWatchList.bind(this)
        this.setWatchListState = this.setWatchListState.bind(this)

    }

    setPopularMovies(movies){
        let truncatedMoviesList  = movies.slice(0,6)
        this.setState({
            popularMovies:truncatedMoviesList
        })

    }

    setWatchListState(movies){
        console.log(movies)
        this.setState({
            watchList:movies
        })

    }

    componentDidMount(){
        MovieApiClient.findPopularMovies().then(movies => this.setPopularMovies(movies.results))
        MovieServiceClient.getWatchlistMovies().then(movies => console.log(movies))
        this.setState({
            movies: this.userPageService.getTrendingMovies(),
            usersList: this.userPageService.getUsersList()
        })
    }

    addToList = (movie) => {
        this.userPageService.addToUsersList(movie)
        this.setState({
            usersList: this.userPageService.getUsersList()
        })
    }

    addMovieToUserWatchList(movie){
        MovieServiceClient.setWatchListMovies(movie).then(movies =>console.log(movies))
    }

    deleteFromUserWatchList = (movie) => {
        MovieServiceClient.removeMovieFromWatchlist(movie)
        this.setState({
            watchList: MovieServiceClient.getWatchlistMovies()
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
                            this.state.popularMovies.map((movie,index) => {
                                return <div className="col-lg-2 col-md-4 col-sm-12">
                                            <UserHomeMovieCards
                                                key={index}
                                                movie={movie}
                                                addMovieToUserWatchList={this.addMovieToUserWatchList}/>
                                        </div>
                            })
                        }
                    </div>


                    <div className="row">
                        {
                            this.state.watchList && <h5>My WatchList </h5>
                            && this.state.watchList.map((movie,index) => {
                                return <div className="col-lg-2 col-md-4 col-sm-12">
                                    <UserListCards
                                        key={index}
                                        movie={movie}
                                        deleteFromUserWatchList={this.deleteFromUserWatchList}/>
                                </div>
                            })
                        }
                    </div>

                </div>


            </div>
        )
    }




}