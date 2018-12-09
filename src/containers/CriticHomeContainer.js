import React, {Component} from 'react'
import UserHomeNavbar from "../components/UserHomeNavbar";
import UserPageService from "../services/user.page.service.client"
import CriticHomeMovieCards from "../components/CriticHomeMovieCards";
import CriticListCards from "../components/CriticListCards";
import MovieServiceClient from "../services/movie.service.client";
import MovieApiClient from "../services/mapi.service.client";

export default class LoginHomeContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            usersList: [],
            watchList: [],
            popularMovies:[]
        };
        this.setPopularMovies = this.setPopularMovies.bind(this)
    }

    setPopularMovies(movies){
        let truncatedMoviesList  = movies.slice(0,6)
        this.setState({
            popularMovies:truncatedMoviesList
        })
    }

    componentDidMount(){
        MovieApiClient.findPopularMovies().then(movies => this.setPopularMovies(movies.results))
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
                                    <CriticHomeMovieCards
                                        key={index}
                                        movie={movie}/>
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