import React, {Component} from 'react'
import UserHomeNavbar from "../components/UserHomeNavbar";
import {Row,Container} from 'reactstrap';
import MovieService from "../services/MovieService";

export default class UserHomeContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {movies:[]};
      /*  this.movieService = MovieService.instance;
        this.searchMovies = this.searchMovies.bind(this);*/
    }

    render() {

        return(
            <div>

                <UserHomeNavbar/>
                <Container>
                    <Row>

                    </Row>
                </Container>


            </div>
        )
    }




}