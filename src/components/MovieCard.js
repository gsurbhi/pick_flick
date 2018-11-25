import MovieService from "../services/MovieService";
import React from 'react'
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
            <a href={this.props.url} className="btn btn-primary">More...</a>
        </div></div>)}}
