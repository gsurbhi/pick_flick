import React, {Component} from 'react'
import UserHomeNavbar from "../components/UserHomeNavbar";
import UserPageService from "../services/user.page.service.client"
import UserListCards from "../components/UserListCards";
import CriticHomeMovieCards from "../components/CriticHomeMovieCards";
import CriticListCards from "../components/CriticListCards";

export default class LoginHomeContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            usersList: []
        };
        this.userPageService = new UserPageService();

    }

    componentDidMount(){
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

    deleteFromUserList = (movie) => {

        this.userPageService.deleteFromUsersList(movie)
        this.setState({
            usersList: this.userPageService.getUsersList()
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
                            this.state.movies.map((movie,index) => {
                                return <div className="col-lg-2 col-md-4 col-sm-12">
                                    <CriticHomeMovieCards
                                        key={index}
                                        movie={movie}
                                        addToList={this.addToList}/>
                                </div>
                            })
                        }
                    </div>

                    <h5>My List </h5>
                    <div className="row">
                        {
                            this.state.usersList.map((movie,index) => {
                                return <div className="col-lg-2 col-md-4 col-sm-12">
                                    <CriticListCards
                                        key={index}
                                        movie={movie}
                                        deleteFromUserList={this.deleteFromUserList}/>
                                </div>
                            })
                        }
                    </div>

                </div>


            </div>
        )
    }
}