import React from 'react'
import {Link} from 'react-router-dom';

const UserHomeMovieCards = ({movie,addToList}) =>
    <div>
        <div className="card" styles={{width: '18rem'}}>
            <img className="card-img-top"
                 alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">.</p>
                    <button className="btn btn-outline-warning btn-sm mr-1">
                        <i className="fa fa-play"></i>
                    </button>
                    <button className="btn btn-outline-warning btn-sm mr-1" onClick={() => {addToList(movie)}}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
        </div>
    </div>

export default UserHomeMovieCards;