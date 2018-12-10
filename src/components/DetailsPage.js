import React from 'react'
import {Link} from "react-router-dom";
import MoveiApiServiceClient from "../services/mapi.service.client"
import '../styles/movie.detail.client.css';
import CriticReview from "./CriticReview";

class DetailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movieId:'',
            details:''
        };
    }

    setMovieId(movieId){
        this.setState({movieId: movieId})
    }
    componentDidMount() {
        MoveiApiServiceClient.findMovieDetails(this.props.match.params.movieId)
            .then((details) => {
                this.setDetails(details)
            });


    }

    getReleaseYear(releaseDate) {
        if (releaseDate)
            return releaseDate.split('-')[0];
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
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand">
                        <i className="fa fa-video-camera pr-1 text-warning">
                        </i>
                        PickFlick
                    </a>
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
                    {/*<div>*/}
                        {/*/!*{this.state.details}*!/*/}
                        {/*<img*/}
                             {/*src={this.state.details.poster_path}/>*/}
                        {/*//adult, backdrop_path, belongs_to_collection, budget, genres, homepage, id, imdb_id, original_language, original_title, overview, popularity, poster_path, production_companies, production_countries, release_date, revenue, runtime, spoken_languages, status, tagline, title, video, vote_average, vote_count, videos, credits, similar*/}
                    {/*</div>*/}

                    <div>

                        <div className='div-background row mt-5'>
                            <div className='img-content pl-5'>
                                <img src={'https://image.tmdb.org/t/p/w500/' + this.state.details.poster_path}/>
                            </div>
                            <div className='col-lg-8 col-md-10 col-sm-12 ml-2'>
                                <div>
                                    {this.state.details.original_title} ({this.getReleaseYear(this.state.details.release_date)})
                                </div>
                                <div>
                                    Score: {this.state.details.vote_average}
                                </div>
                                <div className='headers'>
                                    Overview
                                </div>
                                <div>
                                    {this.state.details.overview}
                                </div>
                                <div className='mt-3'>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className='headers'>
                                                Runtime
                                            </div>
                                            <div>
                                                {this.state.details.runtime} mins
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mt-5'>
                                        <div className='col-6'>
                                            <div className='headers'>
                                                Original Language
                                            </div>
                                            <div>
                                                {this.state.details.original_language}
                                            </div>
                                        </div>
                                        {/*<div className='col-6'>*/}
                                            {/*<div className='headers'>*/}
                                                {/*HomePage*/}
                                            {/*</div>*/}
                                            {/*<div>*/}
                                                {/*<a href={this.state.details.homepage}>Hello</a>*/}
                                                <CriticReview movieId ={this.props.match.params.movieId}
                                                              original_title={this.state.details.original_title}/>
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                 </nav>
            </div>
        )
    }
}

export default DetailsPage;
