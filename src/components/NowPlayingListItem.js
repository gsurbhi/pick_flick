import React from 'react';
import {Link} from 'react-router-dom';

export const NowPlayingListItem = ({movie}) =>
    <Link to={`/details/${movie.id}`}>
        <div className='list-group-item list-group-item-action row'>
            <p>{movie.title}</p>
        </div>
    </Link>