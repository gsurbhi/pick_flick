import React from 'react'
import {Link} from 'react-router-dom';
import UserHomeNavbar from "../components/UserHomeNavbar";
import UserServiceClient from "../services/user.service.client";
import CriticServiceClient from "../services/critic.service.client";

export default class ReviewsByCritic extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            user:'',
            reviews:''
        }
        this.setUser = this.setUser.bind(this)
        this.setReviews = this.setReviews.bind(this)
    }

    setUser(user){
        this.setState({
            user:user
        })
    }

    setReviews(reviewList){
        console.log(reviewList)
        this.setState({
            reviews:reviewList
        })
    }

    componentDidMount(){
        // check user is critic only later
        UserServiceClient.getProfile().then(user => this.setUser(user))
        CriticServiceClient.findAllCriticReviewsForUser(this.props.match.params.userId)
            .then(reviews => this.setReviews(reviews))
    }
    render(){
        return(
            <div>
                <UserHomeNavbar/>


                <ul className="list-group m-5">
                    <Link to={"/critic/"+this.state.user._id+"/home"}>
                        ....Back
                    </Link>
                    {
                        this.state.reviews && this.state.reviews.map((review,index) =>
                        <li className="list-group-item" key={index}>
                            <div  className="font-weight-bold font-italic">
                                <Link to={`/movie/${review.movieId}`}>
                                    Movie: {review.movieName}
                                    </Link>
                            </div>
                            <div>
                                <h6>Your review</h6>
                                Title: {review.title}
                            </div>
                            <div>Date: {review.createdDate}</div>
                            <div>
                                Review: {review.text}
                            </div>


                            </li>
                        )
                    }

                </ul>

            </div>
        )
    }
}