import UserServiceClient from "../services/user.service.client";
import {Link} from "react-router-dom";
import React, {Component} from "react";
import UserService from '../services/user.service.client'

export default class UserHomeNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:''
        };
        this.goToFav = this.goToFav.bind(this)
        this.goToWatchList=this.goToWatchList.bind(this)
        this.goToFollowers=this.goToFollowers.bind(this)
        this.goToFollowing=this.goToFollowing.bind(this)
    }

    setUser(user){
        this.setState({user:user})
    }
    componentWillMount(){
       UserService.getProfile().then(user => {
            this.setUser(user)
        });
    }

    goToFav(){
         window.location.href='/favourites/' + this.state.user._id
    }

    goToWatchList(){
        window.location.href='/watchlist/' + this.state.user._id
    }
    goToFollowers(){
        window.location.href='/follower/' + this.state.user._id
    }
    goToFollowing(){
        window.location.href='/following/' + this.state.user._id
    }

    render(){
        return(
            <ul className="list-group">

                <li className="list-group-item"
                onClick={()=>this.goToFav()}>My favorites</li>
                <li className="list-group-item"
                onClick={()=>this.goToWatchList}>My watchlist</li>
                <li className="list-group-item">
                    Followers: {this.state.user.followers && this.state.user.followers.length}</li>
                <li className="list-group-item"
                    onClick={()=>this.goToFollowing()}>Following</li>

            </ul>
        )
    }
}