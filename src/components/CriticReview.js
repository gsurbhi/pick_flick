import React from 'react';
import {CriticReviewsListItem} from "../components/CriticReviewListItem";
import CriticServiceClient from "../services/critic.service.client"

export default class CriticReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reviews:''
        };

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

    render() {
        let text;
        let title;
        if (this.props.reviews) {
            return (
                <div>
                    <div hidden={this.props.type !== 'Critic' || !this.props.loggedIn}>
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
                        <button onClick={() => {
                            this.props.createReview({
                                title: title.value,
                                text: text.value,
                                movieName: this.props.movie.original_title,
                                movieId: this.props.movieId
                            })
                        }} className="btn btn-primary btn-block">Submit
                        </button>
                    </div>
                    <div className='card-deck'>
                        {this.state.reviews.map((review, index) => {
                            return (
                                <CriticReviewsListItem key={index}
                                                       review={review}/>)
                        })}
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