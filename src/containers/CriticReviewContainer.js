import React from 'react'
import {Link} from 'react-router-dom';
import UserHomeNavbar from "../components/UserHomeNavbar";
import UserHomeMovieCards from "../components/UserHomeMovieCards";
import UserServiceClient from "../services/user.service.client";
import MovieApiClient from "../services/mapi.service.client";
import MovieServiceClient from "../services/movie.service.client";
import CriticServiceClient from "../services/critic.service.client";

export default class CriticReviewContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            user:'',
            movie:'',
            reviewTitle:'',
            review:''
        }
        this.setUser = this.setUser.bind(this)
        this.setMovie = this.setMovie.bind(this)
        this.reviewText = this.reviewText.bind(this)
        this.reviewTitleFormChange =this.reviewTitleFormChange.bind(this);
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
    }

    reviewTitleFormChange(txt){
        this.setState({
            reviewTitle: txt
        });
    }
    submitReviewForCritic(){
        /*
            title: reviewInput.title,
            text: reviewInput.text,
            movieName: reviewInput.movieName,
            movieId: reviewInput.movieId,
         */
        let reviewInput = {
            "title": this.state.reviewTitle,
            "text": this.state.review,
            "movieName": this.state.movie.title,
            "movieId":this.state.movie.id
        }

        CriticServiceClient.createCriticReview(reviewInput).then(response=>
        {
            if (response.status !== 200) {
                alert("Internal Server Error, Try Again")
            }
            else {
                alert("Your review is saved!")
                window.location.href='/critic/' + this.state.user._id + '/critic-home'
            }
        })


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
                        <li className="mt-2">
                            Rating: {this.state.movie.vote_average}
                        </li>
                        <li>Popularity: {this.state.movie.popularity} </li>
                        <form>
                            <div className="form-group">

                                <label htmlFor="reviewTitle"
                                       className="m-2 font-italic">
                                    Title
                                </label>
                                <input id="reviewTitle" type="text" className="form-control"
                                       onChange={(e) => {this.reviewTitleFormChange(e.target.value)}}/>
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

                            <Link to={"/critic/"+this.state.user._id+"/critic-home"}>
                                <button className="btn btn-danger"> Cancel </button>
                            </Link>
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