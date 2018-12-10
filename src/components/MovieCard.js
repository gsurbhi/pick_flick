import MovieService from "../services/MovieService";
import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
export default class CourseCard extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {};

    }

    render() { return (
    <div className="card" styles={{width: '18rem'}}>
        <img className="card-img-top"
             src={this.props.src}/>
        <div className="card-body">
            <h5 className="card-title">{this.props.cardtitle}</h5>
            <p className="card-text">{this.props.cardtext}</p>
            <Link to={`/details/${this.props.movieID}`}>More...</Link>
            {/*<a href={this.props.url} className="btn btn-primary">More...</a>*/}
        </div></div>)}}
