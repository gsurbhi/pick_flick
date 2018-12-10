import React from 'react'
import {Link} from 'react-router-dom';

const CriticHomeMovieCards = ({movie,addMovieToUserWatchList}) =>
    <div>
        <div className="card">
            <img className="card-img-top" src={"https://image.tmdb.org/t/p/w185" + movie.poster_path}/>
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">.</p>
                    <button className="btn btn-outline-success btn-sm mr-1">
                        <i className="fa fa-thumbs-up"></i>
                    </button>
                    <Link to={"/movie/"+movie.id+"/review"}>
                    <button className="btn btn-outline-warning btn-sm mr-1">
                        <i className="fa fa-pencil"></i>
                    </button>
                    </Link>
                    <button className="btn btn-outline-warning btn-sm mr-1"
                            onClick={() => {addMovieToUserWatchList(movie)}}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button className="btn btn-outline-danger btn-sm mr-1">
                        <i className="fa fa-thumbs-down"></i>
                    </button>
                </div>
        </div>
    </div>

export default CriticHomeMovieCards;