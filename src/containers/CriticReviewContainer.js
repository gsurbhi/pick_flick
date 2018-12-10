import React from 'react'
import {Link} from 'react-router-dom';
import UserHomeNavbar from "../components/UserHomeNavbar";
import UserHomeMovieCards from "../components/UserHomeMovieCards";
import UserServiceClient from "../services/user.service.client";
import MovieApiClient from "../services/mapi.service.client";

export default class CriticReviewContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            user:'',
            movie:'',
            review:''
        }
        this.setUser = this.setUser.bind(this)
        this.setMovie = this.setMovie.bind(this)
        this.reviewText = this.reviewText.bind(this)
        this.submitReviewForCritic =this.submitReviewForCritic.bind(this)
    }

    setUser(user){
        this.setState({
            user:user
        })
    }

    setMovie(movie){
        console.log(movie)
        this.setState({
            movie:movie
        })
    }

    reviewText(txt){
        this.setState({
            review: txt
        });
        console.log(this.state.review)

    }

    submitReviewForCritic(){
            
    }

    componentDidMount(){
        // check user is critic only later
        UserServiceClient.getProfile().then(user => this.setUser(user))
        MovieApiClient.findMovieDetails(this.props.match.params.movieid).then(movie => this.setMovie(movie))

    }
    render(){
        return(
            <div>
                <UserHomeNavbar/>
                <div className="mt-2 container">

                    <div className="list-group-item">
                        <h5>Review: {this.state.movie.title}</h5>
                        <img className="form-inline"
                             src={"https://image.tmdb.org/t/p/w185" + this.state.movie.poster_path}>
                        </img>
                        <li>
                            Rating: {this.state.movie.vote_average}
                        </li>
                        <li>Popularity: {this.state.movie.popularity} </li>


                        <form>
                            <div className="form-group">
                                <label htmlFor="paraTxt"
                                       className="m-2 font-italic">
                                    Your review goes here
                                </label>
                                <textarea type="text"
                                          id="paraTxt"
                                className="form-control"
                                          onChange={(e)=>{this.reviewText(e.target.value)}}>
                                </textarea>
                            </div>

                            <button className="btn btn-danger"> Cancel </button>
                            <button className="btn float-right btn-success"
                            onClick={(e) => {this.submitReviewForCritic()}}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}