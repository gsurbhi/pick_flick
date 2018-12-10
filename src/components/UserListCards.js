import React from 'react'
import {Link} from 'react-router-dom';

const UserListCards = ({movie,deleteFromUserWatchList}) =>{
    let poster_path = 'https://image.tmdb.org/t/p/w500'+ movie.poster_path;
return (
    <div>
        <div className="card" styles={{width: '18rem'}}>
            <img className="card-img-top"
                 alt="Card image cap" src={poster_path} alt=''/>
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <Link className='btn btn-outline-info' to={`/movie/${movie.id}`}>View</Link>
                {/*<p className="card-text">.</p>*/}
                <button className="btn btn-outline-warning btn-sm mr-1">
                    <i className="fa fa-play"></i>
                </button>
                <button className="btn btn-outline-danger btn-sm mr-1"
                        onClick={() => {deleteFromUserWatchList(movie)}}>
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        </div>
    </div>)}

export default UserListCards;