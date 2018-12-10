import React from 'react';
import {MovieCard} from '../components/MovieCard';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

class ExploreMoviesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        if(this.state.movies){
            return (
                <div>

                    <div className='card-deck'>
                        {this.state.movies.map((movie, index) => {
                            let poster = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
                            return (
                                <MovieCard key={index}
                                           image={poster}
                                           movie={movie}
                                           favorite={this.state.favorite}
                                           watchlist={this.state.watchlist}
                                           watchListMovie={this.state.watchListMovie}
                                           favouriteMovie={this.state.favoriteMovie}
                                           type={this.state.type}
                                           loggedIn={this.state.loggedIn}
                                           page='explore'/>
                            )
                        })}
                    </div>
                </div>
            );
        }

        return (
            <div className="ml-4">
                <h3 >Loading</h3>
            </div>
        );
    }
}
export default ExploreMoviesContainer;