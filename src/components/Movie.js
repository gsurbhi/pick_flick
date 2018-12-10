import React from 'react'
import MovieCard from './MovieCard'
class Movie extends React.Component {

    render() {
        return (


            <div className="container-fluid">

                <div className="card-deck">
                    <MovieCard
                        src={this.props.movie.poster_src}
                        cardtitle={this.props.movie.title}
                        cardtext={this.props.movie.overview}
                        movieID = {this.props.movie.id}
                        url={"https://www.themoviedb.org/movie/" + this.props.movie.id}/>

                </div>
            </div>

        )
    }
}

export default Movie


