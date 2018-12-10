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
            reviews:'',
            editingFlag: false,
            reviewEditedText:''
        }
        this.setUser = this.setUser.bind(this)
        this.setReviews = this.setReviews.bind(this)
        this.reviewEdit =this.reviewEdit.bind(this)
        this.updateReview = this.updateReview.bind(this)
        this.deleteReview = this.deleteReview.bind(this)
        this.toggleToReviewMode = this.toggleToReviewMode.bind(this)
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

    reviewEdit(txt){
        this.setState({
            reviewEditedText:  txt
        });
    }

    toggleToReviewMode(reviewText){
        this.setState({
            editingFlag:true,
            reviewEditedText: reviewText
        });
    }

    updateReview(id,title){

        if(this.state.reviewEditedText.length > 0) {
            let review = {
                "_id":id,
                "reviewTitle":title,
                "reviewText":this.state.reviewEditedText
            }
            CriticServiceClient.updateCriticReview(review).then(response=>
            {
                if (response.status !== 200) {
                    alert("Internal Server Error, Try Again")
                }
                else {
                    alert("Your review is saved!")
                    this.setState({editingFlag:false})
                   CriticServiceClient.findAllCriticReviewsForUser(this.props.match.params.userId)
                        .then(reviews => this.setReviews(reviews))
                }
            })
        }
        else {
            alert("no text received")
            this.setState({editingFlag:false})
        }
    }

    deleteReview(reviewId){
        CriticServiceClient.deleteCriticReview(reviewId).then(response => {
            if (response.status === 200) {
                CriticServiceClient.findAllCriticReviewsForUser(this.state.user._id)
            }
            else {
                alert("Could not delete review")

            }
        });
    }

    componentDidMount(){
        // check user is critic only later
        UserServiceClient.getProfile().then(user => this.setUser(user))
        CriticServiceClient.findAllCriticReviewsForUser(this.props.match.params.userId)
            .then(reviews => this.setReviews(reviews))
    }
    render(){
        let textarea;
        return(
            <div>
                <UserHomeNavbar/>


                <ul className="list-group m-5">
                    <Link to={"/critic/"+this.state.user._id+"/critic-home"}>
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
                            <div style={{display:this.state.editingFlag?'none':'block'}}>
                                Review: {review.text}
                                <button className="m-1 btn btn-sm rounded-circle btn-outline-warning"
                                        onClick={()=> this.toggleToReviewMode(review.text)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="m-1 btn btn-sm rounded-circle btn-outline-danger"
                                        onClick={()=> this.deleteReview(review._id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>

                            <div style={{display:this.state.editingFlag?'block':'none'}}>
                                Review:
                                <textarea className="form-control"
                                    onChange={e => this.reviewEdit(e.target.value)}
                                    value={this.state.reviewEditedText}
                                    ref={node => {textarea = node;}}/>
                                <button className="m-1 btn btn-sm rounded-circle btn-outline-success"
                                        onClick={()=> this.updateReview(review._id,review.title)}>
                                    <i className="fa fa-check"></i>
                                </button>

                            </div>


                            </li>
                        )
                    }

                </ul>

            </div>
        )
    }
}