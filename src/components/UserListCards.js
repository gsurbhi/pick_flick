import React from 'react'
import {Link} from 'react-router-dom';

const UserListCards = ({movie,deleteFromUserWatchList}) =>
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
                <button className="btn btn-outline-danger btn-sm mr-1"
                        onClick={() => {deleteFromUserWatchList(movie)}}>
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        </div>
    </div>

export default UserListCards;