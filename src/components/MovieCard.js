import React from 'react';
import {Link} from 'react-router-dom';

export const MovieCard = ({movie, image}) => {
    let poster_url = "https://image.tmdb.org/t/p/w500"+image;
    return (

        <div className='col-lg-3 col-md-4 col-sm-6'>
            <div className='card h-100'>
                <img className="card-img-top" src={poster_url} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                </div>
                <div className="card-footer text-muted">
                    <Link className='btn btn-outline-info' to={`/details/${movie.id}`}>View</Link>
                </div>
            </div>
        </div>
    )
};
