import React from 'react';
import {CriticReviewsListItem} from "../components/CriticReviewListItem";
import CriticServiceClient from "../services/critic.service.client"
import UserServiceClient from "../services/user.service.client";

export default class CriticReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reviews:'',
            loggedIn: false,
            userType: ''
        };
        this.createReview = this.createReview.bind(this)

    }

    componentWillMount(){
        UserServiceClient.isloggedIn()
        CriticServiceClient.findAllCriticReviewsForMovie(this.props.movieId).then((reviews) => {
            this.setDetails(reviews)
        });
    }

    setDetails(reviews) {
        this.setState(
            {
                reviews: reviews
            })
    }

    createReview(reviewTitle, reviewText, movieTitle, movieId){

        UserServiceClient.isloggedIn().then(response => {
            if(response.status === 200){
                let review ={
                    title: reviewTitle,
                    text: reviewText,
                    movieName: movieTitle,
                    movieId: movieId
                };

                CriticServiceClient.createCriticReview(review).then(() => {
                    CriticServiceClient.findAllCriticReviewsForMovie(this.props.movieId).then((reviews) => {
                        this.setDetails(reviews)
                    });
                });
            }

            else {
                alert("User must be logged in to review")
            }
        })
    }


    loggedIn(){
        UserServiceClient.isloggedIn().then(response => (response.status));
    }


    render() {
        let text;
        let title;
        if (this.state.reviews) {
            return (
                <div>
                    <div className='card-deck'>
                        {this.state.reviews.map((review, index) => {
                            return (
                                <CriticReviewsListItem key={index}
                                                       review={review}/>)
                        })}
                    </div>

                    <div>
                        <label htmlFor="reviewTitle">Review Title</label>
                        <input className="form-control"
                               ref={node => title = node}
                               id="reviewTitle"
                               placeholder="Review Title"/>
                        <label htmlFor="review-text">Write Review</label>
                        <textarea ref={node => text = node}
                                  className="form-control"
                                  placeholder="Write review"
                                  id="review-text">
                        </textarea>
                        <button className="btn btn-primary btn-block"
                                onClick={() => {
                            this.createReview(title.value, text.value, this.props.original_title,this.props.movieId)
                            }}>
                                Submit
                        </button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>Loading</h3>
                </div>
            );
        }
    }
}