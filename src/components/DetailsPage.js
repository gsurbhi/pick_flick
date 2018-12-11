import React from 'react'
import {Link} from "react-router-dom";
import MoveiApiServiceClient from "../services/mapi.service.client"
import '../styles/movie.detail.client.css';
import CriticReview from "./CriticReview";
import UserServiceClient from "../services/user.service.client";
import UserHomeNavbar from "./UserHomeNavbar";

class DetailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movieId:'',
            details:'',
            loggedIn: false
        };
        this.setLoginToggle = this.setLoginToggle.bind(this)
        this.setMovieId = this.setMovieId.bind(this)
        this.setDetails = this.setDetails.bind(this)
    }

    setMovieId(movieId){
        this.setState({movieId: movieId})
    }

    setLoginToggle(flag){
        console.log("flag" + flag)
        this.setState({
            loggedIn: flag
        })

    }
    componentWillMount() {
        MoveiApiServiceClient.findMovieDetails(this.props.match.params.movieId)
            .then((details) => {
                this.setDetails(details)
            });
        UserServiceClient.isloggedIn().then(response => {
            if(response.status === 200){
                this.setLoginToggle(true)
            }
            else{
                this.setLoginToggle(false)
            }
        })

    }


    setDetails(details) {
        this.setState(
            {
                details: details
            })
    }

    render() {
        return (
            <div>
                <div hidden={this.state.loggedIn}>
                    <nav className="navbar navbar-light bg-light">
                        {/*<a className="navbar-brand">*/}
                            <Link to="/" className="fa fa-video-camera pr-1 text-warning">
                                PickFlick
                            </Link>
                            {/*</a>*/}
                        <ul className="nav mr-auto">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link text-dark">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link text-dark">
                                    Sign up!
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div hidden={!this.state.loggedIn}>
                    <UserHomeNavbar/>
                </div>
                    {/*<div>*/}
                        {/*/!*{this.state.details}*!/*/}
                        {/*<img*/}
                             {/*src={this.state.details.poster_path}/>*/}
                        {/*//adult, backdrop_path, belongs_to_collection, budget, genres, homepage, id, imdb_id, original_language, original_title, overview, popularity, poster_path, production_companies, production_countries, release_date, revenue, runtime, spoken_languages, status, tagline, title, video, vote_average, vote_count, videos, credits, similar*/}
                    {/*</div>*/}


                    <div className='div-background row mt-5'>
                        <div className='img-content pl-5'>
                            <img src={'https://image.tmdb.org/t/p/w500/' + this.state.details.poster_path}/>
                        </div>
                        <div className='col-lg-8 col-md-10 col-sm-12 ml-2'>
                            <div>
                                <b>
                                {this.state.details.original_title}
                                </b>
                            </div>
                            <div>
                                <b>Score: </b>
                                {this.state.details.vote_average}
                            </div>
                            <div>
                                <b>Overview: </b>
                                {this.state.details.overview}
                            </div>
                            <div>
                                <b>Original Language: </b>{this.state.details.original_language}
                            </div>
                            <div className='col-6'>
                            </div>
                            <CriticReview movieId ={this.props.match.params.movieId}
                                              original_title={this.state.details.original_title}/>
                        </div>
                    </div>


            </div>
        )
    }
}

export default DetailsPage;
