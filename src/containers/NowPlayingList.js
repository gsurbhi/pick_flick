import React from 'react';
import {NowPlayingListItem} from "../components/NowPlayingListItem"

class NowPlayingList extends React.Component {

    constructor(){
        super();
    }

    renderNowPlayingMovies(movies) {
        let moviesToRender = null;

        if (movies) {
            moviesToRender = movies.map((movie, index) =>
                <NowPlayingListItem key={index}
                                    movie={movie}/>);
        }
        return (moviesToRender);
    }

    render() {
        let movies = this.props.nowPlayingMovies;
        return(
            <div className='list-group'>
                <div className='list-group-item list-group-item-action bg-dark row'>
                    <h4 className="text-white">Now Playing</h4>
                </div>
                {this.renderNowPlayingMovies(movies)}
            </div>
        );
    }

}

export default NowPlayingList;