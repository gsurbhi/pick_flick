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

/*
    loggedIn(){
        UserServiceClient.isloggedIn().then(response => (response.status));
    }
*/


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

                        <div className= "form-group row">
                            <label className= "col-sm-6 col-form-label">
                                Review Title
                            </label>
                            <div className= "col-sm-12">
                                <input className="form-control"
                                       ref={node => title = node}
                                       id="reviewTitle"
                                       placeholder="Review Title"/>
                            </div>
                        </div>

                        <div className= "form-group row">
                            <label className= "col-sm-6 col-form-label">
                                Write Review
                            </label>
                            <div className= "col-sm-12">
                                <textarea ref={node => text = node}
                                          className="form-control"
                                          placeholder="Write review"
                                          id="review-text">
                                </textarea>
                            </div>
                        </div>

                        <div className= "form-group row">
                            <label className= "col-sm-6 col-form-label">
                            </label>
                            <div className= "col-sm-12">
                            <button className="btn btn-primary btn-block"
                                    onClick={() => {
                                this.createReview(title.value, text.value, this.props.original_title,this.props.movieId)
                                }}>
                                    Submit
                            </button>
                            </div>
                        </div>
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