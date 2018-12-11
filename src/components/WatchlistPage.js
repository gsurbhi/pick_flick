import {Link} from "react-router-dom";
import React, {Component} from "react";
import MovieServiceClient from "../services/movie.service.client";
import UserHomeNavbar from "./UserHomeNavbar";

export default class WatchlistPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:'',
            watchList:[]
        };
        this.setUser = this.setUser.bind(this)
        this.setWatchlistMovies = this.setWatchlistMovies.bind(this)
    }

    setUser(user){
        this.setState({user:user})
    }

    setWatchlistMovies(movies){
        this.setState({
            watchList:movies
        })
    }

    componentWillMount(){
        MovieServiceClient.getWatchlistMovies().then(movies => this.setWatchlistMovies(movies.watchList))
    }

    render(){
        return(
            <div>
                <UserHomeNavbar/>
                <div className="container">
                    <h1> My Watchlist</h1>
                    <ul className="list-group">
                        {this.state.watchList && this.state.watchList.map(movie => {
                            return <li className="list-group-item">
                                <Link to={`/details/${movie.id}`}>
                                    {movie.title}
                                </Link>
                            </li>
                        })}
                    </ul>
                </div>

            </div>
        )
    }
}